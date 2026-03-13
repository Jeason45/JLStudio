import type { SiteIntegrations } from '@/types/site'

interface ScriptOutput {
  head: string
  bodyEnd: string
}

export function generateIntegrationScripts(integrations: SiteIntegrations): ScriptOutput {
  const head: string[] = []
  const bodyEnd: string[] = []

  // Google Analytics (gtag)
  if (integrations.analytics?.provider === 'gtag' && integrations.analytics.id) {
    const id = integrations.analytics.id
    head.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`)
    head.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>`)
  }

  // Plausible
  if (integrations.analytics?.provider === 'plausible' && integrations.analytics.id) {
    head.push(`<script defer data-domain="${integrations.analytics.id}" src="https://plausible.io/js/script.js"></script>`)
  }

  // PostHog
  if (integrations.analytics?.provider === 'posthog' && integrations.analytics.id) {
    head.push(`<script>!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${integrations.analytics.id}',{api_host:'https://app.posthog.com'});</script>`)
  }

  // Google Tag Manager
  if (integrations.gtm?.containerId) {
    const id = integrations.gtm.containerId
    head.push(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');</script>`)
    bodyEnd.push(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`)
  }

  // Meta Pixel
  if (integrations.metaPixel?.pixelId) {
    const id = integrations.metaPixel.pixelId
    head.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');</script>`)
  }

  // Hotjar
  if (integrations.hotjar?.siteId) {
    const id = integrations.hotjar.siteId
    head.push(`<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${id},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`)
  }

  return {
    head: head.join('\n'),
    bodyEnd: bodyEnd.join('\n'),
  }
}
