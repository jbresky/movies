'use client'
import { Movie } from "@/interface/schema";
import Image from "next/image";
import { FaMedal } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

interface ICustomContainer {
    item: Movie,
    classname?: string,
    isRank?: boolean | null,
    saveMovie?: () => void,
    addToRanking?: () => void,
    ref?: any
}

const CustomContainer = ({ item, classname, isRank, saveMovie, addToRanking, ref }: ICustomContainer) => {
    return (
        <>
            <div
                ref={ref}
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
                    isRank !== null && (
                        isRank ? (
                            <FaMedal
                                onClick={addToRanking}
                                className={classname}
                            />
                        )
                        : (
                            <FaRegHeart
                                onClick={saveMovie}
                                className={classname}
                            />
                        )
                    )
                }
            </div>
            <p className="leading-5 text-sm text-grayth">{item.title}</p>
        </>
    )
}

export default CustomContainer;