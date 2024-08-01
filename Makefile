SHELL = /bin/bash

prod:
	docker-compose -f docker-compose.prod.yml build --force-rm && docker-compose -f docker-compose.prod.yml up --force-recreate -d