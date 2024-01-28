'use client'

import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface ICustomContainer {
    item: Movie,
    classname?: string,
    isRank?: boolean | null,
    removeFromFavorites?: () => void,
    addToRanking?: () => void,
    removeFromRanking?: () => void,
    ref?: any,
    index?: number,
    isScrollable?: boolean
}

const CustomContainer = ({ item, classname, isRank, removeFromFavorites, addToRanking, ref, removeFromRanking, index, isScrollable }: ICustomContainer) => {
    return (
        <>
            <div className={`flex flex-col gap-3 ${isScrollable ? 'w-[170px]' : 'w-full'} w-[170px] sm:w-full rounded-md overflow-hidden whitespace-nowrap`}>
                <div
                    ref={ref}
                    onClick={addToRanking}
                    className="relative border-[1px] w-full hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${item.img}`}
                        alt={item.title}
                        width={300}
                        height={375}
                        onLoad={(e: any) => e.target.classList.remove("opacity-0")}
                        className="rounded-md opacity-0 transition-opacity overflow-hidden duration-2000"
                    />
                    {
                        isRank !== null && (
                            isRank ? (
                                <p onClick={removeFromRanking} className={classname}>{index}</p>
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
                <p className="leading-5 font-medium text-sm">{item.title}</p>
            </div>
        </>
    )
}

export default CustomContainer;