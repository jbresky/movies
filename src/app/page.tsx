'use client'

import Loader from '@/components/loader'
import Search from "@/components/search-movies"
import CardMovie from "@/components/card-movie"
import useSearch from '@/hooks/use-search'
import useMovies from '@/hooks/use-movies'
import useFavorites from '@/hooks/use-saved-movies'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'
import type { Movie } from "@/interface/movie-interface"

export default function Home() {

  const { title, setTitle } = useSearch()

  const { movies, getOneMovie, getTopRanked, loading } = useMovies({ title })

  const { favorites } = useFavorites()

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getOneMovie({ title })
  }

  return (
    <>
      <Toaster />
      <Search
        title={title}
        changeSearch={changeSearch}
        submitSearch={submitSearch}
        getTopRanked={getTopRanked}
      />

      <main className="w-full">
        {
          loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-sm sm:grid-cols-xl md:grid-cols-2xl gap-4 mt-8 justify-items-center">
              {
                movies.map((item: Movie) => (
                  <CardMovie
                    key={item.id}
                    item={item}
                    userFavorites={favorites}
                  />
                ))
              }
            </div>
          )
        }
      </main>
    </>
  )
}
