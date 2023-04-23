"use client";

import * as React from "react";

import styles from "./SceneView.module.scss";

import { SceneViewProps } from "./SceneView.d";
import { Canvas, useFrame } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";

const Mesh = ({ pos = undefined, rotation = undefined, geometry = "box" }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  // const [clicked, click] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      position={pos}
      rotation={rotation}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      {geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
      {geometry === "cone" && <coneGeometry args={[1, 5, 30]} />}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

function MeshEntity({ controls, position, ...props }) {
  if (controls) {
    return (
      <TransformControls mode="translate" position={position}>
        <Mesh {...props} />
      </TransformControls>
    );
  } else {
    return (
      <>
        <Mesh pos={position} {...props} />
      </>
    );
  }
}

const SceneView: React.FC<SceneViewProps> = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MeshEntity geometry="box" controls={false} position={[-1.2, 0, 0]} />
      <MeshEntity
        geometry="cone"
        controls={true}
        position={[4, 0, -10]}
        rotation={[100, 120, 100]}
      />
    </Canvas>
  );
};

export default SceneView;
