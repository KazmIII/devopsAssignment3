# Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM node:18-alpine AS backend-builder
WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Final image
FROM node:18-alpine
WORKDIR /app

# Copy backend and frontend build
COPY --from=backend-builder /backend /app
COPY --from=frontend-builder /frontend/build /app/public

EXPOSE 3000
CMD ["node", "server.js"]
