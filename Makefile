.PHONY: build prod dev run-prod run-dev stop logs sh

IMAGE_NAME ?= job-score-ai
CONTAINER_NAME ?= job-score-ai
PORT ?= 3000

build:
	docker build -t $(IMAGE_NAME):latest .

prod: build
	docker rm -f $(CONTAINER_NAME) 2>/dev/null || true
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):3000 --env-file .env.local $(IMAGE_NAME):latest

dev:
	docker rm -f $(CONTAINER_NAME)-dev 2>/dev/null || true
	docker build --target dev -t $(IMAGE_NAME):dev .
	docker run -it --name $(CONTAINER_NAME)-dev -p $(PORT):3000 -v $$PWD:/app -v /app/node_modules --env-file .env.local $(IMAGE_NAME):dev

run-prod:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):3000 --env-file .env.local $(IMAGE_NAME):latest

run-dev:
	docker run -it --name $(CONTAINER_NAME)-dev -p $(PORT):3000 -v $$PWD:/app -v /app/node_modules --env-file .env.local $(IMAGE_NAME):dev

stop:
	docker rm -f $(CONTAINER_NAME) $(CONTAINER_NAME)-dev 2>/dev/null || true

logs:
	docker logs -f $(CONTAINER_NAME)

sh:
	docker exec -it $(CONTAINER_NAME) sh
