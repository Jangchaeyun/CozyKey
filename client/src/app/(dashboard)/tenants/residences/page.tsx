"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from "@/state/api";
import React from "react";

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: currentResicences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>현재 거주지를 로드하는 중 오류가 발생했습니다.</div>;

  return (
    <div className="dashboard-container">
      <Header title="현재 거주지" subtitle="현재 거주 공간을 보고 관리하세요" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentResicences?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={tenant?.favorites.includes(property.id) || false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!currentResicences || currentResicences.length === 0) && (
        <p>현재 거주하고 있는 곳이 없습니다.</p>
      )}
    </div>
  );
};

export default Residences;
