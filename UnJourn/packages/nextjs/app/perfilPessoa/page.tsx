const perfilPessoa = () => {
  return (
    <>
      <div className="h-screen w-full flex bg-black text-white">
        <div className="h-[35vh] w-full bg-[#068DB8]">
          <div className="avatar">
            <div className="w-64 rounded translate-x-40 translate-y-56 border-8 border-black">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="">
            <p className="font-bold">Stani</p>
            <p className="font-bold">82.389</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default perfilPessoa;
