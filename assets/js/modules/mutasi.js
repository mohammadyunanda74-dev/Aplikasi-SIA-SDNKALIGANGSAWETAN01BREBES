/**
 * MODUL MUTASI SISWA (MASUK & KELUAR)
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 */

window.mutasiModule = {
  activeTab: "masuk", // "masuk" | "keluar"

  init(tab = "masuk") {
    this.activeTab = tab;
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    if (this.activeTab === "masuk") {
      this.renderSiswaMasuk(container);
    } else {
      this.renderSiswaKeluar(container);
    }
  },

  // ===================== SISWA MASUK =====================
  renderSiswaMasuk(container) {
    const list = window.dataStore.getSiswaMasuk();
    const sekolah = window.dataStore.getSekolah();

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-box-arrow-in-right" style="color:var(--secondary);"></i> Data Siswa Masuk (Mutasi Masuk & Pindahan)</h3>
            <p>Pencatatan dan verifikasi data peserta didik baru atau mutasi masuk ke SDN Kaligangsa Wetan 01</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.mutasiModule.cetakRekapMasuk()">
              <i class="bi bi-printer"></i> Rekap Tahunan
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.mutasiModule.bukaModalTambahMasuk()">
              <i class="bi bi-plus-circle"></i> Tambah Siswa Masuk
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>No Registrasi</th>
                  <th>Nama Siswa</th>
                  <th>NISN</th>
                  <th style="text-align:center;">JK</th>
                  <th>Asal Sekolah</th>
                  <th>Tgl Masuk</th>
                  <th>Kelas Tujuan</th>
                  <th>Nama Orang Tua</th>
                  <th style="text-align:center;">Status</th>
                  <th style="text-align:center; width:170px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="11" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Belum ada data siswa mutasi masuk.
                    </td>
                  </tr>
                ` : list.map((m, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td><code>${m.noRegistrasi}</code></td>
                    <td><strong>${m.nama}</strong></td>
                    <td>${m.nisn || "-"}</td>
                    <td style="text-align:center;">${m.jk}</td>
                    <td>${m.asalSekolah || "-"}</td>
                    <td>${m.tanggalMasuk || "-"}</td>
                    <td><span class="badge badge-info">Kelas ${m.kelasTujuan}</span></td>
                    <td>${m.namaOrtu || "-"}</td>
                    <td style="text-align:center;">
                      <span class="badge ${m.statusKonfirmasi === 'Dikonfirmasi' ? 'badge-success' : 'badge-warning'}">
                        ${m.statusKonfirmasi}
                      </span>
                    </td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        ${m.statusKonfirmasi === 'Menunggu' ? `
                          <button class="btn btn-success btn-sm" title="Konfirmasi & Masukkan ke Siswa Aktif" onclick="window.mutasiModule.konfirmasiMasuk(${m.id})">
                            <i class="bi bi-check-circle"></i>
                          </button>
                        ` : ''}
                        <button class="btn btn-outline-secondary btn-sm" title="Cetak Surat Penerimaan" onclick="window.mutasiModule.cetakSuratMasuk(${m.id})">
                          <i class="bi bi-file-earmark-text"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit" onclick="window.mutasiModule.bukaModalEditMasuk(${m.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.mutasiModule.hapusMasuk(${m.id})">
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

  bukaModalTambahMasuk() {
    const html = `
      <div class="modal-backdrop show" id="modal-mutasi">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-box-arrow-in-right"></i> Pendaftaran Siswa Masuk / Mutasi</h4>
            <button class="btn-close-modal" onclick="window.mutasiModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.mutasiModule.simpanMasuk(event)">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nama Siswa *</label>
                  <input type="text" name="nama" class="form-control" required placeholder="Nama lengkap siswa">
                </div>
                <div class="form-group">
                  <label>NISN</label>
                  <input type="text" name="nisn" class="form-control" placeholder="10 Digit NISN">
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin *</label>
                  <select name="jk" class="form-control" required>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Asal Sekolah Sebelumnya *</label>
                  <input type="text" name="asalSekolah" class="form-control" placeholder="Contoh: SDN 02 Cirebon" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Masuk *</label>
                  <input type="date" name="tanggalMasuk" class="form-control" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <div class="form-group">
                  <label>Kelas Tujuan *</label>
                  <select name="kelasTujuan" class="form-control" required>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" name="tempatLahir" class="form-control" placeholder="Tempat lahir">
                </div>
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" name="tanggalLahir" class="form-control">
                </div>
                <div class="form-group">
                  <label>Nama Orang Tua / Wali *</label>
                  <input type="text" name="namaOrtu" class="form-control" placeholder="Nama orang tua" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alasan Masuk / Pindah</label>
                  <input type="text" name="alasanMasuk" class="form-control" placeholder="Contoh: Mengikuti perpindahan tugas orang tua ke Brebes">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Domisili Siswa di Brebes</label>
                  <textarea name="alamat" class="form-control" placeholder="Alamat tinggal sekarang"></textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Keterangan Berkas</label>
                  <input type="text" name="keterangan" class="form-control" placeholder="Kelengkapan dokumen (Rapor, Surat Pindah asal)">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.mutasiModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-secondary"><i class="bi bi-save"></i> Simpan Siswa Masuk</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  bukaModalEditMasuk(id) {
    const m = window.dataStore.getSiswaMasuk().find(item => item.id === id);
    if (!m) return;

    const html = `
      <div class="modal-backdrop show" id="modal-mutasi">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Siswa Masuk: ${m.nama}</h4>
            <button class="btn-close-modal" onclick="window.mutasiModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.mutasiModule.simpanMasuk(event, ${m.id})">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nama Siswa *</label>
                  <input type="text" name="nama" class="form-control" value="${m.nama || ""}" required>
                </div>
                <div class="form-group">
                  <label>NISN</label>
                  <input type="text" name="nisn" class="form-control" value="${m.nisn || ""}">
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin</label>
                  <select name="jk" class="form-control">
                    <option value="L" ${m.jk === "L" ? "selected" : ""}>Laki-laki</option>
                    <option value="P" ${m.jk === "P" ? "selected" : ""}>Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Asal Sekolah Sebelumnya</label>
                  <input type="text" name="asalSekolah" class="form-control" value="${m.asalSekolah || ""}" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Masuk</label>
                  <input type="date" name="tanggalMasuk" class="form-control" value="${m.tanggalMasuk || ""}" required>
                </div>
                <div class="form-group">
                  <label>Kelas Tujuan</label>
                  <select name="kelasTujuan" class="form-control">
                    <option value="1" ${m.kelasTujuan === "1" ? "selected" : ""}>Kelas 1</option>
                    <option value="2" ${m.kelasTujuan === "2" ? "selected" : ""}>Kelas 2</option>
                    <option value="3" ${m.kelasTujuan === "3" ? "selected" : ""}>Kelas 3</option>
                    <option value="4" ${m.kelasTujuan === "4" ? "selected" : ""}>Kelas 4</option>
                    <option value="5" ${m.kelasTujuan === "5" ? "selected" : ""}>Kelas 5</option>
                    <option value="6" ${m.kelasTujuan === "6" ? "selected" : ""}>Kelas 6</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" name="tempatLahir" class="form-control" value="${m.tempatLahir || ""}">
                </div>
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" name="tanggalLahir" class="form-control" value="${m.tanggalLahir || ""}">
                </div>
                <div class="form-group">
                  <label>Nama Orang Tua</label>
                  <input type="text" name="namaOrtu" class="form-control" value="${m.namaOrtu || ""}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alasan Masuk</label>
                  <input type="text" name="alasanMasuk" class="form-control" value="${m.alasanMasuk || ""}">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alamat Domisili Siswa</label>
                  <textarea name="alamat" class="form-control">${m.alamat || ""}</textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.mutasiModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-secondary">Perbarui Data</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  simpanMasuk(e, id = null) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (id) data.id = id;
    window.dataStore.saveSiswaMasuk(data);
    this.tutupModal();
    this.render();
  },

  konfirmasiMasuk(id) {
    if (confirm("Konfirmasi siswa ini? Siswa akan otomatis ditambahkan ke database Siswa Aktif SDN Kaligangsa Wetan 01.")) {
      window.dataStore.konfirmasiSiswaMasuk(id);
      alert("Siswa berhasil dikonfirmasi dan dimasukkan ke dalam daftar Siswa Aktif!");
      this.render();
    }
  },

  hapusMasuk(id) {
    if (confirm("Hapus data mutasi masuk ini?")) {
      window.dataStore.deleteSiswaMasuk(id);
      this.render();
    }
  },

  cetakSuratMasuk(id) {
    const m = window.dataStore.getSiswaMasuk().find(item => item.id === id);
    if (!m) return;
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Keterangan Penerimaan Siswa Mutasi</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          body { font-family: 'Times New Roman', serif; padding: 25px 35px; font-size: 12pt; line-height: 1.5; }
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

        <div style="text-align:center; margin: 25px 0;">
          <h3 style="text-decoration: underline; margin-bottom: 3px;">SURAT KETERANGAN PENERIMAAN MUTASI</h3>
          <p>Nomor: 421.2/${m.noRegistrasi.replace('SM-', '')}/SD.01/XI/${new Date().getFullYear()}</p>
        </div>

        <p>Yang bertanda tangan di bawah ini, Kepala Sekolah Dasar Negeri Kaligangsa Wetan 01 Kecamatan Brebes Kabupaten Brebes, dengan ini menyatakan bahwa:</p>

        <table class="table-surat" style="margin: 15px 0;">
          <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${m.nama}</strong></td></tr>
          <tr><td>NISN</td><td>:</td><td>${m.nisn || "-"}</td></tr>
          <tr><td>Jenis Kelamin</td><td>:</td><td>${m.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
          <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${m.tempatLahir || "-"}, ${m.tanggalLahir || "-"}</td></tr>
          <tr><td>Asal Sekolah</td><td>:</td><td><strong>${m.asalSekolah}</strong></td></tr>
          <tr><td>Nama Orang Tua</td><td>:</td><td>${m.namaOrtu}</td></tr>
          <tr><td>Alamat</td><td>:</td><td>${m.alamat || "-"}</td></tr>
        </table>

        <p>Berdasarkan permohonan orang tua dan kesediaan kuota kelas pada lembaga kami, maka yang bersangkutan dinyatakan <strong>DITERIMA</strong> sebagai peserta didik pindahan di <strong>SD Negeri Kaligangsa Wetan 01</strong> dan ditempatkan pada <strong>Kelas ${m.kelasTujuan}</strong> terhitung sejak tanggal <strong>${m.tanggalMasuk}</strong>.</p>
        <p>Demikian surat keterangan ini kami terbitkan untuk dapat dipergunakan sebagaimana mestinya.</p>

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

  cetakRekapMasuk() {
    const list = window.dataStore.getSiswaMasuk();
    const sekolah = window.dataStore.getSekolah();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rekapitulasi Siswa Masuk</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 11pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; }
          th { background: #f0f0f0; text-align: left; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin-bottom: 4px;">REKAPITULASI SISWA MUTASI MASUK</h3>
        <h4 style="text-align:center; margin-top:0;">SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES</h4>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>No Registrasi</th>
              <th>Nama Siswa</th>
              <th>NISN</th>
              <th>JK</th>
              <th>Asal Sekolah</th>
              <th>Tgl Masuk</th>
              <th>Kelas Tujuan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((m, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${m.noRegistrasi}</td>
                <td><strong>${m.nama}</strong></td>
                <td>${m.nisn}</td>
                <td>${m.jk}</td>
                <td>${m.asalSekolah}</td>
                <td>${m.tanggalMasuk}</td>
                <td>Kelas ${m.kelasTujuan}</td>
                <td>${m.statusKonfirmasi}</td>
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

  // ===================== SISWA KELUAR =====================
  renderSiswaKeluar(container) {
    const list = window.dataStore.getSiswaKeluar();
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-box-arrow-left" style="color:var(--danger);"></i> Data Siswa Keluar (Mutasi Keluar & Lulus)</h3>
            <p>Pencatatan siswa yang pindah sekolah, lulus, atau keluar dengan riwayat data tetap tersimpan rapi</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.mutasiModule.cetakRekapKeluar()">
              <i class="bi bi-printer"></i> Rekap Tahunan
            </button>
            <button class="btn btn-danger btn-sm" onclick="window.mutasiModule.bukaModalTambahKeluar()">
              <i class="bi bi-person-x-fill"></i> Tambah Siswa Keluar
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>No Registrasi</th>
                  <th>Nama Siswa</th>
                  <th>NIS / NISN</th>
                  <th style="text-align:center;">JK</th>
                  <th>Kelas Terakhir</th>
                  <th>Tanggal Keluar</th>
                  <th>Sekolah Tujuan</th>
                  <th>Alasan Keluar</th>
                  <th style="text-align:center;">Status</th>
                  <th style="text-align:center; width:170px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="11" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Belum ada data siswa mutasi keluar.
                    </td>
                  </tr>
                ` : list.map((k, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td><code>${k.noRegistrasi}</code></td>
                    <td><strong>${k.nama}</strong></td>
                    <td>${k.nis || "-"} / ${k.nisn || "-"}</td>
                    <td style="text-align:center;">${k.jk}</td>
                    <td>Kelas ${k.kelasTerakhir}</td>
                    <td>${k.tanggalKeluar}</td>
                    <td>${k.sekolahTujuan || "-"}</td>
                    <td>${k.alasanKeluar}</td>
                    <td style="text-align:center;">
                      <span class="badge ${k.statusKonfirmasi === 'Dikonfirmasi' ? 'badge-danger' : 'badge-warning'}">
                        ${k.statusKonfirmasi}
                      </span>
                    </td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        ${k.statusKonfirmasi === 'Menunggu' ? `
                          <button class="btn btn-success btn-sm" title="Konfirmasi Keluar & Ubah Status Siswa" onclick="window.mutasiModule.konfirmasiKeluar(${k.id})">
                            <i class="bi bi-check-circle"></i>
                          </button>
                        ` : ''}
                        <button class="btn btn-outline-secondary btn-sm" title="Cetak Surat Keterangan Pindah" onclick="window.mutasiModule.cetakSuratPindah(${k.id})">
                          <i class="bi bi-file-earmark-text"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit" onclick="window.mutasiModule.bukaModalEditKeluar(${k.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.mutasiModule.hapusKeluar(${k.id})">
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

  bukaModalTambahKeluar() {
    const siswaAktif = window.dataStore.getSiswa({ status: "Aktif" });
    const html = `
      <div class="modal-backdrop show" id="modal-mutasi">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-box-arrow-left"></i> Catat Siswa Keluar / Mutasi Keluar</h4>
            <button class="btn-close-modal" onclick="window.mutasiModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.mutasiModule.simpanKeluar(event)">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Pilih Siswa Dari Data Siswa Aktif</label>
                  <select id="pilih-siswa-keluar" class="form-control" onchange="window.mutasiModule.onPilihSiswaKeluar(this.value)">
                    <option value="">-- Pilih Siswa atau Isi Manual di Bawah --</option>
                    ${siswaAktif.map(s => `
                      <option value="${s.id}">${s.nama} (Kelas ${s.kelas} - NIS: ${s.nis})</option>
                    `).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Nama Siswa *</label>
                  <input type="text" id="keluar-nama" name="nama" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>NIS *</label>
                  <input type="text" id="keluar-nis" name="nis" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>NISN</label>
                  <input type="text" id="keluar-nisn" name="nisn" class="form-control">
                </div>
                <div class="form-group">
                  <label>Jenis Kelamin *</label>
                  <select id="keluar-jk" name="jk" class="form-control" required>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Kelas Terakhir *</label>
                  <select id="keluar-kelas" name="kelasTerakhir" class="form-control" required>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tanggal Keluar *</label>
                  <input type="date" name="tanggalKeluar" class="form-control" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Sekolah Tujuan (Jika Mutasi Pindah)</label>
                  <input type="text" name="sekolahTujuan" class="form-control" placeholder="Nama sekolah tujuan">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Alasan Keluar *</label>
                  <input type="text" name="alasanKeluar" class="form-control" placeholder="Contoh: Mengikuti domisili orang tua / Lulus" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Keterangan Tambahan</label>
                  <textarea name="keterangan" class="form-control" placeholder="Catatan berkas yang telah diserahkan"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.mutasiModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-danger"><i class="bi bi-save"></i> Simpan Siswa Keluar</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  onPilihSiswaKeluar(id) {
    if (!id) return;
    const s = window.dataStore.getSiswa().find(item => item.id === parseInt(id));
    if (!s) return;
    document.getElementById("keluar-nama").value = s.nama;
    document.getElementById("keluar-nis").value = s.nis || "";
    document.getElementById("keluar-nisn").value = s.nisn || "";
    document.getElementById("keluar-jk").value = s.jk;
    document.getElementById("keluar-kelas").value = s.kelas;
  },

  bukaModalEditKeluar(id) {
    const k = window.dataStore.getSiswaKeluar().find(item => item.id === id);
    if (!k) return;

    const html = `
      <div class="modal-backdrop show" id="modal-mutasi">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Siswa Keluar: ${k.nama}</h4>
            <button class="btn-close-modal" onclick="window.mutasiModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.mutasiModule.simpanKeluar(event, ${k.id})">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nama Siswa</label>
                  <input type="text" name="nama" class="form-control" value="${k.nama}" required>
                </div>
                <div class="form-group">
                  <label>NIS</label>
                  <input type="text" name="nis" class="form-control" value="${k.nis || ""}">
                </div>
                <div class="form-group">
                  <label>NISN</label>
                  <input type="text" name="nisn" class="form-control" value="${k.nisn || ""}">
                </div>
                <div class="form-group">
                  <label>Sekolah Tujuan</label>
                  <input type="text" name="sekolahTujuan" class="form-control" value="${k.sekolahTujuan || ""}">
                </div>
                <div class="form-group">
                  <label>Tanggal Keluar</label>
                  <input type="date" name="tanggalKeluar" class="form-control" value="${k.tanggalKeluar || ""}" required>
                </div>
                <div class="form-group">
                  <label>Alasan Keluar</label>
                  <input type="text" name="alasanKeluar" class="form-control" value="${k.alasanKeluar || ""}" required>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.mutasiModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-danger">Perbarui</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  simpanKeluar(e, id = null) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (id) data.id = id;

    // Check if picked from dropdown
    const selectEl = document.getElementById("pilih-siswa-keluar");
    if (selectEl && selectEl.value) {
      data.siswaId = parseInt(selectEl.value);
    }

    window.dataStore.saveSiswaKeluar(data);
    this.tutupModal();
    this.render();
  },

  konfirmasiKeluar(id) {
    if (confirm("Konfirmasi siswa keluar ini? Status siswa di database Siswa Aktif akan otomatis diubah menjadi 'Pindah/Keluar', dan riwayat mutasi akan tetap tersimpan permanen.")) {
      window.dataStore.konfirmasiSiswaKeluar(id);
      alert("Status siswa berhasil diperbarui menjadi keluar/pindah.");
      this.render();
    }
  },

  hapusKeluar(id) {
    if (confirm("Hapus catatan siswa keluar ini?")) {
      window.dataStore.deleteSiswaKeluar(id);
      this.render();
    }
  },

  cetakSuratPindah(id) {
    const k = window.dataStore.getSiswaKeluar().find(item => item.id === id);
    if (!k) return;
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Keterangan Pindah Sekolah</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          body { font-family: 'Times New Roman', serif; padding: 25px 35px; font-size: 12pt; line-height: 1.5; }
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

        <div style="text-align:center; margin: 25px 0;">
          <h3 style="text-decoration: underline; margin-bottom: 3px;">SURAT KETERANGAN PINDAH SEKOLAH</h3>
          <p>Nomor: 421.2/${k.noRegistrasi.replace('SK-', '')}/SD.01/XI/${new Date().getFullYear()}</p>
        </div>

        <p>Yang bertanda tangan di bawah ini Kepala Sekolah Dasar Negeri Kaligangsa Wetan 01 Kecamatan Brebes Kabupaten Brebes menerangkan bahwa:</p>

        <table class="table-surat" style="margin: 15px 0;">
          <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${k.nama}</strong></td></tr>
          <tr><td>Nomor Induk Siswa (NIS)</td><td>:</td><td>${k.nis || "-"}</td></tr>
          <tr><td>NISN</td><td>:</td><td>${k.nisn || "-"}</td></tr>
          <tr><td>Jenis Kelamin</td><td>:</td><td>${k.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
          <tr><td>Tingkat Kelas Terakhir</td><td>:</td><td>Kelas ${k.kelasTerakhir}</td></tr>
          <tr><td>Tanggal Keluar</td><td>:</td><td>${k.tanggalKeluar}</td></tr>
          <tr><td>Sekolah Tujuan</td><td>:</td><td><strong>${k.sekolahTujuan || "Sekolah Tujuan"}</strong></td></tr>
          <tr><td>Alasan Pindah</td><td>:</td><td>${k.alasanKeluar}</td></tr>
        </table>

        <p>Sesuai dengan surat permohonan kepindahan oleh orang tua/wali siswa, bersama surat ini kami sertakan Buku Laporan Hasil Belajar (Rapor) siswa yang bersangkutan.</p>
        <p>Demikian surat keterangan pindah sekolah ini kami berikan untuk dipergunakan sebagaimana mestinya.</p>

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

  cetakRekapKeluar() {
    const list = window.dataStore.getSiswaKeluar();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rekapitulasi Siswa Keluar</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 11pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; }
          th { background: #f0f0f0; text-align: left; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin-bottom: 4px;">REKAPITULASI SISWA MUTASI KELUAR / LULUS</h3>
        <h4 style="text-align:center; margin-top:0;">SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES</h4>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>No Registrasi</th>
              <th>Nama Siswa</th>
              <th>NIS / NISN</th>
              <th>JK</th>
              <th>Kelas Terakhir</th>
              <th>Tanggal Keluar</th>
              <th>Sekolah Tujuan</th>
              <th>Alasan Keluar</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((k, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${k.noRegistrasi}</td>
                <td><strong>${k.nama}</strong></td>
                <td>${k.nis} / ${k.nisn}</td>
                <td>${k.jk}</td>
                <td>Kelas ${k.kelasTerakhir}</td>
                <td>${k.tanggalKeluar}</td>
                <td>${k.sekolahTujuan}</td>
                <td>${k.alasanKeluar}</td>
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
