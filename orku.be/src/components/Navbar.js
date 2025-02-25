import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active le logo après l'apparition de la navbar
      if (window.scrollY > 60 && !showLogo) {
        setShowLogo(true);
      }

      // Active le texte après l'apparition du logo
      if (window.scrollY > 100 && !showText) {
        setShowText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showLogo, showText]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -20 }}
      transition={{ duration: 1 }}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.logoWrapper}>
        {/* Logo avec effet pop-up */}
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image src="/logo-short.png" alt="Orku Logo" width={50} height={50} />
        </motion.div>

        {/* Texte "Own Your Energy" séparé du logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className={styles.logoText}
        >
          Own Your Energy
        </motion.div>
      </div>

      {/* Desktop Navigation */}
      <ul className={styles.navLinks}>
        {["accueil", "services", "valeurs", "partenaires", "contact"].map((section) => (
          <li key={section}>
            <Link href={`#${section}`} className={activeSection === section ? styles.active : styles.navLink}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bouton menu uniquement sur mobile */}
      <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX size={28} color="#fff" /> : <FiMenu size={28} color="#fff" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {["accueil", "services", "valeurs", "partenaires", "contact"].map((section) => (
            <Link key={section} href={`#${section}`} onClick={() => setIsMenuOpen(false)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
