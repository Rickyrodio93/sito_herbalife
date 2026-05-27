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
    // <>
    //   <h2>{section.title}</h2>
    //   <div
    //     className={`flex justify-evenly gap-12 items-center flex-col md:flex-row ${
    //       index % 2 !== 0 ? "md:flex-row-reverse" : ""
    //     }`}
    //   >
    //     {section.video ? (
    //       <ReactPlayer
    //         src={section.video}
    //         controls
    //         muted
    //         width="100%"
    //         height="auto"
    //         style={{
    //           borderRadius: "1rem",
    //           overflow: "hidden",
    //           border: "2px solid var(--color-herbalife-1)",
    //           maxWidth: "100%",
    //           aspectRatio: "16/9",
    //         }}
    //       />
    //     ) : section.image ? (
    //       <div
    //         className={`relative w-full mx-auto max-w-full md:max-w-1/2 group cursor-pointer ${section.square === true ? " max-w-87.5 aspect-square object-cover" : " h-[40vh] md:h-[50vh] aspect-video"}`}
    //       >
    //         <Image
    //           src={section.image}
    //           alt={section.title}
    //           fill
    //           sizes="(max-w-768px) 100vw, 50vw"
    //           priority={index === 0}
    //           onClick={(e) => {
    //             setZoomImage(section.image);
    //             e.preventDefault();
    //           }}
    //           className="object-contain mx-auto"
    //         />

    //         <AnimatePresence>
    //           {zoomImage && (
    //             <ZoomImage
    //               key={zoomImage}
    //               src={zoomImage}
    //               onClose={() => setZoomImage(null)}
    //             />
    //           )}
    //         </AnimatePresence>
    //       </div>
    //     ) : null}
    //     <p
    //       className={`section-p ${
    //         section.video || section.image ? "sm:max-w-1/2" : "sm:max-w-full"
    //       }`}
    //     >
    //       {section.text}
    //     </p>
    //   </div>
    // </>

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
