"use client";

import * as React from "react";

import styles from "./Brand.module.scss";

import { BrandProps } from "./Brand.d";
import { Flex, Heading, View } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

const Brand: React.FC<BrandProps> = () => {
  const router = useRouter();

  return (
    <div className={styles.brand} onClick={() => router.push("/projects")}>
      <View
        position="absolute"
        top={0}
        left={0}
        backgroundColor="blue-500"
        // width="size-1000"
        paddingX="size-300"
      >
        <Flex
          direction="row"
          justifyContent="center"
          alignContent="center"
          width="fill"
          height="size-1000"
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignContent="center"
          >
            <div className={styles.brandHeading}>
              <Heading level={1}>AdMesh</Heading>
            </div>
          </Flex>
        </Flex>
      </View>
    </div>
  );
};

export default Brand;
