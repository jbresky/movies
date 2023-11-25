'use client'

import CustomContainer from "@/components/custom-container";
import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Account = () => {
    const { user } = UserAuth()
    const [favorites, setFavorites] = useState([])
    const [ranking, setRanking] = useState<any>([])

    const router = useRouter()

    if (!user) {
        redirect('/')
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
            setFavorites(doc.data()?.savedMovies)
            const rankings = doc.data()?.ranking || []
            setRanking(rankings)
        })
    }, []);

    // const handleShare = async () => {
    //     try {
    //         const canvas = await html2canvas(componentRef?.current)
    //         const dataURL = canvas.toDataURL()

    //         const file = new File([dataURL], 'ranking_image.png', { type: 'image/png' })

    //         const shareableMsg = `This is my top ${ranking.length} movie ranking!`
    //         const shareData = {
    //             title: 'Movie Ranking',
    //             text: shareableMsg,
    //             files: [file]
    //         }

    //         await navigator.share(shareData)
    //         console.log('Shared successfully');

    //     } catch (error) {
    //         console.error('Error sharing: ', error)
    //     }
    // }

    const movieRef = doc(db, 'users', `${user?.email}`)

    const removeFromFavorites = async (movieId: string | number) => {
        try {
            const result = favorites.filter((item: any) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeRanking = async (index: number) => {
        try {
            await updateDoc(movieRef, {
                ranking: arrayRemove(ranking[index])
            })
            toast.success('Ranking deleted')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="sm:p-4 flex flex-col gap-5">
                {/* <div className="">
                    <h1 className="text-2xl md:text-3xl">Profile</h1>
                </div> */}

                <section className="flex flex-col gap-5 pb-6">
                    <div className="flex flex-col xsm:flex-row gap-2 justify-between xsm:items-end text-grayth text-[15px] font-semibold">
                        <div className="flex flex-col gap-2 items-start">
                            <h2 className="text-xl md:text-2xl">Rankings</h2>
                        </div>

                        {ranking?.length > 0 ? (
                            // <button
                            //     className='text-xl border-indigo-800 border-2 rounded-lg p-2 hover:text-black hover:bg-indigo-600 transition duration-500'>
                            //     Share ranking
                            // </button>
                            ''
                        ) : (
                            <button
                                onClick={() => router.push('/create-ranking')}
                                className="w-full xsm:w-fit sm:w-1/2 lg:w-1/4 border-indigo-900 border-2 rounded-lg py-2 px-4 hover:brightness-150">Create a ranking</button>
                        )}
                    </div>

                    {
                        ranking && ranking.map((rank: any, index: number) => (
                            <>
                            {/* {console.log(ranking.indexOf(rank))} */}
                                <div className="flex justify-between items-center">
                                    <h2 key={index} className="text-indigo-400 text-xl font-semibold">{rank.name}</h2>
                                    <button
                                        onClick={() => removeRanking((ranking.indexOf(rank)))}
                                        className="hover:opacity-90 text-grayth cursor-pointer border-none outline-none">Delete</button>
                                </div>
                                <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center sm:justify-items-start">
                                    {rank.movies && rank.movies.map((item: any) => (
                                        <div
                                            className="max-xl:w-[220px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                                            <CustomContainer
                                                item={item}
                                                isRank={true}
                                                classname="text-grayth/60 text-2xl transition duration-200 cursor-pointer absolute top-3 right-3"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ))
                    }
                </section>
                <section className="flex flex-col gap-6">
                    <h2 className="text-xl md:text-2xl text-grayth font-semibold">Favorites</h2>
                    {favorites?.length < 1 && (
                        <p className="text-grayth">You don&apos;t have any favorites yet</p>
                    )}
                    <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center sm:justify-items-start">
                        {
                            favorites?.map((item: any) => (
                                <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                                    <CustomContainer
                                        classname='text-red-700 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3'
                                        removeFromFavorites={() => removeFromFavorites(item.id)}
                                        item={item}
                                        isRank={false}
                                    />
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Account;