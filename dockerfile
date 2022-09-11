FROM node

ENV NODE_VERSION 18.9.0

WORKDIR /app

COPY . .
RUN  yarn install --production
CMD ["node","index.js"]


EXPOSE 3000