/**
 * MODUL PENGATURAN APLIKASI & KUSTOMISASI TAMPILAN
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 * Memungkinkan operator sekolah mengedit seluruh teks, warna tema, logo, kop, akun, backup & restore
 */

window.pengaturanModule = {
  activeTab: "identitas", // "identitas" | "tema" | "akun" | "backup" | "log"

  init(tab = "identitas") {
    this.activeTab = tab;
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const sekolah = window.dataStore.getSekolah();
    const tema = window.dataStore.getTema();
    const pengguna = window.dataStore.getPengguna();
    const logs = window.dataStore.state.logAktivitas || [];

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-gear-fill" style="color:var(--primary);"></i> Pengaturan Sistem & Kustomisasi Tampilan</h3>
            <p>Kelola identitas resmi, kop surat, tema visual, manajemen akun, cadangan database, dan log audit</p>
          </div>
          <div>
            <span class="badge badge-success">Hak Akses: Operator Sekolah</span>
          </div>
        </div>

        <div class="card-body">
          <!-- NAV PENGATURAN -->
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:12px; margin-bottom:24px; border-bottom:1px solid var(--gray-200);">
            <button class="btn btn-sm ${this.activeTab === 'identitas' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.pengaturanModule.init('identitas')">
              <i class="bi bi-building"></i> Identitas & Kop Surat
            </button>
            <button class="btn btn-sm ${this.activeTab === 'tema' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.pengaturanModule.init('tema')">
              <i class="bi bi-palette"></i> Kustomisasi Tampilan & Web Publik
            </button>
            <button class="btn btn-sm ${this.activeTab === 'akun' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.pengaturanModule.init('akun')">
              <i class="bi bi-people"></i> Manajemen Akun Pengguna
            </button>
            <button class="btn btn-sm ${this.activeTab === 'backup' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.pengaturanModule.init('backup')">
              <i class="bi bi-database-check"></i> Backup & Restore Database
            </button>
            <button class="btn btn-sm ${this.activeTab === 'log' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.pengaturanModule.init('log')">
              <i class="bi bi-clock-history"></i> Log Aktivitas Sistem
            </button>
          </div>

          <!-- TAB KONTEN -->
          ${this.renderTabContent(sekolah, tema, pengguna, logs)}
        </div>
      </div>
    `;
  },

  renderTabContent(sekolah, tema, pengguna, logs) {
    if (this.activeTab === "identitas") {
      return `
        <form onsubmit="window.pengaturanModule.simpanIdentitas(event)">
          <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin-bottom:16px;">
            <i class="bi bi-info-circle-fill" style="color:var(--primary);"></i> Identitas Lembaga & Pejabat
          </h4>

          <div class="form-grid">
            <div class="form-group">
              <label>Nama Resmi Sekolah *</label>
              <input type="text" name="nama" class="form-control" value="${sekolah.nama || ""}" required>
            </div>
            <div class="form-group">
              <label>NPSN *</label>
              <input type="text" name="npsn" class="form-control" value="${sekolah.npsn || ""}" required>
            </div>
            <div class="form-group">
              <label>NSS</label>
              <input type="text" name="nss" class="form-control" value="${sekolah.nss || ""}">
            </div>
            <div class="form-group">
              <label>Akreditasi Sekolah</label>
              <input type="text" name="akreditasi" class="form-control" value="${sekolah.akreditasi || "A"}">
            </div>
            <div class="form-group">
              <label>Nama Kepala Sekolah *</label>
              <input type="text" name="kepalaSekolah" class="form-control" value="${sekolah.kepalaSekolah || ""}" required>
            </div>
            <div class="form-group">
              <label>NIP Kepala Sekolah *</label>
              <input type="text" name="nipKepalaSekolah" class="form-control" value="${sekolah.nipKepalaSekolah || ""}" required>
            </div>
            <div class="form-group">
              <label>Nama Operator Sekolah</label>
              <input type="text" name="operator" class="form-control" value="${sekolah.operator || ""}">
            </div>
            <div class="form-group">
              <label>Tahun Pelajaran Aktif *</label>
              <input type="text" name="tahunPelajaran" class="form-control" value="${sekolah.tahunPelajaran || "2026/2027"}" required>
            </div>
            <div class="form-group">
              <label>Semester Aktif *</label>
              <select name="semester" class="form-control">
                <option value="Ganjil" ${sekolah.semester === "Ganjil" ? "selected" : ""}>Semester Ganjil</option>
                <option value="Genap" ${sekolah.semester === "Genap" ? "selected" : ""}>Semester Genap</option>
              </select>
            </div>
            <div class="form-group">
              <label>Jadwal Jam Masuk Sekolah</label>
              <input type="time" name="jamMasuk" class="form-control" value="${sekolah.jamMasuk || "07:00"}">
            </div>
            <div class="form-group">
              <label>Jadwal Jam Pulang Sekolah</label>
              <input type="time" name="jamPulang" class="form-control" value="${sekolah.jamPulang || "13:00"}">
            </div>
            <div class="form-group">
              <label>Toleransi Terlambat (Menit)</label>
              <input type="number" name="toleransiTerlambat" class="form-control" value="${sekolah.toleransiTerlambat || "15"}">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Alamat Lengkap Sekolah</label>
              <input type="text" name="alamat" class="form-control" value="${sekolah.alamat || ""}">
            </div>
            <div class="form-group">
              <label>Kecamatan</label>
              <input type="text" name="kecamatan" class="form-control" value="${sekolah.kecamatan || "Kecamatan Brebes"}">
            </div>
            <div class="form-group">
              <label>Kabupaten</label>
              <input type="text" name="kabupaten" class="form-control" value="${sekolah.kabupaten || "Kabupaten Brebes"}">
            </div>
            <div class="form-group">
              <label>Nomor Telepon Sekolah</label>
              <input type="text" name="telepon" class="form-control" value="${sekolah.telepon || ""}">
            </div>
            <div class="form-group">
              <label>Nomor WhatsApp Resmi</label>
              <input type="text" name="whatsapp" class="form-control" value="${sekolah.whatsapp || ""}">
            </div>
            <div class="form-group">
              <label>Email Resmi Sekolah</label>
              <input type="email" name="email" class="form-control" value="${sekolah.email || ""}">
            </div>
            <div class="form-group">
              <label>Website Resmi Sekolah</label>
              <input type="text" name="website" class="form-control" value="${sekolah.website || ""}">
            </div>
          </div>

          <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin:24px 0 16px 0; border-top:1px solid var(--gray-200); padding-top:20px;">
            <i class="bi bi-envelope-paper-fill" style="color:var(--secondary);"></i> Pengaturan Kop Surat Resmi Sekolah
          </h4>

          <div class="form-grid">
            <div class="form-group">
              <label>Kop Baris 1 (Instansi Tertinggi)</label>
              <input type="text" name="kopBaris1" class="form-control" value="${sekolah.kopBaris1 || ""}">
            </div>
            <div class="form-group">
              <label>Kop Baris 2 (Dinas Terkait)</label>
              <input type="text" name="kopBaris2" class="form-control" value="${sekolah.kopBaris2 || ""}">
            </div>
            <div class="form-group">
              <label>Kop Baris 3 (Nama Satuan Pendidikan)</label>
              <input type="text" name="kopBaris3" class="form-control" value="${sekolah.kopBaris3 || ""}">
            </div>
            <div class="form-group">
              <label>Kop Baris 4 (Kecamatan)</label>
              <input type="text" name="kopBaris4" class="form-control" value="${sekolah.kopBaris4 || ""}">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Alamat & Kontak di Kop Surat</label>
              <input type="text" name="kopAlamat" class="form-control" value="${sekolah.kopAlamat || ""}">
            </div>
          </div>

          <div style="margin-top:24px; display:flex; justify-content:flex-end;">
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="bi bi-save"></i> Simpan Seluruh Identitas Sekolah
            </button>
          </div>
        </form>
      `;
    } else if (this.activeTab === "tema") {
      return `
        <form onsubmit="window.pengaturanModule.simpanTema(event)">
          <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin-bottom:16px;">
            <i class="bi bi-palette-fill" style="color:var(--primary);"></i> Skema Warna Aplikasi & Tampilan
          </h4>
          <p style="font-size:12px; color:var(--gray-600); margin-bottom:16px;">
            Operator sekolah dapat mengatur warna dominan (Biru, Putih, Hijau) dan elemen visual antarmuka secara instan.
          </p>

          <div class="form-grid">
            <div class="form-group">
              <label>Warna Primer (Biru Utama)</label>
              <div style="display:flex; gap:10px; align-items:center;">
                <input type="color" name="primaryColor" class="form-control" style="width:50px; height:40px; padding:2px;" value="${tema.primaryColor || "#1e40af"}">
                <input type="text" class="form-control" value="${tema.primaryColor || "#1e40af"}" readonly>
              </div>
            </div>

            <div class="form-group">
              <label>Warna Sekunder (Hijau)</label>
              <div style="display:flex; gap:10px; align-items:center;">
                <input type="color" name="secondaryColor" class="form-control" style="width:50px; height:40px; padding:2px;" value="${tema.secondaryColor || "#15803d"}">
                <input type="text" class="form-control" value="${tema.secondaryColor || "#15803d"}" readonly>
              </div>
            </div>

            <div class="form-group">
              <label>Warna Aksen (Biru Langit)</label>
              <div style="display:flex; gap:10px; align-items:center;">
                <input type="color" name="accentColor" class="form-control" style="width:50px; height:40px; padding:2px;" value="${tema.accentColor || "#0284c7"}">
                <input type="text" class="form-control" value="${tema.accentColor || "#0284c7"}" readonly>
              </div>
            </div>

            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Judul Header Aplikasi</label>
              <input type="text" name="headerTitle" class="form-control" value="${tema.headerTitle || "SIA SEKOLAH – SDN KALIGANGSA WETAN 01"}">
            </div>
          </div>

          <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin:24px 0 16px 0; border-top:1px solid var(--gray-200); padding-top:20px;">
            <i class="bi bi-globe" style="color:var(--secondary);"></i> Konten Website Profil Publik & Sambutan
          </h4>

          <div class="form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Headline Banner Utama (Hero Section)</label>
              <input type="text" name="landingHeroHeadline" class="form-control" value="${tema.landingHeroHeadline || ""}">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Sub-Headline Banner</label>
              <input type="text" name="landingHeroSub" class="form-control" value="${tema.landingHeroSub || ""}">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Visi SDN Kaligangsa Wetan 01</label>
              <textarea name="visi" class="form-control">${tema.visi || ""}</textarea>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>Misi Sekolah (Satu per baris)</label>
              <textarea name="misi" class="form-control" style="height:120px;">${Array.isArray(tema.misi) ? tema.misi.join("\n") : (tema.misi || "")}</textarea>
            </div>
          </div>

          <div style="margin-top:24px; display:flex; justify-content:flex-end;">
            <button type="submit" class="btn btn-secondary btn-lg">
              <i class="bi bi-check-circle"></i> Terapkan Tema & Tampilan Baru
            </button>
          </div>
        </form>
      `;
    } else if (this.activeTab === "akun") {
      return `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin:0;">
              <i class="bi bi-people-fill" style="color:var(--primary);"></i> Daftar Akun Pengguna Sistem
            </h4>
            <button class="btn btn-primary btn-sm" onclick="window.pengaturanModule.bukaModalTambahAkun()">
              <i class="bi bi-person-plus"></i> Tambah Akun Baru
            </button>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Username</th>
                  <th>Nama Pengguna</th>
                  <th>Peran (Role)</th>
                  <th>Jabatan</th>
                  <th>Email</th>
                  <th style="text-align:center;">Status</th>
                  <th style="text-align:center; width:120px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${pengguna.map((u, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${u.username}</strong></td>
                    <td>${u.nama}</td>
                    <td><span class="badge ${u.role === 'operator' ? 'badge-success' : u.role === 'kepsek' ? 'badge-info' : 'badge-neutral'}">${u.role.toUpperCase()}</span></td>
                    <td>${u.jabatan || "-"}</td>
                    <td>${u.email || "-"}</td>
                    <td style="text-align:center;">
                      <span class="badge ${u.status === 'aktif' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
                    </td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        <button class="btn btn-outline-primary btn-sm" title="Edit Akun" onclick="window.pengaturanModule.bukaModalEditAkun(${u.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        ${u.username !== 'operator' ? `
                          <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.pengaturanModule.hapusAkun(${u.id})">
                            <i class="bi bi-trash"></i>
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.activeTab === "backup") {
      return `
        <div>
          <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin-bottom:12px;">
            <i class="bi bi-database-check" style="color:var(--primary);"></i> Cadangkan & Pulihkan Seluruh Database
          </h4>
          <p style="font-size:13px; color:var(--gray-600); margin-bottom:20px;">
            Pastikan data sekolah senantiasa aman. Anda dapat mengunduh salinan database lengkap dalam format JSON yang dapat dipulihkan kapan saja.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
            <!-- BACKUP CARD -->
            <div class="card" style="margin:0; border:1px solid var(--gray-200); padding:20px;">
              <div style="width:44px; height:44px; border-radius:10px; background:#dbeafe; color:#1d4ed8; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:12px;">
                <i class="bi bi-cloud-arrow-down-fill"></i>
              </div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Cadangkan Data Sekarang</h4>
              <p style="font-size:12px; color:var(--gray-600); margin-bottom:16px;">
                Mengunduh seluruh data siswa, mutasi, GTK, arsip surat, absensi, dan pengaturan ke file JSON terenkripsi di komputer Anda.
              </p>
              <button class="btn btn-primary" onclick="window.dataStore.exportDatabaseJSON()">
                <i class="bi bi-download"></i> Unduh File Cadangan (.json)
              </button>
            </div>

            <!-- RESTORE CARD -->
            <div class="card" style="margin:0; border:1px solid var(--gray-200); padding:20px;">
              <div style="width:44px; height:44px; border-radius:10px; background:#dcfce7; color:#15803d; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:12px;">
                <i class="bi bi-cloud-arrow-up-fill"></i>
              </div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Pulihkan Data (Restore)</h4>
              <p style="font-size:12px; color:var(--gray-600); margin-bottom:16px;">
                Unggah file cadangan JSON yang pernah diunduh untuk mengembalikan data ke kondisi sebelumnya.
              </p>
              <input type="file" id="input-restore-file" accept=".json" class="form-control" style="margin-bottom:12px;">
              <button class="btn btn-secondary" onclick="window.pengaturanModule.prosesRestore()">
                <i class="bi bi-upload"></i> Pulihkan Database
              </button>
            </div>
          </div>

          <div style="margin-top:30px; border-top:1px solid var(--gray-200); padding-top:20px;">
            <h5 style="color:var(--danger); font-size:14px; font-weight:700; margin-bottom:6px;">Zona Berbahaya: Reset Pabrik</h5>
            <p style="font-size:12px; color:var(--gray-600); margin-bottom:12px;">
              Mengembalikan seluruh data aplikasi ke kondisi bawaan standar SDN Kaligangsa Wetan 01.
            </p>
            <button class="btn btn-outline-secondary btn-sm" style="color:var(--danger); border-color:var(--danger);" onclick="window.pengaturanModule.resetPabrik()">
              <i class="bi bi-arrow-counterclockwise"></i> Reset ke Data Bawaan Pabrik
            </button>
          </div>
        </div>
      `;
    } else {
      // Log Aktivitas
      return `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h4 style="font-size:15px; font-weight:700; color:var(--dark); margin:0;">
              <i class="bi bi-shield-check" style="color:var(--primary);"></i> Log Aktivitas Sistem (Audit Trail)
            </h4>
            <span class="badge badge-info">Tercatat: ${logs.length} Perubahan</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>Waktu</th>
                  <th>Pengguna</th>
                  <th>Aksi</th>
                  <th>Modul</th>
                  <th>Rincian Aktivitas</th>
                </tr>
              </thead>
              <tbody>
                ${logs.length === 0 ? `
                  <tr><td colspan="6" style="text-align:center; padding:20px; color:var(--gray-400);">Belum ada log aktivitas tercatat.</td></tr>
                ` : logs.map((l, i) => `
                  <tr>
                    <td style="text-align:center;">${i + 1}</td>
                    <td><small style="font-family:monospace;">${l.waktu}</small></td>
                    <td><strong>${l.nama || l.pengguna}</strong></td>
                    <td><span class="badge badge-neutral">${l.aksi}</span></td>
                    <td><span class="badge badge-info">${l.modul}</span></td>
                    <td>${l.detail}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  simpanIdentitas(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    window.dataStore.saveSekolah(data);
    alert("Identitas dan kop surat sekolah berhasil diperbarui!");
    this.render();
  },

  simpanTema(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.misi && typeof data.misi === "string") {
      data.misi = data.misi.split("\n").filter(m => m.trim().length > 0);
    }
    window.dataStore.saveTema(data);
    alert("Kustomisasi tampilan dan website profil publik berhasil disimpan!");
    this.render();
  },

  bukaModalTambahAkun() {
    const html = `
      <div class="modal-backdrop show" id="modal-akun">
        <div class="modal-dialog">
          <div class="modal-header">
            <h4><i class="bi bi-person-plus-fill"></i> Tambah Akun Pengguna</h4>
            <button class="btn-close-modal" onclick="window.pengaturanModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.pengaturanModule.simpanAkun(event)">
            <div class="modal-body">
              <div class="form-group">
                <label>Nama Pengguna Lengkap *</label>
                <input type="text" name="nama" class="form-control" required placeholder="Contoh: Siti Fatimah, S.Pd.">
              </div>
              <div class="form-group">
                <label>Username Login *</label>
                <input type="text" name="username" class="form-control" required placeholder="Huruf kecil tanpa spasi">
              </div>
              <div class="form-group">
                <label>Kata Sandi *</label>
                <input type="password" name="passwordHash" class="form-control" required placeholder="Minimal 6 karakter">
              </div>
              <div class="form-group">
                <label>Hak Akses / Peran *</label>
                <select name="role" class="form-control" required>
                  <option value="guru">Guru (Absensi Mandiri & Riwayat)</option>
                  <option value="kepsek">Kepala Sekolah (Monitoring & Laporan)</option>
                  <option value="operator">Operator Sekolah (Akses Penuh)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Jabatan</label>
                <input type="text" name="jabatan" class="form-control" placeholder="Guru Kelas 4 / Bendahara">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" class="form-control" placeholder="user@gmail.com">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.pengaturanModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Simpan Akun</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  bukaModalEditAkun(id) {
    const u = window.dataStore.getPengguna().find(item => item.id === id);
    if (!u) return;

    const html = `
      <div class="modal-backdrop show" id="modal-akun">
        <div class="modal-dialog">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Akun: ${u.username}</h4>
            <button class="btn-close-modal" onclick="window.pengaturanModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.pengaturanModule.simpanAkun(event, ${u.id})">
            <div class="modal-body">
              <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="nama" class="form-control" value="${u.nama}" required>
              </div>
              <div class="form-group">
                <label>Ganti Kata Sandi (Kosongkan jika tidak diubah)</label>
                <input type="password" name="passwordHash" class="form-control" placeholder="Biarkan kosong jika tidak ganti" value="${u.passwordHash}">
              </div>
              <div class="form-group">
                <label>Hak Akses</label>
                <select name="role" class="form-control" ${u.username === 'operator' ? 'disabled' : ''}>
                  <option value="operator" ${u.role === 'operator' ? 'selected' : ''}>Operator Sekolah</option>
                  <option value="kepsek" ${u.role === 'kepsek' ? 'selected' : ''}>Kepala Sekolah</option>
                  <option value="guru" ${u.role === 'guru' ? 'selected' : ''}>Guru</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status Akun</label>
                <select name="status" class="form-control">
                  <option value="aktif" ${u.status === 'aktif' ? 'selected' : ''}>Aktif</option>
                  <option value="nonaktif" ${u.status === 'nonaktif' ? 'selected' : ''}>Nonaktif</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.pengaturanModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  simpanAkun(e, id = null) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (id) data.id = id;
    window.dataStore.savePengguna(data);
    this.tutupModal();
    this.render();
  },

  hapusAkun(id) {
    if (confirm("Hapus akun pengguna ini?")) {
      window.dataStore.deletePengguna(id);
      this.render();
    }
  },

  prosesRestore() {
    const fileInput = document.getElementById("input-restore-file");
    if (!fileInput || !fileInput.files[0]) {
      alert("Silakan pilih file cadangan .json terlebih dahulu.");
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = window.dataStore.importDatabaseJSON(e.target.result);
      if (res.success) {
        alert("Database berhasil dipulihkan! Aplikasi akan memuat ulang tampilan.");
        window.location.reload();
      } else {
        alert("Gagal memulihkan database: " + res.message);
      }
    };
    reader.readAsText(file);
  },

  resetPabrik() {
    if (confirm("PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke pengaturan awal SDN Kaligangsa Wetan 01?")) {
      window.dataStore.resetDefault();
      alert("Sistem telah dikembalikan ke data awal bawaan.");
      window.location.reload();
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
