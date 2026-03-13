// ─────────────────────────────────────────────
// LIBRARY — Animation presets (Brixsa-quality)
// ~60 high-quality animation presets across 5 subcategories
// Palette: #140c08 (dark), #4a2711 (brown), #f6efe5 (cream), #c8a97e (gold)
// ─────────────────────────────────────────────

import type { LibraryElementItem } from '@/types/library'

// ─── ENTRANCE ANIMATIONS ───

const ENTRANCES: LibraryElementItem[] = [
  {
    id: 'anim-fade-up',
    label: 'Fade Up',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'fade', 'up'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Up',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateY(40px);animation:fadeUp .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Fade Up &mdash; 0.8s ease</div></div>' },
    },
  },
  {
    id: 'anim-fade-down',
    label: 'Fade Down',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'fade', 'down'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Down',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateY(-40px);animation:fadeDown .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes fadeDown{to{opacity:1;transform:translateY(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Fade Down &mdash; 0.8s ease</div></div>' },
    },
  },
  {
    id: 'anim-fade-left',
    label: 'Fade Left',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'fade', 'left'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Left',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateX(-40px);animation:fadeLeft .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes fadeLeft{to{opacity:1;transform:translateX(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Fade Left &mdash; 0.8s ease</div></div>' },
    },
  },
  {
    id: 'anim-fade-right',
    label: 'Fade Right',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'fade', 'right'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Right',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateX(40px);animation:fadeRight .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes fadeRight{to{opacity:1;transform:translateX(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Fade Right &mdash; 0.8s ease</div></div>' },
    },
  },
  {
    id: 'anim-fade-scale',
    label: 'Fade + Scale',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'fade', 'scale', 'zoom'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Scale',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:scale(.85);animation:fadeScale .7s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes fadeScale{to{opacity:1;transform:scale(1)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Fade + Scale &mdash; 0.7s</div></div>' },
    },
  },
  {
    id: 'anim-slide-snappy',
    label: 'Slide In Snappy',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'slide', 'snappy', 'fast'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Slide Snappy',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateX(-100%);animation:slideSnappy .5s cubic-bezier(.76,0,.24,1) forwards"><style>@keyframes slideSnappy{to{opacity:1;transform:translateX(0)}}</style><div style="padding:1.25rem;background:linear-gradient(135deg,#4a2711,#2c1e14);border-radius:.75rem;color:#c8a97e;font-size:.875rem;text-align:center;box-shadow:0 4px 24px rgba(20,12,8,.4)">Slide Snappy &mdash; 0.5s cubic</div></div>' },
    },
  },
  {
    id: 'anim-stagger-children',
    label: 'Stagger Children',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'stagger', 'cascade', 'children'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Stagger Children',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;gap:.5rem;flex-wrap:wrap"><style>@keyframes stgChild{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.stgc{animation:stgChild .5s cubic-bezier(.25,.46,.45,.94) forwards;opacity:0;padding:.75rem 1rem;background:rgba(200,169,126,.15);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#f6efe5;font-size:.8125rem}</style><div class="stgc" style="animation-delay:0s">Item 1</div><div class="stgc" style="animation-delay:.1s">Item 2</div><div class="stgc" style="animation-delay:.2s">Item 3</div><div class="stgc" style="animation-delay:.3s">Item 4</div><div class="stgc" style="animation-delay:.4s">Item 5</div></div>' },
    },
  },
  {
    id: 'anim-blur-focus',
    label: 'Blur to Focus',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'blur', 'focus'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Blur Focus',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;filter:blur(12px);animation:blurFocus .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes blurFocus{to{opacity:1;filter:blur(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Blur to Focus &mdash; 0.8s</div></div>' },
    },
  },
  {
    id: 'anim-clip-reveal',
    label: 'Clip Path Reveal',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'clip', 'reveal', 'wipe'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Clip Reveal',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="clip-path:polygon(0 0,0 0,0 100%,0 100%);animation:clipReveal .8s cubic-bezier(.76,0,.24,1) forwards"><style>@keyframes clipReveal{to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}</style><div style="padding:1.25rem;background:linear-gradient(135deg,#2c1e14,#3d2b1a);border-radius:.5rem;color:#f6efe5;font-size:.875rem;text-align:center">Clip Path Reveal &mdash; wipe</div></div>' },
    },
  },
  {
    id: 'anim-rotate-in',
    label: 'Rotate In',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'rotate', 'spin'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Rotate In',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:rotate(-15deg) scale(.9);animation:rotateIn .7s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes rotateIn{to{opacity:1;transform:rotate(0) scale(1)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.875rem;text-align:center">Rotate In &mdash; 0.7s</div></div>' },
    },
  },
  {
    id: 'anim-bounce-in',
    label: 'Bounce In',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'bounce', 'elastic'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Bounce In',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:scale(.3);animation:bounceIn .8s cubic-bezier(.68,-.55,.265,1.55) forwards"><style>@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.95)}100%{opacity:1;transform:scale(1)}}</style><div style="padding:1.25rem;background:linear-gradient(135deg,#4a2711,#2c1e14);border-radius:.75rem;color:#c8a97e;font-size:.875rem;text-align:center;box-shadow:0 4px 24px rgba(20,12,8,.4)">Bounce In &mdash; elastic</div></div>' },
    },
  },
  {
    id: 'anim-flip-in-3d',
    label: 'Flip In 3D',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'flip', '3d', 'perspective'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Flip In 3D',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="perspective:800px"><div style="opacity:0;transform:rotateY(-90deg);animation:flipIn .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes flipIn{to{opacity:1;transform:rotateY(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.15);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Flip In 3D &mdash; 0.8s</div></div></div>' },
    },
  },
  {
    id: 'anim-elastic-spring',
    label: 'Elastic Spring',
    category: 'animations', subcategory: 'entrances',
    tags: ['animation', 'entrance', 'elastic', 'spring', 'overshoot'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Elastic Spring',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateY(60px) scale(.8);animation:elasticSpring 1s cubic-bezier(.175,.885,.32,1.275) forwards"><style>@keyframes elasticSpring{0%{opacity:0;transform:translateY(60px) scale(.8)}60%{opacity:1;transform:translateY(-8px) scale(1.02)}80%{transform:translateY(4px) scale(.99)}100%{opacity:1;transform:translateY(0) scale(1)}}</style><div style="padding:1.25rem;background:linear-gradient(135deg,rgba(200,169,126,.15),rgba(74,39,17,.12));border:1px solid rgba(200,169,126,.25);border-radius:.75rem;color:#f6efe5;font-size:.875rem;text-align:center">Elastic Spring &mdash; 1s</div></div>' },
    },
  },
]

