"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { GET_USERS } from "@/graphql/actions/getUsers.action";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "@/graphql/actions/deleteUser.action";
import { FaRegTrashAlt } from "react-icons/fa";

const Table = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  console.log(data);

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
  }, [loading, data]);

  const handleDeleteUser = (id: string) => {
    try {
      deleteUser({
        variables: {
          id,
        },
      });
      refetch();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mx-10 py-5">
        <h2 className="text-gray-800 font-semibold text-3xl">Usuarios</h2>
        <Link
          href="/addUser"
          className="px-4 py-2 bg-pink-500  hover:bg-pink-700 font-bold text-white  rounded-3xl"
        >
          Agregar usuario
        </Link>
      </div>
      <div className="flex-grow overflow-auto mx-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-base">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Contacto de emergencia
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Teléfono de emergencia
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Tipo de sangre
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  <span className="sr-only">Editar</span>
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  <span className="sr-only">Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.getUsers.map((user: any) => {
                  if (user.role === "User") {
                    return (
                      <tr
                        key={user.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4">{user.emergency_contact}</td>
                        <td className="px-6 py-4">{user.emergency_number}</td>
                        <td className="px-6 py-4">{user.blood_type}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/userInfo/${user.id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Editar
                          </Link>
                        </td>
                        <td className="">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
