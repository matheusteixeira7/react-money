import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

interface IAddTransactionModalProps {
  handleModal: () => void;
  updateData: () => void;
}

export const AddTransactionModal = ({
  handleModal,
  updateData,
}: IAddTransactionModalProps) => {
  const [transactionType, setTransactionType] = useState("");
  const addTransactionSchema = Yup.object().shape({
    title: Yup.string().required("Nome é obrigatório"),
    value: Yup.number().required("Valor é obrigatório"),
    type: Yup.string().required("Tipo de transação é obrigatório"),
    category: Yup.string().required("Categoria é obrigatório"),
  });

  const initialValues = {
    title: "",
    value: "",
    type: "",
    category: "",
  };

  const handleCloseModal = () => {
    handleModal();
  };

  const handleUpdateData = () => {
    updateData();
  };

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

      <Formik
        initialValues={initialValues}
        validationSchema={addTransactionSchema}
        onSubmit={(values) => {
          const data = {
            id: uuidv4(),
            title: values.title,
            value: values.value,
            type: values.type,
            category: values.category,
            date: new Date(),
          };

          try {
            axios.post("http://localhost:3333/transactions", data);

            handleUpdateData();
            handleCloseModal();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Field
              name="title"
              type="text"
              placeholder="Nome"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-6 leading-tight focus:outline-none focus:bg-white"
            />
            {errors.title && touched.title ? (
              <div className="text-red-500 mb-4 mt-1">{errors.title}</div>
            ) : null}

            <Field
              name="value"
              type="number"
              placeholder="Valor"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white"
            />
            {errors.value && touched.value ? (
              <div className="text-red-500 mb-4 mt-1">{errors.value}</div>
            ) : null}

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div
                className={`flex justify-center items-center hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
                  values.type === "income" ? "bg-green-100" : "bg-white"
                }`}
                onClick={() => setFieldValue("type", "income")}
              >
                <BsArrowUpCircle className={`mr-2 text-green-500 text-2xl`} />
                <span className="">Entrada</span>
              </div>

              <div
                className={`flex justify-center items-center  hover:cursor-pointer border border-gray-300 py-3 px-4 rounded ${
                  values.type === "outcome" ? "bg-red-100" : "bg-white"
                }`}
                onClick={() => setFieldValue("type", "outcome")}
              >
                <BsArrowDownCircle className={`mr-2 text-red-500 text-2xl`} />
                <span className="">Saída</span>
              </div>
            </div>
            {errors.type && touched.type ? (
              <div className="text-red-500 mb-4 mt-1">{errors.type}</div>
            ) : null}

            <Field
              name="category"
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white"
            />
            {errors.category && touched.category ? (
              <div className="text-red-500 mb-4 mt-1">{errors.category}</div>
            ) : null}
            <button
              type="submit"
              className="bg-secondary hover:bg-buttonHover active:bg-buttonActive transition-all font-semibold text-white py-2 px-4 mt-3 rounded w-full"
            >
              Cadastrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
