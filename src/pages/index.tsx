import axios from "axios";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AddTransactionModal } from "../components/dashboard/AddTransactionModal";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MainCard } from "../components/dashboard/MainCard";
import { TransactionList } from "../components/dashboard/TransactionList";

interface IHomeProps {
  id: string;
  title: string;
  value: number;
  type: "income" | "outcome";
  category: string;
  date: string;
}

export default function Home() {
  const { data: session, status } = useSession();

  const [transactions, setTransactions] = useState<IHomeProps[]>([]);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [latestIncomeDate, setLatestIncomeDate] = useState("");
  const [latestExpenseDate, setLatestExpenseDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3333/transactions");
      setTransactions(result.data);
    };

    fetchData();
  }, [fetch]);

  useEffect(() => {
    const calculateIncome = () => {
      const income = transactions.reduce((acc, curr) => {
        if (curr.type === "income") {
          return acc + curr.value;
        }
        return acc;
      }, 0);

      setIncome(income);
    };

    const calculateExpenses = () => {
      const outcome = transactions.reduce((acc, curr) => {
        if (curr.type === "outcome") {
          return acc + curr.value;
        }
        return acc;
      }, 0);

      setOutcome(outcome);
    };

    const calculateBalance = (): number => {
      return income - outcome;
    };

    const calculateLatestIncomeTransaction = () => {
      const newestIncomeTransaction = transactions.reduce(
        (acc, curr) => {
          if (curr.type === "income") {
            if (acc.date < curr.date) {
              return curr;
            }
            return acc;
          }
          return acc;
        },
        { date: "", title: "", value: 0, type: "", category: "" }
      );

      setLatestIncomeDate(newestIncomeTransaction.date);
    };

    const calculateLatestExpenseTransaction = () => {
      const latestExpenseTransaction = transactions.reduce(
        (acc, curr) => {
          if (curr.type === "outcome") {
            if (acc.date < curr.date) {
              return curr;
            }
            return acc;
          }
          return acc;
        },
        { date: "", title: "", value: 0, type: "", category: "" }
      );

      setLatestExpenseDate(latestExpenseTransaction.date);
    };

    calculateIncome();
    calculateExpenses();
    setBalance(calculateBalance);
    calculateLatestIncomeTransaction();
    calculateLatestExpenseTransaction();
  }, [income, outcome, transactions]);

  return (
    <>
      <DashboardHeader openModal={() => setModalOpen(true)} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        overlayClassName="flex bg-gray-900 bg-opacity-50 justify-center items-end md:items-center fixed inset-0"
        className="w-full rounded bg-background p-8 md:max-w-xl"
        contentLabel="Adicione uma transação"
      >
        <AddTransactionModal
          handleCloseModal={() => setModalOpen(!modalOpen)}
          updateData={() => setFetch(!fetch)}
        />
      </Modal>

      <div className="m-auto max-w-4xl -translate-y-24 transform">
        <div className="mb-8 grid auto-cols-max grid-flow-col gap-4 overflow-auto pl-6 md:justify-between">
          <MainCard
            title="Entradas"
            value={income}
            transactionType="income"
            lastTransaction={latestIncomeDate}
          />
          <MainCard
            title="Saídas"
            value={outcome}
            transactionType="outcome"
            lastTransaction={latestExpenseDate}
          />
          <MainCard
            title="Total"
            value={balance}
            transactionType="total"
            lastTransaction="12/12/2020"
          />
        </div>

        <div className="px-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xl">Listagem</span>
            <span className="text-sm font-medium text-text">
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
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
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
