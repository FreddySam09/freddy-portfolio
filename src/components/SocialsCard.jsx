import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SocialsCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcons = () => {
    setIsOpen(!isOpen);
  };

  const socialLinks = [
    {
      href: "https://wa.me/9360126618",
      src: "../assets/socials/whatsapp.png",
      alt: "WhatsApp",
    },
    {
      href: "https://linkedin.com/in/your-linkedin-profile",
      src: "../assets/socials/linkedin.png",
      alt: "LinkedIn",
    },
    {
      href: "https://github.com/FreddySam09",
      src: "../assets/socials/github.png",
      alt: "GitHub",
    },
    {
      href: "https://instagram.com/sam.fredx",
      src: "../assets/socials/instagram.png",
      alt: "Instagram",
    },
    {
      href: "https://letterboxd.com/samfreddy/",
      src: "../assets/socials/letterboxd.jpeg",
      alt: "Letterboxd",
    },
    {
      href: "https://musicboard.app/sam.fredx",
      src: "../assets/socials/musicboard.jpg",
      alt: "Musicboard",
    },
  ];

  return (
    <>
      <div className="relative w-72 h-80">
        <div
          className="relative bg-light border-white border-3 drop-shadow-lg rounded-3xl w-72 h-80 flex flex-col text-left cursor-pointer transition-transform hover:scale-105 hover:drop-shadow-xl overflow-hidden"
          onClick={toggleIcons}
        >
          <img
            src="../assets/socials.png"
            alt="Socials Cover"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-1 left-1 bg-light px-4 py-2 rounded-3xl text-lg font-bold shadow-[6px_6px_12px_rgba(255,255,255,0.9)]"
          >
            My Socials
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute flex flex-row gap-2 sm:gap-4 z-50"
              style={{
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
              }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: -80, scale: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    scale: 1,
                    y: [20, 10, 20],
                  }}
                  exit={{
                    opacity: 0,
                    y: -80,
                    scale: 0,
                    rotate: 180,
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: index * 0.1 },
                    y: {
                      duration: 0.5,
                      delay: index * 0.1,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                      duration: 2,
                      delay: index * 0.2,
                    },
                    scale: { duration: 0.3, delay: index * 0.1 },
                    rotate: { duration: 0.3, delay: index * 0.1 },
                  }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <div className="w-10 sm:w-14 h-10 sm:h-14 flex items-center justify-center rounded-xl bg-white drop-shadow-xl -m-1">
                    <img
                      src={link.src}
                      alt={link.alt}
                      className="max-w-full max-h-full object-contain rounded-xl border-white border-2"
                    />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SocialsCard;