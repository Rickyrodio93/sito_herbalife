"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiperStyle.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { slides } from "./swiperSlide";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SwiperCard() {
  const swiperRef = useRef(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative max-w-7xl m-auto md:rounded-2xl h-[75dvh] overflow-hidden bg-zinc-950">
      {/* controlli */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 dark:hover:text-emerald-400 transition-all active:scale-95 shadow-lg"
          aria-label="Slide precedente"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 dark:hover:text-emerald-400 transition-all active:scale-95 shadow-lg"
          aria-label="Slide successiva"
        >
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 12000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full [&_.swiper-pagination-bullet-active]:bg-emerald-500! [&_.swiper-pagination-bullet]:bg-zinc-400! [&_.swiper-pagination]:bottom-6!"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            key={slide.title || index}
          >
            {/* immagine desktop */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              <Image
                fill
                src={slide.src}
                alt={slide.title || "immagine desktop"}
                priority={index === 0}
                className="object-cover select-none pointer-events-none scale-102"
                sizes="100vw"
              />
            </div>
            {/* 📱 Immagine Mobile */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
              <Image
                fill
                src={slide.srcMobile || slide.src}
                alt={slide.title || "immagine mobile"}
                priority={index === 0}
                className="object-cover select-none pointer-events-none scale-102"
                sizes="100vw"
              />
            </div>
            {/* titolo */}
            <div className="absolute top-6 left-6 z-10">
              <h3 className="px-5 py-2 text-xs bg-emerald-600/90 text-white uppercase tracking-widest font-black rounded-xl shadow-lg backdrop-blur-md border border-emerald-500/30">
                {slide.title}
              </h3>
            </div>

            {/* overlay sfumato */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-zinc-950/95 z-2"></div>

            {/* descrizione */}
            <div className="absolute bottom-16 md:bottom-24 left-0 right-0 z-10 flex flex-col items-center text-center px-8 md:px-12 gap-6 max-w-3xl mx-auto">
              <p className="text-white text-lg md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug drop-shadow-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] [-webkit-text-stroke:1px_#000000]">
                {slide.description}
              </p>

              <div className="mt-2">
                <Link
                  href={slide.linkTo || "#"}
                  target={slide.linkTo?.startsWith("http") ? "_blank" : "_self"}
                  className="inline-flex items-center justify-center bg-zinc-50 hover:bg-white text-zinc-950 font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 duration-200 no-underline"
                >
                  scopri di più
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* autoplay progress */}
        <div
          className="absolute left-6 bottom-6 md:left-auto md:right-6 z-10 w-11 h-11 flex items-center justify-center font-black text-[9px] text-emerald-400 bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm rounded-full select-none shadow-lg"
          slot="container-end"
        >
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            className="absolute inset-0 w-full -rotate-90 [&_circle]:fill-none [&_circle]:stroke-emerald-500 [&_circle]:stroke-[3px] [&_circle]:[stroke-dasharray:125.6]  [&_circle]:[stroke-dashoffset:calc(125.6px*var(--progress,0))]"
          >
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent} className="relative z-10"></span>
        </div>
      </Swiper>
    </div>
  );
}
