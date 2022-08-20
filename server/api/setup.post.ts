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

    await $fetch("/api/token/create", {
      method: "POST",
      body: {
        payload: {
          name: `${payload.project}-token`,
          private: true,
          owner_id: user.id,
        },
      },
    })

    return {
      projectData,
      channelData,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
