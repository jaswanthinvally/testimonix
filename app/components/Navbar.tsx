import Link from "next/link"
export function Navbar () {
    return (
        <div className="bg-customblue flex justify-around max-w-full font-Poppins font-semibold w-full h-12 items-center text-md">
            <Link href='/'>
            <div className="text-white">
                testimonix
            </div>
            </Link>
            <div className="flex ">
                <li className="text-white list-none px-2">home</li>
                <li className="text-white list-none px-2">pricing</li>
                <li className="text-white list-none px-2">features</li>
            </div>
            <div>
                <Link href='/signin'><button className="customblue bg-white text-customblue mx-2 px-2 rounded-sm" >sign in</button></Link>
                <Link href='/signup'><button className="customblue bg-white text-customblue mx-2 px-2 rounded-sm" >sign up</button></Link>

            </div>
        </div>
    )
}