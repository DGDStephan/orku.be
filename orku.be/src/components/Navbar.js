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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowText(window.scrollY > 100);

      const sections = document.querySelectorAll("section");
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute("id");
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -20 }}
      transition={{ duration: 0.7 }}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      {/* Logo Section */}
      <motion.div
        className={styles.logoContainer}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image src="/logo-short.png" alt="Orku Logo" width={50} height={50} />
        <motion.div
          className={`${styles.logoText} ${showText ? styles.showText : ""}`}
          style={{ position: "relative", zIndex: 1000 }}
        >
          Own Your Energy
        </motion.div>
      </motion.div>

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

      {/* Mobile Menu */}
      <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX size={28} color="#fff" /> : <FiMenu size={28} color="#fff" />}
      </button>

      {/* Mobile Menu Overlay */}
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
