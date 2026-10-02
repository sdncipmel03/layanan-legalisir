/**
 * app.js - Main Application Logic & Interactivity
 * Sistem Informasi Pelayanan Legalisir Dokumen Terpadu (e-Legalisir)
 * Instansi: SDN Cipinang Melayu 03 Pagi - Jakarta Timur
 */

// Application State
let currentWizardStep = 1;
const totalWizardSteps = 5;
let currentTrackedApp = null;
let currentAdminFilter = 'Semua';
let uploadedFiles = {
  doc: null // Hanya 1 berkas pindaian (KTP / Ijazah asli)
};

// Canvas Signature variables
let sigCanvas, sigCtx;
let isDrawing = false;
let hasSignature = false;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSignaturePad();
  initHeroMiniQr();
  renderAdminTable();
  updateKpiCounters();
  calculateFee();

  // Load first demo app into verification view as default showcase
  loadVerificationApp('LEG-2026-7842');

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('mainNavMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '76px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--bg-card)';
      navMenu.style.padding = '20px';
      navMenu.style.boxShadow = 'var(--shadow-xl)';
    });
  }

  // Pre-load default tracked demo
  currentTrackedApp = DataService.getApplicationById('LEG-2026-7842');
});

/* ==========================================================================
   VIEW SWITCHER / ROUTING
   ========================================================================== */
function switchView(viewName) {
  // Update nav buttons
  const navBtns = document.querySelectorAll('.nav-item-btn');
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide all views
  const views = document.querySelectorAll('.app-view');
  views.forEach(v => v.classList.remove('active'));

  // Show target view
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // View specific setups
  if (viewName === 'admin') {
    renderAdminTable();
    updateKpiCounters();
  } else if (viewName === 'form') {
    setTimeout(resizeSignatureCanvas, 100);
  }
}

/* ==========================================================================
   THEME TOGGLING (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('e_legalisir_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('e_legalisir_theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
      showToast(isDark ? 'Mode Gelap diaktifkan' : 'Mode Terang diaktifkan', 'info');
    });
  }
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('themeMoonIcon');
  if (!icon) return;
  if (isDark) {
    icon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  } else {
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
  }
}

/* ==========================================================================
   MINI QR CODE IN HERO
   ========================================================================== */
function initHeroMiniQr() {
  const container = document.getElementById('heroMiniQr');
  if (container && typeof QRCode !== 'undefined') {
    container.innerHTML = '';
    new QRCode(container, {
      text: "VERIFIED-RESMI:LEG-2026-7842|SDN-CIPINANG-MELAYU-03|SAH",
      width: 52,
      height: 52,
      colorDark: "#1e3a8a",
      colorLight: "#ffffff"
    });
  }
}

/* ==========================================================================
   FORM WIZARD LOGIC
   ========================================================================== */
function navigateWizard(direction) {
  if (direction === 1) {
    // Validate current step before proceeding
    if (!validateCurrentStep(currentWizardStep)) {
      return;
    }
  }

  const nextStep = currentWizardStep + direction;
  if (nextStep < 1 || nextStep > totalWizardSteps) return;

  // Update step indicators
  document.getElementById(`stepPane${currentWizardStep}`).classList.remove('active');
  const currIndicator = document.getElementById(`stepIndicator${currentWizardStep}`);
  currIndicator.classList.remove('active');
  if (direction === 1) {
    currIndicator.classList.add('completed');
  }

  currentWizardStep = nextStep;
  document.getElementById(`stepPane${currentWizardStep}`).classList.add('active');
  const nextIndicator = document.getElementById(`stepIndicator${currentWizardStep}`);
  nextIndicator.classList.add('active');

  // Update buttons
  const prevBtn = document.getElementById('btnWizardPrev');
  const nextBtn = document.getElementById('btnWizardNext');
  const submitBtn = document.getElementById('btnWizardSubmit');

  prevBtn.style.display = currentWizardStep > 1 ? 'inline-flex' : 'none';

  if (currentWizardStep === totalWizardSteps) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-flex';
    setTimeout(resizeSignatureCanvas, 150);
  } else {
    nextBtn.style.display = 'inline-flex';
    submitBtn.style.display = 'none';
  }

  window.scrollTo({ top: document.querySelector('.wizard-container').offsetTop - 80, behavior: 'smooth' });
}

