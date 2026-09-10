FROM mcr.microsoft.com/devcontainers/typescript-node:latest
RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y dist-upgrade && \
    apt-get -y autoremove && \
    apt-get -y install --no-install-recommends \
    python3 \
    python3-pip && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* 
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
