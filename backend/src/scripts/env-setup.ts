import fs from "fs";
import dotenv from "dotenv";

// Carregar as variáveis do arquivo .env
const envConfig = dotenv.parse(fs.readFileSync(".env"));

// Mapeando as variáveis para adicionar o prefixo VITE_
const reactEnv = Object.entries(envConfig)
  .map(([key, value]) => `VITE_${key}=${value}`)
  .join("\n");

// Criar ou sobrescrever o arquivo .env.local para o Vite
fs.writeFileSync("./.env.local", reactEnv);

console.log("Variáveis de ambiente carregadas e mapeadas para o formato VITE_");
