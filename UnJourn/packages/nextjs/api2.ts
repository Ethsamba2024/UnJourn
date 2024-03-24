// utils.js
import { uploadIpfs } from "./utils/ipfs";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql } from "@apollo/client";
import {
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  IStorageProvider,
  LensClient,
  OnchainPostRequest,
  development,
  isRelaySuccess,
} from "@lens-protocol/client";
import { Wallet, ethers, utils } from "ethers";
import { useSignMessage } from "wagmi";

const APIURL = "https://api-v2-mumbai-live.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: APIURL,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": window.localStorage.getItem("accessToken") || "",
  },
  cache: new InMemoryCache(),
});

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

const lensClientConfig = {
  environment: development,
  storage: new LocalStorageProvider(),
  ApolloClient: apolloClient,
};

export const client = new LensClient(lensClientConfig);

export const fetchExploreProfiles = async () => {
  const response = await client.explore.profiles({
    orderBy: ExploreProfilesOrderByType.MostFollowers,
  });
  console.log("Perfis", response);
  return response;
};

export const fetchExplorePublications = async () => {
  const result = await client.explore.publications({
    orderBy: ExplorePublicationsOrderByType.Latest,
  });
  return result;
};

export const autenticateUser = async () => {
  try {
    const { id, text } = await client.authentication.generateChallenge({
      signedBy: "0x9e24fCd97b35BfB238De55DCB5700742352722c3",
    });
    const wallet_aleatoria = new Wallet("65759320eb76aacaaad76528581fe99099c3e007276d0156976c9414829ab495");

    const signature = await wallet_aleatoria.signMessage(text);
    console.log(wallet_aleatoria);

    await client.authentication.authenticate({
      id,
      signature,
    });

    console.log(signature);
    console.log(`id - ${id} text - ${signature}`);
  } catch (error) {
    console.error("Erro", error);
  }
};

export const generateChallenge = async (address: string) => {
  const response = await client.authentication.generateChallenge({
    signedBy: address,
  });
  console.log("Challenge", response.text);
  return response;
};

export const authenticate = async (id: string, signature: string) => {
  await client.authentication.authenticate({
    id,
    signature,
  });
};

// Usuario tem que estar autenticado
export const fetchFeedResults = async () => {
  const accessToken = window.localStorage.getItem("accessToken");
  console.log(accessToken);

  const isVerified = await client.authentication.verify(accessToken);
  console.log(isVerified);
  const response = await client.feed.fetch({
    where: {
      for: "0x040a73",
    },
  });
  console.log("Feed", response);
};

const Refresh = `
mutation Mutation($request: RefreshRequest!) {
  refresh(request: $request) {
    refreshToken
    accessToken
  }
}
`;

export const authenticate2 = async refreshToken => {
  const response = await apolloClient.mutate({
    mutation: gql(Refresh),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
  return response.data;
};

// export const creaatePostTypedData = async (requests: OnchainPostRequest) => {
//   const response = await apolloClient.mutate({
//     mutation: ,
//     variables: {
//       requests,
//     },
//   });

//   return response.data!.createOnchainPostTypedData;
// };

const publicationMetadataTextOnly = {
  $schema: "https://json-schemas.lens.dev/publications/text-only/3.0.0.json",
  name: "My text3",
  description: "My text Description",
  external_url: "https://mytext.com",
  image: "https://text.com/image.png",
  lens: {
    title: "My text",
    id: "1030ee6e-51cb-4a09-a74a-abdccc6ef890",
    locale: "en-US",
    mainContentFocus: "TEXT_ONLY",
    content: "My text Content",
    tags: ["text"],
    appId: "my-app-id",
  },
};

export const postOnChain = async (profileId, address) => {
  const { signMessageAsync } = useSignMessage();

  const ipfsResponse = await uploadIpfs(publicationMetadataTextOnly);

  const request: OnchainPostRequest = {
    contentURI: `ipfs://${ipfsResponse.path}`,
  };

  const { id, typedData } = await creaatePostTypedData(request);
  console.log("post onchain: result", { id, typedData });

  console.log("post onchain: typedData", typedData);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log("post onchain: signature", signature);

  if (USE_GASLESS) {
    const broadcastResult = await broadcastOnchainRequest({ id, signature });

    await waitUntilBroadcastTransactionIsComplete(broadcastResult, "post");
  } else {
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.postWithSig(
      {
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        actionModules: typedData.value.actionModules,
        actionModulesInitDatas: typedData.value.actionModulesInitDatas,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
      },
      {
        signer: address,
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    );
    console.log("post onchain: tx hash", tx.hash);
  }
};
