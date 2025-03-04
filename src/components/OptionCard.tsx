
import React from 'react';
import { Check, X } from 'lucide-react';
import { QuizOption } from '../types/quiz';

interface OptionCardProps {
  option: QuizOption;
  selected: boolean;
  disabled: boolean;
  showAnswer: boolean;
  isCorrect: boolean;
  onSelect: (optionId: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  option,
  selected,
  disabled,
  showAnswer,
  isCorrect,
  onSelect,
}) => {
  const getClassName = () => {
    if (!showAnswer) {
      return selected ? 'option-card selected' : 'option-card';
    }

    if (isCorrect) {
      return 'option-card correct';
    }

    if (selected && !isCorrect) {
      return 'option-card incorrect';
    }

    return 'option-card';
  };

  return (
    <div
      className={getClassName()}
      onClick={() => !disabled && onSelect(option.id)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      <div className="flex-1">{option.text}</div>
      {showAnswer && isCorrect && (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white ml-2">
          <Check size={16} />
        </div>
      )}
      {showAnswer && selected && !isCorrect && (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white ml-2">
          <X size={16} />
        </div>
      )}
      {selected && !showAnswer && (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white ml-2">
          <Check size={16} />
        </div>
      )}
    </div>
  );
};

export default OptionCard;
