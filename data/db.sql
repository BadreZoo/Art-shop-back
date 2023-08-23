DROP TABLE IF EXISTS "user";


CREATE TYPE sexe AS ENUM ('homme', 'femme', 'autre');

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "nom" VARCHAR(64) NOT NULL,
  "prenom" VARCHAR(64) NOT NULL,
  "sex" sex NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "product" (
  "id" SERIAL PRIMARY KEY,
  "image" TEXT,
  "nom" VARCHAR(128) NOT NULL,
  "description" TEXT,
  "prix" DECIMAL NOT NULL
);
INSERT INTO "product" ("id","image","nom", "description","prix")
VALUES 
(1,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(2, "https://i.pinimg.com/736x/a0/35/3f/a0353f1cd9ebcc684234a744acd8775d.jpg", 'Toji', 'Gear 5!', 29.99),
(3,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(4,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(5,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(6,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(7, "https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(8,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(9,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(10,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(11,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(12,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(13,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(14,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(15,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99),
(16,"https://i.pinimg.com/564x/f6/22/c8/f622c8b9f9872e6ac12c1eba17763ed7.jpg", 'Luffy', 'Gear 5!', 29.99);


CREATE TABLE IF NOT EXISTS "panier" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "quantite" INT NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  FOREIGN KEY ("product_id") REFERENCES "product" ("id")
);

