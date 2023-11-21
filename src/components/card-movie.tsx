'use client'

import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { arrayUnion, updateDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Movie } from "@/interface/movie-interface";
import { toast } from 'sonner'
import useLoginModal from "@/hooks/use-login-modal";

const CardMovie = ({ item }: { item: Movie }) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)

    const { user } = UserAuth()

    const loginModal = useLoginModal()

    const movieID = doc(db, 'users', `${user?.email}`)

    const saveMovie = async () => {
        if (!user?.email) {
            loginModal.onOpen()
        } else {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedMovies: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.img
                })
            }).then(() => {
                toast.message(`Added to your favorites: ${item.title}`)
            })
        }
    }

    return (
        <div className="max-sm:w-[150px] max-md:w-[250px] lg:w-[270px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap">

            {item.img && (
                <>
                    {/* <Link href={`/?movie=${item.id}`} as={item.id}> */}
                    <div
                        className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${item.img}`}
                            alt={item.title}
                            width={300}
                            height={375}
                            onLoadingComplete={image => image.classList.remove("opacity-0")}
                            className="rounded-md opacity-0 transition-opacity duration-[2s]"
                        />
                        {
                            like ? (
                                <FaHeart
                                    // onClick={saveMovie}
                                    className="text-red-800 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3" />
                            ) : (
                                <FaRegHeart
                                    onClick={saveMovie}
                                    className="text-gray-600 text-xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3"
                                />
                            )
                        }
                    </div>
                    {/* </Link> */}
                    <p className="leading-5 text-sm text-grayth">{item.title}</p>
                </>
            )
            }
        </div>
    );
}

export default CardMovie;