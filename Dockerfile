FROM node:6.9-alpine
MAINTAINER "Mike Pham (support@nativecode.com)"

RUN set -x \
    && apk update \
    && apk add git \
;

CMD [ "npm", "start" ]
