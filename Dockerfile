FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -G tsx
EXPOSE 3000
CMD ["npx", "tsx", "src/index.ts"]