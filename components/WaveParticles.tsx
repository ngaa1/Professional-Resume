import React, { useEffect, useRef } from 'react';

const WaveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get color from CSS variable
    const getParticleColor = () => {
      const style = getComputedStyle(document.body);
      return style.getPropertyValue('--c-particle').trim() || 'rgba(14, 165, 233, 1)';
    };

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let particleColor = getParticleColor();

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
      // Refresh color on resize/init in case theme changed
      particleColor = getParticleColor(); 

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

      // Extract RGB values for alpha manipulation if needed, or just use the variable
      // For simplicity with variable opacity, we will parse the color or assume rgba
      
      particles.forEach((p) => {
        const offset = (p.col * 0.5 + p.row * 0.2) * 0.5;
        const wave = Math.sin(time + p.x * waveFrequency + offset) + 
                     Math.cos(time * 0.5 + p.y * waveFrequency);
        
        p.y = p.baseY + wave * waveAmplitude;

        const normalizedWave = (wave + 2) / 4; 
        const alpha = 0.15 + (normalizedWave * 0.25);
        const radius = baseRadius + (normalizedWave * 0.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius > 0 ? radius : 0, 0, Math.PI * 2);
        
        // We replace the alpha in the color string if possible, or just use the global color with globalAlpha
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    // Watch for theme changes via a simplified observer on body style if needed,
    // but typically a re-render or resize triggers this.
    // For now, we'll rely on the initial load and resize. 
    // To support instant theme switching, we can listen to attribute changes.
    const observer = new MutationObserver(() => {
        particleColor = getParticleColor();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }} 
    />
  );
};

export default WaveParticles;