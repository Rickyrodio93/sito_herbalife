import { motion } from "framer-motion";

export default function CardRicette({ titolo, id }) {
  // formattazione per caricare correttamente le immagini e i file
  const formatID = (id) => {
    if (!id) return "000";
    if (id.toString().length == 1) return `00${id}`;
    if (id.toString().length == 2) return `0${id}`;
    return id.toString();
  };

  //varianti per animazione

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="w-full p-4 aspect-3/4 lg:aspect-7/9 bg-white dark:bg-[#333333] rounded-lg"
      >
        <div
          className="h-3/4 bg-no-repeat bg-center bg-cover flex justify-center items-center rounded-md"
          style={{
            backgroundImage: `url(/immagini/ricette/fotoRicette/${formatID(
              id
            )}.webp)`,
          }}
        ></div>
        <div className="h-37.5 flex flex-col justify-between items-center">
          <h3 className="text-herbalife-1 capitalize font-bold text-xl">
            {titolo}
          </h3>
          <a
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#333333] dark:hover:bg-[#131313]"
            href={`/documenti/ricette/${formatID(id)}.pdf`}
            target="_blank"
          >
            scopri di più
          </a>
        </div>
      </motion.div>
    </>
  );
}
