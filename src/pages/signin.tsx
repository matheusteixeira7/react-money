import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiDollarSign } from "react-icons/fi";
import { ImFacebook2 } from "react-icons/im";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white md:bg-background">
      <div className="w-full max-w-sm bg-white p-6 rounded-md md:drop-shadow-lg">
        <header className="flex flex-col mb-6">
          <div className="flex flex-col items-center">
            <div className="bg-secondary p-2 rounded-full mb-2">
              <FiDollarSign className="text-white text-4xl" />
            </div>
            <span className="text-titles font-semibold text-lg">Dev Money</span>
          </div>
          <span className="text-center text-titles">
            Faça seu login para continuar
          </span>
        </header>

        <section className="flex flex-col">
          <input
            type="email"
            placeholder="E-mail"
            className="rounded-[4px] border-text placeholder:text-text"
          />
          <button className="bg-primary  p-3 rounded-[4px] text-white font-semibold my-6 hover:brightness-110 active:brightness-90 transition-all ease-in-out">
            Continuar
          </button>
        </section>

        <div className="relative flex mb-6 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-titles">ou</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <section className="flex flex-col items-start">
          <button className="flex items-center border border-text rounded-[4px] w-full px-6 py-3 mb-3 hover:bg-gray-100 active:bg-gray-200 transition-all ease-in-out">
            <FcGoogle className="text-xl" />
            <span className="ml-3 text-base text-titles">
              Entrar com Google
            </span>
          </button>

          <button className="flex items-center border border-text rounded-[4px] w-full px-6 py-3 mb-3 hover:bg-gray-100 active:bg-gray-200 transition-all ease-in-out">
            <ImFacebook2 className="text-xl text-blue-800" />
            <span className="ml-3 text-base text-titles">
              Entrar com Facebook
            </span>
          </button>

          <button
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000/" })
            }
            className="flex items-center border border-text rounded-[4px] w-full px-6 py-3 hover:bg-gray-100 active:bg-gray-200 transition-all ease-in-out"
          >
            <FaGithub className="text-xl text-titles" />
            <span className="ml-3 text-base text-titles">
              Entrar com Github
            </span>
          </button>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
