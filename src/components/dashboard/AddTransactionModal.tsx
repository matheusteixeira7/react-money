import axios from "axios";
import { Field, Form, Formik } from "formik";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

interface IAddTransactionModalProps {
  handleCloseModal: () => void;
  updateData: () => void;
}

export const AddTransactionModal = ({
  handleCloseModal,
  updateData,
}: IAddTransactionModalProps) => {
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

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold text-titles">
          Cadastrar transação
        </span>
        <IoMdClose
          className="text-xl text-titles hover:cursor-pointer"
          onClick={() => handleCloseModal()}
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

            updateData();
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
              className="mt-6 block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            />
            {errors.title && touched.title ? (
              <div className="mb-4 mt-1 text-red-500">{errors.title}</div>
            ) : null}

            <Field
              name="value"
              type="number"
              placeholder="Valor"
              className="mt-3 block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            />
            {errors.value && touched.value ? (
              <div className="mb-4 mt-1 text-red-500">{errors.value}</div>
            ) : null}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div
                className={`flex items-center justify-center rounded border border-gray-300 py-3 px-4 hover:cursor-pointer ${
                  values.type === "income" ? "bg-green-100" : "bg-white"
                }`}
                onClick={() => setFieldValue("type", "income")}
              >
                <BsArrowUpCircle className={`mr-2 text-2xl text-green-500`} />
                <span className="">Entrada</span>
              </div>

              <div
                className={`flex items-center justify-center  rounded border border-gray-300 py-3 px-4 hover:cursor-pointer ${
                  values.type === "outcome" ? "bg-red-100" : "bg-white"
                }`}
                onClick={() => setFieldValue("type", "outcome")}
              >
                <BsArrowDownCircle className={`mr-2 text-2xl text-red-500`} />
                <span className="">Saída</span>
              </div>
            </div>
            {errors.type && touched.type ? (
              <div className="mb-4 mt-1 text-red-500">{errors.type}</div>
            ) : null}

            <Field
              name="category"
              type="text"
              className="mt-3 block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            />
            {errors.category && touched.category ? (
              <div className="mb-4 mt-1 text-red-500">{errors.category}</div>
            ) : null}
            <button
              type="submit"
              className="mt-3 w-full rounded bg-secondary py-2 px-4 font-semibold text-white transition-all hover:bg-buttonHover active:bg-buttonActive"
            >
              Cadastrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
