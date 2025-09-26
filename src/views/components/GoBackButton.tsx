import { ChevronLeft } from "lucide-react";

interface GoBackButtonProps {
  onClick: () => void;
}

export function GoBackButton({ onClick }: GoBackButtonProps) {
  return (
    <button
      className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full pr-0.5 bg-primary hover:bg-primary/80"
      onClick={onClick}
    >
      <ChevronLeft />
    </button>
  );
}
