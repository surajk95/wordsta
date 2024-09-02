import styles from "./page.module.scss";
import Redirect from "./components/redirect";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Wordsta</h1>
      <Redirect />
    </main>
  );
}
