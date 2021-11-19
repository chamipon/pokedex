import React, { useState, useEffect } from "react";
import $ from "jquery";
import Image from 'next/image'
import * as installable from "./../installable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./settingsMenu.module.css";
import { useContext } from 'react';
import DarkContext from '../../contexts/dark'
import Link from 'next/link'
function SettingsMenu() {
    const [isDark] = useContext( DarkContext );
	return (
		<div>
            <div class="modal fade" id="settingsMenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-lg modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Settings</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="OfficialArt" />
                                <label class="form-check-label" for="OfficialArt">Use Official Art</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="ShinySprites" />
                                <label class="form-check-label" for="ShinySprites">Shiny Sprites</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="DarkMode" />
                                <label class="form-check-label" for="DarkMode">Dark Mode</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default SettingsMenu;
