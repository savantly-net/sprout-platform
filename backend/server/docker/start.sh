#!/bin/bash

# 
cp /sprout/modules/* /sprout/BOOT-INF/lib/

java ${JAVA_OPTS} -cp ${SPROUT_OTHER_CLASSES}:/sprout -Dserver.port=${PORT} org.springframework.boot.loader.JarLauncher