# Usa a imagem oficial do Node (pode ser 18 ou 20, depende do que você usa)
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Comando para rodar o seu programa principall
CMD ["node", "src/abrigo-animais.js"]
