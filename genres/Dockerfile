FROM node:18

# Create app directory and epgpub directory
RUN mkdir /genres
WORKDIR /genres

# Install app dependencies
ADD package.json /package.json
RUN npm install

#Bundle app source
COPY . /genres

EXPOSE 3000

CMD ["npm", "test"]
CMD ["npm", "start"]