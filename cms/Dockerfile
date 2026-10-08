FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci
ENV NODE_ENV=production

COPY . .
RUN npm run build && mkdir -p public/uploads /data

EXPOSE 1337
CMD ["npm", "run", "start"]
