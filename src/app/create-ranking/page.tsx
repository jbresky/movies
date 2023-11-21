'use client'

import useMovies from '@/hooks/use-movies'
import { ChangeEvent, FormEvent, useState } from 'react'
import Loader from '@/components/loader'
import Search from "@/components/search-movies"
import { Movie } from "@/interface/movie-interface"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { UserAuth } from '@/context/auth-context'
import CustomContainer from '@/components/custom-container'
import { redirect, useRouter } from 'next/navigation'

const CreateRanking = () => {
    const [title, setTitle] = useState('')
    const [selectedMovies, setSelectedMovies] = useState<any>([])
    const router = useRouter()

    const { movies, getOneMovie, loading } = useMovies({ title })

    const { user } = UserAuth()

    if(!user){
        redirect('/')
    }

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

    const removeFromRanking = (movieId: any) => {
        const updatedMovies = selectedMovies.filter((movie: any) => movie.id != movieId)
        setSelectedMovies(updatedMovies)
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
        router.push('/account')
    }

    return (
        <>
            <Search
                title={title}
                changeSearch={changeSearch}
                submitSearch={submitSearch}
                hidden={true}
            />
            <div className="flex flex-col py-4 px-10">
                <div className="flex justify-between text-grayth text-[15px] font-semibold mb-4">
                    <div className='flex flex-col'>
                        <h1 className='text-2xl'>
                            {selectedMovies.length > 0 && "Ranking: Top "}
                            {selectedMovies.length || ''}
                        </h1>
                        {selectedMovies.length < 3 && (
                            <p>A ranking must contain at least 3 movies</p>
                        )}
                    </div>
                    {selectedMovies.length >= 3 && (
                        <button
                            onClick={saveRanking}
                            className='text-xl border-indigo-900 border-2 rounded-lg px-5 py-2 hover:brightness-150 transition duration-500'>
                            Create ranking
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center mb-12">
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