"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { client, fetchExploreProfiles, fetchExplorePublications, getPublications } from "../../api2";
import Integration from "../../components/Integration";
import MostFoll from "../../components/MostFoll";
import Noticia from "../../components/NoticiaComponente";
import Logo from "../../components/assets/Unjourn.svg";
import Lapis from "../../components/assets/fi-rr-pencil.svg";
import result from "/graphql/generated";
import axios, { AxiosResponse } from "axios";
import { Wallet } from "ethers";

const pinataApiKey = "fc6e72bc52d5f0321041";
const pinataSecretApiKey = "b3a1c121eb108862df67bebd7a3767d6034857df50b0ba5d377c7c33e0169e4e";

type FormData = {
  name: string;
  email: string;
  wallet: string;
};
export async function postToPinata(data: { name: string; description: string; image: string; attributes: any[] }) {
  try {
    const response: AxiosResponse<{ IpfsHash: { hash: string } }> = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      },
    );

    return response.data.IpfsHash;
  } catch (error) {
    throw error;
  }
}

const noticias = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<any>([]); // [title, description, content
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call postToPinata function to submit data
      const result = await postToPinata({
        name: title,
        description: content,
        image: "", // You might want to add an image here if applicable
        attributes: [], // Add any additional attributes if needed
      });

      const res = await client.publication.postOnchain({
        contentURI: `ipfs://${result}`, // or arweave
      });
      console.log("Data submitted successfully:", result);
      console.log("lens:", res);
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };

  const fetchPosts = async () => {
    const posts = await fetchExplorePublications();
    console.log(posts.items);
    return posts.items;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await fetchExplorePublications();
        setPosts(postsData.items);
        console.log(postsData.items);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchProfiles = async () => {
      const profiles = await fetchExploreProfiles();
      console.log(profiles);
    };

    fetchPosts();
  }, []);

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
              {posts.map((post, index) => {
                return (
                  <Noticia
                    title={post.metadata.appId}
                    content={post.metadata.content}
                    comments={post.stats.comments}
                    upvoted={post.stats.upvotes}
                    mirrors={post.stats.mirrors}
                    endereco={post.by.ownedBy.address}
                    createdAt={post.createdAt}
                    key={index}
                  />
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white translate-y-12 translate-x-10"
            aria-label="Asian"
          />
          <div role="tabpanel" className="tab-content p-10 text-white">
            <div className="flex flex-col">
              {posts.map((post, index) => {
                return (
                  <Noticia
                    title={post.metadata.appId}
                    content={post.metadata.content}
                    comments={post.stats.comments}
                    upvoted={post.stats.upvotes}
                    mirrors={post.stats.mirrors}
                    endereco={post.by.ownedBy.address}
                    createdAt={post.createdAt}
                    key={index}
                  />
                );
              })}
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
              {posts.map((post, index) => {
                return (
                  <Noticia
                    title={post.metadata.appId}
                    content={post.metadata.content}
                    comments={post.stats.comments}
                    upvoted={post.stats.upvotes}
                    mirrors={post.stats.mirrors}
                    endereco={post.by.ownedBy.address}
                    createdAt={post.createdAt}
                    key={index}
                  />
                );
              })}
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
              {posts.map((post, index) => {
                return (
                  <Noticia
                    title={post.metadata.appId}
                    content={post.metadata.content}
                    comments={post.stats.comments}
                    upvoted={post.stats.upvotes}
                    mirrors={post.stats.mirrors}
                    endereco={post.by.ownedBy.address}
                    createdAt={post.createdAt}
                    key={index}
                  />
                );
              })}
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
              {posts.map((post, index) => {
                return (
                  <Noticia
                    title={post.metadata.appId}
                    content={post.metadata.content}
                    comments={post.stats.comments}
                    upvoted={post.stats.upvotes}
                    mirrors={post.stats.mirrors}
                    endereco={post.by.ownedBy.address}
                    createdAt={post.createdAt}
                    key={index}
                  />
                );
              })}
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
            <form onSubmit={handleSubmit} className="text-black flex flex-col items-center justify-center">
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
                  placeholder="Content"
                  onChange={e => setContent(e.target.value)}
                ></textarea>
              </label>
              <button
                type="submit"
                className="rounded-full bg-blue-500 text-white w-64 h-16 text-[20px] font-bold mt-10"
              >
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
