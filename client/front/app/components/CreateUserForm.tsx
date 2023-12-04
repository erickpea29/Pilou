"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { ADD_NEW_USER } from "@/graphql/actions/addNewUser.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  emergency_contact: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  emergency_number: z
    .number()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  blood_type: z.string(),
});

type RegisterSchema = z.infer<typeof formSchema>;

const CreateUserForm = () => {
  const [newUserMutation, { loading }] = useMutation(ADD_NEW_USER, {
    onCompleted: () => {
      router.prefetch("/dashboard");
      router.push("/dashboard");
    },
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    try {
      const response = newUserMutation({
        variables: data,
      });
      console.log(response);
      toast.success("Usuario añadido exitosamente");
      reset();
      router.prefetch("/dashboard");
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md ">
        <h2 className="text-center text-3xl font-bold mb-4">
          Añadir nuevo usuario
        </h2>
        <hr className="mb-4" />
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre Completo
            </label>
            <input
              {...register("name")}
              className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              type="text"
              required
              placeholder="Nombre Completo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contacto de Emergencia
            </label>
            <input
              className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              {...register("emergency_contact")}
              type="text"
              required
              placeholder="Contacto de Emergencia"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono de Emergencia
            </label>
            <input
              className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              {...register("emergency_number", { valueAsNumber: true })}
              type="number"
              required
              placeholder="Teléfono de Emergencia"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de Sangre
            </label>
            <input
              className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              {...register("blood_type")}
              type="text"
              required={false}
              placeholder="Tipo de Sangre"
            />
          </div>
          <div className="flex justify-end mt-6">
            <Link
              href="/dashboard"
              className="  text-black hover:text-pink-700  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
            >
              Cancelar
            </Link>
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting || loading}
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
