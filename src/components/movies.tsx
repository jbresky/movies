'use client'

import { Movie } from "@/interface/schema"
import CardMovie from "./card-movie"

const ListOfMovies = ({ movies }: { movies: any }) => {
    return (
        <div className="grid grid-cols-xl xl:grid-cols-2xl gap-4 justify-items-center">
            {
                movies.map(({ id, title, poster_path }: Movie) => (
                    <CardMovie
                        key={id}
                        id={id}
                        title={title}
                        poster_path={poster_path}
                    />
                ))
            }
        </div>
    )
}

const EmptyState = () => {
    return <p className="text-grayth px-3">No movies to show</p>
}

export default function Movies({ movies }: { movies: any }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <EmptyState />
    )
}
