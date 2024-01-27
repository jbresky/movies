'use client'

import Rankings from "@/components/account/rankings";
import { UserAuth } from "@/context/auth-context";
import useSavedMovies from "@/hooks/use-saved-movies";
import { redirect } from "next/navigation";

const RankingsPage = () => {
    const { user } = UserAuth()

    const { rankings, removeRanking } = useSavedMovies()
  
    if (!user) {
      redirect('/')
    }
    return ( 
        <Rankings
            rankings={rankings}
            removeRanking={removeRanking}
        />
     )
}
 
export default RankingsPage;