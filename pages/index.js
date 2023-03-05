import Head from 'next/head';
import { useState } from 'react';
import NotesList from '../components/NotesList';
import Editor from '../components/Editor';
import HomeStyles from '../styles/Home.module.css';

import { getSession } from 'next-auth/react';
const getAllNotesByUserID = require('../prisma/Note').getAllNotesByUserID;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { notes: [] } };
  }
  const notes = await getAllNotesByUserID(session?.user?.id);
  return {
    props: { notes },
  };
};

const Home = ({ notes }) => {
  const [showEditor, setShowEditor] = useState(true);
  return (
    <>
      <Head>
        <title>📝 Notes app</title>
        <meta
          name="description"
          content="Notes app built with Next.js, Prisma & MongoDB"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {showEditor && <Editor />}
            <NotesList retrieved_notes={notes} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
