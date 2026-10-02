/**
 * data.js - Data Model, Sample Data, and LocalStorage Service
 * Sistem Informasi Pelayanan Legalisir Dokumen Terpadu (e-Legalisir)
 * Instansi: SDN Cipinang Melayu 03 Pagi - Jakarta Timur
 */

const STORAGE_KEY = 'e_legalisir_sdn_cipinang_melayu_03_v1';
const SETTINGS_KEY = 'e_legalisir_settings_sdn03_v1';

// Seed Initial Data untuk SDN Cipinang Melayu 03 Pagi
const INITIAL_APPLICATIONS = [
  {
    id: "LEG-2026-7842",
    applicantName: "Ahmad Faiz Pratama",
    identifier: "3175041209120002",
    category: "Alumni / Lulusan SDN Cipinang Melayu 03 Pagi",
    phone: "081298765432",
    email: "ahmad.faiz@gmail.com",
    address: "Jl. Cipinang Bali I No. 14, RT.03/RW.13, Cipinang Melayu, Makasar, Jakarta Timur",
    documentType: "Ijazah Sekolah Dasar (SD)",
    institutionName: "SDN Cipinang Melayu 03 Pagi",
    documentNumber: "DN-01/D-SD/13/0014258",
    graduationYear: 2024,
    copyCount: 5,
    purpose: "Persyaratan Kelulusan & Pemberkasan PPDB SMP Negeri 2026 (Jalur Prestasi)",
    deliveryMethod: "Ambil di Loket Tata Usaha (TU) SDN Cipinang Melayu 03 Pagi",
    deliveryAddress: "-",
    courier: "-",
    trackingCode: "LOKET-TU-A03",
    feePerCopy: 0,
    shippingFee: 0,
    totalFee: 0,
    paymentStatus: "Gratis (Layanan Sekolah Negeri)",
    submissionDate: "2026-09-28 09:15",
    approvalDate: "2026-09-29 11:30",
    completionDate: "2026-09-30 14:00",
    status: "Selesai",
    officerName: "Siti Nurjanah, M.Pd.",
    officerNip: "19720415 199803 2 004",
    verifierNotes: "Berkas (KTP/Ijazah asli) telah dicocokkan dengan Buku Induk Siswa SDN Cipinang Melayu 03 Pagi No. Induk 3412. Data sah, valid & terverifikasi 100%.",
    securityHash: "SHA256:7b98d1a4e5c8301f2e048bb7ac6d19f390e441aa32",
    qrData: "VERIFIED-RESMI:LEG-2026-7842|NISN:0124567891|DOC:DN-01/D-SD/13/0014258|SDN-CIPINANG-MELAYU-03|STATUS:SAH",
    hasDigitalCopy: true,
    timeline: [
      { step: 1, title: "Permohonan Diterima", time: "28 Sep 2026, 09:15 WIB", note: "Permohonan berhasil didaftarkan secara online via portal legalisir SDN Cipinang Melayu 03 Pagi." },
      { step: 2, title: "Verifikasi Berkas & Buku Induk", time: "28 Sep 2026, 14:20 WIB", note: "Berkas unggahan (KTP/Ijazah asli) dicocokkan dengan Buku Induk Siswa oleh Petugas Tata Usaha." },
      { step: 3, title: "Tanda Tangan Elektronik & Stempel", time: "29 Sep 2026, 11:30 WIB", note: "Dokumen telah disahkan secara digital oleh Kepala SDN Cipinang Melayu 03 Pagi." },
      { step: 4, title: "Legalisir Siap & Dicetak", time: "30 Sep 2026, 14:00 WIB", note: "Dokumen fisik siap diambil di ruang TU SDN Cipinang Melayu 03 Pagi / e-Legalisir digital dapat diunduh." }
    ]
  },
  {
    id: "LEG-2026-8910",
    applicantName: "Zahra Aulia Putri (Wali: Ibu Suryani)",
    identifier: "3175045610110005",
    category: "Orang Tua / Wali Murid",
    phone: "085711223344",
    email: "suryani.zahra@gmail.com",
    address: "Perum Cipinang Indah II Blok B No. 7, Makasar, Jakarta Timur 13620",
    documentType: "Surat Keterangan Lulus (SKL) Sementara",
    institutionName: "SDN Cipinang Melayu 03 Pagi",
    documentNumber: "421.2/088/SDN-CM03/VI/2026",
    graduationYear: 2026,
    copyCount: 3,
    purpose: "Pendaftaran PPDB Masuk SMP Swasta & Pesantren",
    deliveryMethod: "Kirim Ekspedisi Kilat (POS Indonesia)",
    deliveryAddress: "Perum Cipinang Indah II Blok B No. 7, Makasar, Jakarta Timur 13620",
    courier: "POS Indonesia (Next Day)",
    trackingCode: "POS-JKT-9920148",
    feePerCopy: 0,
    shippingFee: 15000,
    totalFee: 15000,
    paymentStatus: "Lunas (Ongkir POS Indonesia)",
    submissionDate: "2026-09-30 11:00",
    approvalDate: "2026-10-01 10:15",
    completionDate: "-",
    status: "Siap Diambil",
    officerName: "Drs. Bambang Haryadi",
    officerNip: "19780620 200501 1 008",
    verifierNotes: "Dokumen (KTP/Ijazah asli) dan data SKL telah diverifikasi sesuai data kelulusan kelas 6 SDN Cipinang Melayu 03 Pagi.",
    securityHash: "SHA256:4c12ea8801f9b33a76cd45e128bb9910d65ff23b91",
    qrData: "VERIFIED-RESMI:LEG-2026-8910|NIK:3175045610110005|DOC:421.2/088/SDN-CM03/VI/2026|STATUS:SAH",
    hasDigitalCopy: true,
    timeline: [
      { step: 1, title: "Permohonan Diterima", time: "30 Sep 2026, 11:00 WIB", note: "Permohonan masuk antrean sistem legalisir sekolah." },
      { step: 2, title: "Verifikasi Berkas Dokumen", time: "01 Okt 2026, 09:00 WIB", note: "Kesesuaian berkas unggahan asli (KTP/Ijazah asli) terkonfirmasi valid." },
      { step: 3, title: "Pengesahan TTE Kepala Sekolah", time: "01 Okt 2026, 10:15 WIB", note: "Pengesahan digital Kepala SDN Cipinang Melayu 03 Pagi selesai." },
      { step: 4, title: "Pengemasan & Siap Kirim", time: "01 Okt 2026, 14:00 WIB", note: "Dokumen salinan legalisir berstempel basah telah dikemas kedap air, siap diserahkan ke kurir POS." }
    ]
  },
  {
    id: "LEG-2026-9045",
    applicantName: "Rizky Ramadhan",
    identifier: "3175040305130007",
    category: "Alumni / Lulusan SDN Cipinang Melayu 03 Pagi",
    phone: "081388776655",
    email: "rizky.ramadhan@outlook.com",
    address: "Jl. Elang No. 25, Cipinang Melayu, Makasar, Jakarta Timur",
    documentType: "Buku Rapor Siswa (Legalisir Nilai Rapor)",
    institutionName: "SDN Cipinang Melayu 03 Pagi",
    documentNumber: "RAPOR-SDN03-2023/118",
    graduationYear: 2023,
    copyCount: 2,
    purpose: "Pindah Domisili & Mutasi Sekolah ke Kota Bandung",
    deliveryMethod: "Ambil di Loket Tata Usaha (TU) SDN Cipinang Melayu 03 Pagi",
    deliveryAddress: "-",
    courier: "-",
    trackingCode: "LOKET-TU-B05",
    feePerCopy: 0,
    shippingFee: 0,
    totalFee: 0,
    paymentStatus: "Gratis (Layanan Sekolah Negeri)",
    submissionDate: "2026-10-01 13:40",
    approvalDate: "-",
    completionDate: "-",
    status: "Sedang Diproses",
    officerName: "Siti Nurjanah, M.Pd.",
    officerNip: "19720415 199803 2 004",
    verifierNotes: "Unggahan dokumen asli lolos verifikasi berkas awal. Sedang dalam proses pengecekan nilai rapor kelas 4-6 pada ledger sekolah.",
    securityHash: "SHA256:11a084efb39922c09d57a1b4e99f0102cd739b82",
    qrData: "VERIFIED-RESMI:LEG-2026-9045|PROSES",
    hasDigitalCopy: false,
    timeline: [
      { step: 1, title: "Permohonan Diterima", time: "01 Okt 2026, 13:40 WIB", note: "Permohonan pendaftaran legalisir rapor berhasil diterima sistem." },
      { step: 2, title: "Pemeriksaan Ledger Rapor", time: "02 Okt 2026, 08:30 WIB", note: "Nomor induk dan nilai rapor sedang dicocokkan dengan arsip nilai SDN Cipinang Melayu 03 Pagi." }
    ]
  },
  {
    id: "LEG-2026-9211",
    applicantName: "Dimas Aditya Pratama",
    identifier: "3175041804100003",
    category: "Alumni / Lulusan SDN Cipinang Melayu 03 Pagi",
    phone: "089677889900",
    email: "dimas.aditya@gmail.com",
    address: "Jl. Masjid Al-Muqorrobin No. 10, Cipinang Melayu, Jakarta Timur",
    documentType: "Ijazah Sekolah Dasar (SD)",
    institutionName: "SDN Cipinang Melayu 03 Pagi",
    documentNumber: "DN-01/D-SD/13/0009841",
    graduationYear: 2022,
    copyCount: 3,
    purpose: "Pemberkasan Beasiswa Prestasi & Lanjutan Pendidikan",
    deliveryMethod: "Ambil di Loket Tata Usaha (TU) SDN Cipinang Melayu 03 Pagi",
    deliveryAddress: "-",
    courier: "-",
    trackingCode: "MENUNGGU-VERIF",
    feePerCopy: 0,
    shippingFee: 0,
    totalFee: 0,
    paymentStatus: "Gratis (Layanan Sekolah Negeri)",
    submissionDate: "2026-10-02 08:20",
    approvalDate: "-",
    completionDate: "-",
    status: "Menunggu Verifikasi",
    officerName: "-",
    officerNip: "-",
    verifierNotes: "Berkas dokumen (KTP/Ijazah asli) baru diunggah, menunggu antrean pengecekan berkas oleh validator Tata Usaha sekolah.",
    securityHash: "SHA256:399cfa0293eb7781b0f6e5c98d7a1e0b552f",
    qrData: "VERIFIED-RESMI:LEG-2026-9211|ANTREAN",
    hasDigitalCopy: false,
    timeline: [
      { step: 1, title: "Permohonan Diterima", time: "02 Okt 2026, 08:20 WIB", note: "Pendaftaran permohonan berhasil diserahkan ke sistem antrean loket TU." }
    ]
  },
  {
    id: "LEG-2026-6701",
    applicantName: "Nabila Maharani",
    identifier: "3175046208090001",
    category: "Alumni / Lulusan SDN Cipinang Melayu 03 Pagi",
    phone: "087812349988",
    email: "nabila.maharani@yahoo.com",
    address: "Jl. Manunggal II No. 45, Cipinang Melayu, Makasar, Jakarta Timur",
    documentType: "Ijazah Sekolah Dasar (SD)",
    institutionName: "SDN Cipinang Melayu 03 Pagi",
    documentNumber: "DN-01/D-SD/13/0007621",
    graduationYear: 2021,
    copyCount: 2,
    purpose: "Pemberkasan KJP Plus Lanjutan & Administrasi Kependudukan",
    deliveryMethod: "Ambil di Loket Tata Usaha (TU) SDN Cipinang Melayu 03 Pagi",
    deliveryAddress: "-",
    courier: "-",
    trackingCode: "DITOLAK",
    feePerCopy: 0,
    shippingFee: 0,
    totalFee: 0,
    paymentStatus: "Dibatalkan",
    submissionDate: "2026-09-25 10:15",
    approvalDate: "-",
    completionDate: "-",
    status: "Ditolak",
    officerName: "Drs. Bambang Haryadi",
    officerNip: "19780620 200501 1 008",
    verifierNotes: "Lampiran unggah berkas (KTP/Ijazah asli) buram dan bagian nomor seri ijazah terpotong. Silakan unggah ulang 1 berkas pindaian/foto dokumen asli yang jelas dan dapat terbaca utuh.",
    securityHash: "-",
    qrData: "-",
    hasDigitalCopy: false,
    timeline: [
      { step: 1, title: "Permohonan Diterima", time: "25 Sep 2026, 10:15 WIB", note: "Permohonan diserahkan oleh pemohon." },
      { step: 2, title: "Verifikasi Berkas Ditolak", time: "25 Sep 2026, 14:00 WIB", note: "Berkas tidak memenuhi syarat kejelasan dokumen (KTP/Ijazah asli)." }
    ]
  }
];

