import React from "react";
import { useGetPropertyQuery } from "@/state/api";
import { MapPin, Star } from "lucide-react";

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
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
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          {property.location?.country} / {property.location?.state} /{" "}
          <span className="font-semibold text-gray-600">
            {property.location?.city}
          </span>
        </div>
        <h1 className="text-3xl font-bold my-5">{property.name}</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            {property.location?.city}, {property.location?.state},{" "}
            {property.location?.country}
          </span>

          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {property.averageRating.toFixed(1)} ({property.numberOfReviews}{" "}
              리뷰)
            </span>
            <span className="text-green-600">검증된 목록</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-primary-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center gap-4 px-5">
          <div>
            <div className="text-sm text-gray-500">달 렌트</div>
            <div className="font-semibold">
              {(property.pricePerMonth * 1300).toLocaleString()}원
            </div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">침대</div>
            <div className="font-semibold">{property.beds} 침대</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">화장실</div>
            <div className="font-semibold">{property.baths} 화장실</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">평</div>
            <div className="font-semibold">
              {(property.squareFeet * 0.028).toFixed(2)} 평
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
