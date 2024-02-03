import { Toaster } from 'sonner'
import { getTitle, getTopMovies } from "@/services/movies"
import SearchM from "@/components/search-movies"
import Movies from '@/components/movies'

export default async function Home({ searchParams }: { searchParams: { title: string } }) {

  const getData = async () => {
    let data
    if (searchParams.title) {
      data = await getTitle(searchParams.title)
    } else {
      data = await getTopMovies()
    }

    return data
  }

  const movies = await getData()

  return (
    <>
      <Toaster />

      <main className="w-full min-h-screen">

        <div className='flex justify-between flex-col py-2'>
          <SearchM showBox={true} />
          {!searchParams.title ? <h1 className="text-xl font-medium font-sans">Top movies</h1> : null}
        </div>

        <Movies movies={movies} />
      </main>
    </>
  )
}
