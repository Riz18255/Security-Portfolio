"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
export function PortfolioControls() {
 const audio = useRef<HTMLAudioElement>(null);
 const desired = useRef(false);
 const request = useRef(0);
 const [playing, setPlaying] = useState(false);
 const [failed, setFailed] = useState(false);
 useEffect(() => { if (audio.current) audio.current.volume = 0.45; }, []);
 async function toggleAudio(next: boolean) {
  const element = audio.current; if (!element) return;
  const currentRequest = ++request.current;
  desired.current = next;
  setPlaying(next);
  setFailed(false);
  if (next) {
   try {
    await element.play();
    if (!desired.current) element.pause();
   } catch {
    if (currentRequest !== request.current) return;
    desired.current = false;
    setFailed(true);
    setPlaying(false);
   }
  }
  else element.pause();
 }
 return <div className="sound-control"><audio ref={audio} loop preload="none" onPlay={() => { if (desired.current) setPlaying(true); else audio.current?.pause(); }} onPause={() => { if (audio.current?.paused) { desired.current = false; setPlaying(false); } }} onError={() => { desired.current = false; setFailed(true); setPlaying(false); }}><source src="/audio/signal-drift.mp3" type="audio/mpeg" /><source src="/audio/signal-drift.wav" type="audio/wav" /></audio><label htmlFor="portfolio-sound">{playing ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}<span>Sound</span></label><Switch id="portfolio-sound" aria-label="Background sound" checked={playing} onCheckedChange={toggleAudio} /><span className="sr-only" role="status">{failed ? "Audio unavailable. Try turning sound on again." : playing ? "Sound on" : "Sound off"}</span></div>;
}
