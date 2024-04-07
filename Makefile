# Makefile for managing the project's Docker and database operations

# Build the Docker services, replacing old builds
services.build:
	docker-compose build --no-cache

# Start the Docker services
services.up:
	docker-compose up -d

# Stop the Docker services
services.down:
	docker-compose down

# Seed the database with initial data
db.seed:
	docker-compose exec server npx ts-node src/db/seed.ts

# Clean the database, removing all data and resetting IDs
db.clean:
	docker-compose exec server npx ts-node src/db/clean.ts
