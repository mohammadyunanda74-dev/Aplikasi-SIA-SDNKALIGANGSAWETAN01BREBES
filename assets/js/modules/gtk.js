/**
 * MODUL GURU DAN TENAGA KEPENDIDIKAN (GTK)
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 */

window.gtkModule = {
  currentFilter: { status: "all", jabatan: "all", search: "" },

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const list = window.dataStore.getGtk(this.currentFilter);
    const allGtk = window.dataStore.getGtk();
    const countAktif = allGtk.filter(g => g.status === "Aktif").length;
    const countNonaktif = allGtk.filter(g => g.status === "Nonaktif").length;
    const countPNS = allGtk.filter(g => g.statusKepegawaian === "PNS").length;
    const countPPPK = allGtk.filter(g => g.statusKepegawaian === "PPPK").length;
    const countHonorer = allGtk.filter(g => g.statusKepegawaian === "Honorer").length;

    container.innerHTML = `
      <!-- KARTU STATISTIK GTK -->
      <div class="stats-grid" style="margin-bottom: 20px;">
        <div class="stat-card">
          <div class="stat-info">
            <p>Total Pendidik & Tendik</p>
            <h3>${allGtk.length}</h3>
            <span class="stat-sub">${countAktif} Aktif | ${countNonaktif} Nonaktif</span>
          </div>
          <div class="stat-icon icon-blue"><i class="bi bi-person-badge"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Guru Pegawai Negeri (PNS)</p>
            <h3>${countPNS}</h3>
            <span class="stat-sub">Aparatur Sipil Negara</span>
          </div>
          <div class="stat-icon icon-green"><i class="bi bi-award"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Guru PPPK</p>
            <h3>${countPPPK}</h3>
            <span class="stat-sub">Perjanjian Kerja</span>
          </div>
          <div class="stat-icon icon-purple"><i class="bi bi-briefcase"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Guru & Tenaga Honorer</p>
            <h3>${countHonorer}</h3>
            <span class="stat-sub">GTT / PTT Sekolah</span>
          </div>
          <div class="stat-icon icon-orange"><i class="bi bi-people"></i></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-person-vcard-fill" style="color:var(--primary);"></i> Data Guru dan Tenaga Kependidikan</h3>
            <p>Pengelolaan profil pendidik, riwayat kepegawaian, jabatan, dan tugas tambahan</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" onclick="window.gtkModule.cetakDaftar()">
              <i class="bi bi-printer"></i> Cetak Daftar GTK
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.gtkModule.eksporExcel()">
              <i class="bi bi-file-earmark-spreadsheet"></i> Ekspor Excel
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.gtkModule.bukaModalImpor()">
              <i class="bi bi-file-earmark-arrow-up"></i> Impor Excel
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.gtkModule.bukaModalTambah()">
              <i class="bi bi-person-plus-fill"></i> Tambah GTK
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-toolbar">
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <select class="filter-select" id="filter-status-gtk" onchange="window.gtkModule.onFilterChange()">
                <option value="all">Semua Status Keaktifan</option>
                <option value="Aktif" ${this.currentFilter.status === "Aktif" ? "selected" : ""}>Aktif</option>
                <option value="Nonaktif" ${this.currentFilter.status === "Nonaktif" ? "selected" : ""}>Nonaktif</option>
              </select>

              <select class="filter-select" id="filter-jabatan-gtk" onchange="window.gtkModule.onFilterChange()">
                <option value="all">Semua Jabatan</option>
                <option value="Kepala Sekolah" ${this.currentFilter.jabatan === "Kepala Sekolah" ? "selected" : ""}>Kepala Sekolah</option>
                <option value="Guru Kelas" ${this.currentFilter.jabatan === "Guru Kelas" ? "selected" : ""}>Guru Kelas</option>
                <option value="Guru Mata Pelajaran" ${this.currentFilter.jabatan === "Guru Mata Pelajaran" ? "selected" : ""}>Guru Mata Pelajaran</option>
                <option value="Tenaga Kependidikan" ${this.currentFilter.jabatan === "Tenaga Kependidikan" ? "selected" : ""}>Tenaga Kependidikan</option>
              </select>
            </div>

            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" placeholder="Cari nama, NIP, NUPTK..." value="${this.currentFilter.search || ""}" oninput="window.gtkModule.onSearch(this.value)">
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>NIP / NUPTK</th>
                  <th>Nama Lengkap</th>
                  <th style="text-align:center;">JK</th>
                  <th>Pendidikan</th>
                  <th>Jabatan & Mapel</th>
                  <th>Kepegawaian</th>
                  <th>Pangkat / Gol.</th>
                  <th>Tugas Tambahan</th>
                  <th>No HP</th>
                  <th style="text-align:center;">Status</th>
                  <th style="text-align:center; width:140px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="12" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Tidak ada data guru/tendik yang sesuai.
                    </td>
                  </tr>
                ` : list.map((g, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>
                      <div><strong>${g.nip || "-"}</strong></div>
                      <small style="color:var(--gray-600);">${g.nuptk ? `NUPTK: ${g.nuptk}` : ''}</small>
                    </td>
                    <td><strong>${g.nama}</strong></td>
                    <td style="text-align:center;">${g.jk}</td>
                    <td>${g.pendidikanTerakhir || "-"}</td>
                    <td>
                      <div><strong>${g.jabatan}</strong></div>
                      <small style="color:var(--gray-600);">${g.mataPelajaran || ""}</small>
                    </td>
                    <td>
                      <span class="badge ${
                        g.statusKepegawaian === 'PNS' ? 'badge-success' :
                        g.statusKepegawaian === 'PPPK' ? 'badge-info' : 'badge-neutral'
                      }">${g.statusKepegawaian}</span>
                    </td>
                    <td>${g.pangkatGolongan || "-"}</td>
                    <td><small>${g.tugasTambahan || "-"}</small></td>
                    <td>${g.noHp || "-"}</td>
                    <td style="text-align:center;">
                      <span class="badge ${g.status === 'Aktif' ? 'badge-success' : 'badge-danger'}">${g.status}</span>
                    </td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        <button class="btn btn-outline-secondary btn-sm" title="Cetak Biodata GTK" onclick="window.gtkModule.cetakBiodata(${g.id})">
                          <i class="bi bi-printer"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit Data" onclick="window.gtkModule.bukaModalEdit(${g.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.gtkModule.hapusGtk(${g.id})">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onFilterChange() {
    this.currentFilter.status = document.getElementById("filter-status-gtk").value;
    this.currentFilter.jabatan = document.getElementById("filter-jabatan-gtk").value;
    this.render();
  },

  onSearch(val) {
    this.currentFilter.search = val;
    this.render();
  },

  bukaModalTambah() {
    const html = `
      <div class="modal-backdrop show" id="modal-gtk">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-person-plus-fill"></i> Tambah Data GTK Baru</h4>
            <button class="btn-close-modal" onclick="window.gtkModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.gtkModule.simpanGtk(event)">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Nama Lengkap & Gelar *</label>
                  <input type="text" name="nama" class="form-control" placeholder="Contoh: SITI NURHALIZA, S.Pd." required>
                </div>
                <div class="form-group">
                  <label>NIP (Isi '-' jika belum ada)</label>
                  <input type="text" name="nip" class="form-control" placeholder="19xxxxxxxxxx">
                </div>
                <div class="form-group">
                  <label>NUPTK (Isi '-' jika belum ada)</label>
                  <input type="text" name="nuptk" class="form-control" placeholder="16 Digit NUPTK">
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin *</label>
                  <select name="jk" class="form-control" required>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Pendidikan Terakhir *</label>
                  <input type="text" name="pendidikanTerakhir" class="form-control" placeholder="Contoh: S1 PGSD" required>
                </div>
                <div class="form-group">
                  <label>Jabatan *</label>
                  <select name="jabatan" class="form-control" required>
                    <option value="Guru Kelas">Guru Kelas</option>
                    <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                    <option value="Tenaga Kependidikan">Tenaga Kependidikan (Operator/Admin)</option>
                    <option value="Penjaga Sekolah">Penjaga Sekolah</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Status Kepegawaian *</label>
                  <select name="statusKepegawaian" class="form-control" required>
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="PPPK">PPPK</option>
                    <option value="Honorer">Honorer Sekolah (GTT/PTT)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Pangkat / Golongan</label>
                  <input type="text" name="pangkatGolongan" class="form-control" placeholder="Contoh: Pembina (IV/a) atau Ahli Pertama (IX)">
                </div>
                <div class="form-group">
                  <label>Mata Pelajaran / Tugas Mengajar</label>
                  <input type="text" name="mataPelajaran" class="form-control" placeholder="Contoh: Guru Kelas 1 atau PAI">
                </div>
                <div class="form-group">
                  <label>Tugas Tambahan</label>
                  <input type="text" name="tugasTambahan" class="form-control" placeholder="Wali Kelas, Bendahara BOS, Pembina Pramuka">
                </div>
                <div class="form-group">
                  <label>Nomor HP / WhatsApp</label>
                  <input type="text" name="noHp" class="form-control" placeholder="08xxxxxxxxxx">
                </div>
                <div class="form-group">
                  <label>Status Keaktifan</label>
                  <select name="status" class="form-control">
                    <option value="Aktif" selected>Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Tinggal</label>
                  <textarea name="alamat" class="form-control" placeholder="Alamat lengkap"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.gtkModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Simpan Data GTK</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  bukaModalEdit(id) {
    const g = window.dataStore.getGtk().find(item => item.id === id);
    if (!g) return;

    const html = `
      <div class="modal-backdrop show" id="modal-gtk">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Data GTK: ${g.nama}</h4>
            <button class="btn-close-modal" onclick="window.gtkModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.gtkModule.simpanGtk(event, ${g.id})">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Nama Lengkap & Gelar *</label>
                  <input type="text" name="nama" class="form-control" value="${g.nama || ""}" required>
                </div>
                <div class="form-group">
                  <label>NIP</label>
                  <input type="text" name="nip" class="form-control" value="${g.nip || ""}">
                </div>
                <div class="form-group">
                  <label>NUPTK</label>
                  <input type="text" name="nuptk" class="form-control" value="${g.nuptk || ""}">
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin</label>
                  <select name="jk" class="form-control">
                    <option value="L" ${g.jk === "L" ? "selected" : ""}>Laki-laki</option>
                    <option value="P" ${g.jk === "P" ? "selected" : ""}>Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Pendidikan Terakhir</label>
                  <input type="text" name="pendidikanTerakhir" class="form-control" value="${g.pendidikanTerakhir || ""}">
                </div>
                <div class="form-group">
                  <label>Jabatan</label>
                  <input type="text" name="jabatan" class="form-control" value="${g.jabatan || ""}">
                </div>
                <div class="form-group">
                  <label>Status Kepegawaian</label>
                  <select name="statusKepegawaian" class="form-control">
                    <option value="PNS" ${g.statusKepegawaian === "PNS" ? "selected" : ""}>PNS</option>
                    <option value="PPPK" ${g.statusKepegawaian === "PPPK" ? "selected" : ""}>PPPK</option>
                    <option value="Honorer" ${g.statusKepegawaian === "Honorer" ? "selected" : ""}>Honorer</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Pangkat / Golongan</label>
                  <input type="text" name="pangkatGolongan" class="form-control" value="${g.pangkatGolongan || ""}">
                </div>
                <div class="form-group">
                  <label>Mata Pelajaran</label>
                  <input type="text" name="mataPelajaran" class="form-control" value="${g.mataPelajaran || ""}">
                </div>
                <div class="form-group">
                  <label>Tugas Tambahan</label>
                  <input type="text" name="tugasTambahan" class="form-control" value="${g.tugasTambahan || ""}">
                </div>
                <div class="form-group">
                  <label>Nomor HP</label>
                  <input type="text" name="noHp" class="form-control" value="${g.noHp || ""}">
                </div>
                <div class="form-group">
                  <label>Status Keaktifan</label>
                  <select name="status" class="form-control">
                    <option value="Aktif" ${g.status === "Aktif" ? "selected" : ""}>Aktif</option>
                    <option value="Nonaktif" ${g.status === "Nonaktif" ? "selected" : ""}>Nonaktif</option>
                  </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Tinggal</label>
                  <textarea name="alamat" class="form-control">${g.alamat || ""}</textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.gtkModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary">Perbarui Data GTK</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  simpanGtk(e, id = null) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (id) data.id = id;
    window.dataStore.saveGtk(data);
    this.tutupModal();
    this.render();
  },

  hapusGtk(id) {
    if (confirm("Hapus data GTK ini? Tindakan ini akan dicatat dalam audit log.")) {
      window.dataStore.deleteGtk(id);
      this.render();
    }
  },

  cetakBiodata(id) {
    const g = window.dataStore.getGtk().find(item => item.id === id);
    if (!g) return;
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Biodata GTK - ${g.nama}</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          body { font-family: 'Times New Roman', serif; padding: 25px 35px; font-size: 12pt; line-height: 1.4; }
          .bio-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .bio-table td { padding: 6px 4px; vertical-align: top; }
        </style>
      </head>
      <body>
        <div class="kop-surat">
          <img src="${sekolah.logoKabupaten}" class="kop-logo-kiri">
          <div class="kop-teks">
            <h4>${sekolah.kopBaris1}</h4>
            <h3>${sekolah.kopBaris2}</h3>
            <h2>${sekolah.kopBaris3}</h2>
            <p>${sekolah.kopAlamat}</p>
          </div>
          <img src="${sekolah.logoSekolah}" class="kop-logo-kanan">
        </div>

        <div style="text-align:center; margin: 20px 0;">
          <h3 style="text-decoration: underline; text-transform: uppercase;">BIODATA PEGAWAI / PENDIDIK</h3>
          <p>NIP: ${g.nip || "-"} / NUPTK: ${g.nuptk || "-"}</p>
        </div>

        <table class="bio-table">
          <tr><td style="width: 220px;">1. Nama Lengkap & Gelar</td><td style="width: 15px;">:</td><td><strong>${g.nama}</strong></td></tr>
          <tr><td>2. NIP / NUPTK</td><td>:</td><td>${g.nip} / ${g.nuptk}</td></tr>
          <tr><td>3. Jenis Kelamin</td><td>:</td><td>${g.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
          <tr><td>4. Tempat, Tanggal Lahir</td><td>:</td><td>${g.tempatLahir || "Brebes"}, ${g.tanggalLahir || "-"}</td></tr>
          <tr><td>5. Pendidikan Terakhir</td><td>:</td><td>${g.pendidikanTerakhir}</td></tr>
          <tr><td>6. Jabatan Pokok</td><td>:</td><td><strong>${g.jabatan}</strong></td></tr>
          <tr><td>7. Status Kepegawaian</td><td>:</td><td>${g.statusKepegawaian}</td></tr>
          <tr><td>8. Pangkat / Golongan</td><td>:</td><td>${g.pangkatGolongan || "-"}</td></tr>
          <tr><td>9. Mata Pelajaran Diajar</td><td>:</td><td>${g.mataPelajaran || "-"}</td></tr>
          <tr><td>10. Tugas Tambahan</td><td>:</td><td>${g.tugasTambahan || "-"}</td></tr>
          <tr><td>11. Nomor Kontak / WhatsApp</td><td>:</td><td>${g.noHp || "-"}</td></tr>
          <tr><td>12. Alamat Lengkap</td><td>:</td><td>${g.alamat || "-"}</td></tr>
          <tr><td>13. Status Keaktifan</td><td>:</td><td><strong>${g.status}</strong></td></tr>
        </table>

        <div style="margin-top: 40px; float: right; text-align:center; width: 250px;">
          <p>Brebes, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Kepala Sekolah,</p>
          <div style="height: 60px;"></div>
          <p><strong>${sekolah.kepalaSekolah}</strong></p>
          <p>NIP. ${sekolah.nipKepalaSekolah}</p>
        </div>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  cetakDaftar() {
    const list = window.dataStore.getGtk(this.currentFilter);
    const sekolah = window.dataStore.getSekolah();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Daftar GTK SDN Kaligangsa Wetan 01</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
          th { background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin-bottom: 2px;">DAFTAR GURU DAN TENAGA KEPENDIDIKAN (GTK)</h3>
        <h4 style="text-align:center; margin-top: 0;">SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES</h4>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>Nama Lengkap</th>
              <th>NIP / NUPTK</th>
              <th>JK</th>
              <th>Pendidikan</th>
              <th>Jabatan</th>
              <th>Status Pegawai</th>
              <th>Pangkat/Gol</th>
              <th>Tugas Tambahan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((g, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td><strong>${g.nama}</strong></td>
                <td>${g.nip}</td>
                <td>${g.jk}</td>
                <td>${g.pendidikanTerakhir}</td>
                <td>${g.jabatan}</td>
                <td>${g.statusKepegawaian}</td>
                <td>${g.pangkatGolongan || "-"}</td>
                <td>${g.tugasTambahan || "-"}</td>
                <td>${g.status}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  eksporExcel() {
    const list = window.dataStore.getGtk(this.currentFilter);
    let csv = "data:text/csv;charset=utf-8,";
    csv += "No,NIP,NUPTK,Nama Lengkap,JK,Pendidikan,Jabatan,Kepegawaian,Pangkat Golongan,Mata Pelajaran,Tugas Tambahan,No HP,Alamat,Status\n";
    list.forEach((g, idx) => {
      csv += [
        idx + 1,
        `"${g.nip || ""}"`,
        `"${g.nuptk || ""}"`,
        `"${(g.nama || "").replace(/"/g, '""')}"`,
        `"${g.jk || ""}"`,
        `"${g.pendidikanTerakhir || ""}"`,
        `"${g.jabatan || ""}"`,
        `"${g.statusKepegawaian || ""}"`,
        `"${g.pangkatGolongan || ""}"`,
        `"${g.mataPelajaran || ""}"`,
        `"${g.tugasTambahan || ""}"`,
        `"${g.noHp || ""}"`,
        `"${(g.alamat || "").replace(/"/g, '""')}"`,
        `"${g.status || ""}"`
      ].join(",") + "\n";
    });
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `DATA_GTK_SDN_KALIGANGSA_WETAN_01_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  },

  bukaModalImpor() {
    alert("Silakan gunakan file CSV GTK dengan susunan kolom: Nama, NIP, NUPTK, JK, Pendidikan, Jabatan, Status Kepegawaian.");
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
