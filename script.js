document.addEventListener('DOMContentLoaded', () => {
  // 1. Año dinámico
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Control de Tema Claro / Oscuro orgánico
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const rootElement = document.documentElement;

  const applyOrganicTheme = (theme) => {
    rootElement.setAttribute('data-bs-theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun text-warning';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  };

  // Leer estado guardado o usar el valor predeterminado del HTML
  const currentSavedTheme = localStorage.getItem('portfolio-organic-theme') || rootElement.getAttribute('data-bs-theme') || 'light';
  applyOrganicTheme(currentSavedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTheme = rootElement.getAttribute('data-bs-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';

      localStorage.setItem('portfolio-organic-theme', targetTheme);
      applyOrganicTheme(targetTheme);
    });
  }

  // 3. Cerrar el menú colapsable en móviles al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 4. Validación del Formulario de Contacto
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = [
      { id: 'nombre', validate: val => val.trim().length > 0 },
      { id: 'correo', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
      { id: 'asunto', validate: val => val.trim().length > 0 },
      { id: 'mensaje', validate: val => val.trim().length > 0 }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group-sage');
          if (group && field.validate(input.value)) {
            group.classList.remove('has-error');
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      let isFormValid = true;

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
          const group = input.closest('.form-group-sage');
          if (!field.validate(input.value)) {
            isFormValid = false;
            if (group) group.classList.add('has-error');
          } else {
            if (group) group.classList.remove('has-error');
          }
        }
      });

      if (!isFormValid) {
        e.preventDefault();
      }
    });
  }
});
