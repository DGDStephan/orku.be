import { motion } from "framer-motion";

const temoignages = [
  { name: "Bruno M.", feedback: "Grâce à Orku, ma facture énergétique a été divisée par deux !" },
  { name: "Olga R.", feedback: "Une équipe sérieuse et des solutions adaptées à mes besoins." },
  { name: "Stephan D.", feedback: "Excellente expertise technique, je recommande à 100% !" },
];

export default function Temoignages() {
  return (
    <section id="temoignages" className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-900">Témoignages</h2>
      <div className="flex flex-col items-center mt-8 space-y-8">
        {temoignages.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-4 shadow-md rounded-lg w-2/3 text-center"
          >
            <p className="text-gray-700 italic">"{item.feedback}"</p>
            <h3 className="text-lg font-semibold mt-2 text-orange-600">{item.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
