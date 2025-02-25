// src/components/Timeline.js
import { motion } from 'framer-motion';

export default function Timeline() {
  const events = [
    { year: '2020', event: "Création d'Orku" },
    { year: '2021', event: "Premier partenariat stratégique" },
    { year: '2022', event: "Lancement des services d'optimisation énergétique" },
    { year: '2023', event: "Implémentation de solutions durables" },
  ];

  return (
    <div className="timeline">
      {events.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
          className="timeline-item"
        >
          <h3>{item.year}</h3>
          <p>{item.event}</p>
        </motion.div>
      ))}
    </div>
  );
}
