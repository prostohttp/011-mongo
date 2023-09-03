FROM node:alpine
WORKDIR /app
EXPOSE 3334
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]