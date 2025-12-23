# Use Node.js 22 LTS (required by React Native 0.76+)
FROM node:22-bullseye

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
RUN apt-get update && \
    apt-get install -y watchman && \
    rm -rf /var/lib/apt/lists/*
# Install React Native CLI globally
RUN npm install -g react-native-cli

# Set the working directory
WORKDIR /workspace

# Expose Metro bundler port and other common React Native ports
EXPOSE 8081 19000 19001 19002

# Keep container running
CMD ["sleep", "infinity"]