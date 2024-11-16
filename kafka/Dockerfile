FROM openjdk:21-ea-1-jdk-slim

WORKDIR /app

COPY target/classes /app

EXPOSE 3001

CMD ["java", "com.kafka.mensageria.SimpleServer"]
