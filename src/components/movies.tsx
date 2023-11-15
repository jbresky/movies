'use client'

import Image from "next/image"

const ListOfMovies = ({ movies }: { movies: any }) => {
    return (
        movies.map((movie: any) => (
            <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2" key={movie.id}>
                <Image
                    className="rounded-sm object-contain"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    width={300}
                    height={300}
                />
                <p className="leading-5 text-sm text-[#929aa5]">{movie.title}</p>
            </div>
        ))
    )
}

const EmptyState = () => {
    return <p>No movies to show</p>
}

export default function Movies({ movies }: { movies: any }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <EmptyState />
    )
}
