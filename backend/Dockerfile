# Stage 1: Build the React Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY package*.json tsconfig.json vite.config.ts index.html index.tsx types.ts App.tsx ./
COPY components ./components
RUN npm install
COPY backend/src/main/resources ./backend/src/main/resources
RUN npm run build

# Stage 2: Build the Java Spring Boot Backend
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/src ./src
# Copy the compiled static assets from the frontend build stage
COPY --from=frontend-build /frontend/backend/src/main/resources/static ./src/main/resources/static
RUN mvn -B package -DskipTests

# Stage 3: Runtime Container
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]
