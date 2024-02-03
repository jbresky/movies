'use client'

import Image from "next/image";
import useSavedMovies from "@/hooks/use-saved-movies";
import React from "react";
import RenderFavoriteIcon from "../render-favorite-icon";

const CardMovie = ({ item }: { item: Movie }) => {

    const { favorites, removeFromFavorites, saveMovie } = useSavedMovies()

    const isFavorite = favorites && favorites.some((movie: Movie) => movie.id === item.id)

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
                            className="rounded-md"
                            loading="lazy"
                        />

                        <RenderFavoriteIcon
                            isFavorite={isFavorite} item={item} removeFromFavorites={removeFromFavorites} saveMovie={saveMovie} />
                    </div>
                    <p className="leading-5 text-sm text-grayth">{item.title}</p>
                </>
            )}
        </div>
    );
}

export default CardMovie