// App Data Service
const DataService = {
  getApplications: function () {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveApplications(INITIAL_APPLICATIONS);
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading localStorage, using initial data:', e);
      return INITIAL_APPLICATIONS;
    }
  },

  saveApplications: function (apps) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },

  getApplicationById: function (id) {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    const apps = this.getApplications();
    return apps.find(a => a.id.toUpperCase() === cleanId || a.identifier === cleanId) || null;
  },

  createApplication: function (formData) {
    const apps = this.getApplications();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `LEG-2026-${randomNum}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newRecord = {
      id: newId,
      applicantName: formData.applicantName,
      identifier: formData.identifier,
      category: formData.category || 'Alumni / Lulusan SDN Cipinang Melayu 03 Pagi',
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      documentType: formData.documentType || 'Ijazah Sekolah Dasar (SD)',
      institutionName: formData.institutionName || 'SDN Cipinang Melayu 03 Pagi',
      documentNumber: formData.documentNumber,
      graduationYear: parseInt(formData.graduationYear) || 2024,
      copyCount: parseInt(formData.copyCount) || 1,
      purpose: formData.purpose,
      deliveryMethod: formData.deliveryMethod,
      deliveryAddress: formData.deliveryAddress || '-',
      courier: formData.courier || '-',
      trackingCode: formData.deliveryMethod.includes('Ekspedisi') ? `EXP-${Math.floor(100000 + Math.random() * 900000)}` : 'LOKET-TU-ANTREAN',
      feePerCopy: formData.feePerCopy || 0,
      shippingFee: formData.shippingFee || 0,
      totalFee: ((formData.copyCount || 1) * (formData.feePerCopy || 0)) + (formData.shippingFee || 0),
      paymentStatus: (formData.shippingFee && formData.shippingFee > 0) ? 'Lunas (Ongkir Ekspedisi)' : 'Gratis (Layanan Sekolah Negeri)',
      submissionDate: dateStr,
      approvalDate: '-',
      completionDate: '-',
      status: "Menunggu Verifikasi",
      officerName: "-",
      officerNip: "-",
      verifierNotes: "Permohonan baru berhasil diajukan dengan 1 dokumen (KTP/Ijazah asli). Menunggu verifikasi berkas oleh validator Tata Usaha SDN Cipinang Melayu 03 Pagi.",
      securityHash: "SHA256:" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      qrData: `VERIFIED-RESMI:${newId}|NIK:${formData.identifier}|DOC:${formData.documentNumber}|SDN-CM-03|STATUS:MENUNGGU`,
      hasDigitalCopy: true,
      timeline: [
        {
          step: 1,
          title: "Permohonan Berhasil Diajukan",
          time: dateStr,
          note: "Dokumen (KTP/Ijazah asli) dan data formulir berhasil diserahkan ke sistem antrean legalisir SDN Cipinang Melayu 03 Pagi."
        }
      ]
    };

    apps.unshift(newRecord);
    this.saveApplications(apps);
    return newRecord;
  },

  updateApplicationStatus: function (id, newStatus, officerName, officerNip, notes) {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const item = apps[index];
    item.status = newStatus;
    item.officerName = officerName || item.officerName || "Siti Nurjanah, M.Pd.";
    item.officerNip = officerNip || item.officerNip || "19720415 199803 2 004";
    if (notes) item.verifierNotes = notes;

    let stepTitle = "";
    if (newStatus === "Sedang Diproses") {
      stepTitle = "Verifikasi Berkas Disetujui & Diproses";
      item.approvalDate = dateStr;
    } else if (newStatus === "Siap Diambil") {
      stepTitle = item.deliveryMethod.includes("Ekspedisi") ? "Diserahkan ke Kurir Ekspedisi" : "Dokumen Siap Diambil di Loket TU SDN Cipinang Melayu 03 Pagi";
    } else if (newStatus === "Selesai") {
      stepTitle = "Legalisir Selesai & Diterbitkan Resmi";
      item.completionDate = dateStr;
      item.qrData = `VERIFIED-RESMI:${item.id}|NIK:${item.identifier}|DOC:${item.documentNumber}|SDN-CM-03|STATUS:SAH`;
    } else if (newStatus === "Ditolak") {
      stepTitle = "Permohonan Ditolak / Perlu Perbaikan Berkas";
    }

    if (stepTitle) {
      item.timeline.push({
        step: item.timeline.length + 1,
        title: stepTitle,
        time: dateStr,
        note: notes || `Status diperbarui menjadi ${newStatus} oleh ${item.officerName}.`
      });
    }

    apps[index] = item;
    this.saveApplications(apps);
    return item;
  },

  deleteApplication: function (id) {
    let apps = this.getApplications();
    apps = apps.filter(a => a.id !== id);
    this.saveApplications(apps);
    return true;
  },

  resetToDefault: function () {
    localStorage.removeItem(STORAGE_KEY);
    this.saveApplications(INITIAL_APPLICATIONS);
    return INITIAL_APPLICATIONS;
  }
};
