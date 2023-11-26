'use client'

import Rankings from "@/components/account/rankings";
import Favorites from "@/components/account/favorites";
import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

const Account = () => {
    const { user } = UserAuth()

    const { favorites, ranking, removeFromFavorites, removeRanking } = useSavedMovies()

    if (!user) {
        redirect('/')
    }

    return (
        <>
            <div className="sm:p-4 flex flex-col gap-5">
              <Rankings
                ranking={ranking}
                removeRanking={removeRanking}
              />
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            </div>
        </>
    );
}

export default Account;