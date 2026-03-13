// ─── Rich Media Types ───

export interface LottieConfig {
  /** URL or path to Lottie JSON */
  src: string
  /** Auto-play on load */
  autoplay: boolean
  /** Loop animation */
  loop: boolean
  /** Playback speed */
  speed: number
  /** Scrub to scroll progress */
  scrollScrub: boolean
  /** Play on hover */
  playOnHover: boolean
  /** Specific segment [start, end] frames */
  segment?: [number, number]
  /** Renderer mode */
  renderer: 'svg' | 'canvas'
}

export interface SplineConfig {
  /** Spline scene URL */
  sceneUrl: string
  /** Enable mouse events */
  mouseEvents: boolean
  /** Enable scroll events */
  scrollEvents: boolean
  /** Background color override */
  backgroundColor?: string
}

export interface RiveConfig {
  /** URL or path to .riv file */
  src: string
  /** State machine name to use */
  stateMachine?: string
  /** Artboard name */
  artboard?: string
  /** Auto-play */
  autoplay: boolean
  /** Fit mode */
  fit: 'cover' | 'contain' | 'fill' | 'fitWidth' | 'fitHeight' | 'none'
  /** Alignment */
  alignment: 'center' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
}

export type RichMediaType = 'lottie' | 'spline' | 'rive'

export interface RichMediaElement {
  type: RichMediaType
  config: LottieConfig | SplineConfig | RiveConfig
}

export function getDefaultLottieConfig(): LottieConfig {
  return {
    src: '',
    autoplay: true,
    loop: true,
    speed: 1,
    scrollScrub: false,
    playOnHover: false,
    renderer: 'svg',
  }
}

export function getDefaultSplineConfig(): SplineConfig {
  return {
    sceneUrl: '',
    mouseEvents: true,
    scrollEvents: false,
  }
}

export function getDefaultRiveConfig(): RiveConfig {
  return {
    src: '',
    autoplay: true,
    fit: 'contain',
    alignment: 'center',
  }
}
