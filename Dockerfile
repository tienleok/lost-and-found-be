# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.185.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
FROM node:latest

# COPY all the files from Current Directory into the Container-test after successfull build
COPY ./ ./

# Install the Project Dependencies like Express Framework
RUN npm install

# Tell that this image is going to Open a Port 
EXPOSE 8082

# Default Command to launch the Application
CMD ["npm", "start"]
