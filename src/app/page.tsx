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

  const { movies, getTopRanked, loading, getOneMovie, getByGenre } = useMovies()

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
      >
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => getByGenre('35')}>Comedy</h3>
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => getByGenre('18')}>Drama</h3>
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => getByGenre('28')}>Action</h3>
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => getByGenre('53')}>Thriller</h3>
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => getByGenre('27')}>Horror</h3>
      </Search>

      <main className="w-full">
        {
          loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mt-8 justify-items-center">
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
