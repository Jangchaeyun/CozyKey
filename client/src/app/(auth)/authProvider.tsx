"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-7 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          Cozy
          <span className="text-secondary-500 font-light hover:!text-primary-300">
            Key
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">환영합니다!</span> 계속하려면 로그인하세요
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            계정이 없으신가요?{" "}
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              여기에서 가입하세요
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">거주자</Radio>
            <Radio value="manager">관리자</Radio>
          </RadioGroupField>
        </>
      );
    },

    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            계정이 이미 있으신가요?{" "}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              로그인
            </button>
          </p>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "이메일을 입력하세요",
      label: "이메일",
      isRequired: true,
    },
    password: {
      placeholder: "비밀번호를 입력하세요",
      label: "비밀번호",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "사용자 이름을 선택하세요",
      label: "사용자 이름",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "이메일 주소를 입력하세요",
      label: "이메일",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "비밀번호를 생성하세요",
      label: "비밀번호",
      isRequired: true,
    },
    confirm_password: {
      order: 3,
      placeholder: "비밀번호를 확인하세요",
      label: "비밀번호 확인",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  // 인증된 사용자를 인증 페이지에서 다른 곳으로 리디렉션합니다.
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // 인증 없이 공개 페이지에 대한 접근 허용
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator components={components} formFields={formFields}>
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
