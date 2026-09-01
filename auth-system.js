/**
 * TEACHER-STUDENT HIERARCHY AUTHENTICATION SYSTEM V2
 * Supports separate teacher/student login, email verification, and invitation-based enrollment
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
                showLoginTypeSelection();
            }
        });
    } catch (error) {
        console.error("Auth initialization error:", error);
    }
}

// ==================== SHOW LOGIN TYPE SELECTION SCREEN ====================
function showLoginTypeSelection() {
    // Hide app content
    document.getElementById('mainApp')?.classList.add('hidden');
    document.getElementById('authScreen')?.classList.remove('hidden');
    
    const authScreen = document.getElementById('authScreen');
    authScreen.innerHTML = `
        <div class="min-h-screen bg-[#141218] flex items-center justify-center p-4">
            <div class="max-w-md w-full space-y-6">
                <!-- Logo & Header -->
                <div class="text-center space-y-2">
                    <div class="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#6750A4] to-[#D0BCFF] flex items-center justify-center text-white shadow-lg mx-auto">
                        <i data-lucide="graduation-cap" class="w-8 h-8 text-[#381E72]"></i>
                    </div>
                    <h1 class="text-3xl font-black text-white">Öğrenci Koçluk</h1>
                    <p class="text-sm text-[#938F99]">Bulut Tabanlı Başarı Rehberi</p>
                </div>

                <!-- Role Selection Buttons -->
                <div class="space-y-3 pt-6">
                    <button onclick="showTeacherLogin()" class="w-full bg-gradient-to-r from-[#6750A4] to-[#8B5CF6] hover:from-[#7c3aed] hover:to-[#a78bfa] text-white font-bold py-4 rounded-2xl transition transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                        <i data-lucide="user-check" class="w-6 h-6"></i>
                        <span>Öğretmen / Koç Girişi</span>
                    </button>

                    <button onclick="showStudentLogin()" class="w-full bg-gradient-to-r from-[#81C784] to-[#66BB6A] hover:from-[#4CAF50] hover:to-[#43A047] text-white font-bold py-4 rounded-2xl transition transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                        <i data-lucide="user" class="w-6 h-6"></i>
                        <span>Öğrenci Girişi</span>
                    </button>
                </div>

                <!-- Info Box -->
                <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-4 space-y-2">
                    <p class="text-xs text-[#938F99]"><strong>Öğretmen?</strong> Hesap oluşturun ve öğrencilerinizi yönetin.</p>
                    <p class="text-xs text-[#938F99]"><strong>Öğrenci?</strong> Öğretmeninizden davetiye kodunu alın.</p>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// ==================== TEACHER LOGIN SCREEN ====================
function showTeacherLogin() {
    const authScreen = document.getElementById('authScreen');
    authScreen.innerHTML = `
        <div class="min-h-screen bg-[#141218] flex items-center justify-center p-4">
            <div class="max-w-md w-full space-y-6">
                <!-- Header with Back Button -->
                <div class="flex items-center space-x-2">
                    <button onclick="showLoginTypeSelection()" class="text-[#D0BCFF] hover:text-white p-2 rounded-lg hover:bg-[#25232A] transition">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-2xl font-black text-white">Öğretmen Girişi</h1>
                </div>

                <!-- Teacher Login Form -->
                <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-6 space-y-4">
                    <form onsubmit="handleTeacherLogin(event)" class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-[#938F99]">E-Posta Adresi</label>
                            <input type="email" id="teacherEmail" required placeholder="ornek@email.com" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Şifre</label>
                            <input type="password" id="teacherPassword" required placeholder="••••••••" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <button type="submit" class="w-full bg-[#D0BCFF] hover:bg-[#bfa7f2] text-[#381E72] font-bold py-3 rounded-xl transition">
                            Giriş Yap
                        </button>
                    </form>

                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-[#3B383E]"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-[#25232A] text-[#938F99]">veya</span>
                        </div>
                    </div>

                    <button onclick="showTeacherRegister()" class="w-full bg-[#1C1B1F] hover:bg-[#2e2a36] border border-[#49454F] text-white font-bold py-3 rounded-xl transition">
                        Yeni Hesap Oluştur
                    </button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// ==================== TEACHER REGISTER SCREEN ====================
function showTeacherRegister() {
    const authScreen = document.getElementById('authScreen');
    authScreen.innerHTML = `
        <div class="min-h-screen bg-[#141218] flex items-center justify-center p-4">
            <div class="max-w-md w-full space-y-6">
                <!-- Header with Back Button -->
                <div class="flex items-center space-x-2">
                    <button onclick="showTeacherLogin()" class="text-[#D0BCFF] hover:text-white p-2 rounded-lg hover:bg-[#25232A] transition">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-2xl font-black text-white">Öğretmen Kaydı</h1>
                </div>

                <!-- Teacher Register Form -->
                <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-6 space-y-4">
                    <form onsubmit="handleTeacherRegister(event)" class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Ad Soyad</label>
                            <input type="text" id="teacherFullName" required placeholder="Ahmet Yılmaz" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">E-Posta Adresi</label>
                            <input type="email" id="teacherRegEmail" required placeholder="ornek@email.com" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Şifre (En az 6 karakter)</label>
                            <input type="password" id="teacherRegPassword" required minlength="6" placeholder="••••••••" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Şifre (Tekrar)</label>
                            <input type="password" id="teacherRegPasswordConfirm" required minlength="6" placeholder="••••••••" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <button type="submit" class="w-full bg-[#D0BCFF] hover:bg-[#bfa7f2] text-[#381E72] font-bold py-3 rounded-xl transition">
                            Kayıt Ol
                        </button>
                    </form>
                </div>

                <p class="text-xs text-[#938F99] text-center">Kayıt yaparak <span class="text-[#D0BCFF]">Kullanım Koşullarını</span> kabul edersiniz.</p>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// ==================== STUDENT LOGIN SCREEN ====================
function showStudentLogin() {
    const authScreen = document.getElementById('authScreen');
    authScreen.innerHTML = `
        <div class="min-h-screen bg-[#141218] flex items-center justify-center p-4">
            <div class="max-w-md w-full space-y-6">
                <!-- Header with Back Button -->
                <div class="flex items-center space-x-2">
                    <button onclick="showLoginTypeSelection()" class="text-[#D0BCFF] hover:text-white p-2 rounded-lg hover:bg-[#25232A] transition">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-2xl font-black text-white">Öğrenci Girişi</h1>
                </div>

                <!-- Student Login Form -->
                <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-6 space-y-4">
                    <form onsubmit="handleStudentLogin(event)" class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Adın Soyadın</label>
                            <input type="text" id="studentName" required placeholder="Ahmet Yılmaz" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Davetiye Kodu</label>
                            <input type="text" id="invitationCode" required placeholder="Örn: ABC123XYZ456" maxlength="24" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition uppercase">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[#938F99]">Hedef Sınav Türü</label>
                            <select id="studentTargetExam" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D0BCFF] transition">
                                <option value="YKS (Sayısal)">YKS (Sayısal)</option>
                                <option value="YKS (Eşit Ağırlık)">YKS (Eşit Ağırlık)</option>
                                <option value="YKS (Sözel)">YKS (Sözel)</option>
                                <option value="LGS">LGS</option>
                                <option value="KPSS">KPSS</option>
                            </select>
                        </div>

                        <button type="submit" class="w-full bg-[#81C784] hover:bg-[#66BB6A] text-white font-bold py-3 rounded-xl transition">
                            Girişe Başla
                        </button>
                    </form>

                    <div class="bg-[#1C1B1F] border border-[#3B383E] rounded-xl p-3">
                        <p class="text-xs text-[#938F99]">
                            <strong>Davetiye kodum yok?</strong> Lütfen öğretmeninizle iletişime geçin ve davetiye kodu isteyiniz.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// ==================== EMAIL VERIFICATION SCREEN ====================
function showEmailVerification(email, userType = 'teacher') {
    const authScreen = document.getElementById('authScreen');
    authScreen.innerHTML = `
        <div class="min-h-screen bg-[#141218] flex items-center justify-center p-4">
            <div class="max-w-md w-full space-y-6">
                <!-- Verification Icon -->
                <div class="text-center space-y-4">
                    <div class="w-16 h-16 rounded-3xl bg-[#4A4458] flex items-center justify-center text-[#D0BCFF] shadow-lg mx-auto">
                        <i data-lucide="mail" class="w-8 h-8"></i>
                    </div>
                    <h1 class="text-2xl font-black text-white">E-Posta Doğrulama</h1>
                    <p class="text-sm text-[#938F99]">${email} adresine bir doğrulama e-postası gönderdik.</p>
                </div>

                <!-- Verification Code Input -->
                <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-6 space-y-4">
                    <form onsubmit="handleEmailVerification(event, '${userType}')" class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-[#938F99]">6 Haneli Doğrulama Kodu</label>
                            <input type="text" id="verificationCode" required maxlength="6" placeholder="000000" class="w-full mt-1 bg-[#1C1B1F] border border-[#49454F] rounded-xl px-4 py-3 text-2xl text-white text-center placeholder-[#49454F] focus:outline-none focus:border-[#D0BCFF] transition font-bold tracking-widest">
                        </div>

                        <button type="submit" class="w-full bg-[#D0BCFF] hover:bg-[#bfa7f2] text-[#381E72] font-bold py-3 rounded-xl transition">
                            Doğrula
                        </button>
                    </form>

                    <div class="text-center">
                        <button onclick="resendVerificationEmail('${email}')" class="text-xs text-[#D0BCFF] hover:text-white font-bold">
                            Kodu Tekrar Gönder
                        </button>
                    </div>
                </div>

                <p class="text-xs text-[#938F99] text-center">
                    Spam klasörünü de kontrol etmeyi unutmayın.
                </p>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// ==================== TEACHER LOGIN HANDLER ====================
async function handleTeacherLogin(event) {
    event.preventDefault();
    const email = document.getElementById('teacherEmail').value;
    const password = document.getElementById('teacherPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const teacherId = userCredential.user.uid;

        // Check if email is verified
        await userCredential.user.reload();
        if (!userCredential.user.emailVerified) {
            showToast('E-posta adresiniz doğrulanmamış. Lütfen e-postanızı kontrol edin.', 'error');
            await signOut(auth);
            showTeacherLogin();
            return;
        }

        window.currentUser = userCredential.user;
        await loadUserProfile(teacherId);
        window.onFirebaseReady?.();
        showAppScreen();
        showToast('Başarıyla giriş yaptınız!', 'success');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            showToast('Bu e-posta ile kayıtlı öğretmen bulunamadı.', 'error');
        } else if (error.code === 'auth/wrong-password') {
            showToast('Şifre yanlış.', 'error');
        } else {
            showToast(`Giriş hatası: ${error.message}`, 'error');
        }
    }
}

// ==================== TEACHER REGISTER HANDLER ====================
async function handleTeacherRegister(event) {
    event.preventDefault();
    const fullName = document.getElementById('teacherFullName').value;
    const email = document.getElementById('teacherRegEmail').value;
    const password = document.getElementById('teacherRegPassword').value;
    const passwordConfirm = document.getElementById('teacherRegPasswordConfirm').value;

    if (password !== passwordConfirm) {
        showToast('Şifreler eşleşmiyor.', 'error');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const teacherId = userCredential.user.uid;

        // Send email verification
        await sendEmailVerification(userCredential.user);

        // Create teacher profile
        const teacherProfile = {
            id: teacherId,
            email: email,
            fullName: fullName,
            role: 'teacher',
            createdAt: new Date().toISOString(),
            studentCount: 0,
            invitationCode: generateInvitationCode(),
            isActive: true,
            emailVerified: false
        };

        await syncDocToCloud('teachers', teacherId, teacherProfile);
        localStorage.setItem('userProfile', JSON.stringify(teacherProfile));

        showToast('Kaydınız başarılı! E-postanızı doğrulamak için linke tıklayın.', 'success');
        showEmailVerification(email, 'teacher');
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showToast('Bu e-posta zaten kullanılıyor.', 'error');
        } else if (error.code === 'auth/weak-password') {
            showToast('Şifre en az 6 karakter olmalıdır.', 'error');
        } else {
            showToast(`Kayıt hatası: ${error.message}`, 'error');
        }
    }
}

// ==================== STUDENT LOGIN HANDLER ====================
async function handleStudentLogin(event) {
    event.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const invitationCode = document.getElementById('invitationCode').value.toUpperCase();
    const targetExam = document.getElementById('studentTargetExam').value;

    try {
        // Validate invitation code
        const teacherQuery = query(
            collection(db, 'teachers'),
            where('invitationCode', '==', invitationCode)
        );
        const teacherSnapshot = await getDocs(teacherQuery);

        if (teacherSnapshot.empty) {
            showToast('Geçersiz davetiye kodu. Lütfen kontrol edin.', 'error');
            return;
        }

        const teacherDoc = teacherSnapshot.docs[0];
        const teacherId = teacherDoc.id;

        // Create anonymous Firebase Auth for student
        const userCredential = await signInAnonymously(auth);
        const studentId = userCredential.user.uid;

        // Create student profile
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

        // Add student to teacher's list
        const studentsList = teacherDoc.data().students || [];
        studentsList.push(studentId);
        await syncDocToCloud('teachers', teacherId, {
            ...teacherDoc.data(),
            students: studentsList,
            studentCount: studentsList.length
        });

        window.currentUser = userCredential.user;
        localStorage.setItem('userProfile', JSON.stringify(studentProfile));
        await loadUserProfile(studentId);
        window.onFirebaseReady?.();
        showAppScreen();
        showToast(`Hoş geldiniz, ${studentName}!`, 'success');
    } catch (error) {
        showToast(`Öğrenci girişi hatası: ${error.message}`, 'error');
    }
}

// ==================== EMAIL VERIFICATION HANDLER ====================
async function handleEmailVerification(event, userType) {
    event.preventDefault();
    // Note: In a real app, you'd validate the code against your backend
    // For now, we'll accept any 6-digit code and show confirmation
    
    showToast('E-posta doğrulama talebiniz kaydedildi. Lütfen e-postanızdaki linke tıklayın.', 'success');
    
    if (userType === 'teacher') {
        setTimeout(() => showTeacherLogin(), 2000);
    }
}

// ==================== RESEND VERIFICATION EMAIL ====================
async function resendVerificationEmail(email) {
    try {
        const user = auth.currentUser;
        if (user) {
            await sendEmailVerification(user);
            showToast('Doğrulama e-postası tekrar gönderildi!', 'success');
        }
    } catch (error) {
        showToast(`Hata: ${error.message}`, 'error');
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
        localStorage.removeItem('userRole');
        window.currentUser = null;
        window.userProfile = null;
        showLoginTypeSelection();
        showToast('Çıkış yapıldı.', 'success');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ==================== SHOW APP SCREEN ====================
function showAppScreen() {
    document.getElementById('authScreen')?.classList.add('hidden');
    document.getElementById('mainApp')?.classList.remove('hidden');
}
