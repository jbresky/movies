'use client'

import { UserAuth } from "@/context/auth-context"
import useLoginModal from "@/hooks/use-login-modal"
import useRegisterModal from "@/hooks/use-register-modal"
import { FormEvent, useCallback, useRef, useState } from "react"
import Modal from "./modal"
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

const RegisterModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp } = UserAuth()

    const formRef = useRef<HTMLFormElement>(null)

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            formRef.current?.reset()
            registerModal.onClose()
            toast.success('Welcome!')
        } catch (error) {
            console.log(error);
        }
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const body = (
        <form
            ref={formRef}
            className="flex flex-col items-center md:m-auto gap-12 w-full"
            onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full mt-4">
                <input
                    className="rounded-lg border-2 border-indigo-900 bg-transparent outline-none focus:brightness-200 p-4"
                    placeholder="Email"
                    onChange={((e: any) => setEmail(e.target.value))}
                    value={email}
                    name='email'
                />
                <input
                    type="password"
                    className="rounded-lg border-2 border-indigo-900 bg-transparent outline-none focus:brightness-200 p-4"
                    placeholder="Password"
                    onChange={((e: any) => setPassword(e.target.value))}
                    value={password}
                    name='password'
                />
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
                <button type="submit" className="w-full font-semibold self-center bg-indigo-900 text-gray-300 py-2 rounded-lg hover:brightness-110 focus:brightness-200">Continue</button>
                <p>or</p>
                <button className="w-full font-semibold bg-white text-gray-800 py-2 rounded-lg relative flex items-center justify-center hover:opacity-90">
                    <FcGoogle className="absolute left-4 top-3" />
                    Continue with Google
                </button>
                <p className="text-sm text-grayth self-start">Already have an account? <span className="hover:underline cursor-pointer" onClick={onToggle}>Login</span></p>
            </div>
        </form>
    )
    return (
        <Modal
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            title="Sign Up"
            body={body}
        />
    );
}

export default RegisterModal;