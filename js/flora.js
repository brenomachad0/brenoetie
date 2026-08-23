// ============================================================
// Flores silvestres em SVG — nas cores da paleta
// Geradas por código (sem imagens externas), injetadas nos
// placeholders .floral-divider / .header-sprig / .hero-flora
// ============================================================

const COLORS = ["--orange", "--tomato", "--pink", "--magenta", "--sage"];

function flower(cx, cy, r, color, center, n = 6, rot = 0) {
  let petals = "";
  for (let i = 0; i < n; i++) {
    const a = rot + (360 / n) * i;
    petals += `<ellipse class="petal-el" cx="0" cy="${-r}" rx="${(r * 0.44).toFixed(1)}" ry="${r}" transform="rotate(${a})"/>`;
  }
  return `<g transform="translate(${cx},${cy})">
    <g fill="var(${color})">${petals}</g>
    <circle class="petal-el" r="${(r * 0.34).toFixed(1)}" fill="var(${center})"/>
  </g>`;
}

function leaf(cx, cy, rot, s = 1, v = "--sage") {
  return `<path class="leaf-el" d="M0 0 C10 -7 26 -7 34 0 C26 7 10 7 0 0 Z" fill="var(${v})" opacity=".85"
    transform="translate(${cx},${cy}) rotate(${rot}) scale(${s})"/>`;
}

function bud(cx, cy, color, r = 4) {
  return `<circle class="petal-el" cx="${cx}" cy="${cy}" r="${r}" fill="var(${color})"/>`;
}

/* Divisor: haste curva + folhas + buquê central de flores silvestres */
export function divider() {
  return `<svg viewBox="0 0 440 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 54 Q120 44 220 50 Q320 56 432 46" stroke="var(--sage)" stroke-width="1.3" opacity=".5"/>
    ${leaf(90, 52, 20, .9)} ${leaf(150, 55, -18, .8)}
    ${leaf(300, 53, 200, .9)} ${leaf(350, 50, 160, .8)}
    ${bud(70, 50, "--orange")} ${bud(378, 47, "--pink")}
    ${leaf(205, 40, -60, .7)} ${leaf(245, 42, 60, .7, "--olive")}
    ${flower(170, 52, 8, "--orange", "--tomato", 6)}
    ${flower(268, 50, 8, "--pink", "--magenta", 6, 15)}
    ${flower(220, 44, 12, "--magenta", "--orange", 7)}
    ${flower(140, 56, 6, "--tomato", "--orange", 6)}
    ${flower(298, 54, 6, "--sage", "--pink", 6, 20)}
  </svg>`;
}

/* Sprig pequeno para acima/abaixo de títulos */
export function sprig() {
  return `<svg viewBox="0 0 130 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 40 Q65 24 112 40" stroke="var(--sage)" stroke-width="1.2" opacity=".5"/>
    ${leaf(48, 34, -25, .7)} ${leaf(82, 34, 205, .7)}
    ${bud(22, 38, "--orange", 3.2)} ${bud(108, 38, "--pink", 3.2)}
    ${flower(50, 30, 6, "--pink", "--orange", 6)}
    ${flower(80, 30, 6, "--orange", "--magenta", 6, 15)}
    ${flower(65, 24, 8.5, "--magenta", "--orange", 7)}
  </svg>`;
}

/* Buquê de canto para o hero (cascata diagonal) */
export function spray() {
  let s = "";
  // folhagem base
  s += leaf(40, 60, 35, 1.5, "--olive");
  s += leaf(70, 30, 10, 1.3);
  s += leaf(30, 100, 60, 1.4);
  s += leaf(95, 70, 25, 1.2, "--olive");
  s += leaf(120, 110, 45, 1.1);
  // flores em cascata
  s += flower(48, 46, 15, "--magenta", "--orange", 7);
  s += flower(92, 40, 12, "--orange", "--tomato", 6, 10);
  s += flower(70, 84, 13, "--pink", "--magenta", 6, 20);
  s += flower(120, 66, 10, "--tomato", "--orange", 6);
  s += flower(40, 108, 9, "--orange", "--pink", 6, 15);
  s += flower(150, 120, 11, "--magenta", "--orange", 7);
  s += flower(110, 130, 7, "--pink", "--tomato", 6);
  s += bud(160, 90, "--orange", 5);
  s += bud(18, 78, "--pink", 4.5);
  return `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
}

export function initFloral() {
  document.querySelectorAll(".floral-divider").forEach((el) => (el.innerHTML = divider()));
  document.querySelectorAll(".header-sprig").forEach((el) => (el.innerHTML = sprig()));
  document.querySelectorAll(".hero-flora").forEach((el) => (el.innerHTML = spray()));
}
