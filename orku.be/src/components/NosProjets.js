import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  { title: "Installation solaire", image: "/projet1.jpg", description: "Optimisation de l'autonomie énergétique d'un bâtiment." },
  { title: "Gestion domotique", image: "/projet2.jpg", description: "Intégration d'un système de pilotage intelligent." },
  { title: "Pompe à chaleur hybride", image: "/projet3.jpg", description: "Amélioration des performances énergétiques." },
];

export default function NosProjets() {
  return (
    <section id="nos-projets" className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-900">Nos Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-100 p-4 shadow-md rounded-lg"
          >
            <Image src={project.image} alt={project.title} width={400} height={250} className="rounded-md" />
            <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
