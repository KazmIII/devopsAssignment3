# Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build backend
FROM node:18-alpine AS backend-builder
WORKDIR /backend
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Final image
FROM node:18-alpine
WORKDIR /app

# Copy backend and frontend build
COPY --from=backend-builder /backend /app
COPY --from=frontend-builder /frontend/build /app/client/build

EXPOSE 3000
CMD ["npm", "start"]
