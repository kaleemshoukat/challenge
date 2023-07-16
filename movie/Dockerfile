FROM node:18

# Create app directory and epgpub directory
RUN mkdir /movie
WORKDIR /movie

# Install app dependencies
ADD package.json /package.json
RUN npm install

#Bundle app source
COPY . /movie

EXPOSE 3001

CMD ["npm", "test"]
CMD ["npm", "start"]