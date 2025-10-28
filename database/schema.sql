-- Maia.Plus Database Schema
-- PostgreSQL Database for Tourist Protection System

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Tabla de usuarios (turistas)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    name VARCHAR(255),
    language VARCHAR(5) DEFAULT 'es',
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}'
);

-- Tabla de comercios y servicios
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- restaurant, tour, transport, hotel, etc.
    location GEOMETRY(POINT, 4326),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP WITH TIME ZONE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Tabla de precios de referencia
CREATE TABLE price_benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id),
    service_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    average_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'MXN',
    unit VARCHAR(50), -- per person, per hour, per day, etc.
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100), -- manual, reported, scraped, etc.
    is_active BOOLEAN DEFAULT true
);

-- Tabla de reportes de precios abusivos
CREATE TABLE price_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    business_id UUID REFERENCES businesses(id),
    service_name VARCHAR(255) NOT NULL,
    reported_price DECIMAL(10,2) NOT NULL,
    expected_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'MXN',
    location GEOMETRY(POINT, 4326),
    description TEXT,
    evidence_urls TEXT[], -- URLs de fotos/videos
    status VARCHAR(50) DEFAULT 'pending', -- pending, investigating, resolved, dismissed
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    metadata JSONB DEFAULT '{}'
);

-- Tabla de conversaciones de chat
CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    language VARCHAR(5) DEFAULT 'es',
    total_messages INTEGER DEFAULT 0,
    satisfaction_rating INTEGER, -- 1-5
    feedback TEXT,
    metadata JSONB DEFAULT '{}'
);

-- Tabla de mensajes de chat
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES chat_conversations(id),
    sender_type VARCHAR(20) NOT NULL, -- user, ai, system
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    message_type VARCHAR(50) DEFAULT 'text', -- text, image, location, quick_reply
    metadata JSONB DEFAULT '{}',
    ai_confidence DECIMAL(3,2), -- Para mensajes de IA
    processing_time_ms INTEGER -- Tiempo de respuesta de IA
);

-- Tabla de experiencias y tours
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- culture, beach, nature, adventure
    duration_hours INTEGER,
    difficulty_level VARCHAR(20), -- easy, moderate, hard
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    location GEOMETRY(POINT, 4326),
    address TEXT,
    operating_hours JSONB, -- Horarios por día de la semana
    best_time_to_visit VARCHAR(100),
    capacity INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Tabla de itinerarios sugeridos
CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- culture, beach, nature
    duration_days INTEGER DEFAULT 1,
    total_estimated_cost DECIMAL(10,2),
    difficulty_level VARCHAR(20) DEFAULT 'easy',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de elementos de itinerarios
CREATE TABLE itinerary_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itinerary_id UUID REFERENCES itineraries(id),
    experience_id UUID REFERENCES experiences(id),
    business_id UUID REFERENCES businesses(id),
    order_index INTEGER NOT NULL,
    start_time TIME,
    duration_minutes INTEGER,
    notes TEXT,
    estimated_cost DECIMAL(10,2)
);

-- Tabla de sistema de recompensas
CREATE TABLE user_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    points_balance INTEGER DEFAULT 0,
    total_points_earned INTEGER DEFAULT 0,
    total_points_spent INTEGER DEFAULT 0,
    level VARCHAR(50) DEFAULT 'bronze', -- bronze, silver, gold, platinum
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de transacciones de puntos
CREATE TABLE points_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL, -- earned, spent, expired
    points INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL,
    reference_id UUID, -- ID de reporte, review, etc.
    reference_type VARCHAR(100), -- price_report, review, check_in, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'
);

-- Tabla de ofertas y descuentos
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(50) NOT NULL, -- percentage, fixed_amount, points
    discount_value DECIMAL(10,2) NOT NULL,
    min_points_required INTEGER DEFAULT 0,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    terms_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de alertas y notificaciones
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type VARCHAR(100) NOT NULL, -- weather, traffic, safety, promotion
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'info', -- info, warning, danger
    location GEOMETRY(POINT, 4326),
    radius_meters INTEGER, -- Radio de afectación
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'
);

-- Tabla de emergencias
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    category VARCHAR(100) NOT NULL, -- police, medical, fire, tourist_police
    location GEOMETRY(POINT, 4326),
    address TEXT,
    is_24_hours BOOLEAN DEFAULT false,
    languages TEXT[], -- Idiomas que hablan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_location ON businesses USING GIST(location);
CREATE INDEX idx_businesses_verified ON businesses(is_verified);
CREATE INDEX idx_price_reports_status ON price_reports(status);
CREATE INDEX idx_price_reports_created_at ON price_reports(created_at);
CREATE INDEX idx_price_reports_location ON price_reports USING GIST(location);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);
CREATE INDEX idx_experiences_category ON experiences(category);
CREATE INDEX idx_experiences_location ON experiences USING GIST(location);
CREATE INDEX idx_points_transactions_user ON points_transactions(user_id);
CREATE INDEX idx_alerts_location ON alerts USING GIST(location);
CREATE INDEX idx_alerts_active ON alerts(is_active);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_rewards_updated_at BEFORE UPDATE ON user_rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();