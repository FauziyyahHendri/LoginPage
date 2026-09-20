(() => {
  const profileKey = 'moorasa-user-profile';

  const readProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(profileKey)) || {};
    } catch {
      return {};
    }
  };

  const writeProfile = (profile) => {
    localStorage.setItem(profileKey, JSON.stringify(profile));
  };

  const profileForm = document.getElementById('profile-form');

  if (profileForm) {
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');
    const birthdateInput = document.getElementById('profile-birthdate');
    const genderInput = document.getElementById('profile-gender');
    const bioInput = document.getElementById('profile-bio');
    const saveButton = document.getElementById('profile-save');
    const savedProfile = readProfile();

    nameInput.value = savedProfile.name || '';
    emailInput.value = savedProfile.email || '';
    phoneInput.value = savedProfile.tel || '';
    birthdateInput.value = savedProfile.birthdate || '';
    genderInput.value = savedProfile.gender || '';
    bioInput.value = savedProfile.bio || '';



    const updateSaveState = () => {
      saveButton.disabled = !(nameInput.value.trim() && emailInput.value.trim() && phoneInput.value.trim() && birthdateInput.value.trim() && genderInput.value.trim() && bioInput.value);
    };

    [nameInput, emailInput, phoneInput, birthdateInput, genderInput, bioInput].forEach((input) => {
      input.addEventListener('input', updateSaveState);
    });

    updateSaveState();

    saveButton.addEventListener('click', () => {
      if (saveButton.disabled) return;

      writeProfile({
        complete: true,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        birthdate: birthdateInput.value.trim(),
        gender: genderInput.value.trim(),
        bio: bioInput.value
      });

      window.location.href = 'profile.html';
    });
  }

  const profile = readProfile();

  const fillText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || '-';
  };

  fillText('display-name', profile.name || 'Pengguna MooRasa');
  fillText('display-email', profile.email);
  fillText('info-name', profile.name);
  fillText('info-email', profile.email);
  fillText('info-phone', profile.phone);
  fillText('info-birthdate', profile.birthdate);
  fillText('info-gender', profile.gender);
  fillText('info-bio', profile.bio);
  fillText('menu-name', profile.name || 'Pengguna MooRasa');
  fillText('menu-email', profile.email);

  const logoutButton = document.getElementById('logout-button');

  if (logoutButton) {
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogout = document.getElementById('cancel-logout');
    const confirmLogout = document.getElementById('confirm-logout');

    logoutButton.addEventListener('click', () => {
      logoutModal.classList.remove('hidden');
    });

    cancelLogout.addEventListener('click', () => {
      logoutModal.classList.add('hidden');
    });

    logoutModal.addEventListener('click', (event) => {
      if (event.target === logoutModal) {
        logoutModal.classList.add('hidden');
      }
    });

    confirmLogout.addEventListener('click', () => {
      window.location.href = '../../LoginPage/html/index.php';
    });
  }
})();
