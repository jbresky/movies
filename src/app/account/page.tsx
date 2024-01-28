'use client'

import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import SearchNav from "@/components/search-movies";
import Greeting from "./components/greeting";
import Dashboard from "./components/dashboard";
import Loader from "@/components/loader";

const Account = () => {
  const { user } = UserAuth()

  const { favorites, rankings, loadingMovies } = useSavedMovies()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <header className="sm:hidden">
        <SearchNav />
      </header>

      <div className="flex flex-col">
        <Greeting user={user} />
        {loadingMovies
          ? <Loader /> 
          : <Dashboard rankings={rankings} favorites={favorites} />
        }
      </div>
    </>
  );
}

export default Account;