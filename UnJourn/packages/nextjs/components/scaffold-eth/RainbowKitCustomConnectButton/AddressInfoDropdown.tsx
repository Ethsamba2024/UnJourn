import { useRef, useState } from "react";
import { authenticate, authenticate2, generateChallenge } from "../../../api2";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address, useDisconnect } from "wagmi";
import { useAccount, useSignMessage } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const [addressCopied, setAddressCopied] = useState(false);

  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  const { address: connectedAddress } = useAccount();
  const endereco = connectedAddress;
  const connected = !!endereco;

  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      console.log(connectedAddress);
      if (!connected) {
        return alert("Please connect your wallet first");
      }
      const challenge = await generateChallenge(endereco);
      const signature = await signMessageAsync({ message: challenge.text });
      await authenticate(challenge.id, signature);

      const credentials = window.localStorage.getItem("lens.development.credentials");
      if (credentials !== null) {
        const jsonCredentials = JSON.parse(credentials);
        const data = await authenticate2(jsonCredentials.data.refreshToken);
        console.log("authenticate2", data);

        jsonCredentials.data.accessToken = data.refresh.accessToken;
        const newData = JSON.stringify(jsonCredentials);
        window.localStorage.setItem("lens.development.credentials", newData);
        window.localStorage.setItem("refreshToken", data.refresh.refreshToken);
        window.localStorage.setItem("accessToken", data.refresh.accessToken);
      } else {
        alert("Log in to your Lens account");
      }

      console.log({ challenge });
      console.log({ signature });
    } catch (error) {
      console.error(error);
      alert("Error signing in");
    } finally {
      window.location.href = "http://ec2-52-23-168-137.compute-1.amazonaws.com:3000/noticias";
    }
  };

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary tabIndex={0} className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto">
          <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
          <span className="ml-2 mr-1">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <li className={selectingNetwork ? "hidden" : ""}>
            {addressCopied ? (
              <div className="btn-sm !rounded-xl flex gap-3 py-3">
                <CheckCircleIcon
                  className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                  aria-hidden="true"
                />
                <span className=" whitespace-nowrap">Copy address</span>
              </div>
            ) : (
              <CopyToClipboard
                text={checkSumAddress}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <div className="btn-sm !rounded-xl flex gap-3 py-3">
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                    aria-hidden="true"
                  />
                  <span className=" whitespace-nowrap">Copy address</span>
                </div>
              </CopyToClipboard>
            )}
          </li>
          <li>
            <label htmlFor="">
              //icone lens
              <button onClick={signIn}>SignIn in lens</button>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3" type="button">
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>
          {allowedNetworks.length > 1 ? (
            <li className={selectingNetwork ? "hidden" : ""}>
              <button
                className="btn-sm !rounded-xl flex gap-3 py-3"
                type="button"
                onClick={() => {
                  setSelectingNetwork(true);
                }}
              >
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Switch Network</span>
              </button>
            </li>
          ) : null}
          <li className={selectingNetwork ? "hidden" : ""}>
            <button
              className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details>
    </>
  );
};
