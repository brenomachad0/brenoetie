// ============================================================
// Tiê & Breno — main.js
// ============================================================
import { initPetals } from "./petals.js";
import { initFloral } from "./flora.js";

const { gsap } = window;
gsap.registerPlugin(window.ScrollTrigger);
const ScrollTrigger = window.ScrollTrigger;

/* ------------------------------------------------------------------
   1. CONFIG — ajuste rápido
------------------------------------------------------------------ */
const CONFIG = {
  // Cole aqui a URL do seu Google Apps Script (ver GUIA.md). Deixe "" para desativar o envio real.
  RSVP_ENDPOINT: "",
  // Data/hora da cerimônia (horário de Brasília, UTC-3)
  WEDDING_DATE: "2026-10-03T15:00:00-03:00",
  // Links de mapa
  MAP_CHURCH: "https://www.google.com/maps/search/?api=1&query=Par%C3%B3quia+do+Verbo+Divino+SGAN+609+Asa+Norte+Bras%C3%ADlia",
  MAP_VENUE: "https://www.google.com/maps/search/?api=1&query=N%C3%BAcleo+Rural+Lago+Oeste+Rua+4+Ch%C3%A1cara+5+Sobradinho+DF",
  PIX_PAYLOAD: "00020126360014br.gov.bcb.pix0114+55619962619575204000053039865802BR5919BRENO NEIVA MACHADO6008BRASILIA62070503***63042709",
  PIX_KEY: "(61) 99626-1957",
};

