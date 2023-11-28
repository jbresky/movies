'use client'

import { Movie } from "@/interface/movie-interface";
import { ChangeEvent, FormEvent } from "react";
import { BeatLoader } from "react-spinners";

interface SelectedMoviesProps {
    selectedMovies: Movie[],
    rankingReady: boolean,
    nameOfRanking: string,
    saveRanking: () => void,
    load: boolean,
    changeRankingName: (e: ChangeEvent<HTMLInputElement>) => void,
    submitNameOfRanking: (e: FormEvent<HTMLFormElement>) => void,
}

const SelectedMovies = ({
    selectedMovies,
    rankingReady,
    nameOfRanking,
    saveRanking,
    load,
    changeRankingName,
    submitNameOfRanking,
}: SelectedMoviesProps) => {

    return (
        <div className="flex flex-col sm:px-5">
            <div className="flex flex-col xsm:flex-row justify-between xsm:items-center text-grayth text-[15px] font-semibold mb-4">
                <div className='flex flex-col'>
                    <h1 className='text-lg sm:text-2xl'>
                        {selectedMovies.length > 0 && "Ranking: "}
                        {rankingReady && nameOfRanking}
                    </h1>
                    {selectedMovies.length < 3 && (
                        <p>A ranking must contain at least 3 movies</p>
                    )}
                </div>

                {selectedMovies.length >= 3 && rankingReady && (
                    <button
                        onClick={saveRanking}
                        className='w-full xsm:w-[200px] text-md sm:text-xl mt-2 border-indigo-900 border-2 rounded-lg px-5 py-2 hover:brightness-150 transition duration-500'>
                        {load ? (
                            <BeatLoader color='white' />
                        ) : 'Create ranking'}
                    </button>
                )}

                {selectedMovies.length >= 3 && !rankingReady && (
                    <div>
                        <form onSubmit={submitNameOfRanking} className="flex flex-col gap-2">
                            <label htmlFor='name'>Give your ranking a name:</label>
                            <input
                                id='name'
                                onChange={changeRankingName}
                                value={nameOfRanking}
                                placeholder='My top 3...'
                                className="text-sm font-normal bg-transparent border-2 p-2 rounded-lg border-indigo-900 outline-none focus:brightness-150" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectedMovies;