"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { slides } from "./swiperSlide";

const DELAY = 8000;

// una sola immagine scaricata: desktop o mobile, a seconda dello schermo
function ImmagineSlide({ slide }) {
  const comune = {
    alt: "",
    fill: true,
    sizes: "(max-width: 768px) 100vw, 560px",
    className: "object-cover",
  };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...comune, src: slide.src });
  const {
    props: { srcSet: mobile, ...resto },
  } = getImageProps({ ...comune, src: slide.srcMobile || slide.src });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...resto} />
    </picture>
  );
}

export default function SwiperCard() {
  const swiperRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);

  // rispetta "riduci movimento"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applica = () => {
      const a = swiperRef.current?.autoplay;
      if (!a) return;
      if (mq.matches) a.stop();
      else a.start();
    };
    applica();
    mq.addEventListener("change", applica);
    return () => mq.removeEventListener("change", applica);
  }, []);

  const frecciaStyle =
    "p-2.5 rounded-xl bg-card border border-line text-zinc-700 dark:text-zinc-300 hover:text-herbalife-1 dark:hover:text-green-400 transition-all active:scale-95 shadow-sm cursor-pointer";

  return (
    <div className="mx-auto max-w-6xl text-left">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2>in evidenza</h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className={frecciaStyle}
            aria-label="Slide precedente"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className={frecciaStyle}
            aria-label="Slide successiva"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-sm">
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.realIndex)}
          onAutoplayTimeLeft={(_s, _t, progress) => {
            if (barRef.current) {
              barRef.current.style.width = `${(1 - progress) * 100}%`;
            }
          }}
          autoplay={{
            delay: DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          rewind
          speed={600}
          a11y={{ slideLabelMessage: "Slide {{index}} di {{slidesLength}}" }}
        >
          {slides.map((slide, i) => {
            const esterno = slide.linkTo.startsWith("http");
            return (
              <SwiperSlide key={slide.title} className="h-auto!">
                <article className="grid h-full grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-16/10 md:aspect-auto md:min-h-96">
                    <ImmagineSlide slide={slide} />
                  </div>

                  <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-12">
                    <span className="text-xs font-black uppercase tracking-widest text-herbalife-1 dark:text-green-400">
                      {slide.eyebrow}
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-balance text-zinc-900 md:text-4xl dark:text-zinc-50">
                      {slide.title}
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.linkTo}
                      target={esterno ? "_blank" : undefined}
                      rel={esterno ? "noopener noreferrer" : undefined}
                      tabIndex={i === active ? 0 : -1}
                      className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-herbalife-1 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white no-underline! shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.98] dark:bg-green-700"
                    >
                      {esterno ? "vai al sito" : "scopri di più"}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* avanzamento autoplay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 bg-line z-1"
        >
          <div ref={barRef} className="h-full w-0 bg-herbalife-1 dark:bg-green-500" />
        </div>
      </div>

      {/* indicatori */}
      <div className="mt-5 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => swiperRef.current?.slideTo(i)}
            aria-label={`Vai a: ${slide.title}`}
            aria-current={i === active}
            className={`relative h-2 cursor-pointer rounded-full transition-all duration-300 before:absolute before:-inset-2 before:content-[''] ${
              i === active
                ? "w-8 bg-herbalife-1 dark:bg-green-500"
                : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}