import { create } from "ipfs-http-client";

const projectId = "c57c8fa05d4a4eb7b182f5f2ac4b5a0d";
const secret = "j6EJOfXh/TYgvISnts+EyO4WYcVgqbvSZRH5RvlFlkVOaI+J7qHw6w";

if (!projectId || !secret) {
  throw new Error("Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this");
}

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(`${projectId}:${secret}`, "utf-8").toString("base64")}`,
  },
});

export const uploadIpfs = async (data: any) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result;
};

export const uploadIpfsGetPath = async <T>(data: T) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result.path;
};
