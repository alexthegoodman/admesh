import { startApolloServer } from "./api";

// NOTE: fixes aws-sdk type error
declare global {
  export interface ReadableStream {}
}

startApolloServer();
