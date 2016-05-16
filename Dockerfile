FROM node:5.11.1

MAINTAINER Madadata <hi@madadata.com>

ENV HOME=/home/blade
WORKDIR $HOME

COPY package.json npm-shrinkwrap.json $HOME/

RUN npm install -g bower \
  && npm install

ADD . $HOME/
RUN bower install --allow-root \
  && npm run build \
  && bower cache clean --allow-root \
  && npm uninstall -g bower \
  && npm prune --production \
  && npm cache clear

EXPOSE 3000
CMD ["npm", "run", "run:prod"]
