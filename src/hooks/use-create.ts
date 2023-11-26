'use client'

import { UserAuth } from "@/context/auth-context"
import { db } from "@/firebase"
import { Movie } from "@/interface/movie-interface"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

const useCreate = () => {
    const [selectedMovies, setSelectedMovies] = useState<any>([])
    const [nameOfRanking, setNameOfRanking] = useState('')
    const [rankingReady, setRankingReady] = useState(false)
    const [load, setLoad] = useState(false)

    const router = useRouter()

    const { user } = UserAuth()

    const submitNameOfRanking = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setRankingReady(true)
    }

    const addToRanking = ({ item }: { item: Movie }) => {
        const isSelected = selectedMovies.some((movie: any) => movie.id == item.id)

        if (selectedMovies.length === 10) {
            toast.message('10 movies are the maximum')
            return
        }

        if (!isSelected) {
            setSelectedMovies(() => [...selectedMovies, item])
        } else {
            toast.message('Movie already selected')
            return
        }
    }

    const changeRankingName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameOfRanking(e.target.value)
    }

    const removeFromRanking = (movieId: string) => {
        const updatedMovies = selectedMovies.filter((movie: any) => movie.id != movieId)
        setSelectedMovies(updatedMovies)
    }

    const userID = doc(db, 'users', `${user?.email}`)

    const saveRanking = async () => {
        try {
            setLoad(true)
            await updateDoc(userID, {
                ranking: arrayUnion({
                    name: nameOfRanking,
                    movies: selectedMovies
                })
            })
            router.push('/account')
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false)
        }
    }

    return {
        selectedMovies,
        load,
        nameOfRanking,
        changeRankingName,
        submitNameOfRanking,
        rankingReady,
        addToRanking,
        removeFromRanking,
        saveRanking,
    }
}
 
export default useCreate;