// ─── TEXT EFFECTS ───

const TEXT_ANIMS: LibraryElementItem[] = [
  {
    id: 'anim-word-reveal',
    label: 'Word Reveal',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'word', 'reveal', 'stagger'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Word Reveal',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="display:flex;gap:.4em;flex-wrap:wrap;font-size:1.5rem;font-weight:600"><style>@keyframes wordIn{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}.wr{display:inline-block;overflow:hidden}.wr span{display:inline-block;animation:wordIn .5s cubic-bezier(.25,.46,.45,.94) forwards;opacity:0}</style><span class="wr"><span style="animation-delay:0s;color:#f6efe5">Words</span></span><span class="wr"><span style="animation-delay:.1s;color:#f6efe5">appear</span></span><span class="wr"><span style="animation-delay:.2s;color:#c8a97e">one</span></span><span class="wr"><span style="animation-delay:.3s;color:#c8a97e">by</span></span><span class="wr"><span style="animation-delay:.4s;color:#f6efe5">one</span></span></div>' },
    },
  },
  {
    id: 'anim-char-reveal',
    label: 'Char Reveal',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'char', 'letter', 'stagger'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Char Reveal',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="display:flex;font-size:1.75rem;font-weight:600"><style>@keyframes charIn{from{opacity:0;transform:translateY(20px) rotateX(90deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}.chr{animation:charIn .4s cubic-bezier(.25,.46,.45,.94) forwards;opacity:0;color:#f6efe5}</style><span class="chr" style="animation-delay:0s">C</span><span class="chr" style="animation-delay:.03s">h</span><span class="chr" style="animation-delay:.06s">a</span><span class="chr" style="animation-delay:.09s">r</span><span class="chr" style="animation-delay:.12s;color:#c8a97e">&nbsp;</span><span class="chr" style="animation-delay:.15s;color:#c8a97e">R</span><span class="chr" style="animation-delay:.18s;color:#c8a97e">e</span><span class="chr" style="animation-delay:.21s;color:#c8a97e">v</span><span class="chr" style="animation-delay:.24s;color:#c8a97e">e</span><span class="chr" style="animation-delay:.27s;color:#c8a97e">a</span><span class="chr" style="animation-delay:.3s;color:#c8a97e">l</span></div>' },
    },
  },
  {
    id: 'anim-typewriter',
    label: 'Typewriter',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'typewriter', 'cursor', 'typing'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Typewriter',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="font-family:monospace;font-size:1.25rem;color:#f6efe5;overflow:hidden;white-space:nowrap;border-right:2px solid #c8a97e;width:0;animation:typeW 2s steps(20,end) forwards,blink .7s step-end infinite"><style>@keyframes typeW{to{width:20ch}}@keyframes blink{50%{border-color:transparent}}</style>Typewriter effect...</div>' },
    },
  },
  {
    id: 'anim-scramble-text',
    label: 'Scramble Text',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'scramble', 'glitch', 'decode'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scramble Text',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="font-size:1.5rem;font-weight:600;color:#f6efe5;font-family:monospace"><style>@keyframes scramble1{0%,30%{content:"$#@!%"}40%{content:"Scram"}100%{content:"Scram"}}@keyframes scramble2{0%,40%{content:"&*!@#"}50%{content:"ble T"}100%{content:"ble T"}}@keyframes scramble3{0%,50%{content:"#@$!&"}60%{content:"ext"}100%{content:"ext"}}@keyframes scramFade{0%{opacity:.4}100%{opacity:1}}</style><span style="animation:scramFade 1.5s ease forwards"><span style="color:#c8a97e">Scramble</span> <span style="color:#f6efe5">Text</span></span><div style="font-size:.75rem;color:rgba(246,239,229,.4);margin-top:.25rem">Random chars decode effect</div></div>' },
    },
  },
  {
    id: 'anim-split-reveal',
    label: 'Split Reveal',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'split', 'reveal', 'apart'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Split Reveal',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="position:relative;overflow:hidden;text-align:center"><style>@keyframes splitTop{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes splitBot{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}</style><div style="font-size:1.5rem;font-weight:700;line-height:1.2"><span style="display:block;animation:splitTop .6s cubic-bezier(.25,.46,.45,.94) forwards;opacity:0;color:#f6efe5">SPLIT</span><span style="display:block;animation:splitBot .6s cubic-bezier(.25,.46,.45,.94) .15s forwards;opacity:0;color:#c8a97e">REVEAL</span></div></div>' },
    },
  },
  {
    id: 'anim-highlight-sweep',
    label: 'Highlight Sweep',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'highlight', 'sweep', 'underline'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Highlight Sweep',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="font-size:1.5rem;font-weight:600;color:#f6efe5;text-align:center"><style>@keyframes hlSweep{from{background-size:0 40%}to{background-size:100% 40%}}</style><span style="background:linear-gradient(transparent 60%,rgba(200,169,126,.35) 60%);background-repeat:no-repeat;background-position:left bottom;background-size:0 40%;animation:hlSweep .8s cubic-bezier(.25,.46,.45,.94) .3s forwards;padding:0 .2em">Highlight Sweep</span></div>' },
    },
  },
  {
    id: 'anim-counter-text',
    label: 'Counter',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'counter', 'number', 'increment'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Counter',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="text-align:center;padding:1rem"><style>@property --num{syntax:"<integer>";initial-value:0;inherits:false}@keyframes countUp{to{--num:500}}.ctr{animation:countUp 2s cubic-bezier(.25,.46,.45,.94) forwards;counter-reset:num var(--num);font-size:3rem;font-weight:700;color:#f6efe5;line-height:1}.ctr::after{content:counter(num) "+"}</style><div class="ctr"></div><div style="font-size:.75rem;color:#c8a97e;text-transform:uppercase;letter-spacing:.1em;margin-top:.25rem">Projects Delivered</div></div>' },
    },
  },
  {
    id: 'anim-gradient-text',
    label: 'Gradient Text',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'gradient', 'color', 'shifting'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Text',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="text-align:center"><style>@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}</style><span style="font-size:2rem;font-weight:700;background:linear-gradient(90deg,#f6efe5,#c8a97e,#4a2711,#c8a97e,#f6efe5);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 3s linear infinite">Gradient Text</span></div>' },
    },
  },
  {
    id: 'anim-blur-reveal-text',
    label: 'Blur Reveal Text',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'blur', 'reveal', 'focus'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Blur Reveal',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="text-align:center"><style>@keyframes blurReveal{from{filter:blur(10px);opacity:0;transform:scale(1.1)}to{filter:blur(0);opacity:1;transform:scale(1)}}</style><span style="font-size:2rem;font-weight:700;color:#f6efe5;animation:blurReveal .8s cubic-bezier(.25,.46,.45,.94) forwards;opacity:0;display:inline-block">Blur Reveal</span></div>' },
    },
  },
  {
    id: 'anim-kinetic-text',
    label: 'Kinetic Typography',
    category: 'animations', subcategory: 'text',
    tags: ['animation', 'text', 'kinetic', 'motion', 'bounce'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Kinetic Type',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="display:flex;justify-content:center;gap:.15em;font-size:2rem;font-weight:700"><style>@keyframes kinBounce{0%,100%{transform:translateY(0)}25%{transform:translateY(-15px)}50%{transform:translateY(0)}}.kn{display:inline-block;color:#f6efe5;animation:kinBounce 1.5s ease-in-out infinite}.kn:nth-child(2){animation-delay:.1s}.kn:nth-child(3){animation-delay:.2s}.kn:nth-child(4){animation-delay:.3s}.kn:nth-child(5){animation-delay:.4s;color:#c8a97e}.kn:nth-child(6){animation-delay:.5s;color:#c8a97e}.kn:nth-child(7){animation-delay:.6s;color:#c8a97e}</style><span class="kn">K</span><span class="kn">i</span><span class="kn">n</span><span class="kn">e</span><span class="kn">t</span><span class="kn">i</span><span class="kn">c</span></div>' },
    },
  },
]

