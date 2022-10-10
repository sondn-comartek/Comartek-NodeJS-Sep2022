FROM node:18
WORKDIR /usr
COPY . .
RUN npm install 
CMD ["npm", "run","start:dev"]
EXPOSE 3000