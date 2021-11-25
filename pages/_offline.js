import Head from 'next/head'
import { useContext } from 'react';
import SettingsContext from '../contexts/settings'

function Offline(props) {
    const [settings] = useContext( SettingsContext );
	return (
        <>
        <Head>
          <title>Offline - Ultradex</title>
        </Head>
        <div id="scrollContainer" className={"scrollContainer " + (settings.isDark && " dark")}>
            <div className="container">
                <h1>Looks like you're offline!</h1>
                <p>Once you've viewed this page with an internet connection you'll be able to view it while offline.</p>
            </div>
        </div>
      </>
	);
}
export default Offline;
