"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "Standard",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>("");

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelect = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
    setFileName(item.name);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "engineer");
    data.append("api_key", "559915551345217");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/pizzaart/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-[#121c18]"
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-6"
      >
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-[#121c18]">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <div
          className="d-flex align-items-center justify-content-center"
          
        >
          <h1 className="text-center text-4xl text-gray-300 font-bold">
            Dodaj nowy produkt
          </h1>
        </div>

        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload1.png" alt="" width={30} height={20} />
            <span>Prześlij zdjęcie</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="hidden"
          />
          {fileName && <p className="text-gray-300">{fileName}</p>}
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Tytuł</label>
          <input
            className="ring-1 ring-[#121c18] p-4 rounded-sm placeholder:text-[#b0b1b0] outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Opis</label>
          <textarea
            rows={3}
            className="ring-1 ring-[#121c18] p-4 rounded-sm placeholder:text-[#b0b1b0] outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Cena</label>
          <input
            className="ring-1 ring-[#121c18] p-4 rounded-sm placeholder:text-[#b0b1b0] outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Kategoria</label>
          <select
            className="ring-1 ring-[#121c18] p-4 rounded-sm placeholder:text-[#b0b1b0] outline-none"
            placeholder="pizzas"
            name="catSlug"
            onChange={handleSelect}
          >
            <option value="speciale">Speciale</option>
            <option value="rosse">Rosse</option>
            <option value="bianche">Bianche</option>
          </select>
        </div>
        <button
          className="p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center bg-green-700"
          onClick={() => setOptions((prev) => [...prev, option])}
        >
          Dodaj produkt
        </button>
      </form>
    </div>
    </motion.form>
    </motion.div>
  );
};

export default AddPage;