function validateCurrentStep(step) {
  if (step === 1) {
    const id = document.getElementById('applicantIdentifier').value.trim();
    const name = document.getElementById('applicantName').value.trim();
    const phone = document.getElementById('applicantPhone').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const addr = document.getElementById('applicantAddress').value.trim();

    if (!id || !name || !phone || !email || !addr) {
      showToast('Harap lengkapi semua kolom data identitas pemohon.', 'warning');
      return false;
    }
  } else if (step === 2) {
    const inst = document.getElementById('institutionName').value.trim();
    const docNum = document.getElementById('documentNumber').value.trim();
    const gradYear = document.getElementById('graduationYear').value.trim();

    if (!inst || !docNum || !gradYear) {
      showToast('Harap lengkapi nama lembaga, nomor seri dokumen, dan tahun kelulusan.', 'warning');
      return false;
    }
  } else if (step === 3) {
    // Only 1 document upload (KTP / Ijazah asli)
    if (!uploadedFiles.doc) {
      uploadedFiles.doc = { 
        name: "scan_dokumen_ktp_atau_ijazah_asli.pdf", 
        size: "1.8 MB",
        type: "KTP / Ijazah asli"
      };
      document.getElementById('previewDocName').innerText = uploadedFiles.doc.name;
      document.getElementById('previewDocSize').innerText = `${uploadedFiles.doc.size} • Dokumen (KTP/Ijazah asli) Siap Diverifikasi`;
      document.getElementById('previewDoc').style.display = 'flex';
      showToast('Berkas dokumen (KTP/Ijazah asli) disimulasikan otomatis.', 'info');
    }
  } else if (step === 4) {
    const isCourier = document.querySelector('input[name="deliveryMethod"]:checked').value.includes('Ekspedisi');
    if (isCourier) {
      const shipAddr = document.getElementById('shippingAddress').value.trim();
      if (!shipAddr) {
        // Auto fill from step 1 address if empty
        const mainAddr = document.getElementById('applicantAddress').value.trim();
        document.getElementById('shippingAddress').value = mainAddr;
      }
    }
  }
  return true;
}

function selectRadioCard(element) {
  const container = element.closest('.radio-card-grid');
  container.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
  element.classList.add('selected');
  const radio = element.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
}

function selectDeliveryMethod(element, type) {
  selectRadioCard(element);
  const courierSection = document.getElementById('courierDetailsSection');
  if (type === 'courier') {
    courierSection.style.display = 'block';
  } else {
    courierSection.style.display = 'none';
  }
  calculateFee();
}

function calculateFee() {
  const copyCount = parseInt(document.getElementById('copyCount').value) || 1;
  // Di Sekolah Dasar Negeri (SDN), legalisir dokumen resmi bebas biaya (Gratis / Rp 0)
  const feePerCopy = 0;
  const docFee = copyCount * feePerCopy;

  const isCourier = document.querySelector('input[name="deliveryMethod"]:checked')?.value.includes('Ekspedisi');
  let shippingFee = 0;
  let courierText = "Rp 0 (Ambil di Loket TU Sekolah)";

  if (isCourier) {
    const courierVal = document.getElementById('courierService')?.value || "";
    if (courierVal.includes('18.000')) {
      shippingFee = 18000;
      courierText = "Rp 18.000 (JNE Express Kilat)";
    } else if (courierVal.includes('14.000')) {
      shippingFee = 14000;
      courierText = "Rp 14.000 (SiCepat BEST)";
    } else {
      shippingFee = 15000;
      courierText = "Rp 15.000 (POS Indonesia)";
    }
  }

  const totalFee = docFee + shippingFee;

  document.getElementById('summaryDocLabel').innerText = `Legalisir Dokumen (${copyCount} lembar):`;
  document.getElementById('summaryDocFee').innerText = `GRATIS (Layanan SDN)`;
  document.getElementById('summaryShipFee').innerText = courierText;
  document.getElementById('summaryTotalFee').innerText = totalFee === 0 ? "GRATIS (Rp 0)" : `Rp ${totalFee.toLocaleString('id-ID')}`;
}

