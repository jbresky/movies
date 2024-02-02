'use client'

import CustomContainer from '@/components/containers/custom-container';
import { AnimatePresence, motion } from 'framer-motion'
import RankingEnteredData from '@/app/create-ranking/components/ranking-entered-data';

interface ISelected {
    movies: Movie[],
    movieSearched: string,
    selectedMovies: Movie[],
    createRankingProps: any,
    removeFromRanking: (id: string) => void
}

const Selected = ({ movies, movieSearched, selectedMovies, createRankingProps, removeFromRanking }: ISelected) => {

    return (
        <>
            {movies.length < 1 && selectedMovies.length < 1 && !movieSearched && <p className='px-2 text-sm tracking-wide mt-4'>Put those movies into a ranking❗</p>}

            {selectedMovies.length > 1 && <RankingEnteredData {...createRankingProps} />}

            {selectedMovies.length >= 1 && (
                <div className='flex flex-col items-center 2xsm:grid grid-cols-2 s:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 my-4'>
                    {
                        selectedMovies.map((item: Movie, index: number) => (
                            <AnimatePresence
                                key={item.id}
                                presenceAffectsLayout>
                                <motion.div
                                    layout
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                >
                                    <CustomContainer
                                        classname='text-indigo-700 font-bold text-2xl xl:text-3xl p-4 border-[1px] flex items-center rounded-full w-[50px] h-[50px] justify-center bg-indigo-400/30 border-transparent hover:opacity-60 transition duration-200 cursor-pointer absolute top-3 right-3'
                                        item={item}
                                        index={index + 1}
                                        isRank={true}
                                        removeFromRanking={() => removeFromRanking(item.id)}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        ))
                    }
                </div>
            )}
        </>
    )
}


export default Selected;