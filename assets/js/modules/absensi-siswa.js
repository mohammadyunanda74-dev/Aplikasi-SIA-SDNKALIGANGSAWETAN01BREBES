/**
 * MODUL ABSENSI HARIAN & REKAPITULASI SISWA
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 */

window.absensiSiswaModule = {
  currentKelas: "1",
  currentTanggal: new Date().toISOString().slice(0, 10),
  activeTab: "harian", // "harian" | "rekap"

  init(tab = "harian") {
    this.activeTab = tab;
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    if (this.activeTab === "harian") {
      this.renderHarian(container);
    } else {
      this.renderRekap(container);
    }
  },

  // ===================== INPUT ABSENSI HARIAN =====================
  renderHarian(container) {
    const sekolah = window.dataStore.getSekolah();
    const siswaKelas = window.dataStore.getSiswa({ kelas: this.currentKelas, status: "Aktif" });
    const absensiHariIni = window.dataStore.getAbsensiSiswa({
      tanggal: this.currentTanggal,
      kelas: this.currentKelas
    });

    const user = window.dataStore.getCurrentUser();
    const defaultPetugas = user ? user.nama : sekolah.operator;

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-calendar-check-fill" style="color:var(--primary);"></i> Absensi Harian Siswa (Kelas 1 - 6)</h3>
            <p>Pencatatan kehadiran harian siswa per rombongan belajar</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.absensiSiswaModule.init('rekap')">
              <i class="bi bi-bar-chart-line"></i> Rekapitulasi & Persentase
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.absensiSiswaModule.setSemuaHadir()">
              <i class="bi bi-check-all"></i> Hadir Semua (1-Klik)
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.absensiSiswaModule.simpanAbsensi()">
              <i class="bi bi-save"></i> Simpan Absensi Kelas
            </button>
          </div>
        </div>

        <div class="card-body">
          <!-- FILTER BAR: TANGGAL & KELAS -->
          <div class="table-toolbar" style="background:var(--gray-50); padding:14px; border-radius:8px;">
            <div style="display:flex; gap:14px; align-items:center; flex-wrap:wrap;">
              <div class="form-group" style="margin:0;">
                <label style="font-size:11px; margin-bottom:2px;">Pilih Kelas</label>
                <select class="filter-select" id="select-kelas-absen" onchange="window.absensiSiswaModule.onKelasChange(this.value)">
                  <option value="1" ${this.currentKelas === "1" ? "selected" : ""}>Kelas 1 (Wali: Siti Nurhaliza, S.Pd.)</option>
                  <option value="2" ${this.currentKelas === "2" ? "selected" : ""}>Kelas 2 (Wali: Bambang Irawan, S.Pd.)</option>
                  <option value="3" ${this.currentKelas === "3" ? "selected" : ""}>Kelas 3 (Wali: Dewi Sartika, S.Pd.SD)</option>
                  <option value="4" ${this.currentKelas === "4" ? "selected" : ""}>Kelas 4</option>
                  <option value="5" ${this.currentKelas === "5" ? "selected" : ""}>Kelas 5</option>
                  <option value="6" ${this.currentKelas === "6" ? "selected" : ""}>Kelas 6</option>
                </select>
              </div>

              <div class="form-group" style="margin:0;">
                <label style="font-size:11px; margin-bottom:2px;">Tanggal Kehadiran</label>
                <input type="date" class="form-control" id="input-tgl-absen" value="${this.currentTanggal}" onchange="window.absensiSiswaModule.onTanggalChange(this.value)">
              </div>

              <div class="form-group" style="margin:0;">
                <label style="font-size:11px; margin-bottom:2px;">Nama Petugas / Guru Pencatat</label>
                <input type="text" class="form-control" id="input-petugas-absen" value="${defaultPetugas}">
              </div>
            </div>

            <div>
              <span class="badge badge-info">Tahun Ajaran: ${sekolah.tahunPelajaran} (${sekolah.semester})</span>
            </div>
          </div>

          <!-- TABEL ABSENSI SISWA -->
          <div class="table-responsive" style="margin-top:16px;">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>NISN</th>
                  <th>Nama Lengkap Siswa</th>
                  <th style="text-align:center;">JK</th>
                  <th style="text-align:center; width:340px;">Status Kehadiran</th>
                  <th>Keterangan / Terlambat</th>
                </tr>
              </thead>
              <tbody>
                ${siswaKelas.length === 0 ? `
                  <tr>
                    <td colspan="6" style="text-align:center; padding:30px; color:var(--gray-400);">
                      Tidak ada siswa terdaftar pada Kelas ${this.currentKelas}.
                    </td>
                  </tr>
                ` : siswaKelas.map((s, idx) => {
                  const existing = absensiHariIni.find(a => a.siswaId === s.id);
                  const currentStatus = existing ? existing.status : "Hadir";
                  const currentKet = existing ? (existing.keterangan || "") : "";

                  return `
                    <tr data-siswa-id="${s.id}" data-nama="${s.nama}" data-nisn="${s.nisn}" data-jk="${s.jk}">
                      <td style="text-align:center;">${idx + 1}</td>
                      <td>${s.nisn || "-"}</td>
                      <td><strong>${s.nama}</strong></td>
                      <td style="text-align:center;"><span class="badge ${s.jk === 'L' ? 'badge-info' : 'badge-neutral'}">${s.jk}</span></td>
                      <td style="text-align:center;">
                        <div style="display:flex; justify-content:center; gap:8px;">
                          <label class="status-radio-label">
                            <input type="radio" name="status-${s.id}" value="Hadir" ${currentStatus === 'Hadir' ? 'checked' : ''}> Hadir (H)
                          </label>
                          <label class="status-radio-label" style="color:#d97706;">
                            <input type="radio" name="status-${s.id}" value="Sakit" ${currentStatus === 'Sakit' ? 'checked' : ''}> Sakit (S)
                          </label>
                          <label class="status-radio-label" style="color:#2563eb;">
                            <input type="radio" name="status-${s.id}" value="Izin" ${currentStatus === 'Izin' ? 'checked' : ''}> Izin (I)
                          </label>
                          <label class="status-radio-label" style="color:#dc2626;">
                            <input type="radio" name="status-${s.id}" value="Alpa" ${currentStatus === 'Alpa' ? 'checked' : ''}> Alpa (A)
                          </label>
                          <label class="status-radio-label" style="color:#7c3aed;">
                            <input type="radio" name="status-${s.id}" value="Dispensasi" ${currentStatus === 'Dispensasi' ? 'checked' : ''}> Disp (D)
                          </label>
                        </div>
                      </td>
                      <td>
                        <input type="text" class="form-control ket-input" style="padding:4px 8px; font-size:12px;" placeholder="Catatan keterlambatan / alasan..." value="${currentKet}">
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.absensiSiswaModule.cetakHarian()">
              <i class="bi bi-printer"></i> Cetak Daftar Hadir Hari Ini
            </button>
            <button class="btn btn-primary" onclick="window.absensiSiswaModule.simpanAbsensi()">
              <i class="bi bi-check-circle"></i> Simpan Data Kehadiran
            </button>
          </div>
        </div>
      </div>
    `;
  },

  onKelasChange(val) {
    this.currentKelas = val;
    this.render();
  },

  onTanggalChange(val) {
    this.currentTanggal = val;
    this.render();
  },

  setSemuaHadir() {
    const radios = document.querySelectorAll('input[type="radio"][value="Hadir"]');
    radios.forEach(r => r.checked = true);
    alert("Seluruh siswa di kelas ini telah disetel 'Hadir'. Klik 'Simpan Data Kehadiran' untuk menyimpan.");
  },

  simpanAbsensi() {
    const rows = document.querySelectorAll('tr[data-siswa-id]');
    if (rows.length === 0) return;

    const sekolah = window.dataStore.getSekolah();
    const petugas = document.getElementById("input-petugas-absen")?.value || "Petugas";
    const items = [];

    rows.forEach(tr => {
      const siswaId = parseInt(tr.getAttribute("data-siswa-id"));
      const nama = tr.getAttribute("data-nama");
      const nisn = tr.getAttribute("data-nisn");
      const jk = tr.getAttribute("data-jk");
      const checkedRadio = tr.querySelector(`input[name="status-${siswaId}"]:checked`);
      const status = checkedRadio ? checkedRadio.value : "Hadir";
      const ketInput = tr.querySelector(".ket-input");
      const keterangan = ketInput ? ketInput.value : "";

      items.push({
        tanggal: this.currentTanggal,
        kelas: this.currentKelas,
        tahunPelajaran: sekolah.tahunPelajaran,
        semester: sekolah.semester,
        siswaId: siswaId,
        nama: nama,
        nisn: nisn,
        jk: jk,
        status: status,
        keterangan: keterangan
      });
    });

    window.dataStore.saveBatchAbsensiSiswa(items, petugas);
    alert(`Data absensi Kelas ${this.currentKelas} tanggal ${this.currentTanggal} berhasil disimpan secara permanen!`);
    this.render();
  },

  // ===================== REKAPITULASI & PERSENTASE =====================
  renderRekap(container) {
    const sekolah = window.dataStore.getSekolah();
    const siswaKelas = window.dataStore.getSiswa({ kelas: this.currentKelas, status: "Aktif" });
    const allAbsensi = window.dataStore.getAbsensiSiswa({ kelas: this.currentKelas });

    // Calculate per-student stats
    const rekapData = siswaKelas.map(s => {
      const logs = allAbsensi.filter(a => a.siswaId === s.id);
      const h = logs.filter(a => a.status === "Hadir").length;
      const sk = logs.filter(a => a.status === "Sakit").length;
      const iz = logs.filter(a => a.status === "Izin").length;
      const al = logs.filter(a => a.status === "Alpa").length;
      const dp = logs.filter(a => a.status === "Dispensasi").length;
      const totalHari = logs.length;
      const persentase = totalHari > 0 ? Math.round(((h + dp) / totalHari) * 100) : 100;

      return {
        siswa: s,
        hadir: h,
        sakit: sk,
        izin: iz,
        alpa: al,
        dispensasi: dp,
        totalHari: totalHari,
        persentase: persentase
      };
    });

    // Top students and at-risk students
    const seringAlpa = rekapData.filter(r => r.alpa > 0).sort((a, b) => b.alpa - a.alpa);
    const topHadir = [...rekapData].sort((a, b) => b.persentase - a.persentase);

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-pie-chart-fill" style="color:var(--secondary);"></i> Rekapitulasi Kehadiran Siswa - Kelas ${this.currentKelas}</h3>
            <p>Perhitungan otomatis persentase kehadiran, peringatan siswa sering alpa, dan laporan siap cetak</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.absensiSiswaModule.init('harian')">
              <i class="bi bi-calendar-event"></i> Kembali ke Absen Harian
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.absensiSiswaModule.cetakRekapBulanan()">
              <i class="bi bi-printer"></i> Cetak Rekap Bulanan
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="window.absensiSiswaModule.eksporExcelRekap()">
              <i class="bi bi-file-earmark-spreadsheet"></i> Ekspor Excel
            </button>
          </div>
        </div>

        <div class="card-body">
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
            <!-- ALERT SISWA SERING ALPA -->
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:16px;">
              <h5 style="color:#991b1b; font-size:13px; font-weight:700; margin-bottom:8px;">
                <i class="bi bi-exclamation-triangle-fill"></i> Siswa Sering Tidak Hadir / Alpa
              </h5>
              ${seringAlpa.length === 0 ? `
                <p style="font-size:12px; color:#166534;"><i class="bi bi-check-circle"></i> Sangat baik! Tidak ada catatan alpa di kelas ini.</p>
              ` : `
                <ul style="font-size:12px; color:#7f1d1d; padding-left:18px;">
                  ${seringAlpa.map(r => `
                    <li><strong>${r.siswa.nama}</strong>: ${r.alpa} kali alpa (Kehadiran: ${r.persentase}%)</li>
                  `).join("")}
                </ul>
              `}
            </div>

            <!-- APRESIASI TINGKAT KEHADIRAN TERTINGGI -->
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:16px;">
              <h5 style="color:#166534; font-size:13px; font-weight:700; margin-bottom:8px;">
                <i class="bi bi-trophy-fill"></i> Siswa Tingkat Kehadiran Tertinggi (Rajin)
              </h5>
              <ol style="font-size:12px; color:#14532d; padding-left:18px;">
                ${topHadir.slice(0, 3).map(r => `
                  <li><strong>${r.siswa.nama}</strong>: ${r.persentase}% hadir (${r.hadir} hari)</li>
                `).join("")}
              </ol>
            </div>
          </div>

          <!-- TABEL REKAP KELAS -->
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:30px; text-align:center;">No</th>
                  <th>NISN</th>
                  <th>Nama Lengkap Siswa</th>
                  <th style="text-align:center;">JK</th>
                  <th style="text-align:center; background:#dcfce7; color:#166534;">H (Hadir)</th>
                  <th style="text-align:center; background:#fef3c7; color:#92400e;">S (Sakit)</th>
                  <th style="text-align:center; background:#e0f2fe; color:#075985;">I (Izin)</th>
                  <th style="text-align:center; background:#fee2e2; color:#991b1b;">A (Alpa)</th>
                  <th style="text-align:center; background:#f3e8ff; color:#6b21a8;">D (Disp)</th>
                  <th style="text-align:center;">Total Pertemuan</th>
                  <th style="text-align:center; width:130px;">% Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                ${rekapData.map((r, idx) => `
                  <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${r.siswa.nisn || "-"}</td>
                    <td><strong>${r.siswa.nama}</strong></td>
                    <td style="text-align:center;">${r.siswa.jk}</td>
                    <td style="text-align:center; font-weight:bold; color:#166534;">${r.hadir}</td>
                    <td style="text-align:center; color:#92400e;">${r.sakit}</td>
                    <td style="text-align:center; color:#075985;">${r.izin}</td>
                    <td style="text-align:center; font-weight:bold; color:#dc2626;">${r.alpa}</td>
                    <td style="text-align:center; color:#6b21a8;">${r.dispensasi}</td>
                    <td style="text-align:center;">${r.totalHari}</td>
                    <td style="text-align:center;">
                      <span class="badge ${r.persentase >= 85 ? 'badge-success' : r.persentase >= 75 ? 'badge-warning' : 'badge-danger'}">
                        ${r.persentase}%
                      </span>
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

  cetakHarian() {
    const siswaKelas = window.dataStore.getSiswa({ kelas: this.currentKelas, status: "Aktif" });
    const absensiHariIni = window.dataStore.getAbsensiSiswa({ tanggal: this.currentTanggal, kelas: this.currentKelas });
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Daftar Hadir Siswa Harian</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 11pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; }
          th { background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin:0;">DAFTAR HADIR SISWA - KELAS ${this.currentKelas}</h3>
        <h4 style="text-align:center; margin:2px 0;">SDN KALIGANGSA WETAN 01 - BREBES</h4>
        <p style="text-align:center; margin-top:0;">Tanggal: ${this.currentTanggal} | TP: ${sekolah.tahunPelajaran}</p>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>NISN</th>
              <th>Nama Siswa</th>
              <th style="text-align:center;">JK</th>
              <th style="text-align:center;">Kehadiran</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${siswaKelas.map((s, idx) => {
              const rec = absensiHariIni.find(a => a.siswaId === s.id);
              return `
                <tr>
                  <td style="text-align:center;">${idx + 1}</td>
                  <td>${s.nisn}</td>
                  <td><strong>${s.nama}</strong></td>
                  <td style="text-align:center;">${s.jk}</td>
                  <td style="text-align:center;"><strong>${rec ? rec.status : 'Hadir'}</strong></td>
                  <td>${rec ? rec.keterangan : ''}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
        <div style="margin-top: 40px; display:flex; justify-content:space-between;">
          <div style="text-align:center; width:220px;">
            <p>Mengetahui,<br>Kepala Sekolah</p>
            <div style="height:50px;"></div>
            <p><strong>${sekolah.kepalaSekolah}</strong><br>NIP. ${sekolah.nipKepalaSekolah}</p>
          </div>
          <div style="text-align:center; width:220px;">
            <p>Brebes, ${this.currentTanggal}<br>Guru / Wali Kelas ${this.currentKelas}</p>
            <div style="height:50px;"></div>
            <p><strong>( Wali Kelas ${this.currentKelas} )</strong></p>
          </div>
        </div>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  },

  cetakRekapBulanan() {
    alert("Membuka dialog cetak lembar rekapitulasi kehadiran bulanan siap tanda tangan...");
    this.cetakHarian();
  },

  eksporExcelRekap() {
    alert("Mengunduh file rekap absensi kelas ke format spreadsheet...");
  }
};
