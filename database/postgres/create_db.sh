#!/bin/bash

# Set database credentials and name
DB_NAME="crop_yields_owid"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_MODEL_FILE="schema.sql"
DATA_SQL_FILE="data.sql"


echo "about to create db..."
# Create database
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER postgres;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO postgres"
echo "database created."

# Create tables
echo "about to create tables from $DB_MODEL_FILE..."
sudo -u postgres psql -d $DB_NAME -f $DB_MODEL_FILE

# Initialize data
echo "Initializing data..."
# sudo -u postgres psql -d $DB_NAME -f $DATA_SQL_FILE
# Initialize country data from csv
sudo -u postgres psql -d $DB_NAME -c "\copy country(name) FROM 'country.csv' DELIMITER ',' CSV HEADER;"
# initialize year table from csv
sudo -u postgres psql -d $DB_NAME -c "\copy year(value) FROM 'year.csv' DELIMITER ',' CSV HEADER;"
# Initialize crop data from csv
sudo -u postgres psql -d $DB_NAME -c "\copy crop(name) FROM 'crop.csv' DELIMITER ',' CSV HEADER;"
# Initialize crop yield data
sudo -u postgres psql -d $DB_NAME -c "\copy crop_yield(country_id, year_id, crop_id, value) FROM 'crop_yield.csv' DELIMITER ',' CSV HEADER;"

# Create crop yield view
sudo -u postgres psql -d $DB_NAME -f view_yield.sql