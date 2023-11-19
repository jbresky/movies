'use client'

import useMovies from '@/hooks/use-movies'
import { ChangeEvent, FormEvent, useState } from 'react'
import Loader from '@/components/loader'
import Header from "@/components/header"
import { Movie } from "@/interface/movie-interface"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { UserAuth } from '@/context/auth-context'
import CustomContainer from '@/components/custom-container'

const CreateRanking = () => {
    const [title, setTitle] = useState('')
    const [selectedMovies, setSelectedMovies] = useState<any>([])

    const { movies, getOneMovie, loading } = useMovies({ title })

    const { user } = UserAuth()

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const submitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getOneMovie({ title })
    }

    const addToRanking = ({ item }: { item: Movie }) => {
        const isSelected = selectedMovies.some((movie: any) => movie.id == item.id)

        if (selectedMovies.length === 10) {
            return alert('Top 10 is the maximum')
        }

        if (!isSelected) {
            setSelectedMovies(() => [...selectedMovies, item])
        } else {
            alert('Movie already selected')
        }
    }

    const userID = doc(db, 'users', `${user?.email}`)

    const saveRanking = async () => {
        if (user?.email) {
            await updateDoc(userID, {
                ranking: arrayUnion({
                    selectedMovies
                })
            })
        }
    }

    return (
        <div className="flex min-h-screen max-w-[1700px] m-auto flex-col py-6 px-4 lg:p-10 gap-10">
            <div className="flex flex-col px-3 gap-8">
                <Header
                    title={title}
                    changeSearch={changeSearch}
                    submitSearch={submitSearch}
                />
                <div className="flex justify-between gap-10 text-grayth text-[15px] font-semibold">
                    <div className='flex flex-col'>
                        <h1 className='text-[32px]'>Ranking: Top {selectedMovies.length || ''}</h1>
                        {selectedMovies.length < 3 && (
                            <p>A ranking must contain at least 3 movies</p>
                        )}
                    </div>
                    {selectedMovies.length >= 3 && (
                        <button
                            onClick={saveRanking}
                            className='text-xl border-indigo-800 border-2 rounded-lg px-5 hover:text-black hover:bg-indigo-600 transition duration-500'>Create ranking</button>
                    )}
                </div>
            </div>

            {/* selected movies container */}
            <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
                {
                    selectedMovies.map((item: Movie) => (
                        <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                            <CustomContainer
                                classname='text-indigo-900 text-2xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3'
                                item={item}
                                isRank={true}
                            />
                        </div>
                    ))
                }
            </div>
            {/* selected movies container */}

            <main className="w-full">
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
        </div>
    );
}

export default CreateRanking;