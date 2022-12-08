FROM node:18.9

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY *.json ./

RUN npm install

# Bundle app source
COPY ./src ./src

RUN npm run build

EXPOSE 8089
CMD [ "npm", "run", "start" ]