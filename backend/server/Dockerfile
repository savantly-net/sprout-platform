FROM adoptopenjdk:11-jre-hotspot as builder
WORKDIR build
COPY build/libs/sprout-server-*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM adoptopenjdk:11-jre-hotspot
WORKDIR sprout
VOLUME ["/sprout"]
COPY --from=builder build/dependencies/ ./
COPY --from=builder build/snapshot-dependencies/ ./
COPY --from=builder build/spring-boot-loader/ ./
COPY --from=builder build/application/ ./
ENV SPROUT_PLUGINS_DIR "/sprout/plugins"
ENTRYPOINT ["java","-cp","/sprout/modules/*:/sprout","org.springframework.boot.loader.JarLauncher"]