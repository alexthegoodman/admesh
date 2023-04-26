"use client";

import { Flex, View } from "@adobe/react-spectrum";

import styles from "./layout.module.scss";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function AuthLayout({ children = null }) {
  return (
    <View>
      <Flex direction="row" flex="1">
        <div
          className={styles.authImage}
          style={{
            backgroundImage: `url("https://placehold.jp/2500x1500.png")`,
          }}
        ></div>
        <div className={styles.authFormWrapper}>{children}</div>
      </Flex>
    </View>
  );
}
