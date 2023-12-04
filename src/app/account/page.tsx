'use client'

import Rankings from "@/components/account/rankings";
import Favorites from "@/components/account/favorites";
import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Loader from "@/components/loader";
import Search from "@/components/search-movies";

const Account = () => {
  const { user } = UserAuth()

  const { favorites, rankings, removeFromFavorites, removeRanking, loadingMovies } = useSavedMovies()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <header className="sm:hidden">
        <Search formHidden={true} hidden={true} />
      </header>
      <div className="sm:p-4 flex flex-col gap-6">
        {loadingMovies ? (
          <Loader />
        ) : (
          <>
            <Rankings
              rankings={rankings}
              removeRanking={removeRanking}
            />
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Account;