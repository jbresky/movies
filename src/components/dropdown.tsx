import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownProps {
    user: any,
    handleLogout: () => void,
    loginModal: any,
    registerModal: any
}

const Dropdown = ({ user, handleLogout, loginModal, registerModal }: DropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {user && user.photoURL ? (
                    <Image
                        className='rounded-full sm:hidden'
                        width={40}
                        height={40}
                        alt={user.email}
                        src={user.photoURL}
                    />
                ) : (
                    <RxHamburgerMenu className='sm:hidden text-xl' />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#060d17] text-grayth w-[150px] mt-2 mr-2">
                {user && user.email ? (
                    <>
                        <DropdownMenuLabel>
                            <Link href='/account'>
                                Profile
                            </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href='/create-ranking'>
                                Create ranking
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem onClick={loginModal.onOpen}>Log in</DropdownMenuItem>
                        <DropdownMenuItem onClick={registerModal.onOpen}>Sign up</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
     );
}

export default Dropdown;