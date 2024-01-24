import { Skeleton } from "../ui/skeleton";

const MovieSkeleton = ({ item }: { item: Movie }) => {
    return (
        <div key={item.id} className="space-y-3">
            <Skeleton className="h-[375px] w-[170px] md:w-[200px] lg:w-[250px] xl:w-[300px]" />
            <Skeleton className="h-2 w-[120px] md:w-[150px] lg:w-[200px] xl:w-[250px]" />
        </div>
    );
}

export default MovieSkeleton;