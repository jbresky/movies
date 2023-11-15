'use client'

import { getTopMovies } from "@/services/movies"
import { useCallback, useState } from "react"

export default function useMovies() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    const getMovies = useCallback(async () => {
        try {
            setLoading(true)
            const newMovies = await getTopMovies()
            setMovies(newMovies)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])

  return {
    movies, getMovies, loading
  }
}
