'use client'

import SelectedMovies from '@/components/create-ranking/selected-movies'
import CustomContainer from '@/components/containers/custom-container'
import Loader from '@/components/loader'
import useMovies from '@/hooks/use-movies'
import useCreate from '@/hooks/use-create'
import useSearch from '@/hooks/use-search'
import { UserAuth } from '@/context/auth-context'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import { ChangeEvent, FormEvent } from 'react'
import SearchM from '@/components/search-movies'

const CreateRanking = () => {

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

            <SelectedMovies {...createRankingProps} />

            <div className={`${selectedMovies.length == 0 && 'hidden'} grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 my-8`}>
                {
                    selectedMovies.map((item: Movie, index: number) => (
                        <CustomContainer
                            key={item.id}
                            classname='text-indigo-700 font-bold text-2xl xl:text-3xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3'
                            item={item}
                            index={index + 1}
                            isRank={true}
                            removeFromRanking={() => removeFromRanking(item.id)}
                        />
                    ))
                }
            </div>

            <main>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        movies.length > 1 ? (
                            <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4">
                                {movies.map((item: Movie) => (
                                    <div key={item.id}>
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

                        ) : (
                            <p className='px-2 text-neutral-300 text-sm'>Start creating a ranking by searching a movie</p>
                        )
                    )}
            </main>
        </>
    );
}

export default CreateRanking;