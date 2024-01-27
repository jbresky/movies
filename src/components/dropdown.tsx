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

const Dropdown = ({ user, handleLogout }: IDropdown) => {

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
                        <FaCircleUser
                            className='rounded-full sm:hidden text-2xl bg-indigo-900'
                        />
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

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

export default Dropdown;