'use client';

import { useEffect, useRef, useState } from 'react';
import { stripTestimonials, type Testimonial } from '@/lib/testimonials';

function Stars({ count }: { count: number }) {
  return (
    <span className="ts-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="ts-card">
      <Stars count={t.stars} />
      <blockquote className="ts-quote">&ldquo;{t.quote}&rdquo;</blockquote>
      <p className="ts-attribution">
        {t.name}{t.city ? `, ${t.city}` : ''}
      </p>
    </div>
  );
}

export default function TestimonialStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let pos = 0;
    const speed = 0.4;

    function step() {
      if (!paused && track) {
        pos += speed;
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const doubled = [...stripTestimonials, ...stripTestimonials];

  return (
    <section
      className="ts-strip"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ts-overflow">
        <div className="ts-track" ref={trackRef}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
