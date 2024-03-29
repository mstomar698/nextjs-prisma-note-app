import '../styles/globals.css';
import '../styles/Editor.css';
import '../styles/SiteHeader.css';
import '../styles/NoteList.css';

import { SessionProvider } from 'next-auth/react';
import { NoteProvider } from '../modules/AppContext';
import DefaultLayout from '../layouts/default';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NoteProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </NoteProvider>
    </SessionProvider>
  );
}
export default MyApp;
