'use client'

import Loader from '@/components/loader'
import useMovies from '@/hooks/use-movies'
import useCreate from '@/hooks/use-create'
import { UserAuth } from '@/context/auth-context'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import SearchM from '@/components/search-movies'
import Selected from './components/selected'
import MovieResults from './components/movie-results'

const CreateRanking = () => {

    const { user } = UserAuth()
    
    if (!user) {
        redirect('/')
    }
    
    const { loading, title, submitSearch, movies, changeSearch, movieSearched } = useMovies()

    const createRankingProps = useCreate()
    const { selectedMovies, addToRanking, removeFromRanking } = createRankingProps

    return (
        <>
            <Toaster />
            <SearchM
                title={title}
                changeSearch={changeSearch}
                submitSearch={submitSearch}
                showBox={true}
                isClient={true}
            />

            <Selected
                movies={movies}
                removeFromRanking={removeFromRanking}
                selectedMovies={selectedMovies}
                createRankingProps={createRankingProps}
                movieSearched={movieSearched} />

            <main className='py-2'>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <MovieResults
                            movies={movies}
                            movieSearched={movieSearched}
                            addToRanking={addToRanking}
                        />
                    )}
            </main>
        </>
    );
}

export default CreateRanking;