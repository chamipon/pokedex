import "../styles/app.css"
import "../src/navbar/navbar.css"
import 'bootstrap/dist/css/bootstrap.css'
import "../src/pokeInfo/bodySection/bodySection.css"
import "../src/pokeInfo/types/types.css"
import "../src/pokeCard/pokeCard.css"

import "../src/navbar/navbar";
import { SettingsProvider } from "../contexts/settings";
import Head from 'next/head';
import Navbar from "../src/navbar/navbar";
import SettingsMenu from "../src/settingsMenu/settingsMenu";
import MobileMenu from "../src/navbar/mobileMenu/mobileMenu"
import React, { useState, useContext } from "react";
import { config } from '@fortawesome/fontawesome-svg-core';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
    const [searchParams, setSearchParams] = useState(""); // The current search parameters
	const [showInstall, setShowInstall] = useState(false)//Used to control if the install button is being displayed
return(
    <>
    <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
            name="description"
            content="A less shit pokedex app."
        />
        <title>Ultradex</title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
            crossorigin="anonymous"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
            crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/idb@7/build/umd.js"></script>
        <script src="https://unpkg.com/pokeapi-js-wrapper/dist/index.js"></script>
        <link rel="icon" href="/favicon.png"/>
        <meta name="theme-color" content="#222222"/>
        <link rel="apple-touch-icon" href="/app_touch_icon.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
        
      </Head>
        <div >
            <SettingsProvider>
                <Component style={{paddingLeft:'60px', paddingTop:'20px'}} searchParams={searchParams} setSearchParams={setSearchParams} {...pageProps} />
                <Navbar showInstall={showInstall} setShowInstall={setShowInstall}/>
                <SettingsMenu />
                <MobileMenu />
            </SettingsProvider>
        </div>
    </>
  ) 
}
export default MyApp
