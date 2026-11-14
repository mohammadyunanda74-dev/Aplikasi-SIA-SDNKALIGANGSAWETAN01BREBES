/**
 * DATA STORE ENGINE - SIA SEKOLAH SDN KALIGANGSA WETAN 01
 * IndexedDB + LocalStorage Persistence with Full Durability & Activity Logging
 */

const DB_KEY = "SIA_KALIGANGSA_WETAN_01_V2";

class DataStore {
  constructor() {
    this.state = null;
    this.listeners = [];
    this.currentUser = null;
  }

  async init() {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (stored) {
        this.state = JSON.parse(stored);
      } else {
        // Try fetch default-data.json, fallback to embedded default
        try {
          const res = await fetch("database/default-data.json");
          if (res.ok) {
            this.state = await res.json();
          } else {
            this.state = this.getDefaultState();
          }
        } catch (e) {
          this.state = this.getDefaultState();
        }
        this.save();
      }
    } catch (err) {
      console.warn("Storage load error, initializing default state:", err);
      this.state = this.getDefaultState();
      this.save();
    }

    // Load active session if any
    const savedSession = sessionStorage.getItem("SIA_ACTIVE_SESSION");
    if (savedSession) {
      try {
        this.currentUser = JSON.parse(savedSession);
      } catch (e) {
        this.currentUser = null;
      }
    }

