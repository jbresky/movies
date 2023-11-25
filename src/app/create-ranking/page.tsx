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
import { toast, Toaster } from 'sonner'
import { BeatLoader } from 'react-spinners'

const CreateRanking = () => {
    const [title, setTitle] = useState('')
    const [selectedMovies, setSelectedMovies] = useState<any>([])
    const [nameOfRanking, setNameOfRanking] = useState('')
    const [rankingReady, setRankingReady] = useState(false)
    const [load, setLoad] = useState(false)

    const router = useRouter()

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

    const submitNameOfRanking = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setRankingReady(true)
    }

    const addToRanking = ({ item }: { item: Movie }) => {
        const isSelected = selectedMovies.some((movie: any) => movie.id == item.id)

        if (selectedMovies.length === 10) {
            toast.message('10 movies are the maximum')
            return
        }

        if (!isSelected) {
            setSelectedMovies(() => [...selectedMovies, item])
        } else {
            toast.message('Movie already selected')
            return
        }
    }

    const removeFromRanking = (movieId: any) => {
        const updatedMovies = selectedMovies.filter((movie: any) => movie.id != movieId)
        setSelectedMovies(updatedMovies)
    }

    const userID = doc(db, 'users', `${user?.email}`)

    const saveRanking = async () => {
        try {
            setLoad(true)
            await updateDoc(userID, {
                ranking: arrayUnion({
                    name: nameOfRanking,
                    movies: selectedMovies
                })
            })
            router.push('/account')
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false)
        }
    }

    return (
        <>
            <Toaster />
            <Search
                title={title}
                changeSearch={changeSearch}
                submitSearch={submitSearch}
                hidden={true}
            />
            <div className="flex flex-col py-4 sm:px-5">
                <div className="flex flex-col xsm:flex-row justify-between xsm:items-center text-grayth text-[15px] font-semibold mb-4">
                    <div className='flex flex-col'>
                        <h1 className='text-lg sm:text-2xl'>
                            {selectedMovies.length > 0 && "Ranking: "}
                            {rankingReady && nameOfRanking}
                        </h1>
                        {selectedMovies.length < 3 && (
                            <p>A ranking must contain at least 3 movies</p>
                        )}
                    </div>
                    {selectedMovies.length >= 3 && rankingReady ? (
                        <button
                            onClick={saveRanking}
                            className='w-full xsm:w-[200px] text-md sm:text-xl mt-2 border-indigo-900 border-2 rounded-lg px-5 py-2 hover:brightness-150 transition duration-500'>
                            {load ? (
                                    <BeatLoader color='white' />
                            ) : 'Create ranking'}
                        </button>
                    ) : null}
                    {selectedMovies.length >= 3 && !rankingReady ? (
                        <div>
                            <form onSubmit={submitNameOfRanking} className="flex flex-col gap-2">
                                <label htmlFor='name'>Give your ranking a name:</label>
                                <input
                                    id='name'
                                    onChange={e => setNameOfRanking(e.target.value)}
                                    value={nameOfRanking}
                                    placeholder='My top 3...'
                                    className="text-sm font-normal bg-transparent border-2 p-2 rounded-lg border-indigo-900 outline-none focus:brightness-150" />
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>

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