// ─── IMAGE / HOVER EFFECTS ───

const IMAGE_HOVERS: LibraryElementItem[] = [
  {
    id: 'anim-parallax-layers',
    label: 'Parallax Layers',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'parallax', 'layers'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Parallax Layers',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="position:relative;width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer" onmouseover="this.children[0].style.transform=\'translateY(-10px)\';this.children[1].style.transform=\'translateY(-5px)\'" onmouseout="this.children[0].style.transform=\'translateY(0)\';this.children[1].style.transform=\'translateY(0)\'"><div style="position:absolute;inset:0;background:linear-gradient(135deg,#2c1e14,#3d2b1a);transition:transform .6s cubic-bezier(.25,.46,.45,.94)"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .6s cubic-bezier(.25,.46,.45,.94)"><span style="color:#c8a97e;font-size:.875rem;font-weight:500;background:rgba(20,12,8,.6);padding:.5rem 1rem;border-radius:.5rem;backdrop-filter:blur(10px)">Parallax Layers</span></div></div>' },
    },
  },
  {
    id: 'anim-zoom-hover',
    label: 'Zoom on Hover',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'zoom', 'scale'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Zoom Hover',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer" onmouseover="this.children[0].style.transform=\'scale(1.1)\'" onmouseout="this.children[0].style.transform=\'scale(1)\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033);transition:transform .6s cubic-bezier(.25,.46,.45,.94);display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Hover to Zoom &mdash; 1.1x</span></div></div>' },
    },
  },
  {
    id: 'anim-clip-reveal-image',
    label: 'Clip Reveal Image',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'clip', 'reveal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Clip Image',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer;position:relative" onmouseover="this.children[1].style.clipPath=\'inset(0 0 0 0)\'" onmouseout="this.children[1].style.clipPath=\'inset(0 100% 0 0)\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#2c1e14,#1a120b);display:flex;align-items:center;justify-content:center"><span style="color:rgba(200,169,126,.4);font-size:.875rem">Before</span></div><div style="position:absolute;inset:0;background:linear-gradient(135deg,#4a2711,#c8a97e);clip-path:inset(0 100% 0 0);transition:clip-path .6s cubic-bezier(.76,0,.24,1);display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:600">Revealed</span></div></div>' },
    },
  },
  {
    id: 'anim-tilt-3d',
    label: 'Tilt 3D on Hover',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'tilt', '3d', 'perspective'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Tilt 3D',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="perspective:600px;width:100%;height:140px"><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033);border-radius:.75rem;transition:transform .4s cubic-bezier(.25,.46,.45,.94);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(20,12,8,.3)" onmouseover="this.style.transform=\'rotateY(8deg) rotateX(4deg) scale(1.02)\'" onmouseout="this.style.transform=\'rotateY(0) rotateX(0) scale(1)\'"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Tilt 3D &mdash; hover me</span></div></div>' },
    },
  },
  {
    id: 'anim-grayscale-color',
    label: 'Grayscale to Color',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'grayscale', 'color'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Grayscale Color',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer" onmouseover="this.children[0].style.filter=\'grayscale(0)\'" onmouseout="this.children[0].style.filter=\'grayscale(1)\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#c8a97e,#4a2711,#2c1e14);filter:grayscale(1);transition:filter .6s cubic-bezier(.25,.46,.45,.94);display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">Grayscale to Color</span></div></div>' },
    },
  },
  {
    id: 'anim-color-overlay',
    label: 'Color Overlay Hover',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'overlay', 'color'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Color Overlay',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer;position:relative" onmouseover="this.children[1].style.opacity=\'1\'" onmouseout="this.children[1].style.opacity=\'0\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033);display:flex;align-items:center;justify-content:center"><span style="color:rgba(200,169,126,.5);font-size:.875rem">Image Area</span></div><div style="position:absolute;inset:0;background:rgba(74,39,17,.7);opacity:0;transition:opacity .4s ease;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)"><span style="color:#f6efe5;font-size:.875rem;font-weight:600">Overlay Active</span></div></div>' },
    },
  },
  {
    id: 'anim-ken-burns',
    label: 'Ken Burns',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'image', 'ken-burns', 'cinematic', 'zoom', 'loop'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Ken Burns',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem"><style>@keyframes kenBurns{0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.12) translate(-2%,-1%)}100%{transform:scale(1) translate(0,0)}}</style><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033,#2c1e14);animation:kenBurns 8s ease-in-out infinite;display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Ken Burns &mdash; cinematic</span></div></div>' },
    },
  },
  {
    id: 'anim-image-blur-scroll',
    label: 'Image Blur Effect',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'image', 'blur', 'scroll', 'focus'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Blur',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;cursor:pointer" onmouseover="this.children[0].style.filter=\'blur(0)\'" onmouseout="this.children[0].style.filter=\'blur(4px)\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#4a2711,#c8a97e);filter:blur(4px);transition:filter .6s cubic-bezier(.25,.46,.45,.94);display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">Hover to Focus</span></div></div>' },
    },
  },
  {
    id: 'anim-image-slide-reveal',
    label: 'Image Slide Reveal',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'image', 'slide', 'reveal', 'entrance'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Slide',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;position:relative"><style>@keyframes imgSlide{from{transform:translateX(-100%)}to{transform:translateX(0)}}</style><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033);animation:imgSlide .8s cubic-bezier(.76,0,.24,1) forwards;display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Slide Reveal</span></div></div>' },
    },
  },
  {
    id: 'anim-shine-glare',
    label: 'Shine Glare Sweep',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'image', 'shine', 'glare', 'sweep'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Shine Glare',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem;position:relative;cursor:pointer" onmouseover="this.children[1].style.transform=\'translateX(100%)\'" onmouseout="this.children[1].style.transform=\'translateX(-100%)\'"><div style="width:100%;height:100%;background:linear-gradient(135deg,#3a2a1a,#5c4033);display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Hover for Shine</span></div><div style="position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(246,239,229,.15) 45%,rgba(246,239,229,.3) 50%,rgba(246,239,229,.15) 55%,transparent 60%);transform:translateX(-100%);transition:transform .6s cubic-bezier(.25,.46,.45,.94)"></div></div>' },
    },
  },
]

