'use client'

import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { arrayUnion, updateDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Movie } from "@/interface/schema";

const CardMovie: React.FC<Movie> = ({id, title, poster_path}) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)

    const { user } = UserAuth()    

    const movieID = doc(db, 'users', `${user?.email}`)

    const saveMovie = async () => {
        if(user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedMovies: arrayUnion({
                    // id: item.id,
                    id: id,
                    // title: item.title,
                    title: title,
                    // img: item.poster_path
                    img: poster_path
                })
            })
        } else {
            alert('Please log in to save a movie')
        }
    }

    return ( 
        <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
        {poster_path && (
            <>
                <div className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={title}
                        width={300}
                        height={375}
                        onLoadingComplete={image => image.classList.remove("opacity-0")}
                        className="rounded-md opacity-0 transition-opacity duration-[2s]"
                    />
                    <FaRegHeart
                    onClick={saveMovie}
                    className={`${like ? `text-red-500` : `text-gray-600`} text-xl hover:text-gray-400 transition duration-200 cursor-pointer absolute top-3 right-3`} />
                </div>
                {/* <div className="flex justify-between p-1"> */}
                    <p className="leading-5 text-sm text-grayth">{title}</p>
                {/* </div> */}
            </>
        )
        }
    </div>
     );
}
 
export default CardMovie;