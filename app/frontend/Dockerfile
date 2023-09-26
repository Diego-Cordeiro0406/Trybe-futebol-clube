FROM node:16.14-alpine

WORKDIR /app-frontend

# Copiar os package.json e package-lock.json para o container
COPY package*.json ./
# Instalar as dependências Node
RUN npm install
# Copiar o restante dos arquivos da aplicação para o container
COPY . .
# Sinalize que aplicação expõe a porta 3000
EXPOSE 3000
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm" ]

CMD [ "start" ]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações