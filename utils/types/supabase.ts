export interface SupabasePayload {
  type: "INSERT" | "DELETE" | "UPDATE"
  table: string
  schema: string
  record?: Record
  old_record?: OldRecord
}

export interface Record {
  id: string
  icon: string
  name: string
  notify: boolean
  owner_id: string
  channel_id: string
  created_at: string
  project_id: string
  description: string
}

export interface OldRecord {
  id: string
  icon: string
  name: string
  notify: boolean
  owner_id: string
  channel_id: string
  created_at: string
  project_id: string
  description: string
}
