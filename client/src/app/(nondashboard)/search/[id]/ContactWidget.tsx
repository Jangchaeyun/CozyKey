import { Button } from "@/components/ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ContactWidget = ({ onOpenModal }: ContactWidgetProps) => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();

  const handleButtonClick = () => {
    if (authUser) {
      onOpenModal();
    } else {
      router.push("/signin");
    }
  };
  return (
    <div className="bg-white border border-primary-200 rounded-2xl p-7 h-fit min-w-[300px]">
      {/* Contact Property */}
      <div className="flex items-center gap-5 mb-4 border border-primary-200 p-4 rounded-xl">
        <div className="flex items-center p-4 bg-primary-900 rounded-full">
          <Phone className="text-primary-50" size={15} />
        </div>
        <div>
          <p>이 부동산에 문의하세요</p>
          <div className="text-lg font-bold text-primary-800">
            (424) 340-5574
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-primary-700 text-white hover:bg-primary-600"
        onClick={handleButtonClick}
      >
        {authUser ? "신청서 제출" : "신청하려면 로그인하세요"}
      </Button>

      <hr className="my-4" />
      <div className="text-sm">
        <div className="text-primary-600 mb-1">언어: 영어, 바하사어.</div>
        <div className="text-primary-600">
          월요일부터 일요일까지 예약제로 운영합니다
        </div>
      </div>
    </div>
  );
};

export default ContactWidget;
