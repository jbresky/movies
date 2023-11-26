'use client'

import SelectedMovies from '@/components/create-ranking/selected-movies'
import Search from "@/components/search-movies"
import CustomContainer from '@/components/custom-container'
import Loader from '@/components/loader'
import useMovies from '@/hooks/use-movies'
import useCreate from '@/hooks/use-create'
import { UserAuth } from '@/context/auth-context'
import { Movie } from "@/interface/movie-interface"
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import useSearch from '@/hooks/use-search'
import { ChangeEvent, FormEvent } from 'react'

const CreateRanking = () => {

    const { title, setTitle } = useSearch()
    
    const { movies, getOneMovie, loading } = useMovies({ title })

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

            <div className={`${selectedMovies.length == 0 && 'hidden'} grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center mb-12`}>
                {
                    selectedMovies.map((item: Movie) => (
                        <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                            <CustomContainer
                                classname='text-indigo-900 text-2xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3'
                                item={item}
                                isRank={true}
                                removeFromRanking={() => removeFromRanking(item.id)}
                            />
                        </div>
                    ))
                }
            </div>

            <main>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
                            {
                                movies.map((item: Movie) => (
                                    <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
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