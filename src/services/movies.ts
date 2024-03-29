const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function getTopMovies() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,)
        const movies = await res.json()

        return movies?.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
        }))
    } catch (e) {
        throw new Error('Error searching movies')
    }
}

export async function getTitle(title: string) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=${title}&include_adult=false&language=en-US&page=1`)
        const movie = await res.json()

        return movie?.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
            // overview: movie.overview
        }))

    } catch (e) {
        throw new Error('Error searching movies')
    }
}

export async function getMovieById(id: number) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        const movie = await res.json()

        return movie
    } catch (e) {
        throw new Error('Error searching movie')
    }
}