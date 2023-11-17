'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext({})

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>({})

    function signUp(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedMovies: []
        })
    }

    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsuscribe()
        }
    })

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(): any {
    return useContext(AuthContext)
}