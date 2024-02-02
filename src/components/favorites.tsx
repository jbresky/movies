'use client'

import CustomContainer from "./containers/custom-container";
import AccountHeader from "./section-header";
import { motion, AnimatePresence } from 'framer-motion'

interface FavoritesProps {
    favorites: Movie[]
    removeFromFavorites: (id: number) => void
}

const Favorites = ({ favorites, removeFromFavorites }: FavoritesProps) => {
    return (
        <section className="flex flex-col gap-6 rounded-md">
            <AccountHeader
                data={favorites}
                title="Favorites"
                paragraph="You don't have favorites yet"
            />
            <div className="flex whitespace-nowrap rounded-md overflow-x-auto scroll-smooth sm:grid grid-cols-2 s:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {
                    favorites?.map((item: any) => (
                        <AnimatePresence
                            key={item.id}
                            presenceAffectsLayout>
                            <motion.div
                                layout
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <div>
                                    <CustomContainer
                                        classname='text-red-700 text-xl hover:opacity-80 transition duration-200 cursor-pointer absolute top-3 right-3'
                                        removeFromFavorites={() => removeFromFavorites(item.id)}
                                        item={item}
                                        isScrollable={true}
                                        isRank={false}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))}
            </div>
        </section>
    );
}

export default Favorites;