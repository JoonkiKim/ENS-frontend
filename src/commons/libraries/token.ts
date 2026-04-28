// libs/token.ts
import type { SetterOrUpdater } from "recoil";

let inMemoryAccessToken: string | null = null;
let recoilSetter: SetterOrUpdater<string | null> | null = null;
let authInitEpochSetter: SetterOrUpdater<number> | null = null;

/** _app.tsx에서 useSetRecoilState를 한 번만 전달하세요 */
//  Recoil과 인메모리 캐시를 “이어 주는” 연결 고리
export function registerAccessTokenSetter(
  setter: SetterOrUpdater<string | null>
) {
  recoilSetter = setter;
}

/** TokenInitializer에서 세션 재검증 epoch setter를 연결 */
export function registerAuthInitEpochSetter(
  setter: SetterOrUpdater<number>
) {
  authInitEpochSetter = setter;
}

/** 메모리상의 토큰 반환 */
export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

/** 메모리·Recoil 동기화 */
export function setAccessToken(token: string) {
  inMemoryAccessToken = token;
  recoilSetter?.(token);
}

/** 메모리·Recoil 초기화 */
export function clearAccessToken() {
  inMemoryAccessToken = null;
  recoilSetter?.(null);
}

/** 토큰 소거 시 보호 경로 재검증을 강제하기 위한 epoch 증가 */
export function bumpAuthInitEpoch() {
  authInitEpochSetter?.((prev) => prev + 1);
}
