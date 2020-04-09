FROM node:carbon-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm rebuild && \
  npm install --quiet

# EXPOSE 8080
CMD [ "npm", "start" ]