/* ------------------------------------------------------------------
   2. i18n
------------------------------------------------------------------ */
const I18N = {
  pt: {
    "nav.story": "História", "nav.gallery": "Galeria", "nav.info": "Local",
    "nav.rsvp": "Presença", "nav.gifts": "Presentes",
    "hero.eyebrow": "Vamos casar",
    "hero.date": "03 · Outubro · 2026", "hero.place": "Brasília · DF",
    "hero.cue": "role para descobrir",
    "count.eyebrow": "Contagem regressiva",
    "count.title": "Faltam poucos instantes para o nosso sim",
    "count.days": "dias", "count.hours": "horas", "count.min": "minutos", "count.sec": "segundos",
    "count.married": "Hoje é o grande dia! 🤍",
    "story.eyebrow": "Nossa história",
    "story.title": "De um pôr do sol<br>para a vida inteira",
    "story.lead": "Toda grande história tem um capítulo que muda tudo. A nossa começou muito antes do “sim” — e continua sendo escrita todos os dias.",
    "story.b1.num": "i.", "story.b1.tag": "onde tudo floresce",
    "story.b1.h": "Antes de qualquer promessa, já éramos lar",
    "story.b1.p1": "Antes das alianças, vieram os dias comuns que viraram extraordinários: as risadas de manhã, as mãos pequenas segurando as nossas, a casa cheia de vida.",
    "story.b1.p2": "Descobrimos que amor de verdade não é um instante — é uma construção, tijolo por tijolo, abraço por abraço.",
    "story.b2.num": "ii.", "story.b2.tag": "os dois",
    "story.b2.h": "Entre o cerrado e o céu, só nós",
    "story.b2.p1": "Há um lugar onde o horizonte se abre e o tempo desacelera. Foi ali, testa colada na testa, que entendemos: é com você que eu quero envelhecer.",
    "story.b3.num": "iii.", "story.b3.tag": "o plano",
    "story.b3.h": "Um terraço, uma canção, a cidade aos nossos pés",
    "story.b3.p1": "No alto de um prédio em Brasília, com um violão tocando baixinho e o sol se despedindo, cada detalhe foi pensado para um único momento.",
    "story.b3.p2": "O coração já sabia a resposta antes mesmo da pergunta.",
    "story.b4.num": "iv.", "story.b4.tag": "a pergunta",
    "story.b4.h": "“Casa comigo?”",
    "story.b4.p1": "O sol tocou o horizonte, um joelho tocou o chão, e três palavras mudaram tudo. Contra a luz dourada, o futuro inteiro coube num só instante.",
    "story.b5.num": "v.", "story.b5.tag": "o sim",
    "story.b5.h": "E as luzes da cidade viraram testemunhas",
    "story.b5.p1": "Quando a noite chegou, já não éramos mais dois planejando um pedido — éramos dois começando o resto da vida. Agora queremos você ao nosso lado para celebrar.",
    "quote": "“E de repente, para sempre não parecia tempo suficiente.”",
    "quote.who": "Tiê & Breno",
    "gallery.eyebrow": "Momentos", "gallery.title": "Nossos instantes favoritos",
    "gallery.hint": "clique para ampliar",
    "details.eyebrow": "Quando & onde", "details.title": "O grande dia",
    "details.ceremony.kicker": "Cerimônia", "details.ceremony.name": "Paróquia do Verbo Divino",
    "details.ceremony.addr": "SGAN 609, Módulo C · L2 Norte<br>Asa Norte · Brasília — DF",
    "details.reception.kicker": "Recepção", "details.reception.name": "Núcleo Rural Lago Oeste",
    "details.reception.addr": "Rua 4, Chácara 5<br>Lago Oeste · Sobradinho — DF",
    "details.reception.time": "logo após a cerimônia",
    "details.map": "Ver no mapa",
    "dress.kicker": "Traje", "dress.text": "Traje social · esporte fino",
    "dress.note": "Inspire-se nas nossas cores",
    "rsvp.eyebrow": "Confirmação", "rsvp.title": "Você faz parte<br>dessa história",
    "rsvp.lead": "Sua presença é o nosso maior presente. Por favor, confirme até 15 de setembro de 2026.",
    "rsvp.name": "Nome completo", "rsvp.guests": "Número de acompanhantes",
    "rsvp.attend": "Você vai comparecer?", "rsvp.yes": "Sim, eu vou!", "rsvp.no": "Não poderei ir",
    "rsvp.submit": "Confirmar presença",
    "rsvp.sending": "Enviando...",
    "rsvp.ok": "Presença registrada. Obrigado — mal podemos esperar! 🤍",
    "rsvp.no_ok": "Recebido. Sentiremos sua falta, mas obrigado por avisar! 🤍",
    "rsvp.err": "Não foi possível enviar agora. Tente novamente em instantes.",
    "rsvp.fillname": "Por favor, preencha seu nome.",
    "rsvp.notset": "Formulário ainda não conectado à planilha (ver GUIA.md).",
    "gifts.eyebrow": "Presentes", "gifts.title": "Nossa lista de sonhos",
    "gifts.lead": "O que mais queremos é te ver na festa. Mas se quiser nos presentear, escolhemos alguns “presentes” cheios de significado — tudo via Pix, com todo carinho.",
    "gifts.give": "Presentear",
    "gift.1.n": "Um pôr do sol a dois", "gift.1.d": "Para repetirmos aquele fim de tarde que mudou tudo.",
    "gift.2.n": "Cafés da manhã na cama", "gift.2.d": "Um mês de manhãs preguiçosas e sem pressa.",
    "gift.3.n": "Jantar à luz de velas", "gift.3.d": "Uma noite só nossa, do jeitinho que a gente gosta.",
    "gift.4.n": "Trecho da lua de mel", "gift.4.d": "Ajude a nos levar para o próximo destino do mapa.",
    "gift.5.n": "Uma noite à beira-mar", "gift.5.d": "Som das ondas, mãos dadas e zero despertador.",
    "gift.6.n": "Brinde da nossa história", "gift.6.d": "Uma taça para celebrar cada capítulo que virá.",
    "gift.7.n": "Babá para um date night", "gift.7.d": "Para a gente fugir a dois — enquanto alguém segura as pontas com a criançada.",
    "gift.8.n": "A primeira dança", "gift.8.d": "Aquela música, a gente rodando, o mundo parando.",
    "gift.9.n": "Flores da estação", "gift.9.d": "Para a casa nunca perder o cheiro de festa.",
    "gifts.credits": "Fotos ilustrativas: David N Cooper, happyskrappy, Swami Stream, mrlins, Sam Howzit e tdlucas5000 (CC BY) · demais em domínio público (CC0) · via Openverse.",
    "pix.title": "Chave Pix", "pix.who": "Breno Neiva Machado · Santander",
    "pix.copy": "Copiar código", "pix.copied": "Copiado! ✓", "pix.copycode": "Copiar Pix copia-e-cola",
    "footer.hashtag": "#BrenoETie2026",
    "footer.date": "03 de Outubro de 2026 · Brasília",
    "footer.credit": 'Feito com carinho · Fotos por <a href="#">Frederico Gomes Photography</a>',
  },
  en: {
    "nav.story": "Story", "nav.gallery": "Gallery", "nav.info": "Venue",
    "nav.rsvp": "RSVP", "nav.gifts": "Gifts",
    "hero.eyebrow": "We're getting married",
    "hero.date": "October · 03 · 2026", "hero.place": "Brasília · Brazil",
    "hero.cue": "scroll to discover",
    "count.eyebrow": "Countdown",
    "count.title": "Just a few moments until our “I do”",
    "count.days": "days", "count.hours": "hours", "count.min": "minutes", "count.sec": "seconds",
    "count.married": "Today is the big day! 🤍",
    "story.eyebrow": "Our story",
    "story.title": "From one sunset<br>to a lifetime",
    "story.lead": "Every great story has a chapter that changes everything. Ours began long before the “yes” — and it's still being written every day.",
    "story.b1.num": "i.", "story.b1.tag": "where it all blooms",
    "story.b1.h": "Before any promise, we were already home",
    "story.b1.p1": "Before the rings came the ordinary days that turned extraordinary: morning laughter, tiny hands holding ours, a home full of life.",
    "story.b1.p2": "We learned that real love isn't a single moment — it's built, brick by brick, hug by hug.",
    "story.b2.num": "ii.", "story.b2.tag": "the two of us",
    "story.b2.h": "Between the open savanna and the sky, just us",
    "story.b2.p1": "There's a place where the horizon opens and time slows down. It was there, forehead to forehead, that we knew: you're the one I want to grow old with.",
    "story.b3.num": "iii.", "story.b3.tag": "the plan",
    "story.b3.h": "A rooftop, a song, the city at our feet",
    "story.b3.p1": "High above Brasília, with a guitar playing softly and the sun saying goodbye, every detail was made for a single moment.",
    "story.b3.p2": "The heart already knew the answer before the question.",
    "story.b4.num": "iv.", "story.b4.tag": "the question",
    "story.b4.h": "“Will you marry me?”",
    "story.b4.p1": "The sun touched the horizon, a knee touched the ground, and three words changed everything. Against the golden light, a whole future fit into one instant.",
    "story.b5.num": "v.", "story.b5.tag": "the yes",
    "story.b5.h": "And the city lights became our witnesses",
    "story.b5.p1": "When night fell, we were no longer two people planning a proposal — we were two people beginning the rest of our lives. Now we want you by our side to celebrate.",
    "quote": "“And all at once, forever didn't feel like enough time.”",
    "quote.who": "Tiê & Breno",
    "gallery.eyebrow": "Moments", "gallery.title": "Our favorite instants",
    "gallery.hint": "click to enlarge",
    "details.eyebrow": "When & where", "details.title": "The big day",
    "details.ceremony.kicker": "Ceremony", "details.ceremony.name": "Verbo Divino Parish",
    "details.ceremony.addr": "SGAN 609, Module C · L2 Norte<br>Asa Norte · Brasília — DF",
    "details.reception.kicker": "Reception", "details.reception.name": "Lago Oeste Country Estate",
    "details.reception.addr": "Rua 4, Chácara 5<br>Lago Oeste · Sobradinho — DF",
    "details.reception.time": "right after the ceremony",
    "details.map": "Open in maps",
    "dress.kicker": "Dress code", "dress.text": "Formal · cocktail attire",
    "dress.note": "Take a cue from our colors",
    "rsvp.eyebrow": "RSVP", "rsvp.title": "You're part<br>of this story",
    "rsvp.lead": "Your presence is our greatest gift. Please confirm by September 15, 2026.",
    "rsvp.name": "Full name", "rsvp.guests": "Number of guests",
    "rsvp.attend": "Will you attend?", "rsvp.yes": "Yes, I'll be there!", "rsvp.no": "Sorry, I can't make it",
    "rsvp.submit": "Confirm attendance",
    "rsvp.sending": "Sending...",
    "rsvp.ok": "You're on the list. Thank you — we can't wait! 🤍",
    "rsvp.no_ok": "Noted. We'll miss you, but thank you for letting us know! 🤍",
    "rsvp.err": "Couldn't send right now. Please try again in a moment.",
    "rsvp.fillname": "Please enter your name.",
    "rsvp.notset": "Form not yet connected to the spreadsheet (see GUIA.md).",
    "gifts.eyebrow": "Gifts", "gifts.title": "Our wishlist",
    "gifts.lead": "All we truly want is to see you at the party. But if you'd like to give us a gift, we picked a few meaningful ones — all via Pix, with love.",
    "gifts.give": "Gift this",
    "gift.1.n": "A sunset for two", "gift.1.d": "So we can relive the evening that changed everything.",
    "gift.2.n": "Breakfasts in bed", "gift.2.d": "A month of slow, lazy mornings with no rush.",
    "gift.3.n": "A candlelit dinner", "gift.3.d": "One night that's just ours, exactly how we like it.",
    "gift.4.n": "A leg of the honeymoon", "gift.4.d": "Help take us to the next stop on the map.",
    "gift.5.n": "A night by the sea", "gift.5.d": "Sound of the waves, held hands, zero alarms.",
    "gift.6.n": "A toast to our story", "gift.6.d": "A glass to celebrate every chapter still to come.",
    "gift.7.n": "A babysitter for date night", "gift.7.d": "So we can sneak away as a couple — while someone keeps the kids busy.",
    "gift.8.n": "The first dance", "gift.8.d": "That song, the two of us spinning, the world on pause.",
    "gift.9.n": "Seasonal flowers", "gift.9.d": "So home never loses the scent of the party.",
    "gifts.credits": "Illustrative photos: David N Cooper, happyskrappy, Swami Stream, mrlins, Sam Howzit and tdlucas5000 (CC BY) · others public domain (CC0) · via Openverse.",
    "pix.title": "Pix key", "pix.who": "Breno Neiva Machado · Santander",
    "pix.copy": "Copy code", "pix.copied": "Copied! ✓", "pix.copycode": "Copy Pix code",
    "footer.hashtag": "#BrenoETie2026",
    "footer.date": "October 3, 2026 · Brasília",
    "footer.credit": 'Made with love · Photos by <a href="#">Frederico Gomes Photography</a>',
  },
};

