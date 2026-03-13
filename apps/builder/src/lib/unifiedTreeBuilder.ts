import type { SectionConfig } from '@/types/site'
import type { CustomElement } from '@/types/elements'
import { SECTION_ELEMENT_TREES, type ElementTreeNode } from './sectionElementTree'

export interface UnifiedTreeNode {
  key: string
  elementPath: string   // sectionId::contentPath ou sectionId::__el.elId
  label: string
  type: string          // ElementType ou CustomElementType
  source: 'predefined' | 'custom'
  children?: UnifiedTreeNode[]
  editable: boolean
  visible?: boolean
}

function buildPredefinedNodes(
  sectionId: string,
  nodes: ElementTreeNode[],
  content: Record<string, unknown>,
  parentPath: string,
): UnifiedTreeNode[] {
  return nodes.map(node => {
    const fullPath = parentPath ? `${parentPath}.${node.path}` : node.path
    const result: UnifiedTreeNode = {
      key: `${sectionId}::${fullPath}`,
      elementPath: `${sectionId}::${fullPath}`,
      label: node.label,
      type: node.type,
      source: 'predefined',
      editable: false,
    }

    // Static children
    if (node.children) {
      result.children = buildPredefinedNodes(sectionId, node.children, content, fullPath)
    }

    // Dynamic children from items array
    if (node.dynamicChildren) {
      const items = content[node.path] as Array<Record<string, unknown>> | undefined
      if (items && Array.isArray(items)) {
        result.children = items.map((item, index) => {
          const itemLabel = (item[node.dynamicChildren!.labelField] as string) || `Item ${index + 1}`
          const itemPath = `${fullPath}.${index}`
          const itemChildren = node.dynamicChildren!.childTemplate.map(child => ({
            key: `${sectionId}::${itemPath}.${child.path}`,
            elementPath: `${sectionId}::${itemPath}.${child.path}`,
            label: child.label,
            type: child.type,
            source: 'predefined' as const,
            editable: false,
          }))

          return {
            key: `${sectionId}::${itemPath}`,
            elementPath: `${sectionId}::${itemPath}`,
            label: itemLabel,
            type: 'container',
            source: 'predefined' as const,
            editable: false,
            children: itemChildren,
          }
        })
      }
    }

    return result
  })
}

function buildCustomNodes(sectionId: string, elements: CustomElement[]): UnifiedTreeNode[] {
  return elements.map(el => {
    const node: UnifiedTreeNode = {
      key: `${sectionId}::__el.${el.id}`,
      elementPath: `${sectionId}::__el.${el.id}`,
      label: el.label,
      type: el.type,
      source: 'custom',
      editable: true,
      visible: el.visible,
    }
    if (el.children && el.children.length > 0) {
      node.children = buildCustomNodes(sectionId, el.children)
    }
    return node
  })
}

export function buildUnifiedTree(section: SectionConfig): UnifiedTreeNode[] {
  const predefinedTree = SECTION_ELEMENT_TREES[section.type] ?? []
  const content = (section.content ?? {}) as Record<string, unknown>

  const predefinedNodes = buildPredefinedNodes(section.id, predefinedTree, content, '')
  const customNodes = buildCustomNodes(section.id, section.elements ?? [])

  return [...predefinedNodes, ...customNodes]
}
