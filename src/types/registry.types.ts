// types/registry.types.ts
export type ComponentEntry = {
  builder: () => Promise<{ default: React.ComponentType<any> }>
  defaultProps?: Record<string, any>
  previewProps?: Record<string, any>
}

export type ComponentMap = Record<string, ComponentEntry>
