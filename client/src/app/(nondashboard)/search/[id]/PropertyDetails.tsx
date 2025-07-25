import React from "react";
import { useGetPropertyQuery } from "@/state/api";
import { AmenityIcons, HighlightIcons } from "@/lib/constants";
import { formatEnumString } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PropertyDetails = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);

  if (isLoading) return <>로딩...</>;
  if (isError || !property) {
    return <>부동산을 찾을 수 없습니다.</>;
  }
  return (
    <div className="mb-6">
      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold my-3">부동산 편의 시설</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {property.amenities.map((amenity: AmenityEnum) => {
            const Icon = AmenityIcons[amenity as AmenityEnum] || HelpCircle;
            return (
              <div
                key={amenity}
                className="flex flex-col items-center border rounded-xl py-8 px-4"
              >
                <Icon className="w-8 h-8 mb-2 text-gray-700" />
                <span className="text-sm text-center text-gray-700">
                  {formatEnumString(amenity)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highligts */}
      <div className="mt-12 mb-16">
        <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-100">
          하이라이트
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 w-full">
          {property.highlights.map((highlight: HighlightEnum) => {
            const Icon =
              HighlightIcons[highlight as HighlightEnum] || HelpCircle;
            return (
              <div
                key={highlight}
                className="flex flex-col items-center rouned-xl py-8 px-4"
              >
                <Icon className="w-8 h-8 mb-2 text-primary-600 dark:text-primary-300" />
                <span className="text-sm text-center text-primary-600 dark:text-primary-300">
                  {formatEnumString(highlight)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Tabs Section */}
      <div>
        <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100 mb-5">
          수수료 및 정책
        </h3>
        <p className="text-sm text-primary-500 dark:text-primary-300 mt-2">
          아래 수수료는 커뮤니티에서 제공한 데이터를 기준으로 하며 추가 수수료
          및 공과금은 제외될 수 있습니다.
        </p>
        <Tabs defaultValue="required-fees" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="required-fees">필수 수수료</TabsTrigger>
            <TabsTrigger value="pets">펫</TabsTrigger>
            <TabsTrigger value="parking">주차장</TabsTrigger>
          </TabsList>
          <TabsContent value="require-fees" className="w-1/3">
            <p className="font-semibold mt-5 mb-2">일회성 이사 수수료</p>
            <hr />
            <div className="flex justify-between py-2 bg-secondary-50">
              <span className="text-primary-700 font-medium">신청 수수료</span>
              <span className="text-primary-700">
                ${property.applicationFee}
              </span>
            </div>
            <hr />
            <div className="flex justify-between py-2 bg-secondary-50">
              <span className="text-primary-700 font-medium">보증금</span>
              <span className="text-primary-700">
                ${property.securityDeposit}
              </span>
            </div>
            <hr />
          </TabsContent>
          <TabsContent value="pets">
            <p className="font-semibold mt-5 mb-2">
              팻은 {property.isPetsAllowed ? "허용" : "허용되지 않음"}
            </p>
          </TabsContent>
          <TabsContent value="parking">
            주차장은 {property.isParkingIncluded ? "포함" : "포함되지 않음"}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyDetails;
