CREATE VIEW yields_view AS
    SELECT
        cy.id,c.name AS crop,
        co.name AS country,
        y.value AS year,
        cy.value AS yield
    FROM 
        crop_yield cy 
        JOIN crop c ON cy.crop_id = c.id
        JOIN country co ON cy.country_id = co.id
        JOIN year y ON cy.year_id = y.id;