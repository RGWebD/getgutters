import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface EstimateNotificationProps {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  submittedAt?: string
}

function EstimateNotificationEmail({
  name = 'Unknown',
  phone = '',
  email = '',
  service = 'Not specified',
  message = '',
  submittedAt = '',
}: EstimateNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New free estimate request from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New Estimate Request</Heading>
          <Text style={muted}>
            Submitted via getguttersjax.com{submittedAt ? ` — ${submittedAt}` : ''}
          </Text>
          <Hr style={hr} />
          <Section>
            <Text style={row}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={row}>
              <strong>Phone:</strong>{' '}
              {phone ? <Link href={`tel:${phone}`}>{phone}</Link> : '—'}
            </Text>
            <Text style={row}>
              <strong>Email:</strong>{' '}
              {email ? <Link href={`mailto:${email}`}>{email}</Link> : '—'}
            </Text>
            <Text style={row}>
              <strong>Service:</strong> {service}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={label}>Project description</Text>
          <Text style={messageStyle}>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#f6f6f4', fontFamily: 'Arial, sans-serif' }
const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e2d8',
  borderRadius: '8px',
  margin: '24px auto',
  maxWidth: '560px',
  padding: '28px',
}
const heading = { color: '#1a1a1a', fontSize: '22px', margin: '0 0 4px' }
const muted = { color: '#6b6b6b', fontSize: '13px', margin: '0 0 8px' }
const hr = { borderColor: '#e5e2d8', margin: '16px 0' }
const row = { color: '#1a1a1a', fontSize: '15px', margin: '6px 0' }
const label = {
  color: '#6b6b6b',
  fontSize: '12px',
  letterSpacing: '0.08em',
  margin: '0 0 6px',
  textTransform: 'uppercase' as const,
}
const messageStyle = {
  backgroundColor: '#faf9f5',
  border: '1px solid #e5e2d8',
  borderRadius: '6px',
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '1.5',
  padding: '14px',
  whiteSpace: 'pre-wrap' as const,
}

export const template = {
  component: EstimateNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New estimate request — ${data.name ?? 'website visitor'}`,
  displayName: 'Estimate request notification',
  previewData: {
    name: 'John Smith',
    phone: '(904) 555-0123',
    email: 'john@example.com',
    service: '6" Seamless Gutter Installation',
    message: 'Need new seamless gutters on a two-story home, about 150 ft.',
    submittedAt: 'Sat Sep 19, 2026 6:43 PM',
  },
} satisfies TemplateEntry
