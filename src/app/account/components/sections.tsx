import Link from "next/link";
import { ReactNode } from "react";

interface ISections {
    route: string,
    children: ReactNode,
    isCollection?: boolean
}

const Sections = ({ route, children, isCollection }: ISections) => {
    return (
        <Link href={`/${route}`} className="rounded-lg w-full bg-[#0a1829] py-6 px-4 hover:bg-[#0c1e34] transition duration-200 ease-in">
            <div className="relative">
                <div className="absolute right-4 bottom-2">
                    {isCollection && <div className="py-1 px-3 rounded-full bg-purple/70 text-white text-sm">
                        New
                    </div>}
                </div>
            </div>
            <div className="flex items-center justify-between">

                {children}
            </div>
        </Link>
    );
}

export default Sections;