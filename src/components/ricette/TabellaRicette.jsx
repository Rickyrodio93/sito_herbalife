import CardRicette from "../cards/CardRicette";
import { ricette } from "./ricette";
import { motion } from "framer-motion";

export default function TabellaRicette({ searchQuery }) {
  const ricetteFiltrate = ricette.filter(
    (ricetta) =>
      ricetta.titolo &&
      ricetta.titolo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
      >
        {ricetteFiltrate.length > 0 ? (
          ricetteFiltrate.map((ricetta) => (
            <CardRicette
              key={ricetta.id}
              titolo={ricetta.titolo}
              prodotti={ricetta.prodotti}
              id={ricetta.id}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Nessuna ricetta trovata 😞
          </p>
        )}
      </motion.div>
    </>
  );
}
