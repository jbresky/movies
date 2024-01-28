import { Toaster } from 'sonner'
import CardMovie from "@/components/containers/card-movie"
import MovieSkeleton from "@/components/containers/movie-skeleton"
import { getTitle, getTopMovies } from "@/services/movies"
import SearchM from "@/components/search-movies"

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

        {
          movies.length > 0
            ? (
              <div className='max-2xsm:flex flex-col items-center justify-center grid grid-cols-2 s:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 py-4 justify-items-center'>
                {movies.map((item: Movie) => (
                  !movies
                    ? (
                      <MovieSkeleton key={item.id} item={item} />
                    )
                    : (
                      <CardMovie
                        key={item.id}
                        item={item}
                      />
                    )
                ))}
              </div>
            ) : (
              <p className='pl-4 mt-4 text-neutral-300'>No matching movies found 😓</p>
            )
        }
      </main>
    </>
  )
}
