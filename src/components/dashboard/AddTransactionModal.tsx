import { useEffect, useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

interface IProps {
  isOpen: boolean;
  handleModal: () => void;
}

export const AddTransactionModal = ({ isOpen, handleModal }: IProps) => {
  const [type, setType] = useState("");
  const handleNewTransaction = (e: any) => {
    console.log("new transaction");
    handleModal();
    e.preventDefault();
  };
  const handleCloseModal = () => {
    handleModal();
  };

  useEffect(() => {
    console.log(type);
  });

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-titles text-xl">
          Cadastrar transação
        </span>
        <IoMdClose
          className="text-titles text-xl hover:cursor-pointer"
          onClick={handleCloseModal}
        />
      </div>

      <form onSubmit={handleNewTransaction}>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 mt-6 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Nome"
        ></input>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="number"
          placeholder="Valor"
        ></input>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div
            className={`flex justify-center items-center hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
              type === "income" ? "bg-green-100" : "bg-white"
            }`}
            onClick={() => setType("income")}
          >
            <BsArrowUpCircle className={`mr-2 text-green-500 text-2xl`} />
            <span className="">Entrada</span>
          </div>
          <div
            className={`flex justify-center items-center  hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
              type === "outcome" ? "bg-red-100" : "bg-white"
            }`}
            onClick={() => setType("outcome")}
          >
            <BsArrowDownCircle className={`mr-2 text-red-500 text-2xl`} />
            <span className="">Saída</span>
          </div>
        </div>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Categoria"
        ></input>
        <button className="bg-secondary hover:bg-buttonHover active:bg-buttonActive transition-all font-semibold text-white py-2 px-4 rounded w-full">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

// <AddTransactionModal isOpen={modalOpen} handleModal={handleModal} />
