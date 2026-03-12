import { useEffect, useRef } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hitScale: number;
  hitDecay: number;
  trail: { x: number; y: number }[];
  driftVX: number;
  driftVY: number;
  driftTimer: number;
}

// ── Tennis ball image ─────────────────────────────────────────
// To use your own SVG: drop your file into public/tennis-ball.svg
// It is pre-loaded once and drawn via drawImage() — identical on
// every OS/browser, no emoji font involved.
const BALL_IMAGE_URL = '/tennis-ball.svg'; // ← swap path if needed

const ballImg = new Image();
ballImg.src = BALL_IMAGE_URL;

function drawTennisBall(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  opacity: number,
  scaleX = 1,
  scaleY = 1,
  angle = 0
) {
  const size = radius * 2;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scaleX, scaleY);

  if (ballImg.complete && ballImg.naturalWidth > 0) {
    ctx.drawImage(ballImg, -radius, -radius, size, size);
  } else {
    // Fallback circle until SVG loads
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#c8d630';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = radius * 0.12;
    ctx.beginPath();
    ctx.arc(-radius * 0.18, 0, radius * 0.72, -Math.PI * 0.52, Math.PI * 0.52);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radius * 0.18, 0, radius * 0.72, Math.PI * 0.48, Math.PI * 1.52);
    ctx.stroke();
  }

  ctx.restore();
}

