/* ══════════════════════════════════════════════════════════════
   GIGA IT · Deck — motor de navegación (cimientos)
   Genérico: recorre los .slide en orden de DOM. Las subpestañas se
   autogeneran desde data-title. Deep-linking por hash #tema/slide.
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Utilidades ─────────────────────────────────────────── */
  function slugify(str) {
    return String(str)
      .normalize("NFD").replace(/[̀-ͯ]/g, "") // quita acentos
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  /* ── DOM ────────────────────────────────────────────────── */
  const mainTabs = document.getElementById("mainTabs");
  const subTabs  = document.getElementById("subTabs");
  const dotsEl   = document.getElementById("dots");
  const prevBtn  = document.getElementById("prevBtn");
  const nextBtn  = document.getElementById("nextBtn");

  /* ── Recolección: lista global de slides en orden de DOM ── */
  const panels = Array.from(document.querySelectorAll(".panel[data-topic]"));
  const slides = [];

  panels.forEach(function (panel) {
    const topic = panel.dataset.topic;
    // Aviso si un .mtab no tiene su .panel pareja (o viceversa)
    if (!mainTabs.querySelector('.mtab[data-topic="' + topic + '"]')) {
      console.warn('[deck] panel sin .mtab pareja: data-topic="' + topic + '"');
    }
    Array.from(panel.querySelectorAll(".slide")).forEach(function (slideEl, i) {
      const title = slideEl.dataset.title || "Slide " + (i + 1);
      slides.push({
        topic: topic,
        panel: panel,
        el: slideEl,
        title: title,
        slug: slugify(title),
        globalIndex: slides.length
      });
    });
  });

  let current = 0;

  /* ── Render ─────────────────────────────────────────────── */
  function render() {
    const slide = slides[current];
    if (!slide) return;

    // Paneles y slides
    panels.forEach(function (p) { p.classList.toggle("active", p === slide.panel); });
    slides.forEach(function (s) { s.el.classList.toggle("active", s === slide); });

    // Pestañas de tema
    Array.from(mainTabs.querySelectorAll(".mtab")).forEach(function (t) {
      const on = t.dataset.topic === slide.topic;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });

    renderSubTabs(slide);
    renderDots(slide);

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;

    updateHash(slide);
  }

  /* ── Subpestañas: autogeneradas del tema activo ─────────── */
  function renderSubTabs(slide) {
    const topicSlides = slides.filter(function (s) { return s.topic === slide.topic; });
    subTabs.innerHTML = "";
    topicSlides.forEach(function (s) {
      const btn = document.createElement("button");
      btn.className = "subtab" + (s === slide ? " active" : "");
      btn.textContent = s.title;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", s === slide ? "true" : "false");
      btn.addEventListener("click", function () { goTo(s.globalIndex); });
      subTabs.appendChild(btn);
    });
  }

  /* ── Dots: recorrido global ─────────────────────────────── */
  function renderDots(slide) {
    dotsEl.innerHTML = "";
    slides.forEach(function (s) {
      const dot = document.createElement("button");
      dot.className = "dot" + (s === slide ? " active" : "");
      dot.setAttribute("aria-label", "Ir a " + s.topic + " · " + s.title);
      dot.addEventListener("click", function () { goTo(s.globalIndex); });
      dotsEl.appendChild(dot);
    });
  }

  /* ── Navegación ─────────────────────────────────────────── */
  function goTo(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    render();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function firstSlideOfTopic(topic) {
    const s = slides.find(function (x) { return x.topic === topic; });
    return s ? s.globalIndex : 0;
  }

  /* ── Deep-linking (#tema/slug) ──────────────────────────── */
  function updateHash(slide) {
    const hash = "#" + slide.topic + "/" + slide.slug;
    if (location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }

  function indexFromHash() {
    const raw = location.hash.replace(/^#/, "");
    if (!raw) return null;
    const parts = raw.split("/");
    const topic = parts[0];
    const slug = parts[1];
    let match = slides.find(function (s) { return s.topic === topic && s.slug === slug; });
    if (!match && topic) {
      match = slides.find(function (s) { return s.topic === topic; }); // fallback: portada del tema
    }
    return match ? match.globalIndex : null;
  }

  /* ── Eventos ────────────────────────────────────────────── */
  mainTabs.addEventListener("click", function (e) {
    const tab = e.target.closest(".mtab");
    if (!tab) return;
    goTo(firstSlideOfTopic(tab.dataset.topic));
  });

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", function (e) {
    const el = document.activeElement;
    const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    if (typing) return;

    switch (e.key) {
      case "ArrowLeft":
      case "PageUp":
      case "Backspace":
        e.preventDefault(); prev(); break;
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault(); next(); break;
    }
  });

  window.addEventListener("hashchange", function () {
    const i = indexFromHash();
    if (i !== null && i !== current) goTo(i);
  });

  /* ── Stepper .pipe genérico (delegación global) ─────────── */
  document.addEventListener("click", function (e) {
    const tab = e.target.closest(".pipe-tab[data-step]");
    if (!tab) return;
    const pipe = tab.closest(".pipe");
    if (!pipe) return;
    const step = tab.dataset.step;

    pipe.querySelectorAll(".pipe-tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.step === step);
    });
    pipe.querySelectorAll(".pipe-panel").forEach(function (p) {
      const on = p.dataset.step === step;
      p.classList.toggle("active", on);
      if (on) { p.classList.remove("run"); void p.offsetWidth; p.classList.add("run"); }
    });
  });

  /* ── Arranque ───────────────────────────────────────────── */
  const start = indexFromHash();
  current = start !== null ? start : 0;
  render();
})();
