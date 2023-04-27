import * as React from "react";

import styles from "./Pricing.module.scss";

import { PricingProps } from "./Pricing.d";
import { Button, Flex, Heading, View } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

const pricingItems = [
  {
    name: "Starter",
    frequency: "Perpetual",
    price: "Free",
    benefits: ["Create One 3D Mesh", "Upload 100MB of Pictures"],
  },
  {
    name: "Pro",
    frequency: "Monthly",
    price: 19,
    benefits: ["Create Unlimited 3D Meshes", "Upload 10GB of Pictures"],
  },
  {
    name: "Pro",
    frequency: "Annual",
    price: 12,
    benefits: ["Create Unlimited 3D Meshes", "Upload 10GB of Pictures"],
  },
];

const Pricing: React.FC<PricingProps> = ({ signedIn = false }) => {
  const router = useRouter();

  return (
    <View padding={100}>
      <div className={styles.pricingHeader}>
        <Flex direction="row" flex="1" justifyContent="center">
          <View>
            <Heading level={2}>{signedIn ? "Pick a Plan" : "Pricing"}</Heading>
          </View>
        </Flex>
      </div>
      <div className={styles.pricing}>
        <Flex direction="row" flex="1" justifyContent="center" gap="size-500">
          {pricingItems.map((item) => {
            return (
              <Flex direction="column" width="size-3600">
                <Heading level={3}>{item.name}</Heading>
                <Heading level={5}>{item.frequency}</Heading>
                <Heading level={4}>
                  {item.price === "Free" ? "Free" : `$${item.price}/mo`}
                </Heading>
                <Flex direction="column">
                  <ul>
                    {item.benefits.map((benefit) => {
                      return <li>{benefit}</li>;
                    })}
                  </ul>
                </Flex>
                {signedIn ? (
                  <Button variant="cta">Choose Plan</Button>
                ) : (
                  <Button variant="cta" onPress={() => router.push("/sign-up")}>
                    Sign Up
                  </Button>
                )}
              </Flex>
            );
          })}
        </Flex>
      </div>
    </View>
  );
};

export default Pricing;
