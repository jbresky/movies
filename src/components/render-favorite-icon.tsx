'use client'

import { FaHeart, FaRegHeart } from "react-icons/fa";
import useSavedMovies from "@/hooks/use-saved-movies";

const RenderFavoriteIcon = ({ item, isInModal }: { item: Movie, isInModal?: boolean }) => {

    const { favorites, removeFromFavorites, saveMovie } = useSavedMovies()

    const isFavorite = favorites && favorites.some((movie: Movie) => movie.id === item.id)

    const IconComponent = isFavorite ? FaHeart : FaRegHeart;

    return (
        <IconComponent
            onClick={() => isFavorite ? removeFromFavorites(item.id) : saveMovie(item)}
            className={`text-xl hover:opacity-80 transition duration-200 cursor-pointer ${isInModal ? 'inherit' : 'absolute'} top-3 right-3 ${isFavorite ? 'text-red-800' : 'text-gray-400 hover:text-gray-400'
                }`}
        />
    );
};

export default RenderFavoriteIcon