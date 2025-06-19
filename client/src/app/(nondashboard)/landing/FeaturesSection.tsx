"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opactiy: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariats = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
    >
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariats}
          className="text-3xl font-bold text-center mb-12 w-full sm:w-2/3 mx-auto"
        >
          효과적인 검색 필터를 이용해 원하는 집을 빠르게 찾아보세요!
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {[0, 1, 2].map((index) => (
            <motion.div key={index} variants={itemVariats}>
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={
                  [
                    "신뢰할 수 있고 검증된 목록",
                    "임대 매물 검색 및 편의성",
                    "고급 기능으로 임대 검색을 간소화하세요",
                  ][index]
                }
                description={
                  [
                    "사용자 리뷰와 평가를 통해 최고의 렌탈 옵션을 알아보세요.",
                    "전체 옵션을 더 잘 이해하려면 사용자 리뷰와 평가를 확인하세요.",
                    "F번거로움 없는 경험을 보장하기 위해 신뢰할 수 있고 검증된 임대 매물 목록을 제공합니다.",
                  ][index]
                }
                linkText={["탐색", "검색", "발견"][index]}
                linkHref={["/explore", "/search", "/discover"][index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => (
  <div className="text-center">
    <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
      <Image
        src={imageSrc}
        width={400}
        height={400}
        className="w-full h-full object-contain"
        alt={title}
      />
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="mb-4">{description}</p>
    <Link
      href={linkHref}
      className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      scroll={false}
    >
      {linkText}
    </Link>
  </div>
);

export default FeaturesSection;
