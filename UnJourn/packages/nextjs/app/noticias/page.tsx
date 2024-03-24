"use client";

import Image from "next/image";
import MostFoll from "../../components/MostFoll";
import Noticia from "../../components/NoticiaComponente";
import Logo from "../../components/assets/Unjourn.svg";

const noticias = () => {
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
        </div>

        <div className="flex translate-x-40">
          <MostFoll />
        </div>
      </div>
    </div>
  );
};

export default noticias;
