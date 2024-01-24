'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { UserAuth } from "@/context/auth-context";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";

const Dropdown = () => {
    const { user, logOut } = UserAuth()
    const router = useRouter()

    const handleLogout = () => {
        router.push('/')
        setTimeout(async () => {
            await logOut()
        }, 300)
    }

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    return (
        <Drawer>
            <DrawerTrigger>
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
            </DrawerTrigger>
            <DrawerContent className="bg-[#0e0e0e] p-4 flex flex-col border-none text-sm gap-4">
                {user && user.email ? (
                    <>
                        <Link href='/account' className="flex items-center gap-2 justify-between text-neutral-400">
                            <span>
                                Profile
                            </span>
                            <span className="text-[11px]">
                                <SlArrowRight />
                            </span>
                        </Link>
                        <Link href='/create-ranking' className="flex items-center justify-between gap-2 text-neutral-400">
                            <span>
                                Create ranking
                            </span>
                            <span className="text-[11px]">
                                <SlArrowRight />
                            </span>
                        </Link>
                        <button className="flex items-center gap-2 justify-between text-[#d5322d]" onClick={handleLogout}>
                            <span>
                                Log out
                            </span>
                            <span className="text-[11px]">
                                <SlArrowRight />
                            </span>
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between gap-2 text-neutral-400">
                            <button onClick={loginModal.onOpen}>Log in</button>
                            <span className="text-[11px]">
                                <SlArrowRight />
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-neutral-400">
                            <button onClick={registerModal.onOpen}>Sign up</button>
                            <span className="text-[11px]">
                                <SlArrowRight />
                            </span>
                        </div>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}

export default Dropdown;