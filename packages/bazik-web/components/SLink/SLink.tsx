import * as React from "react";

import styles from "./SLink.module.scss";

import { SLinkProps } from "./SLink.d";
import Link from "next/link";
import { Link as SpectrumLink } from "@adobe/react-spectrum";

const SLink: React.FC<SLinkProps> = ({
  className = "",
  href = "",
  children = null,
}) => {
  return (
    <Link href={href} legacyBehavior>
      <SpectrumLink UNSAFE_className={`${styles.spectrumLink} ${className}`}>
        {children}
      </SpectrumLink>
    </Link>
  );
};

export default SLink;
