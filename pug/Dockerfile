FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html/

# Copy the contents of 'dist' directory to the current working directory
COPY dist/ .

# Expose port 80 (default for Nginx)
EXPOSE 80

# Test command: docker container run --name snake_game_fe --publish 80:80 -d web_snake_game_fe:latest