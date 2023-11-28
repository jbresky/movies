'use client'

import { Movie } from "@/interface/movie-interface";
import CustomContainer from "../custom-container";
import AccountHeader from "./header";

interface RankingsProps {
    ranking: Movie[]
    removeRanking: (ranking: number) => void
}

const Rankings = ({ ranking, removeRanking }: RankingsProps) => {

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col xsm:flex-row gap-2 justify-between xsm:items-end text-[15px]">
                <AccountHeader
                    data={ranking}
                    title="Rankings"
                    paragraph="You don't have rankings"
                />
                {ranking?.length > 0 && (
                    <button
                        className='text-xl border-indigo-800 border-2 rounded-lg p-2 hover:text-black hover:bg-indigo-600 transition duration-500'>
                        Share ranking
                    </button>
                )}
            </div>

            {
                ranking && ranking.map((rank: any, index: number) => (
                    <>
                        <div className="flex justify-between items-center">
                            <h2 key={index} className="text-indigo-400 text-xl font-semibold">{rank.name}</h2>
                            <button
                                onClick={() => removeRanking(ranking.indexOf(rank))}
                                className="hover:opacity-90 text-grayth cursor-pointer border-none outline-none">Delete</button>
                        </div>
                        
                        <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4">
                            {rank.movies && rank.movies.map((item: any) => (
                                <div
                                    className="" key={item.id}>
                                    <CustomContainer
                                        item={item}
                                        isRank={true}
                                        classname="text-grayth/60 text-2xl transition duration-200 cursor-pointer absolute top-3 right-3"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ))
            }
        </section>
    );
}

export default Rankings;