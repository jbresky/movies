'use client'

import { Movie } from "@/interface/movie-interface";
import CustomContainer from "../custom-container";
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
            <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center sm:justify-items-start">
                {
                    favorites?.map((item: any) => (
                        <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={item.id}>
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