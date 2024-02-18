"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    setShowOrders(true); // Trigger animation on component mount
  }, []);

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success("Zmiana statusu zamówienia!");
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <AnimatePresence>
        {showOrders && (
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full border-separate border-spacing-3"
          >
            <thead>
              <tr className="text-left">
                <th className="hidden md:block">ID Zamówienia</th>
                <th>Data</th>
                <th>Cena</th>
                <th className="hidden md:block">Produkt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: OrderType) => (
                <motion.tr
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${item.status !== "dostarczono" && "bg-red-100"}`}
                  key={item.id}
                >
                  <td className="hidden md:block py-6 px-1">{item.id}</td>
                  <td className="py-6 px-1">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="py-6 px-1">{item.price}</td>
                  <td className="hidden md:block py-6 px-1">
                    {item.products[0].title}
                  </td>
                  {session?.user.isAdmin ? (
                    <td>
                      <form
                        className="flex items-center justify-center gap-4"
                        onSubmit={(e) => handleUpdate(e, item.id)}
                      >
                        <input
                          placeholder={item.status}
                          className="p-2 ring-1 ring-[#769362a7] rounded-md"
                        />
                        <button className="bg-[#121c18] p-2 rounded-full">
                          <Image src="/edit.png" alt="" width={20} height={20} />
                        </button>
                      </form>
                    </td>
                  ) : (
                    <td className="py-6 px-1">{item.status}</td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;
