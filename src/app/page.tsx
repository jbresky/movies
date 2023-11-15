'use client'

import Movies from "@/components/movies"
import useMovies from '@/hooks/useMovies'
import { ChangeEvent, FormEvent, useState } from 'react'
import Loader from '@/components/loader'
import Header from "@/components/header"

export default function Home() {
  const [title, setTitle] = useState('')
  const { movies, getOneMovie, getTopMovies, loading } = useMovies({ title })

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getOneMovie({ title })
  }

  return (
    <div className="flex min-h-screen max-w-[17003px] m-auto flex-col py-6 px-4 lg:p-10 gap-12">
      <Header
        title={title}
        changeSearch={changeSearch}
        submitSearch={submitSearch}
      />
      <main className="w-full">
        {
          loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
              <Movies movies={movies} />
            </div>
          )
        }
      </main>
    </div>
  )
}
