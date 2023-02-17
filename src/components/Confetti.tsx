/*
  A huge thanks to @sonvt-fe on GitHub for most of the code for the snow effect!
  https://github.com/sonvt-fe/html-canvas-snow-effect

  Happy Holidays!
  - Auti
*/

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const confettiColors = ["#39f", "#9f6", "#f69", "#fc0", "#c9f", "#ff0"];

class Confetti {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  speedX: number;
  speedY: number;
  color: string;

  draw: (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;

  random = (min: number, max: number) => {
    return min + Math.random() * (max - min + 1);
  };

  constructor(window: Window) {
    this.x1 = Math.random() * window.innerWidth;
    this.y1 = Math.random() * window.innerHeight;

    this.x2 = this.random(this.x1 - 15, this.x1 + 15);
    this.y2 = this.random(this.y1 - 15, this.y1 + 15);

    this.speedX = this.random(-1, 1);
    this.speedY = this.random(1, 2.5);
    this.color =
      confettiColors[
        Math.floor(Math.random() * (confettiColors.length - 1) + 1)
      ];

    this.draw = (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();

      this.x1 += this.speedX;
      this.y1 += this.speedY;

      this.x2 += this.speedX;
      this.y2 += this.speedY;

      if (this.y1 > c.height) {
        this.x1 = Math.random() * c.width * 1.5;
        this.y1 = -10;

        this.x2 = this.random(this.x1 - 20, this.x1 + 20);
        this.y2 = this.random(this.y1 - 20, this.y1 + 20);
      }
    };
  }
}

interface ConfettiCanvasProps {
  className: string;
  hide?: boolean;
}

export default function ConfettiCanvas({
  className,
  hide,
}: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const totalConfetti = 100;
  const listConfetti = useMemo(() => {
    const confetties = [];

    if (typeof window !== "undefined") {
      for (let i = 0; i < totalConfetti; i++) {
        confetties.push(new Confetti(window));
      }
    }

    return confetties;
  }, []);

  const [drawWidth, setDrawWidth] = useState(0);
  const [drawHeight, setDrawHeight] = useState(0);

  const draw = useCallback(
    (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      if (typeof window !== "undefined") {
        ctx.clearRect(0, 0, drawWidth, drawHeight);

        listConfetti.forEach((particle) => {
          particle.draw(c, ctx);
        });

        requestAnimationFrame(() => draw(c, ctx));
      }
    },
    [drawHeight, drawWidth, listConfetti]
  );

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;

    if (typeof window !== "undefined") {
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      setDrawWidth(c.width);
      setDrawHeight(c.height);
    }

    draw(c, ctx);
  }, [listConfetti, draw]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        const c = canvasRef.current;
        if (c) {
          c.width = window.innerWidth;
          c.height = window.innerHeight;
          setDrawWidth(c.width);
          setDrawHeight(c.height);
        }
      });
    }
  }, [drawHeight, drawWidth]);

  return <canvas ref={canvasRef as any} className={className} />;
}
