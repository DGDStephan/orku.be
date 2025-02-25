import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for the mobile menu

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [showText, setShowText] = useState(false); // New state for text visibility

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowText(window.scrollY > 100); // Show text when scrolled past 100px

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
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className={styles.logoContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <motion.div animate={{ scale: isHovered ? 1.5 : 1 }} transition={{ duration: 0.5 }}>
          <Image src="/logo-short.png" alt="Orku Logo" width={50} height={50} />
        </motion.div>

        {/* Show "Own Your Energy" when hovered OR when scrolled */}
        {(isHovered || showText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.logoText}
            style={{ whiteSpace: "nowrap", color: "#ee7042" }}
          >
            Own Your Energy
          </motion.div>
        )}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={styles.mobileMenu}
        >
          {["accueil", "services", "valeurs", "partenaires", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={activeSection === section ? styles.active : styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
