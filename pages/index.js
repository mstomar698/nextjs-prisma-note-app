import { useState } from "react";

import Head from "next/head";

import NotesList from "../components/NotesList";
import Editor from "../components/Editor"

import HomeStyles from "../styles/Home.module.css";

const Home = () => {
  const [showEditor, setShowEditor] = useState(true);

  return (
    <>
      <Head>
        <title>📝 Notes app</title>
        <meta name="description" content="Notes app built with Next.js, Prisma & MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {showEditor && <Editor />}
            <NotesList />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
