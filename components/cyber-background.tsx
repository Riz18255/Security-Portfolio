"use client";
import { useEffect, useRef } from "react";
// An abstract ribbon mesh with perspective projection and depth shading.
export function CyberBackground({ hero = false }: { hero?: boolean }) {
 const ref = useRef<HTMLCanvasElement>(null);
 useEffect(() => {
  const canvas = ref.current; const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0, height = 0, frame = 0, last = 0, phase = .8;
  let pointerX = 0, pointerY = 0, easedX = 0, easedY = 0;
  let onscreen = true;
  const resize = () => {
   const bounds = canvas.getBoundingClientRect(); width = bounds.width; height = bounds.height;
   const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
   canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
   ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const project = (u: number, v: number) => {
   const a = u * Math.PI * 2, twist = a * 1.5 + phase * .17;
   const radius = 1.18 + v * .34 * Math.cos(twist);
   const x = radius * Math.cos(a), y = radius * Math.sin(a);
   let z = v * .6 * Math.sin(twist) + .24 * Math.sin(a * 3 + phase);
   const yaw = -.48 + easedX * .12 + phase * .06, pitch = .48 + easedY * .1;
   const rx = x * Math.cos(yaw) + z * Math.sin(yaw); z = -x * Math.sin(yaw) + z * Math.cos(yaw);
   const ry = y * Math.cos(pitch) - z * Math.sin(pitch); z = y * Math.sin(pitch) + z * Math.cos(pitch);
   const scale = 3.6 / (3.6 - z), size = Math.min(width, height) * (hero ? .33 : .27);
   return { x: width * (hero ? .5 : .83) + rx * size * scale, y: height * (hero ? .48 : .44) + ry * size * scale, z };
  };
  const draw = (time: number) => {
   frame = 0;
   if (time - last >= 32 || preference.matches) {
    const delta = Math.min(time - last, 50); last = time;
    if (!preference.matches) phase += delta * .00035;
    easedX += (pointerX - easedX) * .045; easedY += (pointerY - easedY) * .045;
    ctx.clearRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * (hero ? .52 : .8), height * .5, 5, width * .5, height * .5, width * .6);
    glow.addColorStop(0, hero ? "rgba(74,167,221,.12)" : "rgba(75,85,190,.04)"); glow.addColorStop(1, "rgba(5,8,17,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    const rows = hero ? 16 : 10, columns = hero ? 138 : 70;
    for (let row = 0; row <= rows; row++) {
     const v = row / rows * 2 - 1;
     for (let j = 0; j < columns; j++) {
      const p = project(j / columns, v), q = project((j + 1) / columns, v), depth = Math.max(.12, (p.z + 1.7) / 3.4), alpha = depth * (hero ? .74 : .16);
      ctx.strokeStyle = row < rows * .47 ? `rgba(89,220,244,${alpha})` : `rgba(160,134,255,${alpha})`; ctx.lineWidth = hero ? .85 : .65;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
     }
    }
    for (let j = 0; j < columns; j += 3) {
     ctx.beginPath();
     for (let row = 0; row <= rows; row++) { const p = project(j / columns, row / rows * 2 - 1); if (!row) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }
     ctx.strokeStyle = hero ? "rgba(127,202,255,.19)" : "rgba(127,202,255,.035)"; ctx.lineWidth = .5; ctx.stroke();
    }
    for (let i = 0; i < (hero ? 18 : 28); i++) {
     const x = ((i * .6180339 + .04 * Math.sin(phase * .12 + i)) % 1) * width, y = ((i * .4142135 + .035 * Math.cos(phase * .17 + i)) % 1) * height;
     ctx.fillStyle = i % 3 ? "rgba(112,214,243,.27)" : "rgba(184,163,255,.35)"; ctx.beginPath(); ctx.arc(x, y, i % 4 ? 1 : 1.8, 0, Math.PI * 2); ctx.fill();
    }
   }
   if (!preference.matches && !document.hidden && onscreen) frame = requestAnimationFrame(draw);
  };
  const render = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  const onResize = () => { resize(); render(); };
  const onPointer = (event: PointerEvent) => { pointerX = event.clientX / window.innerWidth * 2 - 1; pointerY = event.clientY / window.innerHeight * 2 - 1; };
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else render(); };
  const observer = new ResizeObserver(onResize); observer.observe(canvas); resize(); render();
  const visibilityObserver = hero && "IntersectionObserver" in window ? new IntersectionObserver(entries => { onscreen = entries[0].isIntersecting; if (onscreen) render(); else { cancelAnimationFrame(frame); frame = 0; } }) : null;
  visibilityObserver?.observe(canvas);
  window.addEventListener("pointermove", onPointer, { passive: true }); document.addEventListener("visibilitychange", onVisibility); preference.addEventListener("change", render);
  return () => { visibilityObserver?.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("pointermove", onPointer); document.removeEventListener("visibilitychange", onVisibility); preference.removeEventListener("change", render); };
 }, [hero]);
 return <div className={hero ? "hero-mesh" : "cyber-backdrop"} aria-hidden="true"><canvas ref={ref} /></div>;
}
