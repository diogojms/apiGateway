FROM node:18

# Create app directory
WORKDIR /usr/src/gateway/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

#docker build -t api-gateway . 
#docker run --name api-gateway -p 8080:8080 -d api-gateway