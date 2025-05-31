import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveDice from "./InteractiveDice";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-lightest font-satoshi text-dark px-4 sm:px-6 md:px-8 lg:px-12 mb-44 sm:-mt-24">
      {/* Main Content */}
      <div className="max-w-3xl text-center sm:text-left md:w-1/2">
        {/* Email with Icon */}
        <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm md:text-base font-medium mb-4">
          <img src="../assets/freddy-logo.png" alt="Logo" className="w-4 h-4 mr-2" />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=freddysamv@gmail.com&su=Inquiry%20from%20Portfolio&body=Hey%20I%20found%20you%20through%20your%20portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orang transition-colors"
          >
            <span className="text-dark underline decoration-grayish underline-offset-2">
              freddysamv@gmail.com
            </span>
          </a>
        </div>

        {/* Profile Picture & Name */}
        <h1 className="text-[24px] sm:text-[28px] md:text-4xl tracking-tight flex flex-wrap justify-center sm:justify-start items-center gap-x-2 md:gap-x-3 font-black">
          <span className="text-dark">Hi, I'm</span>{" "}
          <img
            src="../assets/profile.jpg"
            alt="Freddy Sam"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-18 md:h-18 rounded-3xl border-3 border-white border-orang shadow-lg"
          />
          <span className="text-black">Freddy Sam!</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-3xl mt-1 font-black text-gray-500">
          I'm an <span className="text-dark">Engineering Student</span> at{" "}
          <br />
          <span className="text-orang font-black">
            Sri Sairam Engineering College.
          </span>
        </p>

        {/* Open To Work Badge */}
        <div className="mt-4 inline-flex items-center justify-center sm:justify-start px-2 py-0.5 sm:px-3 sm:py-1 bg-white text-dark font-medium rounded-full border border-gray-300 shadow-md text-xs">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Open To Work
        </div>

        {/* Call to Action */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <button
            onClick={openModal}
            className="px-4 py-2 text-white bg-black rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 transition"
            aria-label="Open contact information modal"
          >
            Contact Me
          </button>
          <p className="text-dark text-sm sm:text-base font-medium leading-tight">
            Feel Free to Explore my Portfolio & reach out. <br /> I’d Love to Connect
          </p>
        </div>
      </div>

      {/* 3D Interactive Dice */}
      <div className="md:w-1/2 flex justify-center mt-8 sm:mt-16">
        <InteractiveDice />
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-lg p-6 sm:p-8 shadow-2xl w-80 sm:w-96 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Contact information modal"
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                onClick={closeModal}
                aria-label="Close contact modal"
              >
                ×
              </button>

              {/* Modal Content */}
              <h2 className="text-lg sm:text-xl font-bold text-center mb-4 text-dark">
                Contact Me
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-gray-700">
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Phone:</span>
                  <a href="tel:+1234567890" className="hover:text-orang transition-colors">
                    +1 234 567 890
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Email:</span>
                  <a
                    href="mailto:freddysamv@gmail.com"
                    className="hover:text-orang transition-colors"
                  >
                    freddysamv@gmail.com
                  </a>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold mr-2">Address:</span>
                  <span>
                    Sri Sairam Engineering College,
                    <br />
                    Chennai, Tamil Nadu, India
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;