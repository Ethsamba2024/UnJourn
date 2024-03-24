"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "../components/assets/Photo";
import Lumix from "../components/assets/lumix.svg";
import Micro from "../components/assets/micro.png";
import Seta from "../components/assets/seta.svg";
import {
  autenticateUser,
  fetchExploreProfiles,
  fetchExplorePublications,
  fetchFeedResults,
  generateChallenge,
} from "/api2";
import SignInButton from "/components/SignInButton";
import { Address } from "/components/scaffold-eth";
import type { NextPage } from "next";
import { FaChevronDown } from "react-icons/fa";
import { useAccount, useWalletClient } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [profiles, setProfiles] = useState<any>([]);
  const [publications, setPublications] = useState<any>([]);

  useEffect(() => {
    fetchExploreProfiles();
    fetchExplorePublications();
  }, []);

  const wallet = useWalletClient();

  return (
    <>
      <div className="bg-black h-[83vh] w-full flex flex-col">
        <div className="flex flex-row">
          <Photo className="h-[500px] w-[500px] translate-y-48 translate-x-36" />
          <div className="translate-x-[60vh] "></div>
          <div className="mt-24 translate-x-72">
            <h1 className="text-white text-[60px] font-bold font-inter translate-y-36">Be an independent journalist</h1>
            <p className="text-white text-[35px] font-bold font-inter translate-y-36  mt-10 ml-10">
              See news from all over the <br /> world without censorship,
              <br /> come be an unjourn.
            </p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center translate-y-64">
          <FaChevronDown className="w-10 h-10 text-white" />
          <h2 className="font-bold text-[25px] text-white">know more</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
