import { useState } from "react";
import Image from "next/image";
import Comentario from "../components/assets/com.svg";
import Like from "../components/assets/like.svg";
import Share from "../components/assets/share.svg";

const NoticiaComponente = props => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="">
      <div
        className={`card card-compact w-[45vw] shadow-xl mt-10 pr-10 pt-4 text-white pl-10 pb-10 border border-white border-opacity-25 ${
          hovered ? "bg-gray-700" : "bg-black"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="card-body">
          <div className="flex justify-start items-center">
            <p className="font-bold text-[18px] text-white">{props.endereco}</p>
            <p className="translate-x-28">{props.createdAt}</p>
          </div>
          <h2 className="card-title flex justify-center">UnJourn</h2>
          <p>{props.content}</p>
          <div className="card-actions justify-end">
            <div className="flex justify-start translate-y-6">
              <div className="flex mr-14">
                {/* Altere a cor das imagens SVG para branco aplicando estilos CSS */}
                <Image className="fill-white" src={Comentario} width={35} height={35} alt="Picture of the author" />
                <p className="ml-4">{props.comments}</p>
              </div>
              <div className="flex mr-14">
                <Image className="fill-white" src={Share} width={35} height={35} alt="Picture of the author" />
                <p className="ml-4">{props.mirrors}</p>
              </div>
              <div className="flex">
                <Image className="fill-white" src={Like} width={35} height={35} alt="Picture of the author" />
                <p className="ml-4">{props.upvoted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticiaComponente;
