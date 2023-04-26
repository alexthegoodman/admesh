import * as React from "react";

import styles from "./ShapeProperties.module.scss";

import { ShapePropertiesProps } from "./ShapeProperties.d";
import { Flex, Form, Heading } from "@adobe/react-spectrum";
import ColorPicker from "../ColorPicker/ColorPicker";
import {
  Entity,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";

const ShapeProperties: React.FC<ShapePropertiesProps> = ({ entity }) => {
  const [{ selectedEntity, entities }, dispatch] = useEditorContext();

  const updateEntityProperty = (key: string, value: any) => {
    const newEntities = entities.map((entity: Entity) => {
      if (entity.id === selectedEntity) {
        return {
          ...entity,
          [key]: value,
        };
      }
      return entity;
    });

    dispatch({ key: "entities", value: newEntities });
  };

  return (
    <div className={styles.propertiesNav}>
      <Heading level={3}>Shape Properties</Heading>
      <Form labelPosition="top" labelAlign="start" maxWidth="size-3600">
        <Flex direction="column" gap="size-200" flex="1">
          <ColorPicker
            value={entity.color}
            onChange={(value) => updateEntityProperty("color", value)}
          />
        </Flex>
      </Form>
    </div>
  );
};

export default ShapeProperties;
