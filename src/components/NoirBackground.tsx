"use client";
import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  speed: number;
  len: number;
  opacity: number;
  width: number;
  drift: number;
}

interface Window_ {
  x: number;
  y: number;
  w: number;
  h: number;
  lit: boolean;
}

interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
  windows: Window_[];
}

interface Fog {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
}

interface Searchlight {
  angle: number;
  speed: number;
  width: number;
  opacity: number;
  color: string;
}

export default function NoirBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    resize();
    window.addEventListener("resize", resize);

    // Rain (Reduced for clarity)
    const drops: Drop[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 10 + Math.random() * 10,
      len: 25 + Math.random() * 25,
      opacity: 0.05 + Math.random() * 0.1,
      width: 0.5,
      drift: 1,
    }));

    // City
    const makeCity = (): Building[] => {
      const out: Building[] = [];
      let x = -100;
      while (x < W + 100) {
        const bw = 60 + Math.random() * 120;
        const bh = 300 + Math.random() * 600;
        const by = H - bh;
        const wins: Window_[] = [];
        const cols = Math.floor(bw / 15);
        const rows = Math.floor(bh / 20);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            wins.push({
              x: x + 6 + c * 15,
              y: by + 10 + r * 20,
              w: 6,
              h: 10,
              lit: Math.random() > 0.6,
            });
          }
        }
        out.push({ x, y: by, w: bw, h: bh, windows: wins });
        x += bw + 5 + Math.random() * 15;
      }
      return out;
    };

    const buildings = makeCity();

    // Fog particles
    const fogs: Fog[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * W,
      y: H - 200 - Math.random() * 400,
      r: 200 + Math.random() * 300,
      opacity: 0.05 + Math.random() * 0.1,
      speed: 0.2 + Math.random() * 0.5,
    }));

    // Searchlights (Dimmed for better text contrast)
    const searchlights: Searchlight[] = [
      { angle: 0, speed: 0.003, width: 0.2, opacity: 0.03, color: "rgba(255, 204, 0, 0.08)" },
      { angle: Math.PI, speed: -0.002, width: 0.2, opacity: 0.04, color: "rgba(100, 150, 255, 0.06)" },
    ];

    let lightning = 0;
    let nextLightning = 8000 + Math.random() * 12000;
    let elapsed = 0;

    const draw = (dt: number) => {
      elapsed += dt;
      ctx.fillStyle = "#000000"; // Pure black background
      ctx.fillRect(0, 0, W, H);

      // Searchlights
      searchlights.forEach(s => {
        s.angle += s.speed;
        const x = W / 2 + Math.cos(s.angle) * (W / 3);
        const gradSpot = ctx.createRadialGradient(x, H, 0, x, H - 400, W);
        gradSpot.addColorStop(0, s.color);
        gradSpot.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.save();
        ctx.translate(x, H);
        ctx.rotate(Math.sin(s.angle * 0.2) * 0.5);
        ctx.fillStyle = gradSpot;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, H * 1.5, -Math.PI/2 - s.width, -Math.PI/2 + s.width);
        ctx.fill();
        ctx.restore();
      });

      // Buildings (Darker highlights)
      buildings.forEach(b => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        
        const bGrad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
        bGrad.addColorStop(0, "#080812");
        bGrad.addColorStop(1, "#020205");
        ctx.fillStyle = bGrad;
        ctx.fillRect(b.x, b.y, b.w, b.h);

        b.windows.forEach(w => {
          if (w.lit) {
            ctx.fillStyle = "rgba(255, 204, 0, 0.4)"; // Lower window light
            ctx.fillRect(w.x, w.y, w.w, w.h);
          } else {
            ctx.fillStyle = "#020208";
            ctx.fillRect(w.x, w.y, w.w, w.h);
          }
        });
      });

      // Fog (Simpler and darker)
      fogs.forEach(f => {
        const fogGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        fogGrad.addColorStop(0, `rgba(20, 20, 30, ${f.opacity * 0.5})`);
        fogGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = fogGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        
        f.x += f.speed;
        if (f.x - f.r > W) f.x = -f.r;
      });

      // Mist / Smoke layer (More opaque to hide busy building details)
      const mist = ctx.createLinearGradient(0, H - 400, 0, H);
      mist.addColorStop(0, "rgba(0,0,0,0)");
      mist.addColorStop(1, "rgba(0,0,0,0.95)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, H - 400, W, 400);

      // Rain
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      drops.forEach(d => {
        ctx.strokeStyle = `rgba(100, 120, 180, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.drift, d.y + d.len);
        ctx.stroke();
        
        d.y += d.speed;
        if (d.y > H) d.y = -d.len;
      });

      // Lightning (Rare and dimmer)
      if (elapsed > nextLightning) {
        lightning = 0.6;
        nextLightning = elapsed + 12000 + Math.random() * 20000;
      }
      if (lightning > 0) {
        ctx.fillStyle = `rgba(150, 180, 255, ${lightning * 0.1})`;
        ctx.fillRect(0, 0, W, H);
        lightning -= 0.03;
      }
    };

    let lastTime = 0;
    const loop = (t: number) => {
      draw(t - lastTime);
      lastTime = t;
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
