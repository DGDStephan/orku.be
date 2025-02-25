import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}

        className={styles.logoContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}

        >
          <Image src="/logo-short.png" alt="Orku Logo" width={50} height={50} />
        </motion.div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className={styles.logoText}
            style={{ whiteSpace: "nowrap", color: "#ee7042" }}
          >
            Own Your Energy
          </motion.div>
        )}
      </motion.div>

      <ul className={styles.navLinks}>
        {["accueil", "services", "valeurs", "partenaires", "contact"].map((section) => (
          <li key={section}>
            <Link href={`#${section}`} className={activeSection === section ? styles.active : styles.navLink}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
