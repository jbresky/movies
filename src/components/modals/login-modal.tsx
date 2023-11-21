'use client'

import { UserAuth } from "@/context/auth-context";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import { useCallback, useState } from "react";
import Modal from "./modal";
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

const LoginModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { logIn, googleSignIn } = UserAuth()

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const signInWithCredentials = async () => {
        try {
            await logIn(email, password)
            loginModal.onClose()
            setEmail('')
            setPassword('')
            toast.success('Logged in')
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await googleSignIn()
            loginModal.onClose()
            toast.success('Logged in')
        } catch (error) {
            console.log(error);
        }
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])


    const body = (
        <div className="flex flex-col items-center md:m-auto gap-12 w-full">
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
                <button
                    onClick={signInWithCredentials}
                    className="w-full font-semibold self-center bg-indigo-900 text-gray-300 py-2 rounded-lg hover:brightness-110 focus:brightness-200">Continue</button>
                <p>or</p>
                <div
                    onClick={signInWithGoogle}
                    className="w-full font-semibold bg-white text-gray-800 py-2 rounded-lg relative flex items-center justify-center cursor-pointer hover:opacity-90">
                    <FcGoogle className="absolute left-4 top-3" />
                    Continue with Google
                </div>
                <p className="text-sm text-grayth self-start">First time using Movies? <span className="hover:underline cursor-pointer" onClick={onToggle}>Sign Up</span></p>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            title="Log in"
            body={body}
        />
    );
}

export default LoginModal;