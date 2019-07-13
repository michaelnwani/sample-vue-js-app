# some node image
FROM node:10.8.0

# Set an environment variable to store where the app is installed to inside
# of the Docker image.
ENV APP_PATH /opt

# Create app directory
WORKDIR $APP_PATH

# Install app dependencies
COPY package*.json ./
COPY . .
# TODO: replace

# RUN npm install --only=production

# Copy in the application code from your work station at the current directory
# over to the working directory.

RUN npm install

EXPOSE 80

CMD [ "npm", "run", "prod" ]
