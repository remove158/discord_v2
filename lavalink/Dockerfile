# Use a slim Java image
FROM openjdk:23-slim-bullseye
#Set environment variables (optional)
# You can uncomment these lines and set your desired values
# ENV LAVA_VERSION=3.3.1
# ENV LAVA_PORT=2333
# ENV LAVA_PASSWORD=your_password_here

# Create a user for Lavalink
RUN groupadd -g 322 lavalink && useradd -r -u 322 -g lavalink lavalink

# Set working directory
WORKDIR /opt/Lavalink

# Set ownership for Lavalink directory
RUN chown -R lavalink:lavalink /opt/Lavalink

# Copy Lavalink.jar (replace with your actual copy command)
COPY Lavalink.jar Lavalink.jar

# Expose Lavalink port (modify if using environment variable)
EXPOSE 2333

# Run Lavalink with Java options (modify if using environment variable)
USER lavalink
ENTRYPOINT ["java", "-Djdk.tls.client.protocols=TLSv1.1,TLSv1.2", "-jar", "Lavalink.jar"]
