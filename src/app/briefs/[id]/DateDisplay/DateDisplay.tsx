"use client"

import './DateDisplay.css';
import { CurrNewsObject } from '../page';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { CalendarIcon } from '@chakra-ui/icons';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import 'react-calendar/dist/Calendar.css';

// Pass in array/object of dates that DO HAVE A BRIEF AVAILABLE TO READ FROM THEM. Else, we disable that date in the calender-date-picker component.
type DatePickerProps = {
    availableDates: string[] 
    setCurrNews: (currNews : CurrNewsObject[]) => void,
}

const DateDisplay = ({availableDates, setCurrNews} : DatePickerProps) => {

    // "year-month-day"
    // string = ${number}-${number}-${number}
    const [selectedDate, setSelectedDate] = useState<`${number}-${number}-${number}`| string>(availableDates[0]); 
    const [displayDatePicker, setDisplayDatePicker] = useState<boolean>(false);

    const normalizeStringToDateObject = (stringDate : string) : Date | undefined => {

        if (stringDate.includes("-")) {
            let modifiedInitialDate = stringDate.split("-");
            return new Date(Number(modifiedInitialDate[0]), Number(modifiedInitialDate[1]) - 1, Number(modifiedInitialDate[2]));
            // Month-Index in Date-Object-Constructor === '0 -> 11' (i.e., Months '1 - 12')
        }
    }

    useEffect(() => {

        setCurrNews([])

        let timeoutID = setTimeout(() => {setCurrNews([
            {"🏢 Property Management" : [["Reader's Dilemma: Keep or Sell Rental Property", "Sources: morningstar", 
            "Aarthi Swaminathan discusses a reader's dilemma of whether to sell or keep a rental property generating $2,600 monthly income, with a positive cash flow of $400 after deductions. The author presents arguments in favor of retaining the property, such as diversifying investment portfolios, capturing home-price appreciation, and steady rental income flow. Analyzing the adjustable-rate mortgage, which still has six years left with a low rate, the author considers reasons for selling, including potential tax benefits and implications for future equity. Furthermore, insights from financial experts on market trends and potential volatility are shared, ultimately advocating for maintaining the rental property if it continues to yield profit without significant challenges. The post includes a call for readers' real estate questions for future columns by Aarthi Swaminathan on MarketWatch."],
            ["Legislators push ban on rent software", "Sources: vtdigger", "U.S. Rep. Becca Balint, D-Vt., and U.S. Sen. Peter Welch, D-Vt., are spearheading a legislative effort to ban the use of rental property management software that they claim leads to inflated rent prices through algorithm-based pricing. Balint introduced a bill in the House, while Welch introduced a companion bill in the Senate, targeting companies like RealPage and Yardi. They argue that these practices contribute to the housing crisis, impacting both urban and rural areas, with tenants facing steep rent hikes allegedly driven by anticompetitive algorithms. The legislation aims to address concerns of price fixing and lack of competition in the rental market, highlighting the prevalence of large property management companies even in seemingly local rental operations."], 
            ["Shreveport Apartments Face Shutdown", "Sources: ksla", "Three apartment complexes in Shreveport face water and electricity disconnection due to management's missed payments, potentially leading to criminal charges. City officials reveal more properties are under scrutiny for blighting, cited for various issues by housing authorities. With a critical housing shortage in Shreveport that could worsen due to infractions, Director of Community Development Bonnie Moore estimates a need for about 13,000 to 14,000 affordable housing units. Despite the shutdown of utilities in some properties, they can be reopened if bills are paid and compliance with city ordinances is ensured. The city will partially demolish some problematic buildings in July due to a lack of capacity to handle all private properties."]]
            },
    
            {"📷 Social Media" : [["Meta unveils new messaging tools for businesses", "Sources: socialmediatoday", "Meta recently announced new messaging tools at their Conversations conference in Sao Paulo to help businesses connect with customers through chat, emphasizing that messaging apps have become a primary mode of interaction. The updates include AI support for businesses on WhatsApp, messaging ad optimization features, Conversions API for business messaging events, Meta Verified subscription expansion, new custom promotional messages on WhatsApp, updated message templates, and business calling in WhatsApp Business to enhance customer service. These tools aim to help businesses better utilize messaging platforms and provide more personalized and direct communication with customers."], 
            ["Instagram Testing Feedback Features for Reels", "Sources: socialmediatoday", "Instagram is testing new features to assist creators in receiving feedback on their Reels clips before sharing them publicly, including the ability to share draft Reels with friends for input and test concepts with a smaller audience. Users can now send a preview of their in-progress Reels to friends within the app for feedback, as demonstrated by a pop-up prompt shown to Reels creators. In addition, Instagram is experimenting with a feature that allows sharing Reels with non-followers before posting them, offering creators the opportunity to gather feedback and refine their content before broad release. These testing options aim to enhance content quality and may encourage more users to engage in Reels creation, though Instagram has not confirmed a wider rollout of these tools yet."], 
            ["X Enhances Analytics for Premium Users", "Sources: socialmediatoday", "X is enhancing its analytics features to offer deeper insights into content performance, particularly through the addition of new elements allowing users to further analyze audience data by specific date ranges and metrics. Despite this positive development, the advanced analytics display will be accessible exclusively to X Premium subscribers, signaling an effort to drive more users toward paid memberships and reduce reliance on ad revenue. While X has gradually reintroduced certain demographic insights, features like Audience Analytics that provided comprehensive data tools remain restricted to paying members, including those using the beta version of X Analytics. The company's goal is to increase subscription revenue, with owner Elon Musk aiming for subscriptions to contribute 50% of total revenue in the future, even though current figures show a much lower percentage generated from subscriptions."]]
            },
    
            {"🤝 Entrepreneurship" : [["Shades of Progress Conference Celebrates BIPOC Entrepreneurship", "Sources: nhbr", "The inaugural Shades of Progress Conference highlighted the changing demographics in New Hampshire and focused on BIPOC entrepreneurship. The event featured a keynote address by Anthony Poore, president of the New Hampshire Center for Justice & Equity, who emphasized the state's growing diversity. Organized by the Business Alliance for People of Color (BAPOC), the conference included panel discussions, workshops, and insights from BIPOC business owners on topics like entrepreneurship and challenges faced in business. The gathering aimed to celebrate diversity, innovation, and progress in the state, encouraging ongoing conversations and efforts to support BIPOC communities in their entrepreneurial endeavors."], 
            ["Ann Sheu to Speak at Women in Business Leadership Symposium", "Sources: localprofile", "Ann Sheu, the founder of Mpowered, will be speaking at the Women in Business Leadership Symposium in June 2024, organized by Local Profile and sponsored by Bank of America. She will share her experiences and insights on entrepreneurship and overcoming challenges, including the importance of seeking help, dealing with setbacks, and setting clear goals. Sheu's approach emphasizes collaboration, learning from mistakes, and prioritizing personal growth to achieve success in both business and life. Additionally, she and her team are working on projects like a book challenging the idea of equating business success with family success, launching a virtual workshop, and starting a podcast to empower individuals in creating meaningful relationships and living intentionally."]]
            },
    
            {"💰 Finance" : [["Credit Suisse bondholders sue Switzerland for $17 billion writedown", "Sources: cnbc yahoo msn ft", "Credit Suisse bondholders have filed a lawsuit against Switzerland in the U.S. seeking compensation for the $17 billion writedown of AT1 debt that occurred when the bank was rescued by UBS. This legal action marks the first major claim made in a U.S. court related to the debt writedown issue. The bondholders are specifically seeking full compensation over the contentious decision to write down the failed bank's debt."], 
            ["Trump Raises $12 Million from Silicon Valley Tech Titans", "Sources: yahoo reuters yahoo nytimes", "Republican presidential candidate Donald Trump raised $12 million on Thursday at a San Francisco event hosted by tech venture capitalists in Silicon Valley. The fundraiser marked a significant fundraising effort by Trump in a traditionally Democratic-leaning region. The event was co-hosted by notable figures in the tech industry, contributing to Trump's campaign funds."],
            ["Apollo Urges Industry Shift amid Lower Valuations", "Sources: cnbc bloomberg yahoo advisorperspectives", "Apollo's co-president, Scott Kleinman, highlighted that the private equity industry needs to adjust to lower valuations. He emphasized the importance of returning to traditional bargain hunting practices in the current high-rate environment. Kleinman's remarks suggest that Apollo Global Management Inc. is one of the few private equity firms comfortable with higher rates."],
            ["Shein Faces Resistance in Europe", "Sources: yahoo marketscreener wallstreetobserver reuters", "Online fast-fashion retailer Shein is facing pushback from Europe's retail industry and lawmakers as it intensifies its pre-IPO charm offensive in Britain. This resistance comes amid ongoing European Union elections and concerns from manufacturers of fabric, clothes, leather goods, and shoes across 27 countries. The roadblocks in Europe suggest challenges for Shein as it navigates its path towards an initial public offering."],
            ["Visa and Mastercard face UK lawsuits", "Sources: yahoo investing reuters marketscreener", "Global payments processors Visa and Mastercard are confronting new lawsuits in the UK regarding fees imposed on retailers. A London tribunal recently determined that collective cases filed by merchants can proceed against the two companies. This development adds to the existing legal challenges Visa and Mastercard are already facing in London over merchant fees."]]
            }, 
    
            {"💻 AI": [["Elon Musk's xAI Chooses Memphis for Supercomputer Project", "Sources: foxbusiness", `xAI, led by Elon Musk, has chosen Memphis as the home for its upcoming supercomputer project, dubbed the "Gigafactory of Compute." The Greater Memphis Chamber announced this significant investment, pending approval from several local organizations. The development is expected to create a substantial number of jobs and reflects Memphis' innovative spirit, drawing praise from local politicians and leaders. With a recent $6 billion funding round, xAI is gearing up for future technological advancements and product releases.`], 
            ["AI-equipped sex dolls raise concerns in Berlin.", "Sources: bbc", "Concern is growing over the incorporation of artificial intelligence in the adult entertainment industry as Cybrothel introduces AI-equipped sex dolls in Berlin, offering verbal and physical interactions with customers. While this use of generative AI is expanding, experts caution about potential biases and harmful impacts, such as encoding retrograde gender stereotypes and addiction risks, especially targeting lonely individuals. Privacy concerns and the potential negative effects on real-world relationships are also raised, with calls for understanding the data sets used to train sex chatbots and addressing the ethical implications of AI in this context."], 
            ["Implications of large language models on AGI.", "Sources: vox", "The author, a senior writer at Future Perfect, discusses the implications of large language models (LLMs) and their potential to lead to general artificial intelligence (AGI). They highlight a recent analysis by Leopold Aschenbrenner advocating for the development of LLM-based general intelligence to rival advances from China. The piece explores contrasting perspectives on LLMs, with arguments for continued scaling and skepticism about achieving AGI solely through current methods. The author emphasizes the unpredictability of technological advancements and the need for a nuanced approach in understanding and preparing for the future of AI."],
            ["Apple to Introduce Apple Intelligence at WWDC 2024", "Sources: theverge", "Apple is set to introduce a new AI system named Apple Intelligence at WWDC 2024, offering advanced AI features and a ChatGPT-like chatbot powered by OpenAI. The focus will be on practical AI applications like summarizations, reply suggestions, and enhancing Siri's capabilities to control apps. Using a combination of in-house technology and OpenAI tools, Apple will employ algorithms to decide whether tasks should be processed on-device or in the cloud for security and efficiency. To address privacy concerns, Apple plans to avoid building user profiles and provide reports on data protection, contrasting with Microsoft's AI advancements receiving criticism over security issues."],
            ["Klarna's AI Chatbot Takes Over Customer Chats", "Sources: cnbc", "Financial services company Klarna revealed that its AI agent, powered by OpenAI, has taken over a significant portion of customer chats equivalent to the work of 700 full-time agents, after just one month of use. OpenAI's ChatGPT chatbot released in late 2022 marked the start of a new era where generative AI chatbots could provide more thorough and creative responses to web queries. The industry has shifted towards AI agents, which are designed for productivity and task completion without human intervention, and tech investors are showing increased interest in startups developing these agents. Microsoft and Google are at the forefront in deploying AI assistants to complete tasks on behalf of users, leading the way in the evolution of AI agents that go beyond chatbots to perform complex multistep functions effectively."]]
            }
        ]); console.log("¡Fetching the Selected Day's Brief!");}, 950);

        console.log(selectedDate);

        // Cleanup Function to avoid stacking/piling timeouts...
        return () => {
            clearTimeout(timeoutID);
        }
    
    }, [selectedDate])    

    return (

        <div className='flex flex-row justify-center items-center gap-2 relative w-full'> 
            
            <div className=''> 
                <CalendarMonthTwoToneIcon onClick={() => setDisplayDatePicker((prev) => !prev)} className="svg-calendar-icon cursor-pointer" sx={{width: 42.5, height: 42.5}}/>
                {displayDatePicker && <Calendar className="react-calendar absolute z-10 ring-2 ring-white ring-transparent rounded-[20px] overflow-hidden" 
                                            tileDisabled={ (args) => !availableDates.includes(args.date.toISOString().slice(0, 10)) } 
                                            tileClassName={({ activeStartDate, date, view }) => date.toISOString().slice(0, 10) === selectedDate ? 'selected-date' : null} 
                                            onClickDay={(value) => { console.log(value.toISOString().slice(0, 10)); setSelectedDate(value.toISOString().slice(0, 10)); setDisplayDatePicker(false); }}
                                            minDate={normalizeStringToDateObject(availableDates[availableDates.length - 1])} maxDate={normalizeStringToDateObject(availableDates[0])} maxDetail={'month'} 
                                            minDetail={'year'} defaultActiveStartDate={normalizeStringToDateObject(selectedDate)} defaultValue={normalizeStringToDateObject(selectedDate)} />} 
            </div> 
    
            <h2 className='text-aimply-purple text-[30px] font-bold font-mono pt-1'> {selectedDate} </h2>
        </div>

    )

}

export default DateDisplay;