import CustomContainer from "@/components/containers/custom-container";

interface IMovieResults {
    movies: Movie[],
    movieSearched: string,
    addToRanking: (item: Movie) => void
}

const MovieResults = ({ movies, movieSearched, addToRanking }: IMovieResults) => {
    return (
        <section className='mt-2 overflow-hidden'>
            {movies.length > 1 && movieSearched && <p className='mb-2'> Results for: <span className='text-indigo-400 font-semibold font-sans pl-1'>{movieSearched}</span></p>}
            {movies.length < 1 && movieSearched && <p>Couldn&apos;t find any movie with name: <span className='text-grayth font-semibold font-sans pl-1'>{movieSearched}</span></p>}
            <div className="flex flex-col 2xsm:grid grid-cols-2 xsm:grid-cols-3 s:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 gap-3 cursor-pointer">

                {movies.map((item: Movie) => (
                    <div key={item.id} className="flex flex-col items-center">
                        {item.img && (
                            <CustomContainer
                                item={item}
                                isRank={null}
                                addToRanking={() => addToRanking(item)}
                            />
                        )
                        }
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MovieResults;