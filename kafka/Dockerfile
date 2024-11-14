FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/SimpleServer.jar /app/SimpleServer.jar

EXPOSE 3001

CMD ["java", "-jar", "SimpleServer.jar"]