'use client'

import { Movie } from "@/interface/movie-interface";
import Image from "next/image";
import { FaMedal, FaHeart } from "react-icons/fa";

interface ICustomContainer {
    item: Movie,
    classname?: string,
    isRank?: boolean | null,
    removeFromFavorites?: () => void,
    addToRanking?: () => void,
    removeFromRanking?: () => void,
    ref?: any
}

const CustomContainer = ({ item, classname, isRank, removeFromFavorites, addToRanking, ref, removeFromRanking }: ICustomContainer) => {
    return (
        <>
        <div className="w-[170px] md:w-[200px] lg:w-[250px] xl:w-[300px] flex flex-col gap-2 rounded-md">
            <div
                ref={ref}
                onClick={addToRanking}
                className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${item.img}`}
                    alt={item.title}
                    width={300}
                    height={375}
                    onLoad={(e: any) => e.target.classList.remove("opacity-0")}
                    className="rounded-md opacity-0 transition-opacity duration-[2s]"
                />
                {
                    isRank !== null && (
                        isRank ? (
                            <FaMedal
                                onClick={removeFromRanking}
                                className={classname}
                            />
                        )
                        : (
                            <FaHeart
                                onClick={removeFromFavorites}
                                className={classname}
                            />
                        )
                    )
                }
            </div>
            <p className="leading-5 text-grayth text-sm">{item.title}</p>
            </div>
        </>
    )
}

export default CustomContainer;