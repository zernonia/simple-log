import { DefaultConfigOptions } from "@formkit/vue"
import type { FormKitNode } from "@formkit/core"

function addAsteriskPlugin(node: FormKitNode) {
  node.on("created", () => {
    const schemaFn = node.props.definition.schema
    node.props.definition.schema = (sectionsSchema = {}) => {
      const isRequired = node.props.parsedRules.some((rule) => rule.name === "required")

      if (isRequired) {
        sectionsSchema.label = {
          children: ["$label", " *"],
        }
      }
      //@ts-ignore
      return schemaFn(sectionsSchema)
    }
  })
}

const config: DefaultConfigOptions = {
  plugins: [addAsteriskPlugin],
}

export default config
