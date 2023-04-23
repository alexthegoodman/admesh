"use client";

import { Flex, Header, View } from "@adobe/react-spectrum";
import styles from "./page.module.scss";
import CreateHeader from "@/components/CreateHeader/CreateHeader";
import CreateTools from "@/components/CreateTools/CreateTools";
import SceneView from "@/components/SceneView/SceneView";
import CreateProperties from "@/components/CreateProperties/CreateProperties";

// export const metadata = {
//   title: "Create Project",
//   description: "Create a new 3D project in Bazik",
// };

export default function Create() {
  return (
    <>
      <CreateHeader />

      <Flex direction="row" flex="1">
        <div className={styles.createInner}>
          <CreateTools />
          <div className={styles.sceneViewWrapper}>
            <SceneView />
          </div>
          <CreateProperties />
        </div>
      </Flex>
    </>
  );
}
