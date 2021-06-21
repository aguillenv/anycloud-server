FROM node:lt

ENV LOAD_TEST false
ENV PORT 8088

COPY . .

RUN yarn
RUN yarn build
CMD yarn start