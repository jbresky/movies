'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Search from "@/components/search-movies"
import useSearch from '@/hooks/use-search'
import useMovies from '@/hooks/use-movies'
import useFavorites from '@/hooks/use-saved-movies'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'
import type { Movie } from "@/interface/movie-interface"
import CardMovie from "@/components/containers/card-movie"

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
        <h3 className="sm:hover:text-indigo-400 sm:text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-3 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={() => getByGenre('35')}>Comedy</h3>
        <h3 className="sm:hover:text-indigo-400 sm:text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-3 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={() => getByGenre('18')}>Drama</h3>
        <h3 className="sm:hover:text-indigo-400 sm:text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-3 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={() => getByGenre('28')}>Action</h3>
        <h3 className="sm:hover:text-indigo-400 sm:text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-3 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={() => getByGenre('53')}>Thriller</h3>
        <h3 className="sm:hover:text-indigo-400 sm:text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-3 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={() => getByGenre('27')}>Horror</h3>
      </Search>

      <main className="w-full">
        <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mt-8 justify-items-center">
          {
            movies.map((item: Movie) => (
              loading ? (
                <div key={item.id} className="space-y-3">
                  <Skeleton className="h-[375px] w-[170px] md:w-[200px] lg:w-[250px] xl:w-[300px]" />
                  <Skeleton className="h-2 w-[120px] md:w-[150px] lg:w-[200px] xl:w-[250px]" />
                </div>
              ) : (
                <CardMovie
                  key={item.id}
                  item={item}
                  userFavorites={favorites}
                />
              )
            ))
          }
        </div>
      </main>
    </>
  )
}
