#!/bin/bash

# Set database credentials and name
DB_NAME="crop_yields_owid"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_MODEL_FILE="schema.sql"

echo "about to create db..."
# Create database
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
echo "database created."


echo "about to create tables from $DB_MODEL_FILE..."
# Create tables
sudo -u postgres psql -d $DB_NAME -f $DB_MODEL_FILE
