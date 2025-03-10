#!/bin/bash

# Set database credentials and name
DB_NAME="crop_yields_owid"
DB_USER="postgres"
DB_PASSWORD="postgres"
# Files needed for database initialization and seeding
DB_MODEL_FILE="/docker-entrypoint-initdb.d/init_resources/schema.sql"
COUNTRY_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/country.csv"
YEAR_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/year.csv"
CROP_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/country.csv"
CROP_YIELD_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/crop_yield.csv"
CROPYIELDS_VIEW_CSV_FILE="/docker-entrypoint-initdb.d/init_resources/view_yield.sql"

# DB_MODEL_FILE="schema.sql"
# DATA_SQL_FILE="data.sql"

export PGPASSWORD=$DB_PASSWORD

echo "about to create db..."
# Create database
# sudo -u postgres psql -c "CREATE DATABASE IF NOT EXISTS $DB_NAME OWNER postgres;"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO postgres"
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME OWNER postgres;" || true
psql -U $DB_USER -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO postgres"
echo "database created."

# Create tables
echo "about to create tables from $DB_MODEL_FILE..."
# sudo -u postgres psql -d $DB_NAME -f $DB_MODEL_FILE
psql -U $DB_USER -d $DB_NAME -f $DB_MODEL_FILE
echo "tables created"

# Initialize data
echo "Initializing data..."
# sudo -u postgres psql -d $DB_NAME -f $DATA_SQL_FILE
# Initialize country data from csv
# sudo -u postgres psql -d $DB_NAME -c "\copy country(name) FROM 'country.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -c "\copy country(name) FROM $COUNTRY_CSV_FILE DELIMITER ',' CSV HEADER;"

# initialize year table from csv
# sudo -u postgres psql -d $DB_NAME -c "\copy year(value) FROM 'year.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -c "\copy year(value) FROM $YEAR_CSV_FILE DELIMITER ',' CSV HEADER;"

# Initialize crop data from csv
# sudo -u postgres psql -d $DB_NAME -c "\copy crop(name) FROM 'crop.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -c "\copy crop(name) FROM $CROP_CSV_FILE DELIMITER ',' CSV HEADER;"

# Initialize crop yield data
# sudo -u postgres psql -d $DB_NAME -c "\copy crop_yield(country_id, year_id, crop_id, value) FROM 'crop_yield.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME  -c "\copy crop_yield(country_id, year_id, crop_id, value) FROM $CROP_YIELD_CSV_FILE DELIMITER ',' CSV HEADER;"

# Create crop yield view
psql -U $DB_USER -d $DB_NAME -f $CROPYIELDS_VIEW_CSV_FILE
