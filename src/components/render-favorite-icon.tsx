'use client'

import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
    isFavorite: boolean,
    removeFromFavorites: (id: string) => void,
    item: Movie,
    saveMovie: (item: Movie) => void
}

const RenderFavoriteIcon = ({ isFavorite, removeFromFavorites, item, saveMovie }: Props) => {
    const IconComponent = isFavorite ? FaHeart : FaRegHeart;

    return (
        <IconComponent
            onClick={() => isFavorite ? removeFromFavorites(item.id) : saveMovie(item)}
            className={`text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3 ${isFavorite ? 'text-red-800' : 'text-gray-400 hover:text-gray-400'
                }`}
        />
    );
};

export default RenderFavoriteIcon