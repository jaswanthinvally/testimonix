"use client"
import { useState } from "react"
import SmallCard from "../components/SmallCard"



export default function App() {
    const [Days, SetDays] = useState(0)
    return (
        <div className="text-white bg-black font-Poppins flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mt-12 mb-4">
                    <h1 className="text-2xl font-semibold mb-4">Make your <span className=" text-customblue">travel plan</span></h1>
                    <p className="text-center text-lg">Just provide some basic information, and our trip planner will generate a customized itinerary <span className=" text-customblue">based on your preferences.</span></p>
                </div>
                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className="my-4">What is destination of <span className=" text-customblue">choice ?</span></h1>
                    <input className="text-black rounded p-1" />
                </div>
                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className="my-4">When are you planning to <span className=" text-customblue">travel plan ?</span></h1>
                    <input className="text-black rounded p-1" />
                </div>

                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className="my-4">How many days are you planning to <span className=" text-customblue">travel ?</span></h1>
                    <h1><span className=" text-customblue">Days : </span> {Days} </h1>
                    <div>
                    <button className=" border-white border-2 rounded-3xl p-2 m-1" onClick={() => SetDays(prevday => prevday + 1)}>+</button>
                    <button className=" border-white border-2 rounded-3xl p-2 m-1" onClick={() => SetDays(Prevday => Math.max(0, Prevday - 1))}>-</button>
                    </div>
                </div>

                <div className="my-4">
                    <h1 className="my-4">what is your <span className=" text-customblue">budget ? </span></h1>
                    <div className="flex flex-col items-center justify-center text-black">
                    <select >
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>
                    </div>
                </div>

                <div className="flex flex-col justify-center align-middle place-center">
                    <h1 className="my-4 text-center">Who do you plan on traveling with on your next <span className=" text-customblue">trip ? </span></h1>
                    <div className="flex justify-center  ">
                        <div className="mx-6"><SmallCard heading="single" images="/single.svg" /></div>
                        <div className="mx-6"><SmallCard heading="couple" images="/couple.svg" /></div>
                        <div className="mx-6"><SmallCard heading="family" images="/family.svg" /></div>
                        
                    </div>


                </div>
                <div>


                </div>

                <div><button className=" bg-customblue text-white p-2 rounded font-semibold my-4">Create Trip</button></div>

            </div>
        </div>
    )

}