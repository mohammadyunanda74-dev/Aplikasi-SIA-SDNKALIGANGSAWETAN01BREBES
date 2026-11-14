/**
 * APPLICATION ORCHESTRATOR - SIA SEKOLAH SDN KALIGANGSA WETAN 01
 * Navigation, Router, Dashboard Metrics & Charts, Public Portal & Role-Based UI
 */

window.app = {
  currentRoute: "dashboard",

  async init() {
    await window.dataStore.init();
    this.startClock();
    this.checkInitialRoute();
  },

  checkInitialRoute() {
    const user = window.dataStore.getCurrentUser();
    if (!user) {
      // Tampilkan landing page publik secara default jika belum login
      this.showPublicPortal();
    } else {
      this.showAppLayout();
      if (user.role === "guru") {
        this.navigate("absensi-mandiri");
      } else {
        this.navigate("dashboard");
      }
    }
  },

  startClock() {
    setInterval(() => {
      const el = document.getElementById("topbar-live-clock");
      if (el) {
        el.textContent = new Date().toLocaleTimeString("id-ID", { hour12: false }) + " WIB";
      }
    }, 1000);
  },

  showPublicPortal() {
    document.getElementById("public-portal-container").style.display = "block";
    document.getElementById("app-container").style.display = "none";
    this.renderPublicPortal();
  },

  showAppLayout() {
    document.getElementById("public-portal-container").style.display = "none";
    document.getElementById("app-container").style.display = "flex";
    this.updateUserSnippet();
    this.applyRoleRestrictions();
  },

  updateUserSnippet() {
    const user = window.dataStore.getCurrentUser();
    const nameEl = document.getElementById("sidebar-user-name");
    const roleEl = document.getElementById("sidebar-user-role");
    const avatarEl = document.getElementById("sidebar-user-avatar");

    if (user && nameEl && roleEl && avatarEl) {
      nameEl.textContent = user.nama;
      roleEl.textContent = user.role.toUpperCase() + (user.jabatan ? ` - ${user.jabatan}` : "");
      avatarEl.textContent = user.nama.charAt(0).toUpperCase();
    }
  },

  applyRoleRestrictions() {
    const user = window.dataStore.getCurrentUser();
    if (!user) return;

    // Sembunyikan menu pengaturan bagi selain operator
    const navPengaturan = document.getElementById("nav-pengaturan");
    if (navPengaturan) {
      navPengaturan.style.display = user.role === "operator" ? "flex" : "none";
    }

    // Role guru hanya melihat menu absensi mandiri, siswa kelas, dan rekap
    const menuAdminOnly = document.querySelectorAll(".menu-operator-only");
    menuAdminOnly.forEach(el => {
      el.style.display = user.role === "operator" ? "flex" : "none";
    });

    const menuGuruOnly = document.querySelectorAll(".menu-guru-only");
    menuGuruOnly.forEach(el => {
      el.style.display = (user.role === "guru" || user.role === "operator") ? "flex" : "none";
    });
  },

  navigate(route) {
    this.currentRoute = route;
    const user = window.dataStore.getCurrentUser();
    if (!user) {
      this.showPublicPortal();
      return;
    }

    this.showAppLayout();

    // Update active nav styling
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    const activeItem = document.getElementById(`nav-${route}`);
    if (activeItem) activeItem.classList.add("active");

    // Update breadcrumb
    const breadcrumbEl = document.getElementById("topbar-breadcrumb-title");
    if (breadcrumbEl) {
      breadcrumbEl.textContent = this.getRouteTitle(route);
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.classList.remove("open");

    // Route dispatching
    switch (route) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "siswa":
        window.siswaModule.init();
        break;
      case "mutasi-masuk":
        window.mutasiModule.init("masuk");
        break;
      case "mutasi-keluar":
        window.mutasiModule.init("keluar");
        break;
      case "gtk":
        window.gtkModule.init();
        break;
      case "surat":
        window.suratModule.init();
        break;
      case "agenda-masuk":
        window.agendaModule.init("masuk");
        break;
      case "agenda-keluar":
        window.agendaModule.init("keluar");
        break;
      case "absensi-siswa":
        window.absensiSiswaModule.init("harian");
        break;
      case "rekap-absensi-siswa":
        window.absensiSiswaModule.init("rekap");
        break;
      case "absensi-guru":
        window.absensiGuruModule.init();
        break;
      case "absensi-mandiri":
        window.absensiMandiriModule.init();
        break;
      case "laporan":
        window.laporanModule.init();
        break;
      case "pengaturan":
        window.pengaturanModule.init("identitas");
        break;
      default:
        this.renderDashboard();
    }
  },

  getRouteTitle(route) {
    const titles = {
      "dashboard": "Dashboard Utama",
      "siswa": "Data Induk Peserta Didik",
      "mutasi-masuk": "Data Siswa Masuk",
      "mutasi-keluar": "Data Siswa Keluar",
      "gtk": "Data Guru & Tenaga Kependidikan",
      "surat": "Pusat Administrasi Surat Sekolah",
      "agenda-masuk": "Buku Agenda Surat Masuk",
      "agenda-keluar": "Buku Agenda Surat Keluar",
      "absensi-siswa": "Absensi Harian Siswa",
      "rekap-absensi-siswa": "Rekap Kehadiran Siswa",
      "absensi-guru": "Monitoring Absensi GTK",
      "absensi-mandiri": "Absensi Mandiri Guru",
      "laporan": "Pusat Laporan Sekolah",
      "pengaturan": "Pengaturan & Kustomisasi Tampilan"
    };
    return titles[route] || "SIA Sekolah";
  },

  toggleSidebar() {
    const sb = document.querySelector(".sidebar");
    if (sb) sb.classList.toggle("open");
  },

  // ===================== DASHBOARD UTAMA =====================
  renderDashboard() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const sekolah = window.dataStore.getSekolah();
    const allSiswa = window.dataStore.getSiswa();
    const siswaAktif = allSiswa.filter(s => s.status === "Aktif");
    const countLaki = siswaAktif.filter(s => s.jk === "L").length;
    const countPerempuan = siswaAktif.filter(s => s.jk === "P").length;
    const siswaMasuk = window.dataStore.getSiswaMasuk();
    const siswaKeluar = window.dataStore.getSiswaKeluar();
    const allGtk = window.dataStore.getGtk();
    const gtkAktif = allGtk.filter(g => g.status === "Aktif").length;
    const logs = window.dataStore.state.logAktivitas || [];

    // Calculate class breakdown
    const kelasDistribution = [1, 2, 3, 4, 5, 6].map(k => {
      return siswaAktif.filter(s => String(s.kelas) === String(k)).length;
    });

    container.innerHTML = `
      <!-- KARTU STATISTIK 8 KARTU SESUAI PERMINTAAN -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-info">
            <p>Siswa Aktif</p>
            <h3>${siswaAktif.length}</h3>
            <span class="stat-sub">Terdaftar resmi di Dapodik</span>
          </div>
          <div class="stat-icon icon-blue"><i class="bi bi-people-fill"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Siswa Laki-laki</p>
            <h3>${countLaki}</h3>
            <span class="stat-sub">${Math.round((countLaki / (siswaAktif.length || 1)) * 100)}% dari total siswa</span>
          </div>
          <div class="stat-icon icon-teal"><i class="bi bi-gender-male"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Siswa Perempuan</p>
            <h3>${countPerempuan}</h3>
            <span class="stat-sub">${Math.round((countPerempuan / (siswaAktif.length || 1)) * 100)}% dari total siswa</span>
          </div>
          <div class="stat-icon icon-purple"><i class="bi bi-gender-female"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Siswa Masuk (Tahun Ini)</p>
            <h3>${siswaMasuk.length}</h3>
            <span class="stat-sub">Mutasi masuk & baru</span>
          </div>
          <div class="stat-icon icon-green"><i class="bi bi-box-arrow-in-right"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Siswa Keluar / Lulus</p>
            <h3>${siswaKeluar.length}</h3>
            <span class="stat-sub">Mutasi keluar tahun berjalan</span>
          </div>
          <div class="stat-icon icon-red"><i class="bi bi-box-arrow-left"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Pendidik & Tendik (GTK)</p>
            <h3>${allGtk.length}</h3>
            <span class="stat-sub">${gtkAktif} Aktif mengajar</span>
          </div>
          <div class="stat-icon icon-orange"><i class="bi bi-person-workspace"></i></div>
        </div>
      </div>

      <!-- GRAFIK PERKEMBANGAN & KOMPOSISI SISWA -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:20px; margin-bottom:24px;">
        <!-- GRAFIK PERKEMBANGAN JUMLAH SISWA -->
        <div class="card" style="margin:0;">
          <div class="card-header">
            <h3><i class="bi bi-graph-up-arrow" style="color:var(--primary);"></i> Perkembangan Jumlah Siswa (4 Tahun)</h3>
            <span class="badge badge-success">Trend Positif</span>
          </div>
          <div class="card-body">
            <div style="height:220px; display:flex; align-items:flex-end; justify-content:space-around; padding-bottom:10px; border-bottom:1px solid var(--gray-200);">
              <div style="text-align:center; flex:1;">
                <div style="background:var(--primary-light); height:140px; width:44px; margin:0 auto; border-radius:6px 6px 0 0; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--primary);">156</div>
                <div style="font-size:11px; margin-top:8px; font-weight:600; color:var(--gray-600);">2023/24</div>
              </div>
              <div style="text-align:center; flex:1;">
                <div style="background:var(--primary-light); height:160px; width:44px; margin:0 auto; border-radius:6px 6px 0 0; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--primary);">162</div>
                <div style="font-size:11px; margin-top:8px; font-weight:600; color:var(--gray-600);">2024/25</div>
              </div>
              <div style="text-align:center; flex:1;">
                <div style="background:var(--primary-light); height:180px; width:44px; margin:0 auto; border-radius:6px 6px 0 0; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--primary);">169</div>
                <div style="font-size:11px; margin-top:8px; font-weight:600; color:var(--gray-600);">2025/26</div>
              </div>
              <div style="text-align:center; flex:1;">
                <div style="background:linear-gradient(180deg, var(--secondary) 0%, #166534 100%); height:200px; width:44px; margin:0 auto; border-radius:6px 6px 0 0; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; box-shadow:0 4px 10px rgba(22,163,74,0.3);">${siswaAktif.length}</div>
                <div style="font-size:11px; margin-top:8px; font-weight:700; color:var(--secondary);">2026/27</div>
              </div>
            </div>
            <p style="font-size:11px; color:var(--gray-600); margin-top:10px; text-align:center;">
              Rata-rata kenaikan jumlah peserta didik 4.2% per tahun ajaran.
            </p>
          </div>
        </div>

        <!-- KOMPOSISI SISWA PER KELAS 1 - 6 -->
        <div class="card" style="margin:0;">
          <div class="card-header">
            <h3><i class="bi bi-bar-chart-fill" style="color:var(--secondary);"></i> Distribusi Peserta Didik per Kelas</h3>
            <span class="badge badge-info">Kelas 1 s/d 6</span>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${[1, 2, 3, 4, 5, 6].map((k, idx) => {
                const count = kelasDistribution[idx] || 0;
                const percentage = Math.max(10, Math.min(100, count * 20));
                return `
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                      <strong>Kelas ${k}</strong>
                      <span>${count} Siswa</span>
                    </div>
                    <div style="background:var(--gray-100); height:8px; border-radius:4px; overflow:hidden;">
                      <div style="background:var(--primary); width:${percentage}%; height:100%; border-radius:4px;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- INFORMASI AKTIVITAS TERBARU (LOG) & QUICK ACTIONS -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:20px;">
        <!-- LOG AKTIVITAS -->
        <div class="card" style="margin:0;">
          <div class="card-header">
            <h3><i class="bi bi-clock-history" style="color:var(--primary);"></i> Aktivitas Sistem Terbaru</h3>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.pengaturanModule.init('log')">Lihat Semua</button>
          </div>
          <div class="card-body" style="padding:14px 20px;">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${logs.slice(0, 5).map(l => `
                <div style="display:flex; align-items:flex-start; gap:12px; font-size:12px; border-bottom:1px solid var(--gray-100); padding-bottom:8px;">
                  <div style="width:28px; height:28px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <i class="bi bi-activity"></i>
                  </div>
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between;">
                      <strong>${l.nama || l.pengguna}</strong>
                      <small style="color:var(--gray-400);">${l.waktu}</small>
                    </div>
                    <p style="color:var(--gray-600); margin:2px 0 0 0;">${l.detail}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- PINTASAN AKSI CEPAT OPERATOR -->
        <div class="card" style="margin:0;">
          <div class="card-header">
            <h3><i class="bi bi-lightning-charge-fill" style="color:var(--warning);"></i> Pintasan Administrasi Cepat</h3>
            <span class="badge badge-neutral">Akses 1-Klik</span>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <button class="btn btn-outline-primary" style="justify-content:flex-start; padding:12px;" onclick="window.siswaModule.bukaModalTambah()">
                <i class="bi bi-person-plus-fill"></i> Tambah Siswa Baru
              </button>
              <button class="btn btn-outline-primary" style="justify-content:flex-start; padding:12px;" onclick="window.app.navigate('surat')">
                <i class="bi bi-envelope-paper"></i> Terbitkan Surat Resmi
              </button>
              <button class="btn btn-outline-secondary" style="justify-content:flex-start; padding:12px;" onclick="window.app.navigate('absensi-siswa')">
                <i class="bi bi-calendar-check"></i> Absensi Kelas Hari Ini
              </button>
              <button class="btn btn-outline-secondary" style="justify-content:flex-start; padding:12px;" onclick="window.app.navigate('mutasi-masuk')">
                <i class="bi bi-box-arrow-in-right"></i> Pendaftaran Mutasi
              </button>
              <button class="btn btn-outline-secondary" style="justify-content:flex-start; padding:12px;" onclick="window.app.navigate('laporan')">
                <i class="bi bi-printer"></i> Cetak Laporan Sekolah
              </button>
              <button class="btn btn-outline-secondary" style="justify-content:flex-start; padding:12px;" onclick="window.dataStore.exportDatabaseJSON()">
                <i class="bi bi-download"></i> Backup Database (.json)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===================== PORTAL LANDING PAGE PUBLIK =====================
  renderPublicPortal() {
    const sekolah = window.dataStore.getSekolah();
    const tema = window.dataStore.getTema();
    const siswaAktif = window.dataStore.getSiswa({ status: "Aktif" });
    const allGtk = window.dataStore.getGtk({ status: "Aktif" });
    const pengumuman = window.dataStore.getPengumuman();

    const portal = document.getElementById("public-portal-container");
    if (!portal) return;

    portal.innerHTML = `
      <!-- PUBLIC NAVBAR -->
      <nav class="public-navbar">
        <a href="#" class="brand-wrap">
          <img src="${sekolah.logoSekolah}" alt="Logo Sekolah">
          <div class="brand-text">
            <h1>${sekolah.nama}</h1>
            <p>${sekolah.kecamatan}, ${sekolah.kabupaten}</p>
          </div>
        </a>

        <ul class="public-nav-links">
          <li><a href="#beranda">Beranda</a></li>
          <li><a href="#profil">Profil & Visi Misi</a></li>
          <li><a href="#pengumuman">Pengumuman & Berita</a></li>
          <li><a href="#layanan">Layanan & Unduhan</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>

        <div>
          <button class="btn btn-primary" onclick="window.app.bukaModalLogin()">
            <i class="bi bi-box-arrow-in-right"></i> Masuk ke Sistem (SIA)
          </button>
        </div>
      </nav>

      <!-- HERO SECTION -->
      <section id="beranda" class="hero-section">
        <div class="hero-content">
          <span style="background:rgba(255,255,255,0.2); padding:4px 14px; border-radius:20px; font-size:12px; font-weight:700; text-transform:uppercase;">
            Portal Informasi & Administrasi Resmi
          </span>
          <h2 style="margin-top:14px;">${tema.landingHeroHeadline || "Membangun Generasi Cerdas dan Berkarakter"}</h2>
          <p>${tema.landingHeroSub || "Selamat Datang di Portal Resmi Sistem Informasi Administrasi SDN Kaligangsa Wetan 01"}</p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn btn-secondary btn-lg" onclick="window.app.bukaModalLogin()">
              <i class="bi bi-door-open-fill"></i> Masuk Portal Guru & Staf
            </button>
            <a href="#profil" class="btn btn-outline-primary btn-lg" style="color:#ffffff; border-color:#ffffff;">
              <i class="bi bi-info-circle"></i> Kenali Sekolah Kami
            </a>
          </div>
        </div>
      </section>

      <!-- STATISTIK KARTU TERAPUNG -->
      <div class="hero-stats">
        <div class="hero-stat-card">
          <h4>${siswaAktif.length}</h4>
          <p>Peserta Didik Aktif</p>
        </div>
        <div class="hero-stat-card">
          <h4>${allGtk.length}</h4>
          <p>Guru & Tenaga Kependidikan</p>
        </div>
        <div class="hero-stat-card">
          <h4>${sekolah.akreditasi || "A"}</h4>
          <p>Status Akreditasi BAN-S/M</p>
        </div>
        <div class="hero-stat-card">
          <h4>6</h4>
          <p>Rombongan Belajar (Rombel)</p>
        </div>
      </div>

      <!-- SEKSI PROFIL & VISI MISI -->
      <section id="profil" class="section-container">
        <div class="section-header">
          <h3>Profil & Visi Misi Sekolah</h3>
          <p>Mewujudkan pendidikan bermutu, berlandaskan iman, ilmu, dan budi pekerti luhur</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
          <!-- VISI & SAMBUTAN -->
          <div class="card" style="margin:0; padding:24px;">
            <h4 style="color:var(--primary); font-size:18px; font-weight:700; margin-bottom:12px;">
              <i class="bi bi-bullseye"></i> Visi Sekolah
            </h4>
            <blockquote style="font-style:italic; font-size:15px; color:var(--dark); border-left:4px solid var(--primary); padding-left:14px; margin-bottom:20px;">
              "${tema.visi || "Terwujudnya peserta didik yang beriman, bertaqwa, cerdas, dan berkarakter."}"
            </blockquote>

            <h4 style="color:var(--secondary); font-size:16px; font-weight:700; margin-bottom:8px;">
              <i class="bi bi-person-fill"></i> Kepala Sekolah
            </h4>
            <p style="font-size:13px; color:var(--gray-600); line-height:1.6;">
              "Selamat datang di lingkungan belajar SD Negeri Kaligangsa Wetan 01. Kami berkomitmen memberikan layanan pendidikan terbaik bagi putra-putri bangsa dengan mengedepankan suasana belajar yang inklusif, aktif, dan menyenangkan."
            </p>
            <div style="margin-top:14px;">
              <strong>${sekolah.kepalaSekolah}</strong><br>
              <small style="color:var(--gray-400);">NIP. ${sekolah.nipKepalaSekolah}</small>
            </div>
          </div>

          <!-- MISI SEKOLAH -->
          <div class="card" style="margin:0; padding:24px;">
            <h4 style="color:var(--secondary); font-size:18px; font-weight:700; margin-bottom:12px;">
              <i class="bi bi-compass"></i> Misi Sekolah
            </h4>
            <ul style="font-size:13px; color:var(--dark); line-height:1.7; padding-left:18px;">
              ${Array.isArray(tema.misi) ? tema.misi.map(m => `<li>${m}</li>`).join("") : '<li>Menanamkan budi pekerti luhur dan keimanan.</li>'}
            </ul>
          </div>
        </div>
      </section>

      <!-- SEKSI PENGUMUMAN & BERITA SEKOLAH -->
      <section id="pengumuman" style="background:var(--gray-50); padding:50px 20px;">
        <div class="section-container" style="padding:0;">
          <div class="section-header">
            <h3>Informasi & Pengumuman Sekolah</h3>
            <p>Kabar kegiatan, agenda akademik, dan pengumuman resmi terbaru</p>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
            ${pengumuman.map(p => `
              <div class="card" style="margin:0; padding:20px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span class="badge badge-info">${p.kategori}</span>
                  <small style="color:var(--gray-400);">${p.tanggal}</small>
                </div>
                <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin-bottom:8px;">${p.judul}</h4>
                <p style="font-size:13px; color:var(--gray-600); line-height:1.5;">${p.ringkasan}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- SEKSI LAYANAN & UNDUHAN FORMULIR PUBLIK -->
      <section id="layanan" class="section-container">
        <div class="section-header">
          <h3>Layanan Informasi & Formulir Publik</h3>
          <p>Masyarakat dan wali murid dapat mengunduh berkas administrasi dan formulir resmi</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px;">
          <div class="card" style="margin:0; padding:18px;">
            <i class="bi bi-file-earmark-arrow-down" style="font-size:24px; color:var(--primary);"></i>
            <h5 style="margin:8px 0 4px 0; font-size:14px; font-weight:700;">Formulir Pendaftaran Siswa Baru (PPDB)</h5>
            <p style="font-size:12px; color:var(--gray-600); margin-bottom:12px;">Format isian pendaftaran calon siswa baru jenjang SD.</p>
            <button class="btn btn-outline-primary btn-sm" onclick="alert('Mengunduh formulir PPDB...')">Unduh Formulir (.pdf)</button>
          </div>

          <div class="card" style="margin:0; padding:18px;">
            <i class="bi bi-file-earmark-text" style="font-size:24px; color:var(--secondary);"></i>
            <h5 style="margin:8px 0 4px 0; font-size:14px; font-weight:700;">Formulir Permohonan Mutasi Masuk</h5>
            <p style="font-size:12px; color:var(--gray-600); margin-bottom:12px;">Format permohonan kepindahan siswa dari sekolah luar.</p>
            <button class="btn btn-outline-secondary btn-sm" onclick="alert('Mengunduh format permohonan mutasi...')">Unduh Formulir (.pdf)</button>
          </div>

          <div class="card" style="margin:0; padding:18px;">
            <i class="bi bi-calendar2-range" style="font-size:24px; color:var(--accent);"></i>
            <h5 style="margin:8px 0 4px 0; font-size:14px; font-weight:700;">Kalender Pendidikan Brebes 2026/2027</h5>
            <p style="font-size:12px; color:var(--gray-600); margin-bottom:12px;">Jadwal libur nasional, asesmen sumatif, dan rapotan.</p>
            <button class="btn btn-outline-secondary btn-sm" onclick="alert('Mengunduh kalender pendidikan...')">Unduh Kalender (.pdf)</button>
          </div>

          <div class="card" style="margin:0; padding:18px;">
            <i class="bi bi-shield-check" style="font-size:24px; color:var(--warning);"></i>
            <h5 style="margin:8px 0 4px 0; font-size:14px; font-weight:700;">Tata Tertib Sekolah & Aturan Seragam</h5>
            <p style="font-size:12px; color:var(--gray-600); margin-bottom:12px;">Pedoman ketertiban harian bagi seluruh siswa dan wali.</p>
            <button class="btn btn-outline-secondary btn-sm" onclick="alert('Mengunduh tata tertib sekolah...')">Unduh Tata Tertib (.pdf)</button>
          </div>
        </div>
      </section>

      <!-- KONTAK & FOOTER -->
      <footer id="kontak" class="footer">
        <div class="footer-grid">
          <div>
            <h4>${sekolah.nama}</h4>
            <p style="font-size:12px; line-height:1.6;">
              ${sekolah.alamat}<br>
              ${sekolah.kecamatan}, ${sekolah.kabupaten}<br>
              Provinsi Jawa Tengah - Kodepos: ${sekolah.kodepos}
            </p>
          </div>
          <div>
            <h4>Kontak Resmi Sekolah</h4>
            <p style="font-size:12px; line-height:1.8;">
              <i class="bi bi-telephone"></i> ${sekolah.telepon}<br>
              <i class="bi bi-whatsapp"></i> ${sekolah.whatsapp}<br>
              <i class="bi bi-envelope"></i> ${sekolah.email}
            </p>
          </div>
          <div>
            <h4>Akses Masuk Pengguna</h4>
            <p style="font-size:12px; margin-bottom:12px;">Hanya untuk operator sekolah, dewan guru, dan kepala sekolah:</p>
            <button class="btn btn-primary btn-sm" onclick="window.app.bukaModalLogin()">
              <i class="bi bi-box-arrow-in-right"></i> Login Sistem SIA
            </button>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; ${new Date().getFullYear()} ${sekolah.nama} - Pemerintah Kabupaten Brebes. Hak Cipta Dilindungi.
        </div>
      </footer>
    `;
  },

  // ===================== MODAL LOGIN & AUTENTIKASI =====================
  bukaModalLogin() {
    const modalHtml = `
      <div class="modal-backdrop show" id="modal-login">
        <div class="modal-dialog" style="max-width:440px;">
          <div class="modal-header" style="text-align:center; display:block; padding:24px 24px 10px 24px; border-bottom:none;">
            <div style="width:54px; height:54px; border-radius:12px; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:26px; margin:0 auto 12px auto;">
              <i class="bi bi-shield-lock-fill"></i>
            </div>
            <h4 style="font-size:18px; font-weight:800; color:var(--dark);">Masuk ke SIA SEKOLAH</h4>
            <p style="font-size:12px; color:var(--gray-600); margin-top:4px;">SDN Kaligangsa Wetan 01 Kecamatan Brebes</p>
          </div>

          <form onsubmit="window.app.prosesLogin(event)">
            <div class="modal-body" style="padding:10px 24px 20px 24px;">
              <div id="login-error-alert" style="display:none; background:#fee2e2; color:#991b1b; padding:10px; border-radius:6px; font-size:12px; margin-bottom:14px;"></div>

              <div class="form-group">
                <label>Nama Pengguna (Username) *</label>
                <div class="search-box" style="width:100%;">
                  <i class="bi bi-person"></i>
                  <input type="text" id="login-username" class="form-control" style="padding-left:34px;" placeholder="Contoh: operator / guru1 / kepsek" required autofocus>
                </div>
              </div>

              <div class="form-group">
                <label>Kata Sandi (Password) *</label>
                <div class="search-box" style="width:100%;">
                  <i class="bi bi-key"></i>
                  <input type="password" id="login-password" class="form-control" style="padding-left:34px;" placeholder="Masukkan kata sandi akun" required>
                </div>
              </div>

              <div style="background:var(--gray-50); padding:10px; border-radius:6px; font-size:11px; color:var(--gray-600); margin-top:10px;">
                <strong>Akun Pengujian Bawaan:</strong><br>
                • Operator: <code>operator</code> / <code>operator123</code><br>
                • Guru Mandiri: <code>guru1</code> / <code>guru123</code><br>
                • Kepala Sekolah: <code>kepsek</code> / <code>kepsek123</code>
              </div>
            </div>

            <div class="modal-footer" style="padding:16px 24px;">
              <button type="button" class="btn btn-outline-secondary" onclick="window.app.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary" style="flex:1;">
                <i class="bi bi-box-arrow-in-right"></i> Masuk Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.injectModal(modalHtml);
  },

  prosesLogin(e) {
    e.preventDefault();
    const u = document.getElementById("login-username").value;
    const p = document.getElementById("login-password").value;
    const res = window.dataStore.login(u, p);

    if (res.success) {
      this.tutupModal();
      this.showAppLayout();
      if (res.user.role === "guru") {
        this.navigate("absensi-mandiri");
      } else {
        this.navigate("dashboard");
      }
    } else {
      const errBox = document.getElementById("login-error-alert");
      if (errBox) {
        errBox.textContent = res.message;
        errBox.style.display = "block";
      }
    }
  },

  logout() {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      window.dataStore.logout();
      this.showPublicPortal();
    }
  },

  injectModal(html) {
    this.tutupModal();
    const div = document.createElement("div");
    div.id = "modal-container";
    div.innerHTML = html;
    document.body.appendChild(div);
  },

  tutupModal() {
    const el = document.getElementById("modal-container");
    if (el) el.remove();
  }
};

// Auto start when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
