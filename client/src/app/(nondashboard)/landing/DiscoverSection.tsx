"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opactiy: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariats = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="py-12 bg-white mb-16"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemVariats} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">
            발견
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            오늘 당신의 꿈의 집을 찾아보세요!
          </p>
          <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
            꿈에 그리던 임대 주택을 찾는 것이 그 어느 때보다 쉬워졌습니다.
            사용자 친화적인 검색 기능을 통해 모든 니즈를 충족하는 완벽한 집을
            빠르게 찾으실 수 있습니다. 지금 바로 검색을 시작하고 꿈에 그리던
            임대 주택을 찾아보세요!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
          {[
            {
              imageSrc: "/landing-icon-wand.png",
              title: "부동산 검색",
              description: "원하는 지역의 임대용 부동산을 다양하게 찾아보세요.",
            },
            {
              imageSrc: "/landing-icon-calendar.png",
              title: "렌탈 예약하기",
              description:
                "완벽한 임대용 부동산을 찾았다면 몇 번의 클릭만으로 온라인으로 간편하게 예약하세요.",
            },
            {
              imageSrc: "/landing-icon-heart.png",
              title: "새로운 집을 즐겨보세요",
              description:
                "새로운 임대 주택으로 이사하고 꿈의 집을 즐겨보세요.",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemVariats}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) => (
  <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72">
    <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
      <Image
        src={imageSrc}
        width={30}
        height={30}
        className="w-full h-full"
        alt={title}
      />
    </div>
    <h3 className="mt-4 text-4xl font-medium text-gray-800">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

export default DiscoverSection;
