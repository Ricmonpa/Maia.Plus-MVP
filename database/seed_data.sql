-- Datos iniciales para Maia.Plus
-- Información base de Tulum para el MVP

-- Insertar contactos de emergencia
INSERT INTO emergency_contacts (name, phone, category, address, is_24_hours, languages) VALUES
('Policía Turística Tulum', '911', 'tourist_police', 'Centro de Tulum, Quintana Roo', true, ARRAY['es', 'en']),
('Cruz Roja Tulum', '065', 'medical', 'Av. Tulum, Centro, Tulum', true, ARRAY['es', 'en']),
('Bomberos Tulum', '911', 'fire', 'Centro de Tulum', true, ARRAY['es']),
('Hospital General Tulum', '+52 984 871 2071', 'medical', 'Carretera Tulum-Cobá Km 1', true, ARRAY['es', 'en']),
('Capitanía de Puerto', '+52 984 871 2409', 'marine', 'Zona Hotelera Tulum', false, ARRAY['es', 'en']);

-- Insertar experiencias principales de Tulum
INSERT INTO experiences (name, description, category, duration_hours, difficulty_level, min_price, max_price, address, operating_hours, best_time_to_visit) VALUES
('Ruinas de Tulum', 'Sitio arqueológico maya con vista al mar Caribe', 'culture', 3, 'easy', 85.00, 85.00, 'Carretera Federal, Zona Arqueológica', 
 '{"monday": "08:00-17:00", "tuesday": "08:00-17:00", "wednesday": "08:00-17:00", "thursday": "08:00-17:00", "friday": "08:00-17:00", "saturday": "08:00-17:00", "sunday": "08:00-17:00"}', 
 'Temprano en la mañana (8-10 AM) para evitar multitudes'),

('Cenote Dos Ojos', 'Sistema de cenotes para snorkel y buceo', 'nature', 4, 'moderate', 350.00, 500.00, 'Carretera Tulum-Cobá Km 124', 
 '{"monday": "08:00-17:00", "tuesday": "08:00-17:00", "wednesday": "08:00-17:00", "thursday": "08:00-17:00", "friday": "08:00-17:00", "saturday": "08:00-17:00", "sunday": "08:00-17:00"}', 
 'Medio día cuando hay mejor visibilidad'),

('Playa Paraíso', 'Playa pública con arena blanca y aguas cristalinas', 'beach', 6, 'easy', 0.00, 0.00, 'Zona Hotelera Tulum', 
 '{"monday": "24h", "tuesday": "24h", "wednesday": "24h", "thursday": "24h", "friday": "24h", "saturday": "24h", "sunday": "24h"}', 
 'Cualquier momento, mejor al amanecer o atardecer'),

('Reserva de Sian Ka\'an', 'Reserva de la biosfera con tours de naturaleza', 'nature', 8, 'moderate', 1200.00, 2000.00, 'Carretera Tulum-Punta Allen', 
 '{"monday": "07:00-16:00", "tuesday": "07:00-16:00", "wednesday": "07:00-16:00", "thursday": "07:00-16:00", "friday": "07:00-16:00", "saturday": "07:00-16:00", "sunday": "07:00-16:00"}', 
 'Temporada seca (noviembre-abril)'),

('Cenote Gran Cenote', 'Cenote popular para snorkel con tortugas', 'nature', 3, 'easy', 180.00, 180.00, 'Carretera Tulum-Cobá Km 4', 
 '{"monday": "08:00-17:00", "tuesday": "08:00-17:00", "wednesday": "08:00-17:00", "thursday": "08:00-17:00", "friday": "08:00-17:00", "saturday": "08:00-17:00", "sunday": "08:00-17:00"}', 
 'Mañana temprano para mejor experiencia');

-- Insertar itinerarios predefinidos
INSERT INTO itineraries (name, description, category, duration_days, total_estimated_cost, difficulty_level, is_featured) VALUES
('Tulum Cultural', 'Descubre la historia maya y la cultura local', 'culture', 1, 800.00, 'easy', true),
('Aventura en Cenotes', 'Explora los cenotes más hermosos de la Riviera Maya', 'nature', 1, 1200.00, 'moderate', true),
('Playa y Relajación', 'Día perfecto de playa y descanso', 'beach', 1, 400.00, 'easy', true);

-- Insertar elementos de itinerarios
-- Itinerario Cultural
INSERT INTO itinerary_items (itinerary_id, experience_id, order_index, start_time, duration_minutes, notes, estimated_cost) VALUES
((SELECT id FROM itineraries WHERE name = 'Tulum Cultural'), (SELECT id FROM experiences WHERE name = 'Ruinas de Tulum'), 1, '08:00', 180, 'Llegar temprano para evitar multitudes', 85.00);

-- Itinerario de Cenotes
INSERT INTO itinerary_items (itinerary_id, experience_id, order_index, start_time, duration_minutes, notes, estimated_cost) VALUES
((SELECT id FROM itineraries WHERE name = 'Aventura en Cenotes'), (SELECT id FROM experiences WHERE name = 'Cenote Gran Cenote'), 1, '09:00', 180, 'Primer cenote del día', 180.00),
((SELECT id FROM itineraries WHERE name = 'Aventura en Cenotes'), (SELECT id FROM experiences WHERE name = 'Cenote Dos Ojos'), 2, '14:00', 240, 'Cenote principal con snorkel', 350.00);

