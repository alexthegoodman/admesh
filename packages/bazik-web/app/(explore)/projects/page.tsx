"use client";

// export const metadata = {
//   title: "Your Projects",
//   description: "Find your 3D projects in Bazik",
// };

import { Button, Flex, Heading, View } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();

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
