import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const albums = [
  {
    title: "Kagayaki (かがやき)",
    artist: "Masakatsu Takagi",
    cover: "../assets/covers/kagayaki.jpeg",
    description: "A soothing piano-driven album that feels like a warm sunrise.",
  },
  {
    title: "Lift Your Skinny Fists Like Antennas to Heaven",
    artist: "Godspeed You! Black Emperor",
    cover: "../assets/covers/gybe.jpg",
    description: "A post-rock masterpiece filled with emotion and grandeur.",
  },
  {
    title: "De Todas Las Flores",
    artist: "Natalia Lafourcade",
    cover: "../assets/covers/detodas.jpg",
    description: "A poetic and rich exploration of Latin folk music.",
  },
  {
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    cover: "../assets/covers/tpab.jpeg",
    description: "A groundbreaking hip-hop album blending jazz, funk, and political messages.",
  },
  {
    title: "Nurture",
    artist: "Porter Robinson",
    cover: "../assets/covers/nurture.jpeg",
    description: "An emotional electronic album about self-acceptance and creativity.",
  },
  {
    title: "Vespertine",
    artist: "Bjork",
    cover: "../assets/covers/vespertine.jpeg",
    description: "A delicate, intimate soundscape filled with intricate textures.",
  },
  {
    title: "gift-live at sogetsu hall",
    artist: "Ichiko Aoba",
    cover: "../assets/covers/gift.jpeg",
    description: "A breathtaking live performance with ethereal acoustic melodies.",
  },
];

const MusicCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const nextAlbum = () => {
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  };

  const prevAlbum = () => {
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };

  const calculateModalPosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 + scrollTop;
    return { x: centerX, y: centerY };
  };

  const openModal = (e) => {
    setModalPosition(calculateModalPosition(e));
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="relative bg-light border-white border-3 drop-shadow-lg rounded-3xl w-64 sm:w-72 h-72 sm:h-80 flex flex-col text-left cursor-pointer transition-transform hover:scale-105 hover:drop-shadow-xl overflow-hidden"
      >
        <img
          src="../assets/music.png"
          alt="Music Cover"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1 left-1 bg-light px-4 py-2 rounded-3xl text-base sm:text-lg font-bold shadow-[6px_6px_12px_rgba(255,255,255,0.9)]"
        >
          What I Listen to?
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50"
            style={{ left: modalPosition.x, top: modalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl w-[280px] sm:w-[480px] h-[320px] sm:h-[480px] flex flex-col items-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
              <div className="relative w-48 sm:w-64 h-48 sm:h-64 mt-16">
                {albums.map((album, index) => (
                  <motion.img
                    key={index}
                    src={album.cover}
                    alt={album.title}
                    className="absolute w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transition-all"
                    style={{
                      transform: `translate(${(index - currentIndex) * 12}px, ${(index - currentIndex) * 12}px) scale(${
                        index === currentIndex ? 1 : 0.9
                      }) rotate(${(index - currentIndex) * 3}deg)`,
                      zIndex: index === currentIndex ? 10 : 5,
                      opacity: index === currentIndex ? 1 : 0.5,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setShowDetails(true)}
                  />
                ))}
              </div>
              <div className="mt-8 flex space-x-6 bg-white rounded-full p-2 z-5">
                <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={prevAlbum}>
                  ◀
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={nextAlbum}>
                  ▶
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute z-50"
            style={{ left: modalPosition.x, top: modalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl w-[280px] sm:w-[480px] h-[280px] sm:h-[380px] flex flex-col items-center overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
              <img
                src={albums[currentIndex].cover}
                alt={albums[currentIndex].title}
                className="w-40 sm:w-48 h-40 sm:h-48 object-cover rounded-lg shadow-lg"
              />
              <h2 className="text-lg sm:text-xl font-bold text-center mt-4">{albums[currentIndex].title}</h2>
              <p className="text-sm sm:text-md text-gray-600">{albums[currentIndex].artist}</p>
              <p className="text-xs sm:text-sm text-gray-700 mt-4 px-6 text-center">{albums[currentIndex].description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicCard;