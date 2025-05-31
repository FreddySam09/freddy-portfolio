import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const Particles = ({ diceAngularVelocity }) => {
  const particlesRef = useRef();
  const particleCount = 17; // 17 particles

  // Generate initial positions, angles, and sizes for particles
  const particlesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.9 + Math.random() * 0.2; // Distance from dice center (0.9 to 1.1 units)
      const theta = Math.random() * Math.PI * 2; // Random angle around y-axis
      const phi = Math.random() * Math.PI; // Random angle for spherical distribution
      const position = [
        radius * Math.sin(phi) * Math.cos(theta), // x
        radius * Math.cos(phi), // y
        radius * Math.sin(phi) * Math.sin(theta), // z
      ];
      // Make 4 particles larger (indices 0 to 3), keep others in the original range
      const size = i < 4 ? 0.08 + Math.random() * 0.02 : 0.05 + Math.random() * 0.02; // Larger (0.08 to 0.1) for 4, smaller (0.05 to 0.07) for others
      data.push({ position, angle: theta, radius, size });
    }
    return data;
  }, []);

  // Create a sphere geometry with vertex colors for gradient effect
  const createSphereGeometry = (size) => {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const colors = [];
    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
      const y = vertices[i + 1]; // Y-coordinate of the vertex
      const t = (y + size) / (2 * size); // Normalize y to [0, 1] for gradient
      const colorTop = new THREE.Color("#bf510d"); // Orange at the top
      const colorBottom = new THREE.Color("#F26711"); // Lighter orange at the bottom
      const color = colorTop.lerp(colorBottom, t); // Interpolate between colors
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  };

  // Precompute geometries for each particle
  const geometries = useMemo(() => {
    return particlesData.map(particle => createSphereGeometry(particle.size));
  }, [particlesData]);

  useFrame(() => {
    const group = particlesRef.current;
    const spinSpeed = Math.sqrt(
      diceAngularVelocity[0] ** 2 +
      diceAngularVelocity[1] ** 2 +
      diceAngularVelocity[2] ** 2
    );

    particlesData.forEach((particle, index) => {
      const mesh = group.children[index];

      // Update angle based on dice spin speed or a slow constant movement
      if (spinSpeed > 0.01) {
        // More noticeable movement when spinning
        particle.angle += diceAngularVelocity[1] * 0.05; // Orbiting speed
      } else {
        // Slow movement when static
        particle.angle += 0.005; // Very slow constant orbiting
      }

      // Recalculate position in a circular orbit around the dice
      const { radius, angle } = particle;
      const phi = Math.acos(particle.position[1] / radius); // Maintain the original phi
      particle.position[0] = radius * Math.sin(phi) * Math.cos(angle);
      particle.position[1] = radius * Math.cos(phi);
      particle.position[2] = radius * Math.sin(phi) * Math.sin(angle);
      mesh.position.set(...particle.position);

      // Subtle floating effect
      mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;

      // Rotate particles for visual effect
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    });
  });

  return (
    <group ref={particlesRef}>
      {particlesData.map((particle, index) => (
        <mesh key={index} position={particle.position} geometry={geometries[index]}>
          <meshStandardMaterial
            vertexColors={true} // Use vertex colors for gradient
            roughness={0.3} // Slightly shiny
            metalness={0.2}
            emissive="#ff7b00"
            emissiveIntensity={0.3} // Subtle glow
          />
        </mesh>
      ))}
    </group>
  );
};

