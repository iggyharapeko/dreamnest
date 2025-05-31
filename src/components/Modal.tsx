import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  children: ReactNode
  confirmText?: string
  cancelText?: string
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative z-50 w-full max-w-md rounded-2xl bg-gradient-to-br from-[#001F54] to-[#6A0572] p-6 shadow-xl"
        >
          <h2 className="mb-4 text-xl font-semibold text-[#5EEAD4]">{title}</h2>
          <div className="mb-6 text-[#FAF3E0]">{children}</div>
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-opacity-20 border border-[#5EEAD4] text-[#5EEAD4] hover:bg-[#5EEAD4] hover:bg-opacity-10"
            >
              {cancelText}
            </motion.button>
            {onConfirm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-[#FF6EC7] bg-opacity-20 border border-[#FF6EC7] text-[#FF6EC7] hover:bg-[#FF6EC7] hover:bg-opacity-10"
              >
                {confirmText}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 