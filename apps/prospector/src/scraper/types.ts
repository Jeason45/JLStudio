export interface RawProspect {
  name: string
  url: string | null       // null = pas de site web
  phone: string | null
  address: string | null
  city: string | null
  metier: string
  ville: string
}
