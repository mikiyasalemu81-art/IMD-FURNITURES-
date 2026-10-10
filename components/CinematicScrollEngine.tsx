'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function CinematicScrollEngine() {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Initialize Lenis with custom luxury momentum lerp factor
    const lenis = new Lenis({
      lerp: 0.075, // Ultra-smooth inertial momentum scroll (Awwwards standard)
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally available for smooth anchor navigation
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Smooth anchor link interception
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80, // Fixed navbar offset
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          history.pushState(null, '', href);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    const ctx = gsap.context(() => {
      // ----------------------------------------------------------------------
      // 2. Velocity-based 3D skews along Z and Y axes
      // ----------------------------------------------------------------------
      let skewSetter: gsap.QuickToFunc | null = null;
      let rotateXSetter: gsap.QuickToFunc | null = null;
      const skewTargets = document.querySelectorAll('.velocity-skew');

      if (skewTargets.length > 0) {
        skewSetter = gsap.quickTo('.velocity-skew', 'skewY', {
          duration: 0.5,
          ease: 'power2.out',
        });
        rotateXSetter = gsap.quickTo('.velocity-skew', 'rotateX', {
          duration: 0.5,
          ease: 'power2.out',
        });

        lenis.on('scroll', ({ velocity }: { velocity: number }) => {
          // Clamp velocity skew to prevent extreme distortion while keeping tactile inertia
          const clampedSkew = gsap.utils.clamp(-3.5, 3.5, velocity * 0.08);
          const clampedRotateX = gsap.utils.clamp(-3, 3, -velocity * 0.05);

          if (skewSetter) skewSetter(clampedSkew);
          if (rotateXSetter) rotateXSetter(clampedRotateX);
        });
      }

      // ----------------------------------------------------------------------
      // 3. Multi-directional split planes: adjacent columns slide in opposite directions
      // ----------------------------------------------------------------------
      const splitPlaneContainers = document.querySelectorAll('.split-plane-container');
      splitPlaneContainers.forEach((container) => {
        const leftCol = container.querySelector('.split-plane-left');
        const rightCol = container.querySelector('.split-plane-right');

        if (leftCol && rightCol) {
          // Left column slides upward faster
          gsap.fromTo(
            leftCol,
            { y: 35 },
            {
              y: -35,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );

          // Right column slides simultaneously in opposing counter-direction
          gsap.fromTo(
            rightCol,
            { y: -35 },
            {
              y: 35,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });

      // ----------------------------------------------------------------------
      // 4. Layered 3D parallax across distinct Translate-Z depths
      // ----------------------------------------------------------------------
      const parallax3DSections = document.querySelectorAll('.parallax-3d-scene');
      parallax3DSections.forEach((scene) => {
        const bg = scene.querySelector('.parallax-depth-bg');
        const fg = scene.querySelector('.parallax-depth-fg');

        if (bg) {
          gsap.fromTo(
            bg,
            { y: -60, scale: 0.95 },
            {
              y: 60,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }

        if (fg) {
          gsap.fromTo(
            fg,
            { y: 40 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });

      // ----------------------------------------------------------------------
      // 5. Scrub-linked kinetic typography: blur-to-sharp focal transition & scaling
      // ----------------------------------------------------------------------
      const kineticHeadings = document.querySelectorAll<HTMLElement>('.kinetic-text');
      kineticHeadings.forEach((heading) => {
        // Wrap words in spans if not already wrapped
        if (!heading.dataset.split) {
          const words = heading.innerText.split(' ');
          heading.innerHTML = words
            .map(
              (word) =>
                `<span class="kinetic-word inline-block will-change-transform will-change-filter">${word}&nbsp;</span>`
            )
            .join('');
          heading.dataset.split = 'true';
        }

        const words = heading.querySelectorAll('.kinetic-word');
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            filter: 'blur(10px)',
            scale: 1.08,
            y: 18,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      });

      // ----------------------------------------------------------------------
      // 6. Morphing geometry transitions: pinned card expands into full-bleed section
      // ----------------------------------------------------------------------
      const morphSection = document.querySelector('.morphing-geometry-trigger');
      const morphCard = document.querySelector('.morphing-geometry-card');
      const morphBackdrop = document.querySelector('.morphing-geometry-backdrop');

      if (morphSection && morphCard) {
        const morphTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: morphSection,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        morphTimeline
          .fromTo(
            morphCard,
            {
              width: '88%',
              maxWidth: '1080px',
              borderRadius: '36px',
              rotateX: 6,
              scale: 0.92,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
            },
            {
              width: '100%',
              maxWidth: '100%',
              borderRadius: '0px',
              rotateX: 0,
              scale: 1,
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              ease: 'power1.inOut',
            }
          )
          .fromTo(
            morphBackdrop,
            { opacity: 0.4, scale: 1.1 },
            { opacity: 0.9, scale: 1, ease: 'power1.inOut' },
            0
          );
      }

      // Refresh measurements once fonts & layout have settled
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);

      return () => clearTimeout(refreshTimer);
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return null;
}
