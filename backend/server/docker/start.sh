#!/bin/bash

# 
cp /sprout/modules/* /sprout/BOOT-INF/lib/

java -cp ${SPROUT_OTHER_CLASSES}:/sprout org.springframework.boot.loader.JarLauncher