import Link from "next/link"
export default function SignuUpForm(){
    return(
        <div 
        className="bg-white w-[50vw] text-black p-[1vw] flex flex-col items-center gap-[1vw] h-full rounded-[1vw] text-[1.5vw]"
        >
            <h1 className="font-bold text-[2vw]">Sign Up Form</h1>
            <form className="flex flex-col w-[100%]">
                <label >Name :</label>
                <input placeholder="Example Elpmaxe" type="text"/>
                <label >Email :</label>
                <input placeholder="example@gmail.com" type="text"/>
                <label>Password :</label>
                <input className="border-none" placeholder="********" type="password"/>
                <label>Confirm Password :</label>
                <input className="border-none" placeholder="********" type="password"/>
            </form>
            <div className="text-[1vw] flex items-center gap-[1vw]">
                <input type="checkbox"/>
                <Link href={"./"}>Term and Condition</Link>
                </div>
            <button  
            className="text-white hover:text-black bg-black hover:bg-white hover:border-black border-[0.1vw] border-[qvw] w-full px-[2vw] rounded-[1vw]">
                Sign Up
            </button>
            <p className="text-[1vw] m-[1vw]">Already have an account? <Link href={"../login"}>Login</Link></p>
        </div>
    )
}