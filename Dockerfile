#
# Multi-stage build:
#   1. Build the React app with Node
#   2. Serve all versions via nginx
#
# Build:
#   docker build --tag tetjs-rapidant .
#
# Run:
#   docker run --rm -p 8080:80 tetjs-rapidant
#

# --- Stage 1: Build the React app ---
FROM node:lts AS react-build

COPY react/app /app
WORKDIR /app
RUN npm install && npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy master index page
COPY index.html /usr/share/nginx/html/

# Copy static versions (original and angular)
COPY original/ /usr/share/nginx/html/original/
COPY angular/ /usr/share/nginx/html/angular/

# Copy built React app
COPY --from=react-build /app/build/ /usr/share/nginx/html/react/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
