"use client";

import Header from "@/app/components/Header";
import React from "react";
import { GET_USER_BY_ID } from "@/graphql/actions/getUserById.action";
import { useQuery } from "@apollo/client";
import { NextUIProvider, button } from "@nextui-org/react";
import PDFFile from "@/app/components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Page = ({ params }: { params: { id: string } }) => {
  const userInfo = params;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userInfo.id },
  });

  const userData = {
    id: data?.getUserById.id || "",
    name: data?.getUserById.name || "",
    emergency_contact: data?.getUserById.emergency_contact || "",
    emergency_number: data?.getUserById.emergency_number || "",
    blood_type: data?.getUserById.blood_type || "",
    image: data?.getUserById.image || "",
  };
  return (
    <div>
      <NextUIProvider>
        <Header />
        <div className="flex items-center justify-center h-screen relative text-center">
          <div
            className={
              "flex flex-col items-center mx-auto p-8 bg-white border border-gray-300 rounded-md shadow-md transition-all duration-300 "
            }
          >
            <h1 className="text-2xl font-bold mb-4">Información de Usuario</h1>
            <div className="flex items-center justify-center ">
              <div className="grid  gap-4  ">
                <div className="col-span-1">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="text-lg mb-2">
                      <div>
                        <span className="font-bold">Nombre</span>
                      </div>
                      <div>{userData.name}</div>
                    </div>
                    <div className="text-lg mb-2">
                      <div>
                        <span className="font-bold">
                          Contacto de emergencia
                        </span>
                      </div>
                      <div>{userData.emergency_contact}</div>
                    </div>
                    <div className="text-lg mb-2">
                      <div>
                        <span className="font-bold">Número de emergencia</span>
                      </div>
                      <div>{userData.emergency_number}</div>
                    </div>
                    <div className="text-lg mb-2">
                      <div>
                        <span className="font-bold">Tipo de sangre</span>
                      </div>
                      <div>{userData.blood_type}</div>
                    </div>
                    <PDFDownloadLink
                      document={<PDFFile userData={userData} />}
                      fileName="Data"
                    >
                      {({ loading }) =>
                        loading ? (
                          <button>Cargando</button>
                        ) : (
                          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                            Descargar
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NextUIProvider>
    </div>
  );
};

export default Page;
