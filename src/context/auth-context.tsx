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

    function signUp(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            savedMovies: [],
            ranking: []
        })
    }

    async function logIn(email: string, password: string) {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            if (error == "auth/email-already-in-use") {
                alert("Email already in use")
            }
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

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        setDoc(doc(db, 'users', provider.providerId), {
            savedMovies: [],
            ranking: []
        })
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