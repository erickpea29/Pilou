"use client";
import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useMutation } from "@apollo/client";
import { updateUserMutation } from "@/graphql/actions/updateUser.action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

interface UserInfoProps {
  userData: {
    id: string;
    name: string;
    emergency_contact: string;
    emergency_number: string;
    blood_type: string;
    image: string;
  };
}

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  emergency_contact: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  emergency_number: z
    .number()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  blood_type: z.string().min(1, "El nombre debe tener al menos 3 caracteres."),
});

type RegisterSchema = z.infer<typeof formSchema>;

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [originalData, setOriginalData] = useState(userData);
  const [updateUser] = useMutation(updateUserMutation);

  useEffect(() => {
    setEditedData(userData);
    setOriginalData(userData);
  }, [userData]);

  console.log(userData);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setEditedData(originalData);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const saveChanges = (data: RegisterSchema) => {
    try {
      const response = updateUser({
        variables: {
          id: userData.id,
          name: data.name,
          emergency_contact: data.emergency_contact,
          emergency_number: data.emergency_number,
          blood_type: data.blood_type,
        },
      });
      console.log(data);
      console.log(response);
      setOriginalData(editedData);
      toggleEditMode();
    } catch (error: any) {
      console.log(error.message);
    }
    setIsEditMode(false);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div
        className={
          "flex flex-col items-center mx-auto p-8 bg-white border border-gray-300 rounded-md shadow-md transition-all duration-300 "
        }
      >
        <h1 className="text-2xl font-bold mb-4">
          {isEditMode ? "Editar Usuario" : "Información de Usuario"}
        </h1>
        {isEditMode ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-bold">
                Nombre:
              </label>
              <input
                type="text"
                {...register("name")}
                onChange={handleInputChange}
                name="name"
                value={editedData.name}
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emergency_contact" className="mb-1 font-bold">
                Contacto de emergencia:
              </label>
              <input
                type="text"
                {...register("emergency_contact")}
                onChange={handleInputChange}
                name="emergency_contact"
                value={editedData.emergency_contact}
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emergency_number" className="mb-1 font-bold">
                Número de emergencia:
              </label>
              <input
                type="text"
                {...register("emergency_number", { valueAsNumber: true })}
                onChange={handleInputChange}
                name="emergency_number"
                value={editedData.emergency_number}
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="blood_type" className="mb-1 font-bold">
                Tipo de sangre:
              </label>
              <input
                type="text"
                {...register("blood_type")}
                onChange={handleInputChange}
                name="blood_type"
                value={editedData.blood_type}
                className="hover:border-blue-500 focus:border-blue-500 w-72 md:w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  mx-auto "
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <div className="grid grid-cols-2 gap-4  ">
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-2">
                  <div className="text-lg mb-2">
                    <div>
                      <span className="font-bold">Nombre:</span>
                    </div>
                    <div>{userData.name}</div>
                  </div>
                  <div className="text-lg mb-2">
                    <div>
                      <span className="font-bold">Contacto de emergencia:</span>
                    </div>
                    <div>{userData.emergency_contact}</div>
                  </div>
                  <div className="text-lg mb-2">
                    <div>
                      <span className="font-bold">Número de emergencia:</span>
                    </div>
                    <div>{userData.emergency_number}</div>
                  </div>
                  <div className="text-lg mb-2">
                    <div>
                      <span className="font-bold">Tipo de sangre:</span>
                    </div>
                    <div>{userData.blood_type}</div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="p-8 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-full">
                    <QRCodeSVG value="https://reactjs.org/" />{" "}
                  </div>
                  <Link
                    href={`/publicUserInfo/${userData.id}`}
                    className="text-black hover:text-pink-700 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4"
                  >
                    Pagina de Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditMode ? (
          <div className="flex gap-4 mt-4">
            <button
              onClick={toggleEditMode}
              className="  text-black hover:text-pink-700  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit(saveChanges)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="">
            <Link
              href="/dashboard"
              className="  text-black hover:text-pink-700  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
            >
              Cancelar
            </Link>
            <button
              onClick={toggleEditMode}
              className="bg-pink-600 hover:bg-pink-700 text-white mt-4 font-bold py-2 px-12 rounded-full focus:outline-none focus:shadow-outline"
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
