CREATE TYPE logging_type AS ENUM('Error', 'Event');
CREATE TABLE IF NOT EXISTS application_log (
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type logging_type,
    source VARCHAR(255),
    message VARCHAR(1500),
    details JSON
);