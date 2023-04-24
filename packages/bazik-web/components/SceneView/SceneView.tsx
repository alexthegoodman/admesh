"use client";

import * as React from "react";

import styles from "./SceneView.module.scss";

import { SceneViewProps } from "./SceneView.d";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Cone, Text3D, TransformControls } from "@react-three/drei";
import {
  Entity,
  Geometry,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";

const Mesh = ({ pos = undefined, rotation = undefined, geometry = "box" }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  // const [clicked, click] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  const material = (
    <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
  );

  const meshProps = {
    position: pos,
    rotation: rotation,
    // ref: ref,
    // scale={clicked ? 1.5 : 1}
    // onClick={(event) => click(!clicked)}
    onPointerOver: (event) => hover(true),
    onPointerOut: (event) => hover(false),
  };

  return (
    <>
      {geometry === Geometry.box && (
        <Box args={[1, 1, 1]} {...meshProps}>
          {material}
        </Box>
      )}
      {geometry === Geometry.cone && (
        <Cone args={[1, 5, 30]} {...meshProps}>
          {material}
        </Cone>
      )}
      {geometry === Geometry.text && (
        <Text3D font={"./Lobster_Regular.json"} {...meshProps}>
          My Text Here
          {material}
        </Text3D>
      )}
    </>
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
  const [{ entities }, dispatch] = useEditorContext();

  // TODO: PresentationControls ?
  // Effects from EffectComposer?

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MeshEntity
        geometry={Geometry.box}
        controls={false}
        position={[-1.2, 0, 0]}
      />
      <MeshEntity
        geometry={Geometry.cone}
        controls={true}
        position={[4, 0, -10]}
        rotation={[100, 120, 100]}
      />
      {entities?.map((entity: Entity) => {
        return (
          <MeshEntity
            geometry={entity.geometry}
            controls={false}
            position={[4, 0, -10]}
          />
        );
      })}
    </Canvas>
  );
};

export default SceneView;
