import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useRemoveFavoritePropertyMutation,
} from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaTypes";
import { view } from "framer-motion";
import { property } from "lodash";
import React from "react";

const Listings = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [addFavortie] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();
  const viewMode = useAppSelector((state) => state.global.viewMode);
  const filters = useAppSelector((state) => state.global.filters);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) return;

    const isFavorite = authUser.userInfo.favorites.some(
      (fav: Property) => fav.id === propertyId
    );

    if (isFavorite) {
      await removeFavorite({
        cognitoId: authUser.cognitoInfo.userId,
        propertyId,
      });
    } else {
      await addFavortie({
        cognitoId: authUser.cognitoInfo.userId,
        propertyId,
      });
    }
  };

  if (isLoading) return <>로딩...</>;
  if (isError || !properties) return <div>Failed to fetch properties</div>;
  return (
    <div className="w-full">
      <h3 className="text-sm px-4 font-bold">
        <span className="text-gray-700 font-normal">{filters.location}의 </span>
        {properties.length}
        <span className="text-gray-700 font-normal">개 장소</span>
      </h3>
      <div className="flex">
        <div className="p-4 w-full">
          {properties?.map((property) =>
            viewMode === "grid" ? <>같은 카드</> : <>another card</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
