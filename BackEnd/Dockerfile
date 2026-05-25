# ── Etapa 1: compilar con Maven ──────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia primero el pom para aprovechar la caché de capas de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copia el código fuente y compila (sin ejecutar tests)
COPY src ./src
RUN mvn clean package -DskipTests -q

# ── Etapa 2: imagen final mínima ──────────────────────────────────────────────
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