export default function TennisBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // ── Cursor tracking ──────────────────────────────────────
    let mouseX = -9999, mouseY = -9999;
    let prevMouseX = -9999, prevMouseY = -9999;
    let cursorVX = 0, cursorVY = 0;

    const onMove = (e: MouseEvent) => {
      prevMouseX = mouseX; prevMouseY = mouseY;
      mouseX = e.clientX;  mouseY = e.clientY;
      cursorVX = mouseX - prevMouseX;
      cursorVY = mouseY - prevMouseY;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      prevMouseX = mouseX; prevMouseY = mouseY;
      mouseX = t.clientX;  mouseY = t.clientY;
      cursorVX = mouseX - prevMouseX;
      cursorVY = mouseY - prevMouseY;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onTouch, { passive: true });

    // ── Resize ───────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Helpers ──────────────────────────────────────────────
    const randDrift = () => (Math.random() - 0.5) * 0.6;
    const clampSpeed = (v: number, max: number) => {
      const s = Math.abs(v);
      return s > max ? (v / s) * max : v;
    };

    // ── Spawn balls ──────────────────────────────────────────
    const balls: Ball[] = Array.from({ length: 7 }, () => ({
      x:          Math.random() * window.innerWidth,
      y:          Math.random() * window.innerHeight,
      vx:         (Math.random() - 0.5) * 1.2,
      vy:         (Math.random() - 0.5) * 1.2,
      size:       26 + Math.random() * 22,
      opacity:    0.18 + Math.random() * 0.22,
      hitScale:   1,
      hitDecay:   0,
      trail:      [],
      driftVX:    randDrift(),
      driftVY:    randDrift(),
      driftTimer: Math.floor(Math.random() * 300),
    }));

    // ── Hit sound ────────────────────────────────────────────
    let audioCtx: AudioContext | null = null;
    const playHit = (strength: number) => {
      try {
        if (!audioCtx) audioCtx = new AudioContext();
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(180 + strength * 4, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(Math.min(0.18, 0.04 + strength * 0.003), audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (_) { /* silent fail */ }
    };

    // ── Constants ────────────────────────────────────────────
    const FRICTION       = 0.991;
    const BOUNCE_DAMP    = 0.72;
    const MAX_SPEED      = 28;
    const HIT_RADIUS     = 1.6;
    const MIN_HIT_SPEED  = 4;
    const IDLE_THRESHOLD = 0.25;
    const DRIFT_STRENGTH = 0.008;

    // ── Main loop ────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cursorSpeed = Math.sqrt(cursorVX ** 2 + cursorVY ** 2);

      for (const b of balls) {

        // ── Cursor hit ───────────────────────────────────────
        if (cursorSpeed > MIN_HIT_SPEED) {
          const dx = b.x - mouseX;
          const dy = b.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.size * HIT_RADIUS) {
            const nx = dist > 0 ? dx / dist : 0;
            const ny = dist > 0 ? dy / dist : -1;
            const impulse = cursorSpeed * 0.85;
            b.vx = cursorVX * 0.75 + nx * impulse * 0.5;
            b.vy = cursorVY * 0.75 + ny * impulse * 0.5;
            b.vx = clampSpeed(b.vx, MAX_SPEED);
            b.vy = clampSpeed(b.vy, MAX_SPEED);
            b.hitScale = 1.45;
            b.hitDecay = 0.88;
            b.trail = [];
            playHit(cursorSpeed);
          }
        }

        // ── Ball-ball collision ──────────────────────────────
        for (const other of balls) {
          if (other === b) continue;
          const dx   = b.x - other.x;
          const dy   = b.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = (b.size + other.size) * 0.55;
          if (dist < minD && dist > 0) {
            const nx  = dx / dist;
            const ny  = dy / dist;
            const dvx = b.vx - other.vx;
            const dvy = b.vy - other.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              const imp = dot * 0.55;
              b.vx -= imp * nx; b.vy -= imp * ny;
              other.vx += imp * nx; other.vy += imp * ny;
              const overlap = (minD - dist) / 2;
              b.x += nx * overlap; b.y += ny * overlap;
              other.x -= nx * overlap; other.y -= ny * overlap;
            }
          }
        }

        // ── Physics ──────────────────────────────────────────
        b.vx *= FRICTION;
        b.vy *= FRICTION;

        const speed = Math.sqrt(b.vx ** 2 + b.vy ** 2);

        if (speed < IDLE_THRESHOLD) {
          b.driftTimer--;
          if (b.driftTimer <= 0) {
            b.driftVX    = randDrift();
            b.driftVY    = randDrift();
            b.driftTimer = 180 + Math.floor(Math.random() * 240);
          }
          b.vx += b.driftVX * DRIFT_STRENGTH;
          b.vy += b.driftVY * DRIFT_STRENGTH;
        }

        b.x += b.vx;
        b.y += b.vy;

        // ── Wall bounce ──────────────────────────────────────
        const r = b.size * 0.5;
        if (b.x - r < 0) {
          b.x = r; b.vx = Math.abs(b.vx) * BOUNCE_DAMP;
          b.hitScale = 1.2; b.hitDecay = 0.82; b.trail = [];
        }
        if (b.x + r > canvas.width) {
          b.x = canvas.width - r; b.vx = -Math.abs(b.vx) * BOUNCE_DAMP;
          b.hitScale = 1.2; b.hitDecay = 0.82; b.trail = [];
        }
        if (b.y - r < 0) {
          b.y = r; b.vy = Math.abs(b.vy) * BOUNCE_DAMP;
          b.hitScale = 1.2; b.hitDecay = 0.82; b.trail = [];
        }
        if (b.y + r > canvas.height) {
          b.y = canvas.height - r; b.vy = -Math.abs(b.vy) * BOUNCE_DAMP;
          b.hitScale = 1.2; b.hitDecay = 0.82; b.trail = [];
        }

        // ── Hit scale spring ─────────────────────────────────
        if (b.hitScale > 1) {
          b.hitScale = 1 + (b.hitScale - 1) * b.hitDecay;
          if (b.hitScale < 1.01) b.hitScale = 1;
        }

        // ── Trail ────────────────────────────────────────────
        const currentSpeed = Math.sqrt(b.vx ** 2 + b.vy ** 2);
        if (currentSpeed > 3) {
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 8) b.trail.shift();
        } else {
          if (b.trail.length > 0) b.trail.shift();
        }

        // ── Draw trail ───────────────────────────────────────
        const radius = b.size * 0.5;
        b.trail.forEach((pt, i) => {
          const frac = (i + 1) / b.trail.length;
          drawTennisBall(ctx, pt.x, pt.y, radius * frac * 0.65, b.opacity * frac * 0.28);
        });

        // ── Draw ball ────────────────────────────────────────
        const angle  = Math.atan2(b.vy, b.vx);
        const squash = Math.min(currentSpeed / 18, 0.28);
        const sX     = 1 + squash * 0.5;
        const sY     = 1 - squash * 0.35;

        drawTennisBall(ctx, b.x, b.y, radius * b.hitScale, b.opacity, sX, sY, angle);
      }

      cursorVX *= 0.6;
      cursorVY *= 0.6;

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onTouch);
      audioCtx?.close();
    };
  }, []);

  return <canvas ref={canvasRef} className="balls-canvas" aria-hidden="true" />;
}