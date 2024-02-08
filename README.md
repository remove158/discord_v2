# Discord V2
## Upgrade and update
```sh
sudo apt update
sudo apt upgrade
```

## Download docker-compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

## chmod

```sh
sudo chmod +x /usr/local/bin/docker-compose
```

## try docker-compose 
```sh
sudo docker–compose --version
```


## Docker run player
```sh
docker run -d --name player --network=discord -e SERVER_PORT=2333 -e SERVER_ADDRESS=0.0.0.0 -e LAVALINK_SERVER_PASSWORD=password -p 2333:2333 ghcr.io/lavalink-devs/lavalink:4
```