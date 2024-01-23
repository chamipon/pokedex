
import { useContext } from 'react';
import SettingsContext from '../contexts/settings'
import { NextSeo } from 'next-seo';
function Offline(props) {
    const [settings] = useContext( SettingsContext );
	return (
        <>
        <NextSeo
            title="Offline - Ultradex"
        />
        <div id="scrollContainer" className={"scrollContainer "}>
            <div className="container">
                <h1>Looks like you're offline!</h1>
                <p>Once you've viewed this page with an internet connection you'll be able to view it while offline.</p>
            </div>
        </div>
      </>
	);
}
export default Offline;