let lang = localStorage.getItem("lang") || "pt";

function applyLang(l) {
  lang = l;
  localStorage.setItem("lang", l);
  document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[l][key];
    if (val != null) el.innerHTML = val;
  });
  document.querySelectorAll(".lang-toggle span").forEach((s) => {
    s.classList.toggle("active", s.dataset.lang === l);
  });
}

/* ------------------------------------------------------------------
   3. Countdown
------------------------------------------------------------------ */
function initCountdown() {
  const target = new Date(CONFIG.WEDDING_DATE).getTime();
  const els = {
    d: document.getElementById("cd-days"),
    h: document.getElementById("cd-hours"),
    m: document.getElementById("cd-min"),
    s: document.getElementById("cd-sec"),
  };
  const grid = document.getElementById("count-grid");
  const title = document.querySelector(".count-title");
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      grid.style.display = "none";
      title.setAttribute("data-i18n", "count.married");
      title.innerHTML = I18N[lang]["count.married"];
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.d.textContent = d;
    els.h.textContent = String(h).padStart(2, "0");
    els.m.textContent = String(m).padStart(2, "0");
    els.s.textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ------------------------------------------------------------------
   4. Smooth scroll (Lenis) + ScrollTrigger sync
------------------------------------------------------------------ */
function initSmooth() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // âncoras
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: 0 }); }
    });
  });
  return lenis;
}

