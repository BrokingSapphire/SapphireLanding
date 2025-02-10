import { LucideIcon, ChevronUp, ChevronDown } from "lucide-react";

interface PageNavigationProps {
  currentStep: number;
  canMoveNext: boolean;
  canMovePrev: boolean;
  onNavigate: (direction: number) => void;
}

interface NavigationButton {
  direction: number;
  Icon: LucideIcon;
  disabled: boolean;
}

export default function PageNavigation({
  currentStep,
  canMoveNext,
  canMovePrev,
  onNavigate,
}: PageNavigationProps) {
  const navigationButtons: NavigationButton[] = [
    { direction: -1, Icon: ChevronUp, disabled: !canMovePrev },
    { direction: 1, Icon: ChevronDown, disabled: !canMoveNext },
  ];

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-2">
      <div className="flex flex-row">
        {navigationButtons.map(({ direction, Icon, disabled }) => (
          <button
            key={direction}
            onClick={() => onNavigate(direction)}
            disabled={disabled}
            className={`
              w-10 h-10 flex items-center justify-center border border-white
              ${direction < 0 ? "rounded-s-md" : "rounded-e-md"}
              ${
                disabled
                  ? "bg-teal-800 text-gray-400 cursor-not-allowed"
                  : "bg-teal-800 text-white hover:bg-teal-700"
              }
            `}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}
