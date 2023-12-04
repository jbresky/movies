'use client'

import { Movie } from "@/interface/movie-interface";
import CustomContainer from "../containers/custom-container";
import AccountHeader from "./header";

interface FavoritesProps {
    favorites: Movie[]
    removeFromFavorites: (id: number) => void
}

const Favorites = ({ favorites, removeFromFavorites }: FavoritesProps) => {
    return (
        <section className="flex flex-col gap-6">
            <AccountHeader
                data={favorites}
                title="Favorites"
                paragraph="You don't have favorites yet"
            />
            <div className="flex whitespace-nowrap overflow-x-auto scroll-smooth md:grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4">
                {
                    favorites?.map((item: any) => (
                        <div className="" key={item.id}>
                            <CustomContainer
                                classname='text-red-700 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3'
                                removeFromFavorites={() => removeFromFavorites(item.id)}
                                item={item}
                                isRank={false}
                            />
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Favorites;