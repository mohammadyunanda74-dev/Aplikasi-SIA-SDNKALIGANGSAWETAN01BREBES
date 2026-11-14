# PANDUAN LENGKAP INSTALASI, PENGGUNAAN & PEMELIHARAAN SISTEM
# SIA SEKOLAH – SDN KALIGANGSA WETAN 01
**Kecamatan Brebes, Kabupaten Brebes, Jawa Tengah**

---

## DAFTAR ISI
1. [Tentang Aplikasi](#1-tentang-aplikasi)
2. [Struktur Berkas Aplikasi](#2-struktur-berkas-aplikasi)
3. [Cara Menjalankan Aplikasi](#3-cara-menjalankan-aplikasi)
   - [Metode 1: Langsung via Browser (Paling Mudah, Tanpa Install Apapun)](#metode-1-langsung-via-browser-paling-mudah-tanpa-install-apapun)
   - [Metode 2: Server Ringan Node.js](#metode-2-server-ringan-nodejs)
   - [Metode 3: Menggunakan XAMPP / Apache / PHP Hosting](#metode-3-menggunakan-xampp--apache--php-hosting)
4. [Akun Pengguna & Hak Akses (Role-Based Access)](#4-akun-pengguna--hak-akses-role-based-access)
5. [Panduan Operasional Tiap Modul](#5-panduan-operasional-tiap-modul)
   - [A. Portal Publik (Web Sekolah Resmi)](#a-portal-publik-web-sekolah-resmi)
   - [B. Dashboard Utama](#b-dashboard-utama)
   - [C. Pengelolaan Data Siswa](#c-pengelolaan-data-siswa)
   - [D. Data Siswa Masuk (Mutasi Masuk) & Otomatisasi](#d-data-siswa-masuk-mutasi-masuk--otomatisasi)
   - [E. Data Siswa Keluar (Mutasi Keluar / Lulus) & Otomatisasi](#e-data-siswa-keluar-mutasi-keluar--lulus--otomatisasi)
   - [F. Data Guru dan Tenaga Kependidikan (GTK)](#f-data-guru-dan-tenaga-kependidikan-gtk)
   - [G. Pusat Administrasi Surat Sekolah (64+ Template Resmi)](#g-pusat-administrasi-surat-sekolah-64-template-resmi)
   - [H. Buku Agenda Surat Masuk & Keluar + Lembar Disposisi](#h-buku-agenda-surat-masuk--keluar--lembar-disposisi)
   - [I. Absensi Harian Siswa (Kelas 1–6) & Rekapitulasi Persentase](#i-absensi-harian-siswa-kelas-16--rekapitulasi-persentase)
   - [J. Monitoring Absensi Guru (Admin & Kepsek)](#j-monitoring-absensi-guru-admin--kepsek)
   - [K. Absensi Mandiri Guru melalui HP (Mobile Attendance)](#k-absensi-mandiri-guru-melalui-hp-mobile-attendance)
   - [L. Pusat Laporan Sekolah (Cetak A4 & Ekspor Excel)](#l-pusat-laporan-sekolah-cetak-a4--ekspor-excel)
   - [M. Kustomisasi Tampilan Penuh oleh Operator Sekolah](#m-kustomisasi-tampilan-penuh-oleh-operator-sekolah)
6. [Panduan Cadangkan (Backup) & Pemulihan (Restore) Database](#6-panduan-cadangkan-backup--pemulihan-restore-database)
7. [Panduan Database MySQL / MariaDB (Opsional)](#7-panduan-database-mysql--mariadb-opsional)

---

## 1. TENTANG APLIKASI

**SIA SEKOLAH SDN KALIGANGSA WETAN 01** adalah Sistem Informasi Administrasi Sekolah Terpadu yang dibangun dengan desain modern, profesional, sederhana, serta responsif sempurna di perangkat komputer, laptop, tablet, maupun smartphone Android/iOS.

Aplikasi menggunakan skema warna resmi institusi pendidikan: **Biru Dinas**, **Putih Bersih**, dan **Hijau Pendidikan**, serta dilengkapi kemampuan kustomisasi tampilan langsung oleh Operator Sekolah.

---

## 2. STRUKTUR BERKAS APLIKASI

Direktori proyek tersimpan di:
`C:\Users\Lenovo\.gemini\antigravity\scratch\sia-kaligangsa-wetan-01\`

```
sia-kaligangsa-wetan-01/
├── index.html                           <- Halaman Utama (Web Publik & Portal SIA)
├── server.js                            <- Server lokal mandiri (Node.js)
├── PANDUAN_INSTALASI_DAN_PENGGUNAAN.md  <- Buku panduan operasional lengkap
├── api/
│   └── server.php                       <- Backend sinkronisasi PHP (opsional)
├── database/
│   ├── database.sql                     <- Skema SQL & data awal (MySQL/MariaDB)
│   └── default-data.json                <- Data pokok awal JSON
└── assets/
    ├── css/
    │   └── style.css                    <- Desain responsif & format cetak A4
    └── js/
        ├── data-store.js                <- Engine database & audit log
        ├── app.js                       <- Router, dashboard & navigasi utama
        └── modules/
            ├── surat-templates.js       <- Katalog 64+ template surat dinas resmi
            ├── siswa.js                 <- Modul data siswa & impor/ekspor
            ├── mutasi.js                <- Siswa masuk & keluar otomatis
            ├── gtk.js                   <- Modul pendidik & tendik
            ├── surat.js                 <- Engine pembuat surat, Word & PDF
            ├── agenda.js                <- Agenda surat masuk/keluar & disposisi
            ├── absensi-siswa.js         <- Absensi kelas 1-6 & rekapitulasi
            ├── absensi-guru.js          <- Monitoring absensi GTK
            ├── absensi-mandiri.js       <- Absensi mandiri HP guru & GPS
            ├── laporan.js               <- Pusat laporan sekolah
            └── pengaturan.js            <- Customizer tampilan & backup/restore
```

---

## 3. CARA MENJALANKAN APLIKASI

### Metode 1: Langsung via Browser (Paling Mudah, Tanpa Install Apapun)
1. Buka File Explorer di komputer Windows Anda.
2. Masuk ke folder:
   `C:\Users\Lenovo\.gemini\antigravity\scratch\sia-kaligangsa-wetan-01\`
3. **Klik dua kali pada berkas `index.html`** (akan otomatis terbuka di Google Chrome, Microsoft Edge, atau Mozilla Firefox).
4. Aplikasi langsung berjalan 100% lengkap dengan database bawaan! Seluruh data yang diubah atau ditambah akan tersimpan permanen di memori browser (Web Storage) dan tidak akan hilang meski laptop dimatikan.

### Metode 2: Server Ringan Node.js
Jika ingin dijalankan sebagai web server lokal:
1. Buka Terminal / PowerShell di folder aplikasi.
2. Jalankan perintah:
   ```bash
   node server.js
   ```
3. Buka browser dan ketik alamat:
   ```
   http://localhost:8080
   ```
4. Guru dapat mengakses absensi mandiri melalui HP yang terhubung ke WiFi yang sama dengan mengetik `http://[IP-Komputer]:8080`.

### Metode 3: Menggunakan XAMPP / Apache / PHP Hosting
1. Salin seluruh folder `sia-kaligangsa-wetan-01` ke dalam folder `htdocs` di XAMPP (`C:\xampp\htdocs\sia-kaligangsa\`).
2. Aktifkan modul **Apache** dan **MySQL** di XAMPP Control Panel.
3. Buka browser dan akses:
   ```
   http://localhost/sia-kaligangsa/
   ```

---

## 4. AKUN PENGGUNA & HAK AKSES (ROLE-BASED ACCESS)

Sistem membagi hak akses ke dalam 4 tingkatan keamanan sesuai ketentuan:

| Peran (Role) | Username | Password Bawaan | Hak Akses Utama |
|---|---|---|---|
| **Operator Sekolah** (Super Admin) | `operator` | `operator123` | Akses penuh: kelola siswa, mutasi, GTK, surat menyurat, absensi siswa/guru, pengaturan tema/tampilan, kelola akun, backup & restore database. |
| **Kepala Sekolah** | `kepsek` | `kepsek123` | Monitoring eksekutif: melihat seluruh statistik dashboard, laporan sekolah, rekapitulasi absensi siswa & guru, arsip surat resmi, dan log audit. |
| **Guru (Pendidik)** | `guru1`, `guru2`, `guru3` | `guru123` | Absensi mandiri HP (Masuk & Pulang), pengajuan izin/sakit beserta unggah bukti foto, melihat riwayat absensi pribadi, dan absensi harian kelas jika menjadi wali kelas. |
| **Publik (Umum)** | *Tanpa Login* | *Tanpa Login* | Mengakses website profil resmi sekolah, visi misi, pengumuman, kalender pendidikan, dan mengunduh formulir publik. |

*Catatan Keamanan: Operator dapat mengubah kata sandi dan membuat akun baru sewaktu-waktu di menu **Pengaturan & Tampilan -> Manajemen Akun**.*

---

## 5. PANDUAN OPERASIONAL TIAP MODUL

### A. Portal Publik (Web Sekolah Resmi)
- Dapat diakses oleh siapapun tanpa perlu login.
- Menampilkan profil SDN Kaligangsa Wetan 01, sambutan Kepala Sekolah, Visi & Misi, Berita/Pengumuman terkini, dan formulir publik yang bisa diunduh.
- Untuk masuk ke sistem administrasi, klik tombol **"Masuk ke Sistem (SIA)"** di pojok kanan atas navbar.

### B. Dashboard Utama
- Menampilkan 6 kartu ringkasan real-time:
  1. Jumlah seluruh siswa aktif
  2. Jumlah siswa laki-laki & persentasenya
  3. Jumlah siswa perempuan & persentasenya
  4. Jumlah siswa mutasi masuk tahun berjalan
  5. Jumlah siswa mutasi keluar tahun berjalan
  6. Jumlah guru & tenaga kependidikan aktif
- **Grafik Perkembangan Siswa**: Menampilkan visualisasi pertumbuhan siswa 4 tahun ajaran terakhir.
- **Distribusi Kelas**: Diagram batang jumlah siswa per rombel (Kelas 1 s/d 6).
- **Log Aktivitas Terbaru**: Catatan otomatis siapa pengguna yang melakukan aksi di sistem.
- **Pintasan Cepat**: Tombol akses 1-klik ke fitur-fitur penting.

### C. Pengelolaan Data Siswa
- **Pencarian Cepat**: Ketik nama, NIS, atau NISN di kolom cari.
- **Filter**: Saring data berdasarkan Kelas (1–6), Jenis Kelamin (L/P), atau Status (Aktif/Lulus/Pindah/Keluar).
- **Tambah Siswa**: Klik tombol **"Tambah Siswa"**, lengkapi seluruh kolom (NIS, NISN, Nama, TTL, Agama, Kelas, Orang Tua, No HP, Alamat).
- **Cetak Biodata**: Klik ikon printer pada baris siswa untuk mencetak Lembar Buku Induk Siswa resmi standar format foto 3x4 dan tanda tangan Kepala Sekolah.
- **Ekspor Excel**: Klik **"Ekspor Excel"** untuk mengunduh seluruh data dalam format CSV/Excel.
- **Impor Excel**: Klik **"Impor Excel"** untuk memasukkan puluhan data siswa sekaligus dari file CSV.

### D. Data Siswa Masuk (Mutasi Masuk) & Otomatisasi
- Digunakan untuk mencatat siswa pindahan atau siswa baru yang mendaftar ke SDN Kaligangsa Wetan 01.
- Mencatat No Registrasi otomatis, nama, NISN, asal sekolah, kelas tujuan, dan alasan masuk.
- **Tombol Konfirmasi (Ikon Centang Hijau)**: Ketika diklik, sistem akan **otomatis menambahkan siswa tersebut ke database Data Siswa Aktif** dengan kelas tujuan yang dipilih!
- **Cetak Surat Keterangan Masuk**: Menerbitkan surat resmi kesiapan menerima mutasi dengan kop Brebes.

### E. Data Siswa Keluar (Mutasi Keluar / Lulus) & Otomatisasi
- Digunakan untuk mencatat siswa yang pindah sekolah, lulus, atau keluar.
- Dapat memilih langsung dari daftar siswa aktif (data nama, NIS, NISN, dan kelas otomatis terisi).
- **Tombol Konfirmasi**: Ketika dikonfirmasi, sistem secara otomatis **mengubah status siswa di master data menjadi 'Pindah' atau 'Keluar'**, dan riwayat siswa tetap tersimpan aman di database mutasi.
- **Cetak Surat Keterangan Pindah**: Menghasilkan surat dinas resmi pelepasan mutasi siswa ke sekolah tujuan.

### F. Data Guru dan Tenaga Kependidikan (GTK)
- Mencatat profil lengkap: NIP, NUPTK, Nama lengkap & Gelar, Pendidikan, Jabatan, Status Kepegawaian (PNS, PPPK, Honorer), Pangkat/Golongan, Mapel, Tugas Tambahan, No HP, dan Alamat.
- Dilengkapi ringkasan kartu statistik GTK (PNS, PPPK, Honorer).
- Cetak Biodata GTK individual dan Cetak Buku Induk Kepegawaian seluruh GTK.

### G. Pusat Administrasi Surat Sekolah (64+ Template Resmi)
Menu unggulan untuk membuat berbagai macam surat resmi sekolah otomatis.
Semua surat dilengkapi **Kop Resmi Pemerintah Kabupaten Brebes / Dinas Pendidikan Pemuda dan Olahraga / SDN Kaligangsa Wetan 01**.

Katalog Template Surat yang Tersedia:
- **Kategori A (12 Surat Keterangan Siswa)**: Suket Aktif Sekolah, Suket Siswa, Suket Pindah, Suket Kelulusan (SKL), Suket Berkelakuan Baik, Suket Pengganti Ijazah Rusak/Hilang, Suket Penghasilan Ortu, Suket Tidak Mampu (PIP), Suket Prestasi, Suket Masih Terdaftar, Surat Rekomendasi Siswa, Suket Kehilangan Dokumen.
- **Kategori B (12 Surat Guru & Tendik)**: Suket Aktif Mengajar (TPG), SPMT (Melaksanakan Tugas), Suket Pengalaman Kerja, Rekomendasi PPG, Surat Tugas Guru, Undangan Rapat Guru, Surat Izin Kerja, Keterangan Mutasi Guru, Surat Tugas Tambahan, SK Pembagian Tugas Mengajar (SK PBM), Surat Pernyataan Guru, Pemberhentian Sementara.
- **Kategori C (10 Undangan & Pemberitahuan)**: Undangan Rapat Wali Murid, Undangan Rapat Guru, Undangan Komite, Undangan P5/Pentas Seni, Pemberitahuan Libur Semester, Pemberitahuan Pembagian Rapor, Pemberitahuan Study Tour, Pemberitahuan Kegiatan Ramadhan, Surat Edaran Ortu, Pemberitahuan Biaya Sukarela.
- **Kategori D (8 Surat Tugas & SPPD)**: Surat Tugas Kepala Sekolah, Surat Tugas Guru, Surat Tugas Operator (Dapodik), Surat Tugas Diklat, Surat Tugas Workshop, Surat Tugas Dinas, SPPD (Surat Perintah Perjalanan Dinas), Suket Telah Selesai Tugas.
- **Kategori E (12 Surat Kelembagaan)**: Surat Permohonan, Surat Pengantar Berkas, Surat Pernyataan Lembaga, Rekomendasi Lembaga, Surat Kuasa Kedinasan, Surat Balasan, Permohonan Bantuan Sarpras, Permohonan Narasumber, Pemberitahuan ke Dinas, Izin Gedung, Permohonan Rehab Ruang, Permohonan Pengadaan TIK.
- **Kategori F (10 Kesiswaan & Lomba)**: Dispensasi Lomba Siswa, Izin Perkemahan Pramuka, Rekomendasi Study Tour, Persetujuan Orang Tua, Undangan Upacara HUT RI, Undangan PHBI/Maulid, Pemberitahuan Seleksi Lomba, Rekomendasi Duta Lomba Sekolah, Izin Kegiatan Luar, SPTJM Orang Tua.

**Cara Penggunaan Otomatis:**
1. Klik salah satu jenis surat yang diinginkan.
2. Nomor surat terisi otomatis sesuai kode klasifikasi dinas.
3. Pilih siswa atau guru dari dropdown: seluruh identitas (NISN/NIP/TTL/Kelas) langsung terisi secara otomatis tanpa mengetik manual!
4. Formulir dapat diedit langsung jika ada penyesuaian teks.
5. Tersedia opsi menyertakan stempel dan tanda tangan digital kepala sekolah.
6. Klik **"Cetak / Simpan PDF"** untuk cetak A4 langsung, atau klik **"Unduh Word (.doc)"** untuk mengedit lebih lanjut di Microsoft Word!
7. Klik **"Simpan ke Arsip Keluar"** untuk mencatat surat tersebut ke Buku Agenda secara permanen.

### H. Buku Agenda Surat Masuk & Keluar + Lembar Disposisi
- **Agenda Surat Keluar**: Mencatat seluruh surat yang telah diterbitkan lengkap dengan nomor, tanggal, perihal, dan penanggung jawab.
- **Agenda Surat Masuk**: Mencatat surat yang diterima dari dinas atau pihak luar.
- **Cetak Lembar Disposisi**: Tersedia tombol cetak lembar disposisi resmi Kepala Sekolah untuk diteruskan kepada dewan guru atau operator.

### I. Absensi Harian Siswa (Kelas 1–6) & Rekapitulasi Persentase
- Pilih Kelas (1 s/d 6) dan Tanggal. Daftar siswa kelas tersebut otomatis tampil.
- Pilihan status: **Hadir (H), Sakit (S), Izin (I), Alpa (A), Dispensasi (D)**.
- **Tombol "Hadir Semua (1-Klik)"**: Menyetel seluruh siswa menjadi Hadir dalam satu sentuhan cepat.
- Kolom catatan keterlambatan dan pencatatan nama guru pencatat.
- **Tab Rekapitulasi & Persentase**:
  - Menghitung persentase kehadiran setiap siswa secara otomatis:
    $$\text{Persentase} = \frac{\text{Hadir} + \text{Dispensasi}}{\text{Total Pertemuan}} \times 100\%$$
  - **Early Warning Box**: Daftar siswa yang sering alpa / tidak hadir agar wali kelas segera melakukan pembinaan.
  - **Apresiasi Box**: Daftar siswa dengan tingkat kehadiran tertinggi.
  - Cetak Rekap Kehadiran Bulanan siap tanda tangan Wali Kelas dan Kepala Sekolah.

### J. Monitoring Absensi Guru (Admin & Kepsek)
- Menampilkan status kehadiran seluruh guru hari ini.
- Melacak jam masuk, jam pulang, dan koordinat lokasi GPS yang dikirimkan guru saat absen mandiri.
- Operator dapat melakukan **koreksi kehadiran** disertai catatan alasan perubahan jika guru lupa membawa HP atau mengalami kendala teknis.

### K. Absensi Mandiri Guru melalui HP (Mobile Attendance)
- Dirancang khusus dengan tampilan antarmuka kartu besar yang ramah layar smartphone.
- Dilengkapi **Live Clock** detik berjalan dan deteksi koordinat GPS perangkat guru.
- Tombol **"ABSEN MASUK"** (mencatat jam otomatis dan mencegah absen ganda).
- Tombol **"ABSEN PULANG"** (mencatat jam kepulangan resmi).
- Tombol **"Ajukan Keterangan"** (Formulir pengajuan Sakit, Izin, atau Dinas Luar dengan fitur unggah dan pratinjau foto surat dokter/surat tugas).
- Riwayat presensi pribadi guru yang dapat dipantau setiap hari.

### L. Pusat Laporan Sekolah (Cetak A4 & Ekspor Excel)
Menghasilkan laporan resmi terpadu:
1. Laporan Siswa Aktif per Rombel dan Jenis Kelamin.
2. Laporan Siswa Masuk (Mutasi Masuk).
3. Laporan Siswa Keluar / Lulus.
4. Laporan Data Kepegawaian GTK.
5. Laporan Perkembangan Siswa Antar-Tahun.
Seluruh laporan dapat dicetak langsung berformat A4 dengan tanda tangan Kepala Sekolah atau diunduh ke Excel.

### M. Kustomisasi Tampilan Penuh oleh Operator Sekolah
Operator dapat mengubah seluruh elemen aplikasi tanpa perlu coding:
- **Identitas Sekolah**: Mengubah nama sekolah, NPSN, akreditasi, alamat, nomor telepon/WA, email, dan nama Kepala Sekolah.
- **Kop Surat**: Mengedit teks kop surat baris 1 sampai baris 4.
- **Tema & Warna**:
  - Memilih warna primer (biru), sekunder (hijau), dan aksen menggunakan Color Picker visual. Perubahan warna langsung diterapkan ke seluruh aplikasi seketika!
- **Konten Web Publik**: Mengubah judul header, banner utama, visi dan butir-butir misi sekolah yang tampil di halaman depan.
- **Manajemen Akun**: Menambah pengguna baru, mengatur peran (Operator, Kepsek, Guru), dan mereset kata sandi.

---

## 6. PANDUAN CADANGKAN (BACKUP) & PEMULIHAN (RESTORE) DATABASE

Data sekolah sangat berharga. Ikuti langkah mudah berikut untuk mengamankan data secara berkala:

### Cara Melakukan Backup (Mencadangkan Data):
1. Masuk sebagai **Operator**.
2. Buka menu **Pengaturan & Tampilan -> Tab Backup & Restore Database**.
3. Klik tombol biru **"Unduh File Cadangan (.json)"**.
4. Browser akan otomatis mengunduh file bernama:
   `BACKUP_SIA_SDN_KALIGANGSA_01_[TANGGAL].json`
5. Simpan file cadangan ini di flashdisk atau Google Drive sekolah.

### Cara Melakukan Restore (Memulihkan Data):
1. Buka menu **Pengaturan & Tampilan -> Tab Backup & Restore Database**.
2. Pada kotak **Pulihkan Data (Restore)**, klik tombol **Choose File / Telusuri**.
3. Pilih berkas file backup `.json` yang telah Anda simpan sebelumnya.
4. Klik tombol hijau **"Pulihkan Database"**.
5. Sistem akan memverifikasi struktur data dan seketika memulihkan seluruh data siswa, guru, surat, dan absensi persis seperti saat file dicadangkan!

---

## 7. PANDUAN DATABASE MYSQL / MARIADB (OPSIONAL)

Jika sekolah ingin menyinkronkan data ke server basis data MySQL (misalnya di hosting cPanel atau server Dinas Pendidikan):
1. Berkas skema SQL lengkap telah disediakan pada:
   `database/database.sql`
2. Buka **phpMyAdmin** di hosting/server Anda.
3. Buat database baru dengan nama `sia_sdn_kaligangsa01`.
4. Klik menu **Import / Impor**, lalu pilih berkas `database/database.sql`.
5. Klik **Go / Kirim**. Seluruh tabel (siswa, mutasi, gtk, surat, absensi, log) beserta data awal akan otomatis terbuat lengkap.

---

**SIA SEKOLAH – SDN KALIGANGSA WETAN 01**
*Kecamatan Brebes, Kabupaten Brebes*
Aplikasi Siap Digunakan Secara Penuh untuk Melayani Pendidikan Terbaik Indonesia.
