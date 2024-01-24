'use client'

import { getGenre, getTitle, getTopMovies } from "@/services/movies"
import { useCallback, useState } from "react"

export default function useMovies() {
    const [movies, setMovies] = useState<any>([])
    const [loading, setLoading] = useState(false)

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

    const getByGenre = useCallback(async (id: any) => {                
        try {
            setLoading(true)
            const movieList = await getGenre(id)
            setMovies(movieList)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        movies, getOneMovie, loading, getTopRanked, getByGenre
    }
}
