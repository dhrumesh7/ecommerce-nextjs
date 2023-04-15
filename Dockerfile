FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the contents of the .next folder into the image
COPY .next ./.next

# Copy the public folder into the image
COPY public ./public

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install dependencies
RUN npm install --production --force

# Add the node_modules/.bin directory to the PATH environment variable
ENV PATH /app/node_modules/.bin:$PATH

# Set NODE_ENV to production
ENV NODE_ENV production

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]