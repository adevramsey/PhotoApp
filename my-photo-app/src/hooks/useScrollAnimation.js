import { useEffect, useRef, useState } from 'react';

/**
 * useScrollAnimation Hook - Trigger animations when elements enter viewport
 * 
 * Uses Intersection Observer API to detect when elements are visible
 * Adds animation classes when elements scroll into view
 * 
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Percentage of element visible before triggering (0-1)
 * @param {string} options.rootMargin - Margin around viewport for early triggering
 * @param {boolean} options.triggerOnce - Only trigger animation once (default: true)
 * @returns {Object} Ref to attach to element and animation state
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Stop observing if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}

/**
 * useStaggeredAnimation Hook - Stagger animations for multiple elements
 * 
 * Creates a staggered animation effect for lists or grids
 * Each element animates with a delay based on its index
 * 
 * @param {number} staggerDelay - Delay between each element (ms)
 * @returns {Function} Function to get animation delay for element
 */
export function useStaggeredAnimation(staggerDelay = 50) {
  const getDelay = (index) => {
    return `${index * staggerDelay}ms`;
  };

  const getStyle = (index) => {
    return {
      animationDelay: getDelay(index),
    };
  };

  return { getDelay, getStyle };
}