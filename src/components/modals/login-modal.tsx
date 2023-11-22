'use client'

import { UserAuth } from "@/context/auth-context";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import { FormEvent, useCallback, useState } from "react";
import Modal from "./modal";
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import { validateEmail } from "@/utils/validateEmail";

const LoginModal = () => {
    const [email, setEmail] = useState({
        value: "",
        isTouched: false
    })
    const [password, setPassword] = useState({
        value: "",
        isTouched: false
    })
    const [loading, setLoading] = useState(false)

    const { logIn, googleSignIn } = UserAuth()

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const isFormValid = () => {
        return validateEmail(email.value) && password.value.length >= 5
    }

    const signInWithCredentials = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            await logIn(email.value, password.value)
            loginModal.onClose()
            setEmail({ value: "", isTouched: false })
            setPassword({ value: "", isTouched: false })
            toast.success('Logged in')
        } catch (error) {
            console.log(error);
            toast.error('Invalid credentials')
        } finally {
            setLoading(false)
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
        <div className="flex flex-col items-center md:m-auto gap-6 w-full">
            <form onSubmit={signInWithCredentials} className="w-full">
                <div className="flex flex-col gap-6 w-full mt-4">
                    <div>
                        <input
                            className="w-full rounded-lg border-2 border-indigo-900 bg-transparent outline-none focus:brightness-200 p-4"
                            placeholder="Email"
                            onChange={((e: any) => setEmail({ ...email, value: e.target.value }))}
                            onBlur={() => { 
                                setEmail({ ...email, isTouched: true }); 
                              }} 
                            value={email.value}
                            name='email'
                        />
                        {email.isTouched && !validateEmail(email.value) ? <p className="text-sm text-red-500 pt-2 pl-1">
                            Please provide a valid email
                        </p> : null}
                    </div>
                    <div>
                        <input
                            type="password"
                            className="w-full rounded-lg border-2 border-indigo-900 bg-transparent outline-none focus:brightness-200 p-4"
                            placeholder="Password"
                            onChange={((e: any) => setPassword({ ...password, value: e.target.value }))}
                            onBlur={() => { 
                                setPassword({ ...password, isTouched: true }); 
                              }} 
                            value={password.value}
                            name='password'
                        />
                        {password.isTouched && password.value.length < 5 ? <p className="text-sm text-red-500 pt-2 pl-1">
                            Password must contain at least 5 characters
                        </p> : null}
                    </div>
                    <button
                        disabled={!isFormValid()}
                        type="submit"
                        className="w-full font-semibold self-center bg-indigo-900 text-gray-300 py-2 rounded-lg focus:brightness-200">
                        Continue
                    </button>
                </div>
            </form>
            <div className="flex flex-col gap-4 w-full items-center">
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
            loading={loading}
        />
    );
}

export default LoginModal;