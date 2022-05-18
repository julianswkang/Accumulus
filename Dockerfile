FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g typescript
RUN npm install
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build-dev"]
EXPOSE 8080
EXPOSE 3000
CMD ["npm", "run", "dev:hot"]