// Single file upload handler for 1 document: (KTP/Ijazah asli)
function handleFileSelected(input, previewId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
    
    uploadedFiles.doc = { 
      name: file.name, 
      size: sizeStr,
      type: "KTP / Ijazah asli"
    };
    document.getElementById('previewDocName').innerText = file.name;
    document.getElementById('previewDocSize').innerText = `${sizeStr} • Dokumen (KTP/Ijazah asli) Siap Diverifikasi`;
    preview.style.display = 'flex';
    showToast(`Berkas "${file.name}" (KTP/Ijazah asli) berhasil diunggah.`, 'success');
  }
}

function resetFile(inputId, previewId) {
  document.getElementById(inputId).value = '';
  document.getElementById(previewId).style.display = 'none';
  uploadedFiles.doc = null;
  showToast('Berkas pindaian dihapus. Silakan pilih berkas dokumen asli (KTP/Ijazah asli).', 'info');
}

/* ==========================================================================
   SIGNATURE PAD CANVAS
   ========================================================================== */
function initSignaturePad() {
  sigCanvas = document.getElementById('signatureCanvas');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');

  function startPosition(e) {
    isDrawing = true;
    hasSignature = true;
    draw(e);
  }
  function endPosition() {
    isDrawing = false;
    sigCtx.beginPath();
  }
  function draw(e) {
    if (!isDrawing) return;
    const rect = sigCanvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.strokeStyle = '#0f172a';

    sigCtx.lineTo(x, y);
    sigCtx.stroke();
    sigCtx.beginPath();
    sigCtx.moveTo(x, y);
  }

  sigCanvas.addEventListener('mousedown', startPosition);
  sigCanvas.addEventListener('mouseup', endPosition);
  sigCanvas.addEventListener('mousemove', draw);

  sigCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
  sigCanvas.addEventListener('touchend', endPosition);
  sigCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

  resizeSignatureCanvas();
}

function resizeSignatureCanvas() {
  if (!sigCanvas) return;
  const rect = sigCanvas.getBoundingClientRect();
  if (rect.width > 0) {
    sigCanvas.width = rect.width;
    sigCanvas.height = 160;
  }
}

function clearSignature() {
  if (!sigCtx || !sigCanvas) return;
  sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  hasSignature = false;
  showToast('Tanda tangan dihapus. Silakan goreskan ulang.', 'info');
}

/* ==========================================================================
   SUBMIT APPLICATION
   ========================================================================== */
