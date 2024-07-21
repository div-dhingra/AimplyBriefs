"use client"

import './news.css'
import { CurrNewsObject } from '../page';

import { useState, useEffect, useRef } from 'react';
import { RefObject } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShareSquare } from '@fortawesome/free-regular-svg-icons';

import DateDisplay from '../DateDisplay/DateDisplay';

const News = () => {

    const briefDates : string[] = ["2024-06-14", "2024-06-13", "2024-06-12", "2024-06-11", "2024-06-08", "2024-06-07", "2024-06-06", "2024-06-05", "2024-06-04", "2024-06-01", "2024-05-31", "2024-05-30", "2024-01-17"]

    const [currNews, setCurrNews] = useState<CurrNewsObject[]>([]);
    
    const currCategories = ["🏢", "📷","🤝", "💰", "💻"];
    const [selectedCategory, setSelectedCategory] = useState<string>('🏢');

    const categoryRefs = currCategories.map((category) => useRef<HTMLDivElement>(null));

    const currBriefContainer = useRef<HTMLDivElement>(null);

    const scrollToCategory = (categoryRef : RefObject<HTMLDivElement>, parentContainerRef : RefObject<HTMLDivElement>) => {
        
        if (categoryRef !== undefined) {
            parentContainerRef.current?.scrollTo({
                top: categoryRef.current?.offsetTop! - 100, 
                behavior: "smooth"
            })
        }
    }


    const resetScrollHeight = (containerRef : RefObject<HTMLDivElement>) => {
  
        if (containerRef !== undefined) {
            containerRef.current?.scrollTo({
                top: 0, 
                behavior: "smooth"
            })
        }
    }

    // @ts-expect-error
    const checkIfInCurrBriefContainerViewPort = (parentContainerRef, childContainersRefs) => {
        
        let mainChildInViewPort = childContainersRefs.find((childContainer : RefObject<HTMLDivElement>) => 
            ((childContainer.current!)!.getBoundingClientRect().bottom) - (parentContainerRef.current!).getBoundingClientRect().top >=  (0.50 * (childContainer.current!).getBoundingClientRect().height));

        setSelectedCategory(currCategories[childContainersRefs.indexOf(mainChildInViewPort)]);
    }

    return (

        <div className='relative mt-6 m-[1em] news-container rounded-[20px] flex flex-col ring-2 ring-gray-200'> 
            
             <div className="emoji-selection-bar cursor-pointer z-10"> 
                {currCategories.map((category:string) => <span className={category === selectedCategory ? "text-4xl bg-gray-200 rounded-full p-2" : 'text-3xl p-2'} key={category} onClick={() => { setSelectedCategory(category); scrollToCategory(categoryRefs[currCategories.indexOf(category)], currBriefContainer); resetScrollHeight(categoryRefs[currCategories.indexOf(category)]); }}> {category}</span>)} 
            </div>


            <div className='flex flex-row items-center justify-center w-full self-center pt-6 pb-2'>
                <DateDisplay setCurrNews={setCurrNews} availableDates={briefDates}/>
            </div>


            <div onScroll={() => checkIfInCurrBriefContainerViewPort(currBriefContainer, categoryRefs)} ref={currBriefContainer} className="h-full grid place-items-center gap-6 w-[70vw] rounded-[20px] overflow-y-auto p-[2em] pt-[1em]"> 
                    <div className="fixed z-[-1] top-[18.5%] inset-0 bg-[url('/aimply_logo.png')] bg-no-repeat bg-center blur-md" /> 
                    {      
                        // For each news-category 
                        currNews.map((newsCategory, index) => {

                            return (
                                <div ref={categoryRefs[index]}  className="h-[475px] ring-1 ring-white rounded-[20px] p-5 w-4/5 bg-transparent flex flex-col gap-4 overflow-y-scroll backdrop-brightness-[2.3] ml-[4.5rem]" key={Object.keys(newsCategory)[0]}> 

                                    <h1 className="text-aimply-purple font-bold text-3xl" key={index}> {Object.keys(newsCategory)} </h1>
                                    
                                    <div className='flex flex-col gap-7'> 
                                    {/* @ts-expect-error */}
                                    {(newsCategory[Object.keys(newsCategory)]).map((sectionStory, index) => (

                                        <div key={sectionStory} className="text-lg flex flex-col gap-4 relative"> 
                                            {/* Title  */}
                                            <h2 key ={sectionStory[0]} className="font-bold text-xl"> 
                                                {sectionStory[0]}
                                            </h2>

                                            {/* Sources */}
                                            <div key = {sectionStory[1]} className='flex gap-2.5 sources'>
                                                {sectionStory[1].split(" ").map((text : string, index: number) => {
                                                    return (
                                                        <span key={text} className={index !== 0 ? "text-aimply-purple underline cursor-pointer underline-offset-2" : ""}> {text} </span>
                                                    )
                                                })}
                                            </div>

                                            {/* News-Piece */}
                                            <p key = {sectionStory[2]} className='news-piece'> 
                                                {sectionStory[2]}
                                            </p>

                                            <div key={index} className='flex flex-row w-full justify-between'> 
                                                {/* Like button */}
                                                <button className='like-btn flex ring-2 ring-white bg-aimply-purple rounded-[20px] w-[9.5%] pt-2 pb-2 items-center justify-center '>
                                                    <FontAwesomeIcon icon={faHeart} color='white' style={{height: "25px"}} className="like-icon"/>
                                                    <span className='text-white absolute font-bold text-base'> Like </span>
                                                </button>

                                                {/* Share button */}
                                                <button className='share-btn mr-4 flex ring-2 ring-white bg-aimply-purple rounded-[20px] w-[9.5%] pt-2 pb-2 items-center justify-center'> 
                                                    <FontAwesomeIcon icon={faShareSquare} color='white' style={{height: "25px"}}  className="share-icon"/>
                                                    <span className='text-white absolute font-bold text-base'> Share </span>
                                                </button>
                                            </div>
                                        </div>

                                    ))}

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


    )
}

export default News; 