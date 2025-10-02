"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { login } from "./action";
import Image from "next/image";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { useState } from "react";
import SubmitButton from "./submitButton";
import Skeleton from "./loading";
export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const searchParams = useSearchParams();

  const erroLogin = searchParams.get("message");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Suspense fallback={<Skeleton />}>
      <div className="relative w-screen h-screen text-white">
        <div>
          <Image
            src="/logo.svg"
            alt="Logo SEDUC"
            width={200}
            height={100}
            priority
            className="absolute bottom-10 left-10 z-10"
          />
        </div>
        <div className="absolute inset-0 bg-[url(/5077.jpg)] bg-cover bg-no-repeat">
          {/* Tela de Login */}
          <div className="absolute bg-white right-0 top-0 w-1/3 h-full flex items-center justify-center">
            <div className="bg-white backdrop-blur-sm rounded-lg  p-8 w-full max-w-md mx-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  DASHBOARDS SEDUC
                </h2>
                <p className="text-gray-600">
                  Faça login para acessar o sistema
                </p>
              </div>
              {erroLogin == "'errorlogin'" && (
                <div className="mb-4  p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  Usuário ou senha inválidos. Tente novamente.
                </div>
              )}
              {/* Formulário de Login */}
              <form action={login} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                    placeholder="Digite seu email"
                    required
                  />
                </div>

                <div className="text-black relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Senha
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full relative px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                    placeholder="Digite sua senha"
                    required
                  ></input>
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute  top-11 right-5 cursor-pointer"
                  >
                    {passwordVisible ? (
                      <GoEye size={20} />
                    ) : (
                      <GoEyeClosed size={20} />
                    )}
                  </div>
                  <SubmitButton />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
