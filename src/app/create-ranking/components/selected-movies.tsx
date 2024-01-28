'use client'

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
        <div className="flex flex-col my-2">
            <div className="flex flex-col xsm:flex-row justify-between xsm:items-center font-semibold mb-4">
                <div className='flex items-center gap-3 mb-1 sm:text-lg md:text-xl'>
                    {selectedMovies.length > 0
                        && <h1>Ranking:</h1>
                    }

                    {selectedMovies.length >= 3 && rankingReady &&
                        <HoverCard>
                            <HoverCardTrigger>
                                <h2 onClick={updateRankingName} className="cursor-pointer text-indigo-300 hover:opacity-80 transition duration-200">
                                    {nameOfRanking}
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit py-1 bg-transparent text-white text-[12px] border-none font-normal">
                                Click to update name
                            </HoverCardContent>
                        </HoverCard>
                    }
                </div>

                { selectedMovies.length > 0 && selectedMovies.length < 3
                    && <p className="text-grayth text-sm">A ranking must contain at least 3 movies</p>
                }

                {selectedMovies.length >= 3 && rankingReady && (
                    <button
                        onClick={saveRanking}
                        className='w-[200px] max-xsm:w-full text-md sm:text-xl border-indigo-900 border-2 rounded-lg px-5 py-2 hover:brightness-150 transition duration-500'>
                        { load
                            ? <BeatLoader color='white' />
                            : 'Create ranking'
                        }
                    </button>
                )}

                {selectedMovies.length >= 3 && !rankingReady && (
                    <form onSubmit={submitNameOfRanking} className="flex flex-col gap-2">
                        <label htmlFor='name' className="text-sm font-sans text-grayth">Give your ranking a name</label>
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