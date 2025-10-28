import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiPhone, 
  FiMapPin, 
  FiAlertTriangle,
  FiShield,
  FiHeart,
  FiTruck,
  FiClock,
  FiUser,
  FiMessageCircle
} from 'react-icons/fi';

const EmergencyContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
`;

const AlertHeader = styled.div`
  background: ${props => props.theme.colors.danger};
  color: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const AlertTitle = styled.h1`
  font-size: ${props => props.theme.fonts.sizes['3xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const AlertSubtitle = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  opacity: 0.9;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuickCallButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: white;
  color: ${props => props.theme.colors.danger};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.xl};
  
  svg {
    font-size: ${props => props.theme.fonts.sizes['2xl']};
  }
`;

const ContactsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ContactCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border-left: 4px solid ${props => props.color || props.theme.colors.primary};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fonts.sizes.xl};
`;

const ContactTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ContactSubtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const ContactInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.darkGray};
  font-size: ${props => props.theme.fonts.sizes.sm};
  
  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const CallButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.color || props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.semibold};
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
`;

const SafetyTipsSection = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TipsList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const TipItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const TipIcon = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.colors.success};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const Emergency = () => {
  const emergencyContacts = [
    {
      id: 1,
      title: 'Policía Turística',
      subtitle: 'Emergencias y seguridad',
      phone: '911',
      address: 'Centro de Tulum',
      hours: '24 horas',
      languages: 'Español, Inglés',
      icon: FiShield,
      color: '#F72585'
    },
    {
      id: 2,
      title: 'Cruz Roja',
      subtitle: 'Emergencias médicas',
      phone: '065',
      address: 'Av. Tulum, Centro',
      hours: '24 horas',
      languages: 'Español, Inglés',
      icon: FiHeart,
      color: '#DC3545'
    },
    {
      id: 3,
      title: 'Hospital General',
      subtitle: 'Atención médica',
      phone: '+52 984 871 2071',
      address: 'Carretera Tulum-Cobá Km 1',
      hours: '24 horas',
      languages: 'Español, Inglés',
      icon: FiHeart,
      color: '#06D6A0'
    },
    {
      id: 4,
      title: 'Bomberos',
      subtitle: 'Incendios y rescates',
      phone: '911',
      address: 'Centro de Tulum',
      hours: '24 horas',
      languages: 'Español',
      icon: FiTruck,
      color: '#FF6B35'
    }
  ];

  const safetyTips = [
    'Siempre usa taxis oficiales con placas amarillas',
    'Mantén copias de tus documentos en lugar seguro',
    'Informa a alguien sobre tus planes de viaje',
    'Lleva efectivo en pequeñas denominaciones',
    'Evita caminar solo por la noche en áreas remotas',
    'Mantén tu teléfono cargado y con saldo',
    'Conoce la ubicación de tu hotel y puntos de referencia',
    'No dejes objetos de valor a la vista en tu vehículo'
  ];

  return (
    <EmergencyContainer>
      <AlertHeader>
        <AlertTitle>
          <FiAlertTriangle />
          Ayuda Inmediata
        </AlertTitle>
        <AlertSubtitle>
          En caso de emergencia real, llama inmediatamente al 911
        </AlertSubtitle>
        <QuickCallButton
          href="tel:911"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPhone />
          Llamar 911 AHORA
        </QuickCallButton>
      </AlertHeader>

      <ContactsSection>
        {emergencyContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            color={contact.color}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * contact.id }}
            whileHover={{ scale: 1.02 }}
          >
            <ContactHeader>
              <ContactIcon color={contact.color}>
                <contact.icon />
              </ContactIcon>
              <div>
                <ContactTitle>{contact.title}</ContactTitle>
                <ContactSubtitle>{contact.subtitle}</ContactSubtitle>
              </div>
            </ContactHeader>

            <ContactInfo>
              <InfoItem>
                <FiMapPin />
                {contact.address}
              </InfoItem>
              <InfoItem>
                <FiClock />
                {contact.hours}
              </InfoItem>
              <InfoItem>
                <FiUser />
                {contact.languages}
              </InfoItem>
            </ContactInfo>

            <CallButton
              href={`tel:${contact.phone}`}
              color={contact.color}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPhone />
              Llamar {contact.phone}
            </CallButton>
          </ContactCard>
        ))}
      </ContactsSection>

      <SafetyTipsSection>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '0.5rem',
          color: '#212529'
        }}>
          🛡️ Consejos de Seguridad
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#6C757D', 
          marginBottom: '1.5rem' 
        }}>
          Mantente seguro siguiendo estas recomendaciones del Gobierno de Tulum
        </p>

        <TipsList>
          {safetyTips.map((tip, index) => (
            <TipItem key={index}>
              <TipIcon>
                ✓
              </TipIcon>
              <span>{tip}</span>
            </TipItem>
          ))}
        </TipsList>
      </SafetyTipsSection>

      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#212529' }}>
          💬 ¿Necesitas Ayuda No Urgente?
        </h3>
        <p style={{ color: '#6C757D', marginBottom: '1rem' }}>
          Habla con Maia para obtener asistencia inmediata
        </p>
        <motion.button
          style={{
            background: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/chat'}
        >
          <FiMessageCircle />
          Chat con Maia
        </motion.button>
      </div>
    </EmergencyContainer>
  );
};

export default Emergency;