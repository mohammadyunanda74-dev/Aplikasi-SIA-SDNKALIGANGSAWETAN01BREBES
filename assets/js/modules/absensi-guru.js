/**
 * MODUL MONITORING & PENGELOLAAN ABSENSI GTK (ADMIN & KEPALA SEKOLAH)
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 */

window.absensiGuruModule = {
  currentTanggal: new Date().toISOString().slice(0, 10),

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const allGtk = window.dataStore.getGtk({ status: "Aktif" });
    const absensiHariIni = window.dataStore.getAbsensiGuru({ tanggal: this.currentTanggal });
    const sekolah = window.dataStore.getSekolah();

    const hadirCount = absensiHariIni.filter(a => a.status === "Hadir").length;
    const terlambatCount = absensiHariIni.filter(a => a.status === "Terlambat").length;
    const izinSakitCount = absensiHariIni.filter(a => a.status === "Sakit" || a.status === "Izin" || a.status === "Cuti").length;
    const belumAbsenCount = allGtk.length - absensiHariIni.length;

    container.innerHTML = `
      <!-- KARTU STATISTIK KEHADIRAN HARI INI -->
      <div class="stats-grid" style="margin-bottom: 20px;">
        <div class="stat-card">
          <div class="stat-info">
            <p>Hadir Tepat Waktu</p>
            <h3>${hadirCount} Guru</h3>
            <span class="stat-sub">Sebelum ${sekolah.jamMasuk} (Toleransi ${sekolah.toleransiTerlambat} mnt)</span>
          </div>
          <div class="stat-icon icon-green"><i class="bi bi-check2-circle"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Terlambat Masuk</p>
            <h3>${terlambatCount} Guru</h3>
            <span class="stat-sub">Melewati jam toleransi</span>
          </div>
          <div class="stat-icon icon-orange"><i class="bi bi-clock-history"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Izin, Sakit & Cuti</p>
            <h3>${izinSakitCount} Guru</h3>
            <span class="stat-sub">Ada keterangan / berkas</span>
          </div>
          <div class="stat-icon icon-blue"><i class="bi bi-envelope-paper"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <p>Belum Absen Masuk</p>
            <h3>${belumAbsenCount > 0 ? belumAbsenCount : 0} Guru</h3>
            <span class="stat-sub">Dari total ${allGtk.length} GTK aktif</span>
          </div>
          <div class="stat-icon icon-red"><i class="bi bi-person-x"></i></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3><i class="bi bi-fingerprint" style="color:var(--primary);"></i> Monitoring Absensi Pendidik & Tenaga Kependidikan</h3>
            <p>Pemantauan waktu masuk, jam pulang, dan lokasi absensi mandiri guru</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.absensiGuruModule.cetakRekap()">
              <i class="bi bi-printer"></i> Cetak Rekapitulasi
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="window.absensiGuruModule.bukaModalKoreksi()">
              <i class="bi bi-pencil-square"></i> Input / Koreksi Kehadiran
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="table-toolbar">
            <div style="display:flex; align-items:center; gap:12px;">
              <label style="font-size:12px; font-weight:600;">Pilih Tanggal:</label>
              <input type="date" class="form-control" style="width:170px;" value="${this.currentTanggal}" onchange="window.absensiGuruModule.onTanggalChange(this.value)">
            </div>
            <div>
              <span class="badge badge-info">Jadwal Sekolah: Masuk ${sekolah.jamMasuk} | Pulang ${sekolah.jamPulang}</span>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>Nama Lengkap Pegawai</th>
                  <th>NIP</th>
                  <th>Jabatan</th>
                  <th style="text-align:center;">Jam Masuk</th>
                  <th style="text-align:center;">Jam Pulang</th>
                  <th style="text-align:center;">Status Kehadiran</th>
                  <th>Lokasi GPS / Metode</th>
                  <th>Keterangan</th>
                  <th style="text-align:center; width:90px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${allGtk.map((g, idx) => {
                  const log = absensiHariIni.find(a => a.guruId === g.id);
                  return `
                    <tr>
                      <td style="text-align:center;">${idx + 1}</td>
                      <td><strong>${g.nama}</strong></td>
                      <td>${g.nip || "-"}</td>
                      <td>${g.jabatan}</td>
                      <td style="text-align:center;">
                        ${log?.jamMasuk ? `<strong style="color:var(--primary);">${log.jamMasuk}</strong>` : '<span style="color:var(--gray-400);">-</span>'}
                      </td>
                      <td style="text-align:center;">
                        ${log?.jamPulang ? `<strong style="color:var(--secondary);">${log.jamPulang}</strong>` : '<span style="color:var(--gray-400);">-</span>'}
                      </td>
                      <td style="text-align:center;">
                        ${log ? `
                          <span class="badge ${
                            log.status === 'Hadir' ? 'badge-success' :
                            log.status === 'Terlambat' ? 'badge-warning' :
                            log.status === 'Dinas Luar' ? 'badge-info' : 'badge-danger'
                          }">${log.status}</span>
                        ` : `
                          <span class="badge badge-danger">Belum Hadir</span>
                        `}
                      </td>
                      <td>
                        <small style="color:var(--gray-600);">
                          ${log?.lokasi ? `<i class="bi bi-geo-alt"></i> ${log.lokasi}` : log?.metode || 'Belum ada data'}
                        </small>
                      </td>
                      <td><small>${log?.keterangan || "-"}</small></td>
                      <td style="text-align:center;">
                        <button class="btn btn-outline-primary btn-sm" title="Koreksi / Set Hadir" onclick="window.absensiGuruModule.koreksiCepat(${g.id})">
                          <i class="bi bi-pencil"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onTanggalChange(val) {
    this.currentTanggal = val;
    this.render();
  },

  koreksiCepat(guruId) {
    const g = window.dataStore.getGtk().find(item => item.id === guruId);
    if (!g) return;

    const absensiHariIni = window.dataStore.getAbsensiGuru({ tanggal: this.currentTanggal, guruId: guruId })[0];
    const jamMasukVal = absensiHariIni ? absensiHariIni.jamMasuk : "06:50";
    const jamPulangVal = absensiHariIni ? absensiHariIni.jamPulang : "13:30";
    const statusVal = absensiHariIni ? absensiHariIni.status : "Hadir";
    const ketVal = absensiHariIni ? (absensiHariIni.keterangan || "") : "Tepat waktu";

    const html = `
      <div class="modal-backdrop show" id="modal-koreksi-absen">
        <div class="modal-dialog">
          <div class="modal-header">
            <h4><i class="bi bi-pencil-square"></i> Koreksi Absensi: ${g.nama}</h4>
            <button class="btn-close-modal" onclick="window.absensiGuruModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.absensiGuruModule.simpanKoreksi(event, ${g.id})">
            <div class="modal-body">
              <div class="form-group">
                <label>Tanggal</label>
                <input type="date" name="tanggal" class="form-control" value="${this.currentTanggal}" required>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label>Jam Masuk</label>
                  <input type="time" name="jamMasuk" class="form-control" value="${jamMasukVal}">
                </div>
                <div class="form-group">
                  <label>Jam Pulang</label>
                  <input type="time" name="jamPulang" class="form-control" value="${jamPulangVal}">
                </div>
              </div>
              <div class="form-group">
                <label>Status Kehadiran</label>
                <select name="status" class="form-control" required>
                  <option value="Hadir" ${statusVal === "Hadir" ? "selected" : ""}>Hadir</option>
                  <option value="Terlambat" ${statusVal === "Terlambat" ? "selected" : ""}>Terlambat</option>
                  <option value="Izin" ${statusVal === "Izin" ? "selected" : ""}>Izin</option>
                  <option value="Sakit" ${statusVal === "Sakit" ? "selected" : ""}>Sakit</option>
                  <option value="Dinas Luar" ${statusVal === "Dinas Luar" ? "selected" : ""}>Dinas Luar</option>
                  <option value="Cuti" ${statusVal === "Cuti" ? "selected" : ""}>Cuti</option>
                  <option value="Tidak Hadir" ${statusVal === "Tidak Hadir" ? "selected" : ""}>Tidak Hadir</option>
                </select>
              </div>
              <div class="form-group">
                <label>Alasan Koreksi / Keterangan</label>
                <input type="text" name="keterangan" class="form-control" value="${ketVal}" placeholder="Catatan perbaikan absensi" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.absensiGuruModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Simpan Koreksi</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  simpanKoreksi(e, guruId) {
    e.preventDefault();
    const g = window.dataStore.getGtk().find(item => item.id === guruId);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const item = {
      tanggal: data.tanggal,
      guruId: guruId,
      nama: g.nama,
      nip: g.nip,
      jabatan: g.jabatan,
      jamMasuk: data.jamMasuk,
      jamPulang: data.jamPulang,
      status: data.status,
      keterangan: `${data.keterangan} (Koreksi Admin)`,
      metode: "Koreksi Administrator"
    };

    window.dataStore.saveAbsensiGuru(item);
    this.tutupModal();
    this.render();
  },

  cetakRekap() {
    const allGtk = window.dataStore.getGtk({ status: "Aktif" });
    const absensiHariIni = window.dataStore.getAbsensiGuru({ tanggal: this.currentTanggal });
    const sekolah = window.dataStore.getSekolah();

    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Daftar Hadir GTK - ${this.currentTanggal}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
          th { background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h3 style="text-align:center; margin:0;">DAFTAR HADIR GURU DAN TENAGA KEPENDIDIKAN</h3>
        <h4 style="text-align:center; margin-top:2px;">SDN KALIGANGSA WETAN 01 - BREBES</h4>
        <p style="text-align:center; margin-top:0;">Tanggal: ${this.currentTanggal}</p>
        <table>
          <thead>
            <tr>
              <th style="width:30px; text-align:center;">No</th>
              <th>Nama Lengkap</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Jam Masuk</th>
              <th>Jam Pulang</th>
              <th>Kehadiran</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${allGtk.map((g, idx) => {
              const log = absensiHariIni.find(a => a.guruId === g.id);
              return `
                <tr>
                  <td style="text-align:center;">${idx + 1}</td>
                  <td><strong>${g.nama}</strong></td>
                  <td>${g.nip}</td>
                  <td>${g.jabatan}</td>
                  <td>${log?.jamMasuk || "-"}</td>
                  <td>${log?.jamPulang || "-"}</td>
                  <td>${log ? log.status : 'Belum Hadir'}</td>
                  <td>${log?.keterangan || "-"}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
        <div style="margin-top: 40px; float: right; text-align:center; width: 220px;">
          <p>Brebes, ${this.currentTanggal}<br>Kepala Sekolah,</p>
          <div style="height: 50px;"></div>
          <p><strong>${sekolah.kepalaSekolah}</strong><br>NIP. ${sekolah.nipKepalaSekolah}</p>
        </div>
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
