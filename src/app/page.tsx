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

        <div className='flex justify-between flex-col xl:px-10 py-2'>
          <SearchM showBox={true} />
          {!searchParams.title ? <h1 className="text-xl font-medium text-grayth">Top movies</h1> : null}
        </div>

        {
          movies.length > 0
            ? (
              <div className='grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 py-4 justify-items-center'>
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
