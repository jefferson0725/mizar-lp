FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci
ENV NODE_ENV=production

COPY . .
# El build del panel necesita más memoria que el límite por defecto de Node.
RUN NODE_OPTIONS=--max-old-space-size=3072 npm run build && mkdir -p public/uploads /data

EXPOSE 1337
CMD ["npm", "run", "start"]
