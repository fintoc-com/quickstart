language := ruby

help:
	@echo "Usage: make COMMAND [OPTIONS]"
	@echo
	@echo "Options:"
	@echo " language=[language] - The language can be any of the supported languages such as: node, ruby or python."
	@echo
	@echo "Commands:"
	@echo " start\t\tStart the containers (and builds them if they don't exist)."
	@echo " build\t\tBuild the Docker images."
	@echo " destroy\tDestroy the containers."
	@echo " stop\t\tStop the containers."
	@echo " restart\tRestart the containers."
	@echo " logs\t\tShow container logs."
.PHONY: help

start: ## Start the containers
	@REACT_APP_BACKEND_HOST=http://$(language):5000 \
	docker-compose up --remove-orphans --detach $(language) frontend
.PHONY: start

build: ## Build the containers
	docker-compose build --no-cache
.PHONY: build

destroy: ## Destroy the containers
	@docker-compose down
.PHONY: destroy

stop: ## Stop the containers
	@docker-compose stop
.PHONY: stop

restart: ## Restart the containers
	@make -s destroy
	@make -s start
.PHONY: restart

logs: ## Show containers logs
	@docker-compose logs
.PHONY: logs
