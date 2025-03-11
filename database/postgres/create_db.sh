#!/bin/bash

# Set database credentials and name
DB_NAME="crop_yields_owid"
DB_USER="postgres"
DB_PASSWORD="postgres"
# Files needed for database initialization and seeding
DB_MODEL_FILE="/docker-entrypoint-initdb.d/init_resources/schema.sql"
COUNTRY_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/country.csv"
YEAR_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/year.csv"
CROP_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/crop.csv"
CROP_YIELD_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/crop_yield.csv"
CROPYIELDS_VIEW_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/view_yield.sql"

export PGPASSWORD=$DB_PASSWORD

echo "about to create db..."
# Create database
psql --username=$DB_USER --command="CREATE DATABASE $DB_NAME OWNER postgres;" || true
psql --username=$DB_USER --command="GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO postgres"
echo "database created."

# Create tables
echo "about to create tables from $DB_MODEL_FILE..."
psql --username=$DB_USER --dbname=$DB_NAME --file=$DB_MODEL_FILE
echo "tables created"

echo "Initializing data..."
# Initialize country data from csv
psql --username=$DB_USER --dbname=$DB_NAME --command="\copy country(name) FROM $COUNTRY_CSV_FILE DELIMITER ',' CSV HEADER;"

# initialize year table from csv
psql --username=$DB_USER --dbname=$DB_NAME --command="\copy year(value) FROM $YEAR_CSV_FILE DELIMITER ',' CSV HEADER;"

# Initialize crop data from csv
psql --username=$DB_USER --dbname=$DB_NAME --command="\copy crop(name) FROM $CROP_CSV_FILE DELIMITER ',' CSV HEADER;"

# Initialize crop yield data
psql --username=$DB_USER --dbname=$DB_NAME --command="\copy crop_yield(country_id, year_id, crop_id, value) FROM $CROP_YIELD_CSV_FILE DELIMITER ',' CSV HEADER;"

# Create crop yield view
psql --username=$DB_USER --dbname=$DB_NAME --file=$CROPYIELDS_VIEW_CSV_FILE