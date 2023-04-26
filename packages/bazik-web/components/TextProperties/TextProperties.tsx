import * as React from "react";

import styles from "./TextProperties.module.scss";

import { TextPropertiesProps } from "./TextProperties.d";
import {
  Flex,
  Form,
  Heading,
  Item,
  NumberField,
  Picker,
  Radio,
  RadioGroup,
  Section,
  Text,
  TextArea,
  TextField,
} from "@adobe/react-spectrum";
import ColorPicker from "../ColorPicker/ColorPicker";
import {
  Entity,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";

const TextProperties: React.FC<TextPropertiesProps> = ({ entity }) => {
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
      <Heading level={3}>Text Properties</Heading>
      <Form labelPosition="top" labelAlign="start" maxWidth="size-3600">
        <Flex direction="column" gap="size-200" flex="1">
          <TextArea
            label="Content"
            value={entity.content}
            onChange={(value) => updateEntityProperty("content", value)}
          />
          <Picker label="Font" placeholder="Select font...">
            <Item textValue="Futura">
              <Text>Futura</Text>
            </Item>
          </Picker>
          <Flex direction="row" gap="size-200">
            <NumberField
              label="Size"
              value={entity.size}
              onChange={(value) => updateEntityProperty("size", value)}
            />
            <NumberField
              label="Thickness"
              value={entity.thickness}
              onChange={(value) => updateEntityProperty("thickness", value)}
            />
          </Flex>
          <ColorPicker
            value={entity.color}
            onChange={(value) => updateEntityProperty("color", value)}
          />
        </Flex>
      </Form>
    </div>
  );
};

export default TextProperties;
