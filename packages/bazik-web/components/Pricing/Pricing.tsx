import * as React from "react";

import styles from "./Pricing.module.scss";

import { PricingProps } from "./Pricing.d";
import { Button, Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import graphClient from "@/helpers/GQLClient";
import { confirmFreemiumMutation } from "@/graphql/user";
import { graphqlUrl, protocol, restUrl, fullDomainPort } from "@/defs/urls";
import { getCurrentUser } from "@/helpers/requests";
import useSWR from "swr";
import { createCheckoutSessionMutation } from "@/graphql/stripe";

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

  const [cookies, setCookie, removeCookie] = useCookies(["amUserToken"]);
  const token = cookies.amUserToken;

  graphClient.setupClient(token);

  const { data: currentUser, isLoading } = useSWR("currentUser", () =>
    getCurrentUser(token)
  );

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
                  <>
                    {currentUser?.plan === item.name.toUpperCase() ? (
                      <Flex
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        flex="1"
                      >
                        <Text>
                          <strong>Current Plan</strong>
                        </Text>
                      </Flex>
                    ) : (
                      <Button
                        variant="cta"
                        onPress={async () => {
                          if (item.name === "Starter") {
                            await graphClient.client?.request(
                              confirmFreemiumMutation
                            );

                            window.location.href = `${protocol}${fullDomainPort}/projects`;
                          } else if (item.name === "Pro") {
                            let priceId = "";
                            if (item.frequency === "Monthly") {
                              priceId = "price_1N1aGFGk0VWbKQ7K3oJnzyUt";
                            } else if (item.frequency === "Annual") {
                              priceId = "price_1N1aGFGk0VWbKQ7K5TBV5Pyw";
                            }

                            const { createCheckoutSession } =
                              (await graphClient.client?.request(
                                createCheckoutSessionMutation,
                                { priceId }
                              )) as any;

                            window.location.href = createCheckoutSession;
                          }
                        }}
                      >
                        Choose Plan
                      </Button>
                    )}
                  </>
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
