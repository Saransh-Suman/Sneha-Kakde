import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';

export default function CraftGalleryModal({ item, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, scale]);

  // Non-passive wheel and pinch touch zoom listeners (fixes "Unable to preventDefault inside passive event listener")
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDistance = 0;
    let initialScale = 1;

    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleNativeWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.35 : -0.35;
        setScale((prev) => {
          const next = Math.min(Math.max(prev + delta, 1), 4);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };

    const handleNativeTouchStart = (e) => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
        initialScale = scale;
      }
    };

    const handleNativeTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        if (initialDistance > 0) {
          const newScale = Math.min(Math.max(initialScale * (currentDistance / initialDistance), 1), 4);
          setScale(newScale);
          if (newScale === 1) setPosition({ x: 0, y: 0 });
        }
      }
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    container.addEventListener('touchstart', handleNativeTouchStart, { passive: true });
    container.addEventListener('touchmove', handleNativeTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
      container.removeEventListener('touchstart', handleNativeTouchStart);
      container.removeEventListener('touchmove', handleNativeTouchMove);
    };
  }, [scale]);

  if (!item) return null;

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support for Mobile Drag / Pan (Single finger)
  const handleTouchStart = (e) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/92 backdrop-blur-md flex flex-col justify-between items-center p-1 sm:p-6">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Top Floating Header & Controls */}
        <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-1 sm:pt-2 px-1.5 sm:px-2 text-white gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Viewer</span>
            </div>
            <span className="text-[11px] text-neutral-400 hidden sm:inline-block truncate">
              {scale > 1 ? 'Drag to pan • Double-click to reset' : 'Double-click to zoom'}
            </span>
          </div>

          {/* Floating Zoom & Action Pill Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-900/90 border border-neutral-700/80 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-xl backdrop-blur-md">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              
              <span className="text-[10px] sm:text-xs font-mono font-bold px-1 sm:px-2 text-neutral-200 min-w-[34px] sm:min-w-[45px] text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {scale > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-pink-400 transition-colors ml-0.5 sm:ml-1 border-l border-neutral-700 pl-1 sm:pl-2 cursor-pointer"
                  title="Reset Zoom (0)"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Center Canvas: Fully Scrollable and Zoomable Image Viewport */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-6xl flex-1 my-1 sm:my-3 rounded-lg sm:rounded-3xl bg-neutral-950/80 border border-neutral-800/80 overflow-auto flex items-center justify-center p-0.5 sm:p-8 select-none touch-none ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
        >
          <motion.div
            animate={{
              scale: scale,
              x: position.x,
              y: position.y
            }}
            transition={{
              type: isDragging ? false : 'spring',
              stiffness: 300,
              damping: 30
            }}
            onDoubleClick={handleDoubleClick}
            className="relative flex items-center justify-center max-h-full max-w-full origin-center transition-transform"
          >
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="max-h-[78vh] sm:max-h-[74vh] max-w-full w-auto h-auto object-contain rounded-md sm:rounded-lg shadow-2xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Bottom Information Footer Bar */}
        <div className="w-full max-w-6xl bg-neutral-900/90 border border-neutral-800 rounded-lg sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-3 backdrop-blur-md">
          <div className="min-w-0">
            <h3 className="text-xs sm:text-lg font-bold text-white tracking-tight truncate">
              {item.title}
            </h3>
            <p className="text-[10px] sm:text-sm text-neutral-400 mt-0.5 line-clamp-1">
              {item.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <span className="text-[10px] text-neutral-500 hidden md:inline-block">
              Tip: Drag image when zoomed in
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-1 sm:py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer text-center"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
}
