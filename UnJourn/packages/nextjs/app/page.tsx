"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "../components/assets/Photo";
import Lumix from "../components/assets/lumix.svg";
import Micro from "../components/assets/micro.png";
import Seta from "../components/assets/seta.svg";
import type { NextPage } from "next";
import { useAccount, useWalletClient } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  autenticateUser,
  fetchExploreProfiles,
  fetchExplorePublications,
  fetchFeedResults,
  generateChallenge,
} from "~~/api2";
import SignInButton from "~~/components/SignInButton";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [profiles, setProfiles] = useState<any>([]);
  const [publications, setPublications] = useState<any>([]);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     const response = await client.query({ query: exploreProfiles });
  //     const profileData = await Promise.all(
  //       response.data.exploreProfiles.items.filter(async (profileInfo: { picture: { __typename: string } }) => {
  //         return profileInfo.picture.__typename === "MediaSet";
  //       }),
  //     );
  //     console.log(profileData);
  //     setProfiles(profileData);
  //   };
  //   fetchProfiles();
  // }, []);

  // useEffect(() => {
  //   const fetchPublications = async () => {
  //     const response = await client.query({ query: explorePublicationsQuery, variables: {} });
  //     console.log(response.data);
  //     // const publicationData = await Promise.all(
  //     //   response.data.getPublications.items.filter(async (publicationInfo: { cover: { __typename: string } }) => {
  //     //     return publicationInfo.cover.__typename === "MediaSet";
  //     //   }),
  //     // );
  //   };
  //   fetchPublications();
  // }, []);

  useEffect(() => {
    fetchExploreProfiles();
    fetchExplorePublications();
    // fetchFeedResults();
  }, []);

  const wallet = useWalletClient();

  return (
    <>
      <div className="bg-[#068DB8] h-[83vh] w-full flex flex-col">
        <div className="flex flex-row">
          <Photo className="h-[500px] w-[500px] translate-y-48 translate-x-36" />
          <div className="translate-x-[60vh] ">
            <Image
              className="translate-x-[30vh] translate-y-[2vh]"
              src={Lumix}
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className="mt-24">
            <h1 className="text-white text-[60px] font-bold font-inter translate-y-36">Be an independent journalist</h1>
            <p className="text-white text-[35px] font-bold font-inter translate-y-36  mt-10 ml-10">
              See news from all over the <br /> world without censorship,
              <br /> come be an unjourn.
            </p>
            <Image
              className="translate-y-20 -translate-x-20"
              src={Micro}
              width={250}
              height={250}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center translate-y-[20vh]">
          <Image src={Seta} width={40} height={40} alt="Picture of the author" />
          <h2 className="font-bold text-[25px]">know more</h2>
          <SignInButton />

          <button
            onClick={() => {
              fetchFeedResults();
            }}
          >
            {" "}
            fetch feed
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
