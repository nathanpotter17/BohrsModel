"use client";

import styles from "./scene.module.css";
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Text3D } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const fontUrl = "./ct.json";
const fontUrl2 = "./tbf.json";

const Atom: React.FC<{
  color: string;
  speed: number;
  radius: number;
  numAtoms: number;
  rotateX: boolean;
  rotateY: boolean;
  rotateZ: boolean;
  size: number;
}> = ({ color, speed, radius, numAtoms, rotateX, rotateY, rotateZ, size }) => {
  const groupRef = useRef<THREE.Group>();

  useMemo(() => {
    const group = new THREE.Group();
    for (let i = 0; i < numAtoms; i++) {
      const angle = (i / numAtoms) * Math.PI * 2;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      );
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 25,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      group.add(sphere);

      //atom-centric
      const orbitRadius = radius + size;
      const orbitGeometry = new THREE.TorusGeometry(
        orbitRadius,
        size / 7,
        32,
        126
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: "#9ECDDB",
        transparent: true,
        opacity: 0.5,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.position.copy(position);
      group.add(orbit);

      //orbital centric
      const pathRadius = radius;
      const pathTorusGeometry = new THREE.TorusGeometry(
        pathRadius,
        size / 6,
        32,
        126
      );
      const pathMaterial = new THREE.MeshBasicMaterial({
        color: "#A1C7FF",
        side: THREE.DoubleSide,
      });
      const pathTorus = new THREE.Mesh(pathTorusGeometry, pathMaterial);
      group.add(pathTorus);
    }
    groupRef.current = group;
  }, [numAtoms, radius, color]);

  useFrame(() => {
    if (groupRef.current) {
      if (rotateX) groupRef.current.rotateX(speed);
      if (rotateY) groupRef.current.rotateY(speed);
      if (rotateZ) groupRef.current.rotateZ(speed * 2);
    }
  });

  return <primitive object={groupRef.current!} />;
};

const BohrsModel: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState("H");

  const elements = [
    {
      name: "H",
      atomicNumber: "1",
      atoms: {
        electrons: {
          color: "#2667ff",
          speed: 0.0035,
          radius: 13,
          numAtoms: 1,
          size: 0.02,
        },
        protons: {
          color: "green",
          speed: 0.002,
          radius: 7,
          numAtoms: 1,
          size: 0.03,
        },
        neutrons: {
          color: "white",
          speed: 0.002,
          radius: 5,
          numAtoms: 0,
          size: 0.025,
        },
      },
    },
    {
      name: "Mg",
      atomicNumber: "12",
      atoms: {
        electrons: {
          color: "#2667ff",
          speed: 0.0035,
          radius: 13,
          numAtoms: 12,
          size: 0.02,
        },
        protons: {
          color: "green",
          speed: 0.002,
          radius: 7,
          numAtoms: 12,
          size: 0.03,
        },
        neutrons: {
          color: "white",
          speed: 0.002,
          radius: 5,
          numAtoms: 12,
          size: 0.025,
        },
      },
    },
    {
      name: "He",
      atomicNumber: "2",
      atoms: {
        electrons: {
          color: "#2667ff",
          speed: 0.0035,
          radius: 13,
          numAtoms: 2,
          size: 0.02,
        },
        protons: {
          color: "green",
          speed: 0.002,
          radius: 7,
          numAtoms: 2,
          size: 0.03,
        },
        neutrons: {
          color: "white",
          speed: 0.002,
          radius: 5,
          numAtoms: 2,
          size: 0.025,
        },
      },
    },
    {
      name: "Ne",
      atomicNumber: "10",
      atoms: {
        electrons: {
          color: "#2667ff",
          speed: 0.0035,
          radius: 13,
          numAtoms: 10,
          size: 0.02,
        },
        protons: {
          color: "green",
          speed: 0.002,
          radius: 7,
          numAtoms: 10,
          size: 0.03,
        },
        neutrons: {
          color: "white",
          speed: 0.002,
          radius: 5,
          numAtoms: 10,
          size: 0.025,
        },
      },
    },
    {
      name: "C",
      atomicNumber: "6",
      atoms: {
        electrons: {
          color: "#2667ff",
          speed: 0.0035,
          radius: 13,
          numAtoms: 6,
          size: 0.02,
        },
        protons: {
          color: "green",
          speed: 0.002,
          radius: 7,
          numAtoms: 6,
          size: 0.03,
        },
        neutrons: {
          color: "white",
          speed: 0.002,
          radius: 5,
          numAtoms: 6,
          size: 0.04,
        },
      },
    },
  ];

  const handleElementSelection = (elementName: string) => {
    setSelectedElement(elementName);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className={styles.buttonContainer}>
        <div
          className={styles.button}
          onClick={() => handleElementSelection("H")}
        >
          <code>1</code>
          <h1>H</h1>
          <h3>Hydrogen</h3>
          <code>1.0007 u</code>
        </div>
        <div
          className={styles.button}
          onClick={() => handleElementSelection("He")}
        >
          <code>2</code>
          <h1>He</h1>
          <h3>Helium</h3>
          <code>4.002602 u</code>
        </div>
        <div
          className={styles.button}
          onClick={() => handleElementSelection("C")}
        >
          <code>6</code>
          <h1>C</h1>
          <h3>Carbon</h3>
          <code>12.0096 u</code>
        </div>
        <div
          className={styles.button}
          onClick={() => handleElementSelection("Ne")}
        >
          <code>10</code>
          <h1>Ne</h1>
          <h3>Neon</h3>
          <code>20.18 u</code>
        </div>
        <div
          className={styles.button}
          onClick={() => handleElementSelection("Mg")}
        >
          <code>12</code>
          <h1>Mg</h1>
          <h3>Magnesium</h3>
          <code>24.31 u</code>
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, 30] }}>
        {elements
          .filter((element) => element.name === selectedElement)
          .map((element, index) => (
            <>
              {Object.values(element.atoms).map((atom, atomIndex) => (
                <Atom
                  key={`${index}-${atomIndex}`}
                  color={atom.color}
                  rotateX={true}
                  rotateY={atomIndex === 2}
                  rotateZ={atomIndex === 0}
                  speed={atom.speed}
                  numAtoms={atom.numAtoms}
                  radius={atom.radius}
                  size={atom.size}
                />
              ))}
              <Text3D
                key={element.name}
                font={fontUrl}
                size={2}
                position={[element.name.length < 2 ? -0.5 : -2.2, -0.5, 0]}
              >
                {element.name}
                <meshBasicMaterial />
              </Text3D>
              <Text3D
                key={element.atomicNumber}
                font={fontUrl2}
                size={0.8}
                position={[element.name.length < 2 ? -0.3 : -2, 2, 0]}
              >
                {element.atomicNumber}
                <meshBasicMaterial />
              </Text3D>
            </>
          ))}
        <EffectComposer>
          <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={256} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default BohrsModel;
