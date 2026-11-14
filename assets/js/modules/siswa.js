/**
 * MODUL DATA SISWA - SDN KALIGANGSA WETAN 01
 * CRUD, Filter, Pencarian, Cetak Biodata, Impor & Ekspor Excel
 */

window.siswaModule = {
  currentFilter: { kelas: "all", jk: "all", status: "all", search: "" },

  init() {
    this.render();
    this.attachEvents();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const siswaList = window.dataStore.getSiswa(this.currentFilter);
    const sekolah = window.dataStore.getSekolah();

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-people-fill" style="color:var(--primary);"></i> Data Induk Peserta Didik</h3>
            <p>Kelola seluruh data siswa SDN Kaligangsa Wetan 01 secara terpusat</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" onclick="window.siswaModule.cetakDaftar()">
              <i class="bi bi-printer"></i> Cetak Daftar
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.siswaModule.eksporExcel()">
              <i class="bi bi-file-earmark-spreadsheet"></i> Ekspor Excel
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.siswaModule.bukaModalImpor()">
              <i class="bi bi-file-earmark-arrow-up"></i> Impor Excel
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.siswaModule.bukaModalTambah()">
              <i class="bi bi-person-plus-fill"></i> Tambah Siswa
            </button>
          </div>
        </div>

        <div class="card-body">
          <!-- TOOLBAR FILTER & CARI -->
          <div class="table-toolbar">
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <select class="filter-select" id="filter-kelas-siswa" onchange="window.siswaModule.onFilterChange()">
                <option value="all">Semua Kelas</option>
                <option value="1" ${this.currentFilter.kelas === "1" ? "selected" : ""}>Kelas 1</option>
                <option value="2" ${this.currentFilter.kelas === "2" ? "selected" : ""}>Kelas 2</option>
                <option value="3" ${this.currentFilter.kelas === "3" ? "selected" : ""}>Kelas 3</option>
                <option value="4" ${this.currentFilter.kelas === "4" ? "selected" : ""}>Kelas 4</option>
                <option value="5" ${this.currentFilter.kelas === "5" ? "selected" : ""}>Kelas 5</option>
                <option value="6" ${this.currentFilter.kelas === "6" ? "selected" : ""}>Kelas 6</option>
              </select>

              <select class="filter-select" id="filter-jk-siswa" onchange="window.siswaModule.onFilterChange()">
                <option value="all">Semua Jenis Kelamin</option>
                <option value="L" ${this.currentFilter.jk === "L" ? "selected" : ""}>Laki-laki (L)</option>
                <option value="P" ${this.currentFilter.jk === "P" ? "selected" : ""}>Perempuan (P)</option>
              </select>

              <select class="filter-select" id="filter-status-siswa" onchange="window.siswaModule.onFilterChange()">
                <option value="all">Semua Status</option>
                <option value="Aktif" ${this.currentFilter.status === "Aktif" ? "selected" : ""}>Aktif</option>
                <option value="Lulus" ${this.currentFilter.status === "Lulus" ? "selected" : ""}>Lulus</option>
                <option value="Pindah" ${this.currentFilter.status === "Pindah" ? "selected" : ""}>Pindah</option>
                <option value="Keluar" ${this.currentFilter.status === "Keluar" ? "selected" : ""}>Keluar</option>
              </select>
            </div>

            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" id="cari-siswa-input" placeholder="Cari nama, NIS, NISN..." value="${this.currentFilter.search || ""}" oninput="window.siswaModule.onSearch(this.value)">
            </div>
          </div>

          <!-- TABEL SISWA -->
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 40px; text-align:center;">No</th>
                  <th>NIS</th>
                  <th>NISN</th>
                  <th>Nama Lengkap</th>
                  <th style="text-align:center;">JK</th>
                  <th>Kelas</th>
                  <th>Tempat, Tanggal Lahir</th>
                  <th>Nama Orang Tua</th>
                  <th>No HP Ortu</th>
                  <th style="text-align:center;">Status</th>
                  <th style="text-align:center; width: 140px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${siswaList.length === 0 ? `
                  <tr>
                    <td colspan="11" style="text-align:center; padding: 30px; color: var(--gray-400);">
                      <i class="bi bi-inbox" style="font-size: 28px; display:block; margin-bottom: 6px;"></i>
                      Tidak ada data siswa yang cocok dengan filter.
                    </td>
                  </tr>
                ` : siswaList.map((s, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td><strong>${s.nis || "-"}</strong></td>
                    <td>${s.nisn || "-"}</td>
                    <td><strong>${s.nama}</strong></td>
                    <td style="text-align:center;"><span class="badge ${s.jk === 'L' ? 'badge-info' : 'badge-neutral'}">${s.jk}</span></td>
                    <td><span class="badge badge-success">Kelas ${s.kelas}</span></td>
                    <td>${s.tempatLahir || "-"}, ${s.tanggalLahir || "-"}</td>
                    <td>${s.namaAyah || s.namaIbu || "-"}</td>
                    <td>${s.noHpOrtu || "-"}</td>
                    <td style="text-align:center;">
                      <span class="badge ${
                        s.status === 'Aktif' ? 'badge-success' :
                        s.status === 'Lulus' ? 'badge-info' : 'badge-danger'
                      }">${s.status}</span>
                    </td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        <button class="btn btn-outline-secondary btn-sm" title="Cetak Biodata" onclick="window.siswaModule.cetakBiodata(${s.id})">
                          <i class="bi bi-printer"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit" onclick="window.siswaModule.bukaModalEdit(${s.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.siswaModule.hapusSiswa(${s.id})">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 14px; font-size: 12px; color: var(--gray-600); display:flex; justify-content:space-between; align-items:center;">
            <span>Menampilkan <strong>${siswaList.length}</strong> data siswa</span>
            <span>Tahun Pelajaran: <strong>${sekolah.tahunPelajaran} (${sekolah.semester})</strong></span>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {},

  onFilterChange() {
    this.currentFilter.kelas = document.getElementById("filter-kelas-siswa").value;
    this.currentFilter.jk = document.getElementById("filter-jk-siswa").value;
    this.currentFilter.status = document.getElementById("filter-status-siswa").value;
    this.render();
  },

  onSearch(val) {
    this.currentFilter.search = val;
    this.render();
  },

  bukaModalTambah() {
    const modalHtml = `
      <div class="modal-backdrop show" id="modal-siswa">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-person-plus-fill"></i> Tambah Data Siswa Baru</h4>
            <button class="btn-close-modal" onclick="window.siswaModule.tutupModal()">&times;</button>
          </div>
          <form id="form-siswa" onsubmit="window.siswaModule.simpanSiswa(event)">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nomor Induk Siswa (NIS) *</label>
                  <input type="text" name="nis" class="form-control" placeholder="Contoh: 2627001" required>
                </div>
                <div class="form-group">
                  <label>NISN *</label>
                  <input type="text" name="nisn" class="form-control" placeholder="10 Digit NISN" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Nama Lengkap Siswa *</label>
                  <input type="text" name="nama" class="form-control" placeholder="Nama lengkap sesuai akta lahir" required>
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin *</label>
                  <select name="jk" class="form-control" required>
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Agama *</label>
                  <select name="agama" class="form-control">
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" name="tempatLahir" class="form-control" placeholder="Contoh: Brebes" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" name="tanggalLahir" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>Kelas *</label>
                  <select name="kelas" class="form-control" required>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tahun Masuk</label>
                  <input type="text" name="tahunMasuk" class="form-control" value="${new Date().getFullYear()}">
                </div>
                <div class="form-group">
                  <label>Nama Ayah Kandung</label>
                  <input type="text" name="namaAyah" class="form-control" placeholder="Nama ayah">
                </div>
                <div class="form-group">
                  <label>Nama Ibu Kandung</label>
                  <input type="text" name="namaIbu" class="form-control" placeholder="Nama ibu">
                </div>
                <div class="form-group">
                  <label>Nomor HP / WhatsApp Orang Tua</label>
                  <input type="text" name="noHpOrtu" class="form-control" placeholder="08xxxxxxxxxx">
                </div>
                <div class="form-group">
                  <label>Status Siswa</label>
                  <select name="status" class="form-control">
                    <option value="Aktif" selected>Aktif</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Pindah">Pindah</option>
                    <option value="Keluar">Keluar</option>
                  </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Lengkap Siswa</label>
                  <textarea name="alamat" class="form-control" placeholder="RT/RW, Dusun, Desa Kaligangsa Wetan, Kec. Brebes"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.siswaModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Simpan Data Siswa</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(modalHtml);
  },

  bukaModalEdit(id) {
    const s = window.dataStore.getSiswa().find(item => item.id === id);
    if (!s) return;

    const modalHtml = `
      <div class="modal-backdrop show" id="modal-siswa">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Data Siswa: ${s.nama}</h4>
            <button class="btn-close-modal" onclick="window.siswaModule.tutupModal()">&times;</button>
          </div>
          <form id="form-siswa" onsubmit="window.siswaModule.simpanSiswa(event, ${s.id})">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nomor Induk Siswa (NIS) *</label>
                  <input type="text" name="nis" class="form-control" value="${s.nis || ""}" required>
                </div>
                <div class="form-group">
                  <label>NISN *</label>
                  <input type="text" name="nisn" class="form-control" value="${s.nisn || ""}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Nama Lengkap Siswa *</label>
                  <input type="text" name="nama" class="form-control" value="${s.nama || ""}" required>
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin *</label>
                  <select name="jk" class="form-control" required>
                    <option value="L" ${s.jk === "L" ? "selected" : ""}>Laki-laki (L)</option>
                    <option value="P" ${s.jk === "P" ? "selected" : ""}>Perempuan (P)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Agama *</label>
                  <select name="agama" class="form-control">
                    <option value="Islam" ${s.agama === "Islam" ? "selected" : ""}>Islam</option>
                    <option value="Kristen" ${s.agama === "Kristen" ? "selected" : ""}>Kristen</option>
                    <option value="Katolik" ${s.agama === "Katolik" ? "selected" : ""}>Katolik</option>
                    <option value="Hindu" ${s.agama === "Hindu" ? "selected" : ""}>Hindu</option>
                    <option value="Buddha" ${s.agama === "Buddha" ? "selected" : ""}>Buddha</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" name="tempatLahir" class="form-control" value="${s.tempatLahir || ""}" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" name="tanggalLahir" class="form-control" value="${s.tanggalLahir || ""}" required>
                </div>
                <div class="form-group">
                  <label>Kelas *</label>
                  <select name="kelas" class="form-control" required>
                    <option value="1" ${s.kelas === "1" ? "selected" : ""}>Kelas 1</option>
                    <option value="2" ${s.kelas === "2" ? "selected" : ""}>Kelas 2</option>
                    <option value="3" ${s.kelas === "3" ? "selected" : ""}>Kelas 3</option>
                    <option value="4" ${s.kelas === "4" ? "selected" : ""}>Kelas 4</option>
                    <option value="5" ${s.kelas === "5" ? "selected" : ""}>Kelas 5</option>
                    <option value="6" ${s.kelas === "6" ? "selected" : ""}>Kelas 6</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tahun Masuk</label>
                  <input type="text" name="tahunMasuk" class="form-control" value="${s.tahunMasuk || ""}">
                </div>
                <div class="form-group">
                  <label>Nama Ayah Kandung</label>
                  <input type="text" name="namaAyah" class="form-control" value="${s.namaAyah || ""}">
                </div>
                <div class="form-group">
                  <label>Nama Ibu Kandung</label>
                  <input type="text" name="namaIbu" class="form-control" value="${s.namaIbu || ""}">
                </div>
                <div class="form-group">
                  <label>Nomor HP Ortu</label>
                  <input type="text" name="noHpOrtu" class="form-control" value="${s.noHpOrtu || ""}">
                </div>
                <div class="form-group">
                  <label>Status Siswa</label>
                  <select name="status" class="form-control">
                    <option value="Aktif" ${s.status === "Aktif" ? "selected" : ""}>Aktif</option>
                    <option value="Lulus" ${s.status === "Lulus" ? "selected" : ""}>Lulus</option>
                    <option value="Pindah" ${s.status === "Pindah" ? "selected" : ""}>Pindah</option>
                    <option value="Keluar" ${s.status === "Keluar" ? "selected" : ""}>Keluar</option>
                  </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Lengkap Siswa</label>
                  <textarea name="alamat" class="form-control">${s.alamat || ""}</textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.siswaModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Perbarui Data Siswa</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(modalHtml);
  },

  simpanSiswa(e, id = null) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (id) data.id = id;

    window.dataStore.saveSiswa(data);
    this.tutupModal();
    this.render();
  },

  hapusSiswa(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini akan dicatat dalam log aktivitas.")) {
      window.dataStore.deleteSiswa(id);
      this.render();
    }
  },

  cetakBiodata(id) {
    const s = window.dataStore.getSiswa().find(item => item.id === id);
    if (!s) return;
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Biodata Siswa - ${s.nama}</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          body { background: #fff; padding: 20px; font-family: 'Times New Roman', serif; }
          .bio-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12pt; }
          .bio-table td { padding: 6px 4px; vertical-align: top; }
          .photo-box { width: 3cm; height: 4cm; border: 1px solid #000; display:flex; align-items:center; justify-content:center; font-size: 10pt; color: #666; margin-top: 20px; }
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
          <h3 style="text-decoration: underline; text-transform: uppercase;">LEMBAR BUKU INDUK SISWA</h3>
          <p>Nomor Induk Siswa: ${s.nis || "-"} / NISN: ${s.nisn || "-"}</p>
        </div>

        <table class="bio-table">
          <tr><td style="width: 220px;">1. Nama Lengkap</td><td style="width: 15px;">:</td><td><strong>${s.nama}</strong></td></tr>
          <tr><td>2. Jenis Kelamin</td><td>:</td><td>${s.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
          <tr><td>3. Tempat, Tanggal Lahir</td><td>:</td><td>${s.tempatLahir}, ${s.tanggalLahir}</td></tr>
          <tr><td>4. Agama</td><td>:</td><td>${s.agama || 'Islam'}</td></tr>
          <tr><td>5. Alamat Lengkap</td><td>:</td><td>${s.alamat || '-'}</td></tr>
          <tr><td>6. Kelas Sekarang</td><td>:</td><td>Kelas ${s.kelas}</td></tr>
          <tr><td>7. Tahun Masuk Sekolah</td><td>:</td><td>${s.tahunMasuk || '-'}</td></tr>
          <tr><td>8. Nama Ayah Kandung</td><td>:</td><td>${s.namaAyah || '-'}</td></tr>
          <tr><td>9. Nama Ibu Kandung</td><td>:</td><td>${s.namaIbu || '-'}</td></tr>
          <tr><td>10. Nomor Kontak / HP Ortu</td><td>:</td><td>${s.noHpOrtu || '-'}</td></tr>
          <tr><td>11. Status Keaktifan</td><td>:</td><td>${s.status}</td></tr>
        </table>

        <div style="display:flex; justify-content:space-between; margin-top: 40px;">
          <div class="photo-box">Pas Foto<br>3 x 4 cm</div>
          <div style="text-align:center; width: 250px;">
            <p>Brebes, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>Kepala Sekolah,</p>
            <div style="height: 60px;"></div>
            <p style="font-weight:bold; text-decoration: underline;">${sekolah.kepalaSekolah}</p>
            <p>NIP. ${sekolah.nipKepalaSekolah}</p>
          </div>
        </div>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  cetakDaftar() {
    const list = window.dataStore.getSiswa(this.currentFilter);
    const sekolah = window.dataStore.getSekolah();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Daftar Siswa SDN Kaligangsa Wetan 01</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 11pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
          th { background: #f0f0f0; }
          .header-box { text-align:center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h3 style="margin:0;">PEMERINTAH KABUPATEN BREBES</h3>
          <h2 style="margin:2px 0;">SD NEGERI KALIGANGSA WETAN 01</h2>
          <p style="margin:0; font-size: 10pt;">${sekolah.alamat} - Kec. Brebes, Kab. Brebes</p>
        </div>
        <h4 style="text-align:center; margin-bottom: 10px;">DAFTAR PESERTA DIDIK (FILTER: KELAS ${this.currentFilter.kelas.toUpperCase()})</h4>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>NIS</th>
              <th>NISN</th>
              <th>Nama Siswa</th>
              <th style="text-align:center;">JK</th>
              <th>Kelas</th>
              <th>Tempat, Tgl Lahir</th>
              <th>Nama Orang Tua</th>
              <th>Alamat</th>
              <th style="text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((s, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${s.nis}</td>
                <td>${s.nisn}</td>
                <td><strong>${s.nama}</strong></td>
                <td style="text-align:center;">${s.jk}</td>
                <td>Kelas ${s.kelas}</td>
                <td>${s.tempatLahir}, ${s.tanggalLahir}</td>
                <td>${s.namaAyah || s.namaIbu || "-"}</td>
                <td>${s.alamat}</td>
                <td style="text-align:center;">${s.status}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div style="margin-top: 30px; float: right; text-align:center; width: 220px;">
          <p>Brebes, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Kepala Sekolah,</p>
          <div style="height: 50px;"></div>
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

  eksporExcel() {
    const list = window.dataStore.getSiswa(this.currentFilter);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,NIS,NISN,Nama Siswa,Jenis Kelamin,Kelas,Tempat Lahir,Tanggal Lahir,Agama,Nama Ayah,Nama Ibu,No HP Ortu,Alamat,Tahun Masuk,Status\n";

    list.forEach((s, idx) => {
      const row = [
        idx + 1,
        `"${s.nis || ""}"`,
        `"${s.nisn || ""}"`,
        `"${s.nama.replace(/"/g, '""')}"`,
        `"${s.jk}"`,
        `"${s.kelas}"`,
        `"${s.tempatLahir || ""}"`,
        `"${s.tanggalLahir || ""}"`,
        `"${s.agama || ""}"`,
        `"${(s.namaAyah || "").replace(/"/g, '""')}"`,
        `"${(s.namaIbu || "").replace(/"/g, '""')}"`,
        `"${s.noHpOrtu || ""}"`,
        `"${(s.alamat || "").replace(/"/g, '""')}"`,
        `"${s.tahunMasuk || ""}"`,
        `"${s.status}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DATA_SISWA_SDN_KALIGANGSA_WETAN_01_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  bukaModalImpor() {
    const modalHtml = `
      <div class="modal-backdrop show" id="modal-impor-siswa">
        <div class="modal-dialog">
          <div class="modal-header">
            <h4><i class="bi bi-file-earmark-arrow-up"></i> Impor Data Siswa dari File Excel / CSV</h4>
            <button class="btn-close-modal" onclick="window.siswaModule.tutupModal()">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size:13px; color:var(--gray-600); margin-bottom:12px;">
              Pilih file CSV atau Excel (.csv format) dengan susunan kolom: 
              <br><code>NIS, NISN, Nama Lengkap, JK (L/P), Kelas (1-6), Tempat Lahir, Tgl Lahir (YYYY-MM-DD), Alamat</code>
            </p>
            <div class="form-group">
              <label>Pilih File CSV Siswa</label>
              <input type="file" id="file-impor-siswa" accept=".csv, text/csv" class="form-control">
            </div>
            <div id="preview-impor" style="margin-top:10px; max-height:180px; overflow-y:auto; font-size:12px; background:var(--gray-50); padding:10px; border-radius:6px; display:none;"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" onclick="window.siswaModule.tutupModal()">Batal</button>
            <button class="btn btn-primary" onclick="window.siswaModule.prosesImpor()"><i class="bi bi-upload"></i> Proses & Masukkan ke Database</button>
          </div>
        </div>
      </div>
    `;
    this.injectModal(modalHtml);
  },

  prosesImpor() {
    const fileInput = document.getElementById("file-impor-siswa");
    if (!fileInput || !fileInput.files[0]) {
      alert("Silakan pilih file CSV terlebih dahulu.");
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) {
        alert("File CSV kosong atau tidak memiliki baris data.");
        return;
      }

      let count = 0;
      // Skip header if first line contains 'NIS' or 'nama'
      const startIdx = lines[0].toLowerCase().includes("nama") ? 1 : 0;
      for (let i = startIdx; i < lines.length; i++) {
        const parts = lines[i].split(",").map(p => p.trim().replace(/^"|"$/g, ""));
        if (parts.length >= 3 && parts[2]) {
          const newSiswa = {
            id: Date.now() + i,
            nis: parts[0] || `2627${String(i).padStart(3, "0")}`,
            nisn: parts[1] || "",
            nama: parts[2] || "Siswa Baru",
            jk: (parts[3] && parts[3].toUpperCase().startsWith("P")) ? "P" : "L",
            kelas: parts[4] || "1",
            tempatLahir: parts[5] || "Brebes",
            tanggalLahir: parts[6] || "2017-01-01",
            agama: "Islam",
            alamat: parts[7] || "Kaligangsa Wetan, Brebes",
            namaAyah: parts[8] || "",
            namaIbu: parts[9] || "",
            noHpOrtu: parts[10] || "",
            tahunMasuk: new Date().getFullYear().toString(),
            status: "Aktif"
          };
          window.dataStore.saveSiswa(newSiswa);
          count++;
        }
      }
      alert(`Berhasil mengimpor ${count} data siswa baru ke database!`);
      this.tutupModal();
      this.render();
    };
    reader.readAsText(file);
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
