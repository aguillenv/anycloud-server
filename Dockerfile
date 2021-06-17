FROM node:lts

ENV LOAD_TEST false
ENV PORT 8088

COPY . .

RUN yarn
RUN yarn buil
CMD yarn start