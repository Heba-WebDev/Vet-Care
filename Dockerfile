FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./src/data/prisma/ ./src/data/prisma/
RUN npx prisma generate --schema=./src/data/prisma/schema.prisma

COPY . .
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Install dependencies and rebuild bcrypt
RUN npm ci --only=production && \
    npm rebuild bcrypt --build-from-source

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/data/prisma ./src/data/prisma

EXPOSE 3000

CMD ["node", "dist/app.js"]