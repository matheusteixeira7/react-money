import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  handleModal: () => void;
  updateData: () => void;
}

export const AddTransactionModal = ({ handleModal, updateData }: IProps) => {
  const [transactionType, setTransactionType] = useState("");

  const handleCloseModal = () => {
    handleModal();
  };

  const handleUpdateData = () => {
    updateData();
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      value: "",
      category: "",
    },
    onSubmit: (values) => {
      const data = {
        id: uuidv4(),
        title: values.title,
        value: values.value,
        type: transactionType,
        category: values.category,
        date: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
      };

      try {
        axios.post("http://localhost:3333/transactions", data);

        handleUpdateData();
        handleCloseModal();
      } catch (error) {
        console.log(error);
      }
    },
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

      <form onSubmit={formik.handleSubmit}>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 mt-6 leading-tight focus:outline-none focus:bg-white"
          id="title"
          name="title"
          type="text"
          placeholder="Nome"
          onChange={formik.handleChange}
          value={formik.values.title}
        ></input>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="value"
          name="value"
          type="number"
          placeholder="Valor"
          onChange={formik.handleChange}
          value={formik.values.value}
        ></input>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div
            className={`flex justify-center items-center hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
              transactionType === "income" ? "bg-green-100" : "bg-white"
            }`}
            onClick={() => setTransactionType("income")}
          >
            <BsArrowUpCircle className={`mr-2 text-green-500 text-2xl`} />
            <span className="">Entrada</span>
          </div>
          <div
            className={`flex justify-center items-center  hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
              transactionType === "outcome" ? "bg-red-100" : "bg-white"
            }`}
            onClick={() => setTransactionType("outcome")}
          >
            <BsArrowDownCircle className={`mr-2 text-red-500 text-2xl`} />
            <span className="">Saída</span>
          </div>
        </div>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="category"
          name="category"
          type="text"
          placeholder="Categoria"
          onChange={formik.handleChange}
          value={formik.values.category}
        ></input>
        <button
          type="submit"
          className="bg-secondary hover:bg-buttonHover active:bg-buttonActive transition-all font-semibold text-white py-2 px-4 rounded w-full"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};
