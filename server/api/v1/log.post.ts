import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server"

import { Channels, Projects, Events } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  try {
    const { headers } = event.req
    const { payload } = await useBody<{
      payload: { project: string; channel: string; event: string; icon: string; notify: boolean }
    }>(event)

    const tokenId = headers.authorization.split("Bearer")[1].trim()
    //todo: should verify tokenId validity and scope first

    const client = serverSupabaseServiceRole(event)
    const { data: projectData } = await client
      .from<Projects>("projects")
      .select("*, channels!project_id(*)")
      .eq("name", payload.project)
      .single()

    const channelData = projectData.channels.find((i) => i.name === payload.channel)

    const { data: eventData, error } = await client.from<Events>("events").insert({
      project_id: projectData.id,
      channel_id: channelData.id,
      name: payload.event,
      icon: payload.icon,
      notify: payload.notify,
      owner_id: projectData.owner_id,
    })
    console.log(error)

    return {
      payload,
      projectData,
      eventData,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
