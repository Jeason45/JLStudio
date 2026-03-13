// ─────────────────────────────────────────────
// INTERACTIONS & ANIMATIONS
// ─────────────────────────────────────────────

// ─── Triggers ───

export type InteractionTrigger =
  | { type: 'hover' }
  | { type: 'hover-enter' }
  | { type: 'hover-leave' }
  | { type: 'click'; toggle?: boolean }
  | { type: 'click-first' }
  | { type: 'click-second' }
  | { type: 'scroll-into-view'; threshold?: number }
  | { type: 'page-load'; delay?: number }
  | { type: 'scroll-position'; start: number; end: number }
  | { type: 'while-scrolling'; scrub?: boolean | number }
  | { type: 'mouse-move'; strength?: number }
  | { type: 'mouse-move-element'; strength?: number }
  // Scroll avancé
  | { type: 'while-in-view'; threshold?: number; once?: boolean }
  | { type: 'page-scroll-progress' }
  | { type: 'scroll-pin'; scrollTrigger: ScrollTriggerConfig }
  | { type: 'scroll-snap'; snapType?: 'mandatory' | 'proximity'; snapAlign?: 'start' | 'center' | 'end' }
  | { type: 'scroll-trigger'; scrollTrigger: ScrollTriggerConfig }

export type TriggerType = InteractionTrigger['type']

// ─── Scroll Trigger Config ───

export type ScrollPosition = string // e.g. "top bottom", "center center", "100px", "50%"

export type ScrollToggleAction = 'play' | 'pause' | 'resume' | 'reset' | 'restart' | 'complete' | 'reverse' | 'none'

export interface ScrollTriggerConfig {
  /** Start position: "trigger element" e.g. "top bottom" */
  start: ScrollPosition
  /** End position: "trigger element" e.g. "bottom top" */
  end: ScrollPosition
  /** Link animation progress to scroll position */
  scrub?: boolean | number
  /** Pin element during scroll distance */
  pin?: boolean
  /** Add spacing when pinned */
  pinSpacing?: boolean
  /** Show debug markers (editor only) */
  markers?: boolean
  /** Scroll direction */
  direction?: 'vertical' | 'horizontal'
  /** Actions on enter/leave/enterBack/leaveBack */
  toggleActions?: `${ScrollToggleAction} ${ScrollToggleAction} ${ScrollToggleAction} ${ScrollToggleAction}`
}

// ─── Animatable Properties ───

export interface AnimatableProperties {
  // Position / Transform 2D
  opacity: number
  x: number
  y: number
  scale: number
  scaleX: number
  scaleY: number
  rotate: number
  skewX: number
  skewY: number

  // Transform 3D
  z: number
  scaleZ: number
  rotateX: number
  rotateY: number
  rotateZ: number

  // Filter
  blur: number
  brightness: number
  contrast: number
  grayscale: number
  hueRotate: number
  invert: number
  saturate: number
  sepia: number

  // Backdrop filter
  backdropBlur: number
  backdropBrightness: number

  // Clip
  clipPath: string

  // Color
  color: string
  backgroundColor: string
  borderColor: string

  // Sizing
  width: string
  height: string

  // Spacing
  paddingTop: string
  paddingRight: string
  paddingBottom: string
  paddingLeft: string
  marginTop: string
  marginRight: string
  marginBottom: string
  marginLeft: string

  // Border
  borderWidth: string
  borderRadius: string

  // Typography
  fontSize: string
  letterSpacing: string
  lineHeight: string

  // Shadow
  boxShadow: string
  textShadow: string
}

// ─── Easing ───

export type EasingPresetName =
  | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring'
  | 'quad-in' | 'quad-out' | 'quad-in-out'
  | 'cubic-in' | 'cubic-out' | 'cubic-in-out'
  | 'quart-in' | 'quart-out' | 'quart-in-out'
  | 'quint-in' | 'quint-out' | 'quint-in-out'
  | 'sine-in' | 'sine-out' | 'sine-in-out'
  | 'expo-in' | 'expo-out' | 'expo-in-out'
  | 'circ-in' | 'circ-out' | 'circ-in-out'
  | 'back-in' | 'back-out' | 'back-in-out'
  | 'bounce-in' | 'bounce-out' | 'bounce-in-out'
  | 'elastic-in' | 'elastic-out' | 'elastic-in-out'
  | 'custom'

