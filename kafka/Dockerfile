FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/classes /app

EXPOSE 3001

CMD ["java", "com.kafka.mensageria.SimpleServer"]
