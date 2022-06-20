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
  name: string;
  price: number;
  type: "income" | "outcome";
  category: string;
  date: string;
}

const Home: NextPage = () => {
  useEffect(() => {
    try {
      axios.get("/api/transactions").then((res) => setTransactions(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [transactions, setTransactions] = useState<IProps[]>([]);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);

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
          return acc + curr.price;
        }
        return acc;
      }, 0);
    };

    const calculateExpenses = (): number => {
      return transactions.reduce((acc, curr) => {
        if (curr.type === "outcome") {
          return acc + curr.price;
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
    <div className="bg-background">
      <DashboardHeader openModal={handleOpenModal} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleRequestClose}
        ariaHideApp={false}
        overlayClassName="bg-gray-900 bg-opacity-50 flex justify-center items-end fixed inset-0"
        className="bg-background p-8 rounded w-full"
        contentLabel="Adicione uma transação"
      >
        <AddTransactionModal handleModal={handleModal} />
      </Modal>
      <div className="transform -translate-y-24">
        <div className="flex overflow-auto mb-8 pl-6">
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
            <span className="font-medium text-sm text-text">4 itens</span>
          </div>
        </div>
        {transactions.map((transaction) => (
          <TransactionList
            key={transaction.id}
            title={transaction.name}
            value={transaction.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            transactionType={transaction.type}
            category={transaction.category}
            date={transaction.date}
          />
        ))}
      </div>
    </div>
  );
};

<style jsx>{`
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: end;
  }
`}</style>;

export default Home;
