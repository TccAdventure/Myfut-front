import { Calendar } from "lucide-react";

import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmScheduleModalProps {
  onConfirm(): void;
  onClose(): void;
  open: boolean;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmScheduleModal({ onConfirm, onClose, open, title, description, isLoading }: ConfirmScheduleModalProps) {
  return (
    <Modal open={open} title="Agendar" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-violet-50 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-violet-900" />
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
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo agendar
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
