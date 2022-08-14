import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server"
import { Channels, Projects } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  try {
    const { payload } = await useBody<{ payload: { project: string; channel: string } }>(event)
    const user = await serverSupabaseUser(event)
    const client = serverSupabaseServiceRole(event)

    const { data: projectData, error: projectError } = await client
      .from<Projects>("projects")
      .insert({
        owner_id: user.id,
        name: payload.project,
      })
      .single()

    console.log({ projectData, projectError })

    const { data: channelData, error: channelError } = await client.from<Channels>("channels").insert({
      project_id: projectData.id,
      name: payload.channel,
    })

    return {
      projectData,
      channelData,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
