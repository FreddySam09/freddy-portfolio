import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ProjectComponent = ({ title, teammates, video, images = [], imageCaptions = [], description, achievements = [], logo, pdf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  return (
    <div>
      <motion.div
        className="relative bg-[#111] p-5 rounded-lg shadow-lg cursor-pointer hover:shadow-[0_0_15px_rgba(255,120,0,0.3)] transition duration-500 border-[2px] border-gray-700 flex flex-col items-center justify-center w-72 md:w-[350px] text-center"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        {logo && (
          <div className="w-20 h-20 md:w-21 md:h-21 bg-gray-800 rounded-lg flex items-center justify-center p-2 mb-2">
            <img src={logo} alt={`${title} logo`} className="max-w-full max-h-full object-contain rounded-md" />
          </div>
        )}
        <motion.h2 
          className="text-white text-sm md:text-xl font-bold tracking-wide sm:mt-3"
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.h2>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center p-3 z-50 bg-none bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0d0d0d] p-5 rounded-lg shadow-lg max-w-[80vw] sm:max-w-2xl max-h-[70vh] sm:max-h-none overflow-y-auto w-full relative"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <button 
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition" 
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={20} />
              </button>
              <motion.h2 
                className="text-white font-extrabold text-xl sm:text-2xl tracking-tight leading-none"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                {title}
              </motion.h2>
              {teammates && (
                <motion.p 
                  className="mt-1 text-gray-400 text-xs sm:text-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {teammates}
                </motion.p>
              )}
              <div className="mt-4 flex flex-col md:flex-row gap-5 items-center">
                {video && (
                  <motion.div 
                    className="w-full md:w-3/5 rounded-lg overflow-hidden shadow-[0_0_8px_rgba(255,120,0,0.5)] hover:shadow-[0_0_12px_rgba(255,120,0,0.7)] transition duration-500"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <video controls className="w-full h-full rounded-lg">
                      <source src={video} type="video/mp4" />
                    </video>
                  </motion.div>
                )}
                <motion.div 
                  className="w-full md:w-2/5 text-xs sm:text-sm text-gray-300 leading-snug tracking-wide font-medium bg-gradient-to-r from-[#ff7b00] via-[#ff4800] to-[#ff1800] bg-clip-text text-transparent"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {description}
                </motion.div>
              </div>
              {images.length > 0 && (
                <div className="mt-6 flex flex-row gap-3 overflow-x-auto">
                  {images.map((img, index) => (
                    <motion.div 
                      key={index} 
                      className="flex-shrink-0 w-32 sm:w-40 relative rounded-lg overflow-hidden shadow-[0_0_3px_rgba(255,255,255,0.1)] border border-gray-700 transition duration-500 hover:scale-[1.04] hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] cursor-pointer"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      onClick={() => {
                        if (index < 2) {
                          setExpandedImage(img);
                        } else if (index === 2) {
                          setShowPdf(true);
                        }
                      }}
                    >
                      <img src={img} alt={`Project Image ${index + 1}`} className="rounded-lg object-cover w-full h-16 sm:h-20" />
                      {imageCaptions[index] && (
                        <p className="mt-1 text-center text-gray-400 text-[10px] sm:text-xs">
                          {imageCaptions[index]}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
              {achievements.length > 0 && (
                <motion.div 
                  className="mt-6 text-center text-sm font-semibold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,120,0,0.5)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <h3 className="text-base sm:text-lg font-bold text-orange-500 mb-1">Achievements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {achievements.map((achieve, index) => (
                      <li key={index} className="text-gray-300 text-[10px] sm:text-xs">{achieve}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedImage && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center p-3 z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <button className="absolute top-3 right-3 text-white" onClick={() => setExpandedImage(null)}>
                <FaTimes size={20} />
              </button>
              <img src={expandedImage} alt="Expanded" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPdf && pdf && (
          <motion.div className="fixed inset-0 flex items-center justify-center p-3 z-50 bg-black bg-opacity-80">
            <div className="relative bg-white p-5 rounded-lg max-w-[90vw] sm:max-w-4xl w-full">
              <button className="absolute top-3 right-3 text-black" onClick={() => setShowPdf(false)}>
                <FaTimes size={20} />
              </button>
              <embed src={pdf} className="w-full h-[70vh] sm:h-[80vh]" type="application/pdf" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectComponent;