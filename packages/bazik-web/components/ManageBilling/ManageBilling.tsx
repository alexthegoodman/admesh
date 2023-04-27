import * as React from "react";

import styles from "./ManageBilling.module.scss";

import { ManageBillingProps } from "./ManageBilling.d";
import { Button } from "@adobe/react-spectrum";
import graphClient from "@/helpers/GQLClient";
import { useCookies } from "react-cookie";
import { createPortalSessionMutation } from "@/graphql/stripe";

const ManageBilling: React.FC<ManageBillingProps> = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["amUserToken"]);
  const token = cookies.amUserToken;

  graphClient.setupClient(token);

  const handleManageBilling = async () => {
    const { createPortalSession } = (await graphClient.client?.request(
      createPortalSessionMutation
    )) as any;

    window.location.href = createPortalSession;
  };

  return (
    <Button variant="primary" onPress={handleManageBilling}>
      Manage Billing
    </Button>
  );
};

export default ManageBilling;
