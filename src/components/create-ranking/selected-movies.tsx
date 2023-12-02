'use client'

import { Movie } from "@/interface/movie-interface";
import { ChangeEvent, FormEvent } from "react";
import { BeatLoader } from "react-spinners";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

interface SelectedMoviesProps {
    selectedMovies: Movie[],
    rankingReady: boolean,
    nameOfRanking: string,
    saveRanking: () => void,
    load: boolean,
    changeRankingName: (e: ChangeEvent<HTMLInputElement>) => void,
    submitNameOfRanking: (e: FormEvent<HTMLFormElement>) => void,
    updateRankingName: () => void
}

const SelectedMovies = ({
    selectedMovies,
    rankingReady,
    nameOfRanking,
    saveRanking,
    load,
    changeRankingName,
    submitNameOfRanking,
    updateRankingName
}: SelectedMoviesProps) => {

    return (
        <div className="flex flex-col sm:px-5">
            <div className="flex max-sm:flex-col justify-between sm:items-center font-semibold mb-4">
                <div className='flex max-sm:flex-col sm:items-center sm:gap-3'>
                    {selectedMovies.length > 0 &&
                        <h1 className='text-xl sm:text-2xl'>Ranking:</h1>
                    }

                    {rankingReady &&
                        <HoverCard>
                            <HoverCardTrigger>
                                <h2 onClick={updateRankingName} className="text-lg sm:text-xl cursor-pointer text-indigo-400 hover:opacity-80 transition duration-200">
                                    {nameOfRanking}
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit py-1 bg-transparent text-white text-[12px] border-none font-normal">
                                Click to update name
                            </HoverCardContent>
                        </HoverCard>
                    }
                </div>

                {selectedMovies.length > 0 && selectedMovies.length < 3 && (
                    <p className="text-grayth">A ranking must contain at least 3 movies</p>
                )}

                {selectedMovies.length >= 3 && rankingReady && (
                    <button
                        onClick={saveRanking}
                        className='w-[200px] max-sm:w-full text-md sm:text-xl mt-2 border-indigo-900 border-2 rounded-lg px-5 py-2 hover:brightness-150 transition duration-500'>
                        {load ? (
                            <BeatLoader color='white' />
                        ) : 'Create ranking'}
                    </button>
                )}

                {selectedMovies.length >= 3 && !rankingReady && (
                    <form onSubmit={submitNameOfRanking} className="flex flex-col gap-2">
                        <label htmlFor='name' className="text-sm text-grayth">Give your ranking a name</label>
                        <input
                            id='name'
                            onChange={changeRankingName}
                            value={nameOfRanking}
                            placeholder='My top 3...'
                            className="text-[13px] font-normal bg-transparent border-2 p-2 rounded-lg border-indigo-900 outline-none focus:brightness-150" />
                    </form>
                )}
            </div>
        </div>
    );
}

export default SelectedMovies;