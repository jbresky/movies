'use client'

import Rankings from "@/components/rankings";
import Loader from "@/components/loader";
import SearchNav from "@/components/search-movies";
import { UserAuth } from "@/context/auth-context";
import useSavedMovies from "@/hooks/use-saved-movies";
import { redirect } from "next/navigation";

const RankingsPage = () => {
  const { user } = UserAuth()

  const { rankings, removeRanking, loadingMovies } = useSavedMovies()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <header className="sm:hidden">
        <SearchNav />
      </header>
      <div className="flex flex-col mt-2">
        {loadingMovies
          ? <Loader />
          : <Rankings
            rankings={rankings}
            removeRanking={removeRanking}
          />
        }
      </div>
    </>
  )
}

export default RankingsPage;