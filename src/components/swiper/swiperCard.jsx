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

export default function SwiperCard() {
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
    <div className="relative w-full h-dvh mt-15 overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full 
          [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden md:[&_.swiper-button-next]:flex md:[&_.swiper-button-prev]:flex
          [&_.swiper-button-next]:w-14! [&_.swiper-button-next]:h-14! [&_.swiper-button-prev]:w-14! [&_.swiper-button-prev]:h-14!
          [&_.swiper-button-next]:bg-herbalife-1! [&_.swiper-button-prev]:bg-herbalife-1!
          [&_.swiper-button-next]:text-herbalife-2! [&_.swiper-button-prev]:text-herbalife-2!
          [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full
          [&_.swiper-button-next::after]:text-lg [&_.swiper-button-prev::after]:text-lg
          [&_.swiper-navigation-icon]:w-4!
          [&_.swiper-pagination-bullet-active]:bg-herbalife-2! [&_.swiper-pagination-bullet]:bg-zinc-300!"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            key={slide.title || index}
          >
            {/* Immagine con ottimizzazione e un leggero scale iniziale */}
            <Image
              fill
              src={slide.src}
              alt={slide.title || "immagine slide"}
              priority={index === 0}
              className="object-cover select-none pointer-events-none"
              sizes="100vw"
            />

            {/* Badge categoria / Titolo alto */}
            <div className="absolute top-6 left-6 z-10">
              <h3 className="px-5 py-2 text-xs md:text-sm bg-herbalife-1/90 text-white uppercase tracking-wider font-bold rounded-full shadow-lg backdrop-blur-xs">
                {slide.title}
              </h3>
            </div>

            {/* Overlay Sfumato - Più scuro sotto per far risaltare i testi */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80 z-2"></div>

            {/* Contenuto Informativo Centrato/Basso */}
            <div className="absolute bottom-20 left-0 right-0 z-10 flex flex-col items-center text-center px-6 md:px-12 gap-6 max-w-4xl mx-auto">
              <p className="text-white text-lg md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                {slide.description}
              </p>

              <div className="mt-2">
                <Link
                  href={slide.linkTo || "#"}
                  className="inline-flex items-center justify-center bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-8 py-3.5 rounded-full text-xs md:text-sm uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 duration-200"
                >
                  scopri di più
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          className="absolute right-4 bottom-4 z-10 w-12 h-12 flex items-center justify-center font-bold text-xs text-herbalife-2 bg-black/30 backdrop-blur-xs rounded-full"
          slot="container-end"
        >
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            className="absolute inset-0 w-full h-full -rotate-90 
            [&_circle]:fill-none [&_circle]:stroke-herbalife-1 [&_circle]:stroke-[4px]
            [&_circle]:[stroke-dasharray:125.6] 
            [&_circle]:[stroke-dashoffset:calc(125.6px*var(--progress,0))]"
          >
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent} className="relative z-10"></span>
        </div>
      </Swiper>
    </div>
  );
}
