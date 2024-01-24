'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { FaSearch } from "react-icons/fa"

const Search = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let query = event.currentTarget.query.value

        router.push(`/?title=${query}`)
    }

    return ( 
        <form onSubmit={onSubmit} className='w-full sm:w-[300px]'>
        <div
          className="flex items-center gap-3 text-sm text-grayth px-2 py-1 rounded-lg border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
          <input
            defaultValue={searchParams.get("title") || ""}
            name='query'
            placeholder="Search movie..."
            className="bg-transparent outline-none w-full"
          />
          <button className='border-none outline-none focus:text-white'>
            <FaSearch className='border-none' />
          </button>
        </div>
      </form>
     );
}
 
export default Search;