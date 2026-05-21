"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ZoomImage from "../zoomImage/ZoomImage";
import Image from "next/image";

export default function SectionComponent({ section, index }) {
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <>
      <h2>{section.title}</h2>
      <div
        className={`flex justify-evenly gap-12 items-center flex-col md:flex-row ${
          index % 2 !== 0 ? "md:flex-row-reverse" : ""
        }`}
      >
        {section.video ? (
          <ReactPlayer
            src={section.video}
            controls
            muted
            width="100%"
            height="auto"
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              border: "2px solid var(--color-herbalife-1)",
              maxWidth: "100%",
              aspectRatio: "16/9",
            }}
          />
        ) : section.image ? (
          <div
            className={`relative w-full mx-auto max-w-full md:max-w-1/2 group cursor-pointer ${section.square === true ? " max-w-87.5 aspect-square object-cover" : " h-[40vh] md:h-[50vh] aspect-video"}`}
          >
            <Image
              src={section.image}
              alt={section.title}
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              priority={index === 0}
              onClick={(e) => {
                setZoomImage(section.image);
                e.preventDefault();
              }}
              className="object-contain mx-auto"
            />

            <AnimatePresence>
              {zoomImage && (
                <ZoomImage
                  key={zoomImage}
                  src={zoomImage}
                  onClose={() => setZoomImage(null)}
                />
              )}
            </AnimatePresence>
          </div>
        ) : null}
        <p
          className={`section-p ${
            section.video || section.image ? "sm:max-w-1/2" : "sm:max-w-full"
          }`}
        >
          {section.text}
        </p>
      </div>
    </>
  );
}
