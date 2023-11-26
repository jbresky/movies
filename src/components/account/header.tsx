import { Movie } from "@/interface/movie-interface";

interface HeaderProps {
 data: Movie[],
 title: string,
 paragraph: string
}

const AccountHeader = ({data, title, paragraph}: HeaderProps) => {
    return ( 
        <div className="flex flex-col gap-2 items-start text-grayth">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        {data?.length < 1 && (
            <p>{paragraph}</p>
        )}
    </div>
     );
}
 
export default AccountHeader;