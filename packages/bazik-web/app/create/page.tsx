import styles from "./page.module.scss";

export const metadata = {
  title: "Create Project",
  description: "Create a new 3D project in Bazik",
};

export default function Create() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create</h1>
    </main>
  );
}
