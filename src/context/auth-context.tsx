'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext({})

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>({})

    async function signUp(email: string, password: string) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setDoc(doc(db, 'users', email), {
                savedMovies: [],
                ranking: []
            })
        } catch (error: any) {
            alert(error.errors.message)
            console.log(error);
        }
    }

    async function logIn(email: string, password: string) {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            alert(error.errors.message)
            console.log(error);
        }
    }

    async function logOut() {
        try {
            return await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)

            const user: any = result.user

            if (user) {
                await setDoc(doc(db, 'users', user.email), {
                    savedMovies: [],
                    ranking: []
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsuscribe()
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ signUp, logIn, googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(): any {
    return useContext(AuthContext)
}