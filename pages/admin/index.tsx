import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import AdminComponent from "../../src/components/commons/units/adminComponent/adminComponent.container";
import { FETCH_LOGIN_USER } from '../../src/commons/apis/graphql-queries';

export default function AdminPage() {
  const router = useRouter();
  const { data, loading } = useQuery(FETCH_LOGIN_USER);

  useEffect(() => {
    if (!loading && data?.fetchLoginUser) {
      if (data.fetchLoginUser.role !== 'ADMIN') {
        // Session Storage에 플래그 설정
        sessionStorage.setItem('unauthorized', 'true');
        router.push('/');
      }
    }
  }, [data, loading, router]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>로딩 중...</div>;
  }

  if (!data?.fetchLoginUser || data.fetchLoginUser.role !== 'ADMIN') {
    return null;
  }

  return (
    <>
      <AdminComponent />
    </>
  );
}
