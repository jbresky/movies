'use client'

import SelectedMovies from '@/components/create-ranking/selected-movies'
import Search from "@/components/search-movies"
import CustomContainer from '@/components/containers/custom-container'
import Loader from '@/components/loader'
import useMovies from '@/hooks/use-movies'
import useCreate from '@/hooks/use-create'
import useSearch from '@/hooks/use-search'
import { UserAuth } from '@/context/auth-context'
import { Movie } from "@/interface/movie-interface"
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import { ChangeEvent, FormEvent } from 'react'

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
            <Search
                title={title}
                changeSearch={changeSearch}
                submitSearch={submitSearch}
                hidden={true}
            />

            <SelectedMovies {...createRankingProps}/>

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
                        <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mt-8">
                            {
                                movies.map((item: Movie) => (
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
                                ))
                            }
                        </div>
                    )
                }
            </main>
        </>
    );
}

export default CreateRanking;