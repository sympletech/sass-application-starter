FROM node:22-alpine3.21

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "prd"]
# CMD ["tail", "-f", "/dev/null"]