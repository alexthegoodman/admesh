"use client";

import { Text, View } from "@adobe/react-spectrum";

export default function ReportBug() {
  return (
    <View padding={100}>
      <Text>
        Oh no! Bugs can definitely spoil a good time. If you find one, please
        report it to <a href="mailto:hello@admesh.app">hello@admesh.app</a>
      </Text>
    </View>
  );
}
