import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for the mobile menu

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [showText, setShowText] = useState(false); // Show "Own Your Energy" on scroll

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowText(window.scrollY > 100); // Afficher le texte après 100px de scroll

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
      transition={{ duration: 1.2 }}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      {/* Logo Section */}
      <motion.div className={styles.logoContainer}>
        <Image src="/logo-short.png" alt="Orku Logo" width={50} height={50} />

        {/* Show "Own Your Energy" when scrolled */}
        <motion.div
          className={`${styles.logoText} ${showText ? styles.showText : ""}`}
          style={{ position: "relative", zIndex: 1000 }}
        >
          Own Your Energy
        </motion.div>
      </motion.div>

      {/* Desktop Navigation */}
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
        {["accueil", "services", "valeurs", "partenaires", "contact"].map((section) => (
          <li key={section}>
            <Link
              href={`#${section}`}
              className={activeSection === section ? styles.active : styles.navLink}
              onClick={() => setIsMenuOpen(false)} // Close menu when a link is clicked
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX size={28} color="#fff" /> : <FiMenu size={28} color="#fff" />}
      </button>
    </motion.nav>
  );
}
