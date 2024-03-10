image_name = remove158/discord:latest

build:
	sudo docker build . -t $(image_name)


up:
	sudo docker compose up --build

down:
	sudo docker compose down
