/**
 * MEB HERKESE AÇIK KAYNAKLAR & OGM MATERYALLERİ
 * Türkiye Cumhuriyet Milli Eğitim Bakanlığı (MEB) resmi kaynakları
 * OGM (Rehberlik ve Araştırma Merkezi) eğitim materyalleri
 */

// ==================== MEB RESMİ KAYNAK LİNKLERİ ====================
const mebResources = {
    dersBransları: {
        matematik: {
            ad: "📐 Matematik",
            renk: "#FFD54F",
            kaynaklar: [
                {
                    ad: "MEB Matematik Öğretim Programı (2023)",
                    url: "https://ogm.meb.gov.tr/www/ogretim-programlari/icerik/29",
                    tür: "Resmi Program",
                    açıklama: "MEB tarafından onaylanmış resmi matematik öğretim programı",
                    segment: "TYT/AYT"
                },
                {
                    ad: "Eba Matematik Video Dersleri",
                    url: "https://www.eba.gov.tr",
                    tür: "Video Ders",
                    açıklama: "MEB'in EBA platformunda ücretsiz matematik video dersleri",
                    segment: "Tüm Seviyeler"
                },
                {
                    ad: "OGM Matematik Kazanımları Kitabı",
                    url: "https://ogm.meb.gov.tr/www/matematik-ogretim-programi/icerik/30",
                    tür: "E-Kitap",
                    açıklama: "Öğrenci kazanımları ve başarı kriterleri detayı",
                    segment: "Referans"
                },
                {
                    ad: "MEB Örnek Soru Bankası",
                    url: "https://ogm.meb.gov.tr/www/sorubankasi/icerik/32",
                    tür: "Soru Bankası",
                    açıklama: "MEB onaylı matematik örnek soruları",
                    segment: "Pratik"
                }
            ]
        },
        
        turkce: {
            ad: "📖 Türkçe & Edebiyat",
            renk: "#81C784",
            kaynaklar: [
                {
                    ad: "MEB Türkçe Öğretim Programı (2023)",
                    url: "https://ogm.meb.gov.tr/www/ogretim-programlari/icerik/29",
                    tür: "Resmi Program",
                    açıklama: "Türkçe dersi resmi kazanımları ve hedefleri",
                    segment: "TYT"
                },
                {
                    ad: "Eba Türkçe Kütüphanesi",
                    url: "https://www.eba.gov.tr/kanallar/turkce",
                    tür: "E-Kütüphane",
                    açıklama: "Türk edebiyatı eserleri ve metin analiz örnekleri",
                    segment: "Edebiyat"
                },
                {
                    ad: "Telif Serbest Türkçe Metinler",
                    url: "https://ogm.meb.gov.tr/www/telif-serbest-metinler/icerik/150",
                    tür: "Okuma Materyali",
                    açıklama: "Telif hakkı serbest edebiyat metinleri (kamu malı)",
                    segment: "Okuma"
                },
                {
                    ad: "MEB Yazım & Dilbilgisi Kılavuzu",
                    url: "https://ogm.meb.gov.tr/www/dil-ve-dil-bilgisi/icerik/45",
                    tür: "Kılavuz",
                    açıklama: "Resmi yazım ve dilbilgisi kuralları",
                    segment: "Referans"
                }
            ]
        },
        
        fen: {
            ad: "⚛️ Fen Bilimleri",
            renk: "#FF6B9D",
            kaynaklar: [
                {
                    ad: "MEB Fen Bilimleri Öğretim Programı",
                    url: "https://ogm.meb.gov.tr/www/ogretim-programlari/icerik/29",
                    tür: "Resmi Program",
                    açıklama: "Fizik, Kimya, Biyoloji kazanımları (5-8 ve 9-12)",
                    segment: "Müfredat"
                },
                {
                    ad: "Eba Fen Laboratuvarı",
                    url: "https://www.eba.gov.tr/kanallar/fen-bilimleri",
                    tür: "Sanal Lab",
                    açıklama: "İnteraktif fen deneyleri ve simülasyonlar",
                    segment: "Deneysel"
                },
                {
                    ad: "TUBITAK Eğitim Kaynakları",
                    url: "https://egitimdeki.tubitak.gov.tr",
                    tür: "Bilimsel Kaynak",
                    açıklama: "TUBITAK işbirliğiyle hazırlanmış fen materyalleri",
                    segment: "Derinleştirme"
                },
                {
                    ad: "OGM Fen Bilimleri Deneyleri",
                    url: "https://ogm.meb.gov.tr/www/laboratuvar-deneyler/icerik/200",
                    tür: "Deney Kılavuzu",
                    açıklama: "Adım adım fen deneyleri ve malzeme listeleri",
                    segment: "Pratik"
                }
            ]
        },
        
        sosyal: {
            ad: "🏛️ Sosyal Bilgiler",
            renk: "#64B5F6",
            kaynaklar: [
                {
                    ad: "MEB Sosyal Bilgiler Öğretim Programı",
                    url: "https://ogm.meb.gov.tr/www/ogretim-programlari/icerik/29",
                    tür: "Resmi Program",
                    açıklama: "Tarih, Coğrafya, Vatandaşlık kazanımları",
                    segment: "Müfredat"
                },
                {
                    ad: "T.C. Başbakanlık Osmanlı Arşivi",
                    url: "https://www.oa.gov.tr/en",
                    tür: "Arşiv",
                    açıklama: "Resmi tarihsel belgeler ve arşiv malzemeleri",
                    segment: "Tarih Araştırma"
                },
                {
                    ad: "TÜİK Eğitim Veri Portalı",
                    url: "https://www.tuik.gov.tr/Start.do",
                    tür: "İstatistik",
                    açıklama: "Türkiye İstatistik Kurumu resmi verileri",
                    segment: "Coğrafya/İktisat"
                },
                {
                    ad: "Eba Sosyal Bilgiler Kaynakları",
                    url: "https://www.eba.gov.tr/kanallar/sosyal-bilgiler",
                    tür: "E-Kütüphane",
                    açıklama: "Harita, tarihsel kaynaklar ve videolar",
                    segment: "Multimedia"
                },
                {
                    ad: "UNESCO Dünya Mirası Enstitüsü",
                    url: "https://whc.unesco.org/en/list/?country=tr",
                    tür: "Kültürel Miras",
                    açıklama: "Türkiye'deki UNESCO dünya mirası alanları",
                    segment: "Coğrafya"
                }
            ]
        }
    },

    // ==================== GENEL OGM MATERYALLERİ ====================
    genel: {
        ad: "🎓 Genel OGM Kaynakları",
        kaynaklar: [
            {
                ad: "OGM Resmi Web Sitesi",
                url: "https://ogm.meb.gov.tr",
                tür: "Portal",
                açıklama: "Öğretmen, Eğitim Yöneticileri, Rehber Öğretmenler ve Okul Öncesi Öğretmenleri Yetiştirme Dairesi Başkanlığı",
                segment: "Ana Kaynak"
            },
            {
                ad: "EBA (Eğitim Bilişim Ağı)",
                url: "https://www.eba.gov.tr",
                tür: "Platform",
                açıklama: "MEB'in en kapsamlı ücretsiz eğitim platformu (Video, Kütüphane, İnteraktif İçerik)",
                segment: "Çoklu Medya"
            },
            {
                ad: "MEB Dijital Dönüşüm Kaynakları",
                url: "https://ogm.meb.gov.tr/www/dijital-doenuesuem-icerigleri/icerik/111",
                tür: "Eğitim Teknolojisi",
                açıklama: "Dijital öğrenme araçları ve teknoloji entegrasyonu rehberleri",
                segment: "Teknoloji"
            },
            {
                ad: "MEB Kitaplar Dijital Koleksiyonu",
                url: "https://ekitap.meb.gov.tr",
                tür: "E-Kitap",
                açıklama: "Ders kitapları, kütüphane kitapları ve referans eserleri",
                segment: "E-Kütüphane"
            },
            {
                ad: "MEB Rehberlik Servisleri",
                url: "https://ogm.meb.gov.tr/www/rehber-ogretmenler/icerik/120",
                tür: "Rehberlik",
                açıklama: "Kariyer rehberliği, akademik destek ve psikolojik danışmanlık materyalleri",
                segment: "Rehberlik"
            },
            {
                ad: "Yeni Medeniyetler Enstitüsü Kaynakları",
                url: "https://www.ymbe.org.tr",
                tür: "İslami Kültür",
                açıklama: "Din eğitimi ve İslami mirasla ilgili kaynaklar",
                segment: "İlişkili"
            }
        ]
    },

    // ==================== SINAV ÖZELLİKLERİ ====================
    sinavlar: {
        tyt: {
            ad: "TYT Hazırlık Kaynakları",
            link: "https://osym.gov.tr",
            resmiBilgi: "ÖSYM Resmi Sitesi",
            mebDesteği: [
                {
                    ad: "MEB TYT Konu Haritaları",
                    url: "https://ogm.meb.gov.tr/www/tyt-hazirlik/icerik/400",
                    açıklama: "Branş bazında TYT konuları ve ağırlıklandırması"
                },
                {
                    ad: "Eba TYT Video Dersleri",
                    url: "https://www.eba.gov.tr/tyt",
                    açıklama: "Uzman öğretmenlerle hazırlanmış video dersler"
                }
            ]
        },

        ayt: {
            ad: "AYT Hazırlık Kaynakları",
            link: "https://osym.gov.tr",
            resmiBilgi: "ÖSYM Resmi Sitesi",
            mebDesteği: [
                {
                    ad: "MEB AYT Konu Haritaları",
                    url: "https://ogm.meb.gov.tr/www/ayt-hazirlik/icerik/401",
                    açıklama: "Seçmeli branşlar (Matematik, Sayısal, Eşit Ağırlık, Sözel)"
                },
                {
                    ad: "Eba AYT Video Dersleri",
                    url: "https://www.eba.gov.tr/ayt",
                    açıklama: "Branş bazında AYT video dersler ve açıklamaları"
                }
            ]
        },

        lgs: {
            ad: "LGS Hazırlık Kaynakları",
            link: "https://www.meb.gov.tr/lgs",
            resmiBilgi: "MEB LGS Resmi Sayfası",
            mebDesteği: [
                {
                    ad: "MEB LGS Öğretim Programı",
                    url: "https://ogm.meb.gov.tr/www/lgs-hazirlik/icerik/350",
                    açıklama: "LGS hedef belirleme ve kazanımları"
                },
                {
                    ad: "Eba LGS Örnek Soruları",
                    url: "https://www.eba.gov.tr/lgs",
                    açıklama: "Yıllara göre örnek LGS soruları"
                }
            ]
        }
    }
};

