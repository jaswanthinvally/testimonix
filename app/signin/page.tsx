import Link from "next/link"
export default function Signin () {
    return (
       <div className="h-screen bg-black flex justify-center items-center">
         <form className=" w-[50%] flex flex-col p-8 text-white font-Poppins">
            <h1 className=" text-xl text-customblue font-semibold">sign in</h1>
            <label>email</label>
            <input type="email" ></input>
            <label>password</label>
            <input className="text-black" type="email" ></input>
            <button className="bg-customblue mt-4 rounded-sm">sign in</button>
            <div className="text-center mt-4"><Link href='/signup'>I have not yet regestired !</Link></div>
        </form>
       </div>
    )
} 