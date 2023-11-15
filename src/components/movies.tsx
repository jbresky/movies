'use client'

import Image from "next/image"

const ListOfMovies = ({ movies }: { movies: any }) => {
    return (
        movies.map((movie: any) => (
            <div className="max-xl:w-[250px] xl:w-[300px] flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap" key={movie.id}>
                {movie.poster_path && (
                    <>
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={375}
                            onLoadingComplete={image => image.classList.remove("opacity-0")}
                            className="rounded-md opacity-0 transition-opacity duration-[2s]"
                        />
                        <p className="leading-5 text-sm text-grayth">{movie.title}</p>
                    </>
                ) 
                }
            </div>
        ))
    )
}

const EmptyState = () => {
    return <p className="text-grayth">No movies to show</p>
}

export default function Movies({ movies }: { movies: any }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <EmptyState />
    )
}
