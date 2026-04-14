-- scripts/init.sql
-- Initialisation PostgreSQL pour FDS Platform

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Commentaires sur la base
COMMENT ON DATABASE fds_db IS 'Base de données FDS — Front Démocratique et Social';
