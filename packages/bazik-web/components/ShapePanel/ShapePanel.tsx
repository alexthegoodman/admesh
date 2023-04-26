import * as React from "react";

import styles from "./ShapePanel.module.scss";

import { ShapePanelProps } from "./ShapePanel.d";
import {
  Entity,
  Geometry,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";
import { generateUUID } from "three/src/math/MathUtils";
import { Button } from "@adobe/react-spectrum";

const ShapePanel: React.FC<ShapePanelProps> = () => {
  const [{ entities }, dispatch] = useEditorContext();

  const handleAddShape = (geometry: Geometry) => {
    const newEntity: Entity = {
      id: generateUUID(),
      geometry,
      position: [4, 0, -2],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#FF0000",
    };

    // console.info("handleAddText", newEntity, entities);

    dispatch({ key: "entities", value: [newEntity, ...entities] });
  };

  return (
    <>
      <Button variant="cta" onPress={() => handleAddShape(Geometry.box)}>
        Add box
      </Button>
      <Button variant="cta" onPress={() => handleAddShape(Geometry.cone)}>
        Add cone
      </Button>
    </>
  );
};

export default ShapePanel;
