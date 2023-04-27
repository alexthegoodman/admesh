"use client";

import { getCurrentUser } from "@/helpers/requests";
// export const metadata = {
//   title: "Your Projects",
//   description: "Find your 3D projects in Bazik",
// };

import { Button, Flex, Heading, View } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import useSwR from "swr";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Projects() {
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

  const handleCreateProject = () => {
    router.push("/create");
  };

  return (
    <View padding={100}>
      <View>
        <Flex direction="row" flex="1" justifyContent="space-between">
          <View>
            <Heading level={2}>Your Projects</Heading>
          </View>
          <View>
            <Button variant="primary" onPress={handleCreateProject}>
              Create Project
            </Button>
          </View>
        </Flex>
      </View>
      <View>Filters</View>
      <View>Projects</View>
    </View>
  );
}
