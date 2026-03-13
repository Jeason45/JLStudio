'use client'

interface VideoBackgroundLayerProps {
  url: string
  poster?: string
  loop?: boolean
  muted?: boolean
}

export function VideoBackgroundLayer({ url, poster, loop = true, muted = true }: VideoBackgroundLayerProps) {
  if (!url) return null

  return (
    <video
      autoPlay
      muted={muted}
      loop={loop}
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ zIndex: -1 }}
      src={url}
      poster={poster}
    />
  )
}
