import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

const LinkTo = ({ route }: { route: string }) => {
    return (
        <Link href={`/${route}`} className="flex items-center gap-2 justify-between text-neutral-400">
            <span>
                Profile
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
           <LinkTo route="account"/>
           <LinkTo route="create-ranking"/>
           <LinkTo route="favorites"/>
           <LinkTo route="rankings"/>
           <LinkTo route="collections"/>

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