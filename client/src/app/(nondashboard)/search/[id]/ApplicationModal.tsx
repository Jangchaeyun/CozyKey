import { CustomFormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ApplicationFormData, applicationSchema } from "@/lib/schemas";
import { useCreateApplicationMutation, useGetAuthUserQuery } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const ApplicationModal = ({
  isOpen,
  onClose,
  propertyId,
}: ApplicationModalProps) => {
  const [createApplication] = useCreateApplicationMutation();
  const { data: authUser } = useGetAuthUserQuery();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!authUser || authUser.userRole !== "tenant") {
      console.error("신청서를 제출하려면 세입자로 로그인해야 합니다.");
      return;
    }

    await createApplication({
      ...data,
      applicationDate: new Date().toISOString(),
      status: "Pending",
      propertyId: propertyId,
      tenantCognitoId: authUser.cognitoInfo.userId,
    });
    onClose();
  };
  return;
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white">
      <DialogHeader className="mb-4">
        <DialogTitle>이 부동산에 대한 신청서를 제출하세요</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomFormField
            name="name"
            label="이름"
            type="text"
            placeholder="전체 이름을 입력하세요"
          />
          <CustomFormField
            name="email"
            label="이메일"
            type="email"
            placeholder="전체 이메일을 입력하세요"
          />
          <CustomFormField
            name="phoneNumber"
            label="전화번호"
            type="text"
            placeholder="전체 전화번호를 입력하세요"
          />
          <CustomFormField
            name="message"
            label="메시지(선택사항)"
            type="textarea"
            placeholder="추가 정보를 입력하세요"
          />
          <Button type="submit" className="bg-primary-700 text-white w-full">
            신청서 제출
          </Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>;
};

export default ApplicationModal;
