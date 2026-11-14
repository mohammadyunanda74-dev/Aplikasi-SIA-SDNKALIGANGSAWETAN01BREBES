/**
 * MODUL ABSENSI MANDIRI GURU (HP & DESKTOP)
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 * Fitur: Live Clock, GPS Geolocation, Absen Masuk & Pulang, Form Izin/Sakit/Cuti + Bukti Foto
 */

window.absensiMandiriModule = {
  currentGps: "Deteksi GPS...",
  timerInterval: null,

  init() {
    this.render();
    this.startLiveClock();
    this.detectGps();
  },

  destroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  },

  startLiveClock() {
    this.updateClock();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  },

  updateClock() {
    const elTime = document.getElementById("mandiri-live-time");
    const elDate = document.getElementById("mandiri-live-date");
    if (elTime) {
      const now = new Date();
      elTime.textContent = now.toLocaleTimeString("id-ID", { hour12: false });
    }
    if (elDate) {
      const now = new Date();
      elDate.textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  },

  detectGps() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.currentGps = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
          const el = document.getElementById("mandiri-gps-text");
          if (el) el.innerHTML = `<i class="bi bi-geo-alt-fill" style="color:#16a34a;"></i> Koordinat GPS: <strong>${this.currentGps}</strong>`;
        },
        (err) => {
          this.currentGps = "SDN Kaligangsa Wetan 01 (Lokasi Default)";
          const el = document.getElementById("mandiri-gps-text");
          if (el) el.innerHTML = `<i class="bi bi-geo-alt"></i> Lokasi Sekolah: <strong>${this.currentGps}</strong>`;
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      this.currentGps = "Lokasi Sekolah";
    }
  },

  render() {
    const container = document.getElementById("modul-konten");
    if (!container) return;

    const user = window.dataStore.getCurrentUser();
    if (!user) {
      container.innerHTML = `<div class="card"><div class="card-body">Silakan login terlebih dahulu.</div></div>`;
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const guruId = user.guruId || user.id;
    const absensiHariIni = window.dataStore.getAbsensiGuru({ tanggal: todayStr, guruId: guruId })[0];
    const riwayatBulanIni = window.dataStore.getAbsensiGuru({ guruId: guruId });
    const sekolah = window.dataStore.getSekolah();

    const sudahMasuk = !!absensiHariIni;
    const sudahPulang = absensiHariIni && !!absensiHariIni.jamPulang;

    container.innerHTML = `
      <!-- HERO CARD JAM & PROFIL GURU -->
      <div class="guru-attendance-hero">
        <div>
          <span class="badge" style="background:rgba(255,255,255,0.2); color:#fff; margin-bottom:8px;">
            PORTAL ABSENSI MANDIRI PEGAWAI
          </span>
          <h2 style="font-size:22px; font-weight:800; margin-bottom:4px;">Halo, ${user.nama}</h2>
          <p style="font-size:13px; color:#e0f2fe;">${user.jabatan || "Guru / Tenaga Kependidikan"} - SDN Kaligangsa Wetan 01</p>
          <div id="mandiri-gps-text" style="font-size:11px; margin-top:8px; color:#cbd5e1;">
            <i class="bi bi-geo-alt"></i> Mendeteksi koordinat lokasi GPS...
          </div>
        </div>

        <div class="live-clock-card">
          <div id="mandiri-live-time" class="live-time-display">00:00:00</div>
          <div id="mandiri-live-date" class="live-date-display">Memuat tanggal...</div>
        </div>
      </div>

      <!-- KARTU STATUS KEHADIRAN HARI INI -->
      <div class="stats-grid" style="margin-bottom:24px;">
        <div class="stat-card">
          <div class="stat-info">
            <p>Status Hari Ini</p>
            <h3>${absensiHariIni ? absensiHariIni.status : "Belum Absen"}</h3>
            <span class="stat-sub">${absensiHariIni ? (absensiHariIni.keterangan || "Terekam di sistem") : "Silakan klik Absen Masuk"}</span>
          </div>
          <div class="stat-icon ${absensiHariIni ? 'icon-green' : 'icon-orange'}">
            <i class="bi ${absensiHariIni ? 'bi-check-circle-fill' : 'bi-clock'}"></i>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Jam Masuk Terekam</p>
            <h3>${absensiHariIni?.jamMasuk || "-- : --"}</h3>
            <span class="stat-sub">Jadwal Masuk: ${sekolah.jamMasuk} WIB</span>
          </div>
          <div class="stat-icon icon-blue"><i class="bi bi-box-arrow-in-right"></i></div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p>Jam Pulang Terekam</p>
            <h3>${absensiHariIni?.jamPulang || "-- : --"}</h3>
            <span class="stat-sub">Jadwal Pulang: ${sekolah.jamPulang} WIB</span>
          </div>
          <div class="stat-icon icon-teal"><i class="bi bi-box-arrow-right"></i></div>
        </div>
      </div>

      <!-- TOMBOL UTAMA ABSENSI (MOBILE FRIENDLY) -->
      <div class="absen-actions-grid">
        <!-- ABSEN MASUK -->
        <div class="absen-card">
          <div>
            <div style="width:48px; height:48px; border-radius:12px; background:#dcfce7; color:#16a34a; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 12px auto;">
              <i class="bi bi-door-open-fill"></i>
            </div>
            <h4 style="font-size:16px; font-weight:700;">Absensi Masuk Sekolah</h4>
            <p style="font-size:12px; color:var(--gray-600); margin-top:4px;">
              Batas waktu jam masuk <strong>${sekolah.jamMasuk} WIB</strong> (Toleransi ${sekolah.toleransiTerlambat} menit)
            </p>
          </div>
          <button class="absen-btn-huge in" ${sudahMasuk ? 'disabled' : ''} onclick="window.absensiMandiriModule.lakukanAbsenMasuk()">
            <i class="bi bi-check-circle-fill"></i>
            ${sudahMasuk ? 'SUDAH ABSEN MASUK' : 'KLIK ABSEN MASUK'}
          </button>
        </div>

        <!-- ABSEN PULANG -->
        <div class="absen-card">
          <div>
            <div style="width:48px; height:48px; border-radius:12px; background:#ffedd5; color:#ea580c; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 12px auto;">
              <i class="bi bi-house-door-fill"></i>
            </div>
            <h4 style="font-size:16px; font-weight:700;">Absensi Pulang Sekolah</h4>
            <p style="font-size:12px; color:var(--gray-600); margin-top:4px;">
              Waktu kepulangan resmi dimulai pukul <strong>${sekolah.jamPulang} WIB</strong>
            </p>
          </div>
          <button class="absen-btn-huge out" ${!sudahMasuk || sudahPulang ? 'disabled' : ''} onclick="window.absensiMandiriModule.lakukanAbsenPulang()">
            <i class="bi bi-box-arrow-right"></i>
            ${sudahPulang ? 'SUDAH ABSEN PULANG' : 'KLIK ABSEN PULANG'}
          </button>
        </div>

        <!-- PENGAJUAN IZIN / SAKIT / DINAS -->
        <div class="absen-card">
          <div>
            <div style="width:48px; height:48px; border-radius:12px; background:#e0f2fe; color:#0284c7; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 12px auto;">
              <i class="bi bi-file-earmark-medical-fill"></i>
            </div>
            <h4 style="font-size:16px; font-weight:700;">Izin, Sakit & Dinas Luar</h4>
            <p style="font-size:12px; color:var(--gray-600); margin-top:4px;">
              Formulir keterangan dan unggah foto surat keterangan dokter / surat tugas dinas
            </p>
          </div>
          <button class="btn btn-outline-primary" style="margin-top:14px; padding:15px; font-weight:700; width:100%; border-radius:10px;" onclick="window.absensiMandiriModule.bukaModalIzin()">
            <i class="bi bi-pencil-square"></i> Ajukan Keterangan
          </button>
        </div>
      </div>

      <!-- RIWAYAT KEHADIRAN GURU BULAN INI -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-clock-history" style="color:var(--primary);"></i> Riwayat Kehadiran Pribadi</h3>
          <span class="badge badge-neutral">${riwayatBulanIni.length} Catatan Presensi</span>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px; text-align:center;">No</th>
                  <th>Tanggal</th>
                  <th style="text-align:center;">Jam Masuk</th>
                  <th style="text-align:center;">Jam Pulang</th>
                  <th style="text-align:center;">Status</th>
                  <th>Lokasi GPS</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                ${riwayatBulanIni.length === 0 ? `
                  <tr><td colspan="7" style="text-align:center; padding:20px; color:var(--gray-400);">Belum ada riwayat kehadiran.</td></tr>
                ` : riwayatBulanIni.map((r, i) => `
                  <tr>
                    <td style="text-align:center;">${i + 1}</td>
                    <td><strong>${r.tanggal}</strong></td>
                    <td style="text-align:center;">${r.jamMasuk || "-"}</td>
                    <td style="text-align:center;">${r.jamPulang || "-"}</td>
                    <td style="text-align:center;">
                      <span class="badge ${
                        r.status === 'Hadir' ? 'badge-success' :
                        r.status === 'Terlambat' ? 'badge-warning' :
                        r.status === 'Dinas Luar' ? 'badge-info' : 'badge-danger'
                      }">${r.status}</span>
                    </td>
                    <td><small>${r.lokasi || "GPS Valid"}</small></td>
                    <td><small>${r.keterangan || "-"}</small></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.startLiveClock();
    this.detectGps();
  },

  lakukanAbsenMasuk() {
    const user = window.dataStore.getCurrentUser();
    const sekolah = window.dataStore.getSekolah();
    const now = new Date();
    const jamMasuk = now.toTimeString().slice(0, 5);
    const todayStr = now.toISOString().slice(0, 10);

    // Hitung apakah terlambat
    const [jamStandar, menitStandar] = (sekolah.jamMasuk || "07:00").split(":").map(Number);
    const toleransi = parseInt(sekolah.toleransiTerlambat || "15");
    const menitBatas = jamStandar * 60 + menitStandar + toleransi;
    const [jamSekarang, menitSekarang] = jamMasuk.split(":").map(Number);
    const menitAbsen = jamSekarang * 60 + menitSekarang;

    const isTerlambat = menitAbsen > menitBatas;
    const status = isTerlambat ? "Terlambat" : "Hadir";
    const keterangan = isTerlambat ? `Terlambat ${menitAbsen - menitBatas} menit` : "Hadir tepat waktu";

    const item = {
      tanggal: todayStr,
      guruId: user.guruId || user.id,
      nama: user.nama,
      nip: user.nip || "-",
      jabatan: user.jabatan || "Pendidik",
      jamMasuk: jamMasuk,
      jamPulang: "",
      status: status,
      lokasi: this.currentGps,
      keterangan: keterangan,
      metode: "Mandiri (HP)"
    };

    window.dataStore.saveAbsensiGuru(item);
    alert(`Berhasil melakukan Absen Masuk pada jam ${jamMasuk}! Status: ${status}.`);
    this.render();
  },

  lakukanAbsenPulang() {
    const user = window.dataStore.getCurrentUser();
    const now = new Date();
    const jamPulang = now.toTimeString().slice(0, 5);
    const todayStr = now.toISOString().slice(0, 10);
    const guruId = user.guruId || user.id;

    const absensiHariIni = window.dataStore.getAbsensiGuru({ tanggal: todayStr, guruId: guruId })[0];
    if (!absensiHariIni) {
      alert("Anda belum melakukan absensi masuk hari ini.");
      return;
    }

    absensiHariIni.jamPulang = jamPulang;
    window.dataStore.saveAbsensiGuru(absensiHariIni);
    alert(`Berhasil melakukan Absen Pulang pada jam ${jamPulang}! Terima kasih atas dedikasi Anda hari ini.`);
    this.render();
  },

  bukaModalIzin() {
    const html = `
      <div class="modal-backdrop show" id="modal-izin-guru">
        <div class="modal-dialog">
          <div class="modal-header">
            <h4><i class="bi bi-file-earmark-medical"></i> Pengajuan Keterangan Ketidakhadiran</h4>
            <button class="btn-close-modal" onclick="window.absensiMandiriModule.tutupModal()">&times;</button>
          </div>
          <form onsubmit="window.absensiMandiriModule.simpanIzin(event)">
            <div class="modal-body">
              <div class="form-group">
                <label>Jenis Keterangan *</label>
                <select name="status" class="form-control" required>
                  <option value="Izin">Izin (Keperluan Keluarga/Mendesak)</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Dinas Luar">Dinas Luar (Pelatihan / Rapat Luar)</option>
                  <option value="Cuti">Cuti Tahunan / Alasan Penting</option>
                </select>
              </div>
              <div class="form-group">
                <label>Alasan / Uraian Keterangan *</label>
                <textarea name="keterangan" class="form-control" placeholder="Tuliskan alasan izin/sakit secara jelas..." required></textarea>
              </div>
              <div class="form-group">
                <label>Unggah Foto Surat Keterangan / Bukti (Opsional)</label>
                <input type="file" id="foto-bukti-input" accept="image/*" class="form-control" onchange="window.absensiMandiriModule.previewFotoBukti(event)">
                <div id="foto-preview-box" style="margin-top:10px; display:none;">
                  <img id="img-preview" src="" style="max-height:140px; border-radius:6px; border:1px solid #ccc;">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="window.absensiMandiriModule.tutupModal()">Batal</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-send"></i> Kirim Pengajuan</button>
            </div>
          </form>
        </div>
      </div>
    `;
    this.injectModal(html);
  },

  previewFotoBukti(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const box = document.getElementById("foto-preview-box");
        const img = document.getElementById("img-preview");
        if (box && img) {
          img.src = event.target.result;
          box.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    }
  },

  simpanIzin(e) {
    e.preventDefault();
    const user = window.dataStore.getCurrentUser();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const item = {
      tanggal: todayStr,
      guruId: user.guruId || user.id,
      nama: user.nama,
      nip: user.nip || "-",
      jabatan: user.jabatan || "Pendidik",
      jamMasuk: "-",
      jamPulang: "-",
      status: data.status,
      lokasi: this.currentGps,
      keterangan: data.keterangan,
      metode: "Pengajuan Mandiri (HP)"
    };

    window.dataStore.saveAbsensiGuru(item);
    alert(`Pengajuan ${data.status} Anda telah berhasil dicatat di sistem.`);
    this.tutupModal();
    this.render();
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
