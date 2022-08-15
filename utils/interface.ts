export interface Projects {
  id: string /* primary key */
  name?: string
  created_at?: string
  owner_id?: string
  channels?: Channels[]
  events?: Events[]
}

export interface Channels {
  id: string /* primary key */
  project_id?: string /* foreign key to projects.id */
  name?: string
  created_at?: string
  projects?: Projects
}

export interface Users {
  id: string /* primary key */
  full_name?: string
  avatar_url?: string
  meta?: any // type unknown;
}

export interface Events {
  id?: string /* primary key */
  name: string
  description?: string
  icon?: string
  notify?: boolean
  project_id?: string /* foreign key to projects.id */
  channel_id?: string /* foreign key to channels.id */
  owner_id?: string
  created_at?: string
  plugin?: string
  projects?: Projects
  channels?: Channels
}

export interface Tokens {
  id: string /* primary key */
  name: string
  private?: boolean
  created_at?: string
  owner_id?: string
  plugin?: string
  access?: string[]
}

export interface Integrations {
  id: string /* primary key */
  name?: string
  project_name?: string
  channel_name?: string
  owner_id?: string
}
