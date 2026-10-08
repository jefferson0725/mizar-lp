FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && mkdir -p public/uploads /data

EXPOSE 1337
CMD ["npm", "run", "start"]
