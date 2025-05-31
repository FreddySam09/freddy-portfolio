import React from "react";
import HeroSection from "./components/HeroSection.jsx";
import ExperienceCard from "./components/ExperienceCard.jsx";
import MusicCard from "./components/MusicCard.jsx";
import SkillsCard from "./components/Skillscard.jsx";
import ProjectComponent from "./components/ProjectComponent.jsx";
import SocialsCard from "./components/SocialsCard.jsx";

function App() {
  return (
    <div>
      <HeroSection />
      <div className="pt-4 sm:pt-6 md:pt-8 sm:ml-5 md:ml-10 -mt-40 sm:-mt-72">
        {/* Responsive Flexbox for Cards */}
        <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start justify-center mx-auto max-w-[90vw]">
          <ExperienceCard />
          <SkillsCard />
          <MusicCard />
          <SocialsCard />
        </div>
        <h1 className="text-2xl font-satoshi font-black text-center md:text-start mt-12 md:mt-18">Here's Some of <span className="text-orang">My Projects</span></h1>
        <div className="flex flex-col md:flex-row gap-6 mt-6 mx-auto max-w-[90vw] justify-center items-center">
          <ProjectComponent
            title="DigiBridge"
            teammates="Freddy, Vishal N, Tharun Raj R G, Rahul V, Aparna S, Aishvarya R, Thiriphura Sundari C S, Krishnaja S, Raghul D"
            video="./assets/projects/db-video.mp4"
            images={["./assets/projects/db-1.jpg", "./assets/projects/db-2.jpeg", "./assets/projects/db-3.png"]}
            pdf={["./assets/projects/db-ppt.pdf"]}
            imageCaptions={["SIH 2024", "SIH 2023", "Click on here to know more about DIGIBRIDGE"]}
            description="An E-Learning Platform accessible to everyone, catered towards the remote children lacking access to proper education and facilities."
            achievements={["Finalist - Smart India Hackathon 2023 & 24", "Top Ten - PSG iTech Hackfest 2023", "Winners - Q-Tuxathon 2024"]}
            logo={"./assets/projects/db-logo.png"}
          />
          <ProjectComponent
            title="AquaVision"
            teammates="Freddy, Udaya M R, Raghul D"
            video="./assets/projects/avdemo.mp4"
            images={["./assets/projects/aquavision-1.jpg", "./assets/projects/aquavision-3.jpeg", "./assets/projects/aquavision-2.png"]}
            pdf={["./assets/projects/aquavision-ppt.pdf"]}
            imageCaptions={["Underwater Robotics 2025", "Published Paper based on the project for IEEE Xplore", "Click on here to know more about AQUAVISION"]}
            description="A Smart Autonomous Underwater Vehicle driven system, enabing accurate microplastics detection & collection, and realtime monitoring capabilities."
            achievements={["Winners - Underwater Robotics Hackathon (Anna University) 2025", "Finalist - NDLI Club HAckathon 2024"]}
            logo={"./assets/projects/aquavision-logo.png"}
          />
          <ProjectComponent
            title="Signal Amplification"
            teammates="Freddy, Akash V, Arun G, Raghul D, Deepika, Thenmozhi V, Dharani K"
            video="./assets/projects/sight-video.mp4"
            images={["./assets/projects/sight-1.jpg", "./assets/projects/sight-3.jpg", "./assets/projects/sight-2.jpg"]}
            imageCaptions={["Edayarpakkam Village Map", "Funding Grant Announcement", "Edayarpakkam"]}
            description="A Socially aware project aiming at providing network connectivity to the rural remote region in Tamil Nadu, Edayarpakkam."
            achievements={["IEEE SIGHT Tech4Good Funding Grant of 4749 USD"]}
            logo={"./assets/projects/sight-logo.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;