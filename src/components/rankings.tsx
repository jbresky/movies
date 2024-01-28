'use client'

import CustomContainer from "./containers/custom-container";
import { TiArrowSortedDown } from "react-icons/ti";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import SectionHeader from "./section-header";

interface RankingsProps {
    rankings: Movie[]
    removeRanking: (ranking: number) => void
}

const Rankings = ({ rankings, removeRanking }: RankingsProps) => {

    return (
        <section className="flex flex-col gap-6">
            <div className="flex flex-col xsm:flex-row gap-2 justify-between xsm:items-end text-[15px]">
                <SectionHeader
                    data={rankings}
                    title="Rankings"
                    paragraph="You don't have rankings"
                />
            </div>

            {
                rankings && rankings.map((rank: any) => (
                    <>
                        <div className="flex justify-between items-center">
                            <h2 className="font-sans font-medium">{rank.name.toUpperCase()}</h2>
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <TiArrowSortedDown className="text-2xl" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="absolute right-[-10px]">
                                        <DropdownMenuItem>
                                            <button className="w-full text-start">Share</button>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-grayth h-[0.5px]" />

                                        <DropdownMenuItem>
                                            <button
                                                onClick={() => removeRanking(rankings.indexOf(rank))}
                                                className="w-full text-start cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        </div>

                        <div className="flex whitespace-nowrap overflow-x-auto scroll-smooth sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-4 max-md:border-2 max-md:p-2 border-grayth rounded-lg border-dotted">
                            {rank.movies && rank.movies.map((item: any, index: number) => (
                                <div key={item.id}>
                                    <CustomContainer
                                        item={item}
                                        isRank={true}
                                        index={index + 1}
                                        isScrollable={true}
                                        classname="text-indigo-600/90 font-bold text-2xl xl:text-3xl p-4 border-[1px] flex items-center rounded-full w-[50px] h-[50px] justify-center bg-indigo-400/30 border-transparent hover:opacity-60 transition duration-200 cursor-pointer absolute top-3 right-3"
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