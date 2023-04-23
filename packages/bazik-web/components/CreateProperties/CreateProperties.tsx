import * as React from "react";

import styles from "./CreateProperties.module.scss";

import { CreatePropertiesProps } from "./CreateProperties.d";
import { View } from "@adobe/react-spectrum";

const CreateProperties: React.FC<CreatePropertiesProps> = () => {
  return (
    <View>
      <div className={styles.createPropertiesInner}>
        <div className={styles.propertiesNav}>Properties</div>
      </div>
    </View>
  );
};

export default CreateProperties;
