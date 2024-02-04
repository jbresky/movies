'use client'

import { getTitle, getTopMovies } from "@/services/movies"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"

export default function useMovies() {
    const [movies, setMovies] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [movieSearched, setMovieSearched] = useState('')

    const getOneMovie = useCallback(async ({ title }: any) => {
        try {
            setLoading(true)
            const newMovies = await getTitle(title)
            setMovies(newMovies)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])

    const getTopRanked = useCallback(async () => {
        try {
            setLoading(true)
            const topMovies = await getTopMovies()
            setMovies(topMovies)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const submitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getOneMovie({ title })
        setMovieSearched(title)
    }

    return {
        movies,
        getOneMovie,
        getTopRanked,
        loading,
        changeSearch,
        submitSearch,
        movieSearched,
        title
    }
}
