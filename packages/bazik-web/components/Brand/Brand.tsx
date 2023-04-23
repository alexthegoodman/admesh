"use client";

import * as React from "react";

import styles from "./Brand.module.scss";

import { BrandProps } from "./Brand.d";
import { Flex, Heading, View } from "@adobe/react-spectrum";

const Brand: React.FC<BrandProps> = () => {
  return (
    <View
      position="absolute"
      left={0}
      backgroundColor="blue-500"
      width="size-1000"
    >
      <Flex
        direction="row"
        justifyContent="center"
        alignContent="center"
        width="fill"
        height="size-1000"
      >
        <Flex direction="column" justifyContent="center" alignContent="center">
          <div className={styles.brandHeading}>
            <Heading level={1}>Bz</Heading>
          </div>
        </Flex>
      </Flex>
    </View>
  );
};

export default Brand;
