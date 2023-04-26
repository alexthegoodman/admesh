import * as React from "react";

import styles from "./SceneCtrls.module.scss";

import { SceneCtrlsProps } from "./SceneCtrls.d";
import { useEditorContext } from "@/context/EditorContext/EditorContext";
import { Flex, View } from "@adobe/react-spectrum";
import Transparency from "@spectrum-icons/workflow/Transparency";
import Resize from "@spectrum-icons/workflow/Resize";
import Move from "@spectrum-icons/workflow/Move";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";

const SceneCtrls: React.FC<SceneCtrlsProps> = () => {
  const [{ transformMode }, dispatch] = useEditorContext();

  return (
    <section className={styles.sceneCtrls}>
      <View
        backgroundColor="static-white"
        padding="size-50"
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
          <button
            className={`${styles.sceneCtrl} ${
              transformMode === "translate" ? styles.active : ""
            }`}
            onClick={() =>
              dispatch({ key: "transformMode", value: "translate" })
            }
          >
            <Move />
          </button>
          <button
            className={`${styles.sceneCtrl} ${
              transformMode === "rotate" ? styles.active : ""
            }`}
            onClick={() => dispatch({ key: "transformMode", value: "rotate" })}
          >
            <RotateCCWBold />
          </button>
          <button
            className={`${styles.sceneCtrl} ${
              transformMode === "scale" ? styles.active : ""
            }`}
            onClick={() => dispatch({ key: "transformMode", value: "scale" })}
          >
            <Resize />
          </button>
        </Flex>
      </View>
    </section>
  );
};

export default SceneCtrls;
