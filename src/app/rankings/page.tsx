'use client'

import Rankings from "@/components/account/rankings";
import Loader from "@/components/loader";
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
    <div className="sm:p-4 flex flex-col">
      { loadingMovies
        ? <Loader />
        : <Rankings
          rankings={rankings}
          removeRanking={removeRanking}
        />
      }
    </div>
  )
}

export default RankingsPage;