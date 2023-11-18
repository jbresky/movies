'use client'

import useMovies from '@/hooks/useMovies'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Loader from '@/components/loader'
import Header from "@/components/header"
import { Movie } from "@/interface/schema"
import { useRouter } from "next/navigation"
import CardMovie from "@/components/card-movie"
import { Toaster } from 'sonner'

export default function Home() {
  const [title, setTitle] = useState('')
  const router = useRouter()

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
      <div className="flex min-h-screen max-w-[1700px] m-auto flex-col py-6 px-4 lg:p-10 gap-12">
        <div className="flex flex-col px-3 gap-8">
          <Header
            title={title}
            changeSearch={changeSearch}
            submitSearch={submitSearch}
          />
          <div className="flex justify-start gap-4 text-grayth text-[15px] font-semibold">
            <button className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={() => router.push('/create-ranking')}>Create ranking</button>
            <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={getTopRanked}>Top movies</h3>

          </div>
        </div>

        <main className="w-full">
          {
            loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-xl xl:grid-cols-2xl gap-6 justify-items-center">
                {
                  movies.map((item: Movie) => (
                    <CardMovie item={item} />
                  ))
                }
              </div>
            )
          }
        </main>
      </div>
    </>
  )
}
