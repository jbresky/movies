'use client'

import { useState } from "react";

const useSearch = () => {
    const [title, setTitle] = useState('')

    return {
        title,
        setTitle,
    }
}

export default useSearch;