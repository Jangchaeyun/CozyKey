"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetApplicationsQuery,
  useGetAuthUserQuery,
  useUpdateApplicationStatusMutation,
} from "@/state/api";
import {
  Circle,
  CircleCheckBig,
  Clock,
  Download,
  File,
  Hospital,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Applications = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const {
    data: applications,
    isLoading,
    isError,
  } = useGetApplicationsQuery({
    userId: authUser?.cognitoInfo?.userId,
    userType: "tenant",
  });
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const handleStatusChange = async (id: number, status: string) => {
    await updateApplicationStatus({ id, status });
  };

  if (isLoading) return <Loading />;
  if (isError || !applications)
    return <div>애플리케이션을 가져오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="dashboard-container">
      <div className="w-full">
        {applications?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            userType="renter"
          >
            <div className="flex justify-between gap-5 w-full pb-4 px-4">
              {application.status === "Approved" ? (
                <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                  <CircleCheckBig className="w-5 h-5 mr-2" />
                  해당 부동산은 귀하께서 임대하실 때까지 임대됩니다.{" "}
                  {new Date(application.lease?.endDate).toLocaleDateString()}
                </div>
              ) : application.status === "Pending" ? (
                <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  귀하의 신청은 승인 대기 중입니다.
                </div>
              ) : (
                <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                  <Circle className="w-5 h-5 mr-2" />
                  귀하의 신청이 거부되었습니다.
                </div>
              )}
              <button
                className={`bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
              >
                <Download className="w-5 h-5 mr-2" />
                계약서 다운로드
              </button>
            </div>
          </ApplicationCard>
        ))}
      </div>
    </div>
  );
};

export default Applications;
