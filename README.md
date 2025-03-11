# dotnet_datavis_webapp

A small web application that provides datavisualisations for [a crop yield dataset selected from OurWorldinData](https://ourworldindata.org/crop-yields#explore-data-on-crop-yields).
The tools/frameworks being user are:

- Postgres database to convert csv data into
- ASP.net Core for backend API
- Angular for frontnet
- ~~Plotly~~ Chart.js for data visualisation

## Requirements
- [Docker](https://www.docker.com/get-started/)
- [Angular](https://angular.dev/installation)
## How to start application
1. From root folder, run: ```docker compose up```
2. From datavis-frontent-csr folder, run ```ng serve```
3. Go to [localhost:4200](http://localhost:4200/) in browser
