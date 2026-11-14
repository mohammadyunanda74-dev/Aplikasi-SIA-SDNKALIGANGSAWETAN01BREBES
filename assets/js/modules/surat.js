/**
 * PUSAT ADMINISTRASI SURAT SEKOLAH
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 * Engine Pembuatan Surat Otomatis: 64+ Jenis Surat, Kop Resmi, Auto-Numbering, Auto-Fill, Word & PDF Export
 */

window.suratModule = {
  currentCategory: "A",
  selectedTemplate: null,
  activeFormData: {},
  activeExtraData: {},

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const templates = window.SURAT_TEMPLATES || [];
    const filteredTemplates = templates.filter(t => t.kodeKategori === this.currentCategory);
    const sekolah = window.dataStore.getSekolah();

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-envelope-paper-fill" style="color:var(--primary);"></i> PUSAT ADMINISTRASI SURAT SEKOLAH</h3>
            <p>Penerbitan surat dinas resmi otomatis berstandar Pemerintah Kabupaten Brebes</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.app.navigate('agenda-keluar')">
              <i class="bi bi-journal-bookmark"></i> Buka Buku Agenda Surat Keluar
            </button>
          </div>
        </div>

        <div class="card-body">
          <!-- NAV KATEGORI SURAT A - F -->
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:12px; margin-bottom:18px; border-bottom:1px solid var(--gray-200);">
            <button class="btn btn-sm ${this.currentCategory === 'A' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('A')">
              A. Suket Siswa (12)
            </button>
            <button class="btn btn-sm ${this.currentCategory === 'B' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('B')">
              B. Surat Guru & Tendik (12)
            </button>
            <button class="btn btn-sm ${this.currentCategory === 'C' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('C')">
              C. Undangan & Edaran (10)
            </button>
            <button class="btn btn-sm ${this.currentCategory === 'D' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('D')">
              D. Surat Tugas & SPPD (8)
            </button>
            <button class="btn btn-sm ${this.currentCategory === 'E' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('E')">
              E. Surat Kelembagaan (12)
            </button>
            <button class="btn btn-sm ${this.currentCategory === 'F' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="window.suratModule.switchCategory('F')">
              F. Kesiswaan & Lomba (10)
            </button>
          </div>

          <!-- GRID DAFTAR TEMPLATE SURAT -->
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">
            ${filteredTemplates.map(t => `
              <div class="card" style="margin:0; border:1px solid var(--gray-200); cursor:pointer; transition:var(--transition);" 
                   onclick="window.suratModule.pilihTemplate('${t.id}')">
                <div class="card-body" style="padding:16px;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <span class="badge badge-info">${t.id}</span>
                    <span style="font-size:11px; font-weight:700; color:var(--gray-600); background:var(--gray-100); padding:2px 6px; border-radius:4px;">
                      Kode: ${t.kodeKlasifikasi}
                    </span>
                  </div>
                  <h4 style="font-size:14px; font-weight:700; color:var(--dark); margin-bottom:6px;">${t.judul}</h4>
                  <p style="font-size:12px; color:var(--gray-600); line-height:1.3;">Target: <strong style="text-transform:capitalize;">${t.targetType}</strong></p>
                  <div style="margin-top:12px; display:flex; justify-content:flex-end;">
                    <button class="btn btn-primary btn-sm" style="width:100%; font-size:11px;">
                      <i class="bi bi-file-earmark-plus"></i> Buat Surat Ini
                    </button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  },

  switchCategory(cat) {
    this.currentCategory = cat;
    this.render();
  },

  pilihTemplate(templateId) {
    const t = window.SURAT_TEMPLATES.find(item => item.id === templateId);
    if (!t) return;
    this.selectedTemplate = t;

    // Generate auto letter number
    const noSuratOtomatis = window.dataStore.generateNomorSurat(t.kodeKlasifikasi);
    const todayStr = new Date().toISOString().slice(0, 10);
    const sekolah = window.dataStore.getSekolah();

    // Default active extra fields
    this.activeExtraData = {};
    if (t.fields) {
      t.fields.forEach(f => {
        this.activeExtraData[f.name] = f.default || "";
      });
    }

    this.activeFormData = {
      nomorSurat: noSuratOtomatis,
      tanggalSurat: todayStr,
      perihal: t.perihal,
      tujuanSurat: t.targetType === "siswa" ? "Orang Tua / Wali Siswa" : "Bapak/Ibu Terkait",
      sertakanStempel: true,
      sertakanTtd: true
    };

    this.bukaEditorSurat();
  },

  bukaEditorSurat() {
    const t = this.selectedTemplate;
    const sekolah = window.dataStore.getSekolah();
    const siswaList = window.dataStore.getSiswa();
    const gtkList = window.dataStore.getGtk();

    const html = `
      <div class="modal-backdrop show" id="modal-editor-surat">
        <div class="modal-dialog modal-xl" style="height: 94vh;">
          <div class="modal-header">
            <h4><i class="bi bi-envelope-paper"></i> Pembuat Surat: ${t.judul}</h4>
            <button class="btn-close-modal" onclick="window.suratModule.tutupModal()">&times;</button>
          </div>

          <div class="modal-body" style="display:flex; gap:20px; padding:15px; overflow:hidden;">
            <!-- KOLOM KIRI: FORM ISIAN SURAT -->
            <div style="flex: 1; overflow-y:auto; padding-right:10px; border-right:1px solid var(--gray-200);">
              <h5 style="font-size:13px; font-weight:700; color:var(--primary); margin-bottom:12px; text-transform:uppercase;">
                <i class="bi bi-sliders"></i> Parameter & Data Surat
              </h5>

              <div class="form-group">
                <label>Nomor Surat (Otomatis)</label>
                <input type="text" id="input-no-surat" class="form-control" value="${this.activeFormData.nomorSurat}" oninput="window.suratModule.updatePreview()">
              </div>

              <div class="form-group">
                <label>Tanggal Surat</label>
                <input type="date" id="input-tgl-surat" class="form-control" value="${this.activeFormData.tanggalSurat}" onchange="window.suratModule.updatePreview()">
              </div>

              <div class="form-group">
                <label>Perihal Surat</label>
                <input type="text" id="input-perihal-surat" class="form-control" value="${this.activeFormData.perihal}" oninput="window.suratModule.updatePreview()">
              </div>

              ${t.targetType === "siswa" ? `
                <div class="form-group" style="background:var(--primary-light); padding:10px; border-radius:6px; border:1px solid rgba(var(--primary-rgb), 0.2);">
                  <label><i class="bi bi-person-fill"></i> Pilih Siswa Dari Database (Auto-Fill)</label>
                  <select id="select-siswa-surat" class="form-control" onchange="window.suratModule.onPilihSiswa(this.value)">
                    <option value="">-- Pilih Nama Siswa --</option>
                    ${siswaList.map(s => `
                      <option value="${s.id}">${s.nama} (Kelas ${s.kelas} - NIS: ${s.nis})</option>
                    `).join("")}
                  </select>
                </div>
              ` : ''}

              ${t.targetType === "guru" ? `
                <div class="form-group" style="background:var(--secondary-light); padding:10px; border-radius:6px; border:1px solid rgba(21, 128, 61, 0.2);">
                  <label><i class="bi bi-person-badge-fill"></i> Pilih Guru / GTK Dari Database (Auto-Fill)</label>
                  <select id="select-gtk-surat" class="form-control" onchange="window.suratModule.onPilihGtk(this.value)">
                    <option value="">-- Pilih Nama GTK --</option>
                    ${gtkList.map(g => `
                      <option value="${g.id}">${g.nama} (${g.jabatan})</option>
                    `).join("")}
                  </select>
                </div>
              ` : ''}

              <!-- EXTRA FIELDS SESUAI TEMPLATE -->
              ${(t.fields || []).map(f => `
                <div class="form-group">
                  <label>${f.label}</label>
                  <textarea id="extra-${f.name}" class="form-control" rows="2" oninput="window.suratModule.onExtraFieldChange('${f.name}', this.value)">${this.activeExtraData[f.name] || ""}</textarea>
                </div>
              `).join("")}

              <div class="form-group" style="margin-top:14px; background:var(--gray-50); padding:10px; border-radius:6px;">
                <label style="font-weight:700; margin-bottom:8px;">Opsi Legalitas Dokumen:</label>
                <div style="display:flex; gap:16px;">
                  <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
                    <input type="checkbox" id="check-stempel" checked onchange="window.suratModule.updatePreview()"> Sertakan Stempel Dinas
                  </label>
                  <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
                    <input type="checkbox" id="check-ttd" checked onchange="window.suratModule.updatePreview()"> Tanda Tangan Kepsek
                  </label>
                </div>
              </div>
            </div>

            <!-- KOLOM KANAN: LIVE PREVIEW KERTAS A4 -->
            <div style="flex: 1.4; overflow-y:auto; background:#525659; border-radius:8px; padding:15px; display:flex; justify-content:center;">
              <div id="live-surat-paper" class="surat-paper" style="width: 100%; max-width: 650px; min-height: 800px; transform-origin: top center;">
                <!-- KONTEN PREVIEW GENERATED HERE -->
              </div>
            </div>
          </div>

          <div class="modal-footer" style="display:flex; justify-content:space-between;">
            <div>
              <span style="font-size:11px; color:var(--gray-600);"><i class="bi bi-info-circle"></i> Surat siap dicetak langsung di kertas A4 standar dinas.</span>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-secondary" onclick="window.suratModule.tutupModal()">Tutup</button>
              <button type="button" class="btn btn-outline-primary" onclick="window.suratModule.unduhWord()">
                <i class="bi bi-file-earmark-word"></i> Unduh Word (.doc)
              </button>
              <button type="button" class="btn btn-secondary" onclick="window.suratModule.simpanKeArsip()">
                <i class="bi bi-archive"></i> Simpan ke Arsip Keluar
              </button>
              <button type="button" class="btn btn-primary" onclick="window.suratModule.cetakLangsung()">
                <i class="bi bi-printer"></i> Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.injectModal(html);
    this.updatePreview();
  },

  onPilihSiswa(id) {
    if (!id) {
      this.selectedEntity = {};
    } else {
      this.selectedEntity = window.dataStore.getSiswa().find(s => s.id === parseInt(id)) || {};
    }
    this.updatePreview();
  },

  onPilihGtk(id) {
    if (!id) {
      this.selectedEntity = {};
    } else {
      this.selectedEntity = window.dataStore.getGtk().find(g => g.id === parseInt(id)) || {};
    }
    this.updatePreview();
  },

  onExtraFieldChange(name, value) {
    this.activeExtraData[name] = value;
    this.updatePreview();
  },

  updatePreview() {
    const paper = document.getElementById("live-surat-paper");
    if (!paper || !this.selectedTemplate) return;

    const sekolah = window.dataStore.getSekolah();
    const t = this.selectedTemplate;
    const noSurat = document.getElementById("input-no-surat")?.value || this.activeFormData.nomorSurat;
    const tglSurat = document.getElementById("input-tgl-surat")?.value || this.activeFormData.tanggalSurat;
    const perihal = document.getElementById("input-perihal-surat")?.value || this.activeFormData.perihal;
    const withStempel = document.getElementById("check-stempel")?.checked ?? true;
    const withTtd = document.getElementById("check-ttd")?.checked ?? true;

    const dataTarget = this.selectedEntity || {
      nama: "...................................",
      nis: "..........",
      nisn: "..........",
      kelas: "...",
      tempatLahir: "..........",
      tanggalLahir: "..........",
      jk: "L",
      alamat: "...................................",
      namaAyah: "..................................."
    };

    const formattedDate = new Date(tglSurat).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const bodyContent = t.generateContent(dataTarget, this.activeExtraData, sekolah);

    paper.innerHTML = `
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

      <div class="surat-header-info" style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:11pt;">
        <div>
          <table>
            <tr><td style="width:70px;">Nomor</td><td style="width:10px;">:</td><td><strong>${noSurat}</strong></td></tr>
            <tr><td>Lampiran</td><td>:</td><td>-</td></tr>
            <tr><td>Perihal</td><td>:</td><td><strong>${perihal}</strong></td></tr>
          </table>
        </div>
        <div style="text-align:right;">
          <p>Brebes, ${formattedDate}</p>
        </div>
      </div>

      <div class="surat-judul-tengah">
        <h3>${t.judul}</h3>
        <p>Nomor: ${noSurat}</p>
      </div>

      <div class="surat-isi" style="font-size:11.5pt;">
        ${bodyContent}
      </div>

      <div class="surat-ttd-row">
        <div class="surat-ttd-box">
          <p>Brebes, ${formattedDate}</p>
          <p>Kepala SD Negeri Kaligangsa Wetan 01,</p>
          <div class="surat-ttd-space">
            ${withTtd && sekolah.ttdKepalaSekolah ? `
              <img src="${sekolah.ttdKepalaSekolah}" class="img-ttd">
            ` : ''}
            ${withStempel && sekolah.stempelSekolah ? `
              <img src="${sekolah.stempelSekolah}" class="surat-stempel-img">
            ` : ''}
          </div>
          <p class="nama-pejabat">${sekolah.kepalaSekolah}</p>
          <p>NIP. ${sekolah.nipKepalaSekolah}</p>
        </div>
      </div>
    `;
  },

  cetakLangsung() {
    const previewContent = document.getElementById("live-surat-paper")?.innerHTML;
    if (!previewContent) return;

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${this.selectedTemplate.judul}</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
          @page { size: A4 portrait; margin: 20mm; }
          body { background: #ffffff; padding: 0; font-family: 'Times New Roman', serif; }
          .surat-paper { width: 100% !important; box-shadow: none !important; padding: 0 !important; }
        </style>
      </head>
      <body>
        <div class="surat-paper">
          ${previewContent}
        </div>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  unduhWord() {
    const previewContent = document.getElementById("live-surat-paper")?.innerHTML;
    if (!previewContent) return;

    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + this.selectedTemplate.judul + "</title>" +
      "<style>body{font-family:'Times New Roman',serif; font-size:12pt; line-height:1.4;} table{border-collapse:collapse; width:100%;} td{padding:4px;}</style></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + previewContent + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    const cleanTitle = this.selectedTemplate.judul.replace(/[^a-zA-Z0-9]/g, "_");
    fileDownload.download = `${cleanTitle}_${new Date().toISOString().slice(0, 10)}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  },

  simpanKeArsip() {
    const noSurat = document.getElementById("input-no-surat")?.value;
    const tglSurat = document.getElementById("input-tgl-surat")?.value;
    const perihal = document.getElementById("input-perihal-surat")?.value;
    const sekolah = window.dataStore.getSekolah();

    const dataArsip = {
      nomorSurat: noSurat,
      tanggalSurat: tglSurat,
      tujuanSurat: this.selectedEntity?.nama || "Pihak Terkait",
      perihal: perihal,
      jenisSurat: this.selectedTemplate.judul,
      penanggungJawab: sekolah.kepalaSekolah,
      keterangan: `Diterbitkan melalui Pusat Administrasi Surat untuk ${this.selectedEntity?.nama || 'Umum'}`,
      status: "Terkirim"
    };

    window.dataStore.saveSuratKeluar(dataArsip);
    alert(`Surat berhasil disimpan ke dalam Buku Agenda Surat Keluar dengan nomor: ${noSurat}!`);
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
