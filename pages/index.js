import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app.js';
import { useContext } from 'react';
import ShinyContext from '../contexts/shiny'
import DarkContext from '../contexts/dark.js';

import reportWebVitals from '../src/reportWebVitals';

export default function Home({ pokeList, searchParams }){
    const [isShiny] = useContext(ShinyContext);
    const [isDark] = useContext(DarkContext);
    return (
        <React.StrictMode>
            <App searchParams={searchParams} isShiny={isShiny} isDark={isDark} pokeList={pokeList}/>
        </React.StrictMode>
    )
}
export async function getStaticProps(context) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species?&limit=898`)
    var pokeList = await res.json()

    if (!pokeList) {
      return {
      notFound: true,
      }
    }
    return {
      props: { pokeList }, // will be passed to the page component as props
    }
  }

// reportWebVitals();
