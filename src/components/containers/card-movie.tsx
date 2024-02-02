'use client'

import { UserAuth } from "@/context/auth-context";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import useLoginModal from "@/hooks/use-login-modal";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'sonner'
import useSavedMovies from "@/hooks/use-saved-movies";

interface CardMovieProps {
    item: Movie,
}

const CardMovie = ({ item }: CardMovieProps) => {

    const { user } = UserAuth()

    const { favorites, removeFromFavorites } = useSavedMovies()

    const loginModal = useLoginModal()

    const movieRef = doc(db, 'users', `${user?.email}`)

    const saveMovie = async () => {
        if (!user?.email) {
            loginModal.onOpen()
        } else {
            await updateDoc(movieRef, {
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
        <div className="w-[80%] 2xsm:w-full flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {item.img !== null && (
                <>
                    <div
                        className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${item.img}`}
                            alt={item.title}
                            width={300}
                            height={375}
                            onLoad={(e: any) => e.target.classList.remove("opacity-0")}
                            className="rounded-md opacity-0 transition-opacity duration-2000"
                            loading="lazy"
                        />

                        {
                            favorites && favorites.some((movie: any) => movie.id == item.id) ? (
                                <FaHeart
                                    onClick={() => removeFromFavorites(item.id)}
                                    className="text-red-800 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3" />
                            ) : (
                                <FaRegHeart
                                    onClick={saveMovie}
                                    className={`text-xl transition duration-200 cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-400}`}
                                />
                            )
                        }
                    </div>
                    <p className="leading-5 text-sm text-grayth">{item.title}</p>
                </>
            )}
        </div>
    );
}

export default CardMovie;