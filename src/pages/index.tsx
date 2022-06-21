import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AddTransactionModal } from "../components/dashboard/AddTransactionModal";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MainCard } from "../components/dashboard/MainCard";
import { TransactionList } from "../components/dashboard/TransactionList";

interface IProps {
  id: string;
  title: string;
  value: number;
  type: "income" | "outcome";
  category: string;
  date: string;
}

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<IProps[]>([]);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3333/transactions");
      setTransactions(result.data);
    };

    fetchData();
  }, [fetch]);

  const updateData = () => {
    setFetch(!fetch);
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleRequestClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const calculateIncome = (): number => {
      return transactions.reduce((acc, curr) => {
        if (curr.type === "income") {
          return acc + curr.value;
        }
        return acc;
      }, 0);
    };

    const calculateExpenses = (): number => {
      return transactions.reduce((acc, curr) => {
        if (curr.type === "outcome") {
          return acc + curr.value;
        }
        return acc;
      }, 0);
    };

    const calculateBalance = (): number => {
      return calculateIncome() - calculateExpenses();
    };

    setIncome(calculateIncome);
    setOutcome(calculateExpenses);
    setBalance(calculateBalance);
  }, [transactions]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <DashboardHeader openModal={handleOpenModal} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleRequestClose}
        ariaHideApp={false}
        overlayClassName="bg-gray-900 bg-opacity-50 flex justify-center items-end md:items-center fixed inset-0"
        className="bg-background p-8 rounded w-full md:max-w-xl"
        contentLabel="Adicione uma transação"
      >
        <AddTransactionModal
          handleModal={handleModal}
          updateData={updateData}
        />
      </Modal>
      <div className="transform -translate-y-24 max-w-4xl m-auto">
        <div className="grid grid-flow-col auto-cols-max gap-4 md:justify-between overflow-auto mb-8 pl-6">
          <MainCard
            title="Entradas"
            value={income}
            transactionType="income"
            lastTransaction="12/12/2020"
          />
          <MainCard
            title="Saídas"
            value={outcome}
            transactionType="outcome"
            lastTransaction="12/12/2020"
          />
          <MainCard
            title="Total"
            value={balance}
            transactionType="total"
            lastTransaction="12/12/2020"
          />
        </div>
        <div className="px-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl">Listagem</span>
            <span className="font-medium text-sm text-text">
              {transactions.length}{" "}
              {transactions.length === 1 ? "item" : "itens"}
            </span>
          </div>
        </div>
        {transactions
          .slice(0)
          .reverse()
          .map((transaction) => (
            <TransactionList
              key={transaction.id}
              title={transaction.title}
              value={transaction.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              transactionType={transaction.type}
              category={transaction.category}
              date={transaction.date}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
