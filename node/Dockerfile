ARG NODE_VER=14.17.0
FROM node:${NODE_VER}

WORKDIR /opt/app

COPY . .

RUN npm install

EXPOSE 5000

ENTRYPOINT ["npm"]
CMD ["start"]