// ==================== MEB KAYNAKLARINI LOAD ETME ====================
function getMebResourcesBySubject(subject) {
    const subjectKey = {
        'Matematik': 'matematik',
        'Türkçe': 'turkce',
        'Fen': 'fen',
        'Sosyal': 'sosyal'
    }[subject];

    return subjectKey ? mebResources.dersBransları[subjectKey] : null;
}

function getMebGeneralResources() {
    return mebResources.genel;
}

function getMebExamResources(examType) {
    const examKey = examType.toLowerCase().includes('tyt') ? 'tyt' : 
                   examType.toLowerCase().includes('ayt') ? 'ayt' : 'lgs';
    
    return mebResources.sinavlar[examKey];
}

// ==================== MEB KAYNAKLARINI HTML'E DÖNÜŞTÜRME ====================
function renderMebResourceCard(kaynak) {
    return `
        <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-4 hover:border-[#D0BCFF] transition cursor-pointer group">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-bold bg-[#4A4458] text-[#D0BCFF] px-2 py-1 rounded-lg">${kaynak.tür}</span>
                        <span class="text-xs text-[#938F99]">${kaynak.segment || 'Genel'}</span>
                    </div>
                    <h4 class="text-sm font-bold text-white mt-2 group-hover:text-[#D0BCFF] transition">${kaynak.ad}</h4>
                    <p class="text-xs text-[#938F99] mt-1">${kaynak.açıklama}</p>
                </div>
                <a href="${kaynak.url}" target="_blank" rel="noopener noreferrer" class="ml-2 text-[#D0BCFF] hover:text-white p-1.5 rounded-lg hover:bg-[#4A4458] transition">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
            </div>
            <div class="mt-3 pt-3 border-t border-[#3B383E] flex items-center justify-between">
                <span class="text-[10px] text-[#938F99] font-semibold">MEB Resmi Kaynağı</span>
                <button onclick="openMebResourceModal('${kaynak.ad}', '${kaynak.url}', '${kaynak.açıklama}')" class="text-xs text-[#D0BCFF] hover:text-white font-bold">Detay →</button>
            </div>
        </div>
    `;
}

