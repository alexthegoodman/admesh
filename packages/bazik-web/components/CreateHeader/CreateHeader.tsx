import * as React from "react";

import styles from "./CreateHeader.module.scss";

import { CreateHeaderProps } from "./CreateHeader.d";
import {
  Breadcrumbs,
  Button,
  Flex,
  Header,
  Item,
  Text,
  View,
} from "@adobe/react-spectrum";

import Undo from "@spectrum-icons/workflow/Undo";
import Redo from "@spectrum-icons/workflow/Redo";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import SLink from "../SLink/SLink";

const CreateHeader: React.FC<CreateHeaderProps> = () => {
  const router = useRouter();

  const handleBreadcrumb = (key: any) => {
    if (key === "my-projects") {
      router.push("/projects");
    }
  };

  return (
    <Header>
      <Flex direction="row">
        <div className={styles.headerInner}>
          <Flex direction="row" justifyContent="space-between" flex="1">
            <Flex direction="row" gap="size-100">
              <Breadcrumbs
                minWidth="size-3400"
                maxWidth="size-5000"
                onAction={handleBreadcrumb}
              >
                <Item key="my-projects">My Projects</Item>
                <Item key="project-name">Project Name</Item>
              </Breadcrumbs>
              <Flex
                direction="row"
                gap="size-50"
                alignItems="center"
                marginEnd="size-100"
              >
                <Undo />
                <Redo />
              </Flex>
              <Flex direction="row" gap="size-50" alignItems="center">
                <Text>
                  Autosaved on {DateTime.now().toFormat("MM/dd/yyyy")} at{" "}
                  {DateTime.now().toFormat("hh:mm a")}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="row"
              gap="size-100"
              alignItems="center"
              marginEnd="size-100"
            >
              <SLink href="/report-bug">Report Bug</SLink>
              <SLink href="/contact-support">Contact Support</SLink>
            </Flex>
          </Flex>
        </div>
        <div className={styles.sideHeader}>
          <Button variant="cta">Download</Button>
          <Button variant="primary">Share</Button>
        </div>
      </Flex>
    </Header>
  );
};

export default CreateHeader;
