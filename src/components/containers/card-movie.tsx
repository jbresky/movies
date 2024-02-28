import Image from "next/image";
import React from "react";
import { headers } from "next/headers"
import Link from "next/link";
import RenderFavoriteIcon from "../render-favorite-icon";

const BASE_URL = process.env.NODE_ENV == 'production' ? process.env.VERCEL_URL! : "http://localhost:3000"

const CardMovie = ({ item }: { item: Movie }) => {
    const headersList = headers()
    const pathname = headersList.get("x-pathname")
    const url = new URL(pathname ? pathname : "/", BASE_URL)
    url.searchParams.set("modal", "true")
    url.searchParams.set("id", item.id.toString())

    return (
        <div className="w-[80%] 2xsm:w-full flex flex-col gap-2 text-ellipsis overflow-hidden whitespace-nowrap pb-2">
            {item.img !== null && (
                <>
                    <div
                        className="relative border-[1px] hover:shadow-neutral-800/50 shadow-lg border-transparent transition duration-800 cursor-pointer hover:border-grayth rounded-md">
                        <RenderFavoriteIcon item={item} />
                        <Link href={url.toString()} scroll={false}>
                            <Image
                                src={`https://image.tmdb.org/t/p/original/${item.img}`}
                                alt={item.title}
                                width={300}
                                height={375}
                                className="rounded-md"
                                loading="lazy"
                            />

                        </Link>
                    </div>
                    <p className="leading-5 text-sm text-grayth">{item.title}</p>
                </>
            )}
        </div>
    );
}

export default CardMovie