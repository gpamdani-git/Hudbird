import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@hudbird/ui";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the selected item and remove its data from our servers.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="border-border/40 bg-card fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-2xl"
          >
            <div className="flex gap-4">
              <div className="bg-destructive/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <AlertTriangle className="text-destructive h-5 w-5" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-foreground text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{description}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                variant="solid"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </div>

            <button
              onClick={onClose}
              className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
