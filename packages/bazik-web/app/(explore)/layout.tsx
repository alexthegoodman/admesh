"use client";

import {
  Badge,
  Button,
  Flex,
  Footer,
  Header,
  Heading,
  Text,
  View,
} from "@adobe/react-spectrum";

import styles from "./layout.module.scss";
import Brand from "@/components/Brand/Brand";
import Link from "next/link";
import SLink from "@/components/SLink/SLink";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import graphClient from "@/helpers/GQLClient";
import { getCurrentUser } from "@/helpers/requests";
import useSWR from "swr";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  console.info("pathname", pathname);

  const [cookies, setCookie, removeCookie] = useCookies(["amUserToken"]);
  const token = cookies.amUserToken;

  graphClient.setupClient(token);

  const { data: currentUser, isLoading } = useSWR("currentUser", () =>
    getCurrentUser(token)
  );

  return (
    <>
      <Header>
        <div className={styles.headerInner}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flex="1"
          >
            <div className={styles.headerLeft}>
              <Brand />
              <Flex direction="row" alignContent="center" gap={30}>
                <SLink
                  className={pathname === "/templates" ? styles.active : ""}
                  href="/templates"
                >
                  Templates
                </SLink>
                <SLink
                  className={pathname === "/projects" ? styles.active : ""}
                  href="/projects"
                >
                  Projects
                </SLink>
                <SLink
                  className={pathname === "/assets" ? styles.active : ""}
                  href="/assets"
                >
                  Assets
                </SLink>
              </Flex>
            </div>

            <View paddingEnd="size-300">
              <Flex direction="row" justifyContent="center" alignItems="center">
                {currentUser?.plan !== "PRO" ? (
                  <Button
                    variant="cta"
                    onPress={() => router.push("/pick-plan")}
                  >
                    Upgrade
                  </Button>
                ) : (
                  <Badge variant="positive">Pro User</Badge>
                )}
                <View marginStart="size-200">
                  <SLink href="/settings">Settings</SLink>
                </View>
              </Flex>
            </View>
          </Flex>
        </div>
      </Header>
      <main>{children}</main>
      <Footer>
        <div className={styles.footerInner}>
          <Flex direction="row" justifyContent="space-between">
            <Text>
              &copy; 2023 AdMesh -{" "}
              <a href="https://madebycommon.com" target="_blank">
                Made by Common
              </a>
            </Text>
            <View>
              <SLink href="/report-bug">Report Bug</SLink>
              <SLink href="/contact-support">Contact Support</SLink>
            </View>
          </Flex>
        </div>
      </Footer>
    </>
  );
}
