# Choose the Image which has Node installed already
ARG VARIANT="16"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# COPY all the files from Current Directory into the Container-test after successfull build
COPY ./ ./

# Install the Project Dependencies like Express Framework
RUN npm install

# Tell that this image is going to Open a Port 
EXPOSE 80

# Default Command to launch the Application
CMD ["npm", "start"]
