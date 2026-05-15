document.addEventListener("DOMContentLoaded", () => {

    const translations = {
        ru: {
            rates: "Тарифы", contacts: "Контакты",
            subtitle: "Ваш идеальный отдых начинается здесь",
            contactBtn: "Связаться с нами",
            roomTitle: "Премиум Номер №",
            roomDesc: "Описание интерьера, вид из окна и уникальные особенности. Наслаждайтесь комфортом.",
            roomPrice: "Тариф: от 15 000₽ / ночь",
            contactsTitle: "Наши контакты", phone: "Телефон", email: "Почта", socials: "Соц. сети",
            ratesTitle: "Тарифы и услуги", rooms: "Номера", rate1: "от 8 000₽ / сутки", rate2: "от 15 000₽ / сутки", rate3: "от 45 000₽ / сутки",
            extra: "Доп. услуги", inc: "Включено", breakf: "Завтрак 'Шведский стол': 1 500₽", transf: "Трансфер из аэропорта: Бесплатно"
        },
        en: {
            rates: "Rates", contacts: "Contacts",
            subtitle: "Your perfect getaway starts here",
            contactBtn: "Contact Us",
            roomTitle: "Premium Room #",
            roomDesc: "Interior description, window view, and unique features. Enjoy your comfort.",
            roomPrice: "Rate: from 150€ / night",
            contactsTitle: "Our Contacts", phone: "Phone", email: "Email", socials: "Social Media",
            ratesTitle: "Rates & Services", rooms: "Rooms", rate1: "from 80€ / night", rate2: "from 150€ / night", rate3: "from 450€ / night",
            extra: "Extra Services", inc: "Included", breakf: "Buffet Breakfast: 15€", transf: "Airport Transfer: Free"
        },
        it: {
            rates: "Tariffe", contacts: "Contatti",
            subtitle: "La tua vacanza perfetta inizia qui",
            contactBtn: "Contattaci",
            roomTitle: "Camera Premium N°",
            roomDesc: "Descrizione degli interni, vista dalla finestra e caratteristiche uniche. Goditi il comfort.",
            roomPrice: "Tariffa: da 150€ / notte",
            contactsTitle: "I Nostri Contatti", phone: "Telefono", email: "Email", socials: "Social Media",
            ratesTitle: "Tariffe e Servizi", rooms: "Camere", rate1: "da 80€ / notte", rate2: "da 150€ / notte", rate3: "da 450€ / notte",
            extra: "Servizi Extra", inc: "Incluso", breakf: "Colazione a buffet: 15€", transf: "Trasferimento Aeroporto: Gratuito"
        }
    };

    let currentLang = 'ru'; 


    const gallery = document.getElementById('gallery');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });

    function renderGallery() {
        gallery.innerHTML = ''; 
        for (let i = 1; i <= 10; i++) {
            const card = document.createElement('div');
            card.className = 'room-card';
            card.innerHTML = `
                <div class="image-container">
                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" alt="Room ${i}">
                    <div class="vignette"></div>
                </div>
                <div class="room-info">
                    <h2>${translations[currentLang].roomTitle}${i}</h2>
                    <p>${translations[currentLang].roomDesc}</p>
                    <p><strong>${translations[currentLang].roomPrice}</strong></p>
                </div>
            `;
            gallery.appendChild(card);
        }
        setTimeout(() => {
            document.querySelectorAll('.room-card').forEach(card => observer.observe(card));
        }, 50);
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
        renderGallery(); 
    }


    renderGallery();


    const langLinks = document.querySelectorAll('#lang-menu a');
    const langBtnText = document.getElementById('current-lang');

    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = link.getAttribute('data-lang');
            langBtnText.innerHTML = `${currentLang.toUpperCase()} <span>▼</span>`;
            applyTranslations();
        });
    });


    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.documentElement.setAttribute('data-theme', themeToggle.checked ? 'dark' : 'light');
    });

    const modalContacts = document.getElementById('modal-contacts');
    const modalRates = document.getElementById('modal-rates');
    const btnContactsNav = document.getElementById('contacts-link');
    const btnContactsFooter = document.getElementById('contact-btn');
    const btnRatesNav = document.getElementById('rates-link');
    const closeBtns = document.querySelectorAll('.close-modal');

    [btnContactsNav, btnContactsFooter].forEach(btn => {
        btn.onclick = (e) => { e.preventDefault(); modalContacts.classList.add('show'); }
    });

    btnRatesNav.onclick = (e) => { e.preventDefault(); modalRates.classList.add('show'); }

    closeBtns.forEach(btn => {
        btn.onclick = () => { modalContacts.classList.remove('show'); modalRates.classList.remove('show'); }
    });

    window.onclick = (event) => {
        if (event.target == modalContacts || event.target == modalRates) {
            modalContacts.classList.remove('show'); modalRates.classList.remove('show');
        }
    }

    const footer = document.querySelector('.footer-zone');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) btnContactsFooter.classList.add('show');
            else btnContactsFooter.classList.remove('show');
        });
    }, { threshold: 0.5 });
    footerObserver.observe(footer);
});
