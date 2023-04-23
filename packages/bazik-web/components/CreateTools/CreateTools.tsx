import * as React from "react";

import styles from "./CreateTools.module.scss";

import { CreateToolsProps } from "./CreateTools.d";
import { View } from "@adobe/react-spectrum";
import Text from "@spectrum-icons/workflow/Text";
import Image from "@spectrum-icons/workflow/Image";
import Shapes from "@spectrum-icons/workflow/Shapes";

const CreateTools: React.FC<CreateToolsProps> = () => {
  const handleToolNav = (tool: string) => {
    console.log("handleToolNav");
  };

  return (
    <View>
      <div className={styles.createToolsInner}>
        <div className={styles.toolNav} onClick={() => handleToolNav("text")}>
          <Text />
          <span>Text</span>
        </div>
        <div className={styles.toolNav} onClick={() => handleToolNav("photos")}>
          <Image />
          <span>Photos</span>
        </div>
        <div className={styles.toolNav} onClick={() => handleToolNav("shapes")}>
          <Shapes />
          <span>Shapes</span>
        </div>
      </div>
    </View>
  );
};

export default CreateTools;
