'use client'

import { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import Loader from "../loader";

interface ModalProps {
    isOpen?: boolean,
    onClose: () => void,
    title: string,
    body?: React.ReactElement,
    loading: boolean
}

const Modal = ({ isOpen, onClose, title, body, loading }: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setShowModal(false)
        // setTimeout(() => {
        onClose()
        // }, 300)
    }

    if (!isOpen) {
        return null
    }

    return (
        <>
            <div
                className="
        justify-center 
        items-center 
        flex 
        overflow-hidden
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/50
        "
            >
                <div className="
       relative
        w-full
        max-sm:h-full
       md:w-4/6
       lg:w-3/6
       xl:w-2/5
          "
                >
                    {/*content*/}
                    <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            
          `}>
                        {loading ? (
                            <Loader />
                        ) : (

                            <div className="
                        translate
                        h-full
                        lg:h-auto
                        md:h-auto
                        border-0 
                        rounded-lg 
                        shadow-lg 
                        relative 
                        flex 
                        flex-col 
                        w-full 
                        bg-deep-blue
                        outline-none 
                        focus:outline-none
                        py-4
                        
                        "
                            >
                                {/*header*/}
                                <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[0.5px]
                border-gray-700
                "
                                >
                                    <div className="text-lg font-semibold">
                                        {title}
                                    </div>
                                    <button
                                        className="
                                    p-1
                                    border-0 
                                    hover:opacity-70
                                    transition
                                    absolute
                                    right-9
                                    "
                                        onClick={handleClose}
                                    >
                                        <IoMdClose size={18} />
                                    </button>
                                </div>
                                <div className="relative max-sm:p-4 p-6 lg:px-10 flex-auto">
                                    {body}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;