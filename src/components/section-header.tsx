interface HeaderProps {
 data: Movie[],
 title: string,
 paragraph: string
}

const SectionHeader = ({data, title, paragraph}: HeaderProps) => {
    return ( 
        <div className="flex flex-col gap-2 items-start">
        <h2 className="text-xl md:text-xl font-semibold">{title}</h2>
        {data?.length < 1 && (
            <p>{paragraph}</p>
        )}
    </div>
     );
}
 
export default SectionHeader;