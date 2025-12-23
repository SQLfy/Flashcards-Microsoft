# Use Node.js 18 LTS (as required by package.json)
FROM node:18-bullseye

# Install system dependencies required for React Native
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    vim \
    sudo \
    procps \
    # Required for Watchman
    build-essential \
    python3 \
    python3-dev \
    autoconf \
    automake \
    libtool \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install Watchman (file watching service for React Native)
RUN cd /tmp && \
    git clone https://github.com/facebook/watchman.git && \
    cd watchman && \
    git checkout v2023.11.20.00 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install && \
    cd / && \
    rm -rf /tmp/watchman

# Install React Native CLI globally
RUN npm install -g react-native-cli

# Set the working directory
WORKDIR /workspace

# Expose Metro bundler port and other common React Native ports
EXPOSE 8081 19000 19001 19002

# Keep container running
CMD ["sleep", "infinity"]