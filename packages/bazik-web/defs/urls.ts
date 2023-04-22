export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const protocol = env === "production" ? "https://" : "http://";

export const cookieDomain = env === "production" ? "bazik.app" : "localhost";

export const fullDomain =
  env === "production" ? "bazik.app" : process.env.NEXT_PUBLIC_HOST;

export const fullDomainPort =
  env === "production" ? "bazik.app" : process.env.NEXT_PUBLIC_HOST + ":3000";

export const graphqlUrl =
  env === "production"
    ? "https://bazik-api.herokuapp.com/graphql"
    : `http://localhost:4000/graphql`;
