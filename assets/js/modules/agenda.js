/**
 * MODUL BUKU AGENDA SURAT (MASUK & KELUAR)
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 */

window.agendaModule = {
  currentTab: "keluar", // "keluar" | "masuk"
  searchQuery: "",

  init(tab = "keluar") {
    this.currentTab = tab;
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    if (this.currentTab === "keluar") {
      this.renderAgendaKeluar(container);
    } else {
      this.renderAgendaMasuk(container);
    }
  },

  // ===================== AGENDA SURAT KELUAR =====================
  renderAgendaKeluar(container) {
    let list = window.dataStore.getSuratKeluar();
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(s =>
        (s.nomorSurat && s.nomorSurat.toLowerCase().includes(q)) ||
        (s.tujuanSurat && s.tujuanSurat.toLowerCase().includes(q)) ||
        (s.perihal && s.perihal.toLowerCase().includes(q)) ||
        (s.jenisSurat && s.jenisSurat.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-journal-arrow-up" style="color:var(--primary);"></i> Buku Agenda Surat Keluar</h3>
            <p>Daftar arsip seluruh surat dinas resmi yang telah diterbitkan sekolah</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.agendaModule.cetakAgendaKeluar()">
              <i class="bi bi-printer"></i> Cetak Agenda
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.agendaModule.eksporExcelKeluar()">
              <i class="bi bi-file-earmark-spreadsheet"></i> Ekspor Excel
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.app.navigate('surat')">
              <i class="bi bi-plus-circle"></i> Buat Surat Baru
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-toolbar">
            <div class="search-box" style="width:320px;">
              <i class="bi bi-search"></i>
              <input type="text" placeholder="Cari nomor surat, penerima, perihal..." value="${this.searchQuery}" oninput="window.agendaModule.onSearch(this.value)">
            </div>
            <div>
              <span class="badge badge-info">Total Arsip: ${list.length} Surat</span>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>No Agenda</th>
                  <th>Nomor Surat</th>
                  <th>Tanggal</th>
                  <th>Tujuan / Penerima</th>
                  <th>Perihal</th>
                  <th>Jenis Surat</th>
                  <th>Penanggung Jawab</th>
                  <th style="text-align:center; width:120px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="9" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Belum ada arsip surat keluar.
                    </td>
                  </tr>
                ` : list.map((s, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td><code>${s.noAgenda}</code></td>
                    <td><strong>${s.nomorSurat}</strong></td>
                    <td>${s.tanggalSurat}</td>
                    <td><strong>${s.tujuanSurat}</strong></td>
                    <td>${s.perihal}</td>
                    <td><small class="badge badge-neutral">${s.jenisSurat}</small></td>
                    <td>${s.penanggungJawab || "-"}</td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        <button class="btn btn-outline-primary btn-sm" title="Lihat Detail / Edit" onclick="window.agendaModule.bukaEditKeluar(${s.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.agendaModule.hapusKeluar(${s.id})">
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

  // ===================== AGENDA SURAT MASUK =====================
  renderAgendaMasuk(container) {
    let list = window.dataStore.getSuratMasuk();
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(m =>
        (m.nomorSurat && m.nomorSurat.toLowerCase().includes(q)) ||
        (m.pengirim && m.pengirim.toLowerCase().includes(q)) ||
        (m.perihal && m.perihal.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-journal-arrow-down" style="color:var(--secondary);"></i> Buku Agenda Surat Masuk</h3>
            <p>Pencatatan surat dinas masuk dari dinas kependidikan, instansi luar, atau masyarakat</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.agendaModule.cetakAgendaMasuk()">
              <i class="bi bi-printer"></i> Cetak Agenda
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.agendaModule.eksporExcelMasuk()">
              <i class="bi bi-file-earmark-spreadsheet"></i> Ekspor Excel
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.agendaModule.bukaModalTambahMasuk()">
              <i class="bi bi-plus-circle"></i> Catat Surat Masuk
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-toolbar">
            <div class="search-box" style="width:320px;">
              <i class="bi bi-search"></i>
              <input type="text" placeholder="Cari nomor surat, pengirim, perihal..." value="${this.searchQuery}" oninput="window.agendaModule.onSearch(this.value)">
            </div>
            <div>
              <span class="badge badge-success">Total: ${list.length} Surat Masuk</span>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>No Agenda</th>
                  <th>Nomor Surat</th>
                  <th>Tgl Surat</th>
                  <th>Tgl Terima</th>
                  <th>Asal Pengirim</th>
                  <th>Perihal</th>
                  <th>Isi Disposisi</th>
                  <th style="text-align:center; width:140px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="9" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Belum ada catatan surat masuk.
                    </td>
                  </tr>
                ` : list.map((m, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td><code>${m.noAgenda}</code></td>
                    <td><strong>${m.nomorSurat}</strong></td>
                    <td>${m.tanggalSurat}</td>
                    <td>${m.tanggalDiterima}</td>
                    <td><strong>${m.pengirim}</strong></td>
                    <td>${m.perihal}</td>
                    <td><small style="color:var(--primary); font-style:italic;">${m.disposisi || "-"}</small></td>
                    <td style="text-align:center;">
                      <div class="btn-group" style="justify-content:center;">
                        <button class="btn btn-outline-secondary btn-sm" title="Cetak Lembar Disposisi" onclick="window.agendaModule.cetakLembarDisposisi(${m.id})">
                          <i class="bi bi-file-earmark-check"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit" onclick="window.agendaModule.bukaModalEditMasuk(${m.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" title="Hapus" style="color:var(--danger);" onclick="window.agendaModule.hapusMasuk(${m.id})">
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

  onSearch(val) {
    this.searchQuery = val;
    this.render();
  },

  bukaModalTambahMasuk() {
    const html = `
      <div class="modal-backdrop show" id="modal-agenda">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-journal-plus"></i> Catat Surat Masuk Baru</h4>
            <button class="btn-close-modal" onclick="window.agendaModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.agendaModule.simpanMasuk(event)">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nomor Surat Masuk *</label>
                  <input type="text" name="nomorSurat" class="form-control" placeholder="Contoh: 420/123/DISDIK/2026" required>
                </div>
                <div class="form-group">
                  <label>Asal Instansi / Pengirim *</label>
                  <input type="text" name="pengirim" class="form-control" placeholder="Dinas Pendidikan / Puskesmas / Korwil" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Surat *</label>
                  <input type="date" name="tanggalSurat" class="form-control" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Diterima *</label>
                  <input type="date" name="tanggalDiterima" class="form-control" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Perihal Surat *</label>
                  <input type="text" name="perihal" class="form-control" placeholder="Perihal atau hal surat masuk" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Disposisi Kepala Sekolah</label>
                  <textarea name="disposisi" class="form-control" placeholder="Instruksi kepala sekolah kepada guru/operator..."></textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Keterangan & Nama File Lampiran</label>
                  <input type="text" name="keterangan" class="form-control" placeholder="Contoh: Berkas asli disimpan di odner dinas 2026">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.agendaModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-secondary"><i class="bi bi-save"></i> Simpan Surat Masuk</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  bukaModalEditMasuk(id) {
    const m = window.dataStore.getSuratMasuk().find(item => item.id === id);
    if (!m) return;

    const html = `
      <div class="modal-backdrop show" id="modal-agenda">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Edit Surat Masuk: ${m.nomorSurat}</h4>
            <button class="btn-close-modal" onclick="window.agendaModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.agendaModule.simpanMasuk(event, ${m.id})">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nomor Surat</label>
                  <input type="text" name="nomorSurat" class="form-control" value="${m.nomorSurat}" required>
                </div>
                <div class="form-group">
                  <label>Pengirim</label>
                  <input type="text" name="pengirim" class="form-control" value="${m.pengirim}" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Surat</label>
                  <input type="date" name="tanggalSurat" class="form-control" value="${m.tanggalSurat}" required>
                </div>
                <div class="form-group">
                  <label>Tanggal Diterima</label>
                  <input type="date" name="tanggalDiterima" class="form-control" value="${m.tanggalDiterima}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Perihal</label>
                  <input type="text" name="perihal" class="form-control" value="${m.perihal}" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Disposisi Kepala Sekolah</label>
                  <textarea name="disposisi" class="form-control">${m.disposisi || ""}</textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label>Keterangan</label>
                  <input type="text" name="keterangan" class="form-control" value="${m.keterangan || ""}">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.agendaModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary">Perbarui</button>
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
    window.dataStore.saveSuratMasuk(data);
    this.tutupModal();
    this.render();
  },

  hapusMasuk(id) {
    if (confirm("Hapus catatan surat masuk ini?")) {
      window.dataStore.deleteSuratMasuk(id);
      this.render();
    }
  },

  hapusKeluar(id) {
    if (confirm("Hapus arsip surat keluar ini?")) {
      window.dataStore.deleteSuratKeluar(id);
      this.render();
    }
  },

  bukaEditKeluar(id) {
    const s = window.dataStore.getSuratKeluar().find(item => item.id === id);
    if (!s) return;
    alert(`Arsip Surat Keluar Nomor: ${s.nomorSurat}\nTujuan: ${s.tujuanSurat}\nPerihal: ${s.perihal}\nPenanggung Jawab: ${s.penanggungJawab}`);
  },

  cetakLembarDisposisi(id) {
    const m = window.dataStore.getSuratMasuk().find(item => item.id === id);
    if (!m) return;
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lembar Disposisi - ${m.noAgenda}</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          body { font-family: Arial, sans-serif; padding: 25px; font-size: 11pt; }
          .disp-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .disp-table td, .disp-table th { border: 1px solid #000; padding: 8px 10px; vertical-align: top; }
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

        <div style="text-align:center; margin: 15px 0;">
          <h3 style="text-decoration: underline; text-transform: uppercase;">LEMBAR DISPOSISI SURAT</h3>
        </div>

        <table class="disp-table">
          <tr>
            <td style="width: 50%;"><strong>Surat Dari:</strong><br>${m.pengirim}</td>
            <td style="width: 50%;"><strong>Diterima Tanggal:</strong> ${m.tanggalDiterima}<br><strong>No. Agenda:</strong> ${m.noAgenda}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Surat:</strong> ${m.tanggalSurat}</td>
            <td><strong>Nomor Surat:</strong> ${m.nomorSurat}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Perihal / Ringkasan Isi:</strong><br>${m.perihal}</td>
          </tr>
          <tr>
            <td colspan="2" style="height: 120px;">
              <strong>Instruksi / Catatan Disposisi Kepala Sekolah:</strong><br><br>
              <p style="font-size:12pt; color:#1e3a8a;">${m.disposisi || "Segera tindak lanjuti sesuai ketentuan kedinasan."}</p>
            </td>
          </tr>
          <tr>
            <td style="width: 50%;">
              <strong>Diteruskan Kepada:</strong><br>
              [ ] Guru Kelas / Mapel<br>
              [ ] Operator Dapodik<br>
              [ ] Bendahara BOS<br>
              [ ] Arsip Dokumen
            </td>
            <td style="text-align:center;">
              <p>Kepala SD Negeri Kaligangsa Wetan 01</p>
              <div style="height: 50px;"></div>
              <p><strong>${sekolah.kepalaSekolah}</strong></p>
              <p>NIP. ${sekolah.nipKepalaSekolah}</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  cetakAgendaKeluar() {
    const list = window.dataStore.getSuratKeluar();
    const sekolah = window.dataStore.getSekolah();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Buku Agenda Surat Keluar</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
          th { background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin: 0;">BUKU AGENDA SURAT KELUAR</h3>
        <h4 style="text-align:center; margin-top: 2px;">SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES</h4>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No Agenda</th>
              <th>Nomor Surat</th>
              <th>Tanggal</th>
              <th>Tujuan Surat</th>
              <th>Perihal</th>
              <th>Jenis Surat</th>
              <th>Penanggung Jawab</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((s, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${s.noAgenda}</td>
                <td>${s.nomorSurat}</td>
                <td>${s.tanggalSurat}</td>
                <td>${s.tujuanSurat}</td>
                <td>${s.perihal}</td>
                <td>${s.jenisSurat}</td>
                <td>${s.penanggungJawab}</td>
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

  cetakAgendaMasuk() {
    const list = window.dataStore.getSuratMasuk();
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Buku Agenda Surat Masuk</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
          th { background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin: 0;">BUKU AGENDA SURAT MASUK</h3>
        <h4 style="text-align:center; margin-top: 2px;">SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES</h4>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No Agenda</th>
              <th>Nomor Surat</th>
              <th>Tgl Surat</th>
              <th>Tgl Terima</th>
              <th>Asal Surat / Pengirim</th>
              <th>Perihal</th>
              <th>Disposisi</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((m, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${m.noAgenda}</td>
                <td>${m.nomorSurat}</td>
                <td>${m.tanggalSurat}</td>
                <td>${m.tanggalDiterima}</td>
                <td>${m.pengirim}</td>
                <td>${m.perihal}</td>
                <td>${m.disposisi || "-"}</td>
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

  eksporExcelKeluar() {
    const list = window.dataStore.getSuratKeluar();
    let csv = "data:text/csv;charset=utf-8,No,No Agenda,Nomor Surat,Tanggal Surat,Tujuan Surat,Perihal,Jenis Surat,Penanggung Jawab\n";
    list.forEach((s, i) => {
      csv += `${i+1},"${s.noAgenda}","${s.nomorSurat}","${s.tanggalSurat}","${s.tujuanSurat}","${s.perihal}","${s.jenisSurat}","${s.penanggungJawab}"\n`;
    });
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `AGENDA_SURAT_KELUAR_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  },

  eksporExcelMasuk() {
    const list = window.dataStore.getSuratMasuk();
    let csv = "data:text/csv;charset=utf-8,No,No Agenda,Nomor Surat,Tanggal Surat,Tanggal Terima,Pengirim,Perihal,Disposisi\n";
    list.forEach((m, i) => {
      csv += `${i+1},"${m.noAgenda}","${m.nomorSurat}","${m.tanggalSurat}","${m.tanggalDiterima}","${m.pengirim}","${m.perihal}","${m.disposisi || ''}"\n`;
    });
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `AGENDA_SURAT_MASUK_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
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
