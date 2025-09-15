import { useState, useEffect, useRef } from "react";

/**
 * Promos.jsx
 * Props:
 *  - images: array de URLs
 *  - autoplay: boolean (default true)
 *  - interval: ms (default 5000)
 */
export default function Promos({
  images = ["/img/promo1.jpg", "/img/promo2.jpg", "/img/promo3.jpg"],
  autoplay = true,
  interval = 5000,
}) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (!autoplay) return;
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, interval);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, images.length, interval]);

  const restartIfAutoplay = () => {
    if (autoplay) {
      stopAutoplay();
      startAutoplay();
    }
  };

  const prevSlide = () => {
    setCurrent((p) => (p - 1 + images.length) % images.length);
    restartIfAutoplay();
  };

  const nextSlide = () => {
    setCurrent((p) => (p + 1) % images.length);
    restartIfAutoplay();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, autoplay]);

  return (
    <section className="py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        ¡Nuestras Promociones!
      </h2>

      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {/* Contenedor con altura responsive */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100">
          {images.map((src, i) => (
            <div
              key={i}
              aria-hidden={i !== current}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              } pointer-events-none`}
            >
              <img
                src={src}
                alt={`Promo ${i + 1}`}
                className="w-full h-full object-cover block"
                draggable="false"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Arrows (z muy alto y pointer-events enabled) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Anterior"
          title="Anterior"
          className="absolute z-50 top-1/2 left-3 -translate-y-1/2 bg-white/90 hover:bg-white text-black px-3 py-2 rounded-full shadow pointer-events-auto focus:outline-none"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Siguiente"
          title="Siguiente"
          className="absolute z-50 top-1/2 right-3 -translate-y-1/2 bg-white/90 hover:bg-white text-black px-3 py-2 rounded-full shadow pointer-events-auto focus:outline-none"
        >
          ›
        </button>

        {/* Indicadores */}
        <div className="absolute z-50 bottom-3 w-full flex justify-center space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrent(i);
                restartIfAutoplay();
              }}
              aria-label={`Ir a la promo ${i + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                current === i ? "bg-white" : "bg-white/50"
              } pointer-events-auto`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
