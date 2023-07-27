# Use an official Node.js runtime as a parent image
FROM node:16

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000

# Start the API server
CMD ["yarn", "start"]