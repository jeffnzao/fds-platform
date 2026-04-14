FROM node:20-alpine

WORKDIR /app

# Dépendances système pour bcrypt et Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN mkdir -p logs

EXPOSE 4000

CMD ["npm", "run", "dev"]
