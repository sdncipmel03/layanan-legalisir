# e-Legalisir SDN Cipinang Melayu 03 Pagi | Portal Pelayanan Pengesahan Ijazah & Dokumen Resmi

Aplikasi web modern berbasis HTML5, CSS3 murni (Vanilla CSS), dan JavaScript murni (ES6+) untuk **Pelayanan Legalisir Ijazah & Dokumen Kelulusan Resmi SDN Cipinang Melayu 03 Pagi, Jakarta Timur**. Dilengkapi fitur verifikasi Tanda Tangan Elektronik (TTE) Kepala Sekolah, generator QR Code validasi keabsahan dokumen, tanda tangan digital pemohon di canvas, pelacakan status berkas real-time, unggah 1 dokumen (KTP/Ijazah asli), serta Dashboard Petugas Tata Usaha (TU) sekolah.

---

## 🌟 Fitur Utama Aplikasi

1. **Beranda Interaktif & Banner Pelayanan**:
   - Identitas resmi **Pemerintah Provinsi DKI Jakarta • Sudin Pendidikan Wilayah I Jakarta Timur • SDN Cipinang Melayu 03 Pagi**.
   - Hero section dengan pratinjau sertifikat legalisir digital interaktif, stempel resmi sekolah, dan QR Code mini.
   - Kolom pencarian pelacakan instan di hero banner (menggunakan No. Registrasi atau NISN/NIK).
   - Ticker statistik pelayanan real-time (*Total Dokumen, Waktu Verifikasi 1x24 Jam, Layanan Bebas Biaya Rp 0, Validasi TTE Kepala Sekolah*).
   - Penjelasan fitur unggulan dan 4 langkah alur pelayanan legalisir sekolah.

2. **Formulir Pengajuan Legalisir Multi-Langkah (Wizard Form)**:
   - **Langkah 1 (Data Pemohon)**: Pilihan kategori (*Alumni / Lulusan SDN Cipinang Melayu 03 Pagi* atau *Orang Tua / Wali Murid*), NISN/NIK, Nama Lengkap, WhatsApp, Email, dan Alamat.
   - **Langkah 2 (Rincian Dokumen)**: Pilihan jenis dokumen (*Ijazah Sekolah Dasar (SD), SKL Sementara, SKHU/US, Rapor Siswa, SKPI Hilang/Rusak, Surat Mutasi*), Nama Sekolah pre-filled (*SDN Cipinang Melayu 03 Pagi*), Nomor Seri Ijazah, Tahun Lulus, Jumlah Salinan Eksemplar, dan Keperluan Legalisir (misal: PPDB SMP Negeri/Swasta).
   - **Langkah 3 (Unggah Dokumen)**: **Hanya 1 berkas pindaian / foto dokumen asli** dengan keterangan **(KTP / Ijazah asli)** yang didukung format PDF/JPG/PNG (maksimal 5 MB) dengan drag-and-drop dan preview status.
   - **Langkah 4 (Pengambilan & Biaya)**: Pilihan ambil langsung di Ruang Tata Usaha SDN Cipinang Melayu 03 Pagi (Gratis / Rp 0) atau dikirim via ekspedisi kilat (POS Indonesia/JNE/SiCepat) dengan rincian biaya transparan.
   - **Langkah 5 (Tanda Tangan & Konfirmasi)**: Canvas Signature Pad untuk tanda tangan digital pemohon secara langsung (mouse/touchscreen) + Pakta Integritas keaslian dokumen SDN Cipinang Melayu 03 Pagi.
   - Menghasilkan **Bukti Tanda Terima Pendaftaran** resmi ber-QR Code yang siap dicetak (*Print Friendly*).

3. **Pelacakan Status Berkas Real-time**:
   - Lacak status menggunakan Nomor Registrasi (misal: `LEG-2026-7842`) atau NISN/NIK siswa.
   - Menampilkan badge status (*Menunggu Verifikasi, Sedang Diproses, Siap Diambil, Selesai, Ditolak*).
   - Timeline riwayat perjalanan berkas vertikal lengkap dengan stempel waktu dan catatan verifikator Tata Usaha.
   - Tombol cepat untuk cetak Bukti Pendaftaran, lihat dokumen e-Legalisir resmi, atau simulasi kirim notifikasi WhatsApp.

