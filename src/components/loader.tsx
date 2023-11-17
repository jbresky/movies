import { RingLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="
        h-[50vh]
        w-full
        m-auto
        flex 
        flex-col 
        justify-center 
        items-center
        ">
            <RingLoader
                color="white"
            />
        </div>
    );
}

export default Loader;