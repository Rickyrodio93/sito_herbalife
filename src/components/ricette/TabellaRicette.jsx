import CardRicette from "../cards/CardRicette";
import { ricette } from "./ricette";
import { motion } from "framer-motion";

export default function TabellaRicette({ searchQuery = "" }) {
const isSearching = searchQuery.trim() !== "";

  const ricetteFiltrate = ricette.filter(
    (ricetta) =>
      ricetta.titolo &&
      ricetta.titolo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const ricetteInvertite = [...ricetteFiltrate].reverse();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
      <div className="w-full p-4 max-w-5xl mx-auto mb-20">
        {ricetteInvertite.length > 0 ? (
          <motion.div
            initial={isSearching ? "hidden" : "visible"}
          animate={!isSearching ? "visible" : undefined}
          whileInView={isSearching ? "visible" : undefined}
          
          viewport={{ once: true, amount: 0, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
          >
            {ricetteInvertite.map((ricetta) => (
            <CardRicette
              key={ricetta.id}
              titolo={ricetta.titolo}
              prodotti={ricetta.prodotti}
              id={ricetta.id}
            />
          ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-zinc-400 dark:text-zinc-500 font-medium"
          >
            Nessuna ricetta trovata 😞
          </motion.div>
        )}
      </div>
    </>
  );
}
