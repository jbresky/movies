import { Toaster } from 'sonner'
import { getTitle, getTopMovies } from "@/services/movies"
import SearchM from "@/components/search-movies"
import Movies from '@/components/containers/movies'
import MovieModal from '@/components/containers/movie-modal'

interface HomePageProps {
  searchParams: Record<string, string> | null | undefined
}

export default async function Home(props: HomePageProps) {
  const showModal = props.searchParams?.modal === 'true'
  const movieId = props.searchParams?.id

  const getData = async () => {
    let data
    if (props.searchParams?.title) {
      data = await getTitle(props.searchParams.title)
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
          {!props.searchParams?.title ? <h1 className="text-xl font-medium font-sans">Top movies</h1> : null}
        </div>

        <Movies movies={movies} />

        {showModal && (
          // @ts-expect-error
          <MovieModal id={movieId} />
        )}

      </main>
    </>
  )
}
