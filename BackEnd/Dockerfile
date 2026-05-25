# ── Etapa 1: compilar con Maven ──────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# El contexto de build es la raíz del repo, por eso las rutas incluyen BackEnd/
COPY BackEnd/pom.xml .
RUN mvn dependency:go-offline -q

COPY BackEnd/src ./src
RUN mvn clean package -DskipTests -q

# ── Etapa 2: imagen final mínima ──────────────────────────────────────────────
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
