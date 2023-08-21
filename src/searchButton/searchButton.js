import styles from "./searchButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState, useRef, useEffect } from 'react';

function SearchButton({setSearchParams, searchParams}) {
    const [searchOpen, setSearchOpen] = useState(false)
    const searchBar = useRef(null);
    useEffect(() => {
		if(searchParams){//if search params is not null, open the search bar and populate it with the parameters.
            setSearchOpen(true)
            searchBar.current.value=searchParams
        } 
	},[])
    return (
        <div className={styles.searchContainer + " d-flex flex-row"}>
            <input ref={searchBar}  onChange={(e) => {setSearchParams(e.target.value)}} className={(searchOpen ? '' : styles.closed) + " " + styles.searchbar +  " form-control"} type="search" placeholder="Search" aria-label="Search" size="xl"/>
            <button onClick={(e) => {toggleSearchBar()}} className={styles.searchButton + " d-flex"}>
                {searchOpen ? <FontAwesomeIcon className="m-auto" icon={regular('xmark')} size="lg"/> : <FontAwesomeIcon className="m-auto" icon={solid('magnifying-glass')} size="lg"/> }
            </button>
        </div>
	);
    function toggleSearchBar(){
        setSearchOpen(!searchOpen);//Toggle th e search bar
        
        searchBar.current.value = "" //Clear the search bar's value
        setSearchParams("")
        
        if(!searchOpen) searchBar.current.focus() //If we're opening the search bar, focus it. 
    }
}

export default SearchButton;  
