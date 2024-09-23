# Base image
FROM node:20

# Working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy prisma's schema
COPY ./src/data/prisma/ ./src/data/prisma/
RUN npx prisma generate --schema=./src/data/prisma/schema.prisma

# Bundle app source
COPY . .
RUN npm run build

# EXPOSE Port
EXPOSE 8000

CMD ["node", "dist/app.js"]
