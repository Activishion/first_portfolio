#!/bin/bash

docker stop buildx_buildkit_default

docker rm buildx_buildkit_defaultn

docker rmi buildx-stable-1


# DOCKER_BUILDKIT=0 docker-compose -f docker-compose.production.yml up --build -d
# создание связки образов докер-компоуз
