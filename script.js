(function () {
  'use strict';

  /* ---- Saludo personalizado vía ?invitado=Nombre_Persona ---- */
  const params = new URLSearchParams(window.location.search);
  const rawGuest = params.get('invitado');

  let guestName = 'Querido Invitado';
  if (rawGuest) {
    const cleaned = rawGuest.replace(/_/g, ' ').trim();
    if (cleaned !== '') {
      guestName = cleaned;
    }
  }

  const greetingEnvelope = document.getElementById('greetingEnvelope');
  const greetingHero = document.getElementById('greetingHero');
  if (greetingEnvelope) greetingEnvelope.textContent = guestName;
  if (greetingHero) greetingHero.textContent = guestName;

  /* ---- Inicializa AOS si está disponible ---- */
  if (window.AOS) {
    window.AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic', offset: 50 });
  }

  /* ---- Revelado de bloques al hacer scroll (fallback sin AOS) ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

 /* ---- Cuenta regresiva en vivo hasta la boda ---- */

const weddingDate = new Date('2026-09-11T16:00:00');

const elDays = document.getElementById('cdDays');
const elHours = document.getElementById('cdHours');
const elMinutes = document.getElementById('cdMinutes');
const elSeconds = document.getElementById('cdSeconds');

const envDays = document.getElementById('envDays');
const envHours = document.getElementById('envHours');
const envMinutes = document.getElementById('envMinutes');
const envSeconds = document.getElementById('envSeconds');

function pad(n) {
    return String(n).padStart(2, '0');
}

function updateCountdown() {

    const diff = weddingDate.getTime() - Date.now();

    if (diff <= 0) {

        const elements = [
            elDays,
            elHours,
            elMinutes,
            elSeconds,
            envDays,
            envHours,
            envMinutes,
            envSeconds
        ];

        elements.forEach(function (element) {
            if (element) {
                element.textContent = '00';
            }
        });

        clearInterval(timer);
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    /* Cuenta regresiva principal */
    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);

    /* Cuenta regresiva del sobre */
    if (envDays) envDays.textContent = pad(days);
    if (envHours) envHours.textContent = pad(hours);
    if (envMinutes) envMinutes.textContent = pad(minutes);
    if (envSeconds) envSeconds.textContent = pad(seconds);
}

updateCountdown();

const timer = setInterval(updateCountdown, 1000);

  /* ---- Apertura del sobre: fade-out y desbloqueo de scroll ---- */
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const waxSeal = document.getElementById('waxSeal');
  const body = document.body;

  function openInvitation() {
    envelopeOverlay.classList.add('is-open');
    setTimeout(function () {
      body.classList.remove('locked');
      if (window.AOS) window.AOS.refresh();
      setTimeout(function () {
        envelopeOverlay.remove();
      }, 700);
    }, 600);
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', function (e) {
      e.stopPropagation();
      openInvitation();
    });
  }

  /* ---- Barra de progreso de lectura ---- */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  });

  /* ---- RSVP: confirmación por WhatsApp ---- */
  const telefonoHermana = "528446788815";
  const rsvpBtn = document.getElementById('rsvpBtn');
  const rsvpMessage = document.getElementById('rsvpMessage');

  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', function () {
      const mensaje = "¡Hola! Confirmo mi asistencia para la boda de Viridiana & Jonathan.";
      const url = `https://wa.me/${telefonoHermana}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      if (rsvpMessage) {
        rsvpMessage.textContent = 'Te estamos redirigiendo a WhatsApp para confirmar tu asistencia...';
        rsvpMessage.classList.remove('rsvp-error');
        rsvpMessage.classList.add('rsvp-success');
      }
    });
  }
})();

/* =========================================================
   EFECTO MÁQUINA DE ESCRIBIR - VERSÍCULO
========================================================= */

const bibleVerse = document.getElementById('bibleVerse');
const verseRef = document.getElementById('verseRef');

const verseText =
    '“Porque iré a donde tú vayas, y viviré donde tú vivas. ' +
    'Tu pueblo será mi pueblo, y tu Dios será mi Dios.”';

let verseStarted = false;

function typeBibleVerse() {

    if (!bibleVerse || verseStarted) return;

    verseStarted = true;

    let index = 0;

    bibleVerse.textContent = '';

    const typingSpeed = 48;

    function typeCharacter() {

        if (index < verseText.length) {

            bibleVerse.textContent += verseText.charAt(index);

            index++;

            setTimeout(typeCharacter, typingSpeed);

        } else {

            if (verseRef) {
                verseRef.classList.add('verse-ref-visible');
            }

        }
    }

    typeCharacter();
}


/* Detectar cuando el versículo entra en pantalla */

const verseObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                typeBibleVerse();

                verseObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.35
    }
);

if (bibleVerse) {
    verseObserver.observe(bibleVerse);
}
