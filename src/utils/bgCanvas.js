/**
 * Full-page background canvas.
 * Default theme: connected nodes (palette/mode-aware, mouse-interactive).
 * Cyber theme: Matrix-style code rain.
 * Hidden in minimal theme via CSS.
 */

const isCyber     = () => document.documentElement.dataset.theme === 'cyber';
const isLightMode = () => document.documentElement.dataset.mode  === 'light';

function getNodeColors() {
  const p = document.documentElement.dataset.palette;
  if (isLightMode()) {
    if (p === 'ocean')  return ['rgba(2,132,199,',   'rgba(13,148,136,',  'rgba(8,145,178,',   'rgba(3,105,161,'];
    if (p === 'aurora') return ['rgba(147,51,234,',  'rgba(192,38,211,',  'rgba(109,40,217,',  'rgba(126,34,206,'];
    if (p === 'ember')  return ['rgba(234,88,12,',   'rgba(202,138,4,',   'rgba(217,70,0,',    'rgba(180,83,9,'];
    return ['rgba(67,56,202,', 'rgba(8,145,178,', 'rgba(124,58,237,', 'rgba(37,99,235,'];
  }
  if (p === 'ocean')  return ['rgba(56,189,248,',  'rgba(14,165,233,'];
  if (p === 'aurora') return ['rgba(192,132,252,', 'rgba(167,139,250,'];
  if (p === 'ember')  return ['rgba(251,146,60,',  'rgba(249,115,22,'];
  return ['rgba(99,102,241,', 'rgba(129,140,248,'];
}

function getLineRgb() {
  const p = document.documentElement.dataset.palette;
  if (isLightMode()) {
    if (p === 'ocean')  return '2,132,199';
    if (p === 'aurora') return '124,58,237';
    if (p === 'ember')  return '217,70,0';
    return '67,56,202';
  }
  if (p === 'ocean')  return '6,182,212';
  if (p === 'aurora') return '168,85,247';
  if (p === 'ember')  return '249,115,22';
  return '99,102,241';
}

const RAIN_CHARS = '0123456789ABCDEF><[]{}|/:=\\;!#$%&*+-~^?@';
const RAIN_FS    = 13;

export function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx   = canvas.getContext('2d');
  const rand  = (a, b) => Math.random() * (b - a) + a;
  const MAX_D = 140;
  const MOUSE_R = 120;

  let W, H, raf;
  let mx = -9999, my = -9999;
  const nodes = [];

  // Rain state
  let rainCols, rainDrops;

  class Node {
    constructor() {
      const C  = getNodeColors();
      this.x     = rand(0, W);
      this.y     = rand(0, H);
      this.vx    = rand(-0.22, 0.22);
      this.vy    = rand(-0.22, 0.22);
      this.r     = rand(1, 2.2);
      this.color = C[Math.floor(rand(0, C.length))];
      this.alpha = isLightMode() ? rand(0.35, 0.65) : rand(0.25, 0.55);
    }

    update() {
      const dxm = this.x - mx, dym = this.y - my;
      const dm  = Math.sqrt(dxm * dxm + dym * dym);
      if (dm < MOUSE_R && dm > 0) {
        const f = ((MOUSE_R - dm) / MOUSE_R) * 0.6;
        this.x += (dxm / dm) * f;
        this.y += (dym / dm) * f;
      }
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0)  { this.x = 0;  this.vx =  Math.abs(this.vx); }
      if (this.x > W)  { this.x = W;  this.vx = -Math.abs(this.vx); }
      if (this.y < 0)  { this.y = 0;  this.vy =  Math.abs(this.vy); }
      if (this.y > H)  { this.y = H;  this.vy = -Math.abs(this.vy); }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  const buildNodes = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    nodes.length = 0;
    const n = Math.min(160, Math.floor(W * H / 9000));
    for (let i = 0; i < n; i++) nodes.push(new Node());
    rainCols  = Math.floor(W / RAIN_FS);
    rainDrops = Array.from({ length: rainCols }, () => (Math.random() * -(H / RAIN_FS)) | 0);
  };

  const onMouseMove  = e => { mx = e.clientX; my = e.clientY; };
  const onMouseLeave = ()  => { mx = -9999; my = -9999; };

  window.addEventListener('resize',     buildNodes);
  window.addEventListener('mousemove',  onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);

  buildNodes();

  const loopNodes = () => {
    ctx.clearRect(0, 0, W, H);
    const rgb = getLineRgb();

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_D) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${rgb},${(isLightMode() ? 0.18 : 0.1) * (1 - d / MAX_D)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => { n.update(); n.draw(); });
  };

  const loopRain = () => {
    ctx.fillStyle = 'rgba(3,0,14,0.09)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = `bold ${RAIN_FS}px monospace`;

    for (let i = 0; i < rainCols; i++) {
      const y = rainDrops[i] * RAIN_FS;
      const r = Math.random();

      if (r < 0.015) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
      } else if (rainDrops[i] > 0 && Math.random() < 0.06) {
        ctx.fillStyle = 'rgba(180,255,180,0.95)';
      } else if (r < 0.5) {
        ctx.fillStyle = 'rgba(0,255,70,0.5)';
      } else {
        ctx.fillStyle = 'rgba(0,200,40,0.35)';
      }

      ctx.fillText(RAIN_CHARS[Math.random() * RAIN_CHARS.length | 0], i * RAIN_FS, y);

      if (y > H && Math.random() > 0.975) rainDrops[i] = 0;
      rainDrops[i] += 0.35;
    }
  };

  const loop = () => {
    if (isCyber()) loopRain();
    else           loopNodes();
    raf = requestAnimationFrame(loop);
  };
  loop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize',     buildNodes);
    window.removeEventListener('mousemove',  onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
  };
}