const Dice = ({ onRollComplete }) => {
  const diceRef = useRef();
  const [isSpinning, setIsSpinning] = useState(false);
  const [angularVelocity, setAngularVelocity] = useState([0, 0, 0]); // [x, y, z] rotation speeds
  const [targetRotation, setTargetRotation] = useState(null); // Target rotation to lerp to
  const [faceNumber, setFaceNumber] = useState(null); // Face number to pass to onRollComplete
  const lastSpinTime = useRef(0);
  const damping = 0.95; // Damping factor to slow down the spin
  const stopThreshold = 0.01; // Threshold to stop spinning
  const lerpSpeed = 0.05; // Speed of smooth rotation to target position

  // Load textures for each face
  const textures = [
    useLoader(THREE.TextureLoader, "src/assets/dice/dice3.png"),
    useLoader(THREE.TextureLoader, "src/assets/dice/dice4.png"),
    useLoader(THREE.TextureLoader, "src/assets/dice/dice1.png"),
    useLoader(THREE.TextureLoader, "src/assets/dice/dice6.png"),
    useLoader(THREE.TextureLoader, "src/assets/dice/dice5.png"),
    useLoader(THREE.TextureLoader, "src/assets/dice/dice2.png"),
  ];

  // Define materials for each face with whiter whites and shininess
  const materials = textures.map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4, // Lower roughness for a shinier surface
        metalness: 0.2, // Slight metalness for a glossy look
        color: new THREE.Color(1, 1, 1), // Ensure whites are pure white
      })
  );

  // Handle swipe/drag to spin
  const handlePointerDown = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastSpinTime.current < 1000) return; // Prevent spamming spins
    lastSpinTime.current = now;

    setIsSpinning(true);
    setTargetRotation(null); // Reset target rotation
    setFaceNumber(null); // Reset face number
    // Apply a random angular velocity to simulate a faster spin
    setAngularVelocity([
      (Math.random() - 0.5) * 0.5, // x-axis rotation speed
      (Math.random() - 0.5) * 0.5, // y-axis rotation speed
      (Math.random() - 0.5) * 0.5, // z-axis rotation speed
    ]);
  };

  // Animate the dice rotation and smoothly transition to the face closest to the camera
  useFrame(({ camera }) => {
    if (isSpinning) {
      // Apply angular velocity to rotate the dice
      diceRef.current.rotation.x += angularVelocity[0];
      diceRef.current.rotation.y += angularVelocity[1];
      diceRef.current.rotation.z += angularVelocity[2];

      // Slow down the spin with damping
      const newVelocity = angularVelocity.map((v) => v * damping);
      setAngularVelocity(newVelocity);

      // Check if the spin should stop
      const speed = Math.sqrt(
        newVelocity[0] ** 2 + newVelocity[1] ** 2 + newVelocity[2] ** 2
      );
      if (speed < stopThreshold) {
        setIsSpinning(false);

        // Get the camera's direction (towards the dice)
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        // Get the dice's rotation
        const euler = new THREE.Euler(
          diceRef.current.rotation.x,
          diceRef.current.rotation.y,
          diceRef.current.rotation.z
        );
        const matrix = new THREE.Matrix4().makeRotationFromEuler(euler);

        // Define the face normals (in local space)
        const faceNormals = [
          new THREE.Vector3(0, 1, 0), // Top (6)
          new THREE.Vector3(0, -1, 0), // Bottom (1)
          new THREE.Vector3(0, 0, -1), // Back (2)
          new THREE.Vector3(-1, 0, 0), // Left (3)
          new THREE.Vector3(1, 0, 0), // Right (4)
          new THREE.Vector3(0, 0, 1), // Front (5)
        ];

        // Transform face normals to world space
        const worldNormals = faceNormals.map((normal) => {
          const worldNormal = normal.clone().applyMatrix4(matrix);
          return worldNormal;
        });

        // Find the face most facing the camera
        let maxDot = -1;
        let faceClosest = 0;
        worldNormals.forEach((normal, index) => {
          const dot = normal.dot(cameraDirection.clone().negate()); // Negate to compare with camera direction
          if (dot > maxDot) {
            maxDot = dot;
            faceClosest = index;
          }
        });

        // Set the target rotation for smooth transition
        const targetRotations = [
          [0, 0, 0], // Top (6)
          [Math.PI, 0, 0], // Bottom (1)
          [Math.PI / 2, 0, 0], // Back (2)
          [0, 0, -Math.PI / 2], // Left (3)
          [0, 0, Math.PI / 2], // Right (4)
          [-Math.PI / 2, 0, 0], // Front (5)
        ];
        const [x, y, z] = targetRotations[faceClosest];
        setTargetRotation({ x, y, z });

        // Map the face index to the number (1 to 6)
        const number = [1, 6, 2, 4, 3, 5][faceClosest];
        setFaceNumber(number);
      }
    } else if (targetRotation) {
      // Smoothly rotate to the target position using lerp
      const { x: targetX, y: targetY, z: targetZ } = targetRotation;
      diceRef.current.rotation.x = THREE.MathUtils.lerp(
        diceRef.current.rotation.x,
        targetX,
        lerpSpeed
      );
      diceRef.current.rotation.y = THREE.MathUtils.lerp(
        diceRef.current.rotation.y,
        targetY,
        lerpSpeed
      );
      diceRef.current.rotation.z = THREE.MathUtils.lerp(
        diceRef.current.rotation.z,
        targetZ,
        lerpSpeed
      );

      // Check if the dice is close enough to the target rotation
      const rotationDifference = Math.max(
        Math.abs(diceRef.current.rotation.x - targetX),
        Math.abs(diceRef.current.rotation.y - targetY),
        Math.abs(diceRef.current.rotation.z - targetZ)
      );
      if (rotationDifference < 0.01) {
        // Snap to exact position and trigger the callback
        diceRef.current.rotation.set(targetX, targetY, targetZ);
        setTargetRotation(null);
        if (faceNumber) {
          onRollComplete(faceNumber);
        }
      }
    }
  });

  return (
    <>
      <mesh ref={diceRef} position={[0, 0, 0]} onPointerDown={handlePointerDown}>
        <boxGeometry args={[1, 1, 1, 32, 32, 32]} /> {/* Sharp-edged cube */}
        {materials.map((material, index) => (
          <meshStandardMaterial key={index} attach={`material-${index}`} {...material} />
        ))}
      </mesh>
      <Particles diceAngularVelocity={angularVelocity} />
    </>
  );
};