    // Apply custom theme immediately
    this.applyTheme();
    return this.state;
  }

  save() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.error("Gagal menyimpan ke LocalStorage:", e);
      alert("Peringatan: Memori penyimpanan browser penuh atau tidak dapat diakses.");
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(cb => {
      try {
        cb(this.state);
      } catch (err) {
        console.error("Listener error:", err);
      }
    });
  }

  applyTheme() {
    const tema = this.getTema();
    const root = document.documentElement;
    if (tema.primaryColor) {
      root.style.setProperty("--primary", tema.primaryColor);
      root.style.setProperty("--primary-rgb", this.hexToRgb(tema.primaryColor));
    }
    if (tema.secondaryColor) {
      root.style.setProperty("--secondary", tema.secondaryColor);
    }
    if (tema.accentColor) {
      root.style.setProperty("--accent", tema.accentColor);
    }
  }

  hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const num = parseInt(hex, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  }

  // ===================== AUDIT LOG =====================
  tambahLog(aksi, modul, detail) {
    const user = this.currentUser ? this.currentUser.username : "publik";
    const nama = this.currentUser ? this.currentUser.nama : "Pengunjung Publik";
    const logItem = {
      id: Date.now(),
      waktu: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "medium" }),
      pengguna: user,
      nama: nama,
      aksi: aksi,
      modul: modul,
      detail: detail
    };
    if (!this.state.logAktivitas) this.state.logAktivitas = [];
    this.state.logAktivitas.unshift(logItem);
    // Keep last 300 logs
    if (this.state.logAktivitas.length > 300) {
      this.state.logAktivitas.pop();
    }
    this.save();
  }

  // ===================== SEKOLAH & TEMA =====================
  getSekolah() {
    return this.state.sekolah || {};
  }

  saveSekolah(data) {
    this.state.sekolah = { ...this.state.sekolah, ...data };
    this.save();
    this.tambahLog("UPDATE", "Pengaturan Sekolah", "Memperbarui identitas dan kop surat sekolah");
  }

  getTema() {
    return this.state.tema || {};
  }

  saveTema(data) {
    this.state.tema = { ...this.state.tema, ...data };
    this.save();
    this.applyTheme();
    this.tambahLog("UPDATE", "Pengaturan Tampilan", "Memperbarui skema warna dan profil visual sekolah");
  }

  // ===================== AUTENTIKASI =====================
  login(username, password) {
    const users = this.state.pengguna || [];
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim() && u.passwordHash === password.trim());
    if (user) {
      if (user.status !== "aktif") {
        return { success: false, message: "Akun Anda saat ini dinonaktifkan oleh administrator." };
      }
      this.currentUser = { ...user };
      sessionStorage.setItem("SIA_ACTIVE_SESSION", JSON.stringify(this.currentUser));
      this.tambahLog("LOGIN", "Autentikasi", `Pengguna ${user.nama} (${user.role}) berhasil masuk ke sistem`);
      return { success: true, user: this.currentUser };
    }
    return { success: false, message: "Username atau kata sandi tidak valid. Silakan coba lagi." };
  }

  logout() {
    if (this.currentUser) {
      this.tambahLog("LOGOUT", "Autentikasi", `Pengguna ${this.currentUser.nama} keluar dari sistem`);
    }
    this.currentUser = null;
    sessionStorage.removeItem("SIA_ACTIVE_SESSION");
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // ===================== DATA SISWA =====================
  getSiswa(filter = {}) {
    let list = this.state.siswa || [];
    if (filter.kelas && filter.kelas !== "all") {
      list = list.filter(s => String(s.kelas) === String(filter.kelas));
    }
    if (filter.jk && filter.jk !== "all") {
      list = list.filter(s => s.jk === filter.jk);
    }
    if (filter.status && filter.status !== "all") {
      list = list.filter(s => s.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(s =>
        (s.nama && s.nama.toLowerCase().includes(q)) ||
        (s.nis && s.nis.toLowerCase().includes(q)) ||
        (s.nisn && s.nisn.toLowerCase().includes(q)) ||
        (s.alamat && s.alamat.toLowerCase().includes(q))
      );
    }
    return list;
  }

  saveSiswa(siswaData) {
    if (!this.state.siswa) this.state.siswa = [];
    if (siswaData.id) {
      // Edit
      const index = this.state.siswa.findIndex(s => s.id === siswaData.id);
      if (index !== -1) {
        this.state.siswa[index] = { ...this.state.siswa[index], ...siswaData };
        this.tambahLog("UPDATE", "Data Siswa", `Memperbarui data siswa: ${siswaData.nama} (${siswaData.nis})`);
      }
    } else {
      // Tambah baru
      siswaData.id = Date.now();
      if (!siswaData.status) siswaData.status = "Aktif";
      this.state.siswa.push(siswaData);
      this.tambahLog("TAMBAH", "Data Siswa", `Menambahkan siswa baru: ${siswaData.nama} (${siswaData.nis})`);
    }
    this.save();
    return siswaData;
  }

  deleteSiswa(id) {
    const s = this.state.siswa.find(item => item.id === id);
    const nama = s ? s.nama : id;
    this.state.siswa = this.state.siswa.filter(item => item.id !== id);
    this.tambahLog("HAPUS", "Data Siswa", `Menghapus data siswa: ${nama}`);
    this.save();
  }

  // ===================== SISWA MASUK =====================
  getSiswaMasuk() {
    return this.state.siswaMasuk || [];
  }

  saveSiswaMasuk(data) {
    if (!this.state.siswaMasuk) this.state.siswaMasuk = [];
    if (data.id) {
      const idx = this.state.siswaMasuk.findIndex(m => m.id === data.id);
      if (idx !== -1) this.state.siswaMasuk[idx] = { ...this.state.siswaMasuk[idx], ...data };
      this.tambahLog("UPDATE", "Siswa Masuk", `Mengubah data siswa masuk: ${data.nama}`);
    } else {
      data.id = Date.now();
      if (!data.statusKonfirmasi) data.statusKonfirmasi = "Menunggu";
      if (!data.noRegistrasi) data.noRegistrasi = `SM-${new Date().getFullYear()}-${String(this.state.siswaMasuk.length + 1).padStart(3, "0")}`;
      this.state.siswaMasuk.unshift(data);
      this.tambahLog("TAMBAH", "Siswa Masuk", `Pendaftaran siswa masuk baru: ${data.nama}`);
    }
    this.save();
    return data;
  }

  deleteSiswaMasuk(id) {
    this.state.siswaMasuk = this.state.siswaMasuk.filter(m => m.id !== id);
    this.tambahLog("HAPUS", "Siswa Masuk", `Menghapus data mutasi masuk ID: ${id}`);
    this.save();
  }

  konfirmasiSiswaMasuk(id) {
    const masuk = this.state.siswaMasuk.find(m => m.id === id);
    if (!masuk) return false;

    masuk.statusKonfirmasi = "Dikonfirmasi";
    // Check if already in active students
    const existing = this.state.siswa.find(s => s.nisn === masuk.nisn);
    if (!existing) {
      const newNis = `2627${String(this.state.siswa.length + 1).padStart(3, "0")}`;
      const newSiswa = {
        id: Date.now(),
        nis: newNis,
        nisn: masuk.nisn || "",
        nama: masuk.nama,
        jk: masuk.jk,
        tempatLahir: masuk.tempatLahir || "Brebes",
        tanggalLahir: masuk.tanggalLahir || "2017-01-01",
        agama: "Islam",
        alamat: masuk.alamat || "",
        namaAyah: masuk.namaOrtu || "",
        namaIbu: "",
        noHpOrtu: "-",
        kelas: masuk.kelasTujuan,
        tahunMasuk: new Date().getFullYear().toString(),
        status: "Aktif"
      };
      this.state.siswa.push(newSiswa);
      masuk.siswaIdAktif = newSiswa.id;
    }
    this.tambahLog("KONFIRMASI", "Siswa Masuk", `Konfirmasi siswa masuk & menambahkan ${masuk.nama} ke siswa aktif kelas ${masuk.kelasTujuan}`);
    this.save();
    return true;
  }

  // ===================== SISWA KELUAR =====================
  getSiswaKeluar() {
    return this.state.siswaKeluar || [];
  }

  saveSiswaKeluar(data) {
    if (!this.state.siswaKeluar) this.state.siswaKeluar = [];
    if (data.id) {
      const idx = this.state.siswaKeluar.findIndex(k => k.id === data.id);
      if (idx !== -1) this.state.siswaKeluar[idx] = { ...this.state.siswaKeluar[idx], ...data };
      this.tambahLog("UPDATE", "Siswa Keluar", `Mengubah mutasi keluar: ${data.nama}`);
    } else {
      data.id = Date.now();
      if (!data.statusKonfirmasi) data.statusKonfirmasi = "Menunggu";
      if (!data.noRegistrasi) data.noRegistrasi = `SK-${new Date().getFullYear()}-${String(this.state.siswaKeluar.length + 1).padStart(3, "0")}`;
      this.state.siswaKeluar.unshift(data);
      this.tambahLog("TAMBAH", "Siswa Keluar", `Mencatat pengajuan mutasi keluar: ${data.nama}`);
    }
    this.save();
    return data;
  }

  deleteSiswaKeluar(id) {
    this.state.siswaKeluar = this.state.siswaKeluar.filter(k => k.id !== id);
    this.tambahLog("HAPUS", "Siswa Keluar", `Menghapus data mutasi keluar ID: ${id}`);
    this.save();
  }

  konfirmasiSiswaKeluar(id) {
    const keluar = this.state.siswaKeluar.find(k => k.id === id);
    if (!keluar) return false;

    keluar.statusKonfirmasi = "Dikonfirmasi";
    // Cari siswa aktif dan ubah statusnya menjadi Keluar / Pindah
    if (keluar.siswaId) {
      const siswa = this.state.siswa.find(s => s.id === keluar.siswaId);
      if (siswa) {
        siswa.status = keluar.alasanKeluar && keluar.alasanKeluar.toLowerCase().includes("lulus") ? "Lulus" : "Pindah";
      }
    } else if (keluar.nisn) {
      const siswa = this.state.siswa.find(s => s.nisn === keluar.nisn);
      if (siswa) {
        siswa.status = "Pindah";
      }
    }
    this.tambahLog("KONFIRMASI", "Siswa Keluar", `Konfirmasi mutasi keluar: ${keluar.nama} telah diubah statusnya menjadi non-aktif`);
    this.save();
    return true;
  }

  // ===================== GURU & TENAGA KEPENDIDIKAN (GTK) =====================
  getGtk(filter = {}) {
    let list = this.state.gtk || [];
    if (filter.status && filter.status !== "all") {
      list = list.filter(g => g.status === filter.status);
    }
    if (filter.jabatan && filter.jabatan !== "all") {
      list = list.filter(g => g.jabatan === filter.jabatan);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(g =>
        (g.nama && g.nama.toLowerCase().includes(q)) ||
        (g.nip && g.nip.toLowerCase().includes(q)) ||
        (g.nuptk && g.nuptk.toLowerCase().includes(q)) ||
        (g.mataPelajaran && g.mataPelajaran.toLowerCase().includes(q))
      );
    }
    return list;
  }

  saveGtk(data) {
    if (!this.state.gtk) this.state.gtk = [];
    if (data.id) {
      const idx = this.state.gtk.findIndex(g => g.id === data.id);
      if (idx !== -1) this.state.gtk[idx] = { ...this.state.gtk[idx], ...data };
      this.tambahLog("UPDATE", "Data GTK", `Memperbarui data GTK: ${data.nama}`);
    } else {
      data.id = Date.now();
      data.noUrut = this.state.gtk.length + 1;
      if (!data.status) data.status = "Aktif";
      this.state.gtk.push(data);
      this.tambahLog("TAMBAH", "Data GTK", `Menambahkan GTK baru: ${data.nama}`);
    }
    this.save();
    return data;
  }

  deleteGtk(id) {
    const g = this.state.gtk.find(item => item.id === id);
    const nama = g ? g.nama : id;
    this.state.gtk = this.state.gtk.filter(item => item.id !== id);
    this.tambahLog("HAPUS", "Data GTK", `Menghapus data GTK: ${nama}`);
    this.save();
  }

  // ===================== SURAT KELUAR & AGENDA =====================
  getSuratKeluar() {
    return this.state.suratKeluar || [];
  }

  saveSuratKeluar(data) {
    if (!this.state.suratKeluar) this.state.suratKeluar = [];
    if (data.id) {
      const idx = this.state.suratKeluar.findIndex(s => s.id === data.id);
      if (idx !== -1) this.state.suratKeluar[idx] = { ...this.state.suratKeluar[idx], ...data };
      this.tambahLog("UPDATE", "Surat Keluar", `Mengubah surat keluar: ${data.nomorSurat}`);
    } else {
      data.id = Date.now();
      if (!data.noAgenda) data.noAgenda = `AGK-${String(this.state.suratKeluar.length + 1).padStart(3, "0")}`;
      this.state.suratKeluar.unshift(data);
      this.tambahLog("BUAT_SURAT", "Surat Keluar", `Menerbitkan surat nomor: ${data.nomorSurat} (${data.jenisSurat})`);
    }
    this.save();
    return data;
  }

  deleteSuratKeluar(id) {
    this.state.suratKeluar = this.state.suratKeluar.filter(s => s.id !== id);
    this.tambahLog("HAPUS", "Surat Keluar", `Menghapus arsip surat keluar ID: ${id}`);
    this.save();
  }

  // ===================== SURAT MASUK & AGENDA =====================
  getSuratMasuk() {
    return this.state.suratMasuk || [];
  }

  saveSuratMasuk(data) {
    if (!this.state.suratMasuk) this.state.suratMasuk = [];
    if (data.id) {
      const idx = this.state.suratMasuk.findIndex(s => s.id === data.id);
      if (idx !== -1) this.state.suratMasuk[idx] = { ...this.state.suratMasuk[idx], ...data };
      this.tambahLog("UPDATE", "Surat Masuk", `Mengubah agenda surat masuk: ${data.nomorSurat}`);
    } else {
      data.id = Date.now();
      if (!data.noAgenda) data.noAgenda = `AGM-${String(this.state.suratMasuk.length + 1).padStart(3, "0")}`;
      this.state.suratMasuk.unshift(data);
      this.tambahLog("TAMBAH", "Surat Masuk", `Mencatat surat masuk dari: ${data.pengirim} perihal ${data.perihal}`);
    }
    this.save();
    return data;
  }

  deleteSuratMasuk(id) {
    this.state.suratMasuk = this.state.suratMasuk.filter(s => s.id !== id);
    this.tambahLog("HAPUS", "Surat Masuk", `Menghapus surat masuk ID: ${id}`);
    this.save();
  }

  // ===================== SISTEM PENOMORAN SURAT =====================
  generateNomorSurat(kodeKlasifikasi = "421.2") {
    if (!this.state.penomoranSurat) {
      this.state.penomoranSurat = { counter: 25, tahun: "2026" };
    }
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const romawiBulan = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][currentMonth - 1];

    let counter = (this.state.penomoranSurat.counter || 0) + 1;
    this.state.penomoranSurat.counter = counter;
    this.save();

    const noUrutStr = String(counter).padStart(3, "0");
    return `${kodeKlasifikasi}/${noUrutStr}/SD.01/${romawiBulan}/${currentYear}`;
  }

  // ===================== ABSENSI SISWA =====================
  getAbsensiSiswa(filter = {}) {
    let list = this.state.absensiSiswa || [];
    if (filter.tanggal) {
      list = list.filter(a => a.tanggal === filter.tanggal);
    }
    if (filter.kelas && filter.kelas !== "all") {
      list = list.filter(a => String(a.kelas) === String(filter.kelas));
    }
    if (filter.semester && filter.semester !== "all") {
      list = list.filter(a => a.semester === filter.semester);
    }
    return list;
  }

  saveBatchAbsensiSiswa(items, petugas) {
    if (!this.state.absensiSiswa) this.state.absensiSiswa = [];
    items.forEach(newItem => {
      // Periksa apakah sudah ada rekaman absensi siswa ini di tanggal yang sama
      const idx = this.state.absensiSiswa.findIndex(
        a => a.tanggal === newItem.tanggal && a.siswaId === newItem.siswaId
      );
      if (idx !== -1) {
        this.state.absensiSiswa[idx] = {
          ...this.state.absensiSiswa[idx],
          status: newItem.status,
          keterangan: newItem.keterangan || "",
          petugas: petugas || this.state.absensiSiswa[idx].petugas
        };
      } else {
        newItem.id = Date.now() + Math.floor(Math.random() * 1000);
        newItem.petugas = petugas;
        this.state.absensiSiswa.push(newItem);
      }
    });
    this.tambahLog("ABSENSI", "Absensi Siswa", `Memperbarui absensi kelas ${items[0]?.kelas || ""} tanggal ${items[0]?.tanggal || ""}`);
    this.save();
  }

  // ===================== ABSENSI GURU =====================
  getAbsensiGuru(filter = {}) {
    let list = this.state.absensiGuru || [];
    if (filter.tanggal) {
      list = list.filter(a => a.tanggal === filter.tanggal);
    }
    if (filter.guruId) {
      list = list.filter(a => String(a.guruId) === String(filter.guruId));
    }
    if (filter.bulan) {
      // YYYY-MM
      list = list.filter(a => a.tanggal && a.tanggal.startsWith(filter.bulan));
    }
    return list;
  }

  saveAbsensiGuru(item) {
    if (!this.state.absensiGuru) this.state.absensiGuru = [];
    const idx = this.state.absensiGuru.findIndex(
      a => a.tanggal === item.tanggal && a.guruId === item.guruId
    );
    if (idx !== -1) {
      this.state.absensiGuru[idx] = { ...this.state.absensiGuru[idx], ...item };
    } else {
      item.id = Date.now();
      this.state.absensiGuru.unshift(item);
    }
    this.tambahLog("ABSENSI_GTK", "Absensi Guru", `Pencatatan absensi GTK: ${item.nama} status ${item.status}`);
    this.save();
    return item;
  }

  // ===================== PENGGUNA (USERS) =====================
  getPengguna() {
    return this.state.pengguna || [];
  }

  savePengguna(userData) {
    if (!this.state.pengguna) this.state.pengguna = [];
    if (userData.id) {
      const idx = this.state.pengguna.findIndex(u => u.id === userData.id);
      if (idx !== -1) {
        this.state.pengguna[idx] = { ...this.state.pengguna[idx], ...userData };
        this.tambahLog("UPDATE", "Pengguna", `Memperbarui akun pengguna: ${userData.username}`);
      }
    } else {
      userData.id = Date.now();
      if (!userData.status) userData.status = "aktif";
      this.state.pengguna.push(userData);
      this.tambahLog("TAMBAH", "Pengguna", `Menambahkan akun pengguna baru: ${userData.username} (${userData.role})`);
    }
    this.save();
    return userData;
  }

  deletePengguna(id) {
    const u = this.state.pengguna.find(item => item.id === id);
    if (u && u.username === "operator") {
      alert("Akun operator utama tidak boleh dihapus!");
      return false;
    }
    this.state.pengguna = this.state.pengguna.filter(item => item.id !== id);
    this.tambahLog("HAPUS", "Pengguna", `Menghapus akun ID: ${id}`);
    this.save();
    return true;
  }

  // ===================== PENGUMUMAN & BERITA =====================
  getPengumuman() {
    return this.state.pengumuman || [];
  }

  savePengumuman(item) {
    if (!this.state.pengumuman) this.state.pengumuman = [];
    if (item.id) {
      const idx = this.state.pengumuman.findIndex(p => p.id === item.id);
      if (idx !== -1) this.state.pengumuman[idx] = { ...this.state.pengumuman[idx], ...item };
    } else {
      item.id = Date.now();
      this.state.pengumuman.unshift(item);
    }
    this.tambahLog("UPDATE", "Pengumuman", `Memperbarui pengumuman: ${item.judul}`);
    this.save();
    return item;
  }

  deletePengumuman(id) {
    this.state.pengumuman = this.state.pengumuman.filter(p => p.id !== id);
    this.tambahLog("HAPUS", "Pengumuman", `Menghapus pengumuman ID: ${id}`);
    this.save();
  }

  // ===================== BACKUP & RESTORE =====================
  exportDatabaseJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const dlAnchor = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `BACKUP_SIA_SDN_KALIGANGSA_01_${timestamp}.json`);
    dlAnchor.click();
    this.tambahLog("BACKUP", "Sistem", "Operator mengunduh cadangan data lengkap (JSON)");
  }

  importDatabaseJSON(jsonContent) {
    try {
      const parsed = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;
      if (!parsed.sekolah || !parsed.siswa || !parsed.gtk) {
        throw new Error("Format file cadangan tidak valid (kurang struktur data pokok).");
      }
      this.state = parsed;
      this.save();
      this.applyTheme();
      this.tambahLog("RESTORE", "Sistem", "Operator berhasil memulihkan database dari file cadangan");
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  resetDefault() {
    this.state = this.getDefaultState();
    this.save();
    this.applyTheme();
    this.tambahLog("RESET", "Sistem", "Operator mengembalikan pengaturan dan database ke setelan pabrik");
  }

  // Default initial state fallback
  getDefaultState() {
    return {
      sekolah: {
        nama: "SDN KALIGANGSA WETAN 01",
        npsn: "20326514",
        nss: "101032901001",
        akreditasi: "A",
        alamat: "Jl. Raya Kaligangsa Wetan No. 12, Desa Kaligangsa Wetan",
        kecamatan: "Kecamatan Brebes",
        kabupaten: "Kabupaten Brebes",
        provinsi: "Jawa Tengah",
        kodepos: "52217",
        telepon: "(0283) 671234",
        whatsapp: "081234567890",
        email: "sdnkaligangsawetan01@brebeskab.go.id",
        website: "https://sdnkaligangsawetan01.sch.id",
        kepalaSekolah: "H. SUTRISNO, S.Pd., M.Pd.",
        nipKepalaSekolah: "19680512 199203 1 008",
        operator: "AHMAD FAUZI, S.Kom.",
        tahunPelajaran: "2026/2027",
        semester: "Ganjil",
        jamMasuk: "07:00",
        jamPulang: "13:00",
        toleransiTerlambat: "15",
        kopBaris1: "PEMERINTAH KABUPATEN BREBES",
        kopBaris2: "DINAS PENDIDIKAN, PEMUDA DAN OLAHRAGA",
        kopBaris3: "SD NEGERI KALIGANGSA WETAN 01",
        kopBaris4: "KECAMATAN BREBES",
        kopAlamat: "Alamat: Jl. Raya Kaligangsa Wetan No. 12, Brebes 52217 Telp: (0283) 671234 Email: sdnkaligangsawetan01@brebeskab.go.id",
        logoKabupaten: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%230284c7'/><polygon points='50,15 80,75 20,75' fill='%23fbbf24'/><circle cx='50' cy='52' r='14' fill='%23ffffff'/><text x='50' y='56' font-size='10' font-weight='bold' text-anchor='middle' fill='%230369a1'>BREBES</text></svg>",
        logoSekolah: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%2315803d'/><path d='M50 20 L78 36 L78 64 L50 80 L22 64 L22 36 Z' fill='%23ffffff'/><text x='50' y='54' font-size='12' font-weight='bold' text-anchor='middle' fill='%2315803d'>SDN 01</text></svg>",
        stempelSekolah: "",
        ttdKepalaSekolah: ""
      },
      tema: {
        primaryColor: "#1e40af",
        secondaryColor: "#15803d",
        accentColor: "#0284c7",
        sidebarDark: true,
        headerTitle: "SIA SEKOLAH – SDN KALIGANGSA WETAN 01",
        subTitle: "Sistem Informasi Administrasi Sekolah Terpadu",
        landingHeroHeadline: "Membangun Generasi Cerdas, Berakhlak Mulia, dan Berkarakter",
        landingHeroSub: "Selamat Datang di Portal Resmi Sistem Informasi Administrasi SDN Kaligangsa Wetan 01 Kecamatan Brebes",
        visi: "Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Cerdas, Terampil, Berkarakter, dan Berwawasan Lingkungan.",
        misi: [
          "1. Menanamkan keimanan dan ketaqwaan melalui pengamalan ajaran agama.",
          "2. Mengembangkan proses pembelajaran aktif, inovatif, kreatif, efektif, dan menyenangkan.",
          "3. Meningkatkan prestasi akademik dan non-akademik di tingkat kecamatan, kabupaten, hingga nasional.",
          "4. Membentuk karakter luhur, budi pekerti, dan kepedulian terhadap sesama.",
          "5. Menciptakan lingkungan sekolah yang bersih, sehat, hijau, dan asri."
        ]
      },
      pengguna: [
        { id: 1, username: "operator", passwordHash: "operator123", nama: "Ahmad Fauzi, S.Kom.", role: "operator", jabatan: "Operator Sekolah", email: "operator@brebes.id", status: "aktif" },
        { id: 2, username: "kepsek", passwordHash: "kepsek123", nama: "H. Sutrisno, S.Pd., M.Pd.", role: "kepsek", jabatan: "Kepala Sekolah", email: "kepsek@brebes.id", status: "aktif" },
        { id: 3, username: "guru1", passwordHash: "guru123", nama: "Siti Nurhaliza, S.Pd.", role: "guru", guruId: 2, jabatan: "Guru Kelas 1", email: "guru1@brebes.id", status: "aktif" },
        { id: 4, username: "guru2", passwordHash: "guru123", nama: "Bambang Irawan, S.Pd.", role: "guru", guruId: 3, jabatan: "Guru Kelas 2", email: "guru2@brebes.id", status: "aktif" }
      ],
      siswa: [],
      siswaMasuk: [],
      siswaKeluar: [],
      gtk: [],
      suratKeluar: [],
      suratMasuk: [],
      penomoranSurat: { counter: 25, tahun: "2026" },
      absensiSiswa: [],
      absensiGuru: [],
      pengumuman: [],
      logAktivitas: []
    };
  }
}

// Global instance
window.dataStore = new DataStore();
