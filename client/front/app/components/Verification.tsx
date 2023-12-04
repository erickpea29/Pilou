import { ACTIVATE_USER } from "@/graphql/actions/activation.actions";
import { useMutation } from "@apollo/client";
import { FC, useRef, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import toast from "react-hot-toast";

import Header from "./Header";

type Props = {
  setActiveState: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setActiveState }) => {
  const [ActivateUser, { loading }] = useMutation(ACTIVATE_USER);
  const [invalidError, setInvalidError] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    const activationToken = localStorage.getItem("activation_token");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    } else {
      const data = {
        activationToken,
        activationCode: verificationNumber,
      };
      try {
        await ActivateUser({
          variables: data,
        });
        localStorage.removeItem("activation_token");
        toast.success("Cuenta activada exitosamente");
        setActiveState("Login");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <>
      <Header isActive={false} />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Verifica tu cuenta</h1>
            <div className="mt-2">
              <div className="inline-block">
                <MdVerifiedUser className="w-9 h-9 text-pink-300 -mb-5" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {Object.keys(verifyNumber).map((key, index) => (
              <input
                type="number"
                key={key}
                ref={inputRefs[index]}
                className={`w-16 h-16 bg-transparent border-2 rounded-lg flex items-center text-black text-2xl font-bold outline-none text-center ${
                  invalidError
                    ? "animate-shake border-red-500"
                    : "border-gray-400"
                }`}
                placeholder=""
                maxLength={1}
                value={verifyNumber[key as keyof VerifyNumber]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              disabled={loading}
              onClick={verificationHandler}
              className="bg-pink-500 text-white rounded-full py-2 px-4 hover:bg-pink-600 focus:outline-none focus:bg-pink-600 w-full"
            >
              Verificar
            </button>
          </div>
          <h5 className="text-center pt-4 text-gray-500">
            <span className="text-gray-700 mr-2">¿Ya tienes una cuenta?</span>
            <span
              className="text-pink-500 font-bold cursor-pointer"
              onClick={() => setActiveState("Login")}
            >
              Iniciar sesión
            </span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Verification;
