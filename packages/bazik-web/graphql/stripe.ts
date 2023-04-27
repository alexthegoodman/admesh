import { gql } from "graphql-request";

export const createCheckoutSessionMutation = gql`
  mutation CreateCheckoutSession($priceId: String!) {
    createCheckoutSession(priceId: $priceId)
  }
`;

export const createPortalSessionMutation = gql`
  mutation CreatePortalSession {
    createPortalSession
  }
`;
