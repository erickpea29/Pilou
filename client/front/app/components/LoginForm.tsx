import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "./Header";
import { z } from "zod";
import { LOGIN_USER } from "@/graphql/actions/login.actions";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type LoginSchema = z.infer<typeof formSchema>;

const LoginForm = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [Login, { loading }] = useMutation(LOGIN_USER);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const response = await Login({
      variables: loginData,
    });
    if (response.data.Login.user && response.data.Login.user.role === "Admin") {
      console.log(response.data.Login.user);
      toast.success("Inicio de sesión exitosa");
      Cookies.set("refresh_token", response.data.Login.refreshToken);
      Cookies.set("access_token", response.data.Login.accessToken);
      reset();
      router.push("/dashboard");
    } else {
      if (
        response.data.Login.user &&
        response.data.Login.user.role === "User"
      ) {
        toast.error("No tienes permisos para acceder a esta página");
      } else {
        toast.error(response.data.Login.error.message);
      }
    }
  };

  return (
    <>
      <Header isActive={false} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="max-w-md w-full p-10 bg-white shadow-lg rounded-md">
          <div className="flex justify-center mb-10 mt-8">
            <div className="relative">
              <Image
                src="/Pilou.png"
                alt="Logo"
                className="object-contain"
                width={280}
                height={280}
              />
            </div>
          </div>
          <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-sm mx-auto">
              <label htmlFor="email" className="text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Ingresa tu correo electrónico"
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              />
            </div>
            <div className="max-w-sm mx-auto">
              <label htmlFor="password" className="text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Ingresa tu contraseña"
                className="w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none hover:border-blue-500 focus:border-blue-500 mx-auto"
              />
            </div>
            <div className="max-w-sm mx-auto">
              <button
                type="submit"
                value="Login"
                disabled={isSubmitting || loading}
                className="w-72 md:w-full bg-pink-500 text-white py-3 px-6 rounded-full font-bold text-center hover:bg-pink-600 transition duration-300"
              >
                Iniciar sesión
              </button>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-700 mr-2">¿Aún no tienes cuenta?</span>

              <span
                className="text-pink-500 font-bold cursor-pointer"
                onClick={() => setActiveState("Signup")}
              >
                Inscribirse
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
