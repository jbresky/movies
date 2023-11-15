'use client'

import { FaSearch } from 'react-icons/fa'
import Movies from "@/components/movies"
import useMovies from '@/hooks/useMovies'

export default function Home() {

  const { movies, getMovies, loading } = useMovies()

  return (
    <div className="flex min-h-screen max-w-[1700px] m-auto flex-col py-6 px-4 lg:p-10 gap-8">

      <header className="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-2 px-3">
        <div>
          <h1 className="font-bold lg:text-lg text-gray-300">Create your ranking and show people that good taste 😏</h1>
        </div>
        <div
        onClick={getMovies}
        className="flex items-center gap-3 text-sm text-[#929aa5] p-2 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
          {/* <FaSearch />
          <input placeholder="Search movie..." className="bg-transparent outline-none w-full" /> */}
          Bring top movies
        </div>
      </header>
      <main className="w-full">
        
        <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
          {
            loading ? (
              <p>Loading...</p>
            ) : (
              <Movies movies={movies} />
            )
          }
        </div>
      </main>
    </div>
  )
}
