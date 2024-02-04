import { create } from 'zustand'

interface ModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}

const useLoginModal = create<ModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

const useRegisterModal = create<ModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export { useLoginModal, useRegisterModal }