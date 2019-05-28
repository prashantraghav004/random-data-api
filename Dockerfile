FROM node:carbon
ENV PORT 8080
# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
#COPY package*.json ./
#COPY tsconfig.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
RUN npm run tsc

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
