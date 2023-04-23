"use client"; // not used in /pages/ for SSR (front-facing site)

import * as React from "react";

import styles from "./AppProviders.module.scss";

import { AppProvidersProps } from "./AppProviders.d";
import { Provider, SSRProvider, defaultTheme } from "@adobe/react-spectrum";

const AppProviders: React.FC<AppProvidersProps> = ({ children = null }) => {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme} colorScheme="light">
        {children}
      </Provider>
    </SSRProvider>
  );
};

export default AppProviders;
