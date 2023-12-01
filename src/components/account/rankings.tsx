'use client'

import { Movie } from "@/interface/movie-interface";
import { TiArrowSortedDown } from "react-icons/ti";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import CustomContainer from "../custom-container";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
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
                    // <button
                    //     className='text-lg border-indigo-800 border-2 rounded-lg px-4 py-1 hover:text-black hover:bg-indigo-600 transition duration-500'>
                    //     Share ranking
                    // </button>
                    ''
                )}
            </div>

            {
                ranking && ranking.map((rank: any, index: number) => (
                    <>
                        <div className="flex justify-between items-center">
                            <h2 key={index} className="text-indigo-400 text-lg font-semibold">{rank.name}</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="">
                                    <TiArrowSortedDown className="text-indigo-600 text-2xl cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#060d17] text-white mr-5">
                                    <DropdownMenuItem>
                                        <button>Update</button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <button
                                            onClick={() => removeRanking(ranking.indexOf(rank))}
                                            className="hover:opacity-90 cursor-pointer border-none outline-none">
                                            Delete
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mb-4">
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