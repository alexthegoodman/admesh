"use client";

import ManageBilling from "@/components/ManageBilling/ManageBilling";
import { Text, View } from "@adobe/react-spectrum";

export default function Settings() {
  return (
    <View padding={100}>
      <Text>Settings</Text>
      <ManageBilling />
    </View>
  );
}
