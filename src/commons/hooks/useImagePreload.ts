import { useState, useEffect } from 'react';

const PRELOAD_IMAGES = [
  '/images/log-in-bg.png',
  '/images/findalumni-background-real.png',
  '/images/mypage-bg.png',
];

export function useImagePreload() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;

    // 10초 후 강제로 진행 (무한 대기 방지)
    const timeout = setTimeout(() => {
      if (isMounted) {
        console.warn('이미지 로드 타임아웃 - 강제 진행');
        setImagesLoaded(true);
      }
    }, 10000);

    const loadImages = async () => {
      let loadedCount = 0;
      const totalImages = PRELOAD_IMAGES.length;

      const imagePromises = PRELOAD_IMAGES.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            if (isMounted) {
              loadedCount++;
              setLoadingProgress((loadedCount / totalImages) * 100);
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`이미지 로드 실패: ${src}`);
            if (isMounted) {
              loadedCount++;
              setLoadingProgress((loadedCount / totalImages) * 100);
            }
            resolve(); // 에러가 발생해도 계속 진행
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
          clearTimeout(timeout);
        }
      } catch (error) {
        console.error('이미지 로드 중 오류:', error);
        if (isMounted) {
          setImagesLoaded(true); // 에러 시에도 진행
          clearTimeout(timeout);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  return { imagesLoaded, loadingProgress };
}
