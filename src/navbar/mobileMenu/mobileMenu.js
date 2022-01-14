import styles from "./mobileMenu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react';
import SettingsContext from "../../../contexts/settings";
import ultraPic from '../../../public/ultraball.png'
import premierPic from '../../../public/premier_ball.png'

function MobileMenu({setSearchParams, showInstall, setShowInstall}) {
    const [settings] = useContext( SettingsContext ); 
    return (
    <div className={ styles.mobileMenu  + " offcanvas offcanvas-end " + (settings.isDark && ' dark ')} tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileMenuLabel">Ultradex</h5>
            <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className={" list-group list-group-flush"}>
                <Link href="/pokedex">
                    <a className={styles.mobileMenuItem + " list-group-item"}>
                        <div data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                        <Image 
                            width={24} layout="fixed" 
                            height={24} 
                            alt={settings.isDark ? "ultra ball sprite" : "premier ball sprite"} src={settings.isDark ? ultraPic : premierPic} 
                        />
                        Pokemon
                        </div>
                    </a>
                </Link> 
                <Link href="/itemdex">
                    <a className={styles.mobileMenuItem + " list-group-item"}>
                        <div data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                            <FontAwesomeIcon icon={solid('backpack')} size="xl" /> Items
                        </div>
                    </a>
                </Link> 
                <button className={styles.mobileMenuItem + " list-group-item text-start"} data-bs-toggle="modal" data-bs-target="#settingsMenu">
                    <FontAwesomeIcon icon={solid('gear')} size="xl"/> Settings
                </button>
            </ul>
        </div>
    </div>
	);
}

export default MobileMenu;  
