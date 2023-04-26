import * as React from "react";

import styles from "./TextPanel.module.scss";

import { TextPanelProps } from "./TextPanel.d";
import {
  Entity,
  Geometry,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";
import { Button } from "@adobe/react-spectrum";
import { generateUUID } from "three/src/math/MathUtils";

const TextPanel: React.FC<TextPanelProps> = () => {
  const [{ entities }, dispatch] = useEditorContext();

  const handleAddText = () => {
    const newEntity: Entity = {
      id: generateUUID(),
      geometry: Geometry.text,
      content: "My New Text",
      size: 1,
      thickness: 1,
      color: "#FF0000",
    };

    // console.info("handleAddText", newEntity, entities);

    dispatch({ key: "entities", value: [newEntity, ...entities] });
  };

  return (
    <>
      <Button variant="cta" onPress={handleAddText}>
        Add text
      </Button>
    </>
  );
};

export default TextPanel;
