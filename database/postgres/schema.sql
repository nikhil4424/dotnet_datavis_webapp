BEGIN;

CREATE TABLE IF NOT EXISTS public.country
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.crop
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.year
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value integer NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.crop_yield
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id integer NOT NULL,
    crop_id integer NOT NULL,
    year_id integer NOT NULL,
    value numeric,

    FOREIGN KEY (country_id) REFERENCES public.country (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES public.crop (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (year_id) REFERENCES public.year (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

END;