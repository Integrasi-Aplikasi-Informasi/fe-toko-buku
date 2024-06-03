import Link from "next/link";

export default function LoginForm(){
    return(
        <div 
        className="bg-white w-[50vw] text-black p-[1vw] flex flex-col items-center gap-[2vw] h-full rounded-[1vw] text-[1.5vw]"
        >
            <h1 className="font-bold text-[2vw]">Login Form</h1>
            <form className="flex flex-col w-[100%]">
                <label >Email :</label>
                <input placeholder="example@gmail.com" type="text"/>
                <label>Password :</label>
                <input className="border-none" placeholder="********" type="password"/>
            </form>
            <button  
            className="text-white hover:text-black bg-black hover:bg-white hover:border-black border-[0.1vw] border-[qvw] w-full px-[2vw] rounded-[1vw]">
                Login
            </button>
            <p className="text-[1vw] m-[1vw]">Don't have an account? <Link href={"../signup"}>Sign Up</Link></p>
        </div>
    )
}