-- Itinerario de Playa
INSERT INTO itinerary_items (itinerary_id, experience_id, order_index, start_time, duration_minutes, notes, estimated_cost) VALUES
((SELECT id FROM itinerarios WHERE name = 'Playa y Relajación'), (SELECT id FROM experiences WHERE name = 'Playa Paraíso'), 1, '10:00', 360, 'Día completo de playa', 0.00);

-- Insertar comercios verificados
INSERT INTO businesses (name, category, address, phone, is_verified, verification_date, rating) VALUES
('Taxi Tulum Oficial', 'transport', 'Centro de Tulum', '+52 984 871 2345', true, NOW(), 4.5),
('Restaurant Posada Margherita', 'restaurant', 'Zona Hotelera Tulum', '+52 984 801 8493', true, NOW(), 4.8),
('Cenote Diving Tulum', 'tour', 'Av. Tulum Centro', '+52 984 871 2311', true, NOW(), 4.6),
('Hotel Ahau Tulum', 'hotel', 'Zona Hotelera Tulum', '+52 984 179 1596', true, NOW(), 4.7),
('Tulum Jungle Gym', 'fitness', 'Zona Hotelera Tulum', '+52 984 116 9186', true, NOW(), 4.9);

-- Insertar precios de referencia
INSERT INTO price_benchmarks (business_id, service_name, category, min_price, max_price, average_price, unit, source) VALUES
-- Transporte
((SELECT id FROM businesses WHERE name = 'Taxi Tulum Oficial'), 'Taxi Centro a Ruinas', 'transport', 150.00, 200.00, 175.00, 'per trip', 'verified'),
((SELECT id FROM businesses WHERE name = 'Taxi Tulum Oficial'), 'Taxi Centro a Zona Hotelera', 'transport', 100.00, 150.00, 125.00, 'per trip', 'verified'),

-- Restaurantes
((SELECT id FROM businesses WHERE name = 'Restaurant Posada Margherita'), 'Pizza Margherita', 'food', 280.00, 320.00, 300.00, 'per item', 'verified'),
((SELECT id FROM businesses WHERE name = 'Restaurant Posada Margherita'), 'Pasta del día', 'food', 250.00, 300.00, 275.00, 'per item', 'verified'),

-- Tours
((SELECT id FROM businesses WHERE name = 'Cenote Diving Tulum'), 'Tour 2 Cenotes', 'tour', 800.00, 1200.00, 1000.00, 'per person', 'verified'),
((SELECT id FROM businesses WHERE name = 'Cenote Diving Tulum'), 'Snorkel Cenote', 'tour', 400.00, 600.00, 500.00, 'per person', 'verified');

-- Insertar alertas activas
INSERT INTO alerts (alert_type, title, message, severity, is_active, expires_at) VALUES
('weather', 'Temporada de Sargazo', 'Presencia moderada de sargazo en las playas. Se recomienda consultar condiciones antes de visitar.', 'warning', true, '2024-10-31 23:59:59'),
('traffic', 'Tráfico en Zona Arqueológica', 'Congestión vehicular esperada entre 10:00 AM y 2:00 PM en acceso a ruinas.', 'info', true, '2024-12-31 23:59:59'),
('safety', 'Recomendaciones de Seguridad', 'Utiliza únicamente taxis oficiales con placas amarillas. Evita caminar solo por la noche.', 'warning', true, '2024-12-31 23:59:59');

-- Insertar ofertas iniciales
INSERT INTO offers (business_id, title, description, discount_type, discount_value, min_points_required, max_uses, valid_until, terms_conditions) VALUES
((SELECT id FROM businesses WHERE name = 'Restaurant Posada Margherita'), '10% Descuento Turistas Verificados', 'Descuento especial para usuarios de Maia.Plus', 'percentage', 10.00, 100, 1000, '2024-12-31 23:59:59', 'Válido de lunes a viernes. No acumulable con otras promociones.'),
((SELECT id FROM businesses WHERE name = 'Cenote Diving Tulum'), 'Tour Gratis por Puntos', 'Canjea 500 puntos por un tour gratuito a cenote', 'points', 500.00, 500, 100, '2024-12-31 23:59:59', 'Válido para tours básicos de 2 cenotes. Sujeto a disponibilidad.');

-- Crear usuario de prueba
INSERT INTO users (email, name, language, country, preferences) VALUES
('turista@ejemplo.com', 'Turista de Prueba', 'es', 'México', '{"notifications": true, "language": "es", "currency": "MXN"}');

-- Crear recompensas para usuario de prueba
INSERT INTO user_rewards (user_id, points_balance, total_points_earned, level) VALUES
((SELECT id FROM users WHERE email = 'turista@ejemplo.com'), 150, 150, 'bronze');

-- Crear transacción de puntos de bienvenida
INSERT INTO points_transactions (user_id, transaction_type, points, reason, reference_type) VALUES
((SELECT id FROM users WHERE email = 'turista@ejemplo.com'), 'earned', 150, 'Puntos de bienvenida por registrarse en Maia.Plus', 'welcome_bonus');