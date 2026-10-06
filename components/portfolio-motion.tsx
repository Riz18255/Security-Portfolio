"use client";
import { useEffect } from "react";
export function PortfolioMotion() {
 useEffect(() => {
  const items = document.querySelectorAll<HTMLElement>(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: .08, rootMargin: "0px 0px 35px 0px" });
  items.forEach(item => { item.classList.add("will-reveal"); observer.observe(item); });
  return () => { observer.disconnect(); items.forEach(item => item.classList.remove("will-reveal")); };
 }, []);
 return null;
}
