const express = require("express");
const app = express();
const Web3 = require("web3");
const axios = require("axios");

app.use(express.json()); // Para permitir o recebimento de JSON no corpo das requisições

// Substitua pelos valores reais da ABI e do endereço do contrato
const erc1155ABI = []; // ABI do contrato ERC-1155
const erc1155Address = '0x...'; // Endereço do contrato ERC-1155

// Inicializa a instância do contrato ERC-1155
const web3 = new Web3('http://localhost:8545'); // Substitua pelo URL do seu provedor Web3
const erc1155 = new web3.eth.Contract(erc1155ABI, erc1155Address);

app.post("/", async (req, res) => {
 const { news_type } = req.body;

 if (news_type === "newsletter") {
    const hasNFT = await checkIfUserHasNFT();

    let dataToSend = req.body;

    if (hasNFT) {
      dataToSend = { ...req.body, user: "#user" };
    }

    try {
      const response = await axios.post("URL_DO_LENS_PROTOCOL", dataToSend);
      res.json({
        message: "Dados enviados para o Lens Protocol",
        data: response.data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao enviar dados para o Lens Protocol",
        error: error.message,
      });
    }
 } else {
    res.json(req.body);
 }
});

app.listen(3000, () => {
 console.log("Server started on http://localhost:3000");
});

async function checkIfUserHasNFT() {
 const userAddress = '0x144814276FB53240Ab83227D10Ac60E32dCD9C0a'; // Substitua pelo endereço do usuário
 const tokenId = 1; // Substitua pelo ID do token que você deseja verificar

 const balance = await erc1155.methods.balanceOf(userAddress, tokenId).call();
 console.log(`Balance of token ID ${tokenId}: ${balance}`);

 return balance > 0;
}
