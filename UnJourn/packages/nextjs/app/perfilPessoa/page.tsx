"use client";

import Noticia from "../../components/NoticiaComponente";

export default function PerfilPessoa() {
  return (
    <div className="h-auto w-full flex flex-col bg-black text-white">
      <div className="h-[35vh] w-full bg-[#068DB8] flex justify-center pb-8">
        <div className="flex  flex-col items-start w-full mb-auto p-32">
          <div className="w-64 h-64 rounded-md border-8 border-black overflow-hidden mr-4">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" />
          </div>
            <div className=" justify-center items-center">
              <h1 className="font-bold text-2xl">Unjourn</h1>
              <p className="font-bold">@UnJourn</p>
              <div>Unjourn - Decentralized</div>
              <div>Social Network</div>
            </div>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center pl-56">
        <div className="text-black p-1 rounded w-full max-w-4xl">
              <button className="bg-[#068DB8] text-white font-bold py-2 px-4 rounded">
                Feed
              </button>
              <button className="bg-[#068DB8] text-white font-bold py-2 px-4 rounded ml-2">
                Replies
              </button>
              <Noticia />
              <Noticia />
        </div>
      </div>
    </div>
  );
}
