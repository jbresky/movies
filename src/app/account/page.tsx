'use client'

import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Search from "@/components/search-movies";
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
        <Search />
      </header>

      <div className="sm:p-4 flex flex-col">
        <Greeting user={user} />
        {loadingMovies
          ? <Dashboard rankings={rankings} favorites={favorites} />
          : <Loader />
        }
      </div>
    </>
  );
}

export default Account;