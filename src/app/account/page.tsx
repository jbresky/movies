'use client'

import Rankings from "@/components/account/rankings";
import Favorites from "@/components/account/favorites";
import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Loader from "@/components/loader";
import Link from "next/link";

const Account = () => {
  const { user } = UserAuth()

  const { favorites, ranking, removeFromFavorites, removeRanking, loading } = useSavedMovies()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <header className="sm:hidden mb-2">
        <Link href='/' className='text-xl font-bold font-mono'>
          M
        </Link>
      </header>
      <div className="sm:p-4 flex flex-col gap-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Rankings
              ranking={ranking}
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