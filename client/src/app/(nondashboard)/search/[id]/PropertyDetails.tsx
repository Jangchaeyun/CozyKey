import React from "react";
import { useGetPropertyQuery } from "@/state/api";
import { AmenityIcons } from "@/lib/constants";
import { formatEnumString } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

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
    </div>
  );
};

export default PropertyDetails;
