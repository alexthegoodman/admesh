"use client";

import { Flex, Header, View } from "@adobe/react-spectrum";
import styles from "./page.module.scss";
import CreateHeader from "@/components/CreateHeader/CreateHeader";
import CreateTools from "@/components/CreateTools/CreateTools";
import SceneView from "@/components/SceneView/SceneView";
import CreateProperties from "@/components/CreateProperties/CreateProperties";
import {
  EditorContext,
  EditorContextReducer,
  EditorContextState,
} from "@/context/EditorContext/EditorContext";
import { useReducer } from "react";
import SceneCtrls from "@/components/SceneCtrls/SceneCtrls";
import SceneMgmt from "@/components/SceneMgmt/SceneMgmt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCurrentUser } from "@/helpers/requests";
import useSwR from "swr";
import { useCookies } from "react-cookie";

// export const metadata = {
//   title: "Create Project",
//   description: "Create a new 3D project in Bazik",
// };

export default function Create() {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["amUserToken"]);
  const token = cookies.amUserToken;

  const { data, isLoading } = useSwR("currentUser", () =>
    getCurrentUser(token)
  );

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
    if (!isLoading && data) {
      if (data.plan === "") {
        router.push("/pick-plan");
      }
    }
  }, [data]);

  return (
    <>
      <EditorContext.Provider
        value={useReducer(EditorContextReducer, EditorContextState)}
      >
        <CreateHeader />

        <Flex direction="row" flex="1">
          <div className={styles.createInner}>
            <CreateTools />
            <div className={styles.sceneViewWrapper}>
              <SceneCtrls />
              <SceneView />
              <SceneMgmt />
            </div>
            <CreateProperties />
          </div>
        </Flex>
      </EditorContext.Provider>
    </>
  );
}
