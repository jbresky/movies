'use client'

import CardMovie from "./card-movie"

interface IMovies {
    movies: any,
} 

const ListOfMovies = ({ movies }: IMovies) => {
    return (
        <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
            {
                movies.map((item: any ) => (
                    <CardMovie
                        item={item}
                    />
                ))
            }
        </div>
    )
}

const EmptyState = () => {
    return <p className="text-grayth px-3">No movies to show</p>
}

export default function Movies({ movies, onClick }: any) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <EmptyState />
    )
}
