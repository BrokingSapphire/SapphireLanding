"use client";
import React, { useEffect, useRef } from 'react';

const Astronaut: React.FC = () => {
  const visorRef = useRef<HTMLCanvasElement | null>(null);
  const cordRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // === Visor Drawing ===
    const drawVisor = () => {
      const canvas = visorRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
      ctx.lineTo(15, 10);
      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);

      ctx.fillStyle = '#2f3640';
      ctx.strokeStyle = '#f5f6fa';
      ctx.fill();
      ctx.stroke();
    };

    // === Cord Animation ===
    const ctx = cordRef.current?.getContext('2d');
    if (!ctx) return;

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;
    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, cordRef.current!.width, cordRef.current!.height);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) y1Forward = true;
      if (y1 === 300) y1Forward = false;
      if (y2 === 100) y2Forward = true;
      if (y2 === 310) y2Forward = false;
      if (y3 === 100) y3Forward = true;
      if (y3 === 317) y3Forward = false;

      y1 += y1Forward ? 1 : -1;
      y2 += y2Forward ? 1 : -1;
      y3 += y3Forward ? 1 : -1;
    };

    drawVisor();
    animate();
  }, []);

  return (
    // removed absoloute
    <div className=" w-[11.5625rem] h-[18.75rem] left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] scale-[1.2]">
      {/* Backpack */}
      <div className="absolute top-[5.625rem] left-[2.9375rem] w-[5.375rem] h-[5.625rem] bg-[#bfbfbf] rounded-md" />

      {/* Body */}
      <div className="absolute top-[7.1875rem] left-[3.4375rem] w-[4.375rem] h-[5rem] bg-[#e6e6e6] rounded-md" />
      <div className="absolute top-[8.75rem] left-[4.25rem] w-[2.8125rem] h-[1.5625rem] bg-[#d9d9d9] rounded-md" />

      {/* Head */}
      <div className="absolute top-[3.75rem] left-[3.75rem] w-[3.75rem] h-[3.75rem] bg-[#d1a075] rounded-full">
        <canvas ref={visorRef} width={60} height={60} className="absolute top-0 left-0" />
        <div className="absolute top-[1.75rem] left-[2.5rem] w-[0.625rem] h-[0.625rem] bg-[#7f8fa6] rounded-full opacity-50" />
        <div className="absolute top-[2.5rem] left-[2.375rem] w-[0.3125rem] h-[0.3125rem] bg-[#718093] rounded-full opacity-30" />
      </div>

      {/* Arms */}
      <div className="absolute top-[7.9375rem] left-[0.5625rem] w-[4.0625rem] h-[1.25rem] bg-[#e6e6e6] rounded-md rotate-[-30deg]" />
      <div className="absolute top-[6.375rem] left-[0.4375rem] w-[1.25rem] h-[2.8125rem] bg-[#e6e6e6] rounded-t-full rotate-[-12deg]" />
      <div className="absolute top-[7.0625rem] left-[6.25rem] w-[4.0625rem] h-[1.25rem] bg-[#e6e6e6] rounded-md rotate-[-10deg]" />
      <div className="absolute top-[4.875rem] left-[8.8125rem] w-[1.25rem] h-[2.8125rem] bg-[#e6e6e6] rounded-t-full rotate-[-10deg]" />

      {/* Thumbs */}
      <div className="absolute top-[6.875rem] left-[1.3125rem] w-[0.625rem] h-[0.375rem] bg-[#e6e6e6] rounded-full rotate-[-35deg]" />
      <div className="absolute top-[5.625rem] left-[8.3125rem] w-[0.625rem] h-[0.375rem] bg-[#e6e6e6] rounded-full rotate-[20deg]" />

      {/* Wrists */}
      <div className="absolute top-[7.625rem] left-[0.40625rem] w-[1.3125rem] h-[0.25rem] bg-[#e67e22] rounded-full rotate-[-15deg]" />
      <div className="absolute top-[6.125rem] left-[8.8125rem] w-[1.3125rem] h-[0.25rem] bg-[#e67e22] rounded-full rotate-[-10deg]" />

      {/* Legs */}
      <div className="absolute top-[11.75rem] left-[3.125rem] w-[1.4375rem] h-[4.6875rem] bg-[#e6e6e6] rotate-[10deg]" />
      <div className="absolute top-[11.75rem] left-[6.75rem] w-[1.4375rem] h-[4.6875rem] bg-[#e6e6e6] rotate-[-10deg]" />

      {/* Feet */}
      <div className="absolute top-[15rem] left-[2.6875rem] w-[1.75rem] h-[1.25rem] bg-white rotate-[10deg] border-b-4 border-[#e67e22] rounded-t-full" />
      <div className="absolute top-[15rem] left-[6.9375rem] w-[1.75rem] h-[1.25rem] bg-white rotate-[-10deg] border-b-4 border-[#e67e22] rounded-t-full" />

      {/* Cord */}
      <div className="absolute overflow-hidden max-w-full">
        <canvas ref={cordRef} width={500} height={500} />
      </div>
    </div>
  );
};

export default Astronaut;
