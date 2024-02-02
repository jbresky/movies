'use client'

import Favorites from "@/components/favorites"
import Loader from "@/components/loader"
import SearchM from "@/components/search-movies"
import { UserAuth } from "@/context/auth-context"
import useSavedMovies from "@/hooks/use-saved-movies"
import { redirect } from "next/navigation"
import { Toaster } from "sonner"

const FavoritesPage = () => {
    const { user } = UserAuth()

    const { favorites, removeFromFavorites, loadingMovies } = useSavedMovies()

    if (!user) {
        redirect('/')
    }

    return (
        <>
            <Toaster />
            <div className="flex flex-col">
                <header className="sm:hidden">
                    <SearchM />
                </header>
                {loadingMovies
                    ? <Loader />
                    : <Favorites
                        favorites={favorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                }
            </div>
        </>
    )
}

export default FavoritesPage