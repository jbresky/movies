'use client'

import { UserAuth } from "@/context/auth-context";
import { db } from "@/firebase";
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useLoginModal from "./use-login-modal";

const useSavedMovies = () => {
    const [favorites, setFavorites] = useState<Movie[]>([])
    const [rankings, setRanking] = useState<Movie[]>([])
    const [loadingMovies, setLoadingMovies] = useState(false)
    const [users, setUsers] = useState<any>([])

    const { user } = UserAuth()

    const loginModal = useLoginModal()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchMovies = () => {
            try {
                setLoadingMovies(true)
                onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
                    setFavorites(doc.data()?.savedMovies)
                    const rankings = doc.data()?.ranking || []
                    setRanking(rankings)
                })
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingMovies(false)
            }
        }

        fetchMovies()
    }, [user?.email])

    const movieRef = doc(db, 'users', `${user?.email}`)

    const removeFromFavorites = async (movieId: string | number) => {
        try {
            const result = favorites.filter((item: any) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
            toast.message('Removed from your favorites')
        } catch (error) {
            console.log(error)
        }
    }

    const removeRanking = async (index: number) => {
        try {
            await updateDoc(movieRef, {
                ranking: arrayRemove(rankings[index])
            })
            toast.success('Ranking deleted')
        } catch (error) {
            console.log(error)
        }
    }

    const saveMovie = async ({ id, title, img }: Movie) => {
        if (!user?.email) {
            loginModal.onOpen()
        } else {
            await updateDoc(movieRef, {
                savedMovies: arrayUnion({
                    id: id,
                    title: title,
                    img: img
                })
            }).then(() => {
                toast.message(`Added to your favorites: ${title}`)
            })
        }
    }

    return {
        favorites, rankings, removeFromFavorites, removeRanking, loadingMovies, users, saveMovie
    }
}

export default useSavedMovies;