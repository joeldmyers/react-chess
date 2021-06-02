import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChessBoard from "../components/ChessBoard/ChessBoard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Update</main>
      <ChessBoard />

      <footer className={styles.footer}></footer>
    </div>
  );
}
