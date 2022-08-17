import type { FormKitNode } from "@formkit/core"

export const castLowercaseHyphen = (node: FormKitNode) => {
  node.hook.input((value, next) => {
    return next(String(value).toLowerCase().replaceAll(" ", "-"))
  })
}
