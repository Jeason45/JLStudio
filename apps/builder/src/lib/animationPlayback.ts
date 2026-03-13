// ─── Animation Playback Registry ───
// Singleton registry to control all active animations externally

export interface RegisteredAnimation {
  id: string
  animation: Animation | null
  element: HTMLElement
  cleanup?: () => void
  /** Custom tick function for non-WAAPI animations */
  tick?: (progress: number) => void
  paused: boolean
}

class AnimationRegistry {
  private animations = new Map<string, RegisteredAnimation>()

  register(entry: RegisteredAnimation) {
    // Cleanup existing if re-registering
    const existing = this.animations.get(entry.id)
    if (existing) this.unregister(entry.id)
    this.animations.set(entry.id, entry)
  }

  unregister(id: string) {
    const entry = this.animations.get(id)
    if (!entry) return
    entry.cleanup?.()
    entry.animation?.cancel()
    this.animations.delete(id)
  }

  get(id: string): RegisteredAnimation | undefined {
    return this.animations.get(id)
  }

  pause(id: string) {
    const entry = this.animations.get(id)
    if (!entry) return
    entry.paused = true
    entry.animation?.pause()
  }

  resume(id: string) {
    const entry = this.animations.get(id)
    if (!entry) return
    entry.paused = false
    entry.animation?.play()
  }

  seek(id: string, time: number) {
    const entry = this.animations.get(id)
    if (!entry?.animation) return
    entry.animation.currentTime = time
  }

  setSpeed(id: string, rate: number) {
    const entry = this.animations.get(id)
    if (!entry?.animation) return
    entry.animation.playbackRate = rate
  }

  restart(id: string) {
    const entry = this.animations.get(id)
    if (!entry?.animation) return
    entry.animation.currentTime = 0
    entry.animation.play()
    entry.paused = false
  }

  pauseAll() {
    for (const entry of this.animations.values()) {
      entry.paused = true
      entry.animation?.pause()
    }
  }

  resumeAll() {
    for (const entry of this.animations.values()) {
      entry.paused = false
      entry.animation?.play()
    }
  }

  clear() {
    for (const id of this.animations.keys()) {
      this.unregister(id)
    }
  }

  getAll(): RegisteredAnimation[] {
    return Array.from(this.animations.values())
  }

  getByElement(element: HTMLElement): RegisteredAnimation[] {
    return this.getAll().filter(a => a.element === element)
  }
}

export const animationRegistry = new AnimationRegistry()
