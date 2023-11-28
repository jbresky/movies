'use client'

import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useSavedMovies = () => {
    const [favorites, setFavorites] = useState([])
    const [ranking, setRanking] = useState<any>([])

    const { user } = UserAuth()

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
          setFavorites(doc.data()?.savedMovies)
          const rankings = doc.data()?.ranking || []
          setRanking(rankings)
        })
      }, [user?.email])

    const movieRef = doc(db, 'users', `${user?.email}`)

      const removeFromFavorites = async (movieId: string | number) => {
        try {
            const result = favorites.filter((item: any) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeRanking = async (index: number) => {
        try {
            await updateDoc(movieRef, {
                ranking: arrayRemove(ranking[index])
            })
            toast.success('Ranking deleted')
        } catch (error) {
            console.log(error)
        }
    }

    return {
        favorites, ranking, removeFromFavorites, removeRanking
    }
}
 
export default useSavedMovies;