const InteractiveDice = () => {
  const [memory, setMemory] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // For fade-in effect
  const [hasSpun, setHasSpun] = useState(false); // Track if the dice has been spun
  const [faceNumber, setFaceNumber] = useState(null); // Store the rolled number

  const diceMemories = {
    1: { title: "My First!", description: "This dice is the first three js component i made!" },
    2: { title: "Two-in-a-Row!", description: "I made it to the smart India Hackathon Finals twice!" },
    3: { title: "The Trio!!", description: "I LOVE Messi, Xavi & Iniesta as a trio" },
    4: { title: "Family of Four", description: "My family is of 4, my parents and a brother" },
    5: { title: "5 minute try", description: "I spend 5 minutes each day to design something random" },
    6: { title: "Six days of bliss", description: "6-day Hyderabad trip with friends, was unforgettable" },
  };

  const handleRollComplete = (number) => {
    setMemory(diceMemories[number]);
    setFaceNumber(number); // Store the rolled number for background text
    setIsVisible(true); // Trigger fade-in
    setHasSpun(true); // Hide the initial prompt after first spin
  };

  // Determine the background text based on hasSpun and faceNumber
  const textMap = {
    1: "ONEE",
    2: "TWOO",
    3: "THREE",
    4: "FOUR",
    5: "FIVEE",
    6: "SIIIX",
  };
  const backgroundText = hasSpun && faceNumber ? textMap[faceNumber] : "SPIN";

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] overflow-hidden" aria-label="Interactive 3D dice displaying personal memories">
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0 font-stadium text-[300px] sm:text-[440px] text-gray-400 opacity-50 tracking-wide select-none pointer-events-none mt-16"
      >
        {backgroundText}
      </div>

      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      >
        <ambientLight intensity={4} />
        <pointLight position={[2, 2, 2]} intensity={1} distance={10} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} distance={10} />
        <Dice onRollComplete={handleRollComplete} />
        <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {!hasSpun && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 rounded-lg shadow-lg text-xs sm:text-sm text-white transition-opacity duration-500 sm:mt-11 z-10">
          <p>Get to know me, spin the dice!</p>
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
        </div>
      )}
      {memory && (
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 w-42 sm:w-48 rounded-lg shadow-lg text-xs sm:text-sm text-white transition-opacity duration-500 sm:mt-7 z-10"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <h3 className="font-semibold">{memory.title}</h3>
          <p>{memory.description}</p>
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default InteractiveDice;