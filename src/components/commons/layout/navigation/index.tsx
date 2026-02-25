import styled from "@emotion/styled";

// ─── ENS Intranet 하단 푸터 레이아웃 ─────────────────────────────

const FooterWrapper = styled.footer`
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
  padding: 40px 0;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  // justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  font-family: "Inter", "Noto Sans KR", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    padding: 0 20px;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  gap: 16px;
`;

const FooterLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffb700;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FooterRight = styled.div`
  text-align: left;


  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ContactTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ContactName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #1e1e1e;
`;

const ContactDetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactDivider = styled.span`
  color: #1e1e1e;
`;

export default function LayoutNavigation(): JSX.Element {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLeft>
          <FooterLogo>ENS</FooterLogo>
          <SocialIcons>
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z"
                  fill="black"
                />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z"
                  fill="black"
                />
              </svg>
            </SocialIcon>
          </SocialIcons>
        </FooterLeft>
        <FooterRight>
          <ContactTitle>Contact Us</ContactTitle>
  
          <ContactDetails>
            <span>서울대학교 문화산업 경영전략학회 ENS</span>
            <ContactDetailRow>
              <span>회장 김재연 010-6519-5758</span>
              <ContactDivider>|</ContactDivider>
              <span>E-mail. snuens@gmail.com</span>
            </ContactDetailRow>
          </ContactDetails>
        </FooterRight>
      </FooterInner>
    </FooterWrapper>
  );
}
