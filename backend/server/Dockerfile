FROM adoptopenjdk:11-jre-hotspot as builder
WORKDIR /build
COPY build/libs/sprout-server.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM adoptopenjdk:11-jre-hotspot
WORKDIR /sprout
VOLUME ["/etc/sprout"]
COPY --from=builder build/dependencies/ ./
COPY --from=builder build/snapshot-dependencies/ ./
COPY --from=builder build/spring-boot-loader/ ./
COPY --from=builder build/application/ ./
COPY docker/start.sh start.sh
ENV SPROUT_PLUGINS_DIR "/sprout/plugins"
ENV SPROUT_OTHER_CLASSES "/sprout/other"
ENV PORT=8080
RUN mkdir /sprout/other
ENTRYPOINT ["./start.sh"]