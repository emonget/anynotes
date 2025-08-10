import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value?: number; // 1-5 or undefined
  onChange: (rating: number | undefined) => void;
  readonly?: boolean;
  className?: string;
}

export const StarRating = ({ value, onChange, readonly = false, className = '' }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleClick = (rating: number) => {
    if (readonly) return;
    
    // If clicking the same star that's already selected, clear the rating
    if (value === rating) {
      onChange(undefined);
    } else {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(undefined);
    }
  };

  const getStarClass = (starNumber: number) => {
    const displayValue = hoverValue ?? value ?? 0;
    const isFilled = starNumber <= displayValue;
    
    let classes = 'w-5 h-5 transition-colors ';
    
    if (readonly) {
      classes += isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300';
    } else {
      classes += 'cursor-pointer ';
      if (isFilled) {
        classes += hoverValue !== undefined ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-400 fill-yellow-400';
      } else {
        classes += 'text-gray-300 hover:text-yellow-300';
      }
    }
    
    return classes;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <Star
          key={starNumber}
          className={getStarClass(starNumber)}
          onClick={() => handleClick(starNumber)}
          onMouseEnter={() => handleMouseEnter(starNumber)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};