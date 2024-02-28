import { getMovieById } from "@/services/movies";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import RenderFavoriteIcon from "../render-favorite-icon";

const MovieModal = async ({ id }: { id: string }) => {
    if (!id || isNaN(parseInt(id, 10))) redirect('/')

    const movie = await getMovieById(Number(id))

    // setting object for like movies
    const item = {
        id,
        title: movie.title,
        img: movie.poster_path
    }

    const numberFormatter = (number: number) => {
        if(number >= 1000) {
            return (number / 1000).toFixed(1) + 'K'
        } else {
            return number
        }
    }

    const formattedNumber = numberFormatter(movie.vote_count)

    return (
        <Card className="fixed w-[90%] md:w-full m-auto inset-0 border-0 flex bg-transparent items-center justify-center z-10">
            <Link
                className="fixed inset-0 bg-black opacity-75 cursor-default"
                href="/"
                scroll={false}
            />
            <div className="relative w-fit max-w-3xl bg-black rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    <Link
                        className="absolute top-2.5 right-2.5 h-6 w-6 bg-black text-white justify-center items-center flex pb-0.5"
                        href="/"
                        scroll={false}
                    >
                        &times;
                        <span className="sr-only">Close Modal</span>
                    </Link>
                </div>
                <div className="w-fit mx-auto space-y-4 overflow-auto z-20 text-white">
                    <div className="flex">
                        <div className="relative hidden sm:block">
                            <Image
                                alt={movie.title}
                                className="overflow-hidden rounded-l-lg"
                                width={500}
                                height={500}
                                loading="eager"
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            />
                        </div>
                        <div className="space-y-2 p-4 text-sm">
                            <h1 className="font-semibold font-sans text-2xl max-w-[90%]">
                                {movie.title}
                            </h1>

                            <div className="flex items-center justify-between gap-10">
                                <div>
                                    ⭐{movie.vote_average}
                                    <span className="text-sm text-zinc-500 pl-2">
                                        ({formattedNumber})
                                    </span>
                                </div>
                                <div className="pr-5">
                                <RenderFavoriteIcon isInModal={true} item={item} />
                                </div>
                            </div>
                            <p className="text-sm leading-loose">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

    );
}

export default MovieModal;