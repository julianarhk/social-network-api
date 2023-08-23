# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro da imagem
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Expõe a porta em que a aplicação estará executando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start" ]
