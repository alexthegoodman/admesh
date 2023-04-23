"use client";

// export const metadata = {
//   title: "Your Projects",
//   description: "Find your 3D projects in Bazik",
// };

import { Button, Flex, Heading, View } from "@adobe/react-spectrum";

export default function Projects() {
  return (
    <View padding={100}>
      <View>
        <Flex direction="row" flex="1" justifyContent="space-between">
          <View>
            <Heading level={2}>Your Projects</Heading>
          </View>
          <View>
            <Button variant="primary">Create Project</Button>
          </View>
        </Flex>
      </View>
      <View>Filters</View>
      <View>Projects</View>
    </View>
  );
}
