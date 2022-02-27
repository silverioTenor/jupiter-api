CREATE TABLE "jp_user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "lastName" text NOT NULL,
  "age" int NOT NULL,
  "genre" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "isActive" boolean DEFAULT true,
  "createdAt" timestamp DEFAULT 'now()',
  "updatedAt" timestamp DEFAULT 'now()'
);

CREATE TABLE "jp_flight" (
  "id" text PRIMARY KEY,
  "code" text NOT NULL,
  "availableSeats" int NOT NULL,
  "filledSeats" int NOT NULL,
  "destination" text NOT NULL,
  "departureDate" timestamp NOT NULL,
  "arrivalDate" timestamp NOT NULL,
  "hasStops" boolean NOT NULL,
  "airlineCompany" text,
  "createdAt" timestamp DEFAULT 'now()',
  "updatedAt" timestamp DEFAULT 'now()'
);

CREATE TABLE "jp_airline" (
  "id" text PRIMARY KEY,
  "nameCompany" text NOT NULL,
  "createdAt" timestamp DEFAULT 'now()',
  "updatedAt" timestamp DEFAULT 'now()'
);

CREATE TABLE "jp_airline_rate" (
  "id" text PRIMARY KEY,
  "flightId" text,
  "economic" int,
  "executive" int,
  "premium" int,
  "createdAt" timestamp DEFAULT 'now()',
  "updatedAt" timestamp DEFAULT 'now()'
);

CREATE TABLE "jp_airline_order" (
  "id" text PRIMARY KEY,
  "userId" text,
  "flightId" text,
  "rateId" text,
  "total" int
);

ALTER TABLE "jp_flight" ADD FOREIGN KEY ("airlineCompany") REFERENCES "jp_airline" ("id");

ALTER TABLE "jp_airline_rate" ADD FOREIGN KEY ("flightId") REFERENCES "jp_airline" ("id");

ALTER TABLE "jp_airline_order" ADD FOREIGN KEY ("userId") REFERENCES "jp_user" ("id");

ALTER TABLE "jp_airline_order" ADD FOREIGN KEY ("flightId") REFERENCES "jp_flight" ("id");
