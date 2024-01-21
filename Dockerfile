FROM node:18

WORKDIR /usr/appBackend

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

RUN npm install

RUN npm install -g dotenv-cli

COPY . .

RUN npx prisma migrate dev && npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "dev"]