"use client";

import { Flex, Footer, Header, Heading, View } from "@adobe/react-spectrum";

import styles from "./layout.module.scss";
import Brand from "@/components/Brand/Brand";
import Link from "next/link";
import SLink from "@/components/SLink/SLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className={styles.headerInner}>
          <Brand />
          <Flex direction="row" alignContent="center" gap={20}>
            <SLink href="/templates">Templates</SLink>
            <SLink href="/projects">Projects</SLink>
            <SLink href="/assets">Assets</SLink>
          </Flex>
        </div>
      </Header>
      <main>{children}</main>
      <Footer>
        <div></div>
      </Footer>
    </>
  );
}
