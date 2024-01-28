import { FaRegFolder } from "react-icons/fa";
import Sections from "./sections";

interface IDashboard {
    rankings: Movie[],
    favorites: Movie[],
    collections?: Movie[]
}

const Dashboard = ({ rankings, favorites, collections }: IDashboard) => {
    return (
        <>
            <h1 className="text-lg mb-4">My movies</h1>
            <section className="flex max-md:flex-col justify-center m-auto items-center gap-5 w-full font-sans font-medium text-slate-300">
                <Sections route='rankings'>
                    <h2>Rankings</h2>
                    {rankings.length} saved
                </Sections>

                <Sections route='favorites'>
                    <h2>Favorites</h2>
                    {favorites.length ? <p>{favorites.length} saved</p> : <FaRegFolder />}
                </Sections>

                <Sections route='collections' isCollection={true}>
                    <h2>Collections</h2>
                    <FaRegFolder />
                </Sections>
            </section>
        </>
    );
}

export default Dashboard;