function submitApplicationForm() {
  const agree = document.getElementById('agreeCheckbox').checked;
  if (!agree) {
    showToast('Anda wajib menyetujui Pakta Integritas sebelum mengirim.', 'warning');
    return;
  }

  const category = document.querySelector('input[name="applicantCategory"]:checked').value;
  const identifier = document.getElementById('applicantIdentifier').value.trim();
  const applicantName = document.getElementById('applicantName').value.trim();
  const phone = document.getElementById('applicantPhone').value.trim();
  const email = document.getElementById('applicantEmail').value.trim();
  const address = document.getElementById('applicantAddress').value.trim();

  const documentType = document.getElementById('documentType').value;
  const institutionName = document.getElementById('institutionName').value.trim() || 'SDN Cipinang Melayu 03 Pagi';
  const documentNumber = document.getElementById('documentNumber').value.trim();
  const graduationYear = document.getElementById('graduationYear').value;
  const copyCount = parseInt(document.getElementById('copyCount').value) || 1;
  const purpose = document.getElementById('legalPurpose').value;

  const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
  const isCourier = deliveryMethod.includes('Ekspedisi');
  const courierService = isCourier ? document.getElementById('courierService').value : '-';
  const shippingAddress = isCourier ? document.getElementById('shippingAddress').value : '-';

  const feePerCopy = 0; // Bebas biaya legalisir di SDN Cipinang Melayu 03 Pagi
  let shippingFee = 0;
  if (isCourier) {
    if (courierService.includes('18.000')) shippingFee = 18000;
    else if (courierService.includes('14.000')) shippingFee = 14000;
    else shippingFee = 15000;
  }

  const newApp = DataService.createApplication({
    applicantName,
    identifier,
    category,
    phone,
    email,
    address,
    documentType,
    institutionName,
    documentNumber,
    graduationYear,
    copyCount,
    purpose,
    deliveryMethod,
    deliveryAddress: shippingAddress,
    courier: courierService,
    feePerCopy,
    shippingFee,
    paymentStatus: shippingFee > 0 ? "Lunas (Ongkir Ekspedisi)" : "Gratis (Layanan SDN)"
  });

  showToast(`Permohonan ${newApp.id} berhasil diserahkan ke SDN Cipinang Melayu 03 Pagi!`, 'success');

  // Reset wizard
  document.getElementById('legalisirForm').reset();
  clearSignature();
  currentWizardStep = 1;
  document.querySelectorAll('.wizard-step-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('stepPane1').classList.add('active');
  document.querySelectorAll('.step-indicator').forEach((ind, idx) => {
    ind.classList.remove('active', 'completed');
    if (idx === 0) ind.classList.add('active');
  });
  document.getElementById('btnWizardPrev').style.display = 'none';
  document.getElementById('btnWizardNext').style.display = 'inline-flex';
  document.getElementById('btnWizardSubmit').style.display = 'none';

  // Show receipt modal
  showReceiptModal(newApp);

  // Update admin & stats
  renderAdminTable();
  updateKpiCounters();
}

/* ==========================================================================
   TRACKING SEARCH & PRESENTATION
   ========================================================================== */
function handleHeroTrack() {
  const query = document.getElementById('heroTrackInput').value.trim();
  if (!query) {
    showToast('Masukkan nomor registrasi, NISN, atau NIK terlebih dahulu.', 'warning');
    return;
  }
  fillAndTrack(query);
}

function fillAndTrack(code) {
  switchView('track');
  document.getElementById('trackInput').value = code;
  performTrackingSearch();
}

function performTrackingSearch() {
  const query = document.getElementById('trackInput').value.trim();
  if (!query) {
    showToast('Ketikkan nomor registrasi permohonan atau NISN Anda.', 'warning');
    return;
  }

  const app = DataService.getApplicationById(query);
  if (!app) {
    showToast(`Data permohonan "${query}" tidak ditemukan. Pastikan nomor ID atau NISN benar.`, 'error');
    document.getElementById('trackResultContainer').style.display = 'none';
    return;
  }

  renderTrackingCard(app);
}

function renderTrackingCard(app) {
  currentTrackedApp = app;
  const container = document.getElementById('trackResultContainer');
  container.style.display = 'block';

  document.getElementById('trackHeaderId').innerText = app.id;
  document.getElementById('trackHeaderName').innerText = ` - ${app.applicantName}`;
  document.getElementById('trackHeaderDoc').innerText = `${app.documentType} • Diajukan pada: ${app.submissionDate}`;

  // Badge Status
  const badge = document.getElementById('trackHeaderStatusBadge');
  badge.className = `status-badge-lg ${formatStatusClass(app.status)}`;
  badge.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> <span>${app.status}</span>`;

  // Details
  document.getElementById('trackDocNumber').innerText = app.documentNumber;
  document.getElementById('trackInstitution').innerText = app.institutionName;
  document.getElementById('trackCopyCount').innerText = `${app.copyCount} Lembar Salinan`;
  document.getElementById('trackDeliveryMethod').innerText = app.deliveryMethod + (app.trackingCode ? ` (Kode: ${app.trackingCode})` : '');
  document.getElementById('trackPaymentStatus').innerText = app.totalFee === 0 ? "Gratis (Layanan Bebas Biaya SDN)" : `${app.paymentStatus} (Rp ${app.totalFee.toLocaleString('id-ID')})`;
  document.getElementById('trackOfficer').innerText = app.officerName !== '-' ? app.officerName : 'Tim Verifikator TU SDN Cipinang Melayu 03 Pagi';
  document.getElementById('trackVerifierNotes').innerText = app.verifierNotes;

  // Timeline
  const timelineEl = document.getElementById('trackTimelineVertical');
  timelineEl.innerHTML = '';
  app.timeline.forEach((t) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-node done">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="timeline-content">
        <h5>${t.title}</h5>
        <div class="timeline-time">${t.time}</div>
        <div class="timeline-desc">${t.note}</div>
      </div>
    `;
    timelineEl.appendChild(item);
  });

  window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
}

function formatStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/* ==========================================================================
   PUBLIC VERIFICATION / CERTIFICATE MODULE
   ========================================================================== */
function performVerificationCheck() {
  const query = document.getElementById('verifyInput').value.trim();
  if (!query) {
    showToast('Masukkan kode legalisir atau nomor seri ijazah yang akan diverifikasi.', 'warning');
    return;
  }
  loadVerificationApp(query);
}

function loadVerificationApp(idOrNik) {
  const app = DataService.getApplicationById(idOrNik);
  if (!app) {
    showToast(`Dokumen dengan kode "${idOrNik}" tidak valid atau belum terdaftar di SDN Cipinang Melayu 03 Pagi.`, 'error');
    return;
  }

  document.getElementById('certRegNumber').innerText = `${app.id}/SDN-CM03/LEG/2026`;
  document.getElementById('certApplicantName').innerText = app.applicantName;
  document.getElementById('certApplicantId').innerText = app.identifier;
  document.getElementById('certDocType').innerText = app.documentType;
  document.getElementById('certDocNum').innerText = app.documentNumber;
  document.getElementById('certInstitution').innerText = app.institutionName;
  document.getElementById('certSignDate').innerText = app.approvalDate !== '-' ? app.approvalDate.split(' ')[0] : '30 September 2026';
  document.getElementById('certOfficerName').innerText = app.officerName !== '-' ? app.officerName : 'Siti Nurjanah, M.Pd.';
  document.getElementById('certOfficerNip').innerText = app.officerNip !== '-' ? `NIP. ${app.officerNip}` : 'NIP. 19720415 199803 2 004';

  const statusPill = document.getElementById('certValidityStatus');
  if (app.status === 'Selesai' || app.status === 'Siap Diambil') {
    statusPill.className = 'status-pill selesai';
    statusPill.innerText = 'TERVERIFIKASI RESMI (VALID & SAH)';
  } else if (app.status === 'Ditolak') {
    statusPill.className = 'status-pill ditolak';
    statusPill.innerText = 'TIDAK VALID / BERKAS DITOLAK';
  } else {
    statusPill.className = 'status-pill sedang-diproses';
    statusPill.innerText = `STATUS: ${app.status.toUpperCase()}`;
  }

  document.getElementById('certHashShort').innerText = app.securityHash ? app.securityHash.substring(0, 22) + '...' : 'SHA256:7b98d1a4e5...';

  // Render QR Code inside cert
  const qrDisplay = document.getElementById('certQrDisplay');
  if (qrDisplay && typeof QRCode !== 'undefined') {
    qrDisplay.innerHTML = '';
    new QRCode(qrDisplay, {
      text: app.qrData || `VERIFIED-RESMI:${app.id}|SDN-CIPINANG-MELAYU-03|SAH`,
      width: 98,
      height: 98,
      colorDark: "#0f172a",
      colorLight: "#ffffff"
    });
  }
}

/* ==========================================================================
   ADMIN DASHBOARD OPERATIONS
   ========================================================================== */
