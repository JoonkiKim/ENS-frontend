import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Modal Container
const ModalContainer = styled.div`
  width: 364px;
  max-height: 90vh;
  background: white;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
`;

// Modal Header
const ModalHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e1e1e;
  letter-spacing: -0.32px;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 1px;
    background: #d9d9d9;
    top: 50%;
    left: 0;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
  
  &:hover::before,
  &:hover::after {
    background: #999;
  }
`;

// Modal Body
const ModalBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 20px 25px 20px;
`;

// Section
const Section = styled.div`
  margin-bottom: 20px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0 0 16px 0;
`;

const Divider = styled.div`
  height: 8px;
  background: rgba(217, 217, 217, 0.1);
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  margin: 0 -25px 24px;
`;

// Range Slider
const RangeSliderWrapper = styled.div`
  margin-bottom: 12px;
`;

const RangeDisplay = styled.div`
  text-align: center;
  // margin-bottom: 16px;
`;

const RangeText = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.32px;
  margin: 0;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 3px;
  background: #d9d9d9;
  border-radius: 10px;
`;

const SliderRange = styled.div<{ min: number; max: number }>`
  position: absolute;
  height: 3px;
  background: #ffb700;
  border-radius: 10px;
  left: ${({ min }) => min}%;
  right: ${({ max }) => 100 - max}%;
`;

const SliderInput = styled.input`
  position: absolute;
  width: 100%;
  height: 3px;
  background: transparent;
  pointer-events: none;
  appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    border: 0.5px solid rgba(255, 183, 0, 0.5);
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
  
  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    border: 0.5px solid rgba(255, 183, 0, 0.5);
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const SliderLabel = styled.span`
  font-size: 12px;
  color: #b3b3b3;
  letter-spacing: -0.24px;
`;

// Filter Tags
const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const FilterTag = styled.button<{ active?: boolean }>`
  height: 29px;
  padding: 0 20px;
  border-radius: 100px;
  border: 1px solid ${({ active }) => (active ? '#ffb700' : '#d9d9d9')};
  background: white;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? '500' : '400')};
  color: ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  letter-spacing: -0.26px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #ffb700;
  }
`;

// Apply Button
const ApplyButton = styled.button`
  width: 100%;
  height: 45px;
  background: #ffb700;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 20px;
  
  &:hover {
    background: #e6a500;
  }
`;

// Types
interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

interface FilterState {
  generationMin: number;
  generationMax: number;
  industries: string[];
  positions: string[];
}

const industries = [
  '게임',
  '음악',
  '방송',
  '웹툰·웹소설',
  '법조',
  '스포츠',
  '공연',
  '기타',
];

const positions = [
  '마케팅',
  '기획',
  '콘텐츠',
  '재무',
  'HR',
  '광고',
  '컨설팅',
  '법조',
  '기타',
];

export default function SearchFilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: SearchFilterModalProps) {
  const [generationMin, setGenerationMin] = useState(initialFilters?.generationMin ?? 1);
  const [generationMax, setGenerationMax] = useState(initialFilters?.generationMax ?? 40);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(initialFilters?.industries ?? []);
  const [selectedPositions, setSelectedPositions] = useState<string[]>(initialFilters?.positions ?? []);

  // 모달이 열릴 때 initialFilters로 state 업데이트
  useEffect(() => {
    if (isOpen && initialFilters) {
      setGenerationMin(initialFilters.generationMin);
      setGenerationMax(initialFilters.generationMax);
      setSelectedIndustries(initialFilters.industries);
      setSelectedPositions(initialFilters.positions);
    } else if (isOpen && !initialFilters) {
      // 필터가 없으면 기본값으로 리셋
      setGenerationMin(1);
      setGenerationMax(40);
      setSelectedIndustries([]);
      setSelectedPositions([]);
    }
  }, [isOpen, initialFilters]);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // 모달이 닫힐 때 스크롤 위치 복원
        const bodyTop = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(bodyTop || '0') * -1);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const togglePosition = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        generationMin,
        generationMax,
        industries: selectedIndustries,
        positions: selectedPositions,
      });
    }
    onClose();
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= generationMax) {
      setGenerationMin(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= generationMin) {
      setGenerationMax(value);
    }
  };

  const minPercent = ((generationMin - 1) / 39) * 100;
  const maxPercent = ((generationMax - 1) / 39) * 100;

  return (
    <>

      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>검색 필터</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            {/* 기수 */}
            <Section>
              <SectionTitle>기수</SectionTitle>
              <RangeDisplay>
                <RangeText>
                  {generationMin}기 ~ {generationMax}기
                </RangeText>
              </RangeDisplay>
              <RangeSliderWrapper>
                <SliderContainer>
                  <SliderTrack />
                  <SliderRange min={minPercent} max={maxPercent} />
                  <SliderInput
                    type="range"
                    min={1}
                    max={40}
                    value={generationMin}
                    onChange={handleMinChange}
                    style={{ zIndex: generationMin > 20 ? 5 : 3 }}
                  />
                  <SliderInput
                    type="range"
                    min={1}
                    max={40}
                    value={generationMax}
                    onChange={handleMaxChange}
                    style={{ zIndex: generationMax <= 20 ? 4 : 2 }}
                  />
                </SliderContainer>
                <SliderLabels>
                  <SliderLabel>1기</SliderLabel>
                  <SliderLabel>40기</SliderLabel>
                </SliderLabels>
              </RangeSliderWrapper>
            </Section>

            <Divider />

            {/* 산업군 */}
            <Section>
              <SectionTitle>산업군</SectionTitle>
              <FilterTags>
                {industries.map((industry) => (
                  <FilterTag
                    key={industry}
                    active={selectedIndustries.includes(industry)}
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry}
                  </FilterTag>
                ))}
              </FilterTags>
            </Section>

            <Divider />

            {/* 직무 */}
            <Section>
              <SectionTitle>직무</SectionTitle>
              <FilterTags>
                {positions.map((position) => (
                  <FilterTag
                    key={position}
                    active={selectedPositions.includes(position)}
                    onClick={() => togglePosition(position)}
                  >
                    {position}
                  </FilterTag>
                ))}
              </FilterTags>
            </Section>

            {/* 적용 버튼 */}
            <ApplyButton onClick={handleApply}>적용</ApplyButton>
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
