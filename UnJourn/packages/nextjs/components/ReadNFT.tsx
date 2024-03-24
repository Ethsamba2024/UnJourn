import { useContractRead } from 'wagmi'

// Import or define the 'myabi' variable here
import myabi from '../abis/abi.json';

function App() {
    const { data, isError, isLoading } = useContractRead({
        address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        abi: myabi,
        functionName: 'getHunger',
    })
}