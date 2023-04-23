import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Create Beautiful 3D Posts, Ads, and Banners
      </h1>
      <h2>Get ahead of the AR revolution</h2>
      <Link href="/create">Create a Model</Link>
    </main>
  );
}
