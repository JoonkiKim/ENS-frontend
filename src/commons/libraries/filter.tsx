
import styled from '@emotion/styled';

const FilterButton = styled.button`
  width: 31px;
  height: 28px;
  background: white;
  border: 1px solid #2c2c2c;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    border-color: #ffb700;
  }
  
  &:active {
    background: #fff8e5;
  }
`;

const FilterIcon = styled.svg`
  width: 21px;
  height: 21px;
  border: 1px solid #2c2c2c;
  border-radius: 3px;
`;

interface FilterProps {
  onClick?: () => void;
  className?: string;
}

export default function Filter({ onClick, className }: FilterProps) {
  return (
    <FilterButton onClick={onClick} className={className} aria-label="Open filter">
        <FilterIcon viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top line with circle on the left */}
            <rect x="3" y="4.5" width="15" height="1.25" rx="0.75" fill="#2c2c2c" />
            <circle cx="7.5" cy="5.15" r="1.5" stroke="#2c2c2c" strokeWidth="0.75" fill="white" />
            
            {/* Middle line with circle on the right */}
            <rect x="3" y="9.75" width="15" height="1.25" rx="0.75" fill="#2c2c2c" />
            <circle cx="13.5" cy="10.4" r="1.5" stroke="#2c2c2c" strokeWidth="0.75" fill="white" />
            
            {/* Bottom line with circle in the center */}
            <rect x="3" y="15" width="15" height="1.25" rx="0.75" fill="#2c2c2c" />
            <circle cx="10.5" cy="15.65" r="1.5" stroke="#2c2c2c" strokeWidth="0.75" fill="white" />
      </FilterIcon>
    </FilterButton>
  );
}
