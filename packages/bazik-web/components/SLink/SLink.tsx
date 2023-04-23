import * as React from "react";

import styles from "./SLink.module.scss";

import { SLinkProps } from "./SLink.d";
import Link from "next/link";
import { Link as SpectrumLink } from "@adobe/react-spectrum";

const SLink: React.FC<SLinkProps> = ({ href = "", children = null }) => {
  return (
    <Link href={href} legacyBehavior>
      <SpectrumLink>{children}</SpectrumLink>
    </Link>
  );
};

export default SLink;
