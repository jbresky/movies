import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

interface IDropdown {
    user: any,
    handleLogout: () => void
}

const NavDropdown = ({ user, handleLogout }: IDropdown) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex items-center gap-3 border-[1px] cursor-pointer hover:opacity-80 transition duration-200 border-grayth rounded-full py-2 px-3'>
                    <IoMdMenu className='ml-1 text-xl' />
                    {user.photoURL && (
                        <Image
                            className='rounded-full'
                            width={30}
                            height={30}
                            alt={user.email}
                            src={user.photoURL}
                        />
                    )}
                    {!user.photoURL && (
                        <div className="w-[30px] h-[30px] flex items-center justify-center font-semibold rounded-full bg-slate-200 text-black">
                            <p>{user.email?.[0].toUpperCase()}</p>
                            <p>{user.email?.[1].toUpperCase()}</p>
                        </div>
                     
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute left-[-10rem] w-[200px]">

                <Link href='/account'>
                    <DropdownMenuLabel>
                        Profile
                    </DropdownMenuLabel>
                </Link>
                <Link href='/create-ranking'>
                    <DropdownMenuLabel>
                        Create ranking
                    </DropdownMenuLabel>
                </Link>

                <DropdownMenuSeparator className="bg-grayth h-[0.5px]" />

                <Link href='/favorites'>
                    <DropdownMenuItem className="cursor-pointer">
                        Favorites
                    </DropdownMenuItem>
                </Link>
                <Link href='/rankings'>
                    <DropdownMenuItem className="cursor-pointer">
                        Rankings
                    </DropdownMenuItem>
                </Link>
                <Link href='/folders'>
                    <DropdownMenuItem className="cursor-pointer">
                        Folders
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <button onClick={handleLogout} className="cursor-pointer">Log out</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export default NavDropdown;