'use client'

import { UserAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { signUp } = UserAuth()

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            router.push('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form
                className="border-[#15202b] border-2 rounded-lg flex flex-col justify-center items-start m-auto mt-20 w-fit h-[70vh] px-20 gap-12"
                onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold">Sign Up</h1>
                    <input
                        className="rounded-lg bg-[#15202b] p-4 "
                        placeholder="Email"
                        onChange={((e: any) => setEmail(e.target.value))}
                        value={email}
                        name='email'
                    />
                    <input
                        type="password"
                        className="rounded-lg bg-[#15202b] p-4"
                        placeholder="Password"
                        onChange={((e: any) => setPassword(e.target.value))}
                        value={password}
                        name='password'
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <button type="submit" className="font-semibold self-center bg-[#23384e] text-gray-300 py-2 px-24 rounded-lg">Submit</button>
                    <p className="text-[13px] text-grayth">Have an account? <span className="hover:underline cursor-pointer" onClick={() => router.push('/login')}>Login</span></p>
                </div>
            </form>
        </>
    );
}

export default SignUp;