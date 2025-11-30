import React, { useEffect, useRef } from 'react';

const WaveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Configuration
    const spacing = 20; // Space between dots
    const baseRadius = 1; // Size of dots
    const waveSpeed = 0.015; // Speed of animation
    const waveAmplitude = 15; // Height of wave
    const waveFrequency = 0.03; // "Tightness" of wave

    interface Particle {
      x: number;
      y: number;
      baseY: number;
      col: number;
      row: number;
    }

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = [];

      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacing,
            y: j * spacing,
            baseY: j * spacing,
            col: i,
            row: j
          });
        }
      }
    };

    let time = 0;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      time += waveSpeed;

      particles.forEach((p) => {
        // Calculate wave motion based on grid position and time
        // Using both row and col creates a 3D-like diagonal wave surface
        const offset = (p.col * 0.5 + p.row * 0.2) * 0.5;
        const wave = Math.sin(time + p.x * waveFrequency + offset) + 
                     Math.cos(time * 0.5 + p.y * waveFrequency);
        
        p.y = p.baseY + wave * waveAmplitude;

        // Visual properties based on wave height (simulating depth/lighting)
        // Normalize wave to 0-1 range roughly
        const normalizedWave = (wave + 2) / 4; 
        
        // Alpha: Higher points are more opaque (closer to light)
        const alpha = 0.15 + (normalizedWave * 0.25);
        
        // Radius: Higher points are slightly larger (closer to camera)
        const radius = baseRadius + (normalizedWave * 0.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius > 0 ? radius : 0, 0, Math.PI * 2);
        
        // Use the accent color (#0ea5e9)
        ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`; 
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default WaveParticles;