// ==================== KÖK MODAL AÇMA ====================
function openMebResourcesTab() {
    switchTab('mebKaynak');
}

// ==================== MEB KAYNAK MODAL ====================
function openMebResourceModal(ad, url, aciklama) {
    const modal = document.getElementById('mebResourceDetailModal');
    document.getElementById('mebResourceTitle').innerText = ad;
    document.getElementById('mebResourceDesc').innerText = aciklama;
    document.getElementById('mebResourceLink').href = url;
    modal.classList.remove('hidden');
}

function closeMebResourceModal() {
    document.getElementById('mebResourceDetailModal').classList.add('hidden');
}

// ==================== MEB KAYNAKLARI KÖŞESİNİ DOLDURMA ====================
function populateMebResourcesPage() {
    const container = document.getElementById('mebResourcesContainer');
    
    let html = `
        <div class="space-y-8">
            <!-- Ders Branşları Bölümü -->
            <section class="space-y-4">
                <div class="flex items-center space-x-2">
                    <i data-lucide="book-open" class="w-5 h-5 text-[#D0BCFF]"></i>
                    <h2 class="text-lg font-black text-white">📚 Ders Branşları Kaynakları</h2>
                </div>

                <!-- Branş Sekmeler Tabı -->
                <div class="flex space-x-2 overflow-x-auto custom-scrollbar pb-2">
                    <button onclick="filterMebBranch('tum')" class="meb-branch-btn active px-4 py-2 rounded-xl text-xs font-bold bg-[#D0BCFF] text-[#381E72] whitespace-nowrap">Tüm Kaynaklar</button>
                    <button onclick="filterMebBranch('matematik')" class="meb-branch-btn px-4 py-2 rounded-xl text-xs font-bold bg-[#1C1B1F] text-white hover:bg-[#25232A] whitespace-nowrap">📐 Matematik</button>
                    <button onclick="filterMebBranch('turkce')" class="meb-branch-btn px-4 py-2 rounded-xl text-xs font-bold bg-[#1C1B1F] text-white hover:bg-[#25232A] whitespace-nowrap">📖 Türkçe</button>
                    <button onclick="filterMebBranch('fen')" class="meb-branch-btn px-4 py-2 rounded-xl text-xs font-bold bg-[#1C1B1F] text-white hover:bg-[#25232A] whitespace-nowrap">⚛️ Fen</button>
                    <button onclick="filterMebBranch('sosyal')" class="meb-branch-btn px-4 py-2 rounded-xl text-xs font-bold bg-[#1C1B1F] text-white hover:bg-[#25232A] whitespace-nowrap">🏛️ Sosyal</button>
                </div>

                <!-- Branş Kaynakları Grid -->
                <div id="mebBranchResourcesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Dinamik Doldurulacak -->
                </div>
            </section>

            <!-- Genel OGM Kaynakları -->
            <section class="space-y-4 border-t border-[#3B383E] pt-8">
                <div class="flex items-center space-x-2">
                    <i data-lucide="globe" class="w-5 h-5 text-[#FFD54F]"></i>
                    <h2 class="text-lg font-black text-white">🌐 Genel OGM Kaynakları</h2>
                </div>

                <p class="text-xs text-[#938F99]">Tüm öğrenme alanlarını kapsayan merkezi kaynaklar ve platformlar</p>

                <div id="mebGeneralResourcesGrid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Dinamik Doldurulacak -->
                </div>
            </section>

            <!-- Sınav Özellikleri Kaynakları -->
            <section class="space-y-4 border-t border-[#3B383E] pt-8">
                <div class="flex items-center space-x-2">
                    <i data-lucide="target" class="w-5 h-5 text-[#81C784]"></i>
                    <h2 class="text-lg font-black text-white">🎯 Sınav Özellikleri Kaynakları</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${Object.values(mebResources.sinavlar).map(sinav => `
                        <div class="bg-[#25232A] border border-[#49454F] rounded-2xl p-5 space-y-3">
                            <h3 class="text-sm font-bold text-white">${sinav.ad}</h3>
                            <p class="text-xs text-[#938F99]">${sinav.resmiBilgi}</p>
                            <a href="${sinav.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1 text-xs text-[#D0BCFF] hover:text-white font-bold">
                                <span>ÖSYM Sitesine Git</span>
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                            <div class="space-y-2 pt-2 border-t border-[#3B383E]">
                                ${sinav.mebDesteği.map(kaynak => `
                                    <a href="${kaynak.url}" target="_blank" rel="noopener noreferrer" class="block text-xs text-[#938F99] hover:text-[#D0BCFF] transition">
                                        • ${kaynak.ad}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Yararlı Bağlantılar -->
            <section class="space-y-4 border-t border-[#3B383E] pt-8 pb-8">
                <div class="flex items-center space-x-2">
                    <i data-lucide="link" class="w-5 h-5 text-[#FF6B9D]"></i>
                    <h2 class="text-lg font-black text-white">🔗 Doğrudan Bağlantılar</h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">MEB Resmi Portalı</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>

                    <a href="https://ogm.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">OGM Resmi Sitesi</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>

                    <a href="https://www.eba.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">EBA Platformu</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>

                    <a href="https://ekitap.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">Dijital Kitap Kütüphanesi</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>

                    <a href="https://www.oba.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">Açık Erişim Arşivi</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>

                    <a href="https://osym.gov.tr" target="_blank" rel="noopener noreferrer" class="bg-[#25232A] border border-[#49454F] rounded-2xl p-3 hover:border-[#D0BCFF] transition">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-white">ÖSYM Sınav Bilgileri</span>
                            <i data-lucide="external-link" class="w-4 h-4 text-[#D0BCFF]"></i>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    `;

    container.innerHTML = html;
    lucide.createIcons();
    
    // İlk yükleme
    filterMebBranch('tum');
}

function filterMebBranch(branch) {
    // Buton aktif göstergisini güncelle
    document.querySelectorAll('.meb-branch-btn').forEach(btn => {
        btn.classList.remove('bg-[#D0BCFF]', 'text-[#381E72]');
        btn.classList.add('bg-[#1C1B1F]', 'text-white');
    });
    event.target.classList.remove('bg-[#1C1B1F]', 'text-white');
    event.target.classList.add('bg-[#D0BCFF]', 'text-[#381E72]');

    const grid = document.getElementById('mebBranchResourcesGrid');
    let html = '';

    if (branch === 'tum') {
        // Tüm branşları göster
        Object.values(mebResources.dersBransları).forEach(brans => {
            brans.kaynaklar.forEach(kaynak => {
                html += renderMebResourceCard(kaynak);
            });
        });
    } else {
        // Seçili branşı göster
        const branchData = mebResources.dersBransları[branch];
        if (branchData) {
            branchData.kaynaklar.forEach(kaynak => {
                html += renderMebResourceCard(kaynak);
            });
        }
    }

    grid.innerHTML = html;
    lucide.createIcons();

    // Genel kaynakları da doldur
    const generalGrid = document.getElementById('mebGeneralResourcesGrid');
    let generalHtml = '';
    mebResources.genel.kaynaklar.forEach(kaynak => {
        generalHtml += renderMebResourceCard(kaynak);
    });
    generalGrid.innerHTML = generalHtml;
    lucide.createIcons();
}

// ==================== TÖM KAYNAKLAR MODAL ====================
function openMebAllResourcesModal() {
    const modal = document.getElementById('mebAllResourcesModal');
    modal.classList.remove('hidden');
    populateMebResourcesPage();
}

function closeMebAllResourcesModal() {
    document.getElementById('mebAllResourcesModal').classList.add('hidden');
}
