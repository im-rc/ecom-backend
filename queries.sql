CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10, 2) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_chairs (
	id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL,
	chair_id INTEGER NOT NULL
);

CREATE TABLE order_tables (
	id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL,
	table_id INTEGER NOT NULL
);

CREATE TABLE order_tops (
	id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL,
	top_id INTEGER NOT NULL
);


