# [Choice] Node.js version: 16, 14, 12
ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# COPY all the files from Current Directory into the Container-test after successfull build
COPY ./ ./

# Install the Project Dependencies like Express Framework
RUN npm install

# Tell that this image is going to Open a Port 
EXPOSE 8082

# Default Command to launch the Application
CMD ["npm", "start"]
