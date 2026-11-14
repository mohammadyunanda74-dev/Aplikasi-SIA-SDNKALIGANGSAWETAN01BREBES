/**
 * KATALOG TEMPLATE SURAT RESMI SEKOLAH
 * SDN KALIGANGSA WETAN 01 - KECAMATAN BREBES
 * Total 64+ Template Surat Resmi Berdasarkan Regulasi Dinas Pendidikan
 */

window.SURAT_TEMPLATES = [
  // ==========================================
  // KATEGORI A: SURAT KETERANGAN SISWA (12)
  // ==========================================
  {
    id: "A1",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Aktif Sekolah",
    perihal: "Surat Keterangan Aktif Sekolah",
    targetType: "siswa",
    fields: [
      { name: "keperluan", label: "Keperluan Surat", type: "text", default: "Pengurusan Tunjangan Gaji Orang Tua / Beasiswa" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini, Kepala Sekolah Dasar Negeri Kaligangsa Wetan 01 Kecamatan Brebes, Kabupaten Brebes, menerangkan dengan sebenarnya bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Lengkap</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>Nomor Induk Siswa (NIS)</td><td>:</td><td>${data.nis || "-"}</td></tr>
  <tr><td>NISN</td><td>:</td><td>${data.nisn || "-"}</td></tr>
  <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${data.tempatLahir || "-"}, ${data.tanggalLahir || "-"}</td></tr>
  <tr><td>Jenis Kelamin</td><td>:</td><td>${data.jk === "L" ? "Laki-laki" : "Perempuan"}</td></tr>
  <tr><td>Duduk di Kelas</td><td>:</td><td><strong>Kelas ${data.kelas || "-"}</strong></td></tr>
  <tr><td>Nama Orang Tua / Wali</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
  <tr><td>Alamat Rumah</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Adalah benar-benar siswa aktif terdaftar pada <strong>SD Negeri Kaligangsa Wetan 01</strong> Kecamatan Brebes Kabupaten Brebes pada Tahun Pelajaran <strong>${sekolah.tahunPelajaran} Semester ${sekolah.semester}</strong>.</p>
<p>Surat keterangan ini dibuat dengan sesungguhnya atas permintaan yang bersangkutan untuk keperluan: <strong>${extra.keperluan || "Administrasi"}</strong>.</p>
<p>Demikian surat keterangan ini kami terbitkan untuk dapat dipergunakan sebagaimana mestinya.</p>
`
  },
  {
    id: "A2",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Siswa",
    perihal: "Surat Keterangan Siswa",
    targetType: "siswa",
    fields: [
      { name: "keteranganTambahan", label: "Keterangan Tambahan", type: "text", default: "Menunjukkan perilaku baik dan mematuhi seluruh tata tertib sekolah." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala Sekolah Dasar Negeri Kaligangsa Wetan 01 Kecamatan Brebes, Kabupaten Brebes dengan ini menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>${data.kelas || "-"}</td></tr>
  <tr><td>Nama Orang Tua</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
  <tr><td>Alamat</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Adalah benar siswa yang sedang menempuh pendidikan pada lembaga kami.</p>
<p>${extra.keteranganTambahan || ""}</p>
<p>Demikian surat keterangan ini diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya.</p>
`
  },
  {
    id: "A3",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Pindah Sekolah",
    perihal: "Keterangan Pindah Sekolah",
    targetType: "siswa",
    fields: [
      { name: "sekolahTujuan", label: "Sekolah Tujuan", type: "text", default: "SD Negeri ..." },
      { name: "alasanPindah", label: "Alasan Pindah", type: "text", default: "Mengikuti kepindahan domisili orang tua" },
      { name: "kelasTujuan", label: "Tingkat Kelas", type: "text", default: "Kelas berjalan" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes Kabupaten Brebes, menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${data.tempatLahir || "-"}, ${data.tanggalLahir || "-"}</td></tr>
  <tr><td>Jenis Kelamin</td><td>:</td><td>${data.jk === "L" ? "Laki-laki" : "Perempuan"}</td></tr>
  <tr><td>Tingkat / Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Nama Orang Tua / Wali</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
  <tr><td>Pekerjaan Orang Tua</td><td>:</td><td>Wiraswasta / Karyawan</td></tr>
  <tr><td>Alamat Siswa</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Telah mengajukan permohonan pindah sekolah ke: <strong>${extra.sekolahTujuan || "Sekolah Tujuan"}</strong> dengan alasan: <strong>${extra.alasanPindah || "Mengikuti orang tua"}</strong>.</p>
<p>Bersama surat ini kami sertakan Buku Laporan Penilaian Hasil Belajar (Rapor) siswa yang bersangkutan. Sejak surat ini dikeluarkan, siswa tersebut telah resmi dinyatakan keluar dari SDN Kaligangsa Wetan 01.</p>
<p>Demikian surat keterangan pindah ini dibuat untuk dapat diterima di sekolah yang dituju.</p>
`
  },
  {
    id: "A4",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Telah Lulus",
    perihal: "Surat Keterangan Telah Lulus (SKL)",
    targetType: "siswa",
    fields: [
      { name: "tahunLulus", label: "Tahun Kelulusan", type: "text", default: "2025/2026" },
      { name: "nomorPesertaUjian", label: "Nomor Peserta Ujian / Asesmen", type: "text", default: "01-02-001" },
      { name: "rataRataNilai", label: "Rata-Rata Nilai Akhir", type: "text", default: "86.50" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes Kabupaten Brebes, berdasarkan kriteria kelulusan peserta didik Tahun Pelajaran ${extra.tahunLulus || "2025/2026"}, dengan ini menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${data.tempatLahir || "-"}, ${data.tanggalLahir || "-"}</td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Nomor Peserta Ujian</td><td>:</td><td>${extra.nomorPesertaUjian || "-"}</td></tr>
  <tr><td>Nama Orang Tua</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
</table>
<div style="text-align: center; margin: 15px 0; font-size: 16px;">
  <strong>DINYATAKAN: LULUS</strong>
</div>
<p>Dengan rata-rata nilai akhir sekolah: <strong>${extra.rataRataNilai || "-"}</strong>. Surat Keterangan Lulus ini bersifat sementara dan berlaku sampai diterbitkannya Ijazah asli.</p>
`
  },
  {
    id: "A5",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Berkelakuan Baik",
    perihal: "Surat Keterangan Berkelakuan Baik",
    targetType: "siswa",
    fields: [
      { name: "keperluan", label: "Tujuan Penggunaan", type: "text", default: "Melanjutkan pendidikan ke jenjang SMP / MTs" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>${data.kelas || "-"}</td></tr>
  <tr><td>Alamat</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Sepanjang masa pendidikannya di sekolah kami sampai saat surat ini diterbitkan, anak tersebut di atas senantiasa:</p>
<ol>
  <li>Berkelakuan baik, sopan, dan disiplin.</li>
  <li>Tidak pernah terlibat penyalahgunaan narkoba atau miras.</li>
  <li>Tidak pernah melanggar tata tertib dan norma kesusilaan sekolah.</li>
</ol>
<p>Surat keterangan ini diberikan untuk keperluan: <strong>${extra.keperluan || "Pendaftaran Sekolah"}</strong>.</p>
`
  },
  {
    id: "A6",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Pengganti Ijazah sesuai ketentuan",
    perihal: "Surat Keterangan Pengganti Ijazah",
    targetType: "siswa",
    fields: [
      { name: "noIjazahAsli", label: "Nomor Seri Ijazah Asli", type: "text", default: "DN-03 D/06 0012345" },
      { name: "tahunLulus", label: "Tahun Lulus", type: "text", default: "2023" },
      { name: "laporanPolisi", label: "No Surat Laporan Kehilangan Polisi", type: "text", default: "SKTLK/123/X/2026/SPKT/POLSEK BREBES" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Berdasarkan Peraturan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 29 Tahun 2014, Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${data.tempatLahir || "-"}, ${data.tanggalLahir || "-"}</td></tr>
  <tr><td>Nama Orang Tua</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
  <tr><td>Nomor Induk Siswa</td><td>:</td><td>${data.nis || "-"}</td></tr>
  <tr><td>NISN</td><td>:</td><td>${data.nisn || "-"}</td></tr>
  <tr><td>Tahun Kelulusan</td><td>:</td><td>${extra.tahunLulus || "-"}</td></tr>
  <tr><td>Nomor Seri Ijazah Asli</td><td>:</td><td>${extra.noIjazahAsli || "-"}</td></tr>
</table>
<p>Adalah benar yang bersangkutan telah lulus dari SD Negeri Kaligangsa Wetan 01 dan Ijazah asli yang bersangkutan telah <strong>hilang/rusak</strong> sesuai Laporan Polisi Nomor: <em>${extra.laporanPolisi || "-"}</em>.</p>
<p>Surat Keterangan ini mempunyai kekuatan hukum yang sama sebagai pengganti Ijazah asli.</p>
`
  },
  {
    id: "A7",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Penghasilan Orang Tua",
    perihal: "Keterangan Penghasilan Orang Tua Siswa",
    targetType: "siswa",
    fields: [
      { name: "pekerjaanOrtu", label: "Pekerjaan Orang Tua", type: "text", default: "Buruh Tani / Pedagang Kecil" },
      { name: "penghasilan", label: "Estimasi Penghasilan Rata-rata per Bulan", type: "text", default: "Rp 1.200.000,-" },
      { name: "tanggungan", label: "Jumlah Tanggungan Anak", type: "text", default: "3 Orang" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes menerangkan bahwa orang tua dari siswa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Nama Orang Tua (Ayah/Ibu)</td><td>:</td><td><strong>${data.namaAyah || data.namaIbu || "-"}</strong></td></tr>
  <tr><td>Pekerjaan Orang Tua</td><td>:</td><td>${extra.pekerjaanOrtu || "-"}</td></tr>
  <tr><td>Alamat</td><td>:</td><td>${data.alamat || "-"}</td></tr>
  <tr><td>Rata-rata Penghasilan</td><td>:</td><td><strong>${extra.penghasilan || "-"}</strong> / bulan</td></tr>
  <tr><td>Jumlah Tanggungan</td><td>:</td><td>${extra.tanggungan || "-"}</td></tr>
</table>
<p>Surat keterangan ini dibuat berdasarkan data pokok pendidikan dan pengakuan orang tua untuk melengkapi berkas administrasi bantuan pendidikan / PIP.</p>
`
  },
  {
    id: "A8",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Tidak Mampu",
    perihal: "Surat Keterangan Siswa Kurang Mampu",
    targetType: "siswa",
    fields: [
      { name: "keteranganKeluarga", label: "Keterangan Kondisi Ekonomi", type: "text", default: "Termasuk dalam keluarga prasejahtera dan berpenghasilan tidak tetap." },
      { name: "keperluan", label: "Tujuan Surat", type: "text", default: "Pengusulan Program Indonesia Pintar (PIP) / BSM" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Nama Orang Tua</td><td>:</td><td>${data.namaAyah || data.namaIbu || "-"}</td></tr>
  <tr><td>Alamat</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Bahwa benar siswa tersebut berasal dari keluarga ekonomi kurang mampu / prasejahtera: <em>${extra.keteranganKeluarga || ""}</em>.</p>
<p>Surat keterangan ini diberikan sebagai pertimbangan pengusulan <strong>${extra.keperluan || "Bantuan Pendidikan"}</strong>.</p>
`
  },
  {
    id: "A9",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Prestasi Siswa",
    perihal: "Surat Keterangan Prestasi Siswa",
    targetType: "siswa",
    fields: [
      { name: "namaLomba", label: "Nama Kejuaraan / Lomba", type: "text", default: "Olimpiade Sains Nasional (OSN) Tingkat Kecamatan" },
      { name: "capaian", label: "Peringkat / Juara", type: "text", default: "Juara I Bidang Matematika SD" },
      { name: "tahunPrestasi", label: "Tahun / Tanggal", type: "text", default: "Tahun 2026" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes dengan bangga menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Prestasi yang Diraih</td><td>:</td><td><strong>${extra.capaian || "-"}</strong></td></tr>
  <tr><td>Dalam Ajang</td><td>:</td><td>${extra.namaLomba || "-"}</td></tr>
  <tr><td>Waktu Pelaksanaan</td><td>:</td><td>${extra.tahunPrestasi || "-"}</td></tr>
</table>
<p>Surat keterangan ini kami berikan sebagai bentuk apresiasi dan penghargaan atas prestasi membanggakan yang telah diraih bagi sekolah.</p>
`
  },
  {
    id: "A10",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Masih Terdaftar sebagai Siswa",
    perihal: "Surat Keterangan Masih Terdaftar",
    targetType: "siswa",
    fields: [
      { name: "keperluan", label: "Keperluan", type: "text", default: "Kelengkapan berkas administrasi kependudukan / perbankan" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Tingkat Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Alamat</td><td>:</td><td>${data.alamat || "-"}</td></tr>
</table>
<p>Hingga saat ini masih sah terdaftar dalam Buku Induk Sekolah dan Dapodik pada SD Negeri Kaligangsa Wetan 01.</p>
`
  },
  {
    id: "A11",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Rekomendasi Siswa",
    perihal: "Surat Rekomendasi Siswa",
    targetType: "siswa",
    fields: [
      { name: "tujuanRekomendasi", label: "Tujuan Rekomendasi", type: "text", default: "Mengikuti Seleksi Beasiswa / Lomba Tingkat Kabupaten" },
      { name: "alasanRekomendasi", label: "Alasan Pemberian Rekomendasi", type: "text", default: "Memiliki potensi akademik tinggi dan dedikasi luar biasa." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 dengan ini memberikan rekomendasi kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
</table>
<p>Untuk: <strong>${extra.tujuanRekomendasi || "-"}</strong>.</p>
<p>Keterangan: ${extra.alasanRekomendasi || "-"}</p>
<p>Demikian surat rekomendasi ini dibuat agar dapat dipergunakan sebaik-baiknya.</p>
`
  },
  {
    id: "A12",
    kategori: "Surat Keterangan Siswa",
    kodeKategori: "A",
    kodeKlasifikasi: "421.2",
    judul: "Surat Keterangan Kehilangan Dokumen Sekolah",
    perihal: "Keterangan Kehilangan Dokumen Sekolah",
    targetType: "siswa",
    fields: [
      { name: "namaDokumen", label: "Nama Dokumen yang Hilang", type: "text", default: "Buku Laporan Hasil Belajar (Rapor) Semester 1 s/d 4" },
      { name: "keteranganKehilangan", label: "Keterangan Kejadian", type: "text", default: "Hilang saat terjadi bencana banjir di kediaman orang tua siswa." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
  <tr><td>Dokumen Terkait</td><td>:</td><td><strong>${extra.namaDokumen || "-"}</strong></td></tr>
</table>
<p>Berdasarkan laporan yang kami terima, dokumen tersebut benar telah hilang/rusak dengan keterangan: <em>${extra.keteranganKehilangan || "-"}</em>. Pihak sekolah telah mencocokkan data pada buku leger dan arsip nilai sekolah.</p>
`
  },

  // ==========================================
  // KATEGORI B: SURAT GURU & GTK (12)
  // ==========================================
  {
    id: "B1",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Keterangan Aktif Mengajar",
    perihal: "Surat Keterangan Aktif Mengajar",
    targetType: "guru",
    fields: [
      { name: "jumlahJam", label: "Beban Jam Mengajar / Minggu", type: "text", default: "24 Jam Tatap Muka (JTM)" },
      { name: "keperluan", label: "Keperluan Surat", type: "text", default: "Pemberkasan Tunjangan Profesi Guru (TPG) / Sertifikasi" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Lengkap</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Pangkat / Golongan</td><td>:</td><td>${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
  <tr><td>Tugas Mengajar</td><td>:</td><td>${data.mataPelajaran || "-"}</td></tr>
  <tr><td>Tugas Tambahan</td><td>:</td><td>${data.tugasTambahan || "-"}</td></tr>
</table>
<p>Yang bersangkutan adalah benar Guru Aktif Mengajar di SD Negeri Kaligangsa Wetan 01 pada Tahun Pelajaran <strong>${sekolah.tahunPelajaran}</strong> dengan beban mengajar sebanyak <strong>${extra.jumlahJam || "24 Jam Tatap Muka"}</strong> per minggu.</p>
<p>Surat keterangan ini dibuat untuk keperluan: <strong>${extra.keperluan || "Administrasi"}</strong>.</p>
`
  },
  {
    id: "B2",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Keterangan Melaksanakan Tugas",
    perihal: "Surat Pernyataan Melaksanakan Tugas (SPMT)",
    targetType: "guru",
    fields: [
      { name: "dasarSK", label: "Dasar Surat Keputusan (SK)", type: "text", default: "Keputusan Kepala Dinas Pendidikan Pemuda dan Olahraga Kab. Brebes No. 800/123/2026" },
      { name: "terhitungMulai", label: "Terhitung Mulai Tanggal (TMT)", type: "text", default: "01 Juli 2026" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 Kecamatan Brebes dengan ini menyatakan sesungguhnya bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Pangkat / Gol. Ruang</td><td>:</td><td>${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Berdasarkan: <em>${extra.dasarSK || "-"}</em>, telah nyata-nyata melaksanakan tugasnya sebagai ${data.jabatan || "Guru"} di SDN Kaligangsa Wetan 01 terhitung mulai tanggal <strong>${extra.terhitungMulai || "-"}</strong>.</p>
`
  },
  {
    id: "B3",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Keterangan Pengalaman Kerja",
    perihal: "Surat Keterangan Pengalaman Kerja",
    targetType: "guru",
    fields: [
      { name: "masaKerja", label: "Masa Pengabdian", type: "text", default: "01 Januari 2020 s.d. Sekarang (6 Tahun)" },
      { name: "prestasiKinerja", label: "Catatan Kinerja", type: "text", default: "Menunjukkan dedikasi tinggi, loyalitas, dan integritas profesional." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menerangkan bahwa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Jabatan Terakhir</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
  <tr><td>Masa Pengabdian</td><td>:</td><td>${extra.masaKerja || "-"}</td></tr>
</table>
<p>Selama menjalankan tugas di sekolah kami, yang bersangkutan memiliki catatan kinerja yang baik: <em>${extra.prestasiKinerja || "-"}</em>.</p>
`
  },
  {
    id: "B4",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Rekomendasi Guru",
    perihal: "Surat Rekomendasi Guru",
    targetType: "guru",
    fields: [
      { name: "tujuanRekomendasi", label: "Tujuan Rekomendasi", type: "text", default: "Mengikuti Program Pendidikan Profesi Guru (PPG) Dalam Jabatan" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 memberikan rekomendasi kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Pangkat / Golongan</td><td>:</td><td>${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk mengikuti: <strong>${extra.tujuanRekomendasi || "-"}</strong>. Yang bersangkutan dinilai cakap, memiliki komitmen tinggi, dan layak mendapatkan kesempatan pengembangan profesionalisme.</p>
`
  },
  {
    id: "B5",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Guru",
    perihal: "Surat Tugas Guru",
    targetType: "guru",
    fields: [
      { name: "tugas", label: "Uraian Penugasan", type: "text", default: "Menghadiri Workshop Kurikulum Merdeka Jenjang Sekolah Dasar" },
      { name: "waktu", label: "Hari, Tanggal & Waktu", type: "text", default: "Kamis, 20 November 2026, Pukul 08.00 WIB s/d selesai" },
      { name: "tempat", label: "Tempat Kegiatan", type: "text", default: "Aula Ki Gede Sebayu Dinas Pendidikan Kab. Brebes" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menugaskan kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk melaksanakan tugas: <strong>${extra.tugas || "-"}</strong></p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari / Tanggal / Waktu</td><td style="width: 15px;">:</td><td>${extra.waktu || "-"}</td></tr>
  <tr><td>Tempat</td><td style="width: 15px;">:</td><td>${extra.tempat || "-"}</td></tr>
</table>
<p>Setelah selesai melaksanakan tugas, diharapkan segera melaporkan hasilnya kepada Kepala Sekolah.</p>
`
  },
  {
    id: "B6",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "005",
    judul: "Surat Undangan Rapat Guru",
    perihal: "Undangan Rapat Dewan Guru & Tenaga Kependidikan",
    targetType: "umum",
    fields: [
      { name: "agendaRapat", label: "Agenda Rapat", type: "text", default: "Evaluasi Pembelajaran Tengah Semester dan Persiapan Penilaian Akhir Semester" },
      { name: "hariTanggal", label: "Hari / Tanggal", type: "text", default: "Senin, 24 November 2026" },
      { name: "waktu", label: "Pukul", type: "text", default: "13.00 WIB (Setelah Jam Belajar Mengajar)" },
      { name: "tempat", label: "Tempat", type: "text", default: "Ruang Guru SDN Kaligangsa Wetan 01" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Bapak/Ibu Dewan Guru & Tenaga Kependidikan SDN Kaligangsa Wetan 01 di Tempat.</p>
<p>Dengan hormat, mengharap kehadiran Bapak/Ibu dalam rapat dinas sekolah yang akan diselenggarakan pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari / Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Waktu</td><td>:</td><td>${extra.waktu || "-"}</td></tr>
  <tr><td>Tempat</td><td>:</td><td>${extra.tempat || "-"}</td></tr>
  <tr><td>Acara</td><td>:</td><td><strong>${extra.agendaRapat || "-"}</strong></td></tr>
</table>
<p>Mengingat pentingnya agenda tersebut, kami mohon hadir tepat pada waktunya.</p>
`
  },
  {
    id: "B7",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Izin Tidak Masuk Kerja",
    perihal: "Surat Izin / Cuti Tidak Masuk Kerja",
    targetType: "guru",
    fields: [
      { name: "alasanIzin", label: "Alasan Izin", type: "text", default: "Menghadiri urusan keluarga yang mendesak / keperluan medis" },
      { name: "lamaHari", label: "Jangka Waktu", type: "text", default: "Selama 2 (dua) hari kerja, tanggal 16 s/d 17 November 2026" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberikan izin kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk tidak masuk kerja terhitung: <strong>${extra.lamaHari || "-"}</strong> karena: <em>${extra.alasanIzin || "-"}</em>. Tugas mengajar selama yang bersangkutan izin dikoordinasikan dengan guru piket.</p>
`
  },
  {
    id: "B8",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Keterangan Mutasi Guru",
    perihal: "Keterangan Persetujuan Mutasi Guru",
    targetType: "guru",
    fields: [
      { name: "sekolahTujuan", label: "Sekolah / Unit Kerja Tujuan", type: "text", default: "SD Negeri Brebes 03" },
      { name: "alasanMutasi", label: "Alasan Permohonan", type: "text", default: "Mendekatkan jarak tempuh dengan domisili tempat tinggal" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menerangkan bahwa pada prinsipnya sekolah <strong>tidak berkeberatan</strong> atas permohonan mutasi kerja yang diajukan oleh:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Pangkat / Golongan</td><td>:</td><td>${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Ke: <strong>${extra.sekolahTujuan || "-"}</strong> dengan alasan: ${extra.alasanMutasi || "-"}.</p>
`
  },
  {
    id: "B9",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Pemberitahuan Tugas Tambahan",
    perihal: "Penetapan Tugas Tambahan Guru",
    targetType: "guru",
    fields: [
      { name: "namaTugasTambahan", label: "Jenis Tugas Tambahan", type: "text", default: "Koordinator Tim Pencegahan dan Penanganan Kekerasan (TPPK)" },
      { name: "tahunAjaran", label: "Masa Berlaku", type: "text", default: "Tahun Pelajaran 2026/2027" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 memberitahukan dan menetapkan penugasan tambahan kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
  <tr><td>Tugas Tambahan</td><td>:</td><td><strong>${extra.namaTugasTambahan || "-"}</strong></td></tr>
  <tr><td>Periode</td><td>:</td><td>${extra.tahunAjaran || "-"}</td></tr>
</table>
<p>Diharapkan dapat menjalankan tugas tambahan ini dengan penuh rasa tanggung jawab demi kemajuan mutu pendidikan di sekolah kita.</p>
`
  },
  {
    id: "B10",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Pembagian Tugas Mengajar",
    perihal: "Petikan Keputusan Pembagian Tugas Mengajar (SK PBM)",
    targetType: "guru",
    fields: [
      { name: "mapelDanKelas", label: "Mata Pelajaran & Kelas", type: "text", default: "Pendidikan Agama Islam Kelas 1, 2, 3, 4, 5, dan 6" },
      { name: "totalJTM", label: "Total Beban Mengajar", type: "text", default: "24 Jam Tatap Muka" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Berdasarkan Keputusan Kepala SD Negeri Kaligangsa Wetan 01 tentang Pembagian Tugas Guru dalam Kegiatan Proses Belajar Mengajar Tahun Pelajaran ${sekolah.tahunPelajaran}:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Guru</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Beban Mengajar</td><td>:</td><td>${extra.mapelDanKelas || "-"}</td></tr>
  <tr><td>Jumlah Jam Mengajar</td><td>:</td><td><strong>${extra.totalJTM || "-"}</strong></td></tr>
</table>
`
  },
  {
    id: "B11",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Pernyataan Guru",
    perihal: "Surat Pernyataan Kesanggupan Melaksanakan Tugas",
    targetType: "guru",
    fields: [
      { name: "isiPernyataan", label: "Poin Pernyataan", type: "text", default: "Sanggup mematuhi kode etik guru, tata tertib jam kerja ASN, dan tidak meninggalkan tugas tanpa izin resmi." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Saya yang bertanda tangan di bawah ini:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / NUPTK</td><td>:</td><td>${data.nip || "-"} / ${data.nuptk || "-"}</td></tr>
  <tr><td>Pangkat / Golongan</td><td>:</td><td>${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>Unit Kerja</td><td>:</td><td>SD Negeri Kaligangsa Wetan 01</td></tr>
</table>
<p>Dengan ini menyatakan sesungguhnya bahwa:</p>
<p><em>"${extra.isiPernyataan || "-"}"</em></p>
<p>Surat pernyataan ini saya buat dengan sadar tanpa ada paksaan dari pihak manapun.</p>
`
  },
  {
    id: "B12",
    kategori: "Surat Keperluan Guru dan Tenaga Kependidikan",
    kodeKategori: "B",
    kodeKlasifikasi: "421.1",
    judul: "Surat Pemberhentian Sementara sesuai kewenangan",
    perihal: "Pemberitahuan Pembebasan Sementara Tugas",
    targetType: "guru",
    fields: [
      { name: "alasan", label: "Alasan Pembebasan Tugas", type: "text", default: "Melanjutkan studi pendidikan formal (Tugas Belajar)" },
      { name: "terhitungMulai", label: "Terhitung Mulai", type: "text", default: "Semester Ganjil 2026/2027" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 memberitahukan pemberhentian sementara dari tugas mengajar kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Alasan</td><td>:</td><td>${extra.alasan || "-"}</td></tr>
  <tr><td>TMT</td><td>:</td><td>${extra.terhitungMulai || "-"}</td></tr>
</table>
`
  },

  // ==========================================
  // KATEGORI C: UNDANGAN & PEMBERITAHUAN (10)
  // ==========================================
  {
    id: "C1",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "005",
    judul: "Undangan Rapat Wali Murid",
    perihal: "Undangan Rapat Pleno Orang Tua / Wali Murid",
    targetType: "umum",
    fields: [
      { name: "sasaranWali", label: "Tujuan Kelas", type: "text", default: "Bapak/Ibu Orang Tua / Wali Siswa Kelas 1 s/d Kelas 6" },
      { name: "hariTanggal", label: "Hari / Tanggal", type: "text", default: "Sabtu, 28 November 2026" },
      { name: "waktu", label: "Waktu", type: "text", default: "09.00 - 11.30 WIB" },
      { name: "tempat", label: "Tempat", type: "text", default: "Halaman / Gedung Serbaguna SDN Kaligangsa Wetan 01" },
      { name: "agenda", label: "Agenda", type: "text", default: "Sosialisasi Program Pembelajaran dan Peningkatan Prestasi Siswa" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. <strong>${extra.sasaranWali || "Bapak/Ibu Orang Tua Siswa"}</strong> di Tempat.</p>
<p>Dengan hormat, dalam rangka menyelaraskan program pendidikan sekolah dengan para wali murid, kami mengharapkan kehadiran Bapak/Ibu pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari / Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Waktu</td><td>:</td><td>${extra.waktu || "-"}</td></tr>
  <tr><td>Tempat</td><td>:</td><td>${extra.tempat || "-"}</td></tr>
  <tr><td>Acara</td><td>:</td><td><strong>${extra.agenda || "-"}</strong></td></tr>
</table>
<p>Kehadiran Bapak/Ibu sangat penting demi kemajuan pendidikan putra-putri kita bersama.</p>
`
  },
  {
    id: "C2",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "005",
    judul: "Undangan Rapat Guru",
    perihal: "Undangan Rapat Koordinasi Rutin Dewan Guru",
    targetType: "umum",
    fields: [
      { name: "hariTanggal", label: "Hari / Tanggal", type: "text", default: "Jumat, 20 November 2026" },
      { name: "waktu", label: "Waktu", type: "text", default: "11.00 WIB s/d selesai" },
      { name: "agenda", label: "Agenda Pembahasan", type: "text", default: "Persiapan Penilaian Sumatif Akhir Semester (SAS)" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Bapak/Ibu Dewan Guru SDN Kaligangsa Wetan 01.</p>
<p>Mengharap kehadiran Bapak/Ibu dewan guru dalam rapat koordinasi bulanan pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari, Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Waktu</td><td>:</td><td>${extra.waktu || "-"}</td></tr>
  <tr><td>Tempat</td><td>:</td><td>Ruang Guru SDN Kaligangsa Wetan 01</td></tr>
  <tr><td>Agenda</td><td>:</td><td>${extra.agenda || "-"}</td></tr>
</table>
`
  },
  {
    id: "C3",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "005",
    judul: "Undangan Komite Sekolah",
    perihal: "Undangan Rapat Koordinasi Komite Sekolah",
    targetType: "umum",
    fields: [
      { name: "hariTanggal", label: "Hari, Tanggal", type: "text", default: "Rabu, 02 Desember 2026" },
      { name: "agenda", label: "Agenda", type: "text", default: "Pembahasan Rencana Kerja dan Anggaran Sekolah (RKAS) Tahun 2027" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Pengurus dan Anggota Komite SDN Kaligangsa Wetan 01 di Tempat.</p>
<p>Dengan hormat kami mengundang Bapak/Ibu Pengurus Komite Sekolah untuk hadir dalam rapat koordinasi yang diselenggarakan pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari, Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Waktu</td><td>:</td><td>09.00 WIB s/d Selesai</td></tr>
  <tr><td>Tempat</td><td>:</td><td>Ruang Kepala Sekolah</td></tr>
  <tr><td>Agenda</td><td>:</td><td><strong>${extra.agenda || "-"}</strong></td></tr>
</table>
`
  },
  {
    id: "C4",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "005",
    judul: "Undangan Kegiatan Sekolah",
    perihal: "Undangan Menghadiri Acara Pentas Seni & Gelar Karya P5",
    targetType: "umum",
    fields: [
      { name: "namaKegiatan", label: "Nama Kegiatan", type: "text", default: "Gelar Karya P5 (Projek Penguatan Profil Pelajar Pancasila)" },
      { name: "hariTanggal", label: "Hari, Tanggal", type: "text", default: "Sabtu, 12 Desember 2026" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Tamu Undangan dan Warga Sekolah di Tempat.</p>
<p>Dengan ini kami mengundang Bapak/Ibu untuk berkenan hadir menyaksikan kegiatan: <strong>${extra.namaKegiatan || "-"}</strong> yang akan dilaksanakan pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari, Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Tempat</td><td>:</td><td>Halaman SD Negeri Kaligangsa Wetan 01</td></tr>
</table>
`
  },
  {
    id: "C5",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.2",
    judul: "Surat Pemberitahuan Libur Sekolah",
    perihal: "Pemberitahuan Libur Akhir Semester & Awal Tahun Pelajaran",
    targetType: "umum",
    fields: [
      { name: "periodeLibur", label: "Rentang Waktu Libur", type: "text", default: "21 Desember 2026 s/d 03 Januari 2027" },
      { name: "masukKembali", label: "Hari Pertama Masuk Sekolah", type: "text", default: "Senin, 04 Januari 2027" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Bapak/Ibu Orang Tua / Wali Murid Kelas 1 - 6 di Tempat.</p>
<p>Berdasarkan Kalender Pendidikan Dinas Pendidikan Pemuda dan Olahraga Kabupaten Brebes, dengan ini kami beritahukan bahwa:</p>
<ol>
  <li>Libur Semester berlangsung mulai tanggal: <strong>${extra.periodeLibur || "-"}</strong>.</li>
  <li>Siswa kembali masuk sekolah aktif pada hari: <strong>${extra.masukKembali || "-"}</strong>.</li>
  <li>Selama masa libur, kami mengimbau orang tua untuk senantiasa mendampingi dan mengawasi kegiatan belajar dan ibadah anak di rumah.</li>
</ol>
`
  },
  {
    id: "C6",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.2",
    judul: "Surat Pemberitahuan Pembagian Rapor",
    perihal: "Pemberitahuan Penerimaan Buku Laporan Hasil Belajar (Rapor)",
    targetType: "umum",
    fields: [
      { name: "hariTanggal", label: "Hari / Tanggal Penyerahan", type: "text", default: "Jumat, 18 Desember 2026" },
      { name: "waktuDanTempat", label: "Waktu & Tempat", type: "text", default: "Pukul 08.00 - 10.30 WIB di ruang kelas masing-masing" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Orang Tua / Wali Murid Kelas 1 s/d 6 SDN Kaligangsa Wetan 01.</p>
<p>Diberitahukan bahwa penyerahan Buku Laporan Hasil Belajar (Rapor) Semester ${sekolah.semester} Tahun Pelajaran ${sekolah.tahunPelajaran} akan dilaksanakan pada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Hari / Tanggal</td><td style="width: 15px;">:</td><td>${extra.hariTanggal || "-"}</td></tr>
  <tr><td>Waktu & Tempat</td><td>:</td><td>${extra.waktuDanTempat || "-"}</td></tr>
</table>
<p>Penerimaan rapor wajib diambil langsung oleh Orang Tua / Wali Murid.</p>
`
  },
  {
    id: "C7",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.3",
    judul: "Surat Pemberitahuan Kegiatan Study Tour",
    perihal: "Pemberitahuan Kegiatan Karya Wisata / Study Tour Edukatif",
    targetType: "umum",
    fields: [
      { name: "tujuanWisata", label: "Tujuan Kegiatan", type: "text", default: "Museum Geologi dan Saung Angklung Udjo Bandung" },
      { name: "sasaranKelas", label: "Sasaran Peserta", type: "text", default: "Siswa Kelas 5 dan 6" },
      { name: "biaya", label: "Biaya Kontribusi (Opsional/Sesuai Kesepakatan)", type: "text", default: "Sesuai musyawarah paguyuban kelas" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Diberitahukan kepada orang tua siswa bahwa sekolah berencana menyelenggarakan kegiatan pembelajaran luar kelas (Study Tour) menuju: <strong>${extra.tujuanWisata || "-"}</strong> bagi <strong>${extra.sasaranKelas || "-"}</strong>.</p>
<p>Kegiatan ini bersifat sukarela dan bertujuan meningkatkan wawasan keilmuan dan kebudayaan para peserta didik.</p>
`
  },
  {
    id: "C8",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.2",
    judul: "Surat Pemberitahuan Kegiatan Sekolah",
    perihal: "Pemberitahuan Pelaksanaan Kegiatan Pesantren Kilat / Ramadhan",
    targetType: "umum",
    fields: [
      { name: "namaKegiatan", label: "Nama Kegiatan", type: "text", default: "Kegiatan Pesantren Ramadhan 1448 H" },
      { name: "waktuPelaksanaan", label: "Jadwal", type: "text", default: "Senin - Rabu, 15 - 17 Maret 2027, Pukul 07.30 - 11.00 WIB" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Bapak/Ibu Wali Murid di Tempat.</p>
<p>Dengan ini kami beritahukan bahwa sekolah akan melaksanakan: <strong>${extra.namaKegiatan || "-"}</strong> pada jadwal: <strong>${extra.waktuPelaksanaan || "-"}</strong>. Seluruh siswa diharapkan berpakaian muslim rapi dan membawa perlengkapan sholat.</p>
`
  },
  {
    id: "C9",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.2",
    judul: "Surat Edaran kepada Orang Tua",
    perihal: "Surat Edaran Ketertiban dan Pengawasan Siswa",
    targetType: "umum",
    fields: [
      { name: "poinEdaran", label: "Poin Edaran", type: "text", default: "Larangan membawa mainan berbahaya, membatasi penggunaan gawai (HP) berlebihan, dan memastikan anak tiba di sekolah tepat pukul 06.45 WIB." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Seluruh Orang Tua / Wali Siswa SDN Kaligangsa Wetan 01.</p>
<p>Dalam rangka menciptakan suasana pembelajaran yang kondusif, aman, dan tertib, kami menyampaikan edaran penting sebagai berikut:</p>
<p><em>"${extra.poinEdaran || "-"}"</em></p>
<p>Kerjasama dan perhatian Bapak/Ibu sangat menentukan keberhasilan pendidikan putra-putri kita.</p>
`
  },
  {
    id: "C10",
    kategori: "Surat Undangan dan Pemberitahuan",
    kodeKategori: "C",
    kodeKlasifikasi: "421.2",
    judul: "Surat Pemberitahuan Pembayaran Kegiatan Sekolah",
    perihal: "Pemberitahuan Administrasi Kegiatan Sukarela",
    targetType: "umum",
    fields: [
      { name: "namaKegiatan", label: "Uraian Kegiatan", type: "text", default: "Pemeriksaan Kesehatan Gigi dan Mata Kerjasama Puskesmas" },
      { name: "nominal", label: "Besaran Biaya (Bila Ada)", type: "text", default: "Gratis (Ditanggung Program UKS / BOS)" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Orang Tua Siswa.</p>
<p>Memberitahukan perihal: <strong>${extra.namaKegiatan || "-"}</strong>. Beban biaya: <strong>${extra.nominal || "Gratis"}</strong>.</p>
`
  },

  // ==========================================
  // KATEGORI D: SURAT TUGAS & SPPD (8)
  // ==========================================
  {
    id: "D1",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Kepala Sekolah",
    perihal: "Surat Tugas Kepala Sekolah",
    targetType: "guru",
    fields: [
      { name: "kegiatan", label: "Kegiatan yang Dihadiri", type: "text", default: "Rakor Kerja Kepala Sekolah (K3S) Kecamatan Brebes" },
      { name: "waktuTempat", label: "Waktu & Tempat", type: "text", default: "Selasa, 17 November 2026 di SDN Brebes 01" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini menerangkan penugasan dinas:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${sekolah.kepalaSekolah}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${sekolah.nipKepalaSekolah}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>Kepala Sekolah SDN Kaligangsa Wetan 01</td></tr>
</table>
<p>Melaksanakan tugas dalam rangka: <strong>${extra.kegiatan || "-"}</strong> pada <strong>${extra.waktuTempat || "-"}</strong>.</p>
`
  },
  {
    id: "D2",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Guru",
    perihal: "Surat Perintah Tugas Guru",
    targetType: "guru",
    fields: [
      { name: "tugas", label: "Tugas", type: "text", default: "Mendampingi Kontingen Lomba MAPSI Tingkat Kecamatan" },
      { name: "jadwal", label: "Jadwal", type: "text", default: "Kamis, 19 November 2026, Pukul 07.30 WIB" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menugaskan kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk: <strong>${extra.tugas || "-"}</strong> pada ${extra.jadwal || "-"}.</p>
`
  },
  {
    id: "D3",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Operator Sekolah",
    perihal: "Surat Tugas Operator Pendataan Pendidikan (Dapodik)",
    targetType: "guru",
    fields: [
      { name: "tujuanTugas", label: "Keperluan", type: "text", default: "Sinkronisasi Dapodik dan Verifikasi Validasi NISN / Ijazah" },
      { name: "lokasi", label: "Tempat Penugasan", type: "text", default: "Bidang Pembinaan SD Dinas Pendidikan Kab. Brebes" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 menugaskan kepada Operator Sekolah:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${sekolah.operator || "Ahmad Fauzi, S.Kom."}</strong></td></tr>
  <tr><td>Jabatan</td><td>:</td><td>Operator Sekolah / Tenaga Administrasi</td></tr>
</table>
<p>Untuk melaksanakan: <strong>${extra.tujuanTugas || "-"}</strong> bertempat di: <strong>${extra.lokasi || "-"}</strong>.</p>
`
  },
  {
    id: "D4",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Mengikuti Pelatihan",
    perihal: "Surat Tugas Mengikuti Diklat / Pelatihan",
    targetType: "guru",
    fields: [
      { name: "namaPelatihan", label: "Nama Diklat", type: "text", default: "Pelatihan Pemanfaatan Platform Merdeka Mengajar (PMM)" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberikan tugas resmi kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP</td><td>:</td><td>${data.nip || "-"}</td></tr>
  <tr><td>Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk mengikuti: <strong>${extra.namaPelatihan || "-"}</strong>.</p>
`
  },
  {
    id: "D5",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Mengikuti Workshop",
    perihal: "Surat Tugas Workshop Pembelajaran Inovatif",
    targetType: "guru",
    fields: [
      { name: "temaWorkshop", label: "Tema Workshop", type: "text", default: "Penyusunan Modul Ajar Berbasis Pembelajaran Berdiferensiasi" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Menugaskan kepada: <strong>${data.nama || "-"}</strong> untuk menghadiri workshop: <em>${extra.temaWorkshop || "-"}</em>.</p>
`
  },
  {
    id: "D6",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Tugas Mengikuti Kegiatan Dinas",
    perihal: "Surat Tugas Menghadiri Acara Kedinasan",
    targetType: "guru",
    fields: [
      { name: "acaraDinas", label: "Nama Acara", type: "text", default: "Upacara Peringatan Hari Guru Nasional Tingkat Kabupaten" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Menugaskan guru/tenaga kependidikan terkait untuk menghadiri kegiatan dinas: <strong>${extra.acaraDinas || "-"}</strong>.</p>
`
  },
  {
    id: "D7",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Perjalanan Dinas",
    perihal: "Surat Perintah Perjalanan Dinas (SPPD)",
    targetType: "guru",
    fields: [
      { name: "maksudDinas", label: "Maksud Perjalanan", type: "text", default: "Konsultasi Pengelolaan Dana BOS ke Disdikpora Kab. Brebes" },
      { name: "tempatTujuan", label: "Tempat Tujuan", type: "text", default: "Dinas Pendidikan Kab. Brebes" },
      { name: "lamaHari", label: "Lamanya Perjalanan", type: "text", default: "1 (satu) hari" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Surat Perintah Perjalanan Dinas (SPPD) diberikan kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">1. Pejabat yang memerintahkan</td><td style="width: 15px;">:</td><td>Kepala SDN Kaligangsa Wetan 01</td></tr>
  <tr><td>2. Nama Pegawai yang ditugaskan</td><td>:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>3. NIP / Pangkat</td><td>:</td><td>${data.nip || "-"} / ${data.pangkatGolongan || "-"}</td></tr>
  <tr><td>4. Jabatan</td><td>:</td><td>${data.jabatan || "-"}</td></tr>
  <tr><td>5. Maksud Perjalanan Dinas</td><td>:</td><td>${extra.maksudDinas || "-"}</td></tr>
  <tr><td>6. Tempat Berangkat / Tujuan</td><td>:</td><td>Kaligangsa Wetan / ${extra.tempatTujuan || "-"}</td></tr>
  <tr><td>7. Lama Perjalanan Dinas</td><td>:</td><td>${extra.lamaHari || "-"}</td></tr>
</table>
`
  },
  {
    id: "D8",
    kategori: "Surat Tugas dan Perjalanan Dinas",
    kodeKategori: "D",
    kodeKlasifikasi: "094",
    judul: "Surat Keterangan Melaksanakan Tugas",
    perihal: "Keterangan Telah Selesai Melaksanakan Tugas",
    targetType: "guru",
    fields: [
      { name: "hasilTugas", label: "Laporan Singkat", type: "text", default: "Tugas telah terlaksana dengan lancar dan berkas laporan telah diserahkan." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Menerangkan bahwa pegawai yang bersangkutan telah tuntas menjalankan tugas dinas: <em>${extra.hasilTugas || "-"}</em>.</p>
`
  },

  // ==========================================
  // KATEGORI E: SURAT KELEMBAGAAN SEKOLAH (12)
  // ==========================================
  {
    id: "E1",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Permohonan",
    perihal: "Surat Permohonan",
    targetType: "umum",
    fields: [
      { name: "tujuanSurat", label: "Ditujukan Kepada", type: "text", default: "Kepala Dinas Pendidikan Pemuda dan Olahraga Kab. Brebes" },
      { name: "perihalPermohonan", label: "Hal Permohonan", type: "text", default: "Permohonan Penambahan Tenaga Pendidik / Guru Kelas" },
      { name: "isiPermohonan", label: "Uraian Permohonan", type: "text", default: "Mengingat adanya guru yang telah purna tugas, maka bersama ini kami memohon tambahan formasi pendidik." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. <strong>${extra.tujuanSurat || "-"}</strong> di Tempat.</p>
<p>Dengan hormat, sehubungan dengan kebutuhan peningkatan kualitas pelayanan pendidikan di SD Negeri Kaligangsa Wetan 01:</p>
<p>${extra.isiPermohonan || "-"}</p>
<p>Demikian surat permohonan ini kami ajukan, atas perhatian dan perkenan Bapak/Ibu kami sampaikan terima kasih.</p>
`
  },
  {
    id: "E2",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Pengantar",
    perihal: "Surat Pengantar Berkas Dinas",
    targetType: "umum",
    fields: [
      { name: "tujuanDinas", label: "Tujuan Pengiriman", type: "text", default: "Kepala Korwilcambidik Kecamatan Brebes" },
      { name: "daftarBerkas", label: "Daftar Berkas", type: "text", default: "1. Berkas SPJ BOS Triwulan III (1 Berkas)\n2. Laporan Rekapitulasi Siswa Bulan Berjalan (1 Lembar)" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. <strong>${extra.tujuanDinas || "-"}</strong> di Tempat.</p>
<p>Bersama ini kami kirimkan berkas administrasi sebagai berikut:</p>
<table class="table-surat" border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background:#f1f5f9;"><th style="padding:6px;">No</th><th style="padding:6px;">Jenis Surat / Berkas</th><th style="padding:6px;">Banyaknya</th><th style="padding:6px;">Keterangan</th></tr>
  </thead>
  <tbody>
    <tr><td style="padding:6px; text-align:center;">1</td><td style="padding:6px;">${extra.daftarBerkas || "Berkas Sekolah"}</td><td style="padding:6px; text-align:center;">1 Berkas</td><td style="padding:6px;">Disampaikan dengan hormat untuk diperiksa lebih lanjut.</td></tr>
  </tbody>
</table>
`
  },
  {
    id: "E3",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Pernyataan",
    perihal: "Surat Pernyataan Tanggung Jawab Sekolah",
    targetType: "umum",
    fields: [
      { name: "isiPernyataan", label: "Isi Pernyataan Kelembagaan", type: "text", default: "Menyatakan bahwa data kelembagaan, sarpras, dan data peserta didik pada sistem Dapodik telah terisi dengan data yang sebenarnya dan dapat dipertanggungjawabkan." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Yang bertanda tangan di bawah ini Kepala SD Negeri Kaligangsa Wetan 01 menyatakan sesungguhnya bahwa:</p>
<p><em>"${extra.isiPernyataan || "-"}"</em></p>
`
  },
  {
    id: "E4",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Rekomendasi",
    perihal: "Surat Rekomendasi Kelembagaan",
    targetType: "umum",
    fields: [
      { name: "pihakRekomendasi", label: "Pihak yang Direkomendasikan", type: "text", default: "Mahasiswa PPL / Magang Kependidikan Universitas ..." },
      { name: "keterangan", label: "Hal Rekomendasi", type: "text", default: "Telah menyelesaikan praktik pengalaman lapangan dengan predikat memuaskan." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>SD Negeri Kaligangsa Wetan 01 memberikan rekomendasi kepada: <strong>${extra.pihakRekomendasi || "-"}</strong> terkait: <em>${extra.keterangan || "-"}</em>.</p>
`
  },
  {
    id: "E5",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Kuasa",
    perihal: "Surat Kuasa Kedinasan",
    targetType: "guru",
    fields: [
      { name: "tujuanKuasa", label: "Wewenang yang Diberikan", type: "text", default: "Mengurus pencairan dan pengambilan dana bantuan operasional di Bank Jateng Cabang Brebes." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberikan kuasa kedinasan kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Penerima Kuasa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIP / Jabatan</td><td>:</td><td>${data.nip || "-"} / ${data.jabatan || "-"}</td></tr>
</table>
<p>Untuk: <strong>${extra.tujuanKuasa || "-"}</strong>.</p>
`
  },
  {
    id: "E6",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Balasan",
    perihal: "Surat Balasan Kesiapan / Kerjasama",
    targetType: "umum",
    fields: [
      { name: "tujuanSurat", label: "Ditujukan Kepada", type: "text", default: "Pimpinan Lembaga / Instansi Pemohon" },
      { name: "isiBalasan", label: "Isi Tanggapan", type: "text", default: "Menyambut baik dan siap memfasilitasi program sosialisasi kesehatan gigi anak di SDN Kaligangsa Wetan 01." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. <strong>${extra.tujuanSurat || "-"}</strong>.</p>
<p>Menanggapi surat saudara nomor sebelumnya, bersama ini kami sampaikan bahwa: <em>${extra.isiBalasan || "-"}</em>.</p>
`
  },
  {
    id: "E7",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Permohonan Bantuan",
    perihal: "Permohonan Bantuan Fasilitas Sarana Pendidikan",
    targetType: "umum",
    fields: [
      { name: "instansiTujuan", label: "Instansi / CSR Tujuan", type: "text", default: "Dinas Arsip dan Perpustakaan Daerah Kab. Brebes" },
      { name: "bantuanDimohon", label: "Uraian Kebutuhan Bantuan", type: "text", default: "Bantuan koleksi buku bacaan anak dan rak perpustakaan ramah anak." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Mengajukan permohonan dukungan fasilitas pendidikan berupa: <strong>${extra.bantuanDimohon || "-"}</strong> demi peningkatan literasi peserta didik.</p>
`
  },
  {
    id: "E8",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Permohonan Narasumber",
    perihal: "Permohonan Menjadi Narasumber Kegiatan Parenting / Workshop",
    targetType: "umum",
    fields: [
      { name: "namaNarasumber", label: "Nama Narasumber / Lembaga", type: "text", default: "Puskesmas Brebes / Tim Psikolog Anak" },
      { name: "topikMateri", label: "Topik Materi", type: "text", default: "Pola Pengasuhan Positif dan Pencegahan Perundungan (Bullying) di Sekolah Dasar" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memohon kesediaan Bapak/Ibu <strong>${extra.namaNarasumber || "-"}</strong> untuk berkenan hadir sebagai narasumber dalam kegiatan edukasi bertema: <em>"${extra.topikMateri || "-"}"</em>.</p>
`
  },
  {
    id: "E9",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Pemberitahuan kepada Dinas Pendidikan",
    perihal: "Laporan dan Pemberitahuan Resmi Kondisi Sekolah",
    targetType: "umum",
    fields: [
      { name: "isiPemberitahuan", label: "Isi Laporan", type: "text", default: "Melaporkan perkembangan pelaksanaan rehabilitasi ruang kelas bersumber DAK Fisik telah mencapai progres 100%." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepada Yth. Kepala Dinas Pendidikan Pemuda dan Olahraga Kabupaten Brebes.</p>
<p>Dengan hormat melaporkan: ${extra.isiPemberitahuan || "-"}.</p>
`
  },
  {
    id: "E10",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Keterangan Penggunaan Gedung",
    perihal: "Izin Peminjaman / Penggunaan Gedung Sekolah",
    targetType: "umum",
    fields: [
      { name: "peminjam", label: "Pihak Pengguna", type: "text", default: "Panitia Pemilihan Suara (PPS) Desa Kaligangsa Wetan" },
      { name: "keperluan", label: "Keperluan Penggunaan", type: "text", default: "Lokasi Tempat Pemungutan Suara (TPS)" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberikan izin pemanfaatan fasilitas ruang gedung sekolah kepada: <strong>${extra.peminjam || "-"}</strong> untuk keperluan: <strong>${extra.keperluan || "-"}</strong> dengan ketentuan tetap menjaga kebersihan dan aset sekolah.</p>
`
  },
  {
    id: "E11",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Permohonan Perbaikan Sarana Prasarana",
    perihal: "Permohonan Rehabilitasi Ruang Belajar Rusak",
    targetType: "umum",
    fields: [
      { name: "kondisiSarpras", label: "Uraian Kerusakan", type: "text", default: "Atap plafon ruang kelas 4 dan kelas 5 mengalami kebocoran parah dan lapuk dimakan usia sehingga membahayakan KBM." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memohon bantuan perbaikan sarana prasarana sekolah dengan rincian kondisi sebagai berikut: <em>${extra.kondisiSarpras || "-"}</em>.</p>
`
  },
  {
    id: "E12",
    kategori: "Surat Kelembagaan Sekolah",
    kodeKategori: "E",
    kodeKlasifikasi: "420",
    judul: "Surat Permohonan Pengadaan Barang",
    perihal: "Usulan Pengadaan Perangkat TIK Sekolah",
    targetType: "umum",
    fields: [
      { name: "usulanBarang", label: "Rincian Usulan Barang", type: "text", default: "Chromebook / Laptop 15 unit untuk menunjang kegiatan ANBK dan literasi digital peserta didik." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Mengusulkan permohonan pengadaan sarana penunjang pembelajaran: <strong>${extra.usulanBarang || "-"}</strong>.</p>
`
  },

  // ==========================================
  // KATEGORI F: SURAT KEGIATAN & KESISWAAN (10)
  // ==========================================
  {
    id: "F1",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Dispensasi Kegiatan Siswa",
    perihal: "Dispensasi Mengikuti Pelatihan / Lomba",
    targetType: "siswa",
    fields: [
      { name: "kegiatanDispensasi", label: "Nama Acara / Pelatihan", type: "text", default: "Pemusatan Latihan POPDA Cabor Atletik Tingkat Kabupaten Brebes" },
      { name: "periodeDispensasi", label: "Lama Waktu", type: "text", default: "Tanggal 18 - 22 November 2026" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 memberikan dispensasi kepada siswa kami:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
</table>
<p>Untuk tidak mengikuti KBM reguler selama: <strong>${extra.periodeDispensasi || "-"}</strong> dalam rangka: <strong>${extra.kegiatanDispensasi || "-"}</strong>.</p>
`
  },
  {
    id: "F2",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Izin Kegiatan Sekolah",
    perihal: "Pemberitahuan & Permohonan Izin Kegiatan Perkemahan Pramuka",
    targetType: "umum",
    fields: [
      { name: "namaKegiatan", label: "Kegiatan", type: "text", default: "Perkemahan Satu Hari (PERSARI) Gugus Depan SDN Kaligangsa Wetan 01" },
      { name: "lokasiWaktu", label: "Waktu & Lokasi", type: "text", default: "Sabtu, 21 November 2026 di Lapangan Sekolah" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberitahukan perihal penyelenggaraan: <strong>${extra.namaKegiatan || "-"}</strong> pada <strong>${extra.lokasiWaktu || "-"}</strong>.</p>
`
  },
  {
    id: "F3",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Izin Study Tour",
    perihal: "Permohonan Rekomendasi Perjalanan Wisata Edukasi",
    targetType: "umum",
    fields: [
      { name: "tujuan", label: "Tujuan Wisata", type: "text", default: "Taman Pintar Yogyakarta" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Mengajukan permohonan izin penyelenggaraan perjalanan edukatif menuju <strong>${extra.tujuan || "-"}</strong>.</p>
`
  },
  {
    id: "F4",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.2",
    judul: "Surat Persetujuan Orang Tua",
    perihal: "Surat Pernyataan Persetujuan Orang Tua / Wali",
    targetType: "siswa",
    fields: [
      { name: "namaKegiatan", label: "Kegiatan yang Diikuti", type: "text", default: "Ekstrakurikuler Wajib Pramuka / Vaksinasi Sekolah" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Saya orang tua / wali dari siswa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
</table>
<p>Menyatakan <strong>SETUJU / TIDAK BERKEBERATAN</strong> atas keikutsertaan anak saya dalam kegiatan: <strong>${extra.namaKegiatan || "-"}</strong>.</p>
`
  },
  {
    id: "F5",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "005",
    judul: "Undangan Peringatan Hari Besar Nasional",
    perihal: "Undangan Upacara Hari Kemerdekaan Republik Indonesia",
    targetType: "umum",
    fields: [
      { name: "peringatan", label: "Peringatan", type: "text", default: "Peringatan HUT Kemerdekaan RI ke-81" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Mengundang seluruh warga sekolah dan tokoh masyarakat untuk menghadiri peringatan: <strong>${extra.peringatan || "-"}</strong>.</p>
`
  },
  {
    id: "F6",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "005",
    judul: "Undangan Peringatan Hari Besar Keagamaan",
    perihal: "Undangan Peringatan Maulid Nabi Muhammad SAW",
    targetType: "umum",
    fields: [
      { name: "acaraKeagamaan", label: "Nama Acara", type: "text", default: "Peringatan Maulid Nabi Muhammad SAW 1448 H" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Mengundang kehadiran bapak/ibu dalam acara: <strong>${extra.acaraKeagamaan || "-"}</strong>.</p>
`
  },
  {
    id: "F7",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Pemberitahuan Lomba",
    perihal: "Pemberitahuan Seleksi FLS2N dan O2SN Sekolah",
    targetType: "umum",
    fields: [
      { name: "namaLomba", label: "Cabang Lomba", type: "text", default: "Menyanyi Tunggal, Kriya Anyam, dan Bulutangkis" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberitahukan pelaksanaan seleksi internal lomba kesiswaan cabang: <strong>${extra.namaLomba || "-"}</strong>.</p>
`
  },
  {
    id: "F8",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Rekomendasi Mengikuti Lomba",
    perihal: "Rekomendasi Delegasi Lomba Resmi Sekolah",
    targetType: "siswa",
    fields: [
      { name: "ajangLomba", label: "Ajang Perlombaan", type: "text", default: "Festival Tunas Bahasa Ibu (FTBI) Tingkat Kabupaten Brebes" },
      { name: "cabangLomba", label: "Cabang / Kategori", type: "text", default: "Lomba Mendongeng Bahasa Jawa" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Kepala SD Negeri Kaligangsa Wetan 01 memberikan rekomendasi resmi kepada:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>NIS / NISN</td><td>:</td><td>${data.nis || "-"} / ${data.nisn || "-"}</td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
</table>
<p>Sebagai duta sekolah pada ajang: <strong>${extra.ajangLomba || "-"}</strong> cabang <strong>${extra.cabangLomba || "-"}</strong>.</p>
`
  },
  {
    id: "F9",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.3",
    judul: "Surat Izin Mengikuti Kegiatan di Luar Sekolah",
    perihal: "Surat Izin Keikutsertaan Kegiatan Luar Sekolah",
    targetType: "siswa",
    fields: [
      { name: "penyelenggara", label: "Lembaga Penyelenggara", type: "text", default: "Kwartir Ranting Gerakan Pramuka Kecamatan Brebes" }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Memberikan izin kepada siswa untuk mengikuti kegiatan kepramukaan yang diselenggarakan oleh: <strong>${extra.penyelenggara || "-"}</strong>.</p>
`
  },
  {
    id: "F10",
    kategori: "Surat Kegiatan dan Kesiswaan",
    kodeKategori: "F",
    kodeKlasifikasi: "421.2",
    judul: "Surat Pernyataan Tanggung Jawab Orang Tua",
    perihal: "Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) Orang Tua",
    targetType: "siswa",
    fields: [
      { name: "pernyataanMutlak", label: "Isi Pernyataan", type: "text", default: "Menyatakan seluruh data berkas pendaftaran dan identitas kependudukan adalah benar dan sah sesuai aslinya." }
    ],
    generateContent: (data, extra, sekolah) => `
<p>Saya selaku Orang Tua / Wali murid dari siswa:</p>
<table class="table-surat">
  <tr><td style="width: 200px;">Nama Siswa</td><td style="width: 15px;">:</td><td><strong>${data.nama || "-"}</strong></td></tr>
  <tr><td>Kelas</td><td>:</td><td>Kelas ${data.kelas || "-"}</td></tr>
</table>
<p>Dengan sungguh-sungguh menyatakan bahwa: <em>"${extra.pernyataanMutlak || "-"}"</em>. Apabila di kemudian hari terbukti tidak benar, saya bersedia menerima sanksi hukum yang berlaku.</p>
`
  }
];
