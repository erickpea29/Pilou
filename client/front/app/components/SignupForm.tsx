"use client";

import Link from "next/link";
import React from "react";
import { useMutation, gql } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/actions/register.actions";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Header from "./Header";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  phone_number: z
    .number()
    .min(10, "El número de teléfono debe tener al menos 11 caracteres."),
});

type SignUpSchema = z.infer<typeof formSchema>;

const SignupForm = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      localStorage.setItem(
        "activation_token",
        response.data.register.activation_token
      );
      toast.success("Por favor, revisa tu e-mail para activar tu cuenta");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-md bg-white bg-opacity-25 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Registrarme</h2>
          <p className="text-gray-500">
            Ingrese sus datos a continuación para crear su cuenta y comenzar 👀
          </p>

          <div className="w-full bg-black h-0.5 mt-4 mb-4"></div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Correo electrónico:</label>
              <input
                {...register("email")}
                type="email"
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
                placeholder="Correo electrónico"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Nombre:</label>
              <input
                {...register("name")}
                type="text"
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
                placeholder="Nombre Completo"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Teléfono:</label>
              <input
                {...register("phone_number", { valueAsNumber: true })}
                type="text"
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
                placeholder="Teléfono"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Contraseña:</label>
              <input
                {...register("password")}
                type="password"
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
                placeholder="Contraseña"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                className="rounded border-gray-300 focus:ring focus:border-blue-500"
              />
              <label
                htmlFor="privacy"
                className="ml-2 text-gray-700 cursor-pointer"
              >
                Acepto los términos y condiciones
              </label>
            </div>

            <button
              type="submit"
              value={"Sign Up"}
              disabled={isSubmitting || loading}
              className="bg-pink-500 font-bold  text-white rounded-full py-2 px-4 hover:bg-pink-600 focus:outline-none focus:bg-pink-600 w-full"
            >
              Registrarse
            </button>

            <div className="flex justify-center mt-4">
              <span className="text-gray-700 mr-2">¿Ya tienes una cuenta?</span>
              <Link
                href={"/"}
                className="text-pink-500 font-bold"
                onClick={() => setActiveState("Login")}
              >
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
