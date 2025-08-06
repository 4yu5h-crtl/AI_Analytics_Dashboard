import { useEffect, useState } from 'react';
import { easeOut } from 'framer-motion';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Utility function to get appropriate animation settings
export function getAnimationSettings(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      duration: 0.1,
      ease: easeOut,
      staggerChildren: 0,
      delayChildren: 0
    };
  }
  
  return {
    duration: 0.5,
    ease: easeOut,
    staggerChildren: 0.1,
    delayChildren: 0.2
  };
} 