// ─── HOVER EFFECTS (UI) ───

const HOVERS: LibraryElementItem[] = [
  {
    id: 'anim-hover-magnetic',
    label: 'Magnetic Hover',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'magnetic', 'follow', 'cursor'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Magnetic',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:100px"><div style="padding:1rem 2rem;background:linear-gradient(135deg,#4a2711,#2c1e14);border-radius:.75rem;color:#c8a97e;font-size:.875rem;font-weight:500;cursor:pointer;transition:transform .3s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 24px rgba(20,12,8,.4)" onmouseover="this.style.transform=\'translate(4px,-4px)\'" onmouseout="this.style.transform=\'translate(0,0)\'">Magnetic Hover</div></div>' },
    },
  },
  {
    id: 'anim-hover-lift-shadow',
    label: 'Lift + Shadow',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'lift', 'shadow', 'elevation', 'card'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Lift Shadow',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="padding:1.5rem;background:rgba(74,39,17,.1);border:1px solid rgba(200,169,126,.15);border-radius:.75rem;color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer;transition:all .4s cubic-bezier(.25,.46,.45,.94);box-shadow:0 2px 8px rgba(20,12,8,.2)" onmouseover="this.style.transform=\'translateY(-6px)\';this.style.boxShadow=\'0 20px 60px rgba(20,12,8,.4)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'0 2px 8px rgba(20,12,8,.2)\'">Lift + Shadow</div>' },
    },
  },
  {
    id: 'anim-hover-border-draw',
    label: 'Border Draw',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'border', 'draw', 'outline'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Border Draw',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="position:relative;display:flex;align-items:center;justify-content:center;height:100px"><div style="position:relative;padding:1rem 2rem;color:#f6efe5;font-size:.875rem;cursor:pointer;overflow:hidden" onmouseover="this.children[0].style.transform=\'scaleX(1)\';this.children[1].style.transform=\'scaleY(1)\';this.children[2].style.transform=\'scaleX(1)\';this.children[3].style.transform=\'scaleY(1)\'" onmouseout="this.children[0].style.transform=\'scaleX(0)\';this.children[1].style.transform=\'scaleY(0)\';this.children[2].style.transform=\'scaleX(0)\';this.children[3].style.transform=\'scaleY(0)\'"><span style="position:absolute;top:0;left:0;width:100%;height:1px;background:#c8a97e;transform:scaleX(0);transform-origin:left;transition:transform .3s ease"></span><span style="position:absolute;top:0;right:0;width:1px;height:100%;background:#c8a97e;transform:scaleY(0);transform-origin:top;transition:transform .3s ease .1s"></span><span style="position:absolute;bottom:0;right:0;width:100%;height:1px;background:#c8a97e;transform:scaleX(0);transform-origin:right;transition:transform .3s ease .2s"></span><span style="position:absolute;bottom:0;left:0;width:1px;height:100%;background:#c8a97e;transform:scaleY(0);transform-origin:bottom;transition:transform .3s ease .3s"></span>Border Draw</div></div>' },
    },
  },
  {
    id: 'anim-hover-fill-bottom',
    label: 'Fill from Bottom',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'fill', 'bottom', 'background', 'button'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fill Bottom',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:80px"><div style="position:relative;padding:.75rem 2rem;border:1px solid #c8a97e;border-radius:.5rem;color:#c8a97e;font-size:.875rem;font-weight:500;cursor:pointer;overflow:hidden;z-index:0" onmouseover="this.children[0].style.transform=\'translateY(0)\';this.style.color=\'#140c08\'" onmouseout="this.children[0].style.transform=\'translateY(100%)\';this.style.color=\'#c8a97e\'"><span style="position:absolute;inset:0;background:#c8a97e;transform:translateY(100%);transition:transform .4s cubic-bezier(.25,.46,.45,.94);z-index:-1"></span>Fill from Bottom</div></div>' },
    },
  },
  {
    id: 'anim-hover-color-sweep',
    label: 'Color Sweep',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'color', 'sweep', 'slide', 'button'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Color Sweep',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:80px"><div style="position:relative;padding:.75rem 2rem;background:#140c08;border:1px solid rgba(200,169,126,.3);border-radius:.5rem;color:#f6efe5;font-size:.875rem;font-weight:500;cursor:pointer;overflow:hidden;z-index:0" onmouseover="this.children[0].style.transform=\'translateX(0)\';this.style.color=\'#140c08\'" onmouseout="this.children[0].style.transform=\'translateX(-101%)\';this.style.color=\'#f6efe5\'"><span style="position:absolute;inset:0;background:linear-gradient(90deg,#c8a97e,#f6efe5);transform:translateX(-101%);transition:transform .5s cubic-bezier(.76,0,.24,1);z-index:-1"></span>Color Sweep</div></div>' },
    },
  },
  {
    id: 'anim-hover-glow-pulse',
    label: 'Glow Pulse',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'glow', 'pulse', 'shadow', 'neon'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glow Pulse',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:100px"><style>@keyframes glowP{0%,100%{box-shadow:0 0 15px rgba(200,169,126,.3)}50%{box-shadow:0 0 30px rgba(200,169,126,.5),0 0 60px rgba(200,169,126,.15)}}.gp-active{animation:glowP 1.5s ease-in-out infinite !important}</style><div style="padding:1rem 2rem;background:rgba(74,39,17,.15);border:1px solid rgba(200,169,126,.3);border-radius:.75rem;color:#c8a97e;font-size:.875rem;font-weight:500;cursor:pointer;transition:all .3s ease" onmouseover="this.classList.add(\'gp-active\')" onmouseout="this.classList.remove(\'gp-active\');this.style.boxShadow=\'none\'">Glow Pulse</div></div>' },
    },
  },
  {
    id: 'anim-hover-scale-rotate',
    label: 'Scale + Rotate',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'scale', 'rotate', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scale Rotate',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:100px"><div style="padding:1rem 2rem;background:linear-gradient(135deg,#4a2711,#2c1e14);border-radius:.75rem;color:#c8a97e;font-size:.875rem;font-weight:500;cursor:pointer;transition:transform .4s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 24px rgba(20,12,8,.3)" onmouseover="this.style.transform=\'scale(1.05) rotate(2deg)\'" onmouseout="this.style.transform=\'scale(1) rotate(0)\'">Scale + Rotate</div></div>' },
    },
  },
  {
    id: 'anim-hover-underline-slide',
    label: 'Underline Slide',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'underline', 'slide', 'link', 'text'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Underline Slide',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:60px"><div style="position:relative;padding:.25rem 0;color:#f6efe5;font-size:1rem;font-weight:500;cursor:pointer" onmouseover="this.children[0].style.transform=\'scaleX(1)\'" onmouseout="this.children[0].style.transform=\'scaleX(0)\'"><span style="position:absolute;bottom:0;left:0;width:100%;height:2px;background:#c8a97e;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.76,0,.24,1)"></span>Underline Slide</div></div>' },
    },
  },
  {
    id: 'anim-hover-bg-shift',
    label: 'Background Shift',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'background', 'shift', 'gradient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'BG Shift',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="padding:1.5rem;background:linear-gradient(135deg,#140c08,#4a2711,#140c08);background-size:200% 200%;background-position:0% 50%;border-radius:.75rem;color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer;transition:background-position .6s cubic-bezier(.25,.46,.45,.94)" onmouseover="this.style.backgroundPosition=\'100% 50%\'" onmouseout="this.style.backgroundPosition=\'0% 50%\'">Background Shift</div>' },
    },
  },
  {
    id: 'anim-hover-ripple',
    label: 'Ripple Effect',
    category: 'animations', subcategory: 'hovers',
    tags: ['animation', 'hover', 'ripple', 'click', 'material'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Ripple',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;height:80px"><style>@keyframes rippleOut{from{transform:scale(0);opacity:.5}to{transform:scale(4);opacity:0}}</style><div style="position:relative;padding:.75rem 2rem;background:linear-gradient(135deg,#4a2711,#2c1e14);border-radius:.5rem;color:#c8a97e;font-size:.875rem;font-weight:500;cursor:pointer;overflow:hidden" onmouseover="var r=document.createElement(\'span\');r.style.cssText=\'position:absolute;top:50%;left:50%;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;background:rgba(200,169,126,.3);animation:rippleOut .6s ease forwards;pointer-events:none\';this.appendChild(r);setTimeout(function(){r.remove()},600)">Ripple Effect</div></div>' },
    },
  },
]

