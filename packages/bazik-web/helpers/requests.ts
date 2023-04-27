import { currentUserQuery } from "@/graphql/user";
import graphClient from "./GQLClient";

export const getCurrentUser = async (token: string) => {
  graphClient.setupClient(token);

  const { currentUser } = (await graphClient.client?.request(
    currentUserQuery
  )) as any;

  return currentUser;
};
