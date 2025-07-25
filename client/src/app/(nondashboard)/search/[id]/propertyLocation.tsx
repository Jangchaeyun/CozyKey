import { useGetPropertyQuery } from "@/state/api";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Compass, MapPin } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const PropertyLocation = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (isLoading || isError || !property) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/cherry1112/cmdabvjmi02tk01ri5388ev37",
      center: [
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ])
      .addTo(map);

    const markerElement = marker.getElement();
    const path = markerElement.querySelector("path[fill='#3FB1CE']");
    if (path) path.setAttribute("fill", "#000000");

    const resizeMap = () => setTimeout(() => map.resize(), 700);
    resizeMap();

    return () => map.remove();
  }, [isLoading, isError, property]);

  if (isLoading) return <>로딩중...</>;
  if (isError || !property) {
    return <>부동신을 찾을 수 없습니다</>;
  }

  return (
    <div className="py-16">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        지도와 위치
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-700" />
          부동산 주소:
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || "주소를 사용할 수 없습니다"}
          </span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            property.location?.address || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <Compass className="w-5 h-5" />
          길찾기
        </a>
      </div>
      <div
        className="relative mt-4 h-[300px] rounded-lg overflow-hidden"
        ref={mapContainerRef}
      />
    </div>
  );
};

export default PropertyLocation;
