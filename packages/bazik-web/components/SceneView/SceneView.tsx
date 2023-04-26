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
import { Vector3 } from "three";
import { useDebounce } from "@/hooks/useDebounce";
// import {
//   BufferGeometry,
//   Euler,
//   EulerOrder,
//   Material,
//   Mesh,
//   Vector3,
// } from "three";

interface MeshProps {
  // position?: [x: number, y: number, z: number];
  // rotation?: [x: number, y: number, z: number];
  setTransforms: boolean;
  entity: Entity;
  setSelectedEntity: any;
}

const Mesh = ({
  // pos = undefined,
  // rotation = undefined,
  setTransforms,
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

  let transforms = {};
  if (setTransforms) {
    transforms = {
      position: entity.position,
      rotation: entity.rotation,
      scale: entity.scale,
    };
  }

  const meshProps = {
    key: entity.id,
    ref: ref,
    // scale={clicked ? 1.5 : 1}
    onClick: handleMeshClick,
    onPointerOver: () => hover(true),
    onPointerOut: () => hover(false),
    // onChange: (e) => console.info("onChange 1", e.target.object),
    ...transforms,
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
  updateEntityProperties: any;
  transformMode: "translate" | "rotate" | "scale";
  // position: [x: number, y: number, z: number];
}

function MeshEntity({ controls, transformMode, ...props }: MeshEntityProps) {
  if (controls) {
    // console.info("MeshEntity", props.entity.position);
    return (
      <TransformControls
        // ref={ref}
        mode={transformMode}
        position={props.entity.position}
        rotation={props.entity.rotation}
        scale={props.entity.scale}
        // onChange={}
        // onObjectChange={(e) => console.info("onObjectChange", e.target)}
        // onUpdate={(e) => console.info("onUpdate", e.target)}
        onMouseUp={(e: any) => {
          const position = e.target.object?.position;
          const rotation = e.target.object?.rotation;
          const scale = e.target.object?.scale;

          // console.info("onMouseUp", e.target.object, position, rotation, scale);

          if (position && rotation && scale) {
            props.updateEntityProperties({
              position: [position.x, position.y, position.z],
              rotation: [rotation.x, rotation.y, rotation.z],
              scale: [scale.x, scale.y, scale.z],
            });
          }
        }}
      >
        <Mesh setTransforms={false} {...(props as any)} />
      </TransformControls>
    );
  } else {
    return (
      <>
        <Mesh setTransforms={true} {...(props as any)} />
      </>
    );
  }
}

const SceneView: React.FC<SceneViewProps> = () => {
  const [{ selectedEntity, entities, transformMode }, dispatch] =
    useEditorContext();
  // const [selectedEntity, setSelectedEntity] = React.useState(null);

  // console.info("entities", entities);

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
        const updateEntityProperties = (object: any) => {
          let newEntities = entities;
          Object.keys(object).forEach((key) => {
            const value = object[key];

            newEntities = newEntities.map((ent: Entity) => {
              if (ent.id === entity.id) {
                return {
                  ...ent,
                  [key]: value,
                };
              }
              return ent;
            });
          });

          // console.info("set prop", newEntities);

          dispatch({ key: "entities", value: newEntities });
        };

        return (
          <MeshEntity
            controls={selectedEntity === entity.id ? true : false}
            // position={[4, 0, -10]}
            entity={entity}
            setSelectedEntity={setSelectedEntity}
            updateEntityProperties={updateEntityProperties}
            transformMode={transformMode}
          />
        );
      })}
    </Canvas>
  );
};

export default SceneView;
