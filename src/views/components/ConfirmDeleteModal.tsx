import { Trash2Icon } from "lucide-react";

import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  open: boolean;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({ onConfirm, onClose, open, title, description, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <Trash2Icon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-100 tracking-[-0.5px] font-bold">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px] text-gray-100">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
