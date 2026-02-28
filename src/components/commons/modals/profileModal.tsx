import { useEffect } from 'react';
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
  width: 785px;
  max-height: 90vh;
  background: white;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
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
  overflow-x: hidden;
  flex: 1;
`;

// Hero Section
const HeroSection = styled.div`
  height: 183px;
  background-image: url('/images/profile-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

// Profile Section
const ProfileSection = styled.div`
  padding: 0 51px 40px;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  width: 173px;
  height: 173px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e5e5;
  margin-top: -87px;
  margin-bottom: 20px;
  border: 4px solid white;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileNameGenerationWrapper = styled.div`
  display: flex;
  align-items: center ;
  gap: 12px;
  margin-bottom: 12px;
`;

const ProfileName = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: black;
  letter-spacing: -0.52px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #ffd000;
  border-radius: 50%;
  font-size: 12px;
  color: white;
  font-weight: 600;
`;

const Generation = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0;
`;

const Major = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0 0 30px 0;
`;

// Contact and Highlight Wrapper
const ContactHighlightWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

// Contact Section
const ContactSection = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #ffb700;
  letter-spacing: -0.34px;
  margin: 0 0 16px 0;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLabel = styled.span`
  font-size: 17px;
  color: #b3b3b3;
  letter-spacing: -0.34px;
  min-width: 72px;
`;

const ContactValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  
  &.link {
    color: #858585;
    text-decoration: underline;
    word-break: break-all;
  }
`;

// Highlight Section
const HighlightSection = styled.div`
  flex: 1;
`;

const HighlightLabel = styled.p`
  font-size: 17px;
  color: #ffd000;
  letter-spacing: -0.34px;
  margin: 0 0 12px 0;
`;

const HighlightCard = styled.div`
  border: 1px solid #ffd000;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HighlightCompany = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.4px;
  margin: 0;
`;

const HighlightBadges = styled.div`
  display: flex;
  gap: 12px;
`;

const HighlightBadge = styled.span`
  padding: 8px 18px;
  background: #ffd000;
  border-radius: 100px;
  font-size: 17px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.34px;
`;

// Divider
const Divider = styled.div`
  height: 8px;
  background: rgba(217, 217, 217, 0.2);
  box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  margin: 0 -51px 40px;
`;

// Career Section
const CareerSection = styled.div`
  padding: 0 51px 40px;
`;

const CareerTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: black;
  letter-spacing: -0.52px;
  margin: 0 0 30px 0;
`;

const CareerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CareerItem = styled.div`
  position: relative;
  padding-left: 16px;
`;

const CareerBar = styled.div`
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 48px;
  background: #ffd000;
  border-radius: 200px;
`;

const CareerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;

const CareerCompany = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0;
`;

const CareerIndustryBadge = styled.span`
width: fit-content;
height: 24px;
  padding: 0px 12px;
  border: 1px solid #ffd000;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: #ffd000;
//   letter-spacing: -0.28px;
  background: white;
`;

const CareerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CareerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CareerPosition = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.34px;
`;

const CareerPeriod = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #b3b3b3;
  letter-spacing: -0.34px;
`;

// Types
interface CareerData {
  company: string;
  industry: string;
  position: string;
  period: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const careers: CareerData[] = [
    {
      company: 'KT ENA',
      industry: '방송영화',
      position: '편성기획 1팀',
      period: '2024.05 ~ 현재',
    },
    {
      company: '마이리얼트립',
      industry: '기타',
      position: '서비스 기획',
      period: '2022.05 ~ 2024.05 · 2년',
    },
    {
      company: '삼성전자',
      industry: '기타',
      position: 'DS사업부 경험기획팀',
      period: '2021.03 ~ 2022.08 · 1년 6개월',
    },
    {
      company: 'SM 엔터테인먼트',
      industry: '음악',
      position: '사업전략부 · 인턴',
      period: '2021.01 ~ 2021.02 · 2개월',
    },
  ];

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

  return (
    <>
 
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>프로필</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            {/* Hero */}
            <HeroSection />

            {/* Profile Info */}
            <ProfileSection>
              <ProfileImageWrapper>
                <img
                  src="data:image/svg+xml,%3Csvg width='173' height='173' viewBox='0 0 173 173' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='86.5' cy='86.5' r='86.5' fill='%23E5E5E5'/%3E%3Cpath d='M86.5 86.5C99.479 86.5 110 75.979 110 63C110 50.021 99.479 39.5 86.5 39.5C73.521 39.5 63 50.021 63 63C63 75.979 73.521 86.5 86.5 86.5Z' fill='%23999'/%3E%3Cpath d='M86.5 96.5C62.638 96.5 43.5 108.638 43.5 118.5V130H129.5V118.5C129.5 108.638 110.362 96.5 86.5 96.5Z' fill='%23999'/%3E%3C/svg%3E"
                  alt="Profile"
                />
              </ProfileImageWrapper>

              <ProfileNameGenerationWrapper>
                <ProfileName>
                  최현준
                 
                </ProfileName>
                <Generation>ENS 39기</Generation>
              </ProfileNameGenerationWrapper>

              <Major>20학번 국어국문학과 / 정보문화학</Major>

              {/* Contact and Highlight */}
              <ContactHighlightWrapper>
                {/* Contact */}
                <ContactSection>
                  <ContactTitle>Contact</ContactTitle>
                  <ContactRow>
                    <ContactLabel>연락처</ContactLabel>
                    <ContactValue>+82 010-1111-1111</ContactValue>
                  </ContactRow>
                  <ContactRow>
                    <ContactLabel>이메일</ContactLabel>
                    <ContactValue>snuenslove@gmail.com</ContactValue>
                  </ContactRow>
                  <ContactRow>
                    <ContactLabel>링크드인</ContactLabel>
                    <ContactValue className="link">
                      www.linkedin.com./in/lemontree-bb48Aab
                    </ContactValue>
                  </ContactRow>
                </ContactSection>

                {/* Highlight */}
                <HighlightSection>
                  <HighlightLabel>Highlight</HighlightLabel>
                  <HighlightCard>
                    <HighlightCompany>KT ENA</HighlightCompany>
                    <HighlightBadges>
                      <HighlightBadge>커피챗은 어려워요</HighlightBadge>
                      <HighlightBadge>해외 거주</HighlightBadge>
                    </HighlightBadges>
                  </HighlightCard>
                </HighlightSection>
              </ContactHighlightWrapper>
            </ProfileSection>

            {/* Divider */}
            <Divider />

            {/* Career */}
            <CareerSection>
              <CareerTitle>경력</CareerTitle>
              <CareerList>
                {careers.map((career, index) => (
                  <CareerItem key={index}>
                    <CareerBar />
                    <CareerHeader>
                      <CareerCompany>{career.company}</CareerCompany>
                      <CareerIndustryBadge>{career.industry}</CareerIndustryBadge>
                    </CareerHeader>
                    <CareerDetails>
                      <CareerRow>
                        <CareerPosition>{career.position}</CareerPosition>
                        <CareerPeriod>{career.period}</CareerPeriod>
                      </CareerRow>
                    </CareerDetails>
                  </CareerItem>
                ))}
              </CareerList>
            </CareerSection>
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
