"use client";

import { CustomFormField } from "@/components/FormField";
import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/state/api";
import { HighlightEnum, AmenityEnum, PropertyTypeEnum } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

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
      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-10"
          >
            <div>
              <h1 className="text-lg font-semibold mb-4">기본 정보</h1>
              <div className="space-y-4">
                <CustomFormField name="name" label="부동산 이름" />
                <CustomFormField
                  name="description"
                  label="설명"
                  type="textarea"
                />
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">수수료</h2>
              <CustomFormField
                name="pricePerMonth"
                label="월별 가격"
                type="number"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name="securityDeposit"
                  label="보증금"
                  type="number"
                />
                <CustomFormField
                  name="applicationFee"
                  label="신청 수수료"
                  type="number"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">부동산 세부 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField name="beds" label="침대 수" type="number" />
                <CustomFormField name="baths" label="욕실 수" type="number" />
                <CustomFormField
                  name="squareFeet"
                  label="평(m2)"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <CustomFormField
                  name="isPetsAllowed"
                  label="반려동물 허용"
                  type="switch"
                />
                <CustomFormField
                  name="isParkingIncluded"
                  label="주차 포함"
                  type="switch"
                />
              </div>
              <div className="mt-4">
                <CustomFormField
                  name="propertyType"
                  label="부동산 유형"
                  type="select"
                  options={Object.keys(PropertyTypeEnum).map((type) => ({
                    value: type,
                    label: type,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />
            <div>
              <h2 className="text-lg font-semibold mb-4">
                편의 시설 및 하이라이트
              </h2>
              <div className="space-y-6">
                <CustomFormField
                  name="amenities"
                  label="편의 시설"
                  type="select"
                  options={Object.keys(AmenityEnum).map((amentity) => ({
                    value: amentity,
                    label: amentity,
                  }))}
                />
                <CustomFormField
                  name="highlights"
                  label="하이라이트"
                  type="select"
                  options={Object.keys(HighlightEnum).map((highlight) => ({
                    value: highlight,
                    label: highlight,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            <div>
              <h2 className="text-lg font-semibold mb-4">사진</h2>
              <CustomFormField
                name="photoUrls"
                label="부동산 사진"
                type="file"
                accept="image/*"
              />
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">추가 정보</h2>
              <CustomFormField name="address" label="주소" />
              <div className="flex justify-between gap-4">
                <CustomFormField name="city" label="시" className="w-full" />
                <CustomFormField
                  name="state"
                  label="도/군/구"
                  className="w-full"
                />
                <CustomFormField
                  name="postalCode"
                  label="우편번호"
                  className="w-full"
                />
              </div>
              <CustomFormField name="country" label="나라" />
            </div>
            <Button
              type="submit"
              className="bg-primary-700 text-white w-full mt-8"
            >
              부동산 생성
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProperty;
