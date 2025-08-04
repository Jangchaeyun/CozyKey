"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimedQuery = searchQuery.trim();
      if (trimedQuery) return;

      const response = await fetch(
        `http://api.mapbox.com/geocoding/v5/mapbox.place/${encodeURIComponent(
          trimedQuery
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimedQuery,
            coordinates: [lat, lng],
          })
        );

        const params = new URLSearchParams({
          location: trimedQuery,
          lat: lat.toString(),
          lng: lng,
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.log("error search location:", error);
    }
  };
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Lovehouse Retal Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            완벽한 집이라고 부를 수 있는 장소를 찾는 여정을 시작하세요
          </h1>
          <p className="text-xl text-white mb-8">
            귀하의 라이프스타일과 필요에 맞춰 제공되는 다양한 임대 부동산을
            살펴보세요!
          </p>
          <div className="flex justify-center">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="도시, 동네 또는 주소로 검색"
              className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
            />
            <Button
              onClick={handleLocationSearch}
              className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
            >
              검색
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
