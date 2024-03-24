import { authenticate, authenticate2, generateChallenge } from "../api2";
import { useAccount, useSignMessage } from "wagmi";

export default function Home() {
  const { address: connectedAddress } = useAccount();
  const address = connectedAddress;
  const connected = !!address;

  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      console.log(connectedAddress);
      if (!connected) {
        return alert("Please connect your wallet first");
      }
      const challenge = await generateChallenge(address);
      const signature = await signMessageAsync({ message: challenge.text });
      await authenticate(challenge.id, signature);

      const credentials = window.localStorage.getItem("lens.development.credentials");
      if (credentials !== null) {
        const jsonCredentials = JSON.parse(credentials);
        const data = await authenticate2(jsonCredentials.data.refreshToken);
        console.log(data);

        jsonCredentials.data.accessToken = data.refresh.accessToken;
        const newData = JSON.stringify(jsonCredentials);
        window.localStorage.setItem("lens.development.credentials", newData);
        window.localStorage.setItem("refreshToken", data.refresh.refreshToken);
        window.localStorage.setItem("accessToken", data.refresh.accessToken);
      } else {
        // Create new credentials object with accessToken field
        const newCredentials = {
          data: {
            refreshToken: "", // Assuming this field is already present
            accessToken: "", // Add accessToken field
          },
        };

        const newData = JSON.stringify(newCredentials);
        window.localStorage.setItem("lens.development.credentials", newData);

        alert("Log in to your Lens account");
      }

      console.log({ challenge });
      console.log({ signature });
    } catch (error) {
      console.error(error);
      alert("Error signing in");
    }
  };

  return (
    <div className="p-3">
      <button onClick={signIn} className="mt-1">
        Login with Lens
      </button>
      <button className="mt-1">Login with Lens</button>
    </div>
  );
}
