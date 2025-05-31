import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCode, FaTools, FaPalette } from "react-icons/fa";

const skillCategories = {
  "Software Development": ["React", "Three js", "Flask", "Node.js", "PlayCanvas WebGL", "Unity Engine", "Tailwind", "Material UI"],
  "Tools & Tech": ["Microcontrollers", "Proteus", "Xilinx", "CST Microwave Studio"],
  "Design Skills": ["Figma", "Adobe", "Affinity", "Blender"],
  "Programming Languages": ["Javascript", "C", "Python", "C++"],
};

const skillsData = {
  React: { icon: "../assets/skills/react.svg", desc: "JavaScript library for UI" },
  Flask: { icon: "../assets/skills/flask.png", desc: "Python-based Backend" },
  "Node.js": { icon: "../assets/skills/node.png", desc: "Backend runtime" },
  "PlayCanvas WebGL": { icon: "../assets/skills/playcanvas.jpeg", desc: "WebGL game engine" },
  "Unity Engine": { icon: "../assets/skills/unity.png", desc: "High-level game engine" },
  Tailwind: { icon: "../assets/skills/tailwind.png", desc: "Utility-first CSS framework" },
  "Material UI": { icon: "../assets/skills/mui.jpeg", desc: "Classy CSS framework" },
  "Microcontrollers": { icon: "../assets/skills/mc.jpg", desc: "Raspberry Pi, PIC24 etc..." },
  "Proteus": { icon: "../assets/skills/proteus.png", desc: "Circuit Design & Simulations" },
  "Xilinx": { icon: "../assets/skills/xilinx.png", desc: "Verilog Design" },
  "CST Microwave Studio": { icon: "../assets/skills/cst.png", desc: "Antenna Designs & Simulations" },
  Figma: { icon: "../assets/skills/figma.png", desc: "UI/UX design tool" },
  "Adobe": { icon: "../assets/skills/adobe.png", desc: "Photoshop, Illustrator, Lightroom, Premiere Pro" },
  "Affinity": { icon: "../assets/skills/affinity.png", desc: "Designer, Photo, Publisher" },
  "Blender": { icon: "../assets/skills/blender.png", desc: "3D Modelling & Animation" },
  Javascript: { icon: "../assets/skills/js.png", desc: "Versatile web language" },
  C: { icon: "../assets/skills/c.png", desc: "The Base Programming Language" },
  Python: { icon: "../assets/skills/py.png", desc: "Simple high-level language" },
  "C++": { icon: "../assets/skills/cpp.png", desc: "Versatile object-oriented language" },
  "Three js": { icon: "../assets/skills/3js.svg", desc: "3D WebGL Framework" },
};

const SkillsCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [skillsModal, setSkillsModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const modalRef = useRef(null);
  const skillsModalRef = useRef(null);

  const icons = {
    "Software Development": <FaCode className="text-orang text-xl" />,
    "Tools & Tech": <FaTools className="text-orang text-xl" />,
    "Design Skills": <FaPalette className="text-orang text-xl" />,
    "Programming Languages": <FaCode className="text-orang" />,
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
    setModalOpen(true);
  };

  const openSkillsModal = (e, category) => {
    setModalPosition(calculateModalPosition(e));
    setSkillsModal(category);
  };

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [modalOpen]);

  useEffect(() => {
    if (skillsModal && skillsModalRef.current) {
      skillsModalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [skillsModal]);

  return (
    <>
      <motion.div
        onClick={openModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-light border-3 border-white drop-shadow-lg rounded-3xl w-64 sm:w-72 h-72 sm:h-80 flex flex-col text-left cursor-pointer overflow-hidden hover:drop-shadow-xl"
      >
        <img
          src="../assets/skills-bg.png"
          alt="Skills Background"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1 left-1 bg-light px-4 py-2 rounded-3xl text-base sm:text-lg font-bold shadow-[6px_6px_12px_rgba(255,255,255,0.9)]"
        >
          My Skills
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="absolute z-50"
            style={{ left: modalPosition.x, top: modalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white shadow-xl rounded-xl text-black p-6 border border-gray-200 w-[240px] sm:w-[clamp(260px,80vw,400px)]"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <FaTimes className="text-sm stroke-1" />
              </button>
              <h3 className="text-base sm:text-lg font-bold mb-3">Select a Category</h3>
              <ul>
                {Object.keys(skillCategories).map((category) => (
                  <motion.li
                    key={category}
                    onClick={(e) => openSkillsModal(e, category)}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    {icons[category]}
                    <span className="text-sm sm:text-base">{category}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {skillsModal && (
          <motion.div
            className="absolute z-50"
            style={{ left: modalPosition.x, top: modalPosition.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={skillsModalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white shadow-xl rounded-xl text-black p-6 border border-gray-200 w-[240px] sm:w-[clamp(260px,80vw,450px)]"
            >
              <button
                onClick={() => setSkillsModal(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <FaTimes className="text-sm stroke-1" />
              </button>
              <h3 className="text-base sm:text-lg font-bold mb-3">{skillsModal}</h3>
              <ul>
                {skillCategories[skillsModal].map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <img src={skillsData[skill].icon} alt={skill} className="w-6 sm:w-7 h-6 sm:h-7 rounded-md" />
                    <div>
                      <p className="text-sm sm:text-base font-semibold">{skill}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{skillsData[skill].desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SkillsCard;