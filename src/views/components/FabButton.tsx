import { PlusIcon } from "lucide-react";

interface FabButtonProps {
  onClick: () => void;
}

export function FabButton({ onClick }: FabButtonProps) {
  return (
    <div className="fixed right-8 bottom-8">
      <button
        className="flex items-center justify-center h-12 w-12 bg-primary rounded-full cursor-pointer"
        onClick={onClick}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
