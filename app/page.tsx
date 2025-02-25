import Link from "next/link";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="h-screen bg-black text-white font-Poppins">
      <div className=" ">
        <div className="flex justify-center flex-col mx-24">
          <h1 className=" text-3xl text-center font-semibold mt-8">Effortless <span className=" text-customblue">AI-Powered</span> Trip Planning for Your Perfect Getaway</h1>
          <p className="text-center">Enhance your business reputation with genuinely authentic customer feedback. Our service allows you to easily collect and showcase text and video testimonials, helping you build trust and attract new customers rapidly. Try it for free and see the difference.</p>
          <div className="flex justify-center mt-4">
            <button className=" bg-customblue rounded-sm px-2 py-1 mx-2">Explore now</button>
            <Link href="/app" ><button className=" bg-customblue rounded-sm px-2 py-1 mx-2">Try for free</button></Link>
      </div>
    </div>
      </div >
    </div >
  )
}