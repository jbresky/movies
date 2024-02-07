import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

const LinkTo = ({ href, route }: { href: string, route: string }) => {
    return (
        <Link href={`/${href}`} className="flex items-center gap-2 justify-between text-neutral-400">
            <span>
                {route}
            </span>
            <span className="text-[11px]">
                <SlArrowRight />
            </span>
        </Link>
    )
}

const DrawerLinks = ({ handleLogout }: { handleLogout: () => void }) => {
    return (
        <>
            <LinkTo route='Account' href="account" />
            <LinkTo route='Create Ranking' href="create-ranking" />
            <LinkTo route='Favorites' href="favorites" />
            <LinkTo route='Rankings' href="rankings" />
            <LinkTo route='Collections' href="collections" />

            <button className="flex items-center gap-2 justify-between text-[#d5322d]" onClick={handleLogout}>
                <span>
                    Log out
                </span>
                <span className="text-[11px]">
                    <SlArrowRight />
                </span>
            </button>
        </>
    );
}

export default DrawerLinks;