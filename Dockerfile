# 1) Build React frontend
FROM node:18-alpine AS frontend
WORKDIR /frontend
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# 2) Build Express backend
FROM node:18-alpine AS backend
WORKDIR /backend
COPY server/package*.json ./
RUN npm install
COPY server/ .

# 3) Final image
FROM node:18-alpine
WORKDIR /app
COPY --from=backend /backend /app
COPY --from=frontend /frontend/build /app/public
EXPOSE 3000
CMD ["npm", "start"]
