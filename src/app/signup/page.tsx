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
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form
            className="bg-neutral-800 flex justify-center items-center m-auto mt-20 flex-col w-[50%] p-10 gap-4"
            onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input
                    className="rounded-lg bg-slate-500 p-4"
                    placeholder="Email"
                    onChange={((e: any) => setEmail(e.target.value))}
                    value={email}
                    name='email'
                />
                <input
                    type="password"
                    className="rounded-lg bg-slate-500 p-4"
                    placeholder="Password"
                    onChange={((e: any) => setPassword(e.target.value))}
                    value={password}
                    name='password'
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default SignUp;