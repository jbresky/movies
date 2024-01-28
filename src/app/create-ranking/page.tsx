'use client'

import SelectedMovies from '@/app/create-ranking/components/selected-movies'
import CustomContainer from '@/components/containers/custom-container'
import Loader from '@/components/loader'
import useMovies from '@/hooks/use-movies'
import useCreate from '@/hooks/use-create'
import useSearch from '@/hooks/use-search'
import { UserAuth } from '@/context/auth-context'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import { ChangeEvent, FormEvent, useState } from 'react'
import SearchM from '@/components/search-movies'

const CreateRanking = () => {
    const [movieSearched, setMovieSearched] = useState('')
    
    const { title, setTitle } = useSearch()

    const { movies, getOneMovie, loading } = useMovies()
    
    const { user } = UserAuth()

    if (!user) {
        redirect('/')
    }

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const submitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getOneMovie({ title })
        setMovieSearched(title)
    }

    const createRankingProps = useCreate()

    const { selectedMovies, addToRanking, removeFromRanking } = createRankingProps

    return (
        <>
            <Toaster />
            <SearchM
                title={title}
                changeSearch={changeSearch}
                submitSearch={submitSearch}
                showBox={true}
                isClient={true}
            />

            {movies.length < 1 && selectedMovies.length < 1 && !movieSearched && <p className='px-2 text-sm tracking-wide mt-4'>Put those movies into a ranking❗</p>}

            {selectedMovies.length > 1 && <SelectedMovies {...createRankingProps} />}

            {selectedMovies.length >= 1 && (
                <div className='flex flex-col items-center 2xsm:grid grid-cols-2 s:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 my-4'>
                    {
                        selectedMovies.map((item: Movie, index: number) => (
                            <CustomContainer
                                key={item.id}
                                classname='text-indigo-700 font-bold text-2xl xl:text-3xl p-4 border-[1px] flex items-center rounded-full w-[50px] h-[50px] justify-center bg-indigo-400/30 border-transparent hover:opacity-60 transition duration-200 cursor-pointer absolute top-3 right-3'
                                item={item}
                                index={index + 1}
                                isRank={true}
                                removeFromRanking={() => removeFromRanking(item.id)}
                            />
                        ))
                    }
                </div>
            )}

            <main className='py-2'>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <section className='mt-2'>
                            {movies.length > 1 && movieSearched && <p className='mb-2'> Results for: <span className='text-indigo-400 font-semibold font-sans pl-1'>{movieSearched}</span></p>}
                            {movies.length < 1 && movieSearched && <p>Couldn&apos;t find any movie with name: <span className='text-grayth font-semibold font-sans pl-1'>{movieSearched}</span></p>}
                            <div className="flex flex-col 2xsm:grid grid-cols-2 s:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

                                {movies.map((item: Movie) => (
                                    <div key={item.id} className="flex flex-col items-center">
                                        {item.img && (
                                            <CustomContainer
                                                item={item}
                                                isRank={null}
                                                addToRanking={() => addToRanking({ item })}
                                            />
                                        )
                                        }
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
            </main>
        </>
    );
}

export default CreateRanking;