# dotnet_datavis_webapp

A small web application that provides datavisualisations for [a crop yield dataset selected from OurWorldinData](https://ourworldindata.org/crop-yields#explore-data-on-crop-yields).
The tools/frameworks being used are:

- Postgres database that contains converted csv data
- ASP.net Core for backend API
- Angular for frontend
- ~~Plotly~~ Chart.js for data visualisation
- Docker for containerization


## Requirements
- [Docker](https://www.docker.com/get-started/)
## How to start application
1. From root folder, run: ```docker compose up```
3. Go to [localhost:4200](http://localhost:4200/) in browser
