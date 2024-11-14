# Step 1: Use an official Node.js image as the base image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install the dependencies in the container
RUN npm install

# Step 5: Copy the entire backend code to the working directory in the container
COPY . .

# Step 6: Expose the port the backend will run on
EXPOSE 3000

# Step 7: Define the command to start the backend server
CMD ["node", "server.js"]
