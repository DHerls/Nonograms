FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --dev
RUN mv node_modules ..
COPY . .
CMD npm run build
