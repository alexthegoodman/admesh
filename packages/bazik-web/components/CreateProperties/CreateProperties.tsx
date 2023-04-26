import * as React from "react";

import styles from "./CreateProperties.module.scss";

import { CreatePropertiesProps } from "./CreateProperties.d";
import { Heading, View } from "@adobe/react-spectrum";
import {
  Entity,
  Geometry,
  useEditorContext,
} from "@/context/EditorContext/EditorContext";
import TextProperties from "../TextProperties/TextProperties";
import ShapeProperties from "../ShapeProperties/ShapeProperties";

const CreateProperties: React.FC<CreatePropertiesProps> = () => {
  const [{ selectedEntity, entities }, dispatch] = useEditorContext();

  const entityData = entities.find(
    (entity: Entity) => entity.id === selectedEntity
  );

  return (
    <View>
      <div className={styles.createPropertiesInner}>
        {entityData?.geometry === Geometry.text ? (
          <TextProperties entity={entityData} />
        ) : entityData?.geometry === Geometry.box ||
          entityData?.geometry === Geometry.cone ? (
          <ShapeProperties entity={entityData} />
        ) : (
          <></>
        )}
      </div>
    </View>
  );
};

export default CreateProperties;
