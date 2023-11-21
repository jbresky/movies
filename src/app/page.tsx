'use client'

import useMovies from '@/hooks/use-movies'
import { ChangeEvent, FormEvent, useState } from 'react'
import Loader from '@/components/loader'
import Search from "@/components/search-movies"
import { Movie } from "@/interface/movie-interface"
import CardMovie from "@/components/card-movie"
import { Toaster } from 'sonner'

export default function Home() {
  const [title, setTitle] = useState('')

  const { movies, getOneMovie, getTopRanked, loading } = useMovies({ title })

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
      {/* MODAL */}
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
                    <CardMovie item={item} />
                  ))
                }
              </div>
            )
          }
        </main>
    </>
  )
}
