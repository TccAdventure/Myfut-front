import { Trash2Icon } from "lucide-react";

interface TrashButtonProps {
  onClick: () => void;
}

export function TrashButton({ onClick }: TrashButtonProps) {
  return (
    <button
      className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-red-900 hover:bg-red-800"
      onClick={onClick}
    >
      <Trash2Icon />
    </button>
  );
}
