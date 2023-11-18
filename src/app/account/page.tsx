'use client'

import CustomContainer from "@/components/custom-container";
import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import html2canvas from "html2canvas";
import { useEffect, useState, useRef } from "react";

const Account = () => {
    const componentRef = useRef<any>(null)
    const { user } = UserAuth()
    const [movies, setMovies] = useState([])
    const [ranking, setRanking] = useState<any>([])

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
            setMovies(doc.data()?.savedMovies)
            setRanking(doc.data()?.ranking)
        })
    }, [user?.email]);

    const handleShare = async () => {
        try {
            const canvas = await html2canvas(componentRef?.current)
            const dataURL = canvas.toDataURL()

            const file = new File([dataURL], 'ranking_image.png', { type: 'image/png' })

            const shareableMsg = `This is my top ${ranking.length} movie ranking!`
            const shareData = {
                title: 'Movie Ranking',
                text: shareableMsg,
                files: [file]
            }

            await navigator.share(shareData)
            console.log('Shared successfully');

        } catch (error) {
            console.error('Error sharing: ', error)
        }
    }

    return (
        <>
            <div className="p-10">
                <div className="pb-6">
                    <h1 className="text-3xl">Profile</h1>
                </div>

                <section className="flex flex-col gap-6 pb-6">
                    <div className="flex justify-between gap-10 text-grayth text-[15px] font-semibold">
                        <h2 className="text-2xl">My Rankings</h2>
                        <button
                            onClick={handleShare}
                            className='text-xl border-indigo-800 border-2 rounded-lg p-2 hover:text-black hover:bg-indigo-600 transition duration-500'>
                            Share ranking
                        </button>
                    </div>
                    <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-start">
                        {
                            ranking[0]?.selectedMovies.map((item: any) => (
                                <div
                                    className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                                    <CustomContainer
                                        ref={componentRef}
                                        item={item}
                                        isRank={true}
                                        classname="text-grayth/60 text-2xl transition duration-200 cursor-pointer absolute top-3 right-3"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl pb-2">Favorites</h2>
                    {movies.length === 0 && (
                        <p className="text-grayth">You don&apos;t have any favorites yet</p>
                    )}
                    <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
                        {
                            movies?.map((item: any) => (
                                <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                                    <CustomContainer
                                        classname="bg-red-600 text-xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3"
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