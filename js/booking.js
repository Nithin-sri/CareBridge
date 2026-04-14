// ============================================================
//  BOOKING PAGE — Form & Session Selection
// ============================================================

// ── Pre-select session type from quick access cards ──
function selectSession(sessionName) {
  const select = document.getElementById('sessionType');
  if (!select) return;

  // Find and select matching option
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === sessionName) {
      select.selectedIndex = i;
      break;
    }
  }

  // Highlight selected quick-access card
  document.querySelectorAll('.qa-card').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget?.classList.add('selected');

  // Scroll smoothly to form
  document.querySelector('.booking-section')?.scrollIntoView({
    behavior: 'smooth', block: 'start'
  });
}

document.addEventListener('DOMContentLoaded', () => {

  const form          = document.getElementById('bookingForm');
  const successDiv    = document.getElementById('bookingSuccess');
  const successDetails= document.getElementById('successDetails');

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('preferredDate');
  const dobInput  = document.getElementById('dob');
  if (dateInput) dateInput.setAttribute('min', today);
  if (dobInput)  dobInput.setAttribute('max', today);

  // ── Validation helpers ──
  function showError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field)  field.classList.add('error');
    if (error)  error.classList.add('visible');
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field)  field.classList.remove('error');
    if (error)  error.classList.remove('visible');
  }

  // Clear errors on input
  const fields = [
    { field: 'firstName',     error: 'firstNameError' },
    { field: 'lastName',      error: 'lastNameError' },
    { field: 'email',         error: 'emailError' },
    { field: 'dob',           error: 'dobError' },
    { field: 'sessionType',   error: 'sessionTypeError' },
    { field: 'preferredDate', error: 'preferredDateError' },
    { field: 'preferredTime', error: 'preferredTimeError' },
  ];

  fields.forEach(({ field, error }) => {
    const el = document.getElementById(field);
    if (el) el.addEventListener('input', () => clearError(field, error));
    if (el) el.addEventListener('change', () => clearError(field, error));
  });

  // ── Form submission ──
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Validate required fields
      const firstName     = document.getElementById('firstName');
      const lastName      = document.getElementById('lastName');
      const email         = document.getElementById('email');
      const dob           = document.getElementById('dob');
      const sessionType   = document.getElementById('sessionType');
      const prefDate      = document.getElementById('preferredDate');
      const prefTime      = document.getElementById('preferredTime');
      const consent1      = document.getElementById('consent1');
      const consent2      = document.getElementById('consent2');

      if (!firstName?.value.trim()) { showError('firstName', 'firstNameError'); valid = false; }
      if (!lastName?.value.trim())  { showError('lastName',  'lastNameError');  valid = false; }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email?.value.trim() || !emailRegex.test(email.value)) {
        showError('email', 'emailError'); valid = false;
      }

      if (!dob?.value)           { showError('dob',           'dobError');           valid = false; }
      if (!sessionType?.value)   { showError('sessionType',   'sessionTypeError');   valid = false; }
      if (!prefDate?.value)      { showError('preferredDate', 'preferredDateError'); valid = false; }
      if (!prefTime?.value)      { showError('preferredTime', 'preferredTimeError'); valid = false; }

      if (!consent1?.checked) {
        document.getElementById('consent1Error')?.classList.add('visible'); valid = false;
      } else {
        document.getElementById('consent1Error')?.classList.remove('visible');
      }

      if (!consent2?.checked) {
        document.getElementById('consent2Error')?.classList.add('visible'); valid = false;
      } else {
        document.getElementById('consent2Error')?.classList.remove('visible');
      }

      if (!valid) {
        // Scroll to first error
        document.querySelector('.error, .form-error.visible')?.scrollIntoView({
          behavior: 'smooth', block: 'center'
        });
        return;
      }

      // ── Show success ──
      const timeMap = {
        '07:00':'7:00 AM','08:00':'8:00 AM','09:00':'9:00 AM',
        '10:00':'10:00 AM','11:00':'11:00 AM','12:00':'12:00 PM',
        '13:00':'1:00 PM','14:00':'2:00 PM','15:00':'3:00 PM',
        '16:00':'4:00 PM','17:00':'5:00 PM','18:00':'6:00 PM','19:00':'7:00 PM'
      };

      const bookingDate = new Date(prefDate.value);
      const formattedDate = bookingDate.toLocaleDateString('en-GB', {
        weekday:'long', year:'numeric', month:'long', day:'numeric'
      });

      if (successDetails) {
        successDetails.innerHTML = `
          <strong>Name:</strong> ${firstName.value} ${lastName.value}<br>
          <strong>Email:</strong> ${email.value}<br>
          <strong>Session:</strong> ${sessionType.value}<br>
          <strong>Date:</strong> ${formattedDate}<br>
          <strong>Time:</strong> ${timeMap[prefTime.value] || prefTime.value}
        `;
      }

      form.style.display = 'none';
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});