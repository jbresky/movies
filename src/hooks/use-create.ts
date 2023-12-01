'use client'

import { UserAuth } from "@/context/auth-context"
import { db } from "@/firebase"
import { Movie } from "@/interface/movie-interface"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useReducer } from "react"
import { toast } from "sonner"

interface State {
    selectedMovies: Movie[],
    nameOfRanking: string,
    rankingReady: boolean,
    load: boolean
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_RANKING_READY'; payload: boolean }
    | { type: 'ADD_TO_RANKING'; payload: Movie }
    | { type: 'REMOVE_FROM_RANKING'; payload: string }
    | { type: 'SET_LOAD'; payload: boolean }


const initialState: State = {
    selectedMovies: [],
    nameOfRanking: '',
    rankingReady: false,
    load: false
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, nameOfRanking: action.payload }
        case 'SET_RANKING_READY':
            return { ...state, rankingReady: action.payload }
        case 'ADD_TO_RANKING':
            return { ...state, selectedMovies: [...state.selectedMovies, action.payload] }
        case 'REMOVE_FROM_RANKING':
            return { ...state, selectedMovies: state.selectedMovies.filter(movie => movie.id !== action.payload) }
        case 'SET_LOAD':
            return { ...state, load: action.payload }
        default:
            return state
    }
}

const useCreate = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const router = useRouter()

    const { user } = UserAuth()

    const submitNameOfRanking = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'SET_RANKING_READY', payload: true })
    }

    const addToRanking = ({ item }: { item: Movie }) => {
        const isSelected = state.selectedMovies.some((movie: any) => movie.id == item.id)

        if (state.selectedMovies.length === 10) {
            toast.message('10 movies are the maximum')
            return
        }
        if (!isSelected) {
            dispatch({ type: 'ADD_TO_RANKING', payload: item })
        } else {
            toast.message('Movie already selected')
            return
        }
    }

    const changeRankingName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_NAME', payload: e.target.value })
    }

    const removeFromRanking = (movieId: string) => {
       dispatch({ type: 'REMOVE_FROM_RANKING', payload: movieId })
    }

    const userID = doc(db, 'users', `${user?.email}`)

    const saveRanking = async () => {
        try {
            dispatch({ type: 'SET_LOAD', payload: true })
            await updateDoc(userID, {
                ranking: arrayUnion({
                    name: state.nameOfRanking,
                    movies: state.selectedMovies
                })
            })
            router.push('/account')
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: 'SET_LOAD', payload: false })
        }
    }

    return {
        ...state,
        changeRankingName,
        submitNameOfRanking,
        addToRanking,
        removeFromRanking,
        saveRanking,
    }
}

export default useCreate;