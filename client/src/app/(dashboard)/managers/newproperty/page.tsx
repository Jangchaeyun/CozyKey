"use client";

import Header from "@/components/Header";
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const NewProperty = () => {
  const [createProperty] = useCreatePropertyMutation();
  const { data: authUser } = useGetAuthUserQuery();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerMonth: 100000,
      securityDeposit: 50000,
      applicationFee: 10000,
      isPetsAllowed: true,
      isParkingIncluded: true,
      photoUrls: [],
      highlights: "",
      beds: 1,
      baths: 1,
      squareFeet: 28,
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    if (!authUser?.cognitoInfo?.userId) {
      throw new Error("No manager ID for found");
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "photoUrls") {
        const files = value as File[];
        files.forEach((file: File) => {
          formData.append("photos", file);
        });
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });
    formData.append("managerCognitoId", authUser.cognitoInfo.userId);
    await createProperty(formData);
  };

  return (
    <div className="dashboard-container">
      <Header
        title="새로운 부동산 추가"
        subtitle="자세한 정보를 포함한 새로운 부동산 목록을 만드세요"
      />
    </div>
  );
};

export default NewProperty;