/* ------------------------------------------------------------------
   5. Animações de scroll (GSAP)
------------------------------------------------------------------ */
function initAnimations() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { gsap.set(".reveal", { opacity: 1 }); return; }

  // Hero: parallax do fundo + entrada dos títulos
  gsap.to(".hero-bg img", {
    yPercent: 18, scale: 1.22, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.from(".hero-eyebrow", { yPercent: 120, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".hero-names .l1", { yPercent: 115, opacity: 0, duration: 1.1, ease: "power4.out" }, "-=0.6")
        .from(".hero-names .amp", { scale: 0.7, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.7")
        .from(".hero-names .l2", { yPercent: 115, opacity: 0, duration: 1.1, ease: "power4.out" }, "-=0.9")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.5")
        .from(".scroll-cue", { opacity: 0, duration: 0.8 }, "-=0.3");

  // Reveal genérico
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // Countdown números
  gsap.from(".count-cell", {
    opacity: 0, y: 30, stagger: 0.08, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".count-grid", start: "top 80%" },
  });

  // Story beats: imagem com parallax + texto entrando
  gsap.utils.toArray(".beat").forEach((beat) => {
    const img = beat.querySelector(".beat-media img");
    const media = beat.querySelector(".beat-media");
    gsap.fromTo(img, { yPercent: -12 }, {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: beat, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(media, {
      clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: beat, start: "top 78%" },
    });
    gsap.from(beat.querySelectorAll(".beat-text > *"), {
      opacity: 0, y: 34, stagger: 0.12, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: beat, start: "top 72%" },
    });
  });

  // Pull quote — reveal por palavra
  const q = document.querySelector(".pullquote blockquote");
  if (q) {
    const words = q.textContent.trim().split(" ");
    q.innerHTML = words.map((w) => `<span class="w"><span>${w}</span></span>`).join(" ");
    q.querySelectorAll(".w span").forEach((s) => (s.style.display = "inline-block"));
    gsap.from(q.querySelectorAll(".w span"), {
      yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: q, start: "top 80%" },
    });
  }

  // Gallery: entrada em cascata
  gsap.from(".grid figure", {
    opacity: 0, y: 50, scale: 0.96, stagger: 0.06, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".grid", start: "top 82%" },
  });

  // Cards de presente
  gsap.from(".gift-card", {
    opacity: 0, y: 40, stagger: 0.07, duration: 0.7, ease: "power3.out",
    scrollTrigger: { trigger: ".gift-grid", start: "top 82%" },
  });

  // Flores — desabrocham ao entrar na tela
  gsap.utils.toArray(".floral-divider, .header-sprig").forEach((el) => {
    gsap.from(el, { opacity: 0, y: 14, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%" } });
    gsap.from(el.querySelectorAll(".petal-el"), {
      scale: 0, opacity: 0, transformOrigin: "50% 50%",
      stagger: 0.01, duration: 0.5, ease: "back.out(2.4)",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Buquês do hero
  heroTl.from(".hero-flora", { opacity: 0, scale: 0.7, duration: 1.1, ease: "power3.out", stagger: 0.15 }, 0.3);
}

/* ------------------------------------------------------------------
   6. Gallery lightbox
------------------------------------------------------------------ */
function initLightbox() {
  const figs = Array.from(document.querySelectorAll(".grid figure img"));
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  let idx = 0;
  const show = (i) => { idx = (i + figs.length) % figs.length; lbImg.src = figs[idx].dataset.full || figs[idx].src; };
  figs.forEach((im, i) => im.parentElement.addEventListener("click", () => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }));
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
}

/* ------------------------------------------------------------------
   7. RSVP form → Google Sheets (Apps Script)
------------------------------------------------------------------ */
function initForm() {
  const form = document.getElementById("rsvp-form");
  const msg = document.getElementById("form-msg");
  const btn = form.querySelector(".btn-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      nome: form.nome.value.trim(),
      acompanhantes: form.acompanhantes.value,
      presenca: (form.querySelector('input[name="presenca"]:checked') || {}).value || "sim",
      lang, ts: new Date().toISOString(),
    };
    msg.className = "form-msg";
    if (!data.nome) { msg.textContent = I18N[lang]["rsvp.fillname"]; msg.classList.add("err"); return; }

    if (!CONFIG.RSVP_ENDPOINT) {
      msg.textContent = I18N[lang]["rsvp.notset"]; msg.classList.add("err");
      console.warn("Configure CONFIG.RSVP_ENDPOINT em js/main.js — veja GUIA.md");
      return;
    }
    const original = btn.textContent;
    btn.disabled = true; btn.textContent = I18N[lang]["rsvp.sending"];
    try {
      await fetch(CONFIG.RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      msg.textContent = data.presenca === "nao" ? I18N[lang]["rsvp.no_ok"] : I18N[lang]["rsvp.ok"];
      msg.classList.add("ok");
      form.reset();
    } catch (err) {
      msg.textContent = I18N[lang]["rsvp.err"]; msg.classList.add("err");
    } finally {
      btn.disabled = false; btn.textContent = original;
    }
  });
}

/* ------------------------------------------------------------------
   8. Pix copiar
------------------------------------------------------------------ */
function initPix() {
  document.querySelectorAll("[data-copy-pix]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.PIX_PAYLOAD);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = CONFIG.PIX_PAYLOAD; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); ta.remove();
      }
      const prev = btn.textContent;
      btn.textContent = I18N[lang]["pix.copied"];
      setTimeout(() => (btn.textContent = I18N[lang][btn.dataset.i18n] || prev), 1800);
    });
  });
}

/* ------------------------------------------------------------------
   9. Música de fundo
------------------------------------------------------------------ */
function initMusic() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  if (!audio || !btn) return;
  audio.volume = 0.0;
  let playing = false;
  const fade = (to, dur = 1200) => {
    const from = audio.volume; const start = performance.now();
    const step = (t) => {
      const k = Math.min((t - start) / dur, 1);
      audio.volume = from + (to - from) * k;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const play = () => { audio.play().then(() => { playing = true; btn.classList.add("playing"); fade(0.5); }).catch(() => {}); };
  const pause = () => { fade(0, 600); playing = true; setTimeout(() => audio.pause(), 620); playing = false; btn.classList.remove("playing"); };
  btn.addEventListener("click", () => (playing ? pause() : play()));
  // tenta iniciar na primeira interação do usuário
  const kick = () => { if (!playing) play(); window.removeEventListener("pointerdown", kick); };
  window.addEventListener("pointerdown", kick, { once: true });
}

/* ------------------------------------------------------------------
   10. Preloader
------------------------------------------------------------------ */
function initPreloader(onDone) {
  const pre = document.getElementById("preloader");
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    pre.classList.add("done");
    onDone && onDone();
  };
  const tl = gsap.timeline({ onComplete: finish });
  tl.to(".pre-bar", { width: 220, duration: 1.1, ease: "power2.inOut" })
    .to(".pre-names", { yPercent: -120, opacity: 0, duration: 0.7, ease: "power3.in" }, "+=0.25")
    .to(".pre-bar", { opacity: 0, duration: 0.3 }, "<");
  // Rede de segurança: se o rAF travar/atrasar, libera assim mesmo.
  setTimeout(finish, 4000);
}

/* ------------------------------------------------------------------
   Boot
------------------------------------------------------------------ */
const FLAT = new URLSearchParams(location.search).has("flat");

window.addEventListener("DOMContentLoaded", () => {
  applyLang(lang);
  document.querySelectorAll(".lang-toggle span").forEach((s) => {
    s.addEventListener("click", () => applyLang(s.dataset.lang));
  });

  initFloral();
  initCountdown();
  initLightbox();
  initForm();
  initPix();
  initMusic();

  if (FLAT) {
    // Modo estático (scroll nativo, sem animações) — QA e fallback.
    document.getElementById("preloader").classList.add("done");
    gsap.set(".reveal", { opacity: 1 });
    return;
  }

  const canvas = document.getElementById("petals-canvas");
  if (canvas) initPetals(canvas);

  initPreloader(() => {
    initSmooth();
    initAnimations();
    ScrollTrigger.refresh();
  });
});
