image_name = remove158/discord:latest

build:
	sudo docker build . -t $(image_name)

env:
	echo "DISCORD_TOKEN=$(DISCORD_TOKEN)" >> .env
	echo "CLIENT_ID=$(CLIENT_ID)" >> .env

up:
	sudo docker compose up -d --build

down:
	sudo docker compose down