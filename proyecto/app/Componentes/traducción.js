// app/traducción.js

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userNameInput = document.getElementById('userName');
    const languageSelect = document.getElementById('languageSelect');
    const welcomeSection = document.getElementById('welcomeSection');

    // Traducciones
    const translations = {
        en: {
            title: "Sustainable Sound",
            logo: "Sustainable Sound",
            nav_new: "New Releases",
            nav_bestsellers: "Best Sellers",
            nav_genres: "Genres",
            nav_promoted: "Promoted",
            nav_cart: "Cart",
            welcome_message: "Dive into the Earth's Sound",
            welcome_description: "Discover sustainable music with records made from recycled materials",
            label_name: "Name:",
            btn_save: "Save",
            promoted_title: "Promoted Records",
            product_name: "Record Name",
            btn_add_cart: "Add to Cart",
            footer_text: "&copy; 2023 Sustainable Sound. All rights reserved."
        },
        es: {
            title: "Sustainable Sound",
            logo: "Sustainable Sound",
            nav_new: "Nuevos",
            nav_bestsellers: "Más vendidos",
            nav_genres: "Géneros",
            nav_promoted: "Promocionados",
            nav_cart: "Carrito",
            welcome_message: "\"Sumérgete en el Sonido de la Tierra\"",
            welcome_description: "Descubre música sostenible con discos hechos de materiales reciclados",
            label_name: "Nombre:",
            btn_save: "Guardar",
            promoted_title: "Discos Promocionados",
            product_name: "Nombre Disco",
            btn_add_cart: "Agregar al Carrito",
            footer_text: "&copy; 2023 Sustainable Sound. Todos los derechos reservados."
        }
        // Puedes agregar más idiomas aquí
    };

    // Función para traducir la página
    function translatePage(language) {
        // Traducir elementos con atributo data-key
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });

        // Cambiar el atributo lang del html
        document.documentElement.lang = language;

        // Actualizar el título de la página
        document.title = translations[language]['title'];
    }

    // Función para cargar datos desde Local Storage
    function loadUserData() {
        const storedName = localStorage.getItem('userName');
        const storedLanguage = localStorage.getItem('preferredLanguage') || 'es';

        // Establecer el idioma seleccionado
        languageSelect.value = storedLanguage;
        translatePage(storedLanguage);

        if (storedName) {
            // Ocultar el formulario y mostrar un mensaje de bienvenida
            welcomeSection.innerHTML = `
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h2>${translations[storedLanguage].welcome_message}</h2>
                        <p>${translations[storedLanguage].welcome_description}</p>
                        <h4>${storedName}, ¡bienvenido a Sustainable Sound!</h4>
                    </div>
                </div>
            `;
        } else {
            // Mostrar el formulario
            welcomeSection.style.display = 'block';
        }
    }

    // Evento para manejar el cambio de idioma
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        translatePage(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage);
    });

    // Evento para manejar el formulario del usuario
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = userNameInput.value.trim();
        const selectedLanguage = languageSelect.value;

        if (userName) {
            localStorage.setItem('userName', userName);
            localStorage.setItem('preferredLanguage', selectedLanguage);
            loadUserData();
        }
    });

    // Inicializar la página
    loadUserData();
});
