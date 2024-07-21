"use client"
// Chakra ui components can't be rendered on the server -> need "use client" directive on this ENTIRE COMPONENT
// --> OR: Import chakrui component into separate  "use_client" file.tsx, and export it from there. 
// THEN, import chakra-ui component into here, so that this navbar-component is STILL RENDERED ON THE SERVER (faster than CSR)...

import './navbar.css'
import Image from 'next/image';
// Optimized version of <img> tag in normal HTML

import { SearchIcon } from '@chakra-ui/icons';
import { SettingsIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

type NavbarItem = [icon : any, text : string];


const Navbar = () => {

    const navbarOptions : NavbarItem[] = [[<SearchIcon boxSize={30} color="#5d5dff"/>, "Topics"], [<SettingsIcon color="#5d5dff" boxSize={30} />, "Settings"],[<FontAwesomeIcon icon={faHeart} color='#5d5dff' style={{height: "30px"}}/>, "Likes"], [<FontAwesomeIcon icon={faDoorOpen} color='#5d5dff' style={{height: "30px"}}/>, "Sign Out"] ];

    return (

        <nav className='navbar-container flex flex-row w-[70vw] pr-[3em] pl-[2em]'> 
        
            <div className='aimply-header cursor-pointer'> 
                <span>Aimply</span> 
                <div className="text-aimply-purple flex flex-row">

                        <Image src='/aimply_header.png' alt="Aimply Header" width={55} height={60}/>

                    riefs 
                </div>
            </div> 

            <ul className="navbar-items-container w-full"> 
                {navbarOptions.map((option : NavbarItem) => (
                    <li key ={option[1]}> 
                        <a key = {option[0]} className='cursor-pointer'> 
                            {option[0]}
                        </a> 
                        <a key = {option[1]} className="absolute text-aimply-purple text-xl cursor-pointer"> 
                            {option[1]}
                        </a> 
                    </li> 
                ))}
            </ul>

        </nav>

    )
};

export default Navbar; 