// ─── Stagger ───

export type StaggerDirection = 'normal' | 'reverse' | 'center' | 'edges' | 'random'

export interface StaggerConfig {
  enabled: boolean
  /** Delay per element in ms */
  value: number
  direction: StaggerDirection
  /** CSS selector to select children (defaults to direct children) */
  selector?: string
}

// ─── Repeat ───

export interface RepeatConfig {
  /** Number of repeats. -1 = infinite */
  count: number
  /** Alternate direction each repeat */
  yoyo: boolean
  /** Delay between repeats in ms */
  repeatDelay: number
}

// ─── Playback ───

export type PlaybackDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

export interface PlaybackConfig {
  /** Speed multiplier (0.1 - 3.0) */
  speed: number
  direction: PlaybackDirection
  autoplay: boolean
}

// ─── Animation Config ───

export interface AnimationConfig {
  id: string
  name: string
  trigger: InteractionTrigger
  from?: Partial<AnimatableProperties>
  to?: Partial<AnimatableProperties>
  keyframes?: { offset: number; properties: Partial<AnimatableProperties> }[]
  duration: number
  delay: number
  easing: EasingPresetName | [number, number, number, number]
  reverseOnLeave?: boolean
  /** @deprecated Use repeatConfig instead */
  repeat?: number
  /** Toggle animation: reverse on second click */
  reverseOnSecondClick?: boolean

  // Extended configs
  stagger?: StaggerConfig
  repeatConfig?: RepeatConfig
  playback?: PlaybackConfig

  /** Animation engine to use */
  engine?: 'web-api' | 'gsap' | 'css-keyframes'

  /** Target scope for the animation */
  target?: {
    scope: 'self' | 'class' | 'children' | 'siblings' | 'parent'
    selector?: string
  }
  /** Action type identifier (fade, slide, flip, etc.) */
  actionType?: string
  /** Direction variant (in, out, top, bottom, left, right, etc.) */
  direction?: string
}

// ─── Presets ───

export interface AnimationPreset {
  id: string
  name: string
  category: 'entrance' | 'exit' | 'emphasis' | 'scroll' | 'hover'
  config: Omit<AnimationConfig, 'id' | 'name' | 'trigger'>
}

// ─── Timeline ───

export type TimelineActionType = 'tween' | 'set' | 'label' | 'call'

export interface TimelineAction {
  id: string
  type: TimelineActionType
  /** Element data-element-id reference (sectionId::contentPath) */
  elementRef?: string
  /** Start time in ms from timeline start */
  startTime: number
  /** Duration in ms */
  duration: number
  /** Tween mode */
  tweenMode?: 'to' | 'from' | 'fromTo'
  from?: Partial<AnimatableProperties>
  to?: Partial<AnimatableProperties>
  easing?: EasingPresetName | [number, number, number, number]
  /** Named label for sequencing */
  label?: string
  /** Offset relative to a label e.g. "myLabel+=200" */
  relativeOffset?: string
}

export interface TimelineTrack {
  id: string
  /** Element data-element-id reference */
  elementRef: string
  label: string
  locked: boolean
  collapsed: boolean
  actions: TimelineAction[]
}

export interface TimelineConfig {
  id: string
  name: string
  trigger: InteractionTrigger
  tracks: TimelineTrack[]
  totalDuration: number
  playbackRate: number
  repeat: number
  yoyo: boolean
  /** Nested timeline IDs */
  childTimelines?: string[]
  autoplay: boolean
  paused: boolean
}

export function isTimelineConfig(config: AnimationConfig | TimelineConfig): config is TimelineConfig {
  return 'tracks' in config && Array.isArray((config as TimelineConfig).tracks)
}

// ─── Interaction Map ───

/** Stored in section.content.__interactions as Record<contentPath, AnimationConfig[]> */
export type InteractionMap = Record<string, AnimationConfig[]>

/** Stored in section.content.__timelines as TimelineConfig[] */
export type TimelineMap = TimelineConfig[]
