import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useForm, useFieldArray } from "react-hook-form";

import * as S from "./mypage.style";

import MessageModal from "../../modals/messageModal";
import ErrorModal from "../../modals/errorModal";
import CheckModal from "../../modals/checkModal";
import {
  FETCH_LOGIN_USER,
  FETCH_USER,
  UPDATE_USER,
  LOGOUT,
  FETCH_ALL_MAJORS,
  FETCH_ALL_INDUSTRIES,
  FETCH_ALL_POSITION_CATEGORIES,
} from "../../../../commons/apis/graphql-queries";
import { clearAccessToken } from "../../../../commons/libraries/token";
import {
  LoadingIcon,
  LoadingOverlay,
} from "../../../../commons/libraries/loadingOverlay";

interface MajorField {
  id: number;
  value: string;
  majorId?: string;
}

interface CareerField {
  id: number;
  isCurrentJob: boolean;
  isPrivate: boolean;
  company?: string;
  position?: string;
  industry?: string;
  industryId?: string;
  customIndustryName?: string;
  positionCategory?: string;
  positionCategoryId?: string;
  customPositionCategoryName?: string;
  joinYear?: number;
  joinMonth?: number;
  leaveYear?: number;
  leaveMonth?: number;
}

interface FormData {
  name: string;
  phone: string;
  emailLocal: string;
  emailDomain: string;
  linkedin: string;
  generation?: number;
  studentId?: number;
  majors: MajorField[];
  careers: CareerField[];
  adminNotes: string;
  noCoffeeChat: boolean;
  abroad: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function MyPage() {
  const router = useRouter();
  const targetUserId = router.query.userId as string | undefined;

  const apolloClient = useApolloClient();

  // 메시지 모달 상태 관리
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: "",
  });

  // 에러 모달 상태 관리
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: "",
  });

  // 이메일 입력 요구 모달 상태 관리
  const [emailRequiredModal, setEmailRequiredModal] = useState(false);

  // 로그아웃 중이면 마이페이지의 "이메일 필수" 네비게이션 차단을 스킵하기 위함
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 로그아웃 확인 모달
  const [logoutConfirmModalOpen, setLogoutConfirmModalOpen] = useState(false);

  // react-hook-form 초기화
  const { register, watch, setValue, reset, control, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        phone: "",
        emailLocal: "",
        emailDomain: "",
        linkedin: "",
        generation: undefined,
        studentId: undefined,
        majors: [{ id: 1, value: "" }],
        careers: [],
        adminNotes: "",
        noCoffeeChat: false,
        abroad: false,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  // Field arrays
  const {
    fields: majorFields,
    append: appendMajor,
    remove: removeMajor,
  } = useFieldArray({
    control,
    name: "majors",
  });

  const {
    fields: careerFields,
    append: appendCareer,
    remove: removeCareer,
  } = useFieldArray({
    control,
    name: "careers",
  });

  // Watch form values
  const formValues = watch();
  const generation = watch("generation");
  const studentId = watch("studentId");
  const emailDomain = watch("emailDomain");
  const majors = watch("majors");
  const careers = watch("careers");

  // 드롭다운 상태 관리
  const [isGenerationDropdownOpen, setIsGenerationDropdownOpen] =
    useState(false);
  const [isStudentIdDropdownOpen, setIsStudentIdDropdownOpen] = useState(false);
  const [isEmailDomainDropdownOpen, setIsEmailDomainDropdownOpen] =
    useState(false);

  // 전공 검색 상태 관리 (각 전공 필드별로 관리)
  const [majorSearchStates, setMajorSearchStates] = useState<
    Record<
      number,
      {
        searchQuery: string;
        isDropdownOpen: boolean;
        filteredMajors: Array<{ id: string; name: string }>;
      }
    >
  >({});

  // 기수 목록 생성 (40기부터 1기까지 역순)
  const generations = Array.from({ length: 40 }, (_, i) => 40 - i);

  // 학번 목록 생성 (2026부터 2019까지 역순)
  const studentIds = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

  // 이메일 도메인 목록
  const emailDomains = ["gmail.com", "naver.com", "기타"];

  // 전공, 산업군, 직무 카테고리 데이터 조회 (캐시 우선 사용)
  const { data: majorsData } = useQuery<{
    fetchAllMajors: Array<{ id: string; name: string; isCustom: boolean }>;
  }>(FETCH_ALL_MAJORS, {
    fetchPolicy: "cache-first", // 캐시 우선 사용, 없으면 네트워크 요청
  });
  const { data: industriesData } = useQuery<{
    fetchAllIndustries: Array<{ id: string; name: string; isCustom: boolean }>;
  }>(FETCH_ALL_INDUSTRIES, {
    fetchPolicy: "cache-first", // 캐시 우선 사용, 없으면 네트워크 요청
  });
  const { data: positionCategoriesData } = useQuery<{
    fetchAllPositionCategories: Array<{
      id: string;
      name: string;
      isCustom: boolean;
    }>;
  }>(FETCH_ALL_POSITION_CATEGORIES, {
    fetchPolicy: "cache-first", // 캐시 우선 사용, 없으면 네트워크 요청
  });

  // 전공 목록 (API에서 불러온 데이터)
  const majorList =
    majorsData?.fetchAllMajors?.map((major) => ({
      id: major.id,
      name: major.name,
    })) || [];

  // 산업군 목록 (API에서 불러온 데이터 + '기타')
  const industries = [
    ...(industriesData?.fetchAllIndustries?.map((ind) => ind.name) || []),
    "기타",
  ];

  // 직무 카테고리 목록 (API에서 불러온 데이터 + '기타')
  const positionCategories = [
    ...(positionCategoriesData?.fetchAllPositionCategories?.map(
      (pc) => pc.name
    ) || []),
    "기타",
  ];

  // 산업군 ID 매핑 (API에서 불러온 데이터로 동적 생성)
  const industryMap: { [key: string]: string } = {};
  industriesData?.fetchAllIndustries?.forEach((industry) => {
    industryMap[industry.name] = industry.id;
  });

  // 직무 카테고리 ID 매핑 (API에서 불러온 데이터로 동적 생성)
  const positionCategoryMap: { [key: string]: string } = {};
  positionCategoriesData?.fetchAllPositionCategories?.forEach((pc) => {
    positionCategoryMap[pc.name] = pc.id;
  });

  // 이메일 도메인 드롭다운 토글
  const handleToggleEmailDomainDropdown = () => {
    setIsEmailDomainDropdownOpen(!isEmailDomainDropdownOpen);
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setCareerDropdownStates({});
  };

  // 이메일 도메인 직접 입력 모드 상태
  const [isEmailDomainCustom, setIsEmailDomainCustom] = useState(false);

  // 이메일 도메인 선택
  const handleSelectEmailDomain = (domain: string) => {
    if (domain === "기타") {
      setValue("emailDomain", ""); // 빈 값으로 설정
      setIsEmailDomainCustom(true); // 직접 입력 모드 활성화
    } else {
      setValue("emailDomain", domain);
      setIsEmailDomainCustom(false); // 직접 입력 모드 비활성화
    }
    setIsEmailDomainDropdownOpen(false);
  };

  // 기수 드롭다운 토글
  const handleToggleGenerationDropdown = () => {
    setIsGenerationDropdownOpen(!isGenerationDropdownOpen);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates({});
  };

  // 학번 드롭다운 토글
  const handleToggleStudentIdDropdown = () => {
    setIsStudentIdDropdownOpen(!isStudentIdDropdownOpen);
    setIsGenerationDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates({});
  };

  // 로그인한 유저 데이터 조회 (항상 실행하여 role 확인)
  const { data: loginUserData, loading: loginLoading } =
    useQuery(FETCH_LOGIN_USER);

  // 사용자 데이터 조회 (userId가 있으면 해당 유저)
  const { data: userData, loading: userLoading } = useQuery(FETCH_USER, {
    variables: { userId: targetUserId || "" },
    skip: !targetUserId, // userId가 없으면 이 쿼리는 실행하지 않음
  });

  // 데이터 통합
  const data = targetUserId ? userData : loginUserData;
  const loading = targetUserId ? userLoading : loginLoading;
  const user = targetUserId ? data?.fetchUser : data?.fetchLoginUser;

  // 로그인한 유저가 ADMIN인지 확인
  const isAdmin = loginUserData?.fetchLoginUser?.role === "ADMIN";

  // updateUser mutation
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      targetUserId
        ? { query: FETCH_USER, variables: { userId: targetUserId } }
        : { query: FETCH_LOGIN_USER },
      { query: FETCH_ALL_MAJORS },
      { query: FETCH_ALL_INDUSTRIES },
      { query: FETCH_ALL_POSITION_CATEGORIES },
    ], // 업데이트 후 데이터 다시 불러오기
  });

  // logout mutation (서버 블랙리스트 기록용)
  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setLogoutConfirmModalOpen(false);
    setIsLoggingOut(true);
    setEmailRequiredModal(false);

    try {
      await logoutMutation();
    } catch (error) {
      // 서버 로그아웃(블랙리스트 저장) 실패해도, 클라이언트 상태 제거는 진행
      console.warn("logout mutation failed:", error);
    } finally {
      clearAccessToken();
      apolloClient.clearStore();
      router.push("/");
    }
  };

  // 이메일이 없으면 페이지를 벗어날 수 없도록 처리
  useEffect(() => {
    if (isLoggingOut) return;

    // 관리자가 다른 유저를 수정하는 경우에는 제한하지 않음
    if (targetUserId) {
      return;
    }

    // 로그인 상태 확인: 로그인된 유저가 아니면 제한하지 않음
    const isLoggedIn =
      loginUserData?.fetchLoginUser !== undefined && !loginLoading;
    if (!isLoggedIn) {
      return;
    }

    const emailLocal = formValues.emailLocal;
    const emailDomain = formValues.emailDomain;

    // 이메일 완성 여부 확인
    const hasEmail =
      emailLocal && emailDomain && emailLocal.trim() && emailDomain.trim();

    // 로그인된 유저이고 이메일이 없으면 페이지 이탈 방지
    const shouldPreventNavigation = !hasEmail;

    if (shouldPreventNavigation) {
      // 브라우저 이탈 방지 (beforeunload는 브라우저 기본 메시지만 표시)
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        // 최신 브라우저에서는 returnValue 설정이 deprecated되었으므로 제거
        // 브라우저가 자동으로 확인 메시지를 표시합니다
      };

      // Next.js 라우터 이탈 방지
      const handleRouteChangeStart = (url: string) => {
        if (url !== router.asPath) {
          // 모달 표시
          setEmailRequiredModal(true);
          // routeChangeError 이벤트 emit하여 라우트 변경 취소
          router.events.emit(
            "routeChangeError",
            new Error("Route change aborted"),
            url
          );
        }
      };

      // routeChangeError 이벤트 핸들러 추가 (에러를 조용히 처리)
      const handleRouteChangeError = (err: Error, url: string) => {
        // 에러를 조용히 처리 (콘솔에 표시하지 않음)
        if (err.message === "Route change aborted") {
          // 의도적으로 취소한 경우이므로 에러 무시
          return;
        }
      };

      // 뒤로가기 버튼 처리
      const handlePopState = (e: PopStateEvent) => {
        // 모달이 이미 열려있으면 추가 처리 없음
        if (emailRequiredModal) {
          return;
        }
        // 현재 상태를 다시 push하여 뒤로가기 취소
        window.history.pushState(null, "", router.asPath);
        setEmailRequiredModal(true);
      };

      // history에 상태 추가하여 popstate 이벤트 감지 가능하게 함
      // 이미 상태가 추가되어 있지 않은 경우에만 추가
      if (!window.history.state) {
        window.history.pushState({ preventBack: true }, "", router.asPath);
      }

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);
      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.on("routeChangeError", handleRouteChangeError);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
        router.events.off("routeChangeStart", handleRouteChangeStart);
        router.events.off("routeChangeError", handleRouteChangeError);
      };
    }
  }, [
    formValues.emailLocal,
    formValues.emailDomain,
    targetUserId,
    router,
    loginUserData,
    loginLoading,
    emailRequiredModal,
    isLoggingOut,
  ]);

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (user) {
      // 이메일 분리
      let emailLocal = "";
      let emailDomain = "";
      let isCustomDomain = false;
      if (user.email) {
        const emailParts = user.email.split("@");
        if (emailParts.length === 2) {
          emailLocal = emailParts[0];
          emailDomain = emailParts[1];
          // gmail.com이나 naver.com이 아닌 경우 커스텀 도메인으로 처리
          if (emailDomain !== "gmail.com" && emailDomain !== "naver.com") {
            isCustomDomain = true;
          }
        }
      }
      setIsEmailDomainCustom(isCustomDomain);

      // 전공 정보
      let majorsData: MajorField[] = [];
      if (user.userMajors && user.userMajors.length > 0) {
        const sortedMajors = [...user.userMajors].sort(
          (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
        );
        majorsData = sortedMajors.map((um, index) => {
          const majorId = index + 1;
          const majorName = um.major.name;
          // 전공 목록에서 ID 찾기 (API 데이터 사용)
          const majorFromList = majorList.find((m) => m.name === majorName);
          // 전공 검색 상태 초기화
          setMajorSearchStates((prev) => ({
            ...prev,
            [majorId]: {
              searchQuery: majorName,
              isDropdownOpen: false,
              filteredMajors: majorList,
            },
          }));
          return {
            id: majorId,
            value: majorName,
            majorId: majorFromList?.id || um.major.id, // API에서 받은 ID 우선 사용
          };
        });
      } else {
        majorsData = [{ id: 1, value: "" }];
        // 첫 번째 전공 필드의 검색 상태 초기화
        setMajorSearchStates((prev) => ({
          ...prev,
          [1]: {
            searchQuery: "",
            isDropdownOpen: false,
            filteredMajors: majorList,
          },
        }));
      }

      // 경력 정보
      let careersData: CareerField[] = [];
      if (user.careers && user.careers.length > 0) {
        careersData = user.careers.map((career, index) => {
          const startDate = career.startDate
            ? new Date(career.startDate)
            : null;
          const endDate = career.endDate ? new Date(career.endDate) : null;

          // 산업군 처리: 백엔드에서 받은 데이터는 ID를 사용
          // 사용자가 '직접 입력'을 선택한 경우에만 custom 필드 사용
          let industryName = career.industry?.name;
          let customIndustryName: string | undefined = undefined;
          // 백엔드에서 받은 커스텀 데이터는 ID가 있으므로 ID 사용
          // 사용자가 '직접 입력'을 선택한 경우에만 '기타'로 표시하고 custom 필드 사용

          // 직무 카테고리 처리: 백엔드에서 받은 데이터는 ID를 사용
          let positionCategoryName = career.positionCategory?.name;
          let customPositionCategoryName: string | undefined = undefined;

          return {
            id: index + 1,
            isCurrentJob: career.isCurrent || false,
            isPrivate: career.adminOnly || false,
            company: career.company || "",
            position: career.position || "",
            industry: industryName,
            industryId: career.industry?.id, // 백엔드에서 받은 ID 사용
            customIndustryName: customIndustryName, // 초기에는 undefined, 사용자가 직접 입력한 경우에만 값 설정
            positionCategory: positionCategoryName,
            positionCategoryId: career.positionCategory?.id, // 백엔드에서 받은 ID 사용
            customPositionCategoryName: customPositionCategoryName, // 초기에는 undefined, 사용자가 직접 입력한 경우에만 값 설정
            joinYear: startDate ? startDate.getFullYear() : undefined,
            joinMonth: startDate ? startDate.getMonth() + 1 : undefined,
            leaveYear: endDate ? endDate.getFullYear() : undefined,
            leaveMonth: endDate ? endDate.getMonth() + 1 : undefined,
          };
        });
      }

      // 폼 데이터 리셋
      reset({
        name: user.name || "",
        phone: user.phone || "",
        emailLocal,
        emailDomain,
        linkedin: user.linkedin || "",
        generation: user.generation,
        studentId: user.entrance,
        majors: majorsData,
        careers: careersData,
        adminNotes: user.memo || "",
        noCoffeeChat: user.noCoffeeChat || false,
        abroad: user.abroad || false,
      });
    }
  }, [user, reset, targetUserId]);

  // 기수 선택
  const handleSelectGeneration = (gen: number) => {
    setValue("generation", gen);
    setIsGenerationDropdownOpen(false);
  };

  // 학번 선택
  const handleSelectStudentId = (id: number) => {
    setValue("studentId", id);
    setIsStudentIdDropdownOpen(false);
  };

  // 경력 드롭다운 상태 관리 (각 경력별로 관리)
  const [careerDropdownStates, setCareerDropdownStates] = useState<
    Record<
      number,
      {
        isIndustryDropdownOpen?: boolean;
        isPositionDropdownOpen?: boolean;
        isDatePickerOpen?: boolean;
        isYearDropdownOpen?: boolean;
        isMonthDropdownOpen?: boolean;
        isLeaveDatePickerOpen?: boolean;
        isLeaveYearDropdownOpen?: boolean;
        isLeaveMonthDropdownOpen?: boolean;
      }
    >
  >({});

  // 전공 필드 추가 함수
  const handleAddMajor = () => {
    const newId =
      majorFields.length > 0
        ? Math.max(...majorFields.map((_, idx) => majors[idx]?.id || idx + 1)) +
          1
        : 1;
    appendMajor({ id: newId, value: "" });
    // 새 전공 필드의 검색 상태 초기화
    setMajorSearchStates((prev) => ({
      ...prev,
      [newId]: {
        searchQuery: "",
        isDropdownOpen: false,
        filteredMajors: majorList,
      },
    }));
  };

  // 전공 검색 핸들러
  const handleMajorSearch = (
    majorIndex: number,
    fieldId: number,
    query: string
  ) => {
    const filtered = majorList.filter((major) =>
      major.name.toLowerCase().includes(query.toLowerCase())
    );

    setMajorSearchStates((prev) => ({
      ...prev,
      [fieldId]: {
        searchQuery: query,
        isDropdownOpen: query.length > 0 && filtered.length > 0,
        filteredMajors: filtered,
      },
    }));

    setValue(`majors.${majorIndex}.value`, query);
  };

  // 전공 선택 핸들러
  const handleSelectMajor = (
    majorIndex: number,
    fieldId: number,
    major: { id: string; name: string }
  ) => {
    setValue(`majors.${majorIndex}.value`, major.name);
    setValue(`majors.${majorIndex}.majorId`, major.id);
    setMajorSearchStates((prev) => ({
      ...prev,
      [fieldId]: {
        searchQuery: major.name,
        isDropdownOpen: false,
        filteredMajors: majorList,
      },
    }));
  };

  // 전공 입력 필드 포커스 핸들러
  const handleMajorInputFocus = (
    majorIndex: number,
    fieldId: number,
    currentValue: string
  ) => {
    const filtered = majorList.filter((major) =>
      major.name.toLowerCase().includes(currentValue.toLowerCase())
    );

    setMajorSearchStates((prev) => ({
      ...prev,
      [fieldId]: {
        searchQuery: currentValue,
        isDropdownOpen: currentValue.length > 0 && filtered.length > 0,
        filteredMajors: filtered,
      },
    }));
  };

  // 전공 검색어 하이라이트 함수
  const highlightMajorText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} style={{ color: "#ffb700", fontWeight: 600 }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // 경력 추가 함수
  const handleAddCareer = () => {
    const newId =
      careerFields.length > 0
        ? Math.max(
            ...careerFields.map((_, idx) => careers[idx]?.id || idx + 1)
          ) + 1
        : 1;
    appendCareer({
      id: newId,
      isCurrentJob: false,
      isPrivate: false,
      company: "",
      position: "",
      industry: undefined,
      positionCategory: undefined,
      joinYear: undefined,
      joinMonth: undefined,
      leaveYear: undefined,
      leaveMonth: undefined,
    });
    setCareerDropdownStates((prev) => ({
      ...prev,
      [newId]: {
        isIndustryDropdownOpen: false,
        isPositionDropdownOpen: false,
        isDatePickerOpen: false,
        isYearDropdownOpen: false,
        isMonthDropdownOpen: false,
        isLeaveDatePickerOpen: false,
        isLeaveYearDropdownOpen: false,
        isLeaveMonthDropdownOpen: false,
      },
    }));
  };

  // 산업군 드롭다운 토글
  const handleToggleIndustryDropdown = (careerIndex: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[Number(key)] = {
          ...newState[Number(key)],
          isIndustryDropdownOpen: false,
          isPositionDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      });
      newState[careerIndex] = {
        ...newState[careerIndex],
        isIndustryDropdownOpen: !newState[careerIndex]?.isIndustryDropdownOpen,
      };
      return newState;
    });
  };

  // 산업군 선택
  const handleSelectIndustry = (careerIndex: number, industry: string) => {
    setValue(`careers.${careerIndex}.industry`, industry);
    // '기타'가 아닌 경우 ID 설정
    if (industry !== "기타") {
      const industryId = industryMap[industry];
      if (industryId) {
        setValue(`careers.${careerIndex}.industryId`, industryId);
      }
    } else {
      // '기타'인 경우 ID 제거
      setValue(`careers.${careerIndex}.industryId`, undefined);
    }
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: { ...prev[careerIndex], isIndustryDropdownOpen: false },
    }));
  };

  // 직무 카테고리 드롭다운 토글
  const handleTogglePositionDropdown = (careerIndex: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[Number(key)] = {
          ...newState[Number(key)],
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      });
      newState[careerIndex] = {
        ...newState[careerIndex],
        isPositionDropdownOpen: !newState[careerIndex]?.isPositionDropdownOpen,
      };
      return newState;
    });
  };

  // 직무 카테고리 선택
  const handleSelectPosition = (
    careerIndex: number,
    positionCategory: string
  ) => {
    setValue(`careers.${careerIndex}.positionCategory`, positionCategory);
    // '기타'가 아닌 경우 ID 설정
    if (positionCategory !== "기타") {
      const positionCategoryId = positionCategoryMap[positionCategory];
      if (positionCategoryId) {
        setValue(
          `careers.${careerIndex}.positionCategoryId`,
          positionCategoryId
        );
      }
    } else {
      // '기타'인 경우 ID 제거
      setValue(`careers.${careerIndex}.positionCategoryId`, undefined);
    }
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: { ...prev[careerIndex], isPositionDropdownOpen: false },
    }));
  };

  // 연도 목록 생성 (현재 연도부터 50년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

  // 월 목록 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 날짜 선택기 열기/닫기
  const handleToggleDatePicker = (careerIndex: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[Number(key)] = {
          ...newState[Number(key)],
          isDatePickerOpen: false,
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      });
      newState[careerIndex] = {
        ...newState[careerIndex],
        isDatePickerOpen: !newState[careerIndex]?.isDatePickerOpen,
      };
      return newState;
    });
  };

  // 연도 드롭다운 토글
  const handleToggleYearDropdown = (careerIndex: number) => {
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: {
        ...prev[careerIndex],
        isYearDropdownOpen: !prev[careerIndex]?.isYearDropdownOpen,
        isMonthDropdownOpen: false,
      },
    }));
  };

  // 월 드롭다운 토글
  const handleToggleMonthDropdown = (careerIndex: number) => {
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: {
        ...prev[careerIndex],
        isMonthDropdownOpen: !prev[careerIndex]?.isMonthDropdownOpen,
        isYearDropdownOpen: false,
      },
    }));
  };

  // 연도 선택
  const handleSelectYear = (careerIndex: number, year: number) => {
    setValue(`careers.${careerIndex}.joinYear`, year);
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: { ...prev[careerIndex], isYearDropdownOpen: false },
    }));
  };

  // 월 선택
  const handleSelectMonth = (careerIndex: number, month: number) => {
    setValue(`careers.${careerIndex}.joinMonth`, month);
    const currentCareer = careers[careerIndex];
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: {
        ...prev[careerIndex],
        isMonthDropdownOpen: false,
        isDatePickerOpen:
          currentCareer?.joinYear && month
            ? false
            : prev[careerIndex]?.isDatePickerOpen,
      },
    }));
  };

  // 퇴사년월 날짜 선택기 열기/닫기
  const handleToggleLeaveDatePicker = (careerIndex: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareerDropdownStates((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[Number(key)] = {
          ...newState[Number(key)],
          isLeaveDatePickerOpen: false,
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      });
      newState[careerIndex] = {
        ...newState[careerIndex],
        isLeaveDatePickerOpen: !newState[careerIndex]?.isLeaveDatePickerOpen,
      };
      return newState;
    });
  };

  // 퇴사년월 연도 드롭다운 토글
  const handleToggleLeaveYearDropdown = (careerIndex: number) => {
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: {
        ...prev[careerIndex],
        isLeaveYearDropdownOpen: !prev[careerIndex]?.isLeaveYearDropdownOpen,
        isLeaveMonthDropdownOpen: false,
      },
    }));
  };

  // 퇴사년월 월 드롭다운 토글
  const handleToggleLeaveMonthDropdown = (careerIndex: number) => {
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: {
        ...prev[careerIndex],
        isLeaveMonthDropdownOpen: !prev[careerIndex]?.isLeaveMonthDropdownOpen,
        isLeaveYearDropdownOpen: false,
      },
    }));
  };

  // 입사년월과 퇴사년월 유효성 검사
  const validateLeaveDate = (
    joinYear?: number,
    joinMonth?: number,
    leaveYear?: number,
    leaveMonth?: number
  ): boolean => {
    if (!joinYear || !joinMonth || !leaveYear || !leaveMonth) {
      return true; // 둘 중 하나라도 선택되지 않았으면 유효
    }

    // 연도 비교
    if (leaveYear < joinYear) {
      return false; // 퇴사년이 입사년보다 빠름
    }

    if (leaveYear > joinYear) {
      return true; // 퇴사년이 입사년보다 늦음
    }

    // 같은 연도인 경우 월 비교
    return leaveMonth >= joinMonth; // 같은 달이거나 늦은 달이면 유효
  };

  // 퇴사년월 연도 선택
  const handleSelectLeaveYear = (careerIndex: number, year: number) => {
    setValue(`careers.${careerIndex}.leaveYear`, year);
    setCareerDropdownStates((prev) => ({
      ...prev,
      [careerIndex]: { ...prev[careerIndex], isLeaveYearDropdownOpen: false },
    }));
  };

  // 퇴사년월 월 선택
  const handleSelectLeaveMonth = (careerIndex: number, month: number) => {
    setValue(`careers.${careerIndex}.leaveMonth`, month);
    const currentCareer = careers[careerIndex];
    const updatedLeaveYear = currentCareer?.leaveYear;

    if (updatedLeaveYear && month) {
      setCareerDropdownStates((prev) => ({
        ...prev,
        [careerIndex]: {
          ...prev[careerIndex],
          isLeaveMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
        },
      }));

      // 유효성 검사
      if (currentCareer?.joinYear && currentCareer?.joinMonth) {
        const isValid = validateLeaveDate(
          currentCareer.joinYear,
          currentCareer.joinMonth,
          updatedLeaveYear,
          month
        );

        if (!isValid) {
          setMessageModal({
            isOpen: true,
            message: "퇴사년월이 입사년월보다 빠릅니다",
          });
        }
      }
    } else {
      setCareerDropdownStates((prev) => ({
        ...prev,
        [careerIndex]: {
          ...prev[careerIndex],
          isLeaveMonthDropdownOpen: false,
        },
      }));
    }
  };

  // 운영진에게만 공개 체크박스 토글
  const handleTogglePrivate = (careerIndex: number) => {
    const currentValue = careers[careerIndex]?.isPrivate || false;
    setValue(`careers.${careerIndex}.isPrivate`, !currentValue);
  };

  // 재직 중 체크박스 토글
  const handleToggleCurrentJob = (careerIndex: number) => {
    const currentValue = careers[careerIndex]?.isCurrentJob || false;
    setValue(`careers.${careerIndex}.isCurrentJob`, !currentValue);
  };

  // 상태 표시 버튼 토글
  const handleToggleCoffeeChat = () => {
    const currentValue = watch("noCoffeeChat");
    setValue("noCoffeeChat", !currentValue);
  };

  const handleToggleOverseas = () => {
    const currentValue = watch("abroad");
    setValue("abroad", !currentValue);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // 클릭된 요소가 드롭다운 관련 요소인지 확인
      const isDropdownElement =
        target.closest("[data-dropdown-container]") ||
        target.closest("[data-dropdown-item]") ||
        target.closest("[data-dropdown-field]") ||
        target.closest("[data-date-picker]") ||
        target.closest("[data-year-selector]") ||
        target.closest("[data-month-selector]") ||
        target.closest("[data-major-search]");

      // 드롭다운 관련 요소가 아니면 모든 드롭다운 닫기
      if (!isDropdownElement) {
        setCareerDropdownStates({});
        setIsGenerationDropdownOpen(false);
        setIsStudentIdDropdownOpen(false);
        setIsEmailDomainDropdownOpen(false);
        // 전공 검색 드롭다운 닫기
        setMajorSearchStates((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((key) => {
            newState[Number(key)] = {
              ...newState[Number(key)],
              isDropdownOpen: false,
            };
          });
          return newState;
        });
      }
    };

    // 드롭다운이 열려있는지 확인
    const hasOpenDropdown =
      Object.values(careerDropdownStates).some(
        (state) =>
          state?.isIndustryDropdownOpen ||
          state?.isPositionDropdownOpen ||
          state?.isDatePickerOpen ||
          state?.isYearDropdownOpen ||
          state?.isMonthDropdownOpen ||
          state?.isLeaveDatePickerOpen ||
          state?.isLeaveYearDropdownOpen ||
          state?.isLeaveMonthDropdownOpen
      ) ||
      isGenerationDropdownOpen ||
      isStudentIdDropdownOpen ||
      isEmailDomainDropdownOpen;

    if (hasOpenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    careerDropdownStates,
    isGenerationDropdownOpen,
    isStudentIdDropdownOpen,
    isEmailDomainDropdownOpen,
  ]);

  // 폼 데이터를 백엔드 형식으로 변환
  const transformFormDataToUpdateInput = (formData: FormData) => {
    if (!user) return null;

    // 이메일 합치기
    const email =
      formData.emailLocal && formData.emailDomain
        ? `${formData.emailLocal}@${formData.emailDomain}`
        : user.email;

    // 전공 데이터 변환
    const userMajors = formData.majors
      .filter((major) => major.value && major.value.trim())
      .map((major, index) => {
        const majorName = major.value.trim();
        // 전공 목록에서 찾기
        const majorFromList = majorList.find((m) => m.name === majorName);

        // 전공 목록에 있으면 majorId 사용, 없으면 customMajorName 사용
        if (majorFromList || major.majorId) {
          return {
            majorId: major.majorId || majorFromList?.id,
            isPrimary: index === 0,
          };
        } else {
          return {
            customMajorName: majorName,
            isPrimary: index === 0,
          };
        }
      });

    // 경력 데이터 변환
    const careers = formData.careers
      .filter(
        (career) =>
          career.company &&
          career.company.trim() &&
          career.position &&
          career.position.trim()
      )
      .map((career) => {
        // 입사년월을 ISO 문자열로 변환
        let startDate: string | undefined;
        if (career.joinYear && career.joinMonth) {
          const date = new Date(career.joinYear, career.joinMonth - 1, 1);
          startDate = date.toISOString();
        }

        // 퇴사년월을 ISO 문자열로 변환
        let endDate: string | undefined;
        if (!career.isCurrentJob && career.leaveYear && career.leaveMonth) {
          const date = new Date(career.leaveYear, career.leaveMonth - 1, 1);
          endDate = date.toISOString();
        }

        // 직무 카테고리 처리
        let positionCategoryId: string | null = null;
        let customPositionCategoryName: string | null = null;
        if (career.positionCategory) {
          if (
            career.positionCategory === "기타" &&
            career.customPositionCategoryName
          ) {
            // 사용자가 '직접 입력'을 선택하고 커스텀 이름을 입력한 경우
            customPositionCategoryName =
              career.customPositionCategoryName.trim() || null;
          } else if (career.positionCategoryId) {
            // 백엔드에서 받은 ID가 있는 경우 (커스텀 데이터 포함)
            positionCategoryId = career.positionCategoryId;
          } else if (career.positionCategory !== "기타") {
            // 드롭다운에서 선택한 경우 ID 매핑에서 찾기
            positionCategoryId =
              positionCategoryMap[career.positionCategory] || null;
          }
        }

        // 산업군 처리
        let industryId: string | null = null;
        let customIndustryName: string | null = null;
        if (career.industry) {
          if (career.industry === "기타" && career.customIndustryName) {
            // 사용자가 '직접 입력'을 선택하고 커스텀 이름을 입력한 경우
            customIndustryName = career.customIndustryName.trim() || null;
          } else if (career.industryId) {
            // 백엔드에서 받은 ID가 있는 경우 (커스텀 데이터 포함)
            industryId = career.industryId;
          } else if (career.industry !== "기타") {
            // 드롭다운에서 선택한 경우 ID 매핑에서 찾기
            industryId = industryMap[career.industry] || null;
          }
        }

        return {
          company: career.company!.trim(),
          position: career.position!.trim(),
          positionCategoryId: positionCategoryId,
          customPositionCategoryName: customPositionCategoryName,
          industryId: industryId,
          customIndustryName: customIndustryName,
          startDate: startDate || null,
          endDate: endDate || null,
          isCurrent: career.isCurrentJob || false,
          adminOnly: career.isPrivate || false,
          userId: user.id,
        };
      });

    // 비밀번호 변경 처리
    let passwordData: { currentPassword?: string; password?: string } = {};
    if (formData.newPassword && formData.newPassword.trim()) {
      // 새 비밀번호가 입력된 경우
      if (!formData.currentPassword || !formData.currentPassword.trim()) {
        throw new Error("기존 비밀번호를 입력해주세요.");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      }
      passwordData = {
        currentPassword: formData.currentPassword.trim(),
        password: formData.newPassword.trim(),
      };
    }

    return {
      name: formData.name || undefined,
      phone: formData.phone || undefined,
      email: email || undefined,
      generation: formData.generation || undefined,
      entrance: formData.studentId || undefined,
      linkedin: formData.linkedin || undefined,
      noCoffeeChat: formData.noCoffeeChat || false,
      abroad: formData.abroad || false,
      memo: formData.adminNotes || undefined,
      userMajors: userMajors.length > 0 ? userMajors : undefined,
      careers: careers.length > 0 ? careers : undefined,
      ...passwordData,
    };
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    const formData = watch();

    if (!user) {
      setErrorModal({
        isOpen: true,
        message: "사용자 정보를 불러올 수 없습니다.",
      });
      return;
    }

    // 관리자가 다른 유저를 수정하는 경우에는 이메일 검증 스킵
    if (!targetUserId) {
      // 이메일 검증
      const emailLocal = formData.emailLocal;
      const emailDomain = formData.emailDomain;
      const hasEmail =
        emailLocal && emailDomain && emailLocal.trim() && emailDomain.trim();

      if (!hasEmail) {
        setEmailRequiredModal(true);
        return;
      }
    }

    let updateInput;
    try {
      updateInput = transformFormDataToUpdateInput(formData);
    } catch (error: any) {
      setErrorModal({
        isOpen: true,
        message: error.message || "데이터 변환 중 오류가 발생했습니다.",
      });
      return;
    }

    if (!updateInput) {
      setErrorModal({
        isOpen: true,
        message: "데이터 변환 중 오류가 발생했습니다.",
      });
      return;
    }

    // 콘솔에 전송할 데이터 출력
    console.log("===== 백엔드로 전송할 데이터 =====");
    console.log("userId:", user.id);
    console.log("updateUserInput:", JSON.stringify(updateInput, null, 2));
    console.log("===================================");

    try {
      const result = await updateUser({
        variables: {
          userId: user.id,
          updateUserInput: updateInput,
        },
      });

      // 콘솔에 응답 결과 출력
      console.log("===== 백엔드 응답 결과 =====");
      console.log("result:", JSON.stringify(result, null, 2));
      console.log("===========================");

      // GraphQL 에러 확인
      if (result.errors && result.errors.length > 0) {
        const errorMessage =
          result.errors[0].message || "변경사항 저장 중 오류가 발생했습니다.";
        setErrorModal({
          isOpen: true,
          message: errorMessage,
        });
        return;
      }

      // 데이터가 null인 경우도 에러로 처리
      if (!result.data || !result.data.updateUser) {
        setErrorModal({
          isOpen: true,
          message: "변경사항 저장 중 오류가 발생했습니다.",
        });
        return;
      }

      // 성공 시에만 성공 메시지 표시
      setMessageModal({
        isOpen: true,
        message: "변경사항이 저장되었습니다.",
      });

      // 비밀번호 변경 필드 초기화
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    } catch (error: any) {
      console.error("업데이트 오류:", error);
      const errorMessage =
        error.message ||
        (error.graphQLErrors && error.graphQLErrors[0]?.message) ||
        "변경사항 저장 중 오류가 발생했습니다.";
      setErrorModal({
        isOpen: true,
        message: errorMessage,
      });
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.Hero>
          <S.HeroTitle>
            {targetUserId ? "학회원 정보 수정" : "마이페이지 · 내 정보 수정"}
          </S.HeroTitle>
        </S.Hero>
        <div style={{ padding: "40px", textAlign: "center" }}>로딩 중...</div>
      </S.Container>
    );
  }

  return (
    <>
      <LoadingOverlay visible={logoutLoading || isLoggingOut}>
        <LoadingIcon spin fontSize={48} />
      </LoadingOverlay>
      <S.Container>
        {/* Hero */}
        <S.Hero>
          <S.HeroTitle>
            {targetUserId ? "학회원 정보 수정" : "마이페이지 · 내 정보 수정"}
          </S.HeroTitle>
        </S.Hero>

        {/* 기본 인적 정보 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitleAndNoteWrapper>
              <S.SectionTitle>기본 인적 정보</S.SectionTitle>
              <S.RequiredNote>은 필수 입력 항목입니다</S.RequiredNote>
            </S.SectionTitleAndNoteWrapper>
            <S.LogoutButton
              onClick={() => setLogoutConfirmModalOpen(true)}
              disabled={logoutLoading || isLoggingOut}
              type="button"
            >
              {logoutLoading || isLoggingOut ? "로그아웃 중..." : "로그아웃"}
            </S.LogoutButton>
          </S.SectionHeader>

          {/* <S.ProfileSection>
            <S.ProfileImageWrapper>
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <S.ProfileImage />
              )}
              <S.CameraButton>
                <svg viewBox="0 0 15 15" fill="none">
                  <path
                    d="M13.5 3.5H11.25L10.5 2H6L5.25 3.5H3C2.175 3.5 1.5 4.175 1.5 5V12C1.5 12.825 2.175 13.5 3 13.5H13.5C14.325 13.5 15 12.825 15 12V5C15 4.175 14.325 3.5 13.5 3.5ZM8.25 11.5C6.45 11.5 5 10.05 5 8.25C5 6.45 6.45 5 8.25 5C10.05 5 11.5 6.45 11.5 8.25C11.5 10.05 10.05 11.5 8.25 11.5Z"
                    fill="black"
                  />
                </svg>
              </S.CameraButton>
            </S.ProfileImageWrapper>

            <S.ProfileInfo>
              <S.StatusLabel>상태 표시</S.StatusLabel>
              <S.StatusBadges>
                <S.StatusBadge
                  active={watch("noCoffeeChat")}
                  onClick={handleToggleCoffeeChat}
                >
                  커피챗은 어려워요
                </S.StatusBadge>
                <S.StatusBadge
                  active={watch("abroad")}
                  onClick={handleToggleOverseas}
                >
                  해외 거주 중
                </S.StatusBadge>
              </S.StatusBadges>
            </S.ProfileInfo>
          </S.ProfileSection> */}

          {/* 이름 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">이름</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input
                type="text"
                placeholder="이름을 입력하세요"
                {...register("name")}
              />
            </S.FormInputWrapper>
          </S.FormField>

          {/* 비밀번호 변경 - 본인 정보 수정 시에만 표시 */}
          {!targetUserId && (
            <S.FormField>
              <S.FormLabelWrapper>
                <S.FormLabel>비밀번호 변경</S.FormLabel>
              </S.FormLabelWrapper>
              <S.FormInputWrapper>
                <S.Input
                  type="password"
                  placeholder="기존 비밀번호 입력"
                  {...register("currentPassword")}
                />
                <div>
                  <S.Input
                    type="password"
                    placeholder="비밀번호를 변경하는 경우 입력하세요"
                    {...register("newPassword")}
                  />
                  <S.InputHelper>
                    8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.
                  </S.InputHelper>
                </div>
                <S.Input
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register("confirmPassword")}
                />
              </S.FormInputWrapper>
            </S.FormField>
          )}
          <S.ProfileInfo>
            <S.FormLabel>상태 표시</S.FormLabel>
            <S.StatusBadges>
              <S.StatusBadge
                active={watch("noCoffeeChat")}
                onClick={handleToggleCoffeeChat}
              >
                커피챗은 어려워요
              </S.StatusBadge>
              <S.StatusBadge
                active={watch("abroad")}
                onClick={handleToggleOverseas}
              >
                해외 거주 중
              </S.StatusBadge>
            </S.StatusBadges>
          </S.ProfileInfo>
        </S.Section>

        <S.Divider />

        {/* 학적 정보 */}
        <S.Section>
          {/* 기수 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">기수</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.GenerationSelectField
                isClickable={true}
                onClick={handleToggleGenerationDropdown}
                data-dropdown-field
              >
                {generation ? (
                  <S.GenerationValue>{generation}기</S.GenerationValue>
                ) : (
                  <S.GenerationPlaceholder>
                    기수를 선택하세요
                  </S.GenerationPlaceholder>
                )}
                <S.DropdownIcon style={{ position: "absolute", right: "18px" }}>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path
                      d="M1 1L7.5 9L14 1"
                      stroke="#999999"
                      strokeWidth="2"
                    />
                  </svg>
                </S.DropdownIcon>
                {isGenerationDropdownOpen && (
                  <S.IndustryDropdown data-dropdown-container>
                    {generations.map((gen) => (
                      <S.IndustryDropdownItem
                        key={gen}
                        data-dropdown-item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectGeneration(gen);
                        }}
                      >
                        {gen}기
                      </S.IndustryDropdownItem>
                    ))}
                  </S.IndustryDropdown>
                )}
              </S.GenerationSelectField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 학번 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">학번</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.GenerationSelectField
                isClickable={true}
                onClick={handleToggleStudentIdDropdown}
                data-dropdown-field
              >
                {studentId ? (
                  <S.GenerationValue>{studentId}</S.GenerationValue>
                ) : (
                  <S.GenerationPlaceholder>
                    학번을 선택하세요
                  </S.GenerationPlaceholder>
                )}
                <S.DropdownIcon style={{ position: "absolute", right: "18px" }}>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path
                      d="M1 1L7.5 9L14 1"
                      stroke="#999999"
                      strokeWidth="2"
                    />
                  </svg>
                </S.DropdownIcon>
                {isStudentIdDropdownOpen && (
                  <S.IndustryDropdown data-dropdown-container>
                    {studentIds.map((id) => (
                      <S.IndustryDropdownItem
                        key={id}
                        data-dropdown-item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudentId(id);
                        }}
                      >
                        {id}
                      </S.IndustryDropdownItem>
                    ))}
                  </S.IndustryDropdown>
                )}
              </S.GenerationSelectField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 전공 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">전공</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.MultiInputField>
                {majorFields.map((field, index) => {
                  const majorValue = majors[index]?.value || "";
                  const searchState = majorSearchStates[field.id] || {
                    searchQuery: majorValue,
                    isDropdownOpen: false,
                    filteredMajors: majorList,
                  };

                  return (
                    <S.MajorInputWrapper key={field.id} data-major-search>
                      <div style={{ position: "relative", width: "413px" }}>
                        <S.Input
                          type="text"
                          placeholder="전공을 검색하세요"
                          value={majorValue}
                          onChange={(e) =>
                            handleMajorSearch(index, field.id, e.target.value)
                          }
                          onFocus={() =>
                            handleMajorInputFocus(index, field.id, majorValue)
                          }
                          data-major-search
                        />
                        {searchState.isDropdownOpen &&
                          searchState.filteredMajors.length > 0 && (
                            <S.IndustryDropdown
                              data-dropdown-container
                              data-major-search
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                              }}
                            >
                              {searchState.filteredMajors.map((major) => (
                                <S.IndustryDropdownItem
                                  key={major.id}
                                  data-dropdown-item
                                  data-major-search
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectMajor(index, field.id, major);
                                  }}
                                >
                                  {highlightMajorText(
                                    major.name,
                                    searchState.searchQuery
                                  )}
                                </S.IndustryDropdownItem>
                              ))}
                            </S.IndustryDropdown>
                          )}
                      </div>
                      {index === majorFields.length - 1 && (
                        <S.AddButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddMajor();
                          }}
                        >
                          <svg viewBox="0 0 20 20" fill="none">
                            <path
                              d="M10 5V15M5 9.90196H15"
                              stroke="#FFB700"
                              strokeWidth="1.5"
                            />
                            <circle cx="10" cy="10" r="9.5" stroke="#FFB700" />
                          </svg>
                        </S.AddButton>
                      )}
                    </S.MajorInputWrapper>
                  );
                })}
              </S.MultiInputField>
            </S.FormInputWrapper>
          </S.FormField>
        </S.Section>

        <S.Divider />

        {/* 연락처 */}
        <S.Section>
          <S.ContactSectionTitle>연락처</S.ContactSectionTitle>

          {/* 전화번호 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">전화번호</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input
                type="tel"
                placeholder="전화번호를 입력하세요"
                {...register("phone")}
              />
            </S.FormInputWrapper>
          </S.FormField>

          {/* 이메일 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">이메일</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.EmailField>
                <S.EmailInput type="text" {...register("emailLocal")} />
                <S.EmailAt>@</S.EmailAt>
                <S.EmailDomainSelectField
                  isClickable={true}
                  onClick={handleToggleEmailDomainDropdown}
                  data-dropdown-field
                >
                  {isEmailDomainCustom ||
                  (emailDomain &&
                    emailDomain !== "gmail.com" &&
                    emailDomain !== "naver.com") ? (
                    <S.EmailInput
                      type="text"
                      placeholder="도메인을 입력하세요"
                      onClick={(e) => e.stopPropagation()}
                      {...register("emailDomain")}
                      style={{ border: "none", padding: 0, width: "100%" }}
                    />
                  ) : emailDomain ? (
                    <S.GenerationValue>{emailDomain}</S.GenerationValue>
                  ) : (
                    <S.GenerationPlaceholder></S.GenerationPlaceholder>
                  )}
                  <S.DropdownIcon
                    style={{ position: "absolute", right: "5px" }}
                  >
                    <svg viewBox="0 0 15 11" fill="none">
                      <path
                        d="M1 1L7.5 9L14 1"
                        stroke="#999999"
                        strokeWidth="2"
                      />
                    </svg>
                  </S.DropdownIcon>
                  {isEmailDomainDropdownOpen && (
                    <S.IndustryDropdown data-dropdown-container>
                      {emailDomains.map((domain) => (
                        <S.IndustryDropdownItem
                          key={domain}
                          data-dropdown-item
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectEmailDomain(domain);
                          }}
                        >
                          {domain === "기타" ? "직접 입력" : domain}
                        </S.IndustryDropdownItem>
                      ))}
                    </S.IndustryDropdown>
                  )}
                </S.EmailDomainSelectField>
              </S.EmailField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 링크드인 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel>링크드인</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input
                type="url"
                placeholder="링크드인 프로필 링크를 첨부해주세요"
                {...register("linkedin")}
              />
            </S.FormInputWrapper>
          </S.FormField>
        </S.Section>

        <S.Divider />

        {/* 경력 사항 */}
        <S.Section>
          <S.CareerSectionTitle>경력 사항</S.CareerSectionTitle>

          <S.CareerList>
            {careerFields.map((field, careerIndex) => {
              const career = careers[careerIndex];
              const dropdownState = careerDropdownStates[careerIndex] || {};
              return (
                <S.CareerItem key={field.id}>
                  <S.CareerCard>
                    <S.CareerRow>
                      <S.CareerField>
                        <S.CareerLabel>회사명</S.CareerLabel>
                        <S.RequiredDot />
                        <S.CareerInput
                          type="text"
                          alt="회사명"
                          {...register(`careers.${careerIndex}.company`)}
                        />
                      </S.CareerField>
                      <S.CareerDivider />
                      <S.CareerField
                        isClickable={true}
                        onClick={() =>
                          handleTogglePositionDropdown(careerIndex)
                        }
                        data-dropdown-field
                      >
                        <S.CareerLabel>직무 카테고리</S.CareerLabel>
                        <S.RequiredDot />
                        {career?.positionCategory === "기타" ? (
                          <S.CareerInput
                            type="text"
                            placeholder="카테고리를 입력하세요"
                            onClick={(e) => e.stopPropagation()}
                            {...register(
                              `careers.${careerIndex}.customPositionCategoryName`
                            )}
                            style={{ flex: 1 }}
                          />
                        ) : career?.positionCategory ? (
                          <S.CareerValue>
                            {career.positionCategory}
                          </S.CareerValue>
                        ) : (
                          <S.CareerLabel
                            style={{ color: "#b3b3b3" }}
                          ></S.CareerLabel>
                        )}
                        <S.DropdownIcon
                          style={{ position: "absolute", right: "5px" }}
                        >
                          <svg viewBox="0 0 15 11" fill="none">
                            <path
                              d="M1 1L7.5 9L14 1"
                              stroke="#999999"
                              strokeWidth="2"
                            />
                          </svg>
                        </S.DropdownIcon>
                        {dropdownState.isPositionDropdownOpen && (
                          <S.IndustryDropdown data-dropdown-container>
                            {positionCategories.map((positionCategory) => (
                              <S.IndustryDropdownItem
                                key={positionCategory}
                                data-dropdown-item
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectPosition(
                                    careerIndex,
                                    positionCategory
                                  );
                                }}
                              >
                                {positionCategory === "기타"
                                  ? "직접 입력"
                                  : positionCategory}
                              </S.IndustryDropdownItem>
                            ))}
                          </S.IndustryDropdown>
                        )}
                      </S.CareerField>
                      <S.CareerDivider />
                      <S.CareerField>
                        <S.CareerLabel>구체적 직무명</S.CareerLabel>
                        <S.RequiredDot />
                        <S.CareerInput
                          type="text"
                          alt="구체적 직무명"
                          {...register(`careers.${careerIndex}.position`)}
                        />
                      </S.CareerField>
                    </S.CareerRow>
                    <S.CareerRow>
                      <S.CareerField
                        isClickable={true}
                        onClick={() =>
                          handleToggleIndustryDropdown(careerIndex)
                        }
                        data-dropdown-field
                      >
                        <S.CareerLabel>산업군</S.CareerLabel>
                        <S.RequiredDot />
                        {career?.industry === "기타" ? (
                          <S.CareerInput
                            type="text"
                            placeholder="산업군을 입력하세요"
                            onClick={(e) => e.stopPropagation()}
                            {...register(
                              `careers.${careerIndex}.customIndustryName`
                            )}
                            style={{ flex: 1 }}
                          />
                        ) : career?.industry ? (
                          <S.CareerValue>{career.industry}</S.CareerValue>
                        ) : (
                          <S.CareerLabel
                            style={{ color: "#b3b3b3" }}
                          ></S.CareerLabel>
                        )}
                        <S.DropdownIcon
                          style={{ position: "absolute", right: "5px" }}
                        >
                          <svg viewBox="0 0 15 11" fill="none">
                            <path
                              d="M1 1L7.5 9L14 1"
                              stroke="#999999"
                              strokeWidth="2"
                            />
                          </svg>
                        </S.DropdownIcon>
                        {dropdownState.isIndustryDropdownOpen && (
                          <S.IndustryDropdown data-dropdown-container>
                            {industries.map((industry) => (
                              <S.IndustryDropdownItem
                                key={industry}
                                data-dropdown-item
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectIndustry(careerIndex, industry);
                                }}
                              >
                                {industry === "기타" ? "직접 입력" : industry}
                              </S.IndustryDropdownItem>
                            ))}
                          </S.IndustryDropdown>
                        )}
                      </S.CareerField>
                      <S.CareerDivider />
                      <S.CareerField
                        isClickable={true}
                        onClick={() => handleToggleDatePicker(careerIndex)}
                        data-dropdown-field
                      >
                        <S.CareerLabel>입사년월</S.CareerLabel>
                        {career?.joinYear && career?.joinMonth ? (
                          <S.CareerValue>
                            {career.joinYear}년 {career.joinMonth}월
                          </S.CareerValue>
                        ) : null}
                        {dropdownState.isDatePickerOpen && (
                          <S.DatePickerPopover data-date-picker>
                            <S.DatePickerTitle>
                              입사년월을 선택하세요
                            </S.DatePickerTitle>
                            <S.DateSelectorWrapper>
                              <S.DateSelector data-year-selector>
                                <S.DateInput
                                  placeholder="년도"
                                  value={
                                    career?.joinYear
                                      ? `${career.joinYear}년`
                                      : ""
                                  }
                                  readOnly
                                  hasValue={!!career?.joinYear}
                                  isDropdownOpen={
                                    !!dropdownState.isYearDropdownOpen
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleYearDropdown(careerIndex);
                                  }}
                                />
                                <S.DropdownIcon
                                  style={{
                                    position: "absolute",
                                    right: "18px",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <svg viewBox="0 0 15 11" fill="none">
                                    <path
                                      d="M1 1L7.5 9L14 1"
                                      stroke="#ffb700"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                </S.DropdownIcon>
                                {dropdownState.isYearDropdownOpen && (
                                  <S.YearDropdown data-dropdown-container>
                                    {years.map((year) => (
                                      <S.YearDropdownItem
                                        key={year}
                                        data-dropdown-item
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectYear(careerIndex, year);
                                        }}
                                      >
                                        {year}년
                                      </S.YearDropdownItem>
                                    ))}
                                  </S.YearDropdown>
                                )}
                              </S.DateSelector>
                              <S.DateSelector data-month-selector>
                                <S.DateInput
                                  placeholder="월"
                                  value={
                                    career?.joinMonth
                                      ? `${career.joinMonth}월`
                                      : ""
                                  }
                                  readOnly
                                  hasValue={!!career?.joinMonth}
                                  isDropdownOpen={
                                    !!dropdownState.isMonthDropdownOpen
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleMonthDropdown(careerIndex);
                                  }}
                                />
                                <S.DropdownIcon
                                  style={{
                                    position: "absolute",
                                    right: "18px",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <svg viewBox="0 0 15 11" fill="none">
                                    <path
                                      d="M1 1L7.5 9L14 1"
                                      stroke="#ffb700"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                </S.DropdownIcon>
                                {dropdownState.isMonthDropdownOpen && (
                                  <S.MonthDropdown data-dropdown-container>
                                    {months.map((month) => (
                                      <S.MonthDropdownItem
                                        key={month}
                                        data-dropdown-item
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectMonth(careerIndex, month);
                                        }}
                                      >
                                        {month}월
                                      </S.MonthDropdownItem>
                                    ))}
                                  </S.MonthDropdown>
                                )}
                              </S.DateSelector>
                            </S.DateSelectorWrapper>
                          </S.DatePickerPopover>
                        )}
                      </S.CareerField>
                      <S.CareerDivider />
                      <S.CareerField
                        isCurrentJob={career?.isCurrentJob}
                        isClickable={!career?.isCurrentJob}
                        onClick={() =>
                          !career?.isCurrentJob &&
                          handleToggleLeaveDatePicker(careerIndex)
                        }
                        data-dropdown-field
                      >
                        {career?.isCurrentJob ? (
                          <S.CareerValue>현재 재직 중</S.CareerValue>
                        ) : (
                          <>
                            <S.CareerLabel>퇴사년월</S.CareerLabel>
                            {career?.leaveYear && career?.leaveMonth ? (
                              <S.CareerValue>
                                {career.leaveYear}년 {career.leaveMonth}월
                              </S.CareerValue>
                            ) : null}
                            {dropdownState.isLeaveDatePickerOpen && (
                              <S.DatePickerPopover data-date-picker>
                                <S.DatePickerTitle>
                                  퇴사년월을 선택하세요
                                </S.DatePickerTitle>
                                <S.DateSelectorWrapper>
                                  <S.DateSelector data-year-selector>
                                    <S.DateInput
                                      placeholder="년도"
                                      value={
                                        career?.leaveYear
                                          ? `${career.leaveYear}년`
                                          : ""
                                      }
                                      readOnly
                                      hasValue={!!career?.leaveYear}
                                      isDropdownOpen={
                                        !!dropdownState.isLeaveYearDropdownOpen
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleLeaveYearDropdown(
                                          careerIndex
                                        );
                                      }}
                                    />
                                    <S.DropdownIcon
                                      style={{
                                        position: "absolute",
                                        right: "18px",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      <svg viewBox="0 0 15 11" fill="none">
                                        <path
                                          d="M1 1L7.5 9L14 1"
                                          stroke="#ffb700"
                                          strokeWidth="2"
                                        />
                                      </svg>
                                    </S.DropdownIcon>
                                    {dropdownState.isLeaveYearDropdownOpen && (
                                      <S.YearDropdown data-dropdown-container>
                                        {years.map((year) => (
                                          <S.YearDropdownItem
                                            key={year}
                                            data-dropdown-item
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSelectLeaveYear(
                                                careerIndex,
                                                year
                                              );
                                            }}
                                          >
                                            {year}년
                                          </S.YearDropdownItem>
                                        ))}
                                      </S.YearDropdown>
                                    )}
                                  </S.DateSelector>
                                  <S.DateSelector data-month-selector>
                                    <S.DateInput
                                      placeholder="월"
                                      value={
                                        career?.leaveMonth
                                          ? `${career.leaveMonth}월`
                                          : ""
                                      }
                                      readOnly
                                      hasValue={!!career?.leaveMonth}
                                      isDropdownOpen={
                                        !!dropdownState.isLeaveMonthDropdownOpen
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleLeaveMonthDropdown(
                                          careerIndex
                                        );
                                      }}
                                    />
                                    <S.DropdownIcon
                                      style={{
                                        position: "absolute",
                                        right: "18px",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      <svg viewBox="0 0 15 11" fill="none">
                                        <path
                                          d="M1 1L7.5 9L14 1"
                                          stroke="#ffb700"
                                          strokeWidth="2"
                                        />
                                      </svg>
                                    </S.DropdownIcon>
                                    {dropdownState.isLeaveMonthDropdownOpen && (
                                      <S.MonthDropdown data-dropdown-container>
                                        {months.map((month) => (
                                          <S.MonthDropdownItem
                                            key={month}
                                            data-dropdown-item
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSelectLeaveMonth(
                                                careerIndex,
                                                month
                                              );
                                            }}
                                          >
                                            {month}월
                                          </S.MonthDropdownItem>
                                        ))}
                                      </S.MonthDropdown>
                                    )}
                                  </S.DateSelector>
                                </S.DateSelectorWrapper>
                              </S.DatePickerPopover>
                            )}
                          </>
                        )}
                      </S.CareerField>
                    </S.CareerRow>
                  </S.CareerCard>

                  <S.CareerCheckboxes>
                    <S.CheckboxLabel
                      onClick={() => handleTogglePrivate(careerIndex)}
                    >
                      <S.CheckboxBox checked={career?.isPrivate || false} />
                      <span>운영진에게만 공개</span>
                    </S.CheckboxLabel>
                    <S.CheckboxLabel
                      disabled={false}
                      onClick={() => handleToggleCurrentJob(careerIndex)}
                      style={{ cursor: "pointer" }}
                    >
                      <S.CheckboxBox
                        disabled={false}
                        checked={career?.isCurrentJob || false}
                      />
                      <span>재직 중</span>
                    </S.CheckboxLabel>
                  </S.CareerCheckboxes>
                </S.CareerItem>
              );
            })}
          </S.CareerList>
        </S.Section>

        <S.ButtonWrapper>
          <S.AddCareerButton onClick={handleAddCareer}>
            경력 추가
          </S.AddCareerButton>
          <S.Divider />

          {/* 운영진 참고 사항 - ADMIN인 경우에만 표시 */}
          {isAdmin && (
            <S.AdminNotesSection>
              <S.AdminNotesSectionTitle>
                운영진 참고 사항
              </S.AdminNotesSectionTitle>
              <S.AdminNotesTextarea
                {...register("adminNotes")}
                placeholder="내용을 입력하세요"
              />
            </S.AdminNotesSection>
          )}

          <S.SaveButton onClick={handleSave} disabled={updateLoading}>
            {updateLoading ? "저장 중..." : "변경사항 저장"}
          </S.SaveButton>
        </S.ButtonWrapper>
      </S.Container>

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={() => setMessageModal({ isOpen: false, message: "" })}
        message={messageModal.message}
      />

      {/* 이메일 입력 요구 모달 */}
      <MessageModal
        isOpen={emailRequiredModal}
        onClose={() => setEmailRequiredModal(false)}
        message="원활한 네트워킹을 위해 이메일을 입력해주세요"
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />

      {/* Logout confirm modal */}
      <CheckModal
        isOpen={logoutConfirmModalOpen}
        onClose={() => setLogoutConfirmModalOpen(false)}
        onConfirm={handleLogout}
        title=""
        message="로그아웃하시겠습니까?"
        confirmText="로그아웃"
        cancelText="취소"
        isLoading={logoutLoading || isLoggingOut}
        type="warning"
      />
    </>
  );
}
