export default function Hero () {
    return (
        <div className="h-screen bg-black flex justify-center items-center">
        <form className="bg-black w-[50%] flex flex-col p-8 text-white font-Poppins">
            <h1 className=" text-xl text-customblue font-semibold">sign up</h1>
            <label>email</label>
            <input type="email" ></input>
            <label>password</label>
            <input type="email" ></input>
            <button className="bg-customblue mt-4 rounded-sm">sign in</button>


        </form>
    </div>
    )
}