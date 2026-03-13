export type FormFieldType =
  | 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'hidden'
  | 'password' | 'number' | 'url' | 'date' | 'time' | 'range' | 'search' | 'color'
  | 'file' | 'toggle'

export interface FormFieldValidation {
  pattern?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  customMessage?: string
}

export interface FormField {
  id: string
  type: FormFieldType
  name: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  defaultValue?: string
  width?: 'full' | 'half'
  validation?: FormFieldValidation
  accept?: string
  maxFileSize?: number
  multiple?: boolean
  step?: number
}

export interface FormSettings {
  successMessage: string
  redirectUrl?: string
  emailNotification?: {
    enabled: boolean
    to: string
    subject: string
  }
  createContact: boolean
}

export interface LeadData {
  [key: string]: string | boolean | number
}

export type KanbanColumn = {
  id: string
  title: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST'
  color: string
}

export const CRM_COLUMNS: KanbanColumn[] = [
  { id: 'NEW', title: 'Nouveaux', status: 'NEW', color: 'bg-blue-500' },
  { id: 'CONTACTED', title: 'Contactés', status: 'CONTACTED', color: 'bg-yellow-500' },
  { id: 'QUALIFIED', title: 'Qualifiés', status: 'QUALIFIED', color: 'bg-purple-500' },
  { id: 'CONVERTED', title: 'Convertis', status: 'CONVERTED', color: 'bg-green-500' },
  { id: 'LOST', title: 'Perdus', status: 'LOST', color: 'bg-red-500' },
]

// Types pour le panel CRM de l'éditeur
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost'
export type ContactStatus = 'active' | 'inactive' | 'unsubscribed'

export interface LeadWithContact {
  id: string
  siteId: string
  contactId: string
  formId?: string | null
  status: LeadStatus
  source?: string | null
  createdAt: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  contact: {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    company?: string | null
  }
}

export interface ContactRecord {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  status: ContactStatus
  tags: string[]
  createdAt: string
}
