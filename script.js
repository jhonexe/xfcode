
(() => {
  "use strict";

  const config = window.LOVE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);

  const name = config.girlfriendName || "Arlette";
  const nickname = config.nickname || "bby";

  // Personalizar el nombre y el mensaje final.
  document.title = `Para ${name} ❤️`;

  const heroName = $(".hero h1");
  heroName.innerHTML =
    `${escapeHTML(name)} <span class="name-heart">♥</span>`;

  $(".letter-card h2").innerHTML =
    `Mi querida <em>${escapeHTML(name)}</em>,`;

  $(".brand").textContent = `♥ PARA ${name.toUpperCase()}`;
  $("#modal-title").textContent = `${name}, mi ${nickname}`;
  $("#modal-message").textContent = config.finalMessage ||
    `Mi querida ${name}, eres muy especial para mí. Te quiero muchísimo. ♥`;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  // CONTADOR: días, horas, minutos y segundos.
  function updateCounter() {
    const start = new Date(
      config.startDate || "2026-08-14T00:00:00"
    ).getTime();

    const elapsed = Number.isFinite(start)
      ? Math.max(0, Date.now() - start)
      : 0;

    const total = Math.floor(elapsed / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    $("#days").textContent = days;
    $("#hours").textContent = String(hours).padStart(2, "0");
    $("#minutes").textContent = String(minutes).padStart(2, "0");
    $("#seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCounter();
  window.setInterval(updateCounter, 1000);

  // TARJETAS INTERACTIVAS.
  document.querySelectorAll(".reason-card").forEach((card) => {
    card.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
    });
  });

  // MENÚ PARA MÓVILES.
  const menuToggle = $("#menu-toggle");
  const nav = $("#nav");

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // MÚSICA OPCIONAL.
  const audio = $("#background-audio");
  const musicButton = $("#music-button");
  const musicLabel = $("#music-label");
  const equalizer = $("#equalizer");

  if (config.musicUrl) {
    audio.src = config.musicUrl;
  }

  musicButton.addEventListener("click", async () => {
    if (!config.musicUrl) {
      alert(
        "Añade el enlace directo de tu canción MP3 u OGG " +
        "en config.js, dentro de musicUrl."
      );
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
        musicLabel.textContent = "Pausar música";
        musicButton.classList.add("playing");
        equalizer.classList.add("active");
      } else {
        audio.pause();
        musicLabel.textContent = "Activar música";
        musicButton.classList.remove("playing");
        equalizer.classList.remove("active");
      }
    } catch (error) {
      alert(
        "No se pudo reproducir la canción. Comprueba que " +
        "musicUrl sea un enlace directo válido."
      );
    }
  });

  audio.addEventListener("ended", () => {
    musicLabel.textContent = "Activar música";
    musicButton.classList.remove("playing");
    equalizer.classList.remove("active");
  });

  // SORPRESA FINAL.
  const modal = $("#modal");
  const finalButton = $("#final-button");

  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $("#modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    finalButton.focus();
  }

  finalButton.addEventListener("click", openModal);
  $("#modal-close").addEventListener("click", closeModal);
  $("#modal-ok").addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // CORAZONES BRILLANTES FLOTANDO.
  const canvas = $("#heart-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = Array.from({
      length: width < 600 ? 18 : 32
    }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 3 + Math.random() * 8,
      speed: 0.15 + Math.random() * 0.45,
      alpha: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 16, size / 16);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ff315a";
    ctx.shadowColor = "#ff174b";
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.bezierCurveTo(-13, -3, -8, -12, 0, -5);
    ctx.bezierCurveTo(8, -12, 13, -3, 0, 5);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.phase += 0.012;
      particle.x += Math.sin(particle.phase) * 0.18;

      if (particle.y < -20) {
        particle.y = height + 20;
        particle.x = Math.random() * width;
      }

      drawHeart(
        particle.x,
        particle.y,
        particle.size,
        particle.alpha * (0.7 + Math.sin(particle.phase) * 0.3)
      );
    });

    if (!reduceMotion) {
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();
})();
