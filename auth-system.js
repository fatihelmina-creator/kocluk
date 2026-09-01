/**
 * TEACHER-STUDENT HIERARCHY AUTHENTICATION SYSTEM
 * Supports email/password auth and invitation-based student enrollment
 */

// ==================== FIREBASE AUTH INITIALIZATION ====================
async function initTeacherAuth() {
    try {
        // Check if user is already logged in
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                window.currentUser = user;
                await loadUserProfile(user.uid);
                window.onFirebaseReady?.();
            } else {
                showAuthScreen();
            }
        });
    } catch (error) {
        console.error("Auth initialization error:", error);
    }
}

// ==================== TEACHER REGISTRATION ====================
async function registerTeacher(email, password, fullName) {
    try {
        // 1. Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const teacherId = userCredential.user.uid;

        // 2. Create teacher profile in Firestore
        const teacherProfile = {
            id: teacherId,
            email: email,
            fullName: fullName,
            role: 'teacher',
            createdAt: new Date().toISOString(),
            studentCount: 0,
            invitationCode: generateInvitationCode(),
            isActive: true
        };

        await syncDocToCloud('teachers', teacherId, teacherProfile);
        
        // 3. Set user profile in localStorage for quick access
        localStorage.setItem('userProfile', JSON.stringify(teacherProfile));
        
        showToast(`Hoş geldiniz, ${fullName}!`, 'success');
        window.currentUser = userCredential.user;
        await loadUserProfile(teacherId);
        window.onFirebaseReady?.();

        return teacherProfile;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showToast('Bu email zaten kullanılıyor.', 'error');
        } else if (error.code === 'auth/weak-password') {
            showToast('Şifre en az 6 karakter olmalıdır.', 'error');
        } else {
            showToast(`Kayıt hatası: ${error.message}`, 'error');
        }
        throw error;
    }
}

// ==================== TEACHER LOGIN ====================
async function loginTeacher(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const teacherId = userCredential.user.uid;

        window.currentUser = userCredential.user;
        await loadUserProfile(teacherId);
        window.onFirebaseReady?.();

        showToast('Başarıyla giriş yaptınız!', 'success');
        return userCredential.user;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            showToast('Bu email ile kayıtlı öğretmen bulunamadı.', 'error');
        } else if (error.code === 'auth/wrong-password') {
            showToast('Şifre yanlış.', 'error');
        } else {
            showToast(`Giriş hatası: ${error.message}`, 'error');
        }
        throw error;
    }
}

