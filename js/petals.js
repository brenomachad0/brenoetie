// ============================================================
// Pétalas flutuantes — Three.js (hero background layer)
// Partículas leves nas cores da paleta, com leve profundidade.
// ============================================================
import * as THREE from "three";

export function initPetals(canvas) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return { destroy() {} };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 22;

  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: true, powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  // ---- textura de pétala desenhada em canvas (sem assets externos) ----
  function petalTexture() {
    const s = 128;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    g.translate(s / 2, s / 2);
    // formato de pétala
    g.beginPath();
    g.moveTo(0, -s * 0.42);
    g.bezierCurveTo(s * 0.38, -s * 0.28, s * 0.30, s * 0.30, 0, s * 0.44);
    g.bezierCurveTo(-s * 0.30, s * 0.30, -s * 0.38, -s * 0.28, 0, -s * 0.42);
    const grad = g.createLinearGradient(0, -s * 0.42, 0, s * 0.44);
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(1, "rgba(255,255,255,0.55)");
    g.fillStyle = grad;
    g.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }
  const tex = petalTexture();

  const palette = [0xe4892a, 0xd9481f, 0xe58aa0, 0xc42e6b, 0x7d8b4e, 0xfff2df];

  const COUNT = window.innerWidth < 720 ? 55 : 110;
  const petals = [];
  const group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.PlaneGeometry(1, 1.35);
  for (let i = 0; i < COUNT; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      color: palette[(Math.random() * palette.length) | 0],
      transparent: true,
      opacity: 0.35 + Math.random() * 0.5,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(geo, mat);
    const scale = 0.35 + Math.random() * 0.9;
    m.scale.setScalar(scale);
    m.position.set(
      (Math.random() - 0.5) * 46,
      Math.random() * 40 - 12,
      (Math.random() - 0.5) * 20
    );
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    petals.push({
      mesh: m,
      vy: -0.012 - Math.random() * 0.03,
      vx: (Math.random() - 0.5) * 0.012,
      spin: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.4 + Math.random() * 0.8,
      swayAmp: 0.4 + Math.random() * 0.9,
    });
    group.add(m);
  }

  let w = 0, h = 0;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // parallax suave pelo mouse
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  function onMove(e) {
    tmx = (e.clientX / window.innerWidth - 0.5);
    tmy = (e.clientY / window.innerHeight - 0.5);
  }
  window.addEventListener("mousemove", onMove, { passive: true });

  const clock = new THREE.Clock();
  let raf, running = true;
  function tick() {
    if (!running) return;
    const t = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta ? 0.016 : 0.016, 0.033);

    for (const p of petals) {
      const m = p.mesh;
      m.position.y += p.vy;
      m.position.x += p.vx + Math.sin(t * p.swaySpeed + p.sway) * 0.008 * p.swayAmp;
      m.rotation.z += p.spin;
      m.rotation.x += p.spin * 0.6;
      if (m.position.y < -22) {
        m.position.y = 24;
        m.position.x = (Math.random() - 0.5) * 46;
      }
    }
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;
    group.rotation.y = mx * 0.25;
    group.rotation.x = my * 0.15;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  // pausa quando o hero sai da tela (economia)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && !running) { running = true; tick(); }
      else if (!en.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    });
  }, { threshold: 0.01 });
  io.observe(canvas);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
      geo.dispose(); tex.dispose();
      petals.forEach((p) => p.mesh.material.dispose());
      renderer.dispose();
    },
  };
}
