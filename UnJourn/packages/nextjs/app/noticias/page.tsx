"use client";

import { useState } from "react";
import Image from "next/image";
import MostFoll from "../../components/MostFoll";
import Noticia from "../../components/NoticiaComponente";
import Logo from "../../components/assets/Unjourn.svg";
import Lapis from "../../components/assets/fi-rr-pencil.svg";
import { useCreatePost } from "../../lib/useCreatePost";

const noticias = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-auto w-full flex flex-col bg-black p-10 pl-5 pr-5 text-white">
      <div className="flex mt-20">
        <Image
          className="translate-x-[30vh] -translate-y-[4vh]"
          src={Logo}
          width={400}
          height={400}
          alt="Picture of the author"
        />
        <h1 className="ml-4  translate-x-80 text-[50px]">
          <span className="font-bold text-white">Welcome to UnJourn,</span>
          <br />
          a social network built <br />
          for independent Journalist
        </h1>
      </div>
      <div className="bg-gray-500 w-full h-0.5 mt-10"></div>

      <div className="flex">
        <div role="tablist" className="tabs tabs-bordered text-white justify-start translate-x-40">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="World"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10 text-white">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="Asian"
          />
          <div role="tabpanel" className="tab-content">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="African"
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="America"
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="Middle East"
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="Europe"
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="flex flex-col">
              <Noticia />
              <Noticia />
              <Noticia />
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center translate-x-72 translate-y-16">
              <button
                className="rounded-full bg-blue-500 p-2 w-16 h-16 flex justify-center items-center"
                onClick={openModal}
              >
                <Image className="" src={Lapis} width={30} height={30} alt="Picture of the author" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex translate-x-40">
          <MostFoll />
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-black p-8 rounded-lg flex flex-col text-center justify-center w-[500px] h-[600px]">
            <h2 className="text-white text-bold text-[25px]">Create a notice</h2>
            <form className="text-black flex flex-col items-center justify-center">
              <label className="form-control w-full max-w-xs mt-10">
                <input
                  type="text"
                  placeholder="Insert Title"
                  className="input input-bordered w-full max-w-xs"
                  onChange={e => setTitle(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs mt-10">
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Bio"
                  onChange={e => setContent(e.target.value)}
                ></textarea>
              </label>
              <button className="rounded-full bg-blue-500 text-white w-64 h-16 text-[20px] font-bold mt-10">
                Post
              </button>
            </form>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default noticias;