// ─── SCROLL EFFECTS ───

const SCROLL: LibraryElementItem[] = [
  {
    id: 'anim-scroll-reveal',
    label: 'Scroll Reveal',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'reveal', 'fade', 'intersection'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Reveal',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="opacity:0;transform:translateY(30px);animation:scrReveal .8s cubic-bezier(.25,.46,.45,.94) forwards"><style>@keyframes scrReveal{to{opacity:1;transform:translateY(0)}}</style><div style="padding:1.25rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;text-align:center">Scroll Reveal &mdash; fade up on enter</div></div>' },
    },
  },
  {
    id: 'anim-parallax-bg',
    label: 'Parallax Background',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'parallax', 'background', 'fixed'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Parallax BG',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;background:linear-gradient(135deg,#2c1e14 0%,#3d2b1a 50%,#1a120b 100%);background-attachment:fixed;border-radius:.75rem;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem"><span style="color:#f6efe5;font-size:1.125rem;font-weight:600">Parallax Background</span><span style="color:rgba(200,169,126,.6);font-size:.75rem">background-attachment: fixed</span></div>' },
    },
  },
  {
    id: 'anim-scroll-counter',
    label: 'Animated Counter',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'counter', 'number', 'stats'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Counter',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="text-align:center;padding:1.5rem"><style>@property --cnt{syntax:"<integer>";initial-value:0;inherits:false}@keyframes cntUp{to{--cnt:1250}}.scnt{animation:cntUp 2.5s cubic-bezier(.25,.46,.45,.94) forwards;counter-reset:cnt var(--cnt);font-size:2.5rem;font-weight:700;color:#c8a97e;line-height:1}.scnt::after{content:counter(cnt)}</style><div class="scnt"></div><div style="font-size:.75rem;color:rgba(246,239,229,.4);text-transform:uppercase;letter-spacing:.1em;margin-top:.25rem">Active Users</div></div>' },
    },
  },
  {
    id: 'anim-progress-bar',
    label: 'Progress Bar',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'progress', 'bar', 'fill', 'loading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Progress Bar',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="padding:1rem"><style>@keyframes progFill{from{width:0}to{width:78%}}</style><div style="display:flex;justify-content:space-between;margin-bottom:.375rem"><span style="font-size:.75rem;font-weight:500;color:#f6efe5">Design Skills</span><span style="font-size:.75rem;color:#c8a97e">78%</span></div><div style="width:100%;height:6px;background:rgba(200,169,126,.12);border-radius:3px;overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,#4a2711,#c8a97e);border-radius:3px;animation:progFill 1.5s cubic-bezier(.25,.46,.45,.94) forwards"></div></div></div>' },
    },
  },
  {
    id: 'anim-zoom-out-scroll',
    label: 'Zoom Out on Scroll',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'zoom', 'out', 'shrink'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Zoom Out',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;overflow:hidden;border-radius:.75rem"><style>@keyframes zoomOut{from{transform:scale(1.3)}to{transform:scale(1)}}</style><div style="width:100%;height:100%;background:linear-gradient(135deg,#4a2711,#2c1e14);animation:zoomOut 1.5s cubic-bezier(.25,.46,.45,.94) forwards;display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Zoom Out on Scroll</span></div></div>' },
    },
  },
  {
    id: 'anim-horizontal-scroll',
    label: 'Horizontal Scroll Hint',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'horizontal', 'hint', 'marquee'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Horizontal Scroll',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="overflow:hidden;padding:1rem 0"><style>@keyframes hScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style><div style="display:flex;gap:1rem;animation:hScroll 10s linear infinite;width:max-content"><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#f6efe5;font-size:.8125rem;white-space:nowrap">Section One</div><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#f6efe5;font-size:.8125rem;white-space:nowrap">Section Two</div><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#c8a97e;font-size:.8125rem;white-space:nowrap">Section Three</div><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#f6efe5;font-size:.8125rem;white-space:nowrap">Section One</div><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#f6efe5;font-size:.8125rem;white-space:nowrap">Section Two</div><div style="padding:.75rem 1.5rem;background:rgba(200,169,126,.1);border:1px solid rgba(200,169,126,.2);border-radius:.5rem;color:#c8a97e;font-size:.8125rem;white-space:nowrap">Section Three</div></div></div>' },
    },
  },
  {
    id: 'anim-pin-reveal',
    label: 'Pin + Reveal Hint',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'pin', 'reveal', 'sticky'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pin Reveal',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="padding:1.5rem;background:rgba(74,39,17,.1);border:1px solid rgba(200,169,126,.15);border-radius:.75rem;text-align:center"><style>@keyframes pinPulse{0%,100%{opacity:.5}50%{opacity:1}}</style><div style="font-size:1rem;font-weight:600;color:#f6efe5;margin-bottom:.25rem">Pin + Reveal</div><div style="font-size:.75rem;color:rgba(200,169,126,.6);animation:pinPulse 2s ease-in-out infinite">Sticky section with content reveal on scroll</div><div style="display:flex;gap:.5rem;justify-content:center;margin-top:.75rem"><div style="width:8px;height:8px;border-radius:50%;background:#c8a97e"></div><div style="width:8px;height:8px;border-radius:50%;background:rgba(200,169,126,.3)"></div><div style="width:8px;height:8px;border-radius:50%;background:rgba(200,169,126,.3)"></div></div></div>' },
    },
  },
  {
    id: 'anim-fade-between',
    label: 'Fade Between Sections',
    category: 'animations', subcategory: 'scroll',
    tags: ['animation', 'scroll', 'fade', 'transition', 'sections'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fade Between',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="position:relative;width:100%;height:120px;border-radius:.75rem;overflow:hidden"><style>@keyframes fadeBtw{0%,40%{opacity:1}50%,90%{opacity:0}100%{opacity:1}}</style><div style="position:absolute;inset:0;background:linear-gradient(135deg,#4a2711,#2c1e14);display:flex;align-items:center;justify-content:center;animation:fadeBtw 4s ease-in-out infinite"><span style="color:#c8a97e;font-size:.875rem;font-weight:500">Section A</span></div><div style="position:absolute;inset:0;background:linear-gradient(135deg,#2c1e14,#140c08);display:flex;align-items:center;justify-content:center;animation:fadeBtw 4s ease-in-out 2s infinite"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">Section B</span></div></div>' },
    },
  },
]

