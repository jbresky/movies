'use client'

import CustomContainer from "@/components/custom-container";
import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import html2canvas from "html2canvas";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const Account = () => {
    const componentRef = useRef<any>(null)
    const { user } = UserAuth()
    const [movies, setMovies] = useState([])
    const [ranking, setRanking] = useState<any>([])
    const router = useRouter()

    if(!user){
        redirect('/')
    }

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
            <div className="sm:p-10 flex flex-col gap-5">
                <div className="">
                    <h1 className="text-2xl md:text-3xl">Profile</h1>
                </div>

                <section className="flex flex-col gap-10 pb-6">
                    <div className="flex flex-col xsm:flex-row gap-2 justify-between xsm:items-center text-grayth text-[15px] font-semibold">
                        <h2 className="text-xl md:text-2xl">My Rankings</h2>

                        {ranking?.length > 0 ? (
                            <button
                                onClick={handleShare}
                                className='text-xl border-indigo-800 border-2 rounded-lg p-2 hover:text-black hover:bg-indigo-600 transition duration-500'>
                                Share ranking
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push('/create-ranking')}
                                className="w-full xsm:w-fit sm:w-1/2 md:w-1/4 border-indigo-900 border-2 rounded-lg py-2 px-4 hover:brightness-150">Create your first ranking</button>
                        )}
                    </div>
                    <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-start">
                        {
                            ranking && ranking[0]?.selectedMovies.map((item: any) => (
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
                <section className="flex flex-col gap-6">
                    <h2 className="text-xl md:text-2xl text-grayth font-semibold">Favorites</h2>
                    {movies && movies.length === 0 && (
                        <p className="text-grayth">You don&apos;t have any favorites yet</p>
                    )}
                    <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-start">
                        {
                            movies?.map((item: any) => (
                                <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
                                    <CustomContainer
                                        classname='text-red-700 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3'
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