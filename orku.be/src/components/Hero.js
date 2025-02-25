import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        {/* Logo et texte animés centrés */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles.heroLogoContainer}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        >
          <Image
            src="/LOGO-BLANC-TRANSPARANT.png"
            alt="Orku Logo"
            width={300}
            height={200}
          />
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
            className={styles.heroText}
            style={{ color: "white", marginTop: "-50px", textAlign: "center", fontFamily: "Karla, sans-serif", fontWeight: "bold", fontSize: "2rem" }}
          >
            Own Your Energy
          </motion.h1>
        </motion.div>
      </section>

      {/* Transition vers Nos Valeurs */}
      <motion.section
        className={styles.valuesSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 0 : 1, y: isVisible ? 50 : 0 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      >
        <h2 className={styles.valuesTitle}>Nos Valeurs</h2>
        <p className={styles.valuesDescription}>Découvrez notre engagement envers l'énergie durable et responsable.</p>
      </motion.section>
    </ParallaxProvider>
  );
}
