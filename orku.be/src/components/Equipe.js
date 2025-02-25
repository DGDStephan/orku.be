import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  { name: "Stephan D.", role: "Fondateur & Expert en énergie", image: "/stephan.jpg", description: "Passionné par l'énergie et les solutions durables, Stephan est à l'origine d'Orku." },
  { name: "Olga R.", role: "Ingénieure systèmes", image: "/olga.jpg", description: "Experte en domotique et gestion de l’énergie, elle optimise les installations." },
  { name: "Bruno M.", role: "Technicien en énergie", image: "/bruno.jpg", description: "Spécialiste des solutions solaires et pompes à chaleur." },
];

export default function Equipe() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="equipe" className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-900">Notre Équipe</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="relative w-64 h-80 cursor-pointer" onClick={() => setSelected(selected === index ? null : index)}>
            {/* Image initiale */}
            <AnimatePresence>
              {selected !== index && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg"
                >
                  <Image src={member.image} alt={member.name} width={256} height={320} className="rounded-lg" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Descriptif qui apparaît au clic */}
            <AnimatePresence>
              {selected === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900 text-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm italic">{member.role}</p>
                  <p className="mt-2 text-center">{member.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