function renderAdminTable(filterStatus = currentAdminFilter) {
  currentAdminFilter = filterStatus;
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  let apps = DataService.getApplications();
  if (filterStatus && filterStatus !== 'Semua') {
    apps = apps.filter(a => a.status === filterStatus);
  }

  tbody.innerHTML = '';

  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">Tidak ada permohonan dengan status "${filterStatus}".</td></tr>`;
    return;
  }

  apps.forEach(app => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong style="font-family:monospace; color:var(--primary-accent);">${app.id}</strong></td>
      <td>
        <strong>${app.applicantName}</strong><br>
        <span style="font-size:0.75rem; color:var(--text-muted);">${app.identifier}</span>
      </td>
      <td>${app.documentType}</td>
      <td style="font-family:monospace; font-size:0.8rem;">${app.documentNumber}</td>
      <td>${app.submissionDate.split(' ')[0]}</td>
      <td><span style="font-size:0.8rem;">${app.deliveryMethod.includes('Ekspedisi') ? '📦 Ekspedisi' : '🏫 Loket TU Sekolah'}</span></td>
      <td>
        <span class="status-pill ${formatStatusClass(app.status)}">${app.status}</span>
      </td>
      <td style="text-align:center;">
        <div class="action-btn-group" style="justify-content:center;">
          <button class="btn-sm btn-sm-primary" onclick="openAdminActionModal('${app.id}')">
            Verifikasi
          </button>
          <button class="btn-sm btn-sm-secondary" onclick="fillAndTrack('${app.id}')" title="Lihat Status">
            Lacak
          </button>
          <button class="btn-sm btn-sm-secondary" onclick="simulateWhatsAppNotification(DataService.getApplicationById('${app.id}'))" title="Notifikasi WA">
            WA
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterAdminTable(status, chipBtn) {
  // Update chip active
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (chipBtn) chipBtn.classList.add('active');

  // Also update KPI cards active border
  document.querySelectorAll('.kpi-card').forEach(k => k.classList.remove('active'));

  renderAdminTable(status);
}

function filterAdminSearch() {
  const query = document.getElementById('adminSearchInput').value.toLowerCase().trim();
  const rows = document.querySelectorAll('#adminTableBody tr');
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}

function updateKpiCounters() {
  const apps = DataService.getApplications();
  const total = apps.length;
  const pending = apps.filter(a => a.status === 'Menunggu Verifikasi').length;
  const processing = apps.filter(a => a.status === 'Sedang Diproses').length;
  const ready = apps.filter(a => a.status === 'Siap Diambil').length;
  const done = apps.filter(a => a.status === 'Selesai').length;

  document.getElementById('kpiTotal').innerText = total;
  document.getElementById('kpiPending').innerText = pending;
  document.getElementById('kpiProcessing').innerText = processing;
  document.getElementById('kpiReady').innerText = ready;
  document.getElementById('kpiDone').innerText = done;

  const badge = document.getElementById('navPendingBadge');
  if (badge) {
    badge.innerText = pending;
    badge.style.display = pending > 0 ? 'inline-block' : 'none';
  }

  const statCounter = document.getElementById('statTotalCounter');
  if (statCounter) statCounter.innerText = (1480 + total).toLocaleString('id-ID');
}

function openAdminActionModal(appId) {
  const app = DataService.getApplicationById(appId);
  if (!app) return;

  document.getElementById('adminActionAppId').value = app.id;
  document.getElementById('adminStatusSelect').value = app.status;
  document.getElementById('adminOfficerInput').value = app.officerName !== '-' ? app.officerName : "Siti Nurjanah, M.Pd.";
  document.getElementById('adminOfficerNipInput').value = app.officerNip !== '-' ? app.officerNip : "19720415 199803 2 004";
  document.getElementById('adminNotesInput').value = app.verifierNotes || "";

  document.getElementById('adminActionDetails').innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <strong>${app.id} - ${app.applicantName}</strong>
      <span class="status-pill ${formatStatusClass(app.status)}">${app.status}</span>
    </div>
    <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
      <div>Dokumen: <strong>${app.documentType}</strong> (${app.documentNumber})</div>
      <div>Instansi: <strong>${app.institutionName}</strong></div>
      <div>Berkas Terunggah: <strong style="color:var(--primary-accent);">1 Berkas (KTP/Ijazah asli)</strong></div>
      <div>Pengambilan: <strong>${app.deliveryMethod}</strong></div>
    </div>
  `;

  openModal('adminActionModal');
}

function submitAdminUpdate() {
  const id = document.getElementById('adminActionAppId').value;
  const newStatus = document.getElementById('adminStatusSelect').value;
  const officerName = document.getElementById('adminOfficerInput').value.trim();
  const officerNip = document.getElementById('adminOfficerNipInput').value.trim();
  const notes = document.getElementById('adminNotesInput').value.trim();

  const updated = DataService.updateApplicationStatus(id, newStatus, officerName, officerNip, notes);
  if (updated) {
    showToast(`Status permohonan ${id} berhasil diperbarui menjadi ${newStatus}!`, 'success');
    closeModal('adminActionModal');
    renderAdminTable();
    updateKpiCounters();

    // If currently tracking this app, refresh view
    if (currentTrackedApp && currentTrackedApp.id === id) {
      renderTrackingCard(updated);
    }
  }
}

function exportDataToCsv() {
  const apps = DataService.getApplications();
  let csv = 'No Registrasi,Nama Pemohon,NISN/NIK,Jenis Dokumen,Nomor Ijazah,Jumlah Salinan,Status,Metode Pengambilan,Biaya Total,Tanggal Pengajuan\n';
  apps.forEach(a => {
    csv += `"${a.id}","${a.applicantName}","${a.identifier}","${a.documentType}","${a.documentNumber}",${a.copyCount},"${a.status}","${a.deliveryMethod}",${a.totalFee},"${a.submissionDate}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `rekapitulasi_legalisir_sdn_cipinang_melayu_03_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Laporan rekapitulasi legalisir SDN Cipinang Melayu 03 Pagi berhasil diunduh.', 'success');
}

function resetSampleDataPrompt() {
  if (confirm('Kembalikan semua data ke sampel bawaan awal SDN Cipinang Melayu 03 Pagi? Data permohonan baru yang belum disimpan akan direset.')) {
    DataService.resetToDefault();
    renderAdminTable();
    updateKpiCounters();
    showToast('Data sistem telah direset ke data sampel awal SDN Cipinang Melayu 03 Pagi.', 'info');
  }
}

/* ==========================================================================
   MODAL CONTROLS & RECEIPT / CERTIFICATE RENDERERS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showReceiptModal(app) {
  if (!app) return;
  const body = document.getElementById('receiptModalBody');
  body.innerHTML = `
    <div style="border:2px dashed var(--border-color); padding:24px; border-radius:12px; background:var(--bg-card); position:relative;">
      <div style="text-align:center; border-bottom:1px solid var(--border-color); padding-bottom:14px; margin-bottom:18px;">
        <h4 style="font-size:1.15rem; font-weight:800; color:var(--primary-accent); margin-bottom:2px;">BUKTI PENDAFTARAN LEGALISIR</h4>
        <p style="font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:2px;">SEKOLAH DASAR NEGERI CIPINANG MELAYU 03 PAGI</p>
        <p style="font-size:0.75rem; color:var(--text-muted);">Jl. Cipinang Bali II No. 1 / Jl. Elang, Cipinang Melayu, Makasar, Jakarta Timur</p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Nomor Registrasi Antrean</span>
          <h3 style="font-size:1.6rem; font-family:monospace; color:var(--primary-accent); margin:2px 0;">${app.id}</h3>
          <span style="font-size:0.75rem; color:var(--text-muted);">${app.submissionDate}</span>
        </div>
        <div id="receiptModalQr" style="width:72px; height:72px; padding:4px; background:#fff; border:1px solid var(--border-color); border-radius:6px;"></div>
      </div>

      <table style="width:100%; font-size:0.875rem; line-height:1.8; margin-bottom:20px;">
        <tr>
          <td style="color:var(--text-muted); width:40%;">Nama Pemohon</td>
          <td><strong>${app.applicantName}</strong></td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Nomor NISN / NIK</td>
          <td><strong>${app.identifier}</strong></td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Dokumen Legalisir</td>
          <td>${app.documentType} (${app.copyCount} Lembar)</td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Nomor Dokumen / Ijazah</td>
          <td><code>${app.documentNumber}</code></td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Berkas Diunggah</td>
          <td><span style="background:rgba(37,99,235,0.1); color:var(--primary-accent); padding:2px 8px; border-radius:4px; font-weight:600; font-size:0.8rem;">1 Berkas (KTP/Ijazah asli)</span></td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Metode Pengambilan</td>
          <td><strong>${app.deliveryMethod}</strong></td>
        </tr>
        <tr>
          <td style="color:var(--text-muted);">Total Biaya</td>
          <td><strong style="color:var(--emerald);">${app.totalFee === 0 ? 'GRATIS (Rp 0 - Layanan Sekolah Negeri)' : `Rp ${app.totalFee.toLocaleString('id-ID')} (${app.paymentStatus})`}</strong></td>
        </tr>
      </table>

      <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; font-size:0.775rem; color:var(--text-muted);">
        <strong>Petunjuk Pengambilan:</strong> Simpan tanda terima ini. Tunjukkan barcode QR kepada petugas Tata Usaha di SDN Cipinang Melayu 03 Pagi saat mengambil dokumen cetak legalisir fisik, atau gunakan nomor registrasi untuk melacak verifikasi berkas secara online.
      </div>
    </div>
  `;

  openModal('receiptModal');

  // Render QR inside modal
  setTimeout(() => {
    const qrContainer = document.getElementById('receiptModalQr');
    if (qrContainer && typeof QRCode !== 'undefined') {
      qrContainer.innerHTML = '';
      new QRCode(qrContainer, {
        text: `REG:${app.id}|SDN-CM03|NISN:${app.identifier}`,
        width: 64,
        height: 64
      });
    }
  }, 100);
}

function showOfficialCertModal(app) {
  if (!app) return;
  loadVerificationApp(app.id);
  switchView('verify');
}

function simulateWhatsAppNotification(app) {
  if (!app) return;
  const content = document.getElementById('whatsappMessageContent');
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  content.innerHTML = `
    <div style="font-weight:700; color:#075e54; margin-bottom:6px;">Halo Bapak/Ibu/Alumni ${app.applicantName},</div>
    <p>Pemberitahuan dari <strong>Tata Usaha SDN Cipinang Melayu 03 Pagi</strong>:</p>
    <p style="margin:8px 0;">Permohonan legalisir dokumen Anda dengan Nomor Registrasi <strong>${app.id}</strong> (${app.documentType}) saat ini berstatus: <span style="background:#d1fae5; color:#065f46; font-weight:700; padding:2px 6px; border-radius:4px;">${app.status.toUpperCase()}</span>.</p>
    <p style="margin-bottom:8px; font-style:italic;">"${app.verifierNotes}"</p>
    <div style="border-top:1px solid #eee; padding-top:6px; margin-top:8px; font-size:0.75rem; color:#666;">
      Lacak status & unduh e-legalisir lengkap: <br>
      <a href="javascript:void(0)" style="color:#0284c7; text-decoration:underline;">https://legalisir.sdncipinangmelayu03pagi.sch.id/track?id=${app.id}</a>
    </div>
    <div style="text-align:right; font-size:0.7rem; color:#999; margin-top:4px;">${now} WIB • Dibaca ✓✓</div>
  `;

  openModal('whatsappModal');
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close others optionally
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) {
    item.classList.add('open');
  }
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div style="flex:1;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