// ─── BACKGROUND / LOOP EFFECTS ───

const LOOPS: LibraryElementItem[] = [
  {
    id: 'anim-floating-particles',
    label: 'Floating Particles',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'particles', 'floating', 'dots', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Particles',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="position:relative;width:100%;height:160px;background:#140c08;border-radius:.75rem;overflow:hidden"><style>@keyframes ptcl1{0%{transform:translate(0,0)}25%{transform:translate(30px,-20px)}50%{transform:translate(-10px,-40px)}75%{transform:translate(20px,-10px)}100%{transform:translate(0,0)}}@keyframes ptcl2{0%{transform:translate(0,0)}25%{transform:translate(-20px,15px)}50%{transform:translate(25px,30px)}75%{transform:translate(-15px,10px)}100%{transform:translate(0,0)}}@keyframes ptcl3{0%{transform:translate(0,0)}33%{transform:translate(15px,-25px)}66%{transform:translate(-20px,15px)}100%{transform:translate(0,0)}}.ptcl{position:absolute;border-radius:50%;opacity:.6}</style><div class="ptcl" style="width:4px;height:4px;background:#c8a97e;top:20%;left:15%;animation:ptcl1 6s ease-in-out infinite"></div><div class="ptcl" style="width:3px;height:3px;background:#f6efe5;top:40%;left:70%;animation:ptcl2 8s ease-in-out infinite"></div><div class="ptcl" style="width:5px;height:5px;background:#c8a97e;top:70%;left:40%;animation:ptcl3 7s ease-in-out infinite;opacity:.4"></div><div class="ptcl" style="width:3px;height:3px;background:#f6efe5;top:30%;left:85%;animation:ptcl1 9s ease-in-out infinite;opacity:.3"></div><div class="ptcl" style="width:4px;height:4px;background:#c8a97e;top:80%;left:20%;animation:ptcl2 5s ease-in-out infinite;opacity:.5"></div><div class="ptcl" style="width:2px;height:2px;background:#f6efe5;top:15%;left:55%;animation:ptcl3 10s ease-in-out infinite;opacity:.35"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500;background:rgba(20,12,8,.6);padding:.5rem 1rem;border-radius:.5rem;backdrop-filter:blur(10px)">Floating Particles</span></div></div>' },
    },
  },
  {
    id: 'anim-gradient-mesh',
    label: 'Animated Gradient Mesh',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'gradient', 'mesh', 'background', 'ambient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Mesh',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative"><style>@keyframes meshMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}</style><div style="width:100%;height:100%;background:linear-gradient(135deg,#140c08,#4a2711,#2c1e14,#c8a97e,#140c08);background-size:400% 400%;animation:meshMove 8s ease infinite;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500;background:rgba(20,12,8,.5);padding:.5rem 1rem;border-radius:.5rem;backdrop-filter:blur(10px)">Gradient Mesh</span></div></div>' },
    },
  },
  {
    id: 'anim-noise-grain',
    label: 'Noise Texture',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'noise', 'grain', 'texture', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Noise Grain',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative;background:#140c08"><style>@keyframes noiseShift{0%{transform:translate(0,0)}10%{transform:translate(-5%,-5%)}20%{transform:translate(-10%,5%)}30%{transform:translate(5%,-10%)}40%{transform:translate(-5%,15%)}50%{transform:translate(-10%,5%)}60%{transform:translate(15%,0)}70%{transform:translate(0,10%)}80%{transform:translate(-15%,0)}90%{transform:translate(10%,5%)}100%{transform:translate(5%,0)}}</style><div style="position:absolute;inset:-50%;background-image:url(\'data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E\');opacity:.08;animation:noiseShift .5s steps(10) infinite"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="color:#c8a97e;font-size:.875rem;font-weight:500;background:rgba(20,12,8,.5);padding:.5rem 1rem;border-radius:.5rem;backdrop-filter:blur(10px)">Noise Texture</span></div></div>' },
    },
  },
  {
    id: 'anim-svg-waves',
    label: 'SVG Waves',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'waves', 'svg', 'fluid', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'SVG Waves',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative;background:linear-gradient(180deg,#140c08,#2c1e14)"><style>@keyframes waveMove{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style><div style="position:absolute;bottom:0;width:200%;height:60px;animation:waveMove 4s linear infinite"><svg viewBox="0 0 1200 60" style="width:50%;height:100%;float:left" preserveAspectRatio="none"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="rgba(200,169,126,.15)"/><path d="M0 35 Q150 10 300 35 T600 35 T900 35 T1200 35 V60 H0Z" fill="rgba(200,169,126,.08)"/></svg><svg viewBox="0 0 1200 60" style="width:50%;height:100%;float:left" preserveAspectRatio="none"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="rgba(200,169,126,.15)"/><path d="M0 35 Q150 10 300 35 T600 35 T900 35 T1200 35 V60 H0Z" fill="rgba(200,169,126,.08)"/></svg></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">SVG Waves</span></div></div>' },
    },
  },
  {
    id: 'anim-aurora-glow',
    label: 'Aurora Glow',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'aurora', 'glow', 'ambient', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Aurora Glow',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative;background:#140c08"><style>@keyframes auroraA{0%,100%{transform:translate(-30%,-30%) rotate(0deg)}50%{transform:translate(20%,10%) rotate(180deg)}}@keyframes auroraB{0%,100%{transform:translate(30%,30%) rotate(180deg)}50%{transform:translate(-20%,-10%) rotate(0deg)}}</style><div style="position:absolute;width:200px;height:200px;background:radial-gradient(circle,rgba(200,169,126,.25),transparent 70%);filter:blur(40px);animation:auroraA 6s ease-in-out infinite;top:50%;left:50%"></div><div style="position:absolute;width:180px;height:180px;background:radial-gradient(circle,rgba(74,39,17,.3),transparent 70%);filter:blur(40px);animation:auroraB 8s ease-in-out infinite;top:50%;left:50%"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500;background:rgba(20,12,8,.4);padding:.5rem 1rem;border-radius:.5rem;backdrop-filter:blur(8px)">Aurora Glow</span></div></div>' },
    },
  },
  {
    id: 'anim-grid-pulse',
    label: 'Grid Pulse',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'grid', 'pulse', 'dots', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Grid Pulse',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative;background:#140c08"><style>@keyframes dotPulse{0%,100%{opacity:.15}50%{opacity:.5}}.gdot{position:absolute;width:3px;height:3px;border-radius:50%;background:#c8a97e}</style><div class="gdot" style="top:20%;left:20%;animation:dotPulse 2s ease-in-out infinite"></div><div class="gdot" style="top:20%;left:40%;animation:dotPulse 2s ease-in-out .3s infinite"></div><div class="gdot" style="top:20%;left:60%;animation:dotPulse 2s ease-in-out .6s infinite"></div><div class="gdot" style="top:20%;left:80%;animation:dotPulse 2s ease-in-out .9s infinite"></div><div class="gdot" style="top:50%;left:20%;animation:dotPulse 2s ease-in-out .2s infinite"></div><div class="gdot" style="top:50%;left:40%;animation:dotPulse 2s ease-in-out .5s infinite"></div><div class="gdot" style="top:50%;left:60%;animation:dotPulse 2s ease-in-out .8s infinite"></div><div class="gdot" style="top:50%;left:80%;animation:dotPulse 2s ease-in-out 1.1s infinite"></div><div class="gdot" style="top:80%;left:20%;animation:dotPulse 2s ease-in-out .4s infinite"></div><div class="gdot" style="top:80%;left:40%;animation:dotPulse 2s ease-in-out .7s infinite"></div><div class="gdot" style="top:80%;left:60%;animation:dotPulse 2s ease-in-out 1s infinite"></div><div class="gdot" style="top:80%;left:80%;animation:dotPulse 2s ease-in-out 1.3s infinite"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">Grid Pulse</span></div></div>' },
    },
  },
  {
    id: 'anim-blob-morph',
    label: 'Blob Morphing',
    category: 'animations', subcategory: 'loops',
    tags: ['animation', 'loop', 'blob', 'morph', 'organic', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Blob Morph',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative;background:#140c08;display:flex;align-items:center;justify-content:center"><style>@keyframes blobMorph{0%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60% / 30% 50% 70% 50%}75%{border-radius:60% 40% 60% 30% / 70% 30% 50% 60%}100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%}}</style><div style="width:100px;height:100px;background:linear-gradient(135deg,#c8a97e,#4a2711);animation:blobMorph 6s ease-in-out infinite;box-shadow:0 0 40px rgba(200,169,126,.2);display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.75rem;font-weight:500">Blob</span></div></div>' },
    },
  },
]

// ─── EXPORT ───

export const LIBRARY_ANIMATIONS: LibraryElementItem[] = [
  ...ENTRANCES,
  ...TEXT_ANIMS,
  ...IMAGE_HOVERS,
  ...HOVERS,
  ...SCROLL,
  ...LOOPS,
]
