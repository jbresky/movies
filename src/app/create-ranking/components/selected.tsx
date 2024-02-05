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
                <div className='flex whitespace-nowrap rounded-md overflow-x-auto sm:overflow-hidden scroll-smooth sm:grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 gap-3'>
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
                                        classname='text-indigo-600 text-2xl font-semibold p-4 border-[1px] flex items-center rounded-full w-[40px] h-[40px] justify-center bg-indigo-400/30 border-transparent hover:opacity-60 transition duration-200 cursor-pointer absolute top-3 right-3'
                                        item={item}
                                        index={index + 1}
                                        isScrollable={true}
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