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
import { Euler, EulerOrder, Vector3 } from "three";

interface MeshProps {
  pos?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
  entity: Entity;
  setSelectedEntity: any;
}

const Mesh = ({
  pos = undefined,
  rotation = undefined,
  entity,
  setSelectedEntity,
}: MeshProps) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  // const [clicked, click] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  const handleMeshClick = () => {
    setSelectedEntity(entity.id);
  };

  const material = (
    <meshStandardMaterial color={hovered ? "hotpink" : entity.color} />
  );

  const meshProps = {
    key: entity.id,
    position: pos,
    rotation: rotation,
    // ref: ref,
    // scale={clicked ? 1.5 : 1}
    onClick: handleMeshClick,
    onPointerOver: () => hover(true),
    onPointerOut: () => hover(false),
  };

  return (
    <>
      {entity.geometry === Geometry.box && (
        <Box args={[1, 1, 1]} {...meshProps}>
          {material}
        </Box>
      )}
      {entity.geometry === Geometry.cone && (
        <Cone args={[1, 5, 30]} {...meshProps}>
          {material}
        </Cone>
      )}
      {entity.geometry === Geometry.text && (
        <Text3D
          font={"./Lobster_Regular.json"}
          size={entity.size}
          height={entity.thickness}
          {...meshProps}
        >
          {entity.content}
          {material}
        </Text3D>
      )}
    </>
  );
};

interface MeshEntityProps extends MeshProps {
  controls: boolean;
  position: [x: number, y: number, z: number];
}

function MeshEntity({ controls, position, ...props }: MeshEntityProps) {
  if (controls) {
    return (
      <TransformControls mode="translate" position={position}>
        <Mesh {...(props as any)} />
      </TransformControls>
    );
  } else {
    return (
      <>
        <Mesh pos={position} {...(props as any)} />
      </>
    );
  }
}

const SceneView: React.FC<SceneViewProps> = () => {
  const [{ selectedEntity, entities }, dispatch] = useEditorContext();
  // const [selectedEntity, setSelectedEntity] = React.useState(null);

  const setSelectedEntity = (entityId: string) => {
    dispatch({ key: "selectedEntity", value: entityId });
  };

  // TODO: PresentationControls ?
  // Effects from EffectComposer?

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <MeshEntity
        geometry={Geometry.box}
        controls={false}
        position={[-1.2, 0, 0]}
      />
      <MeshEntity
        geometry={Geometry.cone}
        controls={true}
        position={[4, 0, -10]}
        rotation={[100, 120, 100]}
      /> */}
      {entities?.map((entity: Entity) => {
        return (
          <MeshEntity
            controls={selectedEntity === entity.id ? true : false}
            position={[4, 0, -10]}
            entity={entity}
            setSelectedEntity={setSelectedEntity}
          />
        );
      })}
    </Canvas>
  );
};

export default SceneView;
