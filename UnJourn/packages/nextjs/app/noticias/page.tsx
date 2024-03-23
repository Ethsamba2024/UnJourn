"use client";

import Image from "next/image";
import Noticia from "../../components/NoticiaComponente";
import Logo from "../../components/assets/Unjourn.svg";

const noticias = () => {
  return (
    <div className="h-auto w-full flex flex-col bg-black p-10 pl-5 pr-5 text-white">
      <div className="flex flex-row mt-20">
        <Image
          className="translate-x-[30vh] -translate-y-[4vh]"
          src={Logo}
          width={400}
          height={400}
          alt="Picture of the author"
        />
        <h1 className="ml-4  translate-x-80 text-[50px]">
          <span className="font-bold text-white">Welcome to UnJourn,</span><br /> 
          a social network built <br />  
          for independent Journalist 
        </h1>
      </div>

      <Noticia />
      <Noticia />
      <Noticia />
    </div>
  );
};

export default noticias;
