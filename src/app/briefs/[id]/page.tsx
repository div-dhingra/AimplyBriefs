"use client"

import Navbar from "./ Navbar/navbar";
import News from "./News/news";

export type CurrNewsObject = {
    [key : string] : string[][] 
};

export default function DailyNews() {
    
    return (
        <div className="h-screen flex flex-col items-center relative"> 
            <Navbar/>
            <News/>
        </div>
    )
}