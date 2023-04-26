import * as React from "react";

import styles from "./SceneMgmt.module.scss";

import { SceneMgmtProps } from "./SceneMgmt.d";
import { Flex, Slider, View } from "@adobe/react-spectrum";
import { useEditorContext } from "@/context/EditorContext/EditorContext";

const SceneMgmt: React.FC<SceneMgmtProps> = () => {
  const [{ sceneRotation }, dispatch] = useEditorContext();

  return (
    <section className={styles.sceneMgmt}>
      <View
        backgroundColor="static-white"
        padding="size-100"
        borderRadius="large"
        borderColor="static-gray-500"
        borderWidth="thin"
      >
        <Flex
          direction="row"
          flex="1"
          justifyContent="space-around"
          alignItems="center"
        >
          <Slider
            label="Rotate Scene"
            maxValue={360}
            value={sceneRotation}
            onChange={(value) => dispatch({ key: "sceneRotation", value })}
          />
        </Flex>
      </View>
    </section>
  );
};

export default SceneMgmt;