// ==================== STUDENT REGISTRATION WITH INVITATION ====================
async function registerStudentWithInvitation(invitationCode, studentName, targetExam) {
    try {
        // 1. Validate invitation code
        const teacherQuery = query(
            collection(db, 'teachers'),
            where('invitationCode', '==', invitationCode)
        );
        const teacherSnapshot = await getDocs(teacherQuery);

        if (teacherSnapshot.empty) {
            showToast('Geçersiz davetiye kodu.', 'error');
            throw new Error('Invalid invitation code');
        }

        const teacherDoc = teacherSnapshot.docs[0];
        const teacherId = teacherDoc.id;

        // 2. Create anonymous Firebase Auth (or email-based for students)
        const userCredential = await signInAnonymously(auth);
        const studentId = userCredential.user.uid;

        // 3. Create student profile
        const studentProfile = {
            id: studentId,
            name: studentName,
            targetExam: targetExam,
            teacherId: teacherId,
            role: 'student',
            createdAt: new Date().toISOString(),
            streakDays: 0,
            targetScoreOrNet: 100,
            notes: '',
            status: 'active'
        };

        await syncDocToCloud('students', studentId, studentProfile);

        // 4. Add student to teacher's student list
        const studentsList = teacherDoc.data().students || [];
        studentsList.push(studentId);

        await syncDocToCloud('teachers', teacherId, {
            ...teacherDoc.data(),
            students: studentsList,
            studentCount: studentsList.length
        });

        window.currentUser = userCredential.user;
        localStorage.setItem('userProfile', JSON.stringify(studentProfile));
        
        showToast(`Hoş geldiniz, ${studentName}!`, 'success');
        await loadUserProfile(studentId);
        window.onFirebaseReady?.();

        return studentProfile;
    } catch (error) {
        showToast(`Öğrenci kaydı hatası: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== LOAD USER PROFILE ====================
async function loadUserProfile(userId) {
    try {
        const db = window.db;

        // Try to load as teacher
        const teacherRef = doc(db, 'teachers', userId);
        const teacherSnap = await getDoc(teacherRef);

        if (teacherSnap.exists()) {
            const teacherData = teacherSnap.data();
            window.userProfile = teacherData;
            window.userRole = 'teacher';
            initTeacherDashboard(teacherData);
            return;
        }

        // Try to load as student
        const studentRef = doc(db, 'students', userId);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
            const studentData = studentSnap.data();
            window.userProfile = studentData;
            window.userRole = 'student';
            window.teacherId = studentData.teacherId;
            initStudentDashboard(studentData);
            return;
        }

        console.error('User profile not found');
        logout();
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// ==================== TEACHER DASHBOARD INITIALIZATION ====================
async function initTeacherDashboard(teacherData) {
    try {
        const db = window.db;
        
        // Fetch all students for this teacher
        const studentsQuery = query(
            collection(db, 'students'),
            where('teacherId', '==', teacherData.id)
        );

        onSnapshot(studentsQuery, (snapshot) => {
            const fetchedStudents = [];
            snapshot.forEach(doc => {
                fetchedStudents.push({ ...doc.data(), docId: doc.id });
            });
            window.students = fetchedStudents;
            activeStudentId = fetchedStudents[0]?.id || null;
            
            populateStudentDropdown();
            renderAll();
            updateChart();
        });

        // Show teacher-specific UI
        document.getElementById('teacherPanel')?.classList.remove('hidden');
        document.getElementById('studentPanel')?.classList.add('hidden');
    } catch (error) {
        console.error('Error initializing teacher dashboard:', error);
    }
}

// ==================== STUDENT DASHBOARD INITIALIZATION ====================
async function initStudentDashboard(studentData) {
    try {
        const db = window.db;

        // Fetch teacher information
        const teacherRef = doc(db, 'teachers', studentData.teacherId);
        const teacherSnap = await getDoc(teacherRef);

        if (teacherSnap.exists()) {
            window.teacherInfo = teacherSnap.data();
        }

        // Set active student (student sees only their data)
        window.students = [studentData];
        activeStudentId = studentData.id;

        // Fetch tasks, exams for this student
        const tasksQuery = query(
            collection(db, 'tasks'),
            where('studentId', '==', studentData.id)
        );

        const examsQuery = query(
            collection(db, 'exams'),
            where('studentId', '==', studentData.id)
        );

        onSnapshot(tasksQuery, (snapshot) => {
            window.tasks = [];
            snapshot.forEach(doc => {
                window.tasks.push({ ...doc.data(), docId: doc.id });
            });
            renderAll();
            updateChart();
        });

        onSnapshot(examsQuery, (snapshot) => {
            window.exams = [];
            snapshot.forEach(doc => {
                window.exams.push({ ...doc.data(), docId: doc.id });
            });
            renderAll();
            updateChart();
        });

        // Show student-specific UI
        document.getElementById('studentPanel')?.classList.remove('hidden');
        document.getElementById('teacherPanel')?.classList.add('hidden');
    } catch (error) {
        console.error('Error initializing student dashboard:', error);
    }
}

// ==================== TEACHER ADD STUDENT MANUALLY ====================
async function addStudentAsTeacher(studentName, targetExam, targetScore) {
    try {
        if (!window.userProfile || window.userRole !== 'teacher') {
            showToast('Sadece öğretmenler öğrenci ekleyebilir.', 'error');
            return;
        }

        // Create student profile
        const studentId = `student_${Date.now()}`;
        const studentProfile = {
            id: studentId,
            name: studentName,
            targetExam: targetExam,
            teacherId: window.userProfile.id,
            role: 'student',
            createdAt: new Date().toISOString(),
            streakDays: 0,
            targetScoreOrNet: targetScore,
            notes: 'Öğretmen tarafından eklendi',
            status: 'active'
        };

        await syncDocToCloud('students', studentId, studentProfile);

        // Add to teacher's students list
        const updatedTeacher = {
            ...window.userProfile,
            students: [...(window.userProfile.students || []), studentId],
            studentCount: (window.userProfile.studentCount || 0) + 1
        };

        await syncDocToCloud('teachers', window.userProfile.id, updatedTeacher);
        window.userProfile = updatedTeacher;

        showToast(`${studentName} başarıyla eklendi!`, 'success');
        return studentProfile;
    } catch (error) {
        showToast(`Öğrenci ekleme hatası: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== REMOVE STUDENT ====================
async function removeStudent(studentId) {
    try {
        if (!window.userProfile || window.userRole !== 'teacher') {
            showToast('Sadece öğretmenler öğrenci silebilir.', 'error');
            return;
        }

        // Delete student
        await deleteDocFromCloud('students', studentId);

        // Remove from teacher's list
        const updatedStudents = (window.userProfile.students || []).filter(id => id !== studentId);
        const updatedTeacher = {
            ...window.userProfile,
            students: updatedStudents,
            studentCount: updatedStudents.length
        };

        await syncDocToCloud('teachers', window.userProfile.id, updatedTeacher);
        window.userProfile = updatedTeacher;

        showToast('Öğrenci kaldırıldı.', 'success');
    } catch (error) {
        showToast(`Öğrenci silme hatası: ${error.message}`, 'error');
    }
}

// ==================== GENERATE INVITATION CODE ====================
function generateInvitationCode() {
    return Math.random().toString(36).substring(2, 15).toUpperCase() + 
           Math.random().toString(36).substring(2, 15).toUpperCase();
}

// ==================== LOGOUT ====================
async function logout() {
    try {
        await signOut(auth);
        localStorage.removeItem('userProfile');
        window.currentUser = null;
        window.userProfile = null;
        showAuthScreen();
        showToast('Çıkış yapıldı.', 'success');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ==================== SHOW AUTH SCREEN ====================
function showAuthScreen() {
    // Hide app content
    document.getElementById('mainApp')?.classList.add('hidden');
    document.getElementById('authScreen')?.classList.remove('hidden');
}

// ==================== SHOW APP SCREEN ====================
function showAppScreen() {
    document.getElementById('authScreen')?.classList.add('hidden');
    document.getElementById('mainApp')?.classList.remove('hidden');
}
