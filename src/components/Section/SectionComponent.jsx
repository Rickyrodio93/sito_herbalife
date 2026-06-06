"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import ZoomImage from "../zoomImage/ZoomImage";
import Image from "next/image";

export default function SectionComponent({ section, index }) {
  const [zoomImage, setZoomImage] = useState(null);

  const hasMedia = section.video || section.image;
  const hasText = !!section.text;

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-12 text-left">
        <h2>{section.title}</h2>

        <div
          className={`grid grid-cols-1 items-center gap-10 md:gap-16 ${hasMedia && hasText ? "md:grid-cols-2" : "grid-cols-1 maw-w-3xl mx-auto w-full"}`}
        >
          {/* colonna 1 */}
          {hasMedia && (
            <div
              className={`w-full flex items-center justify-center ${index % 2 !== 0 && hasText ? "md:order-last" : "md:order-first"}`}
            >
              {/* gestione video */}
              {section.video && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg bg-black">
                  <ReactPlayer
                    src={section.video}
                    controls
                    muted
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          style: {
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
              {/* gestione immagine */}
              {section.image && (
                <div
                  onClick={(e) => {
                    setZoomImage(section.image);
                    e.preventDefault();
                  }}
                  className={`relative group cursor-zoom-in w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 overflow-hidden shadow-md transition-all duration-300 hover:border-herbalife-1 dark:hover:border-green-500 hover:shadow-xl ${section.square ? "max-w-sm aspect-square" : "aspect-video"}`}
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
              )}
            </div>
          )}
          {/* colonna 2 */}
          {hasText && (
            <div className="w-full flex flex-col justify-center">
              <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed font-normal whitespace-pre-line">
                {section.text}
              </p>
            </div>
          )}
        </div>

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
    </>
  );
}
