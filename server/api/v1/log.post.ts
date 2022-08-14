import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server"

import { Channels, Projects, Events } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  try {
    const { headers } = event.req
    const { payload } = await useBody<{
      payload: { project: string; channel: string; event: string; description: string; icon: string; notify: boolean }
    }>(event)

    const tokenId = headers.authorization.split("Bearer")[1].trim()
    //todo: should verify tokenId validity and scope first

    const client = serverSupabaseServiceRole(event)
    const { data, error } = await client.rpc("log_event", {
      input_project: payload.project,
      input_channel: payload.channel,
      input_name: payload.event,
      input_description: payload.description,
      input_icon: payload.icon,
      input_notify: payload.notify,
    })

    return { data, error }
  } catch (err) {
    sendError(event, err, true)
  }
})
