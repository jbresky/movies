'use client'

import AccountHeader from "./header";
import CustomContainer from "../custom-container";
import { Movie } from "@/interface/movie-interface";
import { TiArrowSortedDown } from "react-icons/ti";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface RankingsProps {
    rankings: Movie[]
    removeRanking: (ranking: number) => void
}

const Rankings = ({ rankings, removeRanking }: RankingsProps) => {

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col xsm:flex-row gap-2 justify-between xsm:items-end text-[15px]">
                <AccountHeader
                    data={rankings}
                    title="Rankings"
                    paragraph="You don't have rankings"
                />
            </div>

            {
                rankings && rankings.map((rank: any, index: number) => (
                    <>
                        <div className="flex justify-between items-center" key={index}>
                            <h2 className="text-indigo-400 text-lg sm:text-xl font-semibold">{rank.name}</h2>
                            <>                                <DropdownMenu>
                                    <DropdownMenuTrigger className="">
                                        <TiArrowSortedDown className="text-indigo-500 text-2xl cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-[#060d17] font-semibold text-indigo-300 mr-5">
                                        <DropdownMenuItem>
                                            <button className="w-full text-left hover:opacity-90">Share</button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button
                                                onClick={() => removeRanking(rankings.indexOf(rank))}
                                                className="w-full text-left hover:opacity-90 border-none outline-none">
                                                Delete
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        </div>

                        <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-4 mb-4">
                            {rank.movies && rank.movies.map((item: any) => (
                                <div key={item.id}>
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