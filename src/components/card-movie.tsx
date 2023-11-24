'use client'

import { UserAuth } from "@/context/auth-context";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Movie } from "@/interface/movie-interface";
import { toast } from 'sonner'
import useLoginModal from "@/hooks/use-login-modal";

interface CardMovieProps {
    item: Movie,
    userFavorites: any
}

const CardMovie = ({ item, userFavorites }: CardMovieProps) => {

    const { user } = UserAuth()

    const loginModal = useLoginModal()

    const movieID = doc(db, 'users', `${user?.email}`)

    const saveMovie = async () => {
        if (!user?.email) {
            loginModal.onOpen()
        } else {
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

    const movieRef = doc(db, 'users', `${user?.email}`)

    const removeFromFavorites = async (movieId: string | number) => {
        try {
            const result = userFavorites.filter((item: any) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
            toast.message(`Removed from your favorites: ${item.title}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-sm:w-[150px] max-md:w-[250px] lg:w-[270px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
                <>
                    <div
                        className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                        <Image
                            src={item.img !== null ? `https://image.tmdb.org/t/p/original/${item.img}`:'/img/def.avif'}
                            alt={item.title}
                            width={300}
                            height={375}
                            onLoadingComplete={image => image.classList.remove("opacity-0")}
                            className="rounded-md opacity-0 transition-opacity duration-[2s]"
                        />
                        {
                            userFavorites && userFavorites.some((movie: any) => movie.id == item.id) ? (
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
        </div>
    );
}

export default CardMovie;