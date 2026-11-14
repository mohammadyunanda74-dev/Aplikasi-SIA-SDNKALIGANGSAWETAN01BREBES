-- ==========================================================
-- SISTEM INFORMASI ADMINISTRASI SEKOLAH (SIA SEKOLAH)
-- SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
-- Database Schema & Seed Data
-- ==========================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS sia_sdn_kaligangsa01;
CREATE DATABASE sia_sdn_kaligangsa01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sia_sdn_kaligangsa01;

-- 1. TABEL PENGATURAN SEKOLAH & TEMA
CREATE TABLE pengaturan_sekolah (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_sekolah VARCHAR(150) NOT NULL,
    npsn VARCHAR(20) NOT NULL,
    nss VARCHAR(20),
    akreditasi VARCHAR(5),
    alamat TEXT,
    kecamatan VARCHAR(100),
    kabupaten VARCHAR(100),
    provinsi VARCHAR(100),
    kodepos VARCHAR(10),
    telepon VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(150),
    nama_kepsek VARCHAR(150),
    nip_kepsek VARCHAR(50),
    nama_operator VARCHAR(150),
    tahun_pelajaran VARCHAR(20),
    semester VARCHAR(20),
    jam_masuk TIME,
    jam_pulang TIME,
    toleransi_terlambat INT DEFAULT 15,
    kop_baris1 VARCHAR(150),
    kop_baris2 VARCHAR(150),
    kop_baris3 VARCHAR(150),
    kop_baris4 VARCHAR(150),
    kop_alamat TEXT,
    logo_kabupaten LONGTEXT,
    logo_sekolah LONGTEXT,
    stempel_sekolah LONGTEXT,
    ttd_kepsek LONGTEXT,
    primary_color VARCHAR(20) DEFAULT '#1e40af',
    secondary_color VARCHAR(20) DEFAULT '#15803d',
    accent_color VARCHAR(20) DEFAULT '#0284c7',
    landing_headline TEXT,
    landing_subheadline TEXT,
    visi TEXT,
    misi TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. TABEL PENGGUNA (USERS & ROLES)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    role ENUM('operator', 'kepsek', 'guru') NOT NULL,
    guru_id INT NULL,
    jabatan VARCHAR(100),
    email VARCHAR(100),
    foto LONGTEXT,
    status ENUM('aktif', 'nonaktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL DATA SISWA
CREATE TABLE siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nis VARCHAR(20) NOT NULL UNIQUE,
    nisn VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(150) NOT NULL,
    jk ENUM('L', 'P') NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    agama VARCHAR(50) DEFAULT 'Islam',
    alamat TEXT,
    nama_ayah VARCHAR(100),
    nama_ibu VARCHAR(100),
    no_hp_ortu VARCHAR(50),
    kelas ENUM('1', '2', '3', '4', '5', '6') NOT NULL,
    tahun_masuk VARCHAR(10),
    status ENUM('Aktif', 'Lulus', 'Pindah', 'Keluar') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. TABEL SISWA MASUK (MUTASI MASUK)
CREATE TABLE siswa_masuk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_registrasi VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(150) NOT NULL,
    nisn VARCHAR(20),
    jk ENUM('L', 'P') NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    asal_sekolah VARCHAR(150),
    tanggal_masuk DATE,
    kelas_tujuan ENUM('1', '2', '3', '4', '5', '6') NOT NULL,
    alamat TEXT,
    nama_ortu VARCHAR(100),
    alasan_masuk TEXT,
    keterangan TEXT,
    status_konfirmasi ENUM('Menunggu', 'Dikonfirmasi') DEFAULT 'Menunggu',
    siswa_id_aktif INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL SISWA KELUAR (MUTASI KELUAR)
CREATE TABLE siswa_keluar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_registrasi VARCHAR(50) NOT NULL UNIQUE,
    siswa_id INT NULL,
    nama VARCHAR(150) NOT NULL,
    nisn VARCHAR(20),
    nis VARCHAR(20),
    jk ENUM('L', 'P') NOT NULL,
    kelas_terakhir ENUM('1', '2', '3', '4', '5', '6'),
    tanggal_keluar DATE,
    sekolah_tujuan VARCHAR(150),
    alasan_keluar TEXT,
    keterangan TEXT,
    status_konfirmasi ENUM('Menunggu', 'Dikonfirmasi') DEFAULT 'Menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL GURU DAN TENAGA KEPENDIDIKAN (GTK)
CREATE TABLE gtk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_urut INT,
    nip VARCHAR(50) DEFAULT '-',
    nuptk VARCHAR(50) DEFAULT '-',
    nama VARCHAR(150) NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    jk ENUM('L', 'P') NOT NULL,
    pendidikan_terakhir VARCHAR(100),
    jabatan VARCHAR(100),
    status_kepegawaian ENUM('PNS', 'PPPK', 'Honorer', 'Tenaga Administrasi', 'Lainnya') DEFAULT 'Honorer',
    pangkat_golongan VARCHAR(100),
    mata_pelajaran VARCHAR(150),
    tugas_tambahan VARCHAR(150),
    alamat TEXT,
    no_hp VARCHAR(50),
    status ENUM('Aktif', 'Nonaktif') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. TABEL BUKU AGENDA SURAT KELUAR
CREATE TABLE surat_keluar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_agenda VARCHAR(50) NOT NULL,
    nomor_surat VARCHAR(100) NOT NULL UNIQUE,
    tanggal_surat DATE NOT NULL,
    tujuan_surat VARCHAR(200) NOT NULL,
    perihal VARCHAR(255) NOT NULL,
    jenis_surat VARCHAR(150) NOT NULL,
    penanggung_jawab VARCHAR(150),
    keterangan TEXT,
    status VARCHAR(50) DEFAULT 'Terkirim',
    file_arsip VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. TABEL BUKU AGENDA SURAT MASUK
CREATE TABLE surat_masuk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_agenda VARCHAR(50) NOT NULL,
    nomor_surat VARCHAR(100) NOT NULL,
    tanggal_surat DATE NOT NULL,
    tanggal_diterima DATE NOT NULL,
    pengirim VARCHAR(200) NOT NULL,
    perihal VARCHAR(255) NOT NULL,
    disposisi TEXT,
    keterangan TEXT,
    file_lampiran VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. TABEL ABSENSI SISWA
CREATE TABLE absensi_siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tanggal DATE NOT NULL,
    kelas ENUM('1', '2', '3', '4', '5', '6') NOT NULL,
    tahun_pelajaran VARCHAR(20) NOT NULL,
    semester ENUM('Ganjil', 'Genap') NOT NULL,
    siswa_id INT NOT NULL,
    nama VARCHAR(150) NOT NULL,
    nisn VARCHAR(20),
    jk ENUM('L', 'P'),
    status ENUM('Hadir', 'Sakit', 'Izin', 'Alpa', 'Dispensasi') DEFAULT 'Hadir',
    keterangan TEXT,
    petugas VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (tanggal, kelas),
    FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE
);

-- 10. TABEL ABSENSI GURU & GTK
CREATE TABLE absensi_guru (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tanggal DATE NOT NULL,
    guru_id INT NOT NULL,
    nama VARCHAR(150) NOT NULL,
    nip VARCHAR(50),
    jabatan VARCHAR(100),
    jam_masuk TIME,
    jam_pulang TIME,
    status ENUM('Hadir', 'Terlambat', 'Sakit', 'Izin', 'Dinas Luar', 'Cuti', 'Tidak Hadir') DEFAULT 'Hadir',
    lokasi_gps VARCHAR(100),
    keterangan TEXT,
    metode VARCHAR(50) DEFAULT 'Mandiri (HP)',
    foto_bukti LONGTEXT,
    verified_by_admin TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (tanggal, guru_id),
    FOREIGN KEY (guru_id) REFERENCES gtk(id) ON DELETE CASCADE
);

-- 11. TABEL PENGUMUMAN & BERITA SEKOLAH
CREATE TABLE pengumuman (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    kategori VARCHAR(100) DEFAULT 'Umum',
    ringkasan TEXT NOT NULL,
    konten LONGTEXT,
    penulis VARCHAR(150),
    publik TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. TABEL LOG AKTIVITAS (AUDIT TRAIL)
CREATE TABLE log_aktivitas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    waktu DATETIME DEFAULT CURRENT_TIMESTAMP,
    pengguna VARCHAR(50) NOT NULL,
    nama VARCHAR(150),
    aksi VARCHAR(100) NOT NULL,
    modul VARCHAR(100) NOT NULL,
    detail TEXT,
    ip_address VARCHAR(50)
);

-- SEED DATA AWAL PENGATURAN
INSERT INTO pengaturan_sekolah (
    nama_sekolah, npsn, nss, akreditasi, alamat, kecamatan, kabupaten, provinsi,
    kodepos, telepon, whatsapp, email, website, nama_kepsek, nip_kepsek,
    nama_operator, tahun_pelajaran, semester, jam_masuk, jam_pulang, toleransi_terlambat,
    kop_baris1, kop_baris2, kop_baris3, kop_baris4, kop_alamat,
    landing_headline, landing_subheadline, visi, misi
) VALUES (
    'SDN KALIGANGSA WETAN 01', '20326514', '101032901001', 'A',
    'Jl. Raya Kaligangsa Wetan No. 12, Desa Kaligangsa Wetan',
    'Kecamatan Brebes', 'Kabupaten Brebes', 'Jawa Tengah',
    '52217', '(0283) 671234', '081234567890', 'sdnkaligangsawetan01@brebeskab.go.id', 'https://sdnkaligangsawetan01.sch.id',
    'H. SUTRISNO, S.Pd., M.Pd.', '19680512 199203 1 008', 'AHMAD FAUZI, S.Kom.',
    '2026/2027', 'Ganjil', '07:00:00', '13:00:00', 15,
    'PEMERINTAH KABUPATEN BREBES', 'DINAS PENDIDIKAN, PEMUDA DAN OLAHRAGA',
    'SD NEGERI KALIGANGSA WETAN 01', 'KECAMATAN BREBES',
    'Alamat: Jl. Raya Kaligangsa Wetan No. 12, Brebes 52217 Telp: (0283) 671234 Email: sdnkaligangsawetan01@brebeskab.go.id',
    'Membangun Generasi Cerdas, Berakhlak Mulia, dan Berkarakter',
    'Selamat Datang di Portal Resmi Sistem Informasi Administrasi SDN Kaligangsa Wetan 01 Kecamatan Brebes',
    'Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Cerdas, Terampil, Berkarakter, dan Berwawasan Lingkungan.',
    '1. Menanamkan keimanan dan ketaqwaan melalui pengamalan ajaran agama.\n2. Mengembangkan proses pembelajaran aktif, inovatif, kreatif, efektif, dan menyenangkan.\n3. Meningkatkan prestasi akademik dan non-akademik di tingkat kecamatan, kabupaten, hingga nasional.\n4. Membentuk karakter luhur, budi pekerti, dan kepedulian terhadap sesama.\n5. Menciptakan lingkungan sekolah yang bersih, sehat, hijau, dan asri.'
);

-- SEED AKUN USER
INSERT INTO users (username, password_hash, nama, role, guru_id, jabatan, email) VALUES
('operator', 'operator123', 'Ahmad Fauzi, S.Kom.', 'operator', 7, 'Operator Sekolah', 'operator.sdnkaligangsawetan01@gmail.com'),
('kepsek', 'kepsek123', 'H. Sutrisno, S.Pd., M.Pd.', 'kepsek', 1, 'Kepala Sekolah', 'sutrisno.kepsek@gmail.com'),
('guru1', 'guru123', 'Siti Nurhaliza, S.Pd.', 'guru', 2, 'Guru Kelas 1', 'siti.nurhaliza@gmail.com'),
('guru2', 'guru123', 'Bambang Irawan, S.Pd.', 'guru', 3, 'Guru Kelas 2', 'bambang.irawan@gmail.com'),
('guru3', 'guru123', 'Dewi Sartika, S.Pd.SD', 'guru', 4, 'Guru Kelas 3', 'dewi.sartika@gmail.com');

SET FOREIGN_KEY_CHECKS = 1;