4. **Verifikasi Keabsahan Dokumen & QR Code Scanner**:
   - Menampilkan **Kutipan Surat Keterangan Pengesahan Resmi** lengkap dengan Kop Surat resmi **Dinas Pendidikan DKI Jakarta - SDN Cipinang Melayu 03 Pagi**, stempel basah digital "SDN CIPINANG MELAYU 03 TELAH DILEGALISIR SESUAI DENGAN ASLINYA", Tanda Tangan Elektronik Kepala Sekolah (Siti Nurjanah, M.Pd.), Barcode QR Code aktif, dan kode verifikasi kriptografi SHA-256.
   - Format standar cetak dokumen A4 resmi.

5. **Portal Petugas / Dashboard Administrator Tata Usaha**:
   - Indikator KPI dinamis (*Total, Menunggu Verifikasi, Sedang Diproses, Siap Diambil/Kirim, Selesai*).
   - Tabel permohonan lengkap dengan filter chip status dan pencarian data siswa/alumni.
   - Modal tindakan verifikasi: Setujui permohonan, ubah status, masukkan nama & NIP Kepala Sekolah/Petugas TU, dan berikan catatan evaluasi berkas.
   - Fitur Ekspor Rekapitulasi Data ke format `.CSV` (Excel).
   - Fitur Reset Data Sampel Simulasi SDN Cipinang Melayu 03 Pagi.

6. **Simulasi Notifikasi WhatsApp Pemohon**:
   - Pop-up simulasi pesan resmi WhatsApp dari Tata Usaha SDN Cipinang Melayu 03 Pagi kepada pemohon/orang tua ketika status dokumennya diperbarui.

7. **Mode Gelap / Terang (Dark Mode Toggle)**:
   - Tampilan tema gelap dan terang profesional dengan preferensi yang tersimpan di LocalStorage.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat **Zero-Dependency** (tidak memerlukan server backend atau instalasi khusus):

1. Buka file `index.html` langsung di browser Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, dsb):
   - Klik ganda pada file `index.html`, **ATAU**
   - Klik kanan `index.html` > *Open with* > Pilih Browser Anda.
2. Anda juga dapat menjalankannya melalui ekstensi *Live Server* di VS Code / IDE.

---

## 🔍 Data Sampel Demo SDN Cipinang Melayu 03 Pagi

Anda dapat langsung mencoba nomor registrasi demo berikut pada menu **Lacak Status** atau **Verifikasi QR**:

| Nomor Registrasi | Nama Siswa / Pemohon | Jenis Dokumen | Status |
|---|---|---|---|
| `LEG-2026-7842` | Ahmad Faiz Pratama | Ijazah Sekolah Dasar (SD) | **Selesai** (Diterbitkan & Sah) |
| `LEG-2026-8910` | Zahra Aulia Putri (Wali: Ibu Suryani) | Surat Keterangan Lulus (SKL) | **Siap Diambil** / Kirim POS |
| `LEG-2026-9045` | Rizky Ramadhan | Buku Rapor Siswa | **Sedang Diproses** (Verif OK) |
| `LEG-2026-9211` | Dimas Aditya Pratama | Ijazah Sekolah Dasar (SD) | **Menunggu Verifikasi** |
| `LEG-2026-6701` | Nabila Maharani | Ijazah Sekolah Dasar (SD) | **Ditolak** (Scan Buram) |

---

## 📁 Struktur Berkas

```
Aplikasi Legalisir/
├── index.html          # Halaman utama aplikasi e-Legalisir SDN Cipinang Melayu 03 Pagi
├── README.md           # Panduan penggunaan dan dokumentasi fitur
├── css/
│   └── styles.css      # Desain sistem responsif, kop surat, stempel, glassmorphism & print style
└── js/
    ├── qrcode.min.js   # Generator QR code mandiri (offline & scannable)
    ├── data.js         # Layanan data LocalStorage & mock data SDN Cipinang Melayu 03 Pagi
    └── app.js          # Controller aplikasi, alur wizard (single upload KTP/Ijazah asli), pelacakan, & admin
```

---

## 🏫 Identitas Instansi
- **Instansi**: SDN Cipinang Melayu 03 Pagi
- **NPSN**: 20104140
- **Alamat**: Jl. Cipinang Bali II No. 1 / Jl. Elang, RT.03/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, DKI Jakarta 13620
- **Telepon**: (021) 862-3450
- **Email**: sdn.cipinangmelayu03pagi@jakarta.go.id
