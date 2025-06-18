"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
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
              value="검색어"
              onChange={() => {}}
              placeholder="도시, 동네 또는 주소로 검색"
              className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
            />
            <Button
              onClick={() => {}}
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
