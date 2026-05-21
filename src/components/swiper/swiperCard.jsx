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
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          className="h-[calc(100dvh-var(--spacing-nav))]! mt-15 relative"
          key={slide.title || index}
        >
          <Image
            fill
            src={slide.src}
            alt={slide.title || "immagine slide"}
            priority={index === 0}
          />

          <h3 className="absolute top-0 left-0 my-10 mx-5 px-7 py-3 text-xs md:text-lg bg-herbalife-1 text-white uppercase md:font-lg rounded-full font-sm font-medium">
            {slide.title}
          </h3>
          <div className="absolute bottom-0 w-full h-full bg-linear-to-b from-transparent to-black"></div>

          <div className="absolute bottom-0 left-0 flex flex-col justify-center mb-14 mx-auto w-full gap-5">
            <p className="text-white font-medium flex justify-center text-base md:text-2xl mx-14 md:m-auto max-w-5xl drop-shadow-[0_0_5px_rgba(0,0,0,0)]">
              {slide.description}
            </p>
            <span>
              <Link
                href={slide.linkTo || "#"}
                className="bg-herbalife-1 hover:bg-herbalife-2 text-white hover:text-herbalife-1 px-6 py-3 rounded-full text-xs md:text-base font-semibold uppercase"
              >
                scopri di più
              </Link>
            </span>
          </div>
        </SwiperSlide>
      ))}

      <div className="autoplay-progress text-herbalife-2" slot="container-end">
        <svg
          viewBox="0 0 48 48"
          ref={progressCircle}
          className="text-herbalife-2"
        >
          <circle cx="24" cy="24" r="20" className="stoke-lake" />
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}
