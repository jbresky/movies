import CardMovie from "./containers/card-movie";
import MovieSkeleton from "./containers/movie-skeleton";

const Movies = ({ movies }: { movies: Movie[] }) => {
    return (
        <>
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
        </>
    );
}

export default Movies;