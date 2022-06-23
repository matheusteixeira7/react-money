import { signOut } from "next-auth/react";
import { FiDollarSign } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

interface IProps {
  openModal: () => void;
}

const DashboardHeader = ({ openModal }: IProps) => {
  return (
    <div>
      <header className="bg-primary h-52 py-6">
        <div className="flex justify-between max-w-4xl px-6 m-auto">
          <div className="flex items-center">
            <div className="bg-secondary p-2 rounded-full mr-2">
              <FiDollarSign className="text-white text-xl" />
            </div>

            <span className="text-white font-semibold text-sm md:text-lg">
              Dev Money
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={openModal}
              className="bg-primary brightness-125 p-3 rounded-[4px] text-white font-semibold my-6 hover:brightness-90 active:brightness-90 transition-all ease-in-out"
            >
              Nova transação
            </button>

            <span
              title="Fazer logout"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              <MdLogout className="text-white text-2xl ml-4 cursor-pointer hover:brightness-110 active:brightness-90 transition-all ease-in-out" />
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export { DashboardHeader };
