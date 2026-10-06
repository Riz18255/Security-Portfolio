// Smooth automatic rotation and floating motion for sculpture renderers.
export function createSceneMotion(_host: HTMLDivElement, preference: MediaQueryList) {
  let phase = 0;

  return {
    update(elapsed: number) {
      // Clamped delta time in milliseconds, converted to seconds
      const dt = Math.min(100, Math.max(0, elapsed));
      const delta = dt / 1000;

      if (!preference.matches) {
        // Continuous smooth auto-rotation: 0.2 rad/sec around Y axis
        phase += delta * 0.2;
      }

      // Preserved initial orientation: x: 0.48, y: -0.42, z: -0.27
      const initialX = 0.48;
      const initialY = -0.42;
      const initialZ = -0.27;

      if (preference.matches) {
        return {
          x: initialX,
          y: initialY,
          z: initialZ,
          lift: 0,
          phase: 0,
          layers: [0, 0, 0]
        };
      }

      return {
        // Subtle tilt oscillation on X axis
        x: initialX + Math.sin(phase * 0.8) * 0.08,
        // Continuous smooth rotation around Y axis
        y: initialY + phase,
        // Subtle depth oscillation on Z axis
        z: initialZ + Math.sin(phase * 0.6) * 0.06,
        // Gentle vertical floating motion
        lift: Math.sin(phase * 1.5) * 0.06,
        phase,
        // Concentric sculpted layer twists
        layers: [0, 1, 2].map(k => Math.sin(phase * 1.15 + k) * 0.22 + (k - 1) * phase * 0.12)
      };
    },
    dispose() {}
  };
}
