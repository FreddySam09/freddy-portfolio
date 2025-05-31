import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceCard = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainModalPosition, setMainModalPosition] = useState({ x: 0, y: 0 });
  const [experienceModalPosition, setExperienceModalPosition] = useState({ x: 0, y: 0 });

  const timeline = [
    {
      year: "June 2024",
      role: "Factory Intern at Nanotechnologies",
      details: "On-site - 15 Days",
      description: "Worked on Control Panels and PLC Programming.",
      images: ["../assets/experience/nano.jpg", "../assets/experience/nano-2.jpg"],
    },
    {
      year: "April 2024",
      role: "Intern at NIOT",
      details: "Hybrid - 45 Days",
      description: "Worked PIC24 based AUV Payload Communication Protocols.",
      images: ["../assets/experience/niot-1.jpg", "../assets/experience/niot-2.jpg"],
    },
    {
      year: "2024",
      role: "Graphic Designer at Sairam Institutions",
      details: "Volunteer Part-time",
      description: "Worked on user-centered design for 2 years.",
      images: [],
    },
    {
      year: "2024",
      role: "Webmaster for IEEE Magnetics Society",
      details: "Volunteer Part-time",
      description: "Worked on user-centered design for 2 years.",
      images: [],
    },
  ];

  const calculateModalPosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 + scrollTop;
    return { x: centerX, y: centerY };
  };

  const openMainModal = (e) => {
    setMainModalPosition(calculateModalPosition(e));
    setIsMainOpen(true);
  };

  const openExperienceModal = (e, experience) => {
    setExperienceModalPosition(calculateModalPosition(e));
    setSelectedExperience(experience);
  };

  return (
    <>
      <div
        onClick={openMainModal}
        className="relative bg-light border-white border-[2px] drop-shadow-lg rounded-2xl p-4 md:p-6 w-40 sm:w-44 md:w-60 h-56 sm:h-80 md:h-80 flex flex-col text-left cursor-pointer transition-transform hover:scale-105 hover:drop-shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1 left-1 bg-light px-4 py-2 rounded-3xl text-base sm:text-lg font-bold shadow-[6px_6px_12px_rgba(255,255,255,0.9)]"
        >
          My Experience
        </motion.div>
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-2 sm:space-x-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full mt-2 sm:mt-3"></div>
              <div className="overflow-hidden">
                <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold truncate">{item.role}</h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">
                  {item.year} - {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isMainOpen && (
          <motion.div
            className="absolute z-50"
            style={{ left: mainModalPosition.x, top: mainModalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-2xl w-56 sm:w-64 md:w-80 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                onClick={() => setIsMainOpen(false)}
              >
                ×
              </button>
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-center mb-4 sm:mb-6">My Experience</h2>
              <div className="space-y-3 sm:space-y-6">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 cursor-pointer hover:bg-gray-100 p-1 sm:p-2 rounded-lg"
                    onClick={(e) => openExperienceModal(e, item)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"></div>
                      {index !== timeline.length - 1 && <div className="w-[1px] h-8 sm:h-12 bg-gray-300"></div>}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-[10px] sm:text-xs md:text-lg font-semibold truncate">{item.role}</h3>
                      <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600 truncate">
                        {item.year} - {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            className="absolute z-50"
            style={{ left: experienceModalPosition.x, top: experienceModalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-2xl w-72 sm:w-80 md:w-96 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                onClick={() => setSelectedExperience(null)}
              >
                ×
              </button>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4">{selectedExperience.role}</h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-4">
                {selectedExperience.year} - {selectedExperience.details}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">{selectedExperience.description}</p>
              {selectedExperience.images && selectedExperience.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  {selectedExperience.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${selectedExperience.role} image ${index + 1}`}
                      className="w-full h-16 sm:h-20 md:h-24 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="absolute z-50"
            style={{ left: experienceModalPosition.x, top: experienceModalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg p-4 sm:p-6 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceCard;