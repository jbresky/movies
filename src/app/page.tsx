
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
      <SearchM showBox={true} />

      <main className="w-full min-h-screen">

        {!searchParams.title ? <h1 className="sm:px-4 text-xl text-grayth">Top movies</h1> : null}

        {
          movies.length > 0
            ? (
              <div className='grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mt-8 justify-items-center'>
                {movies.map((item: Movie) => (
                  !movies ? (
                    <MovieSkeleton item={item} />
                  ) : (
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
