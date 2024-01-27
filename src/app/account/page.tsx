'use client'

import useSavedMovies from "@/hooks/use-saved-movies";
import { UserAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { FaRegFolder } from "react-icons/fa";
import Loader from "@/components/loader";
import Search from "@/components/search-movies";
import Link from "next/link";

const NewFeature = () => {
  return (
    <div className="py-1 px-3 rounded-full bg-purple/70 text-white text-sm">
      New
    </div>
  )
}

const Account = () => {
  const { user } = UserAuth()

  const { favorites, rankings, removeFromFavorites, removeRanking, loadingMovies } = useSavedMovies()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <header className="sm:hidden">
        <Search />
      </header>
      <div className="sm:p-4 flex flex-col">
        {loadingMovies ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col gap-1 mb-8">
              <h1 className="text-2xl">Hello, {user ? user.displayName.split(' ')[0] : ''} 👋</h1>

              <p className="text-grayth text-sm">{user.email}</p>
            </div>

            <h1 className="text-lg mb-4">My movies</h1>
            <section className="flex max-sm:flex-col justify-center m-auto items-center gap-2 w-full font-sans font-medium text-slate-300">
              
              <Link href='/rankings' className="rounded-lg w-full bg-[#07121f] py-6 px-4 hover:bg-[#091829] transition duration-200 ease-in">
                <div className="flex items-center justify-between">
                  <h2>Rankings</h2>
                  {rankings.length} saved
                  {/* <FaRegFolder /> */}
                </div>
              </Link>

              <Link href='/favorites' className="rounded-lg w-full bg-[#07121f] py-6 px-4 hover:bg-[#091829] transition duration-200 ease-in">
                <div className="flex items-center justify-between">
                  <h2>Favorites</h2>
                  {favorites.length ? <p>{favorites.length} saved</p> : <FaRegFolder />}
                </div>
              </Link>

              <Link href='/saved' className="rounded-lg w-full bg-[#07121f] py-6 px-4 hover:bg-[#091829] transition duration-200 ease-in">
                <div className="flex items-center justify-between relative">
                  <div className="absolute right-5 bottom-8">
                    <NewFeature />
                  </div>
                  <h2>Folders</h2>
                  <FaRegFolder />
                </div>
              </Link>

            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Account;