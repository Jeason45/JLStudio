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
  {
    id: 'hover-scan-e533d164a9ca',
    label: 'Hover transform + backgroundColor',
    category: 'animations', subcategory: 'hovers',
    tags: ['hover', 'transform', 'backgroundColor'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover transform + backgroundColor',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="transform:none;background-color:rgb(222, 199, 166);transition:transform, backgroundColor 0.3s ease;padding:1.25rem;border-radius:.75rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer" onmouseover="Object.assign(this.style,{\'transform\':\'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -3, 0.01, 1)\',\'background-color\':\'rgb(192, 155, 107)\'})" onmouseout="Object.assign(this.style,{\'transform\':\'none\',\'background-color\':\'rgb(222, 199, 166)\'})">Hover Effect &mdash; transform + backgroundColor</div>' },
    },
  },
  {
    id: 'hover-scan-93868c68c12e',
    label: 'Hover color + borderColor',
    category: 'animations', subcategory: 'hovers',
    tags: ['hover', 'color', 'borderColor'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover color + borderColor',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="color:rgb(51, 51, 51);border-color:rgb(51, 51, 51);transition:color, borderColor 0.3s ease;padding:1.25rem;border-radius:.75rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer" onmouseover="Object.assign(this.style,{\'color\':\'rgb(18, 18, 18)\',\'border-color\':\'rgb(18, 18, 18)\'})" onmouseout="Object.assign(this.style,{\'color\':\'rgb(51, 51, 51)\',\'border-color\':\'rgb(51, 51, 51)\'})">Hover Effect &mdash; color + borderColor</div>' },
    },
  },
  {
    id: 'hover-scan-9eb9eaf2e1cd',
    label: 'Hover transform + color + borderColor',
    category: 'animations', subcategory: 'hovers',
    tags: ['hover', 'transform', 'color', 'borderColor'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover transform + color + borderColor',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="transform:matrix(1, 0, 0, 1, 0, 0);color:rgb(255, 255, 255);border-color:rgb(255, 255, 255);transition:transform, color, borderColor 0.3s ease;padding:1.25rem;border-radius:.75rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer" onmouseover="Object.assign(this.style,{\'transform\':\'matrix(-1, 0, 0, -1, 0, 0)\',\'color\':\'rgb(222, 199, 166)\',\'border-color\':\'rgb(222, 199, 166)\'})" onmouseout="Object.assign(this.style,{\'transform\':\'matrix(1, 0, 0, 1, 0, 0)\',\'color\':\'rgb(255, 255, 255)\',\'border-color\':\'rgb(255, 255, 255)\'})">Hover Effect &mdash; transform + color + borderColor</div>' },
    },
  },
  {
    id: 'hover-scan-83dc4850240d',
    label: 'Hover opacity',
    category: 'animations', subcategory: 'hovers',
    tags: ['hover', 'opacity'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover opacity',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: "<style>.hoverscan83dc4850240d{opacity:1;transition:opacity 0.3s ease;padding:1.25rem;border-radius:.75rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer}.hoverscan83dc4850240d:hover{opacity:0.9}</style><div class=\"hoverscan83dc4850240d\">Hover Effect &mdash; opacity</div>" },
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

// ─── MARQUEE & CAROUSEL ───

const MARQUEES: LibraryElementItem[] = [
  {
    id: 'anim-marquee-left',
    label: 'Marquee Left (Infinite)',
    category: 'animations', subcategory: 'marquees',
    tags: ['animation', 'marquee', 'scroll', 'infinite', 'loop', 'left', 'testimonials'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Marquee Left',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;overflow:hidden;border-radius:.75rem;background:#140c08;padding:1rem 0"><style>@keyframes mqLeft{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.mq-track{display:flex;gap:1rem;width:max-content;animation:mqLeft 20s linear infinite}.mq-track:hover{animation-play-state:paused}</style><div class="mq-track"><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 1 — Avis client</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 2 — Témoignage</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 3 — Retour client</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 1 — Avis client</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 2 — Témoignage</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">⭐ Card 3 — Retour client</div></div></div>' },
    },
  },
  {
    id: 'anim-marquee-right',
    label: 'Marquee Right (Infinite)',
    category: 'animations', subcategory: 'marquees',
    tags: ['animation', 'marquee', 'scroll', 'infinite', 'loop', 'right'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Marquee Right',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;overflow:hidden;border-radius:.75rem;background:#140c08;padding:1rem 0"><style>@keyframes mqRight{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}.mq-track-r{display:flex;gap:1rem;width:max-content;animation:mqRight 20s linear infinite}.mq-track-r:hover{animation-play-state:paused}</style><div class="mq-track-r"><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 1</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 2</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 3</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 1</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 2</div><div style="flex-shrink:0;padding:1rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap">Logo 3</div></div></div>' },
    },
  },
  {
    id: 'anim-marquee-dual',
    label: 'Marquee Double Sens',
    category: 'animations', subcategory: 'marquees',
    tags: ['animation', 'marquee', 'dual', 'bidirectional', 'testimonials', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Marquee Dual',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;overflow:hidden;border-radius:.75rem;background:#140c08;padding:1.5rem 0;display:flex;flex-direction:column;gap:.75rem"><style>@keyframes mqL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes mqR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}.mq-l{display:flex;gap:.75rem;width:max-content;animation:mqL 25s linear infinite}.mq-r{display:flex;gap:.75rem;width:max-content;animation:mqR 30s linear infinite}.mq-l:hover,.mq-r:hover{animation-play-state:paused}.mq-card{flex-shrink:0;padding:.875rem 1.25rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:.75rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.8rem;white-space:nowrap}</style><div style="overflow:hidden"><div class="mq-l"><div class="mq-card">★★★★★ Excellent service</div><div class="mq-card">★★★★★ Très professionnel</div><div class="mq-card">★★★★★ Je recommande</div><div class="mq-card">★★★★★ Excellent service</div><div class="mq-card">★★★★★ Très professionnel</div><div class="mq-card">★★★★★ Je recommande</div></div></div><div style="overflow:hidden"><div class="mq-r"><div class="mq-card">★★★★★ Top qualité</div><div class="mq-card">★★★★★ Résultat parfait</div><div class="mq-card">★★★★★ Rapide et efficace</div><div class="mq-card">★★★★★ Top qualité</div><div class="mq-card">★★★★★ Résultat parfait</div><div class="mq-card">★★★★★ Rapide et efficace</div></div></div></div>' },
    },
  },
  {
    id: 'anim-marquee-fade-edges',
    label: 'Marquee avec Fade Edges',
    category: 'animations', subcategory: 'marquees',
    tags: ['animation', 'marquee', 'fade', 'edges', 'gradient', 'mask', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Marquee Fade',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;overflow:hidden;border-radius:.75rem;background:#140c08;padding:1rem 0;position:relative"><style>@keyframes mqFade{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.mq-fade-track{display:flex;gap:1rem;width:max-content;animation:mqFade 18s linear infinite}.mq-fade-track:hover{animation-play-state:paused}</style><div class="mq-fade-track"><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 1</div><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 2</div><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 3</div><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 1</div><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 2</div><div style="flex-shrink:0;padding:.875rem 1.5rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);border-radius:.75rem;color:#f6efe5;font-size:.8rem">Item 3</div></div><div style="position:absolute;top:0;bottom:0;left:0;width:60px;background:linear-gradient(to right,#140c08,transparent);pointer-events:none;z-index:1"></div><div style="position:absolute;top:0;bottom:0;right:0;width:60px;background:linear-gradient(to left,#140c08,transparent);pointer-events:none;z-index:1"></div></div>' },
    },
  },
]

// ─── COUNTER & STATS ───

const COUNTERS: LibraryElementItem[] = [
  {
    id: 'anim-counter-up',
    label: 'Counter Up (Animé)',
    category: 'animations', subcategory: 'counters',
    tags: ['animation', 'counter', 'number', 'stats', 'count-up', 'increment'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Counter Up',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;gap:2rem;justify-content:center;padding:1.5rem;background:#140c08;border-radius:.75rem;border:1px solid rgba(200,169,126,.15)"><style>.counter-box{text-align:center}.counter-num{font-size:2.5rem;font-weight:700;color:#f6efe5;font-variant-numeric:tabular-nums}.counter-label{font-size:.75rem;color:rgba(200,169,126,.6);text-transform:uppercase;letter-spacing:.1em;margin-top:.25rem}</style><div class="counter-box"><div class="counter-num" data-target="150">0</div><div class="counter-label">Projets</div></div><div class="counter-box"><div class="counter-num" data-target="98">0</div><div class="counter-label">% Satisfaction</div></div><div class="counter-box"><div class="counter-num" data-target="50">0</div><div class="counter-label">Clients</div></div><script>document.querySelectorAll(".counter-num[data-target]").forEach(el=>{const t=+el.dataset.target,d=2e3;let s=performance.now();function u(n){const p=Math.min((n-s)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*t);if(p<1)requestAnimationFrame(u)}requestAnimationFrame(u)})</script></div>' },
    },
  },
  {
    id: 'anim-counter-suffix',
    label: 'Counter avec Suffixes (+, %, K)',
    category: 'animations', subcategory: 'counters',
    tags: ['animation', 'counter', 'number', 'stats', 'suffix', 'plus', 'percent'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Counter Suffix',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;gap:2rem;justify-content:center;padding:1.5rem;background:#140c08;border-radius:.75rem;border:1px solid rgba(200,169,126,.15)"><style>.cs-box{text-align:center}.cs-num{font-size:2.5rem;font-weight:700;color:#c8a97e;font-variant-numeric:tabular-nums}.cs-label{font-size:.75rem;color:rgba(246,239,229,.4);margin-top:.25rem}</style><div class="cs-box"><div class="cs-num">50+</div><div class="cs-label">Projets livrés</div></div><div class="cs-box"><div class="cs-num">98%</div><div class="cs-label">Satisfaction</div></div><div class="cs-box"><div class="cs-num">5.0</div><div class="cs-label">Note Trustpilot</div></div></div>' },
    },
  },
]

// ─── SPECIAL EFFECTS ───

const SPECIAL: LibraryElementItem[] = [
  {
    id: 'anim-glow-pulse',
    label: 'Glow Pulse',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'glow', 'pulse', 'accent', 'decorative', 'loop'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glow Pulse',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;position:relative;overflow:hidden"><style>@keyframes glowPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.7;transform:scale(1.05)}}</style><div style="width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(99,139,255,.4),transparent 70%);animation:glowPulse 4s ease-in-out infinite;position:absolute"></div><span style="color:#f6efe5;font-size:.875rem;font-weight:500;position:relative;z-index:1">Glow Pulse — 4s</span></div>' },
    },
  },
  {
    id: 'anim-hero-float',
    label: 'Hero Float (Lévitation)',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'float', 'levitate', 'hero', 'decorative', 'loop'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hero Float',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;display:flex;align-items:center;justify-content:center;background:#140c08;border-radius:.75rem"><style>@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}</style><div style="padding:1.25rem 2rem;background:rgba(74,39,17,.15);border:1px solid rgba(200,169,126,.2);border-radius:1rem;backdrop-filter:blur(20px);color:#f6efe5;font-size:.875rem;animation:heroFloat 6s ease-in-out infinite;box-shadow:0 20px 40px rgba(0,0,0,.3)">Élément flottant — 6s</div></div>' },
    },
  },
  {
    id: 'anim-gradient-border-rotate',
    label: 'Gradient Border Rotate',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'gradient', 'border', 'rotate', 'premium', 'card'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Border',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;display:flex;align-items:center;justify-content:center;padding:2rem"><style>@keyframes gradBorder{0%{--angle:0deg}100%{--angle:360deg}}@property --angle{syntax:"<angle>";initial-value:0deg;inherits:false}.grad-border{padding:1.25rem 2rem;border-radius:1rem;background:#140c08;position:relative;color:#f6efe5;font-size:.875rem;text-align:center}.grad-border::before{content:"";position:absolute;inset:-2px;border-radius:inherit;background:conic-gradient(from var(--angle),#c8a97e,#4a2711,#c8a97e);z-index:-1;animation:gradBorder 4s linear infinite}.grad-border::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#140c08;z-index:-1}</style><div class="grad-border">Gradient Border — 4s rotation</div></div>' },
    },
  },
  {
    id: 'anim-gradient-text-animated',
    label: 'Gradient Text Animé',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'gradient', 'text', 'color', 'premium', 'heading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Text',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#0a0a0a;border-radius:.75rem"><style>@keyframes gradText{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.grad-text{font-size:2rem;font-weight:700;background:linear-gradient(90deg,#c8a97e,#638BFF,#c8a97e);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradText 4s linear infinite}</style><span class="grad-text">Texte Gradient Animé</span></div>' },
    },
  },
  {
    id: 'anim-noise-texture',
    label: 'Noise Texture Overlay',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'noise', 'texture', 'overlay', 'background', 'grain', 'film'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Noise Overlay',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;border-radius:.75rem;position:relative;overflow:hidden;background:#140c08;display:flex;align-items:center;justify-content:center"><style>.noise-over::after{content:\"\";position:absolute;inset:0;opacity:.06;background-image:url(\"data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E\");pointer-events:none}</style><div class="noise-over" style="position:absolute;inset:0"></div><span style="color:#f6efe5;font-size:.875rem;position:relative;z-index:1">Noise Texture — Film grain effect</span></div>' },
    },
  },
  {
    id: 'anim-dot-grid-bg',
    label: 'Dot Grid Background',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'dot', 'grid', 'background', 'pattern', 'decorative'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dot Grid',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;border-radius:.75rem;background:#0a0a0a;background-image:radial-gradient(rgba(200,169,126,.15) 1px,transparent 1px);background-size:24px 24px;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem">Dot Grid — 24px spacing</span></div>' },
    },
  },
  {
    id: 'anim-ken-burns-slow',
    label: 'Ken Burns (Image Zoom Lent)',
    category: 'animations', subcategory: 'special',
    tags: ['animation', 'ken-burns', 'image', 'zoom', 'slow', 'cinematic', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Ken Burns',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;height:160px;border-radius:.75rem;overflow:hidden;position:relative"><style>@keyframes kenBurns{0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.15) translate(-2%,-1%)}100%{transform:scale(1) translate(0,0)}}</style><div style="width:100%;height:100%;background:linear-gradient(135deg,#2c1e14,#4a2711,#3d2b1a);animation:kenBurns 15s ease-in-out infinite;display:flex;align-items:center;justify-content:center"><span style="color:#f6efe5;font-size:.875rem;font-weight:500">Ken Burns — 15s cinematic zoom</span></div></div>' },
    },
  },
]

// ─── INTERACTIVE STATES ───

const INTERACTIVE: LibraryElementItem[] = [
  {
    id: 'anim-accordion',
    label: 'Accordion Open/Close',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'accordion', 'faq', 'expand', 'collapse', 'toggle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Accordion',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;border-radius:.75rem;overflow:hidden;background:#140c08;border:1px solid rgba(200,169,126,.15)"><style>.acc-header{padding:1rem 1.25rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:#f6efe5;font-size:.875rem;font-weight:600;transition:background .2s}.acc-header:hover{background:rgba(74,39,17,.12)}.acc-body{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .3s ease,opacity .3s ease}.acc-body.open{grid-template-rows:1fr;opacity:1}.acc-inner{overflow:hidden}.acc-chevron{transition:transform .3s;color:rgba(200,169,126,.5)}</style><div class="acc-header" onclick="const b=this.nextElementSibling;b.classList.toggle(\'open\');this.querySelector(\'.acc-chevron\').style.transform=b.classList.contains(\'open\')?\'rotate(180deg)\':\'\'">Comment ça marche ?<span class="acc-chevron">▼</span></div><div class="acc-body"><div class="acc-inner" style="padding:0 1.25rem 1rem;color:rgba(246,239,229,.5);font-size:.8rem;line-height:1.6">Contenu qui apparaît en accordéon avec une transition fluide grid-rows + opacity.</div></div></div>' },
    },
  },
  {
    id: 'anim-underline-fill',
    label: 'Underline Fill au Hover',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'underline', 'fill', 'hover', 'link', 'text', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Underline Fill',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="display:flex;gap:2rem;align-items:center;justify-content:center;padding:1rem;background:#140c08;border-radius:.75rem"><style>.uline{position:relative;color:#f6efe5;font-size:.875rem;font-weight:500;text-decoration:none;cursor:pointer}.uline::after{content:\"\";position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:#c8a97e;transform:scaleX(0);transform-origin:right;transition:transform .4s cubic-bezier(.25,.46,.45,.94)}.uline:hover::after{transform:scaleX(1);transform-origin:left}</style><a class="uline">Accueil</a><a class="uline">Services</a><a class="uline">Portfolio</a><a class="uline">Contact</a></div>' },
    },
  },
  {
    id: 'anim-button-press',
    label: 'Button Press (Skeuomorphic)',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'button', 'press', 'skeuomorphic', 'click', '3d'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Press',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="display:flex;gap:1rem;align-items:center;justify-content:center;padding:1.5rem;background:#140c08;border-radius:.75rem"><style>.btn-press{padding:.75rem 2rem;border:none;border-radius:.5rem;font-size:.875rem;font-weight:600;cursor:pointer;transition:all .15s;color:#140c08;background:#c8a97e;box-shadow:0 4px 0 #8a7049}.btn-press:hover{transform:translateY(-1px);box-shadow:0 5px 0 #8a7049;brightness:1.1}.btn-press:active{transform:translateY(3px);box-shadow:0 1px 0 #8a7049}</style><button class="btn-press">Cliquer ici</button></div>' },
    },
  },
  {
    id: 'anim-fan-card',
    label: 'Fan / Éventail de Cards',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'fan', 'eventail', 'cards', 'poker', 'portfolio', 'hover', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fan Cards',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="width:100%;height:280px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;position:relative"><style>.fan-ct{position:relative;width:400px;height:200px;display:flex;align-items:center;justify-content:center}.fan-c{position:absolute;width:120px;height:170px;padding:8px;transform-origin:center 150%;transition:transform .5s cubic-bezier(.34,1.56,.64,1),z-index 0s;cursor:pointer}.fan-c-in{width:100%;height:100%;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:#111114;transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .4s ease;display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:.75rem;font-weight:600}.fan-ct:hover .fan-c:not(:hover) .fan-c-in{transform:scale(.95);opacity:.45}.fan-c:hover{z-index:20!important}.fan-c:hover .fan-c-in{transform:translateY(-30px) scale(1.08)}</style><div class="fan-ct"><div class="fan-c" style="z-index:1;transform:translateX(-140px) translateY(20px) rotate(-16deg)"><div class="fan-c-in">01</div></div><div class="fan-c" style="z-index:2;transform:translateX(-70px) translateY(8px) rotate(-8deg)"><div class="fan-c-in">02</div></div><div class="fan-c" style="z-index:3;transform:rotate(0deg)"><div class="fan-c-in">03</div></div><div class="fan-c" style="z-index:4;transform:translateX(70px) translateY(8px) rotate(8deg)"><div class="fan-c-in">04</div></div><div class="fan-c" style="z-index:5;transform:translateX(140px) translateY(20px) rotate(16deg)"><div class="fan-c-in">05</div></div></div></div>' },
    },
  },
  {
    id: 'anim-scroll-reveal-stagger',
    label: 'Scroll Reveal Stagger',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'scroll', 'reveal', 'stagger', 'entrance', 'intersection', 'observer'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Stagger',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;gap:1rem;padding:1.5rem;background:#140c08;border-radius:.75rem;justify-content:center"><style>@keyframes staggerIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.stg-item{padding:1rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.15);border-radius:.75rem;color:#f6efe5;font-size:.8rem;text-align:center;opacity:0;animation:staggerIn .6s cubic-bezier(.25,.46,.45,.94) forwards}.stg-item:nth-child(1){animation-delay:0s}.stg-item:nth-child(2){animation-delay:.1s}.stg-item:nth-child(3){animation-delay:.2s}.stg-item:nth-child(4){animation-delay:.3s}</style><div class="stg-item">Card 1</div><div class="stg-item">Card 2</div><div class="stg-item">Card 3</div><div class="stg-item">Card 4</div></div>' },
    },
  },
  {
    id: 'anim-glassmorphism-card',
    label: 'Glassmorphism Card',
    category: 'animations', subcategory: 'interactive',
    tags: ['animation', 'glass', 'glassmorphism', 'blur', 'backdrop', 'card', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glass Card',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="display:flex;gap:1rem;padding:2rem;background:linear-gradient(135deg,#1a120b,#2c1e14);border-radius:.75rem;justify-content:center"><style>.glass-card{padding:1.5rem;border-radius:1rem;background:rgba(255,255,255,.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);color:#f6efe5;width:200px;transition:all .4s ease}.glass-card:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);transform:translateY(-4px)}.glass-title{font-size:1rem;font-weight:600;margin-bottom:.5rem}.glass-text{font-size:.8rem;color:rgba(246,239,229,.5);line-height:1.5}</style><div class="glass-card"><div class="glass-title">Premium</div><div class="glass-text">Card avec effet glassmorphism et hover lift.</div></div><div class="glass-card"><div class="glass-title">Élégant</div><div class="glass-text">Backdrop blur + bordure subtile + transition douce.</div></div></div>' },
    },
  },
]

// ─── TRANSITIONS & WIPES ───

const TRANSITIONS: LibraryElementItem[] = [
  {
    id: 'anim-diagonal-wipe',
    label: 'Diagonal Wipe Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'diagonal', 'wipe', 'clip-path', 'reveal', 'luxury', 'slider'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Wipe',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>@keyframes diagWipe{0%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}50%{clip-path:polygon(0 0,100% 0,80% 100%,0 100%)}100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}.dw-a{position:absolute;inset:0;background:linear-gradient(135deg,#1a120b,#2c1e14);display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:1rem;font-weight:600}.dw-b{position:absolute;inset:0;background:linear-gradient(135deg,#4a2711,#6b3a1a);display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:1rem;font-weight:600;clip-path:polygon(0 0,0 0,0 100%,0 100%);animation:diagWipe 2s cubic-bezier(.77,0,.18,1) infinite alternate}</style><div class="dw-a">Slide A</div><div class="dw-b">Slide B</div></div>' },
    },
  },
  {
    id: 'anim-curtain-reveal',
    label: 'Curtain Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'curtain', 'reveal', 'clip-path', 'split', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Curtain Reveal',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>@keyframes curtainLeft{from{transform:translateX(0)}to{transform:translateX(-100%)}}@keyframes curtainRight{from{transform:translateX(0)}to{transform:translateX(100%)}}.crt-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#c8a97e;font-size:1.2rem;font-weight:600;background:linear-gradient(135deg,#1a120b,#2c1e14)}.crt-l,.crt-r{position:absolute;top:0;bottom:0;width:50%;background:#0a0a0a;z-index:2}.crt-l{left:0;animation:curtainLeft 1.5s cubic-bezier(.77,0,.18,1) 0.5s forwards}.crt-r{right:0;animation:curtainRight 1.5s cubic-bezier(.77,0,.18,1) 0.5s forwards}</style><div class="crt-wrap">Contenu révélé</div><div class="crt-l"></div><div class="crt-r"></div></div>' },
    },
  },
  {
    id: 'anim-circle-expand',
    label: 'Circle Expand Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'circle', 'expand', 'clip-path', 'reveal', 'preloader'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Circle Expand',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>@keyframes circExpand{from{clip-path:circle(0% at 50% 50%)}to{clip-path:circle(75% at 50% 50%)}}.circ-content{position:absolute;inset:0;background:linear-gradient(135deg,#4a2711,#6b3a1a);display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:1rem;font-weight:600;clip-path:circle(0% at 50% 50%);animation:circExpand 1.5s cubic-bezier(.25,.46,.45,.94) 0.3s forwards}</style><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(246,239,229,.3);font-size:.8rem">Avant</div><div class="circ-content">Après</div></div>' },
    },
  },
  {
    id: 'anim-horizontal-wipe',
    label: 'Horizontal Wipe',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'horizontal', 'wipe', 'inset', 'reveal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Horizontal Wipe',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;position:relative;overflow:hidden;border-radius:.75rem;background:#140c08"><style>@keyframes hWipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}.hw-box{position:absolute;inset:0;background:linear-gradient(90deg,#4a2711,#c8a97e);clip-path:inset(0 100% 0 0);animation:hWipe 1.2s cubic-bezier(.77,0,.18,1) forwards;display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:.9rem;font-weight:600}</style><div class="hw-box">Wipe → Reveal</div></div>' },
    },
  },
]

// ─── SCROLL ADVANCED ───

const SCROLL_ADVANCED: LibraryElementItem[] = [
  {
    id: 'anim-parallax-scroll',
    label: 'Parallax on Scroll',
    category: 'animations', subcategory: 'scroll-advanced',
    tags: ['animation', 'scroll', 'parallax', 'translateY', 'depth', 'layers', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Parallax',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="width:100%;height:300px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>.plx-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .1s linear}.plx-bg{background:linear-gradient(180deg,#1a120b 0%,#2c1e14 100%);font-size:3rem;color:rgba(200,169,126,.1);font-weight:800}.plx-mid{color:rgba(200,169,126,.25);font-size:1.5rem;font-weight:600}.plx-fg{color:#f6efe5;font-size:.9rem;font-weight:500}</style><div class="plx-layer plx-bg">BG</div><div class="plx-layer plx-mid">MIDDLE</div><div class="plx-layer plx-fg">Les couches se déplacent à des vitesses différentes au scroll</div><script>(function(){var el=document.currentScript.parentElement;var layers=el.querySelectorAll(".plx-layer");var speeds=[0.2,0.5,0.8];function onScroll(){var rect=el.getBoundingClientRect();var progress=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);layers.forEach(function(l,i){l.style.transform="translateY("+(progress-0.5)*60*speeds[i]+"px)"});requestAnimationFrame(onScroll)}requestAnimationFrame(onScroll)})()</script></div>' },
    },
  },
  {
    id: 'anim-scroll-pin-hint',
    label: 'Scroll Pin / Sticky Section',
    category: 'animations', subcategory: 'scroll-advanced',
    tags: ['animation', 'scroll', 'pin', 'sticky', 'section', 'reveal', 'advanced', 'gsap'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Sticky Reveal',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;position:relative;border-radius:.75rem;background:#140c08;overflow:hidden"><style>.pin-demo{display:flex;height:100%}.pin-left{width:50%;position:sticky;top:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a120b,#2c1e14);border-right:1px solid rgba(200,169,126,.15)}.pin-right{width:50%;display:flex;flex-direction:column;gap:.75rem;padding:1.5rem;overflow-y:auto}.pin-left h3{color:#c8a97e;font-size:1.1rem;font-weight:600;margin:0}.pin-card{padding:1rem;background:rgba(74,39,17,.08);border:1px solid rgba(200,169,126,.1);border-radius:.5rem;color:rgba(246,239,229,.6);font-size:.75rem;flex-shrink:0}</style><div class="pin-demo"><div class="pin-left"><h3>Section Sticky</h3></div><div class="pin-right"><div class="pin-card">Le panneau gauche reste fixe pendant que le contenu droite défile.</div><div class="pin-card">Idéal pour les services, features, ou comparaisons.</div><div class="pin-card">Utilise position: sticky ou GSAP ScrollTrigger pin.</div><div class="pin-card">Effet premium utilisé sur jlstudio.dev pour les services.</div></div></div></div>' },
    },
  },
  {
    id: 'anim-line-draw-scroll',
    label: 'Line Draw on Scroll',
    category: 'animations', subcategory: 'scroll-advanced',
    tags: ['animation', 'scroll', 'svg', 'line', 'draw', 'path', 'stroke', 'timeline', 'process'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'SVG Line Draw',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;display:flex;align-items:center;justify-content:center;background:#140c08;border-radius:.75rem;padding:1.5rem"><style>@keyframes drawLine{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}.draw-svg{width:100%;height:60px}.draw-path{stroke:#c8a97e;stroke-width:2;fill:none;stroke-dasharray:400;stroke-dashoffset:400;animation:drawLine 2s cubic-bezier(.25,.46,.45,.94) forwards}.draw-label{color:rgba(246,239,229,.5);font-size:.75rem;text-align:center;margin-top:.5rem}</style><div style="width:100%"><svg class="draw-svg" viewBox="0 0 400 60" preserveAspectRatio="none"><path class="draw-path" d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,30 400,30"/><circle cx="0" cy="30" r="4" fill="#c8a97e"/><circle cx="150" cy="30" r="4" fill="#c8a97e"/><circle cx="300" cy="30" r="4" fill="#c8a97e"/><circle cx="400" cy="30" r="4" fill="#c8a97e"/></svg><p class="draw-label">SVG path animé au scroll — idéal pour timelines & process</p></div></div>' },
    },
  },
  {
    id: 'anim-scale-down-scroll',
    label: 'Scale Down on Scroll',
    category: 'animations', subcategory: 'scroll-advanced',
    tags: ['animation', 'scroll', 'scale', 'zoom', 'out', 'hero', 'cinematic'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Zoom Out Scroll',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;overflow:hidden;border-radius:.75rem;background:#0a0a0a;display:flex;align-items:center;justify-content:center"><style>.scl-box{display:flex;align-items:center;justify-content:center;color:#c8a97e;font-size:2rem;font-weight:700;transform:scale(1.3);transition:transform .1s linear}</style><div class="scl-box" id="sclBox">ZOOM</div><script>(function(){var box=document.getElementById("sclBox");var parent=box.parentElement;function tick(){var rect=parent.getBoundingClientRect();var p=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));box.style.transform="scale("+(1.3-p*0.3)+")";requestAnimationFrame(tick)}requestAnimationFrame(tick)})()</script></div>' },
    },
  },
]

// ─── IMAGE ADVANCED ───

const IMAGE_ADVANCED: LibraryElementItem[] = [
  {
    id: 'anim-image-crossfade',
    label: 'Image Crossfade on Hover',
    category: 'animations', subcategory: 'image-advanced',
    tags: ['animation', 'image', 'crossfade', 'hover', 'swap', 'gallery', 'portfolio', 'models'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Crossfade',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;display:flex;gap:1rem;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:1.5rem"><style>.xfade{position:relative;width:160px;height:160px;border-radius:.75rem;overflow:hidden;cursor:pointer}.xfade-a,.xfade-b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:600;transition:opacity .6s ease}.xfade-a{background:linear-gradient(135deg,#1a120b,#2c1e14);color:#c8a97e;opacity:1}.xfade-b{background:linear-gradient(135deg,#4a2711,#6b3a1a);color:#f6efe5;opacity:0}.xfade:hover .xfade-a{opacity:0}.xfade:hover .xfade-b{opacity:1}</style><div class="xfade"><div class="xfade-a">Image A</div><div class="xfade-b">Image B</div></div><div class="xfade"><div class="xfade-a">Photo 1</div><div class="xfade-b">Photo 2</div></div></div>' },
    },
  },
  {
    id: 'anim-masonry-stagger',
    label: 'Masonry Stagger Reveal',
    category: 'animations', subcategory: 'image-advanced',
    tags: ['animation', 'masonry', 'stagger', 'reveal', 'gallery', 'grid', 'portfolio'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Masonry Stagger',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;padding:1rem;background:#0a0a0a;border-radius:.75rem"><style>@keyframes masonIn{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.mason-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem}.mason-item{border-radius:.5rem;display:flex;align-items:center;justify-content:center;color:#f6efe5;font-size:.7rem;font-weight:600;opacity:0;animation:masonIn .7s cubic-bezier(.25,.46,.45,.94) forwards}.mason-item:nth-child(1){height:120px;background:linear-gradient(135deg,#2c1e14,#4a2711);animation-delay:0s}.mason-item:nth-child(2){height:80px;background:linear-gradient(135deg,#1a120b,#2c1e14);animation-delay:.1s}.mason-item:nth-child(3){height:140px;background:linear-gradient(135deg,#4a2711,#6b3a1a);animation-delay:.15s}.mason-item:nth-child(4){height:100px;background:linear-gradient(135deg,#4a2711,#6b3a1a);animation-delay:.2s}.mason-item:nth-child(5){height:150px;background:linear-gradient(135deg,#1a120b,#2c1e14);animation-delay:.25s}.mason-item:nth-child(6){height:90px;background:linear-gradient(135deg,#2c1e14,#4a2711);animation-delay:.3s}</style><div class="mason-grid"><div class="mason-item">01</div><div class="mason-item">02</div><div class="mason-item">03</div><div class="mason-item">04</div><div class="mason-item">05</div><div class="mason-item">06</div></div></div>' },
    },
  },
  {
    id: 'anim-image-parallax-tilt',
    label: 'Image Tilt 3D on Mouse',
    category: 'animations', subcategory: 'image-advanced',
    tags: ['animation', 'image', 'tilt', '3d', 'perspective', 'mouse', 'hover', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: '3D Tilt',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;perspective:800px"><style>.tilt-card{width:200px;height:160px;border-radius:.75rem;background:linear-gradient(135deg,#1a120b,#4a2711);border:1px solid rgba(200,169,126,.15);display:flex;align-items:center;justify-content:center;color:#c8a97e;font-size:.9rem;font-weight:600;transition:transform .15s ease-out;transform-style:preserve-3d;cursor:pointer}</style><div class="tilt-card" id="tiltCard">Survole-moi</div><script>(function(){var card=document.getElementById("tiltCard");card.addEventListener("mousemove",function(e){var rect=card.getBoundingClientRect();var x=(e.clientX-rect.left)/rect.width-.5;var y=(e.clientY-rect.top)/rect.height-.5;card.style.transform="rotateY("+x*20+"deg) rotateX("+(-y*20)+"deg) scale(1.05)"});card.addEventListener("mouseleave",function(){card.style.transform="rotateY(0) rotateX(0) scale(1)"})})()</script></div>' },
    },
  },
  {
    id: 'anim-image-hover-overlay',
    label: 'Image Hover Glassmorphic Overlay',
    category: 'animations', subcategory: 'image-advanced',
    tags: ['animation', 'image', 'hover', 'overlay', 'glassmorphism', 'portfolio', 'text', 'reveal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover Overlay',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;display:flex;gap:1rem;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:1rem"><style>.ho-card{position:relative;width:180px;height:170px;border-radius:.75rem;overflow:hidden;cursor:pointer}.ho-bg{position:absolute;inset:0;background:linear-gradient(135deg,#2c1e14,#4a2711);transition:transform .6s cubic-bezier(.25,.46,.45,.94)}.ho-overlay{position:absolute;inset:0;background:rgba(10,10,10,.7);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .4s ease}.ho-title{color:#f6efe5;font-size:.85rem;font-weight:600;transform:translateY(10px);transition:transform .4s ease}.ho-tag{color:rgba(200,169,126,.7);font-size:.65rem;margin-top:.25rem;transform:translateY(10px);transition:transform .4s ease .05s}.ho-card:hover .ho-bg{transform:scale(1.08)}.ho-card:hover .ho-overlay{opacity:1}.ho-card:hover .ho-title,.ho-card:hover .ho-tag{transform:translateY(0)}</style><div class="ho-card"><div class="ho-bg"></div><div class="ho-overlay"><span class="ho-title">Projet A</span><span class="ho-tag">Site vitrine</span></div></div><div class="ho-card"><div class="ho-bg" style="background:linear-gradient(135deg,#4a2711,#6b3a1a)"></div><div class="ho-overlay"><span class="ho-title">Projet B</span><span class="ho-tag">E-commerce</span></div></div></div>' },
    },
  },
]

// ─── COMPOSITE SEQUENCES ───

const COMPOSITES: LibraryElementItem[] = [
  {
    id: 'anim-hero-sequence',
    label: 'Hero Entrance Sequence',
    category: 'animations', subcategory: 'composites',
    tags: ['animation', 'hero', 'sequence', 'stagger', 'entrance', 'title', 'subtitle', 'cta', 'composite'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hero Sequence',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:linear-gradient(180deg,#0a0a0a,#140c08);border-radius:.75rem;padding:2rem"><style>@keyframes heroFadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.hero-badge{padding:.35rem 1rem;border:1px solid rgba(200,169,126,.2);border-radius:100px;color:#c8a97e;font-size:.65rem;text-transform:uppercase;letter-spacing:.15em;opacity:0;animation:heroFadeUp .8s cubic-bezier(.25,.46,.45,.94) 0s forwards}.hero-title{font-size:2rem;font-weight:700;color:#f6efe5;text-align:center;margin:0;opacity:0;animation:heroFadeUp .8s cubic-bezier(.25,.46,.45,.94) .15s forwards}.hero-sub{font-size:.85rem;color:rgba(246,239,229,.5);text-align:center;max-width:400px;line-height:1.6;opacity:0;animation:heroFadeUp .8s cubic-bezier(.25,.46,.45,.94) .3s forwards}.hero-cta{padding:.6rem 1.5rem;background:#c8a97e;border:none;border-radius:100px;color:#0a0a0a;font-size:.8rem;font-weight:600;cursor:pointer;opacity:0;animation:heroFadeUp .8s cubic-bezier(.25,.46,.45,.94) .45s forwards}</style><span class="hero-badge">✦ Premium</span><h2 class="hero-title">Titre Principal</h2><p class="hero-sub">Sous-titre descriptif avec animation stagger séquentielle badge → titre → sous-titre → CTA.</p><button class="hero-cta">Découvrir</button></div>' },
    },
  },
  {
    id: 'anim-section-separator',
    label: 'Section Separator Line',
    category: 'animations', subcategory: 'composites',
    tags: ['animation', 'separator', 'line', 'scaleX', 'divider', 'section', 'scroll'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Separator Line',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<div style="width:100%;height:60px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:0 2rem"><style>@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}.sep-line{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(200,169,126,.3),transparent);transform:scaleX(0);animation:lineGrow 1.2s cubic-bezier(.25,.46,.45,.94) forwards}</style><div class="sep-line"></div></div>' },
    },
  },
  {
    id: 'anim-text-mask-hover',
    label: 'Text Mask Hover (Slide Up)',
    category: 'animations', subcategory: 'composites',
    tags: ['animation', 'text', 'mask', 'hover', 'slide', 'link', 'navigation', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Mask Hover',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;height:80px;display:flex;align-items:center;justify-content:center;gap:2rem;background:#0a0a0a;border-radius:.75rem"><style>.tm-link{position:relative;overflow:hidden;cursor:pointer;display:inline-block}.tm-link span{display:block;color:#f6efe5;font-size:.9rem;font-weight:500;transition:transform .4s cubic-bezier(.77,0,.18,1)}.tm-link .tm-clone{position:absolute;top:100%;left:0;color:#c8a97e}.tm-link:hover .tm-orig{transform:translateY(-100%)}.tm-link:hover .tm-clone{transform:translateY(-100%)}</style><div class="tm-link"><span class="tm-orig">Services</span><span class="tm-clone">Services</span></div><div class="tm-link"><span class="tm-orig">Portfolio</span><span class="tm-clone">Portfolio</span></div><div class="tm-link"><span class="tm-orig">Contact</span><span class="tm-clone">Contact</span></div></div>' },
    },
  },
  {
    id: 'anim-stats-counter-row',
    label: 'Stats Counter Row',
    category: 'animations', subcategory: 'composites',
    tags: ['animation', 'stats', 'counter', 'row', 'numbers', 'composite', 'stagger'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Stats Row',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="width:100%;height:120px;display:flex;align-items:center;justify-content:space-around;background:linear-gradient(135deg,#0a0a0a,#140c08);border-radius:.75rem;padding:1.5rem"><style>.stat{text-align:center;opacity:0;animation:heroFadeUp .8s cubic-bezier(.25,.46,.45,.94) forwards}@keyframes heroFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.stat:nth-child(1){animation-delay:0s}.stat:nth-child(2){animation-delay:.15s}.stat:nth-child(3){animation-delay:.3s}.stat:nth-child(4){animation-delay:.45s}.stat-num{font-size:1.8rem;font-weight:700;color:#c8a97e;margin:0}.stat-label{font-size:.65rem;color:rgba(246,239,229,.4);margin-top:.25rem}</style><div class="stat"><p class="stat-num" data-target="50">0</p><p class="stat-label">Projets livrés</p></div><div class="stat"><p class="stat-num" data-target="98">0</p><p class="stat-label">Satisfaction %</p></div><div class="stat"><p class="stat-num" data-target="24">0</p><p class="stat-label">Heures moy.</p></div><div class="stat"><p class="stat-num" data-target="5">0</p><p class="stat-label">Étoiles TP</p></div><script>(function(){document.querySelectorAll("[data-target]").forEach(function(el){var target=parseInt(el.dataset.target);var start=0;var duration=1500;var startTime=null;function step(ts){if(!startTime)startTime=ts;var p=Math.min((ts-startTime)/duration,1);var eased=1-Math.pow(1-p,3);el.textContent=Math.round(eased*target);if(p<1)requestAnimationFrame(step)}setTimeout(function(){requestAnimationFrame(step)},300)})})()</script></div>' },
    },
  },
  {
    id: 'anim-carousel-slide',
    label: 'Carousel Slide Transition',
    category: 'animations', subcategory: 'composites',
    tags: ['animation', 'carousel', 'slider', 'slide', 'transition', 'arrows', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Carousel Slide',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;height:200px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>.crs-track{display:flex;transition:transform .6s cubic-bezier(.77,0,.18,1);width:300%}.crs-slide{width:33.333%;height:200px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.crs-slide:nth-child(1){background:linear-gradient(135deg,#1a120b,#2c1e14)}.crs-slide:nth-child(2){background:linear-gradient(135deg,#2c1e14,#4a2711)}.crs-slide:nth-child(3){background:linear-gradient(135deg,#4a2711,#6b3a1a)}.crs-slide span{color:#f6efe5;font-size:1rem;font-weight:600}.crs-btn{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);color:#f6efe5;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s}.crs-btn:hover{background:rgba(255,255,255,.15)}.crs-prev{left:12px}.crs-next{right:12px}</style><div class="crs-track" id="crsTrack"><div class="crs-slide"><span>Slide 1</span></div><div class="crs-slide"><span>Slide 2</span></div><div class="crs-slide"><span>Slide 3</span></div></div><button class="crs-btn crs-prev" id="crsPrev">‹</button><button class="crs-btn crs-next" id="crsNext">›</button><script>(function(){var track=document.getElementById("crsTrack");var idx=0;var total=3;document.getElementById("crsNext").addEventListener("click",function(){idx=(idx+1)%total;track.style.transform="translateX(-"+(idx*33.333)+"%)"});document.getElementById("crsPrev").addEventListener("click",function(){idx=(idx-1+total)%total;track.style.transform="translateX(-"+(idx*33.333)+"%)"});setInterval(function(){idx=(idx+1)%total;track.style.transform="translateX(-"+(idx*33.333)+"%)"},4000)})()</script></div>' },
    },
  },
]

// ─── SLIDERS ───

const SLIDERS: LibraryElementItem[] = [
  {
    id: 'anim-diagonal-wipe-slider',
    label: 'Diagonal Wipe Slider',
    category: 'animations', subcategory: 'sliders',
    tags: ['animation', 'slider', 'diagonal', 'wipe', 'clip-path', 'hero'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Wipe Slider',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: { html: '<div style="width:100%;height:320px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>.dws-slide{position:absolute;inset:0;clip-path:polygon(0% 0%,0% 0%,0% 100%,-20% 100%);transition:clip-path 1.2s cubic-bezier(.76,0,.24,1)}.dws-slide.active{clip-path:polygon(0% 0%,130% 0%,130% 100%,-20% 100%)}.dws-slide .dws-bg{position:absolute;inset:0;transform:scale(1.08);transition:transform 6s ease-out}.dws-slide.active .dws-bg{transform:scale(1)}.dws-s1 .dws-bg{background:linear-gradient(135deg,#1a120b,#2c1e14)}.dws-s2 .dws-bg{background:linear-gradient(135deg,#2c1e14,#4a2711)}.dws-s3 .dws-bg{background:linear-gradient(135deg,#4a2711,#6b3a1a)}.dws-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f6efe5;z-index:1}.dws-label h3{font-size:1.5rem;font-weight:700;margin:0}.dws-label p{font-size:.8rem;color:rgba(246,239,229,.5);margin:.5rem 0 0}.dws-btn{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);color:#f6efe5;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s;z-index:5}.dws-btn:hover{background:rgba(255,255,255,.14)}.dws-prev{left:16px}.dws-next{right:16px}.dws-dots{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:5}.dws-dot{width:8px;height:8px;border-radius:50%;background:rgba(246,239,229,.25);border:none;cursor:pointer;transition:background .3s,transform .3s}.dws-dot.active{background:#c8a97e;transform:scale(1.3)}</style><div class="dws-slide dws-s1 active" id="dwsS0"><div class="dws-bg"></div><div class="dws-label"><h3>Slide One</h3><p>Diagonal wipe transition</p></div></div><div class="dws-slide dws-s2" id="dwsS1"><div class="dws-bg"></div><div class="dws-label"><h3>Slide Two</h3><p>Clip-path animation</p></div></div><div class="dws-slide dws-s3" id="dwsS2"><div class="dws-bg"></div><div class="dws-label"><h3>Slide Three</h3><p>Premium transitions</p></div></div><button class="dws-btn dws-prev" id="dwsPrev">\u2039</button><button class="dws-btn dws-next" id="dwsNext">\u203a</button><div class="dws-dots" id="dwsDots"><button class="dws-dot active"></button><button class="dws-dot"></button><button class="dws-dot"></button></div><script>(function(){var slides=document.querySelectorAll(".dws-slide");var dots=document.querySelectorAll(".dws-dot");var idx=0;var total=3;function go(n){slides[idx].classList.remove("active");dots[idx].classList.remove("active");idx=(n+total)%total;slides[idx].classList.add("active");dots[idx].classList.add("active")}document.getElementById("dwsNext").addEventListener("click",function(){go(idx+1)});document.getElementById("dwsPrev").addEventListener("click",function(){go(idx-1)});dots.forEach(function(d,i){d.addEventListener("click",function(){go(i)})});setInterval(function(){go(idx+1)},5000)})()</script></div>' },
    },
  },
  {
    id: 'anim-iris-wipe-slider',
    label: 'Iris / Circular Wipe Slider',
    category: 'animations', subcategory: 'sliders',
    tags: ['animation', 'slider', 'iris', 'circular', 'wipe', 'clip-path'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Iris Wipe Slider',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="width:100%;height:300px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>.iws-slide{position:absolute;inset:0;clip-path:circle(0% at 50% 50%);transition:clip-path 1s cubic-bezier(.76,0,.24,1);display:flex;align-items:center;justify-content:center}.iws-slide.active{clip-path:circle(75% at 50% 50%)}.iws-s1{background:linear-gradient(135deg,#1a120b,#2c1e14)}.iws-s2{background:linear-gradient(135deg,#2c1e14,#4a2711)}.iws-s3{background:linear-gradient(135deg,#4a2711,#6b3a1a)}.iws-slide span{color:#f6efe5;font-size:1.3rem;font-weight:700;z-index:1}.iws-dots{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:5}.iws-dot{width:8px;height:8px;border-radius:50%;background:rgba(246,239,229,.25);border:none;cursor:pointer;transition:background .3s}.iws-dot.active{background:#c8a97e}</style><div class="iws-slide iws-s1 active" id="iwsS0"><span>Slide 1</span></div><div class="iws-slide iws-s2" id="iwsS1"><span>Slide 2</span></div><div class="iws-slide iws-s3" id="iwsS2"><span>Slide 3</span></div><div class="iws-dots" id="iwsDots"><button class="iws-dot active"></button><button class="iws-dot"></button><button class="iws-dot"></button></div><script>(function(){var slides=document.querySelectorAll(".iws-slide");var dots=document.querySelectorAll(".iws-dot");var idx=0;var total=3;function go(n){slides[idx].classList.remove("active");dots[idx].classList.remove("active");idx=(n+total)%total;slides[idx].classList.add("active");dots[idx].classList.add("active")}dots.forEach(function(d,i){d.addEventListener("click",function(){go(i)})});setInterval(function(){go(idx+1)},5000)})()</script></div>' },
    },
  },
  {
    id: 'anim-fade-crossfade-slider',
    label: 'Crossfade Slider',
    category: 'animations', subcategory: 'sliders',
    tags: ['animation', 'slider', 'crossfade', 'fade', 'smooth'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Crossfade Slider',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="width:100%;height:280px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a"><style>.cfs-slide{position:absolute;inset:0;opacity:0;transition:opacity .8s ease;display:flex;align-items:center;justify-content:center}.cfs-slide.active{opacity:1}.cfs-s1{background:linear-gradient(135deg,#1a120b,#2c1e14)}.cfs-s2{background:linear-gradient(135deg,#2c1e14,#4a2711)}.cfs-s3{background:linear-gradient(135deg,#4a2711,#6b3a1a)}.cfs-slide span{color:#f6efe5;font-size:1.3rem;font-weight:700}.cfs-btn{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);color:#f6efe5;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s;z-index:5}.cfs-btn:hover{background:rgba(255,255,255,.15)}.cfs-prev{left:12px}.cfs-next{right:12px}.cfs-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:5}.cfs-dot{width:8px;height:8px;border-radius:50%;background:rgba(246,239,229,.25);border:none;cursor:pointer;transition:background .3s}.cfs-dot.active{background:#c8a97e}</style><div class="cfs-slide cfs-s1 active"><span>Slide 1</span></div><div class="cfs-slide cfs-s2"><span>Slide 2</span></div><div class="cfs-slide cfs-s3"><span>Slide 3</span></div><button class="cfs-btn cfs-prev" id="cfsPrev">\u2039</button><button class="cfs-btn cfs-next" id="cfsNext">\u203a</button><div class="cfs-dots" id="cfsDots"><button class="cfs-dot active"></button><button class="cfs-dot"></button><button class="cfs-dot"></button></div><script>(function(){var slides=document.querySelectorAll(".cfs-slide");var dots=document.querySelectorAll(".cfs-dot");var idx=0;var total=3;function go(n){slides[idx].classList.remove("active");dots[idx].classList.remove("active");idx=(n+total)%total;slides[idx].classList.add("active");dots[idx].classList.add("active")}document.getElementById("cfsNext").addEventListener("click",function(){go(idx+1)});document.getElementById("cfsPrev").addEventListener("click",function(){go(idx-1)});dots.forEach(function(d,i){d.addEventListener("click",function(){go(i)})});setInterval(function(){go(idx+1)},4000)})()</script></div>' },
    },
  },
]

// ─── UI PATTERNS ───

const UI_PATTERNS: LibraryElementItem[] = [
  {
    id: 'anim-accordion-expand',
    label: 'Accordion Expand',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'accordion', 'expand', 'faq', 'collapse'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Accordion Expand',
      defaultStyle: { width: '100%', minHeight: '260px' },
      defaultContent: { html: '<div style="width:100%;padding:1.5rem;background:#0a0a0a;border-radius:.75rem;display:flex;flex-direction:column;gap:2px"><style>.acc-item{border-bottom:1px solid rgba(200,169,126,.1)}.acc-header{width:100%;padding:1rem 0;background:none;border:none;color:#f6efe5;font-size:.9rem;font-weight:500;cursor:pointer;display:flex;justify-content:space-between;align-items:center;text-align:left}.acc-header:hover{color:#c8a97e}.acc-icon{font-size:1.2rem;color:#c8a97e;transition:transform .4s ease}.acc-item.open .acc-icon{transform:rotate(45deg)}.acc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s ease,opacity .4s ease;opacity:0}.acc-item.open .acc-body{grid-template-rows:1fr;opacity:1}.acc-inner{overflow:hidden}.acc-inner p{margin:0;padding:0 0 1rem;font-size:.8rem;color:rgba(246,239,229,.5);line-height:1.6}</style><div class="acc-item open"><button class="acc-header" onclick="this.parentElement.classList.toggle(\'open\')"><span>What services do you offer?</span><span class="acc-icon">+</span></button><div class="acc-body"><div class="acc-inner"><p>We provide premium web design, branding, and digital strategy tailored to luxury brands and high-end businesses.</p></div></div></div><div class="acc-item"><button class="acc-header" onclick="this.parentElement.classList.toggle(\'open\')"><span>How long does a project take?</span><span class="acc-icon">+</span></button><div class="acc-body"><div class="acc-inner"><p>Typical projects range from 4 to 8 weeks depending on scope and complexity.</p></div></div></div><div class="acc-item"><button class="acc-header" onclick="this.parentElement.classList.toggle(\'open\')"><span>Do you offer ongoing support?</span><span class="acc-icon">+</span></button><div class="acc-body"><div class="acc-inner"><p>Yes, we provide maintenance packages and priority support for all our clients.</p></div></div></div></div>' },
    },
  },
  {
    id: 'anim-off-canvas-menu',
    label: 'Off-Canvas Fullscreen Menu',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'menu', 'off-canvas', 'fullscreen', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Off-Canvas Menu',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="width:100%;height:280px;position:relative;overflow:hidden;border-radius:.75rem;background:#0a0a0a;display:flex;align-items:center;justify-content:center"><style>.ocm-trigger{width:44px;height:44px;background:rgba(255,255,255,.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;z-index:10;position:relative;transition:background .3s}.ocm-trigger:hover{background:rgba(255,255,255,.12)}.ocm-trigger span{display:block;width:20px;height:2px;background:#f6efe5;border-radius:1px;transition:transform .4s cubic-bezier(.23,1,.32,1),opacity .3s}.ocm-trigger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.ocm-trigger.open span:nth-child(2){opacity:0}.ocm-trigger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}.ocm-overlay{position:absolute;inset:0;background:rgba(10,10,10,.92);backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;opacity:0;pointer-events:none;transition:opacity .5s cubic-bezier(.23,1,.32,1);z-index:5}.ocm-overlay.open{opacity:1;pointer-events:auto}.ocm-link{color:#f6efe5;font-size:1.5rem;font-weight:600;text-decoration:none;opacity:0;transform:translateX(-30px);transition:opacity .5s cubic-bezier(.23,1,.32,1),transform .5s cubic-bezier(.23,1,.32,1),color .3s}.ocm-overlay.open .ocm-link{opacity:1;transform:translateX(0)}.ocm-link:hover{color:#c8a97e}.ocm-close{position:absolute;top:16px;right:16px;width:36px;height:36px;background:none;border:1px solid rgba(255,255,255,.1);border-radius:50%;color:#f6efe5;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s,background .3s}.ocm-overlay.open .ocm-close{opacity:1}.ocm-close:hover{background:rgba(255,255,255,.08)}</style><button class="ocm-trigger" id="ocmTrigger"><span></span><span></span><span></span></button><div class="ocm-overlay" id="ocmOverlay"><a class="ocm-link" style="transition-delay:.05s" href="#">Home</a><a class="ocm-link" style="transition-delay:.13s" href="#">Services</a><a class="ocm-link" style="transition-delay:.21s" href="#">Portfolio</a><a class="ocm-link" style="transition-delay:.29s" href="#">Contact</a><button class="ocm-close" id="ocmClose">\u00d7</button></div><script>(function(){var trigger=document.getElementById("ocmTrigger");var overlay=document.getElementById("ocmOverlay");var close=document.getElementById("ocmClose");function toggle(){trigger.classList.toggle("open");overlay.classList.toggle("open")}trigger.addEventListener("click",toggle);close.addEventListener("click",toggle)})()</script></div>' },
    },
  },
  {
    id: 'anim-progress-bar-fill',
    label: 'Progress Bar Fill',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'progress', 'bar', 'fill', 'loading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Progress Bar Fill',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;padding:1.5rem;background:#0a0a0a;border-radius:.75rem;display:flex;flex-direction:column;gap:1.25rem"><style>.pb-row{display:flex;flex-direction:column;gap:.5rem}.pb-header{display:flex;justify-content:space-between;align-items:center}.pb-label{font-size:.8rem;color:#f6efe5;font-weight:500}.pb-pct{font-size:.75rem;color:#c8a97e;font-weight:600}.pb-track{width:100%;height:6px;background:rgba(200,169,126,.1);border-radius:3px;overflow:hidden}.pb-fill{height:100%;width:0;background:linear-gradient(90deg,#4a2711,#c8a97e);border-radius:3px;transition:width 2s ease-out}</style><div class="pb-row"><div class="pb-header"><span class="pb-label">Design</span><span class="pb-pct" data-target="92">0%</span></div><div class="pb-track"><div class="pb-fill" data-width="92"></div></div></div><div class="pb-row"><div class="pb-header"><span class="pb-label">Development</span><span class="pb-pct" data-target="78">0%</span></div><div class="pb-track"><div class="pb-fill" data-width="78"></div></div></div><div class="pb-row"><div class="pb-header"><span class="pb-label">Branding</span><span class="pb-pct" data-target="85">0%</span></div><div class="pb-track"><div class="pb-fill" data-width="85"></div></div></div><script>(function(){setTimeout(function(){document.querySelectorAll(".pb-fill").forEach(function(el){el.style.width=el.dataset.width+"%"});document.querySelectorAll(".pb-pct").forEach(function(el){var target=parseInt(el.dataset.target);var start=0;var dur=2000;var t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var v=1-Math.pow(1-p,3);el.textContent=Math.round(v*target)+"%";if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},300)})()</script></div>' },
    },
  },
  {
    id: 'anim-scroll-reveal-stagger-cards',
    label: 'Scroll Reveal Stagger Cards',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'scroll', 'reveal', 'stagger', 'intersection-observer'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Reveal Stagger',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;padding:1.5rem;background:#0a0a0a;border-radius:.75rem;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem"><style>@keyframes srsReveal{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}.srs-card{background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.15);border-radius:.75rem;padding:1.25rem;text-align:center;opacity:0;animation:srsReveal .6s cubic-bezier(.25,.46,.45,.94) forwards}.srs-card:nth-child(1){animation-delay:.1s}.srs-card:nth-child(2){animation-delay:.25s}.srs-card:nth-child(3){animation-delay:.4s}.srs-card:nth-child(4){animation-delay:.55s}.srs-icon{font-size:1.5rem;margin-bottom:.5rem}.srs-card h4{margin:0;font-size:.85rem;color:#f6efe5;font-weight:600}.srs-card p{margin:.35rem 0 0;font-size:.7rem;color:rgba(246,239,229,.45);line-height:1.5}</style><div class="srs-card"><div class="srs-icon">\u2666</div><h4>Strategy</h4><p>Data-driven approach</p></div><div class="srs-card"><div class="srs-icon">\u25c6</div><h4>Design</h4><p>Premium aesthetics</p></div><div class="srs-card"><div class="srs-icon">\u2726</div><h4>Develop</h4><p>Clean, fast code</p></div><div class="srs-card"><div class="srs-icon">\u2605</div><h4>Deliver</h4><p>On time, every time</p></div></div>' },
    },
  },
  {
    id: 'anim-star-rating-fill',
    label: 'Star Rating Fill',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'stars', 'rating', 'fill', 'testimonials'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Star Rating Fill',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;gap:.5rem;background:#0a0a0a;border-radius:.75rem"><style>@keyframes starPop{0%{opacity:0;transform:scale(0);color:rgba(246,239,229,.2)}60%{opacity:1;transform:scale(1.3);color:#c8a97e}100%{opacity:1;transform:scale(1);color:#c8a97e}}.srf-star{font-size:2rem;opacity:0;transform:scale(0);color:rgba(246,239,229,.2);animation:starPop .5s cubic-bezier(.25,.46,.45,.94) forwards}.srf-star:nth-child(1){animation-delay:.2s}.srf-star:nth-child(2){animation-delay:.3s}.srf-star:nth-child(3){animation-delay:.4s}.srf-star:nth-child(4){animation-delay:.5s}.srf-star:nth-child(5){animation-delay:.6s}</style><span class="srf-star">\u2605</span><span class="srf-star">\u2605</span><span class="srf-star">\u2605</span><span class="srf-star">\u2605</span><span class="srf-star">\u2605</span></div>' },
    },
  },
  {
    id: 'anim-glassmorphism-booking-bar',
    label: 'Glassmorphism Booking Bar',
    category: 'animations', subcategory: 'ui-patterns',
    tags: ['animation', 'glassmorphism', 'booking', 'search', 'bar', 'hero'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glassmorphism Booking Bar',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: { html: '<div style="width:100%;height:140px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#140c08,#1a120b);border-radius:.75rem;padding:1.5rem"><style>.gbb-bar{display:flex;align-items:center;gap:1px;background:rgba(255,255,255,.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:.75rem;overflow:hidden;width:100%;max-width:700px}.gbb-field{flex:1;padding:.85rem 1rem;background:transparent;border:none;display:flex;flex-direction:column;gap:.25rem;position:relative;transition:background .3s}.gbb-field:hover{background:rgba(255,255,255,.04)}.gbb-field:not(:last-child)::after{content:"";position:absolute;right:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.08)}.gbb-field label{font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(246,239,229,.4)}.gbb-field span{font-size:.8rem;color:#f6efe5;font-weight:500}.gbb-btn{padding:.85rem 1.5rem;background:#c8a97e;border:none;border-radius:0 .75rem .75rem 0;color:#0a0a0a;font-size:.8rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .3s,box-shadow .3s}.gbb-btn:hover{background:#d4b88e;box-shadow:0 0 20px rgba(200,169,126,.3)}</style><div class="gbb-bar"><div class="gbb-field"><label>Location</label><span>Paris, France</span></div><div class="gbb-field"><label>Check-in</label><span>Mar 25, 2026</span></div><div class="gbb-field"><label>Check-out</label><span>Mar 30, 2026</span></div><div class="gbb-field"><label>Guests</label><span>2 Adults</span></div><button class="gbb-btn">Search</button></div></div>' },
    },
  },
]

// ─── BUTTON HOVERS ───

const BUTTON_HOVERS: LibraryElementItem[] = [
  {
    id: 'anim-btn-sweep-left-to-right',
    label: 'Button Sweep Left→Right',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'sweep', 'fill', 'left-to-right', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Sweep Left→Right',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.sweep-lr-btn{position:relative;display:inline-block;padding:16px 40px;background:#140c08;color:#f6efe5;font-size:.9375rem;font-weight:500;border:none;border-radius:.5rem;cursor:pointer;overflow:hidden;text-align:center;letter-spacing:.01em;transition:color .4s cubic-bezier(.4,0,.2,1);z-index:1}.sweep-lr-btn::before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:#c8a97e;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.4,0,.2,1);z-index:-1}.sweep-lr-btn:hover::before{transform:scaleX(1)}.sweep-lr-btn:hover{color:#140c08}</style><button class="sweep-lr-btn">Discover More</button></div>' },
    },
  },
  {
    id: 'anim-btn-sweep-right-to-left',
    label: 'Button Sweep Right→Left',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'sweep', 'fill', 'right-to-left', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Sweep Right→Left',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.sweep-rl-btn{position:relative;display:inline-block;padding:16px 40px;background:transparent;color:#f6efe5;font-size:.9375rem;font-weight:500;border:1px solid #f6efe5;border-radius:.5rem;cursor:pointer;overflow:hidden;text-align:center;letter-spacing:.01em;transition:color .4s cubic-bezier(.4,0,.2,1),border-color .4s cubic-bezier(.4,0,.2,1);z-index:1}.sweep-rl-btn::before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:#140c08;transform:scaleX(0);transform-origin:right;transition:transform .4s cubic-bezier(.4,0,.2,1);z-index:-1}.sweep-rl-btn:hover::before{transform:scaleX(1)}.sweep-rl-btn:hover{color:#c8a97e;border-color:#140c08}</style><button class="sweep-rl-btn">Get Started</button></div>' },
    },
  },
  {
    id: 'anim-btn-radial-burst',
    label: 'Button Radial Burst',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'radial', 'burst', 'circle', 'premium', 'petale'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Radial Burst',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.radial-btn{position:relative;display:inline-block;padding:16px 40px;background:#140c08;color:#f6efe5;font-size:.9375rem;font-weight:500;border:1px solid rgba(200,169,126,.25);border-radius:.5rem;cursor:pointer;overflow:hidden;text-align:center;letter-spacing:.01em;transition:color .5s ease,border-color .5s ease;z-index:1}.radial-btn::before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:0;height:0;background:#c8a97e;border-radius:50%;transition:width .5s ease,height .5s ease;z-index:-1}.radial-btn:hover::before{width:300%;height:300%}.radial-btn:hover{color:#140c08;border-color:#c8a97e}</style><button class="radial-btn">Explore</button></div>' },
    },
  },
  {
    id: 'anim-btn-slide-fill',
    label: 'Button Slide Fill',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'slide', 'fill', 'translateX', 'canopy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Slide Fill',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.slide-fill-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:16px 40px;background:transparent;border:1px solid rgba(200,169,126,.3);border-radius:.5rem;cursor:pointer;overflow:hidden;text-decoration:none}.slide-fill-btn .slide-fill-bg{position:absolute;inset:0;background:#c8a97e;transform:translateX(102%);transition:transform .4s ease}.slide-fill-btn .slide-fill-label{position:relative;z-index:1;font-size:.9375rem;font-weight:500;color:#f6efe5;transition:color .4s ease;letter-spacing:.01em}.slide-fill-btn:hover .slide-fill-bg{transform:translateX(0)}.slide-fill-btn:hover .slide-fill-label{color:#140c08}</style><button class="slide-fill-btn"><span class="slide-fill-bg"></span><span class="slide-fill-label">View Gallery</span></button></div>' },
    },
  },
  {
    id: 'anim-btn-press-down',
    label: 'Button Press Down (Neobrutalist)',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'press', 'neobrutalist', 'shadow', 'creative'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Press Down',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.press-btn{display:inline-block;padding:14px 36px;background:transparent;color:#c8a97e;font-size:.9375rem;font-weight:700;border:2px solid #c8a97e;border-radius:.375rem;cursor:pointer;letter-spacing:.02em;box-shadow:3px 3px 0 0 #c8a97e;transition:all .15s ease}.press-btn:hover{box-shadow:1px 1px 0 0 #c8a97e;transform:translate(2px,2px)}.press-btn:active{box-shadow:0 0 0 0 #c8a97e;transform:translate(3px,3px)}</style><button class="press-btn">Press Me</button></div>' },
    },
  },
  {
    id: 'anim-btn-gradient-glow',
    label: 'Button Gradient + Glow',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'gradient', 'glow', 'shadow', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Gradient Glow',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.glow-btn{display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#638BFF,rgba(99,139,255,.67));color:#fff;font-size:.9375rem;font-weight:500;border:none;border-radius:9999px;cursor:pointer;letter-spacing:.01em;box-shadow:0 4px 14px rgba(99,139,255,.3);transition:all .3s ease}.glow-btn:hover{transform:scale(1.02);box-shadow:0 8px 25px rgba(99,139,255,.45)}.glow-btn:active{transform:scale(.98)}</style><button class="glow-btn">Get Started Free</button></div>' },
    },
  },
  {
    id: 'anim-btn-underline-expand',
    label: 'Button Text + Underline Expand',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'underline', 'expand', 'text', 'minimal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Underline Expand',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;height:80px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.uline-btn{position:relative;display:inline-block;padding:8px 4px;background:none;border:none;color:#f6efe5;font-size:.9375rem;font-weight:500;cursor:pointer;letter-spacing:.01em;transition:color .3s ease}.uline-btn::after{content:"";position:absolute;bottom:-4px;left:0;width:0;height:1.5px;background:#c8a97e;transition:width .3s ease}.uline-btn:hover{color:#c8a97e}.uline-btn:hover::after{width:100%}</style><button class="uline-btn">Learn More</button></div>' },
    },
  },
  {
    id: 'anim-btn-underline-center',
    label: 'Button Underline from Center',
    category: 'animations', subcategory: 'button-hovers',
    tags: ['animation', 'button', 'hover', 'underline', 'center', 'expand', 'text'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Underline Center',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<div style="width:100%;height:80px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem"><style>.uline-c-btn{position:relative;display:inline-block;padding:8px 4px;background:none;border:none;color:#f6efe5;font-size:.9375rem;font-weight:500;cursor:pointer;letter-spacing:.01em;transition:color .3s ease}.uline-c-btn::after{content:"";position:absolute;bottom:-4px;left:50%;width:0;height:1.5px;background:#c8a97e;transition:width .3s ease,left .3s ease}.uline-c-btn:hover{color:#c8a97e}.uline-c-btn:hover::after{width:100%;left:0}</style><button class="uline-c-btn">View Details</button></div>' },
    },
  },
]

// ─── BACKGROUNDS ───

const BACKGROUNDS: LibraryElementItem[] = [
  {
    id: 'anim-bg-fixed-parallax',
    label: 'Fixed Background Parallax',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'background', 'fixed', 'parallax', 'image', 'scroll'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Fixed Parallax',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: { html: '<div class="bgfp-wrap" style="position:relative;height:400px;background:linear-gradient(180deg,#1a0e08 0%,#2c1e14 30%,#4a2711 60%,#1a0e08 100%);background-attachment:fixed;background-size:cover;overflow:hidden"><div style="position:absolute;inset:0;background:linear-gradient(360deg,rgba(20,12,8,0.85) 14%,rgba(255,255,255,0) 39%)"></div><div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem"><h2 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;color:#f6efe5;margin:0 0 .5rem">Fixed Parallax Effect</h2><p style="font-size:.875rem;color:rgba(246,239,229,0.7);margin:0 0 1.5rem;max-width:400px">The background stays fixed while content scrolls over it, creating depth.</p><span style="font-size:.75rem;color:#c8a97e;letter-spacing:.05em;text-transform:uppercase">Scroll to see parallax effect</span></div></div>' },
    },
  },
  {
    id: 'anim-bg-gradient-overlay',
    label: 'Gradient Overlay on Image',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'background', 'gradient', 'overlay', 'image', 'hero'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Overlay',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;height:350px;background:linear-gradient(135deg,#2c1e14 0%,#4a2711 40%,#1a0e08 100%);overflow:hidden"><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,0.90) 14%,rgba(10,10,10,0.3) 60%,rgba(10,10,10,0.1) 100%)"></div><div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem"><h2 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;color:#f6efe5;margin:0 0 .75rem">Gradient Overlay</h2><p style="font-size:.9375rem;color:rgba(246,239,229,0.75);margin:0;max-width:440px;line-height:1.6">A multi-stop gradient overlay ensures text remains readable on any background image.</p></div></div>' },
    },
  },
  {
    id: 'anim-bg-radial-glow',
    label: 'Radial Accent Glow Background',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'background', 'radial', 'glow', 'accent', 'ambient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Radial Glow',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;height:300px;background:#140c08;overflow:hidden"><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(99,139,255,0.2),transparent 70%)"></div><div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:center;height:100%;padding:2rem"><div style="padding:2rem;background:rgba(255,255,255,0.04);border:1px solid rgba(99,139,255,0.15);border-radius:1rem;backdrop-filter:blur(20px);text-align:center;max-width:380px"><h3 style="font-size:1.125rem;font-weight:600;color:#f6efe5;margin:0 0 .5rem">Ambient Glow</h3><p style="font-size:.8125rem;color:rgba(246,239,229,0.6);margin:0;line-height:1.6">A subtle radial gradient creates soft ambient lighting behind glass-effect cards.</p></div></div></div>' },
    },
  },
  {
    id: 'anim-bg-diagonal-gradient',
    label: 'Diagonal Gradient Overlay',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'background', 'diagonal', 'gradient', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Gradient',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;height:300px;background:#140c08;overflow:hidden"><div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(42,26,30,0.5) 0%,rgba(201,169,110,0.15) 60%,transparent 100%)"></div><div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem"><h2 style="font-size:clamp(1.25rem,3vw,2rem);font-weight:700;color:#f6efe5;margin:0 0 .5rem">Warm Diagonal Gradient</h2><p style="font-size:.875rem;color:rgba(246,239,229,0.6);margin:0;max-width:400px;line-height:1.6">A 135&deg; diagonal gradient creates a warm, premium ambient feel on dark backgrounds.</p></div></div>' },
    },
  },
  {
    id: 'anim-bg-gradient-text',
    label: 'Gradient Text Effect',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'text', 'gradient', 'background-clip', 'premium', 'heading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Text',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:200px;background:#140c08;padding:2rem;text-align:center"><h1 style="font-size:clamp(2rem,6vw,4rem);font-weight:800;line-height:1.1;margin:0 0 1rem;background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.6) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Premium Gradient</h1><p style="font-size:.875rem;color:rgba(246,239,229,0.5);margin:0;max-width:360px">Background-clip text creates a subtle fade effect on large headings for a refined look.</p></div>' },
    },
  },
  {
    id: 'anim-bg-animated-border',
    label: 'Animated Gradient Border',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'border', 'gradient', 'rotating', 'premium', 'card'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Animated Border',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:250px;background:#140c08;padding:2rem"><style>@property --bgab-angle{syntax:"<angle>";initial-value:0deg;inherits:false}@keyframes bgabRotate{to{--bgab-angle:360deg}}.bgab-card{position:relative;padding:2px;border-radius:1rem;background:conic-gradient(from var(--bgab-angle),#c8a97e,#638BFF,#c8a97e,#638BFF,#c8a97e);animation:bgabRotate 4s linear infinite}.bgab-inner{padding:2rem;background:#1a0e08;border-radius:calc(1rem - 2px);text-align:center}</style><div class="bgab-card"><div class="bgab-inner"><h3 style="font-size:1.125rem;font-weight:600;color:#f6efe5;margin:0 0 .5rem">Rotating Border</h3><p style="font-size:.8125rem;color:rgba(246,239,229,0.6);margin:0;line-height:1.6">Conic gradient + @property creates a smoothly rotating border. Works in modern browsers.</p></div></div></div>' },
    },
  },
  {
    id: 'anim-bg-video-placeholder',
    label: 'Video Background Hero',
    category: 'animations', subcategory: 'backgrounds',
    tags: ['animation', 'background', 'video', 'hero', 'fullscreen'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Video BG Hero',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: { html: '<div style="position:relative;height:400px;overflow:hidden"><style>@keyframes bgvpShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}</style><div style="position:absolute;inset:0;background:linear-gradient(135deg,#140c08,#2c1e14,#4a2711,#1a0e08,#2c1e14);background-size:400% 400%;animation:bgvpShift 8s ease infinite"></div><div style="position:absolute;inset:0;background:rgba(20,12,8,0.55)"></div><div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem"><h2 style="font-size:clamp(1.5rem,5vw,3rem);font-weight:800;color:#f6efe5;margin:0 0 .75rem">Video Background</h2><p style="font-size:.9375rem;color:rgba(246,239,229,0.7);margin:0 0 1.5rem;max-width:480px;line-height:1.6">Animated gradient simulates a video background. Replace with a real &lt;video&gt; element in production.</p><span style="display:inline-block;padding:.625rem 1.5rem;background:rgba(200,169,126,0.15);border:1px solid #c8a97e;border-radius:2rem;color:#c8a97e;font-size:.8125rem;font-weight:500;letter-spacing:.03em">Watch Reel</span></div></div>' },
    },
  },
]

// ─── LINK EFFECTS ───

const LINK_EFFECTS: LibraryElementItem[] = [
  {
    id: 'anim-link-text-mask',
    label: 'Text Mask Slide-Up',
    category: 'animations', subcategory: 'link-effects',
    tags: ['animation', 'link', 'text-mask', 'slide', 'hover', 'premium', 'footer'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Mask Slide',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;gap:.75rem;padding:2rem;background:#140c08"><style>.ltms-link{position:relative;display:block;overflow:hidden;height:1.5em;line-height:1.5em;cursor:pointer;width:fit-content}.ltms-main{display:block;color:#f6efe5;font-size:1rem;transition:transform .3s ease}.ltms-alt{position:absolute;top:100%;left:0;display:block;color:#c8a97e;font-size:1rem;transition:transform .3s ease}.ltms-link:hover .ltms-main,.ltms-link:hover .ltms-alt{transform:translateY(-100%)}</style><div class="ltms-link"><span class="ltms-main">Architecture &amp; Design</span><span class="ltms-alt">Architecture &amp; Design</span></div><div class="ltms-link"><span class="ltms-main">Interior Projects</span><span class="ltms-alt">Interior Projects</span></div><div class="ltms-link"><span class="ltms-main">Luxury Residences</span><span class="ltms-alt">Luxury Residences</span></div><div class="ltms-link"><span class="ltms-main">Contact Studio</span><span class="ltms-alt">Contact Studio</span></div></div>' },
    },
  },
  {
    id: 'anim-link-padding-indent',
    label: 'Link Hover Indent',
    category: 'animations', subcategory: 'link-effects',
    tags: ['animation', 'link', 'padding', 'indent', 'hover', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover Indent',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;gap:.5rem;padding:2rem;background:#140c08"><style>.lpi-link{display:block;padding:.375rem 0;padding-left:0;color:#a1a1aa;font-size:1rem;text-decoration:none;cursor:pointer;transition:padding .5s ease,color .5s ease}.lpi-link:hover{padding-left:10px;color:#f6efe5}</style><a class="lpi-link">Services</a><a class="lpi-link">Portfolio</a><a class="lpi-link">About Us</a><a class="lpi-link">Get in Touch</a></div>' },
    },
  },
  {
    id: 'anim-link-social-scale',
    label: 'Social Icon Scale Hover',
    category: 'animations', subcategory: 'link-effects',
    tags: ['animation', 'icon', 'social', 'scale', 'hover'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Social Scale',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:1rem;padding:2rem;background:#140c08"><style>.lss-icon{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(246,239,229,0.1);color:#f6efe5;font-size:.875rem;font-weight:600;cursor:pointer;transition:transform .5s ease,background .5s ease;backdrop-filter:blur(10px)}.lss-icon:hover{transform:scale(1.2);background:rgba(200,169,126,0.15)}</style><div class="lss-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg></div><div class="lss-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div><div class="lss-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l6.5 7.5M20 4l-6.5 7.5m0 0L20 20M13.5 11.5L4 20"/></svg></div><div class="lss-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div></div>' },
    },
  },
  {
    id: 'anim-link-caption-reveal',
    label: 'Image Caption Reveal',
    category: 'animations', subcategory: 'link-effects',
    tags: ['animation', 'image', 'caption', 'reveal', 'hover', 'overlay', 'gallery'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Caption Reveal',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>.lcr-wrap{position:relative;width:320px;height:240px;border-radius:.75rem;overflow:hidden;cursor:pointer}.lcr-img{width:100%;height:100%;background:linear-gradient(135deg,#2c1e14,#4a2711,#1a0e08);transition:transform .5s ease}.lcr-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:1.5rem;opacity:0;background:linear-gradient(180deg,transparent 40%,rgba(20,12,8,0.85) 100%);backdrop-filter:blur(2px);transition:opacity .5s ease}.lcr-wrap:hover .lcr-img{transform:scale(1.05)}.lcr-wrap:hover .lcr-overlay{opacity:1}</style><div class="lcr-wrap"><div class="lcr-img"></div><div class="lcr-overlay"><h4 style="font-size:1rem;font-weight:600;color:#f6efe5;margin:0 0 .25rem">Project Title</h4><p style="font-size:.75rem;color:#c8a97e;margin:0">Architecture &bull; 2026</p></div></div></div>' },
    },
  },
  {
    id: 'anim-link-card-lift',
    label: 'Card Shadow Lift',
    category: 'animations', subcategory: 'link-effects',
    tags: ['animation', 'card', 'shadow', 'lift', 'hover', 'elevation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Card Lift',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>.lcl-card{padding:2rem;max-width:320px;background:#1a0e08;border:1px solid rgba(200,169,126,0.1);border-radius:1rem;cursor:pointer;transition:all .3s ease;box-shadow:0 2px 8px rgba(0,0,0,0.06)}.lcl-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.12);border-color:rgba(200,169,126,0.2)}</style><div class="lcl-card"><h3 style="font-size:1.125rem;font-weight:600;color:#f6efe5;margin:0 0 .5rem">Premium Card</h3><p style="font-size:.8125rem;color:rgba(246,239,229,0.6);margin:0 0 1rem;line-height:1.6">Hover to see the card lift with an expanding shadow, creating a sense of elevation and interactivity.</p><span style="font-size:.75rem;color:#c8a97e;font-weight:500">Learn more &rarr;</span></div></div>' },
    },
  },
]

// ─── KEYFRAME EFFECTS ───

const KEYFRAME_EFFECTS: LibraryElementItem[] = [
  {
    id: 'anim-ken-burns-drift',
    label: 'Ken Burns Zoom Drift',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'ken-burns', 'zoom', 'drift', 'image', 'cinematic', 'slow'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Ken Burns Zoom Drift',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>@keyframes kb-drift{0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.06) translate(-0.5%,-0.3%)}100%{transform:scale(1.03) translate(0.3%,0.2%)}}.kb-wrap{width:360px;height:240px;border-radius:1rem;overflow:hidden;border:1px solid rgba(200,169,126,0.15)}.kb-img{width:100%;height:100%;background:linear-gradient(135deg,#2c1e14 0%,#4a2711 40%,#c8a97e 70%,#1a0e08 100%);animation:kb-drift 12s ease-in-out infinite}</style><div class="kb-wrap"><div class="kb-img"></div></div></div>' },
    },
  },
  {
    id: 'anim-iris-wipe',
    label: 'Iris Circular Wipe',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'iris', 'wipe', 'clip-path', 'circle', 'reveal', 'cinematic'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Iris Circular Wipe',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:2rem;background:#140c08"><style>@keyframes iw-open{0%{clip-path:circle(0% at 50% 50%)}100%{clip-path:circle(150% at 50% 50%)}}.iw-box{width:320px;height:200px;border-radius:.75rem;background:linear-gradient(135deg,#c8a97e,#4a2711,#638BFF);clip-path:circle(0% at 50% 50%)}.iw-box.iw-play{animation:iw-open 1.4s cubic-bezier(0.76,0,0.24,1) forwards}</style><div class="iw-box iw-play" id="iwBox"></div><button onclick="var e=document.getElementById(\'iwBox\');e.classList.remove(\'iw-play\');void e.offsetWidth;e.classList.add(\'iw-play\')" style="padding:.5rem 1.25rem;background:rgba(200,169,126,0.15);border:1px solid rgba(200,169,126,0.25);border-radius:.5rem;color:#c8a97e;font-size:.75rem;cursor:pointer;transition:background .2s">Replay</button></div>' },
    },
  },
  {
    id: 'anim-float-organic',
    label: 'Organic Floating',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'float', 'organic', 'petal', 'gentle', 'infinite'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Organic Floating',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="position:relative;display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08;min-height:280px;overflow:hidden"><style>@keyframes fo-a{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(6px,-14px) rotate(5deg)}50%{transform:translate(-3px,-8px) rotate(-2deg)}75%{transform:translate(4px,-4px) rotate(3deg)}}@keyframes fo-b{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(-8px,-18px) rotate(-6deg)}66%{transform:translate(5px,-10px) rotate(3deg)}}@keyframes fo-c{0%,100%{transform:translate(0,0) rotate(0deg) scale(1)}50%{transform:translate(10px,-16px) rotate(8deg) scale(1.05)}}.fo-s{position:absolute;border-radius:50%}.fo-s1{width:16px;height:16px;background:rgba(200,169,126,0.2);top:60%;left:25%;animation:fo-a 7s ease-in-out infinite}.fo-s2{width:12px;height:12px;background:rgba(200,169,126,0.15);top:40%;left:55%;border-radius:3px;animation:fo-b 9s ease-in-out infinite}.fo-s3{width:20px;height:20px;background:rgba(200,169,126,0.25);top:65%;left:70%;animation:fo-c 8s ease-in-out infinite}</style><div class="fo-s fo-s1"></div><div class="fo-s fo-s2"></div><div class="fo-s fo-s3"></div><span style="color:#f6efe5;font-size:.8125rem;opacity:.5;position:relative;z-index:1">Organic Floating Shapes</span></div>' },
    },
  },
  {
    id: 'anim-blob-breathe',
    label: 'Blob Breathe',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'blob', 'breathe', 'clip-path', 'organic', 'ambient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Blob Breathe',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>@keyframes bb-breathe{0%,100%{clip-path:ellipse(85% 48% at 45% 50%)}50%{clip-path:ellipse(87% 50% at 47% 50%)}}.bb-blob{width:320px;height:220px;background:linear-gradient(135deg,#c8a97e,#4a2711);border-radius:1rem;animation:bb-breathe 8s ease-in-out infinite}</style><div class="bb-blob"></div></div>' },
    },
  },
  {
    id: 'anim-shimmer-line',
    label: 'Shimmer Line Sweep',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'shimmer', 'line', 'sweep', 'gradient', 'loading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Shimmer Line Sweep',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:2rem;background:#140c08"><style>@keyframes sl-shimmer{0%{background-position:-200% center}100%{background-position:200% center}}.sl-line{width:280px;height:2px;border-radius:1px;background:linear-gradient(90deg,transparent,rgba(200,169,126,0.5),transparent);background-size:200% 100%;animation:sl-shimmer 3s ease infinite}</style><div class="sl-line"></div><span style="color:rgba(246,239,229,0.4);font-size:.75rem">Shimmer Line Sweep</span></div>' },
    },
  },
  {
    id: 'anim-star-fill-bounce',
    label: 'Star Fill with Bounce',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'star', 'fill', 'bounce', 'rating', 'sequential'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Star Fill Bounce',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:.5rem;padding:2rem;background:#140c08"><style>@keyframes sf-fill{0%{opacity:0;transform:scale(0.3)}60%{opacity:1;transform:scale(1.15)}100%{opacity:1;transform:scale(1)}}.sf-star{font-size:2rem;opacity:0;animation:sf-fill .5s cubic-bezier(.25,.46,.45,.94) forwards}.sf-star:nth-child(1){animation-delay:0s}.sf-star:nth-child(2){animation-delay:.15s}.sf-star:nth-child(3){animation-delay:.3s}.sf-star:nth-child(4){animation-delay:.45s}.sf-star:nth-child(5){animation-delay:.6s}</style><span class="sf-star" style="color:#c8a97e">&#9733;</span><span class="sf-star" style="color:#c8a97e">&#9733;</span><span class="sf-star" style="color:#c8a97e">&#9733;</span><span class="sf-star" style="color:#c8a97e">&#9733;</span><span class="sf-star" style="color:#c8a97e">&#9733;</span></div>' },
    },
  },
  {
    id: 'anim-scan-line',
    label: 'Grid Scan Line',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'scan', 'line', 'grid', 'tech', 'cyberpunk'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Grid Scan Line',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>@keyframes gs-scan{0%{top:-2%}100%{top:102%}}.gs-wrap{position:relative;width:320px;height:220px;border-radius:.75rem;overflow:hidden;background-image:linear-gradient(rgba(99,139,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,139,255,0.06) 1px,transparent 1px);background-size:24px 24px;border:1px solid rgba(99,139,255,0.1)}.gs-line{position:absolute;left:0;width:100%;height:1px;background:rgba(99,139,255,0.4);box-shadow:0 0 12px 2px rgba(99,139,255,0.25);animation:gs-scan 8s ease-in-out infinite}</style><div class="gs-wrap"><div class="gs-line"></div></div></div>' },
    },
  },
  {
    id: 'anim-pulse-node',
    label: 'Pulse Grid Node',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'pulse', 'node', 'grid', 'dot', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pulse Grid Node',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>@keyframes pn-pulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.8)}}.pn-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:16px;padding:1.5rem}.pn-dot{width:4px;height:4px;border-radius:50%;background:#638BFF;opacity:.3}.pn-dot.pn-active{animation:pn-pulse 3s ease-in-out infinite}</style><div class="pn-grid"><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:0s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:1.2s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:0.6s"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:2.1s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:1.8s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:0.9s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot pn-active" style="animation-delay:1.5s"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div><div class="pn-dot"></div></div></div>' },
    },
  },
  {
    id: 'anim-title-bloom',
    label: 'Title Bloom Entrance',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'title', 'bloom', 'entrance', 'scale', 'bounce'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Title Bloom Entrance',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;background:#140c08"><style>@keyframes tb-bloom{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}.tb-title{font-size:2.5rem;font-weight:700;color:#f6efe5;letter-spacing:-.02em;opacity:0;animation:tb-bloom .7s cubic-bezier(0.34,1.56,0.64,1) .3s forwards}</style><h2 class="tb-title">Premium Quality</h2></div>' },
    },
  },
  {
    id: 'anim-gradient-btn-fill',
    label: 'Gradient Button Fill (Petale)',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'button', 'gradient', 'fill', 'translate', 'petale', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Button Fill',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>.gb-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:.875rem 2.25rem;border:1px solid rgba(200,169,126,0.3);border-radius:.5rem;background:transparent;cursor:pointer;overflow:hidden;text-decoration:none;transition:border-color .3s}.gb-btn:hover{border-color:rgba(200,169,126,0.5)}.gb-fill{position:absolute;inset:0;background:linear-gradient(135deg,#D4A574,#c4955e);transform:translateX(-102%);transition:transform .45s cubic-bezier(0.25,0.46,0.45,0.94)}.gb-btn:hover .gb-fill{transform:translateX(0)}.gb-text{position:relative;z-index:1;font-size:.875rem;font-weight:500;color:#c8a97e;letter-spacing:.03em;transition:color .35s}.gb-btn:hover .gb-text{color:#140c08}</style><a class="gb-btn"><div class="gb-fill"></div><span class="gb-text">Discover More</span></a></div>' },
    },
  },
  {
    id: 'anim-text-shadow-glow',
    label: 'Interactive Text Shadow Glow',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'text', 'shadow', 'glow', 'hover', 'interactive', 'gold'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Shadow Glow',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;background:#140c08"><style>.tg-heading{font-size:2rem;font-weight:700;color:#f6efe5;letter-spacing:-.01em;cursor:pointer;transition:text-shadow .4s ease,letter-spacing .4s ease}.tg-heading:hover{text-shadow:0 0 20px rgba(212,165,116,0.4);letter-spacing:.04em}</style><h2 class="tg-heading">Hover for Glow</h2></div>' },
    },
  },
  {
    id: 'anim-progress-fill-bar',
    label: 'Progress Fill Bar',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'progress', 'fill', 'bar', 'width', 'scaleX'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Progress Fill Bar',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;gap:1.25rem;padding:2rem;background:#140c08;max-width:400px;margin:0 auto"><style>@keyframes pf-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}.pf-row{display:flex;flex-direction:column;gap:.375rem}.pf-label{display:flex;justify-content:space-between;font-size:.75rem;color:rgba(246,239,229,0.6)}.pf-track{height:6px;background:rgba(200,169,126,0.08);border-radius:3px;overflow:hidden}.pf-bar{height:100%;border-radius:3px;transform-origin:left;transform:scaleX(0);animation:pf-fill 1.2s cubic-bezier(.25,.46,.45,.94) forwards}.pf-bar1{width:75%;background:linear-gradient(90deg,#c8a97e,#D4A574);animation-delay:.2s}.pf-bar2{width:90%;background:linear-gradient(90deg,#638BFF,#8AACFF);animation-delay:.5s}.pf-bar3{width:60%;background:linear-gradient(90deg,#c8a97e,#638BFF);animation-delay:.8s}</style><div class="pf-row"><div class="pf-label"><span>Design</span><span>75%</span></div><div class="pf-track"><div class="pf-bar pf-bar1"></div></div></div><div class="pf-row"><div class="pf-label"><span>Development</span><span>90%</span></div><div class="pf-track"><div class="pf-bar pf-bar2"></div></div></div><div class="pf-row"><div class="pf-label"><span>Branding</span><span>60%</span></div><div class="pf-track"><div class="pf-bar pf-bar3"></div></div></div></div>' },
    },
  },
  {
    id: 'anim-cta-glow-pulse',
    label: 'CTA Box-Shadow Glow Pulse',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'glow', 'pulse', 'box-shadow', 'cta', 'button', 'ambient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'CTA Box-Shadow Glow Pulse',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;background:#140c08"><style>@keyframes cgp-glow{0%,100%{box-shadow:0 0 20px rgba(99,139,255,0.15)}50%{box-shadow:0 0 40px rgba(99,139,255,0.3),0 0 80px rgba(99,139,255,0.1)}}.cgp-btn{display:inline-flex;align-items:center;justify-content:center;padding:.875rem 2.25rem;background:#638BFF;color:#fff;border:none;border-radius:.5rem;font-size:.9375rem;font-weight:600;letter-spacing:.02em;cursor:pointer;animation:cgp-glow 2s ease-in-out infinite;transition:transform .2s ease}.cgp-btn:hover{transform:translateY(-1px)}</style><button class="cgp-btn">Get Started</button></div>' },
    },
  },
  {
    id: 'anim-lens-float',
    label: 'Decorative Lens Float',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'lens', 'float', 'decorative', 'rotate', 'ambient', 'abstract'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Decorative Lens Float',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;display:flex;align-items:center;justify-content:center;padding:3rem;background:#140c08;min-height:300px;overflow:hidden"><style>@keyframes lf-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes lf-float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(180deg)}}.lf-ring{position:absolute;border-radius:50%;border:1px solid transparent}.lf-ring1{width:120px;height:120px;border-color:rgba(200,169,126,0.1);top:20%;left:15%;animation:lf-rotate 12s linear infinite}.lf-ring2{width:80px;height:80px;border-color:rgba(99,139,255,0.1);top:50%;right:20%;animation:lf-float 16s ease-in-out infinite}.lf-ring3{width:60px;height:60px;background:radial-gradient(circle,transparent 55%,rgba(200,169,126,0.15) 56%,rgba(200,169,126,0.15) 58%,transparent 59%);top:35%;left:55%;animation:lf-rotate 12s linear infinite reverse}</style><div class="lf-ring lf-ring1"></div><div class="lf-ring lf-ring2"></div><div class="lf-ring lf-ring3"></div><span style="position:relative;z-index:1;color:rgba(246,239,229,0.4);font-size:.8125rem">Decorative Lens Float</span></div>' },
    },
  },
  {
    id: 'anim-dot-pulse-nav',
    label: 'Dot Pulse Navigation',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'dot', 'pulse', 'navigation', 'indicator', 'active'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dot Pulse Navigation',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:.75rem;padding:2rem;background:#140c08"><style>@keyframes dpn-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}.dpn-dot{width:10px;height:10px;border-radius:50%;background:rgba(246,239,229,0.2);cursor:pointer;transition:background .3s ease,transform .3s ease}.dpn-dot.dpn-active{width:12px;height:12px;background:#c8a97e;animation:dpn-pulse 1.5s ease infinite}</style><div class="dpn-dot dpn-active" id="dpnD0"></div><div class="dpn-dot" id="dpnD1"></div><div class="dpn-dot" id="dpnD2"></div><div class="dpn-dot" id="dpnD3"></div><div class="dpn-dot" id="dpnD4"></div><script>(function(){var dots=document.querySelectorAll(".dpn-dot");dots.forEach(function(d){d.addEventListener("click",function(){dots.forEach(function(x){x.classList.remove("dpn-active")});d.classList.add("dpn-active")})})})()</script></div>' },
    },
  },
  {
    id: 'anim-chevron-rotate',
    label: 'Chevron Toggle Rotation',
    category: 'animations', subcategory: 'keyframe-effects',
    tags: ['animation', 'chevron', 'rotate', 'toggle', 'accordion', 'dropdown', 'expand'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Chevron Toggle Rotation',
      defaultStyle: { width: '100%', minHeight: '220px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;gap:0;padding:2rem;background:#140c08;max-width:400px;margin:0 auto"><style>.ctr-item{border-bottom:1px solid rgba(246,239,229,0.08)}.ctr-header{display:flex;align-items:center;justify-content:space-between;padding:.875rem 0;cursor:pointer;transition:color .2s}.ctr-header:hover{color:#c8a97e}.ctr-label{font-size:.875rem;font-weight:500;color:#f6efe5}.ctr-chevron{font-size:.75rem;color:rgba(246,239,229,0.4);transition:transform .3s ease}.ctr-item.ctr-open .ctr-chevron{transform:rotate(180deg)}.ctr-body{max-height:0;overflow:hidden;transition:max-height .3s ease}.ctr-item.ctr-open .ctr-body{max-height:80px}.ctr-body-inner{padding:0 0 .875rem;font-size:.8125rem;color:rgba(246,239,229,0.5);line-height:1.6}</style><div class="ctr-item ctr-open" onclick="this.classList.toggle(\'ctr-open\')"><div class="ctr-header"><span class="ctr-label">What is included?</span><span class="ctr-chevron">&#9660;</span></div><div class="ctr-body"><div class="ctr-body-inner">Everything you need to get started with premium quality and support.</div></div></div><div class="ctr-item" onclick="this.classList.toggle(\'ctr-open\')"><div class="ctr-header"><span class="ctr-label">How does pricing work?</span><span class="ctr-chevron">&#9660;</span></div><div class="ctr-body"><div class="ctr-body-inner">Simple transparent pricing with no hidden fees or commitments.</div></div></div><div class="ctr-item" onclick="this.classList.toggle(\'ctr-open\')"><div class="ctr-header"><span class="ctr-label">Can I cancel anytime?</span><span class="ctr-chevron">&#9660;</span></div><div class="ctr-body"><div class="ctr-body-inner">Yes, you can cancel your subscription at any time with no penalties.</div></div></div></div>' },
    },
  },
]

// ─── CURSOR EFFECTS ───

const CURSOR_EFFECTS: LibraryElementItem[] = [
  {
    id: 'anim-magnetic-button',
    label: 'Magnetic Button',
    category: 'animations', subcategory: 'cursor',
    tags: ['animation', 'cursor', 'magnetic', 'button', 'hover', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Magnetic Button',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#0a0a0a;overflow:hidden"><style>.mgb-wrap{position:relative;display:inline-block}.mgb-btn{padding:1rem 2.5rem;background:transparent;border:1px solid #c8a97e;color:#f6efe5;font-size:.875rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:background .3s ease,transform .15s ease;border-radius:.5rem}.mgb-btn:hover{background:rgba(200,169,126,.12)}</style><div class="mgb-wrap" id="mgbWrap"><button class="mgb-btn" id="mgbBtn">Hover Near Me</button></div><script>(function(){var w=document.getElementById("mgbWrap"),b=document.getElementById("mgbBtn"),rect;function upd(e){rect=w.getBoundingClientRect();var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2,dx=e.clientX-cx,dy=e.clientY-cy,dist=Math.sqrt(dx*dx+dy*dy),maxD=180;if(dist<maxD){var f=(1-dist/maxD)*.35;b.style.transform="translate("+dx*f+"px,"+dy*f+"px)"}else{b.style.transform="translate(0,0)"}}document.addEventListener("mousemove",upd);w.addEventListener("mouseleave",function(){b.style.transform="translate(0,0)"})})()</script></div>' },
    },
  },
  {
    id: 'anim-custom-cursor',
    label: 'Custom Cursor Dot + Ring',
    category: 'animations', subcategory: 'cursor',
    tags: ['animation', 'cursor', 'custom', 'dot', 'ring', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Custom Cursor Dot + Ring',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="position:relative;min-height:250px;background:#0a0a0a;overflow:hidden;cursor:none" id="ccArea"><style>.cc-dot{position:absolute;width:6px;height:6px;background:#c8a97e;border-radius:50%;pointer-events:none;z-index:10;transition:transform .05s ease}.cc-ring{position:absolute;width:36px;height:36px;border:1.5px solid rgba(200,169,126,.5);border-radius:50%;pointer-events:none;z-index:10;transition:transform .12s ease,width .25s ease,height .25s ease,border-color .25s ease}.cc-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(246,239,229,.4);font-size:.8125rem;letter-spacing:.08em;text-transform:uppercase;pointer-events:none}</style><div class="cc-dot" id="ccDot"></div><div class="cc-ring" id="ccRing"></div><div class="cc-label">Move cursor here</div><div style="position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);padding:.75rem 2rem;border:1px solid rgba(200,169,126,.3);border-radius:.5rem;color:#f6efe5;font-size:.8125rem;cursor:none" id="ccHover" onmouseenter="document.getElementById(\'ccRing\').style.width=\'52px\';document.getElementById(\'ccRing\').style.height=\'52px\';document.getElementById(\'ccRing\').style.borderColor=\'#c8a97e\'" onmouseleave="document.getElementById(\'ccRing\').style.width=\'36px\';document.getElementById(\'ccRing\').style.height=\'36px\';document.getElementById(\'ccRing\').style.borderColor=\'rgba(200,169,126,.5)\'">Hover me</div><script>(function(){var a=document.getElementById("ccArea"),d=document.getElementById("ccDot"),r=document.getElementById("ccRing");a.addEventListener("mousemove",function(e){var rect=a.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;d.style.left=x-3+"px";d.style.top=y-3+"px";r.style.left=x-18+"px";r.style.top=y-18+"px"})})()</script></div>' },
    },
  },
  {
    id: 'anim-tilt-card-3d',
    label: '3D Tilt Card',
    category: 'animations', subcategory: 'cursor',
    tags: ['animation', 'cursor', 'tilt', '3d', 'perspective', 'card', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: '3D Tilt Card',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:300px;background:#0a0a0a;perspective:800px"><style>.tlt-card{width:280px;padding:2.5rem 2rem;background:linear-gradient(145deg,rgba(200,169,126,.08),rgba(200,169,126,.02));border:1px solid rgba(200,169,126,.15);border-radius:1rem;text-align:center;transition:transform .1s ease,box-shadow .3s ease;transform-style:preserve-3d;will-change:transform}.tlt-card:hover{box-shadow:0 20px 60px rgba(0,0,0,.4)}.tlt-icon{font-size:2rem;margin-bottom:1rem}.tlt-title{color:#f6efe5;font-size:1.125rem;font-weight:600;margin-bottom:.5rem}.tlt-desc{color:rgba(246,239,229,.5);font-size:.8125rem;line-height:1.6}</style><div class="tlt-card" id="tltCard"><div class="tlt-icon">&#9670;</div><div class="tlt-title">Premium Card</div><div class="tlt-desc">Move your mouse across this card to see the 3D tilt effect</div></div><script>(function(){var c=document.getElementById("tltCard");c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,rotY=(x-.5)*20,rotX=(y-.5)*-20;c.style.transform="rotateX("+rotX+"deg) rotateY("+rotY+"deg)"});c.addEventListener("mouseleave",function(){c.style.transform="rotateX(0) rotateY(0)"})})()</script></div>' },
    },
  },
  {
    id: 'anim-cursor-trail',
    label: 'Cursor Trail',
    category: 'animations', subcategory: 'cursor',
    tags: ['animation', 'cursor', 'trail', 'particles', 'dots', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Cursor Trail',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="position:relative;min-height:250px;background:#0a0a0a;overflow:hidden;cursor:crosshair" id="ctArea"><style>.ct-dot{position:absolute;width:8px;height:8px;background:#c8a97e;border-radius:50%;pointer-events:none;opacity:0;transition:none}.ct-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(246,239,229,.35);font-size:.8125rem;letter-spacing:.08em;text-transform:uppercase;pointer-events:none}</style><div class="ct-label">Move cursor to see trail</div><script>(function(){var a=document.getElementById("ctArea"),dots=[],N=16;for(var i=0;i<N;i++){var d=document.createElement("div");d.className="ct-dot";a.appendChild(d);dots.push({el:d,x:0,y:0})}var mx=-100,my=-100;a.addEventListener("mousemove",function(e){var r=a.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});function tick(){var px=mx,py=my;for(var i=0;i<N;i++){var d=dots[i];d.x+=(px-d.x)*.35;d.y+=(py-d.y)*.35;d.el.style.left=d.x-4+"px";d.el.style.top=d.y-4+"px";var s=1-i/N;d.el.style.opacity=s*.7;d.el.style.transform="scale("+s+")";px=d.x;py=d.y}requestAnimationFrame(tick)}tick()})()</script></div>' },
    },
  },
]

// ─── TEXT PREMIUM ───

const TEXT_PREMIUM: LibraryElementItem[] = [
  {
    id: 'anim-text-scramble',
    label: 'Text Scramble Effect',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'scramble', 'decode', 'glitch', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Scramble Effect',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#0a0a0a"><style>.tsc-text{color:#f6efe5;font-size:1.5rem;font-weight:600;letter-spacing:.04em;font-family:monospace;cursor:pointer;user-select:none}.tsc-text:hover{color:#c8a97e}</style><div class="tsc-text" id="tscEl">PREMIUM QUALITY</div><script>(function(){var el=document.getElementById("tscEl"),final="PREMIUM QUALITY",chars="!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",running=false;function scramble(){if(running)return;running=true;var iteration=0,interval=setInterval(function(){el.textContent=final.split("").map(function(c,i){if(i<iteration)return final[i];return chars[Math.floor(Math.random()*chars.length)]}).join("");if(iteration>=final.length){clearInterval(interval);running=false}iteration+=1/2},40)}el.addEventListener("mouseenter",scramble);scramble()})()</script></div>' },
    },
  },
  {
    id: 'anim-typewriter-pro',
    label: 'Typewriter Pro',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'typewriter', 'typing', 'cursor', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Typewriter Pro',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#0a0a0a"><style>.twp-wrap{font-size:1.25rem;color:#f6efe5;font-weight:500;letter-spacing:.02em}.twp-cursor{display:inline-block;width:2px;height:1.2em;background:#c8a97e;margin-left:2px;vertical-align:text-bottom;animation:twpBlink 1s step-end infinite}@keyframes twpBlink{0%,100%{opacity:1}50%{opacity:0}}</style><div class="twp-wrap"><span id="twpText"></span><span class="twp-cursor"></span></div><script>(function(){var el=document.getElementById("twpText"),phrases=["Building premium experiences.","Crafted with precision.","Designed for excellence."],pi=0,ci=0,deleting=false,speed=80;function tick(){var phrase=phrases[pi];if(!deleting){el.textContent=phrase.substring(0,ci+1);ci++;if(ci>=phrase.length){setTimeout(function(){deleting=true;tick()},2000);return}}else{el.textContent=phrase.substring(0,ci-1);ci--;if(ci<=0){deleting=false;pi=(pi+1)%phrases.length}}setTimeout(tick,deleting?40:speed)}tick()})()</script></div>' },
    },
  },
  {
    id: 'anim-text-highlight',
    label: 'Text Marker Highlight',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'highlight', 'marker', 'underline', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Marker Highlight',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#0a0a0a"><style>.tmh-text{color:#f6efe5;font-size:1.25rem;font-weight:500;line-height:1.8}.tmh-mark{background:linear-gradient(transparent 55%,rgba(200,169,126,.3) 55%);background-size:0% 100%;background-repeat:no-repeat;padding:0 .25rem;animation:tmhGrow 1.2s .5s cubic-bezier(.25,.46,.45,.94) forwards}@keyframes tmhGrow{to{background-size:100% 100%}}</style><div class="tmh-text">We create <span class="tmh-mark">premium digital</span> experiences that <span class="tmh-mark" style="animation-delay:.9s">stand out</span> from the crowd.</div></div>' },
    },
  },
  {
    id: 'anim-rotating-words',
    label: 'Rotating Words',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'rotating', 'words', 'cycle', 'swap', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Rotating Words',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#0a0a0a"><style>.rw-line{color:#f6efe5;font-size:1.25rem;font-weight:500;letter-spacing:.02em}.rw-slot{display:inline-block;position:relative;color:#c8a97e;min-width:120px;text-align:left}.rw-word{display:inline-block;opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease;position:absolute;left:0;white-space:nowrap}.rw-word.rw-active{opacity:1;transform:translateY(0);position:relative}</style><div class="rw-line">We build <span class="rw-slot" id="rwSlot"><span class="rw-word rw-active">stunning</span></span> websites.</div><script>(function(){var words=["stunning","premium","elegant","powerful","bespoke"],slot=document.getElementById("rwSlot"),idx=0;function next(){var prev=slot.querySelector(".rw-active");if(prev){prev.classList.remove("rw-active");prev.style.transform="translateY(-12px)";prev.style.opacity="0"}idx=(idx+1)%words.length;var el=document.createElement("span");el.className="rw-word";el.textContent=words[idx];slot.appendChild(el);requestAnimationFrame(function(){el.classList.add("rw-active")});setTimeout(function(){if(prev&&prev.parentNode)prev.parentNode.removeChild(prev)},500)}setInterval(next,2200)})()</script></div>' },
    },
  },
  {
    id: 'anim-circular-text',
    label: 'Circular Rotating Text',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'circular', 'rotate', 'badge', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Circular Rotating Text',
      defaultStyle: { width: '100%', minHeight: '220px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:220px;background:#0a0a0a"><style>.crt-wrap{position:relative;width:140px;height:140px;animation:crtSpin 12s linear infinite}@keyframes crtSpin{to{transform:rotate(360deg)}}.crt-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:rgba(200,169,126,.15);border:1px solid rgba(200,169,126,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c8a97e;font-size:.875rem;font-weight:700}</style><div class="crt-wrap" id="crtWrap"><div class="crt-center">JL</div></div><script>(function(){var w=document.getElementById("crtWrap"),text="PREMIUM STUDIO \u2022 CRAFTED WITH CARE \u2022 ",r=60;var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","-70 -70 140 140");svg.style.position="absolute";svg.style.top="0";svg.style.left="0";svg.style.width="100%";svg.style.height="100%";for(var i=0;i<text.length;i++){var angle=(i/text.length)*360-90;var rad=angle*Math.PI/180;var t=document.createElementNS("http://www.w3.org/2000/svg","text");t.setAttribute("x",Math.cos(rad)*r);t.setAttribute("y",Math.sin(rad)*r);t.setAttribute("text-anchor","middle");t.setAttribute("dominant-baseline","central");t.setAttribute("transform","rotate("+(angle+90)+" "+Math.cos(rad)*r+" "+Math.sin(rad)*r+")");t.setAttribute("fill","#f6efe5");t.setAttribute("font-size","8");t.setAttribute("font-weight","500");t.setAttribute("letter-spacing","1");t.textContent=text[i];svg.appendChild(t)}w.insertBefore(svg,w.firstChild)})()</script></div>' },
    },
  },
  {
    id: 'anim-text-clip-image',
    label: 'Text Clip Gradient',
    category: 'animations', subcategory: 'text-premium',
    tags: ['animation', 'text', 'clip', 'gradient', 'background', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Clip Gradient',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:160px;background:#0a0a0a"><style>.tcg-text{font-size:3rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;background:linear-gradient(135deg,#c8a97e 0%,#f6efe5 25%,#c8a97e 50%,#f6efe5 75%,#c8a97e 100%);background-size:300% 300%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:tcgShift 4s ease infinite}@keyframes tcgShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}</style><div class="tcg-text">LUXURY</div></div>' },
    },
  },
]

// ─── SCROLL PREMIUM ───

const SCROLL_PREMIUM: LibraryElementItem[] = [
  {
    id: 'anim-horizontal-scroll-pro',
    label: 'Horizontal Scroll Section',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'horizontal', 'panels', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Horizontal Scroll Section',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;height:350px;background:#0a0a0a;overflow:hidden" id="hsArea"><style>.hs-track{display:flex;height:100%;transition:transform .1s ease}.hs-panel{min-width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem}.hs-panel:nth-child(1){background:linear-gradient(135deg,rgba(200,169,126,.08),transparent)}.hs-panel:nth-child(2){background:linear-gradient(135deg,rgba(200,169,126,.15),transparent)}.hs-panel:nth-child(3){background:linear-gradient(135deg,rgba(200,169,126,.06),transparent)}.hs-panel:nth-child(4){background:linear-gradient(135deg,rgba(200,169,126,.12),transparent)}.hs-num{font-size:3rem;font-weight:700;color:#c8a97e}.hs-label{color:rgba(246,239,229,.5);font-size:.8125rem;letter-spacing:.1em;text-transform:uppercase}.hs-dots{position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);display:flex;gap:.5rem}.hs-dot{width:8px;height:8px;border-radius:50%;background:rgba(246,239,229,.15);transition:background .3s ease}.hs-dot.hs-active{background:#c8a97e}</style><div class="hs-track" id="hsTrack"><div class="hs-panel"><div class="hs-num">01</div><div class="hs-label">Strategy</div></div><div class="hs-panel"><div class="hs-num">02</div><div class="hs-label">Design</div></div><div class="hs-panel"><div class="hs-num">03</div><div class="hs-label">Develop</div></div><div class="hs-panel"><div class="hs-num">04</div><div class="hs-label">Launch</div></div></div><div class="hs-dots"><div class="hs-dot hs-active"></div><div class="hs-dot"></div><div class="hs-dot"></div><div class="hs-dot"></div></div><script>(function(){var area=document.getElementById("hsArea"),track=document.getElementById("hsTrack"),dots=area.querySelectorAll(".hs-dot"),idx=0,total=4;area.addEventListener("wheel",function(e){e.preventDefault();if(e.deltaY>0&&idx<total-1)idx++;else if(e.deltaY<0&&idx>0)idx--;track.style.transform="translateX(-"+idx*100+"%)";dots.forEach(function(d,i){d.classList.toggle("hs-active",i===idx)})},{passive:false})})()</script></div>' },
    },
  },
  {
    id: 'anim-stacked-cards',
    label: 'Stacked Cards Scroll',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'stacked', 'cards', 'sticky', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Stacked Cards Scroll',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;min-height:350px;background:#0a0a0a;overflow-y:auto;padding:2rem" id="scArea"><style>.sc-stack{position:relative;display:flex;flex-direction:column;align-items:center;gap:1rem;padding:1rem 0}.sc-card{width:300px;padding:2rem;border-radius:1rem;text-align:center;position:sticky;top:2rem;transition:transform .3s ease,opacity .3s ease}.sc-card:nth-child(1){background:linear-gradient(135deg,rgba(200,169,126,.15),rgba(200,169,126,.05));border:1px solid rgba(200,169,126,.2);z-index:3}.sc-card:nth-child(2){background:linear-gradient(135deg,rgba(200,169,126,.1),rgba(200,169,126,.03));border:1px solid rgba(200,169,126,.15);z-index:2;top:3rem}.sc-card:nth-child(3){background:linear-gradient(135deg,rgba(200,169,126,.06),rgba(200,169,126,.02));border:1px solid rgba(200,169,126,.1);z-index:1;top:4rem}.sc-title{color:#f6efe5;font-size:1.125rem;font-weight:600;margin-bottom:.5rem}.sc-desc{color:rgba(246,239,229,.45);font-size:.8125rem;line-height:1.6}</style><div class="sc-stack"><div class="sc-card"><div class="sc-title">Discovery</div><div class="sc-desc">Understanding your vision, goals and audience to build the perfect strategy.</div></div><div class="sc-card"><div class="sc-title">Creation</div><div class="sc-desc">Crafting pixel-perfect designs with attention to every detail.</div></div><div class="sc-card"><div class="sc-title">Delivery</div><div class="sc-desc">Deploying a polished, performant product that exceeds expectations.</div></div></div></div>' },
    },
  },
  {
    id: 'anim-snap-sections',
    label: 'Snap Scroll Sections',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'snap', 'sections', 'fullscreen', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Snap Scroll Sections',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="height:350px;overflow-y:auto;scroll-snap-type:y mandatory;background:#0a0a0a" id="snpWrap"><style>.snp-sec{height:350px;scroll-snap-align:start;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem}.snp-sec:nth-child(1){background:linear-gradient(180deg,rgba(200,169,126,.1),transparent)}.snp-sec:nth-child(2){background:linear-gradient(180deg,rgba(200,169,126,.05),rgba(200,169,126,.12))}.snp-sec:nth-child(3){background:linear-gradient(180deg,rgba(200,169,126,.12),rgba(200,169,126,.03))}.snp-num{font-size:2.5rem;font-weight:700;color:#c8a97e}.snp-title{color:#f6efe5;font-size:1rem;font-weight:500}.snp-hint{color:rgba(246,239,229,.3);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase}</style><div class="snp-sec"><div class="snp-num">01</div><div class="snp-title">First Section</div><div class="snp-hint">Scroll down</div></div><div class="snp-sec"><div class="snp-num">02</div><div class="snp-title">Second Section</div><div class="snp-hint">Keep scrolling</div></div><div class="snp-sec"><div class="snp-num">03</div><div class="snp-title">Third Section</div><div class="snp-hint">End</div></div></div>' },
    },
  },
  {
    id: 'anim-scroll-progress',
    label: 'Scroll Progress Bar',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'progress', 'bar', 'indicator', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Progress Bar',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;height:300px;overflow-y:auto;background:#0a0a0a" id="spbWrap"><style>.spb-bar{position:sticky;top:0;left:0;height:3px;background:#c8a97e;width:0%;z-index:10;transition:width .05s linear}.spb-content{padding:2rem;display:flex;flex-direction:column;gap:1.5rem}.spb-block{padding:1.5rem;background:rgba(200,169,126,.05);border:1px solid rgba(200,169,126,.1);border-radius:.75rem;color:rgba(246,239,229,.5);font-size:.8125rem;line-height:1.7}</style><div class="spb-bar" id="spbBar"></div><div class="spb-content"><div class="spb-block">Scroll this container to see the progress bar at the top fill up. This simulates a reading progress indicator commonly used on editorial and blog pages.</div><div class="spb-block">The bar tracks how far you have scrolled through the content area, providing a subtle visual cue of reading progress.</div><div class="spb-block">This pattern works beautifully for long-form content, articles, case studies, and documentation pages.</div><div class="spb-block">When combined with a sticky navigation, it creates an elegant and informative reading experience that users appreciate.</div><div class="spb-block">The golden accent color ties into the premium design language, maintaining visual consistency throughout the interface.</div></div><script>(function(){var w=document.getElementById("spbWrap"),b=document.getElementById("spbBar");w.addEventListener("scroll",function(){var pct=w.scrollTop/(w.scrollHeight-w.clientHeight)*100;b.style.width=pct+"%"})})()</script></div>' },
    },
  },
  {
    id: 'anim-parallax-multilayer',
    label: 'Parallax Multi-Layer',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'parallax', 'layers', 'depth', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Parallax Multi-Layer',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;height:350px;overflow-y:auto;background:#0a0a0a" id="pmlWrap"><style>.pml-scene{position:relative;height:700px;overflow:hidden}.pml-layer{position:absolute;width:100%;display:flex;align-items:center;justify-content:center;pointer-events:none}.pml-l1{top:50px;z-index:1}.pml-l2{top:150px;z-index:2}.pml-l3{top:280px;z-index:3}.pml-shape{border-radius:50%;opacity:.15}.pml-s1{width:200px;height:200px;background:radial-gradient(circle,#c8a97e,transparent)}.pml-s2{width:150px;height:150px;background:radial-gradient(circle,#f6efe5,transparent);opacity:.1}.pml-s3{width:100px;height:100px;background:radial-gradient(circle,#c8a97e,transparent);opacity:.2}.pml-title{position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);z-index:5;color:#f6efe5;font-size:1.5rem;font-weight:600;text-align:center;pointer-events:none}.pml-sub{color:rgba(246,239,229,.4);font-size:.8125rem;margin-top:.5rem}</style><div class="pml-scene"><div class="pml-title">Multi-Layer Parallax<div class="pml-sub">Scroll to see layers move at different speeds</div></div><div class="pml-layer pml-l1" id="pmlL1"><div class="pml-shape pml-s1"></div></div><div class="pml-layer pml-l2" id="pmlL2"><div class="pml-shape pml-s2"></div></div><div class="pml-layer pml-l3" id="pmlL3"><div class="pml-shape pml-s3"></div></div></div><script>(function(){var w=document.getElementById("pmlWrap"),l1=document.getElementById("pmlL1"),l2=document.getElementById("pmlL2"),l3=document.getElementById("pmlL3");w.addEventListener("scroll",function(){var s=w.scrollTop;l1.style.transform="translateY("+s*.1+"px)";l2.style.transform="translateY("+s*.3+"px)";l3.style.transform="translateY("+s*.5+"px)"})})()</script></div>' },
    },
  },
  {
    id: 'anim-pin-reveal-pro',
    label: 'Pin & Reveal Content',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'pin', 'reveal', 'sticky', 'progressive', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pin & Reveal Content',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;height:350px;overflow-y:auto;background:#0a0a0a" id="prWrap"><style>.pr-container{display:flex;min-height:700px}.pr-left{position:sticky;top:0;width:50%;height:350px;display:flex;align-items:center;justify-content:center;padding:2rem}.pr-right{width:50%;display:flex;flex-direction:column;gap:0}.pr-item{padding:3rem 2rem;border-bottom:1px solid rgba(200,169,126,.08);opacity:.3;transition:opacity .4s ease}.pr-item.pr-vis{opacity:1}.pr-num{color:#c8a97e;font-size:2rem;font-weight:700;margin-bottom:.5rem}.pr-txt{color:rgba(246,239,229,.6);font-size:.8125rem;line-height:1.6}.pr-big{color:#f6efe5;font-size:1.5rem;font-weight:600}.pr-sub{color:rgba(246,239,229,.4);font-size:.8125rem;margin-top:.5rem}</style><div class="pr-container"><div class="pr-left"><div><div class="pr-big">Our Process</div><div class="pr-sub">Scroll to reveal each step</div></div></div><div class="pr-right"><div class="pr-item pr-vis"><div class="pr-num">01</div><div class="pr-txt">Research and strategic planning phase to align vision with execution.</div></div><div class="pr-item"><div class="pr-num">02</div><div class="pr-txt">Design exploration with iterative prototyping and client feedback loops.</div></div><div class="pr-item"><div class="pr-num">03</div><div class="pr-txt">Development with clean architecture, performance optimization, and testing.</div></div><div class="pr-item"><div class="pr-num">04</div><div class="pr-txt">Launch, monitoring, and continuous refinement based on real data.</div></div></div></div><script>(function(){var w=document.getElementById("prWrap"),items=w.querySelectorAll(".pr-item");w.addEventListener("scroll",function(){items.forEach(function(it){var r=it.getBoundingClientRect(),wr=w.getBoundingClientRect();var vis=r.top<wr.bottom-50&&r.bottom>wr.top+50;it.classList.toggle("pr-vis",vis)})})})()</script></div>' },
    },
  },
  {
    id: 'anim-image-scale-scroll',
    label: 'Image Scale on Scroll',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'image', 'scale', 'zoom', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Scale on Scroll',
      defaultStyle: { width: '100%', minHeight: '350px' },
      defaultContent: { html: '<div style="position:relative;height:350px;overflow-y:auto;background:#0a0a0a" id="issWrap"><style>.iss-spacer{height:100px}.iss-img-wrap{display:flex;align-items:center;justify-content:center;padding:2rem;overflow:hidden;border-radius:1rem;margin:0 2rem}.iss-img{width:280px;height:180px;background:linear-gradient(135deg,rgba(200,169,126,.2),rgba(200,169,126,.05));border:1px solid rgba(200,169,126,.15);border-radius:.75rem;display:flex;align-items:center;justify-content:center;color:rgba(246,239,229,.4);font-size:.8125rem;letter-spacing:.05em;transform:scale(.8);opacity:.6;transition:transform .05s linear,opacity .05s linear}.iss-spacer-b{height:200px}</style><div class="iss-spacer"></div><div class="iss-img-wrap"><div class="iss-img" id="issImg">Scroll to Scale</div></div><div class="iss-spacer-b"></div><script>(function(){var w=document.getElementById("issWrap"),img=document.getElementById("issImg");w.addEventListener("scroll",function(){var r=img.getBoundingClientRect(),wr=w.getBoundingClientRect(),center=wr.top+wr.height/2,imgCenter=r.top+r.height/2,dist=Math.abs(center-imgCenter),maxDist=wr.height/2,progress=1-Math.min(dist/maxDist,1),scale=.8+progress*.2,opacity=.6+progress*.4;img.style.transform="scale("+scale+")";img.style.opacity=opacity})})()</script></div>' },
    },
  },
  {
    id: 'anim-number-counter-scroll',
    label: 'Number Counter on Scroll',
    category: 'animations', subcategory: 'scroll-premium',
    tags: ['animation', 'scroll', 'counter', 'number', 'stats', 'intersection', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Number Counter on Scroll',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:3rem;min-height:200px;background:#0a0a0a;padding:2rem" id="ncWrap"><style>.nc-stat{text-align:center}.nc-num{font-size:2.5rem;font-weight:700;color:#c8a97e;font-variant-numeric:tabular-nums}.nc-label{color:rgba(246,239,229,.4);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;margin-top:.25rem}.nc-plus{color:rgba(200,169,126,.6)}</style><div class="nc-stat"><div class="nc-num"><span id="ncN1">0</span><span class="nc-plus">+</span></div><div class="nc-label">Projects</div></div><div class="nc-stat"><div class="nc-num"><span id="ncN2">0</span><span class="nc-plus">%</span></div><div class="nc-label">Satisfaction</div></div><div class="nc-stat"><div class="nc-num"><span id="ncN3">0</span><span class="nc-plus">+</span></div><div class="nc-label">Clients</div></div><script>(function(){function animCount(el,target,dur){var start=0,startTime=null;function step(ts){if(!startTime)startTime=ts;var p=Math.min((ts-startTime)/dur,1);el.textContent=Math.floor(p*target);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){animCount(document.getElementById("ncN1"),2500,2000);animCount(document.getElementById("ncN2"),98,1800);animCount(document.getElementById("ncN3"),150,1600);obs.disconnect()}})},{threshold:.5});obs.observe(document.getElementById("ncWrap"))})()</script></div>' },
    },
  },
]

// ─── HOVER PREMIUM ───

const HOVER_PREMIUM: LibraryElementItem[] = [
  {
    id: 'anim-hover-reveal-image',
    label: 'Hover Reveal Image',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'reveal', 'image', 'cursor', 'link', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hover Reveal Image',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding:3rem;background:#0a0a0a;position:relative;overflow:hidden" id="hriWrap"><style>.hri-link{font-size:1.5rem;font-weight:600;color:#f6efe5;text-decoration:none;padding:.75rem 0;border-bottom:1px solid rgba(200,169,126,.1);width:100%;display:block;transition:color .3s ease;cursor:pointer;position:relative;z-index:2}.hri-link:hover{color:#c8a97e}.hri-preview{position:absolute;width:200px;height:130px;border-radius:.75rem;pointer-events:none;opacity:0;transition:opacity .25s ease;z-index:1;background-size:cover;background-position:center}</style><a class="hri-link" data-bg="linear-gradient(135deg,rgba(200,169,126,.3),rgba(200,169,126,.1))">Residential Projects</a><a class="hri-link" data-bg="linear-gradient(135deg,rgba(200,169,126,.15),rgba(100,80,50,.3))">Commercial Spaces</a><a class="hri-link" data-bg="linear-gradient(135deg,rgba(246,239,229,.1),rgba(200,169,126,.2))">Interior Design</a><div class="hri-preview" id="hriPrev"></div><script>(function(){var w=document.getElementById("hriWrap"),prev=document.getElementById("hriPrev"),links=w.querySelectorAll(".hri-link");links.forEach(function(l){l.addEventListener("mouseenter",function(){prev.style.background=l.dataset.bg;prev.style.opacity="1"});l.addEventListener("mousemove",function(e){var r=w.getBoundingClientRect();prev.style.left=e.clientX-r.left+20+"px";prev.style.top=e.clientY-r.top-65+"px"});l.addEventListener("mouseleave",function(){prev.style.opacity="0"})})})()</script></div>' },
    },
  },
  {
    id: 'anim-border-draw',
    label: 'Border Draw on Hover',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'border', 'draw', 'outline', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Border Draw on Hover',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:2rem;min-height:180px;background:#0a0a0a"><style>.bdr-box{position:relative;padding:1.5rem 2.5rem;color:#f6efe5;font-size:.875rem;font-weight:500;letter-spacing:.05em;cursor:pointer;background:transparent}.bdr-box::before,.bdr-box::after{content:"";position:absolute;width:0;height:0;border:1.5px solid transparent;transition:width .25s ease,height .25s ease,border-color 0s}.bdr-box::before{top:0;left:0;border-top-color:transparent;border-right-color:transparent}.bdr-box::after{bottom:0;right:0;border-bottom-color:transparent;border-left-color:transparent}.bdr-box:hover::before{width:100%;height:100%;border-top-color:#c8a97e;border-right-color:#c8a97e;transition:width .25s ease,height .25s ease .25s,border-color 0s}.bdr-box:hover::after{width:100%;height:100%;border-bottom-color:#c8a97e;border-left-color:#c8a97e;transition:width .25s ease,height .25s ease .25s,border-color 0s}</style><div class="bdr-box">Hover to Draw</div></div>' },
    },
  },
  {
    id: 'anim-underline-slide',
    label: 'Underline Slide',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'underline', 'slide', 'link', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Underline Slide',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:2.5rem;min-height:120px;background:#0a0a0a"><style>.uds-link{position:relative;color:#f6efe5;font-size:.9375rem;font-weight:500;text-decoration:none;cursor:pointer;padding-bottom:4px}.uds-link::after{content:"";position:absolute;bottom:0;left:0;width:0;height:1.5px;background:#c8a97e;transition:width .35s cubic-bezier(.25,.46,.45,.94)}.uds-link:hover::after{width:100%}.uds-link:not(:hover)::after{left:auto;right:0;transition:width .35s cubic-bezier(.25,.46,.45,.94)}</style><a class="uds-link">About</a><a class="uds-link">Services</a><a class="uds-link">Portfolio</a><a class="uds-link">Contact</a></div>' },
    },
  },
  {
    id: 'anim-image-distortion',
    label: 'Image Hover Distortion',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'image', 'distortion', 'wave', 'filter', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Hover Distortion',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:250px;background:#0a0a0a"><style>.imd-card{width:260px;height:180px;border-radius:.75rem;overflow:hidden;cursor:pointer;position:relative}.imd-inner{width:100%;height:100%;background:linear-gradient(135deg,rgba(200,169,126,.2),rgba(200,169,126,.05));display:flex;align-items:center;justify-content:center;color:rgba(246,239,229,.5);font-size:.8125rem;letter-spacing:.05em;transition:filter .4s ease,transform .4s ease;filter:none}.imd-card:hover .imd-inner{filter:url(#imdTurb);transform:scale(1.03)}.imd-card:hover .imd-overlay{opacity:1}</style><svg style="position:absolute;width:0;height:0"><defs><filter id="imdTurb"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg><div class="imd-card"><div class="imd-inner">Hover for Distortion</div></div></div>' },
    },
  },
  {
    id: 'anim-magnetic-link',
    label: 'Magnetic Link',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'magnetic', 'link', 'cursor', 'follow', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Magnetic Link',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;gap:3rem;min-height:120px;background:#0a0a0a"><style>.mgl-link{color:#f6efe5;font-size:1rem;font-weight:500;cursor:pointer;display:inline-block;transition:color .3s ease,transform .08s ease;letter-spacing:.02em}.mgl-link:hover{color:#c8a97e}</style><span class="mgl-link" id="mgl1">About</span><span class="mgl-link" id="mgl2">Work</span><span class="mgl-link" id="mgl3">Contact</span><script>(function(){document.querySelectorAll(".mgl-link").forEach(function(el){el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=(e.clientX-cx)*.25,dy=(e.clientY-cy)*.25;el.style.transform="translate("+dx+"px,"+dy+"px)"});el.addEventListener("mouseleave",function(){el.style.transform="translate(0,0)"})})})()</script></div>' },
    },
  },
  {
    id: 'anim-bg-clip-text-hover',
    label: 'Background Clip Text Hover',
    category: 'animations', subcategory: 'hover-premium',
    tags: ['animation', 'hover', 'text', 'clip', 'background', 'image', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Background Clip Text Hover',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;min-height:180px;background:#0a0a0a"><style>.bct-text{font-size:3.5rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#f6efe5;cursor:pointer;transition:all .4s ease;-webkit-background-clip:text;background-clip:text}.bct-text:hover{background:linear-gradient(135deg,#c8a97e,#e8d5b5,#c8a97e);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}</style><div class="bct-text">STUDIO</div></div>' },
    },
  },
]

// ─── SECTION TRANSITIONS ───

const SECTION_TRANSITIONS: LibraryElementItem[] = [
  {
    id: 'anim-clip-circle-reveal',
    label: 'Circle Clip Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'clip', 'circle', 'reveal', 'section', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Circle Clip Reveal',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="position:relative;min-height:250px;background:#0a0a0a;overflow:hidden"><style>.ccr-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(200,169,126,.15),rgba(200,169,126,.05));clip-path:circle(0% at 50% 50%);transition:clip-path .8s cubic-bezier(.25,.46,.45,.94)}.ccr-bg.ccr-vis{clip-path:circle(75% at 50% 50%)}.ccr-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:250px;flex-direction:column;gap:.5rem}.ccr-title{color:#f6efe5;font-size:1.25rem;font-weight:600}.ccr-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="ccr-bg" id="ccrBg"></div><div class="ccr-content"><div class="ccr-title">Circle Reveal</div><div class="ccr-sub">Revealed via expanding clip-path</div></div><script>(function(){var bg=document.getElementById("ccrBg");var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting)bg.classList.add("ccr-vis")})},{threshold:.3});obs.observe(bg)})()</script></div>' },
    },
  },
  {
    id: 'anim-curtain-wipe',
    label: 'Curtain Wipe Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'curtain', 'wipe', 'reveal', 'section', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Curtain Wipe Reveal',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="position:relative;min-height:250px;background:#0a0a0a;overflow:hidden"><style>.cwp-curtain{position:absolute;inset:0;background:#c8a97e;transform:translateY(0);z-index:3}.cwp-curtain.cwp-open{animation:cwpSlide .8s cubic-bezier(.65,.05,.36,1) forwards}@keyframes cwpSlide{to{transform:translateY(-100%)}}.cwp-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:250px;flex-direction:column;gap:.5rem}.cwp-title{color:#f6efe5;font-size:1.25rem;font-weight:600}.cwp-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="cwp-curtain" id="cwpCurtain"></div><div class="cwp-content"><div class="cwp-title">Curtain Wipe</div><div class="cwp-sub">Golden curtain slides away to reveal content</div></div><script>(function(){var c=document.getElementById("cwpCurtain");var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting)c.classList.add("cwp-open")})},{threshold:.3});obs.observe(c)})()</script></div>' },
    },
  },
  {
    id: 'anim-diagonal-slice',
    label: 'Diagonal Slice Transition',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'diagonal', 'slice', 'clip-path', 'section', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Slice Transition',
      defaultStyle: { width: '100%', minHeight: '250px' },
      defaultContent: { html: '<div style="position:relative;min-height:250px;overflow:hidden"><style>.dgs-top{min-height:125px;background:#0a0a0a;display:flex;align-items:center;justify-content:center;clip-path:polygon(0 0,100% 0,100% 80%,0 100%)}.dgs-bottom{min-height:125px;background:linear-gradient(135deg,rgba(200,169,126,.12),rgba(200,169,126,.04));display:flex;align-items:center;justify-content:center;clip-path:polygon(0 20%,100% 0,100% 100%,0 100%);margin-top:-25px}.dgs-text{color:#f6efe5;font-size:1rem;font-weight:500;letter-spacing:.04em}.dgs-text2{color:rgba(246,239,229,.5);font-size:.875rem}</style><div class="dgs-top"><div class="dgs-text">Section One</div></div><div class="dgs-bottom"><div class="dgs-text2">Section Two</div></div></div>' },
    },
  },
  {
    id: 'anim-color-block-reveal',
    label: 'Color Block Reveal',
    category: 'animations', subcategory: 'transitions',
    tags: ['animation', 'transition', 'color', 'block', 'reveal', 'wipe', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Color Block Reveal',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="position:relative;min-height:200px;background:#0a0a0a;overflow:hidden;display:flex;align-items:center;justify-content:center"><style>.cbr-block{position:absolute;inset:0;background:#c8a97e;transform:translateX(-101%);z-index:3}.cbr-block.cbr-go{animation:cbrIn .5s cubic-bezier(.65,.05,.36,1) forwards,cbrOut .5s cubic-bezier(.65,.05,.36,1) .5s forwards}@keyframes cbrIn{to{transform:translateX(0)}}@keyframes cbrOut{to{transform:translateX(101%)}}.cbr-content{opacity:0;transition:opacity .3s ease .5s;z-index:2;text-align:center}.cbr-content.cbr-show{opacity:1}.cbr-title{color:#f6efe5;font-size:1.25rem;font-weight:600;margin-bottom:.25rem}.cbr-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="cbr-block" id="cbrBlock"></div><div class="cbr-content" id="cbrContent"><div class="cbr-title">Block Reveal</div><div class="cbr-sub">Color block wipes through to reveal</div></div><script>(function(){var b=document.getElementById("cbrBlock"),c=document.getElementById("cbrContent");var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){b.classList.add("cbr-go");c.classList.add("cbr-show")}})},{threshold:.3});obs.observe(b)})()</script></div>' },
    },
  },
]

// ─── BACKGROUNDS PREMIUM ───

const BACKGROUNDS_PREMIUM: LibraryElementItem[] = [
  {
    id: 'anim-bg-aurora',
    label: 'Aurora Background',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'aurora', 'northern-lights', 'gradient', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Aurora Background',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;background:#0a0a0a;overflow:hidden"><style>.aur-layer{position:absolute;inset:0;opacity:.4;filter:blur(80px)}.aur-l1{background:radial-gradient(ellipse at 20% 50%,rgba(100,180,255,.4),transparent 60%);animation:aurDrift1 8s ease-in-out infinite alternate}.aur-l2{background:radial-gradient(ellipse at 60% 30%,rgba(130,100,220,.35),transparent 60%);animation:aurDrift2 10s ease-in-out infinite alternate}.aur-l3{background:radial-gradient(ellipse at 80% 70%,rgba(80,200,150,.3),transparent 60%);animation:aurDrift3 12s ease-in-out infinite alternate}@keyframes aurDrift1{0%{transform:translate(-10%,-5%) scale(1)}100%{transform:translate(15%,10%) scale(1.15)}}@keyframes aurDrift2{0%{transform:translate(10%,5%) scale(1.1)}100%{transform:translate(-15%,-8%) scale(0.95)}}@keyframes aurDrift3{0%{transform:translate(5%,-10%) scale(0.9)}100%{transform:translate(-10%,15%) scale(1.1)}}.aur-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem}.aur-title{color:#f6efe5;font-size:1.5rem;font-weight:600}.aur-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="aur-layer aur-l1"></div><div class="aur-layer aur-l2"></div><div class="aur-layer aur-l3"></div><div class="aur-content"><div class="aur-title">Aurora</div><div class="aur-sub">Animated northern lights effect</div></div></div>' },
    },
  },
  {
    id: 'anim-bg-mesh-gradient',
    label: 'Animated Mesh Gradient',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'mesh', 'gradient', 'organic', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Animated Mesh Gradient',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;overflow:hidden"><style>.amg-bg{position:absolute;inset:0;background:linear-gradient(45deg,#0a0a0a 0%,rgba(200,169,126,.08) 25%,#0a0a0a 50%,rgba(200,169,126,.12) 75%,#0a0a0a 100%);background-size:400% 400%;animation:amgShift 10s ease infinite}@keyframes amgShift{0%{background-position:0% 50%}25%{background-position:100% 0%}50%{background-position:100% 100%}75%{background-position:0% 100%}100%{background-position:0% 50%}}.amg-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.25}.amg-o1{width:200px;height:200px;background:#c8a97e;top:10%;left:20%;animation:amgFloat1 7s ease-in-out infinite alternate}.amg-o2{width:180px;height:180px;background:rgba(200,169,126,.6);bottom:10%;right:15%;animation:amgFloat2 9s ease-in-out infinite alternate}@keyframes amgFloat1{to{transform:translate(60px,40px)}}@keyframes amgFloat2{to{transform:translate(-50px,-30px)}}.amg-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem}.amg-title{color:#f6efe5;font-size:1.5rem;font-weight:600}.amg-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="amg-bg"></div><div class="amg-orb amg-o1"></div><div class="amg-orb amg-o2"></div><div class="amg-content"><div class="amg-title">Mesh Gradient</div><div class="amg-sub">Organic gradient with floating orbs</div></div></div>' },
    },
  },
  {
    id: 'anim-bg-particle-network',
    label: 'Particle Network',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'particles', 'network', 'canvas', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Particle Network',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;background:#0a0a0a;overflow:hidden"><canvas id="pnCanvas" style="position:absolute;inset:0;width:100%;height:100%"></canvas><div style="position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem"><div style="color:#f6efe5;font-size:1.5rem;font-weight:600">Particle Network</div><div style="color:rgba(246,239,229,.4);font-size:.8125rem">Connected dots with subtle movement</div></div><script>(function(){var c=document.getElementById("pnCanvas"),ctx=c.getContext("2d"),W,H,pts=[];function resize(){var r=c.parentElement.getBoundingClientRect();W=c.width=r.width;H=c.height=r.height}resize();window.addEventListener("resize",resize);for(var i=0;i<40;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle="rgba(200,169,126,.5)";ctx.fill();for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle="rgba(200,169,126,"+(1-d/120)*.15+")";ctx.stroke()}}}requestAnimationFrame(draw)}draw()})()</script></div>' },
    },
  },
  {
    id: 'anim-bg-floating-orbs',
    label: 'Floating Color Orbs',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'orbs', 'floating', 'blur', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Floating Color Orbs',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;background:#0a0a0a;overflow:hidden"><style>.fco-orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.3}.fco-o1{width:220px;height:220px;background:#c8a97e;top:-30px;left:10%;animation:fcoF1 8s ease-in-out infinite alternate}.fco-o2{width:180px;height:180px;background:rgba(100,150,200,.6);top:50%;right:5%;animation:fcoF2 10s ease-in-out infinite alternate}.fco-o3{width:160px;height:160px;background:rgba(180,120,200,.5);bottom:-20px;left:35%;animation:fcoF3 12s ease-in-out infinite alternate}.fco-o4{width:140px;height:140px;background:rgba(120,200,170,.4);top:20%;left:55%;animation:fcoF4 9s ease-in-out infinite alternate}@keyframes fcoF1{to{transform:translate(80px,60px) scale(1.1)}}@keyframes fcoF2{to{transform:translate(-60px,-40px) scale(.9)}}@keyframes fcoF3{to{transform:translate(50px,-50px) scale(1.15)}}@keyframes fcoF4{to{transform:translate(-40px,50px) scale(.85)}}.fco-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem}.fco-title{color:#f6efe5;font-size:1.5rem;font-weight:600}.fco-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="fco-orb fco-o1"></div><div class="fco-orb fco-o2"></div><div class="fco-orb fco-o3"></div><div class="fco-orb fco-o4"></div><div class="fco-content"><div class="fco-title">Floating Orbs</div><div class="fco-sub">Blurred color orbs drifting gently</div></div></div>' },
    },
  },
  {
    id: 'anim-bg-grid-distortion',
    label: 'Grid Distortion',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'grid', 'distortion', 'pattern', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Grid Distortion',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;background:#0a0a0a;overflow:hidden"><style>.grd-svg{position:absolute;inset:0;width:100%;height:100%;opacity:.15}.grd-line{stroke:rgba(200,169,126,.4);stroke-width:.5;fill:none}.grd-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem}.grd-title{color:#f6efe5;font-size:1.5rem;font-weight:600}.grd-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><svg class="grd-svg" id="grdSvg"></svg><div class="grd-content"><div class="grd-title">Grid Distortion</div><div class="grd-sub">Subtle warping grid pattern</div></div><script>(function(){var svg=document.getElementById("grdSvg"),W=600,H=300,gap=30;svg.setAttribute("viewBox","0 0 "+W+" "+H);var t=0;function draw(){t+=.005;while(svg.firstChild)svg.removeChild(svg.firstChild);for(var x=0;x<=W;x+=gap){var d="M";for(var y=0;y<=H;y+=5){var ox=Math.sin(y*.02+t*2+x*.01)*4;d+=(x+ox)+","+y+" "}var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d",d);p.setAttribute("class","grd-line");svg.appendChild(p)}for(var y=0;y<=H;y+=gap){var d="M";for(var x=0;x<=W;x+=5){var oy=Math.cos(x*.02+t*2+y*.01)*4;d+=x+","+(y+oy)+" "}var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d",d);p.setAttribute("class","grd-line");svg.appendChild(p)}requestAnimationFrame(draw)}draw()})()</script></div>' },
    },
  },
  {
    id: 'anim-bg-starfield',
    label: 'Starfield Parallax',
    category: 'animations', subcategory: 'backgrounds-premium',
    tags: ['animation', 'background', 'stars', 'starfield', 'parallax', 'space', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Starfield Parallax',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="position:relative;min-height:300px;background:#0a0a0a;overflow:hidden"><style>.sf-layer{position:absolute;inset:0;background-repeat:repeat}.sf-l1{background-image:radial-gradient(1px 1px at 50px 30px,rgba(246,239,229,.6),transparent),radial-gradient(1px 1px at 150px 80px,rgba(246,239,229,.5),transparent),radial-gradient(1px 1px at 280px 150px,rgba(246,239,229,.4),transparent),radial-gradient(1px 1px at 400px 50px,rgba(246,239,229,.5),transparent),radial-gradient(1px 1px at 520px 120px,rgba(246,239,229,.3),transparent),radial-gradient(1px 1px at 100px 200px,rgba(246,239,229,.6),transparent),radial-gradient(1px 1px at 350px 250px,rgba(246,239,229,.4),transparent),radial-gradient(1px 1px at 450px 180px,rgba(246,239,229,.5),transparent);background-size:600px 300px;animation:sfScroll1 25s linear infinite}@keyframes sfScroll1{to{background-position:600px 0}}.sf-l2{background-image:radial-gradient(1.5px 1.5px at 80px 60px,rgba(200,169,126,.5),transparent),radial-gradient(1.5px 1.5px at 220px 100px,rgba(200,169,126,.4),transparent),radial-gradient(1.5px 1.5px at 380px 200px,rgba(200,169,126,.3),transparent),radial-gradient(1.5px 1.5px at 500px 40px,rgba(200,169,126,.5),transparent),radial-gradient(1.5px 1.5px at 180px 240px,rgba(200,169,126,.4),transparent);background-size:600px 300px;animation:sfScroll2 18s linear infinite}@keyframes sfScroll2{to{background-position:600px 0}}.sf-l3{background-image:radial-gradient(2px 2px at 120px 90px,rgba(246,239,229,.7),transparent),radial-gradient(2px 2px at 350px 170px,rgba(246,239,229,.6),transparent),radial-gradient(2px 2px at 480px 60px,rgba(246,239,229,.5),transparent);background-size:600px 300px;animation:sfScroll3 12s linear infinite}@keyframes sfScroll3{to{background-position:600px 0}}.sf-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:.5rem}.sf-title{color:#f6efe5;font-size:1.5rem;font-weight:600}.sf-sub{color:rgba(246,239,229,.4);font-size:.8125rem}</style><div class="sf-layer sf-l1"></div><div class="sf-layer sf-l2"></div><div class="sf-layer sf-l3"></div><div class="sf-content"><div class="sf-title">Starfield</div><div class="sf-sub">Multi-layer parallax star field</div></div></div>' },
    },
  },
]

// ─── SITE-INSPIRED ANIMATIONS ───
// Premium presets inspired by Linear, Stripe, Apple, Vercel, Cuberto, Locomotive, Aman, Arc

const SITE_INSPIRED: LibraryElementItem[] = [
  {
    id: 'anim-spotlight-card',
    label: 'Spotlight Card (Linear)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'hover', 'spotlight', 'radial', 'gradient', 'card', 'linear', 'mouse-tracking', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Spotlight Card',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;min-height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-spot-card{position:relative;width:300px;height:200px;border-radius:.75rem;background:#141414;border:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;--mx:50%;--my:50%}.si-spot-card::before{content:"";position:absolute;inset:0;background:radial-gradient(300px circle at var(--mx) var(--my),rgba(99,102,241,.08),transparent);pointer-events:none;transition:opacity .3s}.si-spot-card:not(:hover)::before{opacity:0}.si-spot-title{color:#ededed;font-size:1rem;font-weight:600;letter-spacing:-.01em;z-index:1}.si-spot-sub{color:rgba(237,237,237,.45);font-size:.8rem;margin-top:.5rem;z-index:1}</style><div class="si-spot-card" id="siSpotCard"><span class="si-spot-title">Spotlight Effect</span><span class="si-spot-sub">Move your cursor over this card</span></div><script>(function(){var c=document.getElementById("siSpotCard");if(!c)return;c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})})()</script></div>' },
    },
  },
  {
    id: 'anim-rotating-gradient-border',
    label: 'Rotating Gradient Border (Stripe)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'border', 'gradient', 'rotating', 'conic', 'stripe', 'card', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Rotating Border',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;min-height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>@property --si-border-angle{syntax:"<angle>";initial-value:0deg;inherits:false}.si-rot-wrap{position:relative;width:280px;height:180px;border-radius:.875rem;padding:1px;background:conic-gradient(from var(--si-border-angle),transparent 30%,#818cf8 50%,#6366f1 55%,transparent 70%);animation:siRotBorder 4s linear infinite}.si-rot-inner{width:100%;height:100%;border-radius:calc(.875rem - 1px);background:#141414;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem}.si-rot-inner span:first-child{color:#ededed;font-size:1rem;font-weight:600}.si-rot-inner span:last-child{color:rgba(237,237,237,.4);font-size:.8rem}@keyframes siRotBorder{to{--si-border-angle:360deg}}</style><div class="si-rot-wrap"><div class="si-rot-inner"><span>Rotating Border</span><span>CSS @property magic</span></div></div></div>' },
    },
  },
  {
    id: 'anim-code-stagger',
    label: 'Code Lines Stagger (Vercel)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'stagger', 'code', 'vercel', 'entrance', 'lines', 'developer', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Code Stagger',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;min-height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-code-block{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:.625rem;padding:1.25rem 1.5rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem;line-height:1.8;width:340px}.si-code-line{opacity:0;transform:translateY(8px);animation:siCodeIn .5s ease forwards}.si-code-line:nth-child(1){animation-delay:0s}.si-code-line:nth-child(2){animation-delay:80ms}.si-code-line:nth-child(3){animation-delay:160ms}.si-code-line:nth-child(4){animation-delay:240ms}.si-code-line:nth-child(5){animation-delay:320ms}@keyframes siCodeIn{to{opacity:1;transform:translateY(0)}}.si-kw{color:#93c5fd}.si-str{color:#86efac}.si-fn{color:#c4b5fd}.si-txt{color:#d4d4d4}.si-cm{color:#6b7280}</style><div class="si-code-block"><div class="si-code-line"><span class="si-kw">const</span> <span class="si-txt">app</span> <span class="si-kw">=</span> <span class="si-fn">createApp</span><span class="si-txt">({</span></div><div class="si-code-line"><span class="si-txt">&nbsp;&nbsp;name: </span><span class="si-str">"JL Studio"</span><span class="si-txt">,</span></div><div class="si-code-line"><span class="si-txt">&nbsp;&nbsp;theme: </span><span class="si-str">"premium-dark"</span><span class="si-txt">,</span></div><div class="si-code-line"><span class="si-txt">&nbsp;&nbsp;quality: </span><span class="si-str">"irr&eacute;prochable"</span></div><div class="si-code-line"><span class="si-txt">})</span></div></div></div>' },
    },
  },
  {
    id: 'anim-clip-image-reveal',
    label: 'Clip-Path Image Reveal (Apple)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'clip-path', 'reveal', 'image', 'apple', 'hover', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Clip Image Reveal',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;min-height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-clip-wrap{width:320px;height:200px;border-radius:.75rem;overflow:hidden;cursor:pointer;position:relative}.si-clip-img{width:100%;height:100%;background:linear-gradient(135deg,#1e1b4b,#312e81,#4338ca,#6366f1);clip-path:inset(0 100% 0 0);transition:clip-path 1.2s cubic-bezier(.77,0,.175,1)}.si-clip-wrap:hover .si-clip-img{clip-path:inset(0 0 0 0)}.si-clip-label{position:absolute;bottom:1rem;left:1.25rem;color:#ededed;font-size:.85rem;font-weight:500;opacity:.7;pointer-events:none}</style><div class="si-clip-wrap"><div class="si-clip-img"></div><span class="si-clip-label">Hover to reveal</span></div></div>' },
    },
  },
  {
    id: 'anim-page-wipe-transition',
    label: 'Page Wipe Transition (Cuberto)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'transition', 'wipe', 'page', 'cuberto', 'fullscreen', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Page Wipe',
      defaultStyle: { width: '100%', minHeight: '260px' },
      defaultContent: { html: '<div style="width:100%;min-height:260px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-wipe-demo{position:relative;width:340px;height:220px;border-radius:.75rem;overflow:hidden;background:#111;border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center}.si-wipe-overlay{position:absolute;inset:0;background:#6366f1;transform:scaleY(0);transform-origin:bottom;z-index:2;pointer-events:none}.si-wipe-demo.si-wipe-active .si-wipe-overlay{animation:siWipeIn .6s cubic-bezier(.86,0,.07,1) forwards,siWipeOut .6s cubic-bezier(.86,0,.07,1) .6s forwards}@keyframes siWipeIn{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}@keyframes siWipeOut{from{transform:scaleY(1);transform-origin:top}to{transform:scaleY(0);transform-origin:top}}.si-wipe-btn{padding:.625rem 1.5rem;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);border-radius:.5rem;color:#a5b4fc;font-size:.8rem;font-weight:500;cursor:pointer;z-index:3;transition:background .2s}.si-wipe-btn:hover{background:rgba(99,102,241,.2)}</style><div class="si-wipe-demo" id="siWipeDemo"><div class="si-wipe-overlay"></div><button class="si-wipe-btn" id="siWipeBtn">Trigger Wipe</button></div><script>(function(){var d=document.getElementById("siWipeDemo"),b=document.getElementById("siWipeBtn");if(!d||!b)return;b.addEventListener("click",function(){d.classList.remove("si-wipe-active");void d.offsetWidth;d.classList.add("si-wipe-active");setTimeout(function(){d.classList.remove("si-wipe-active")},1400)})})()</script></div>' },
    },
  },
  {
    id: 'anim-elastic-press',
    label: 'Elastic Press Button (Arc)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'button', 'press', 'elastic', 'spring', 'arc', 'micro-interaction', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Elastic Press',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;min-height:160px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem;gap:1.5rem"><style>.si-elastic-btn{padding:.75rem 2rem;background:linear-gradient(135deg,#6366f1,#818cf8);border:none;border-radius:.625rem;color:#fff;font-size:.875rem;font-weight:600;letter-spacing:-.01em;cursor:pointer;transform:scale(1);transition:transform .4s cubic-bezier(.34,1.56,.64,1);user-select:none;-webkit-user-select:none}.si-elastic-btn:active{transform:scale(.96);transition:transform .1s ease}.si-elastic-btn:hover{box-shadow:0 0 24px rgba(99,102,241,.3)}.si-elastic-alt{padding:.75rem 2rem;background:transparent;border:1px solid rgba(237,237,237,.15);border-radius:.625rem;color:#ededed;font-size:.875rem;font-weight:500;cursor:pointer;transform:scale(1);transition:transform .4s cubic-bezier(.34,1.56,.64,1),border-color .2s;user-select:none;-webkit-user-select:none}.si-elastic-alt:active{transform:scale(.96);transition:transform .1s ease}.si-elastic-alt:hover{border-color:rgba(237,237,237,.3)}</style><button class="si-elastic-btn">Get Started</button><button class="si-elastic-alt">Learn More</button></div>' },
    },
  },
  {
    id: 'anim-stacked-sticky-cards',
    label: 'Stacked Sticky Cards (Locomotive)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'scroll', 'sticky', 'cards', 'stacked', 'locomotive', 'storytelling', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Sticky Stack',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: { html: '<div style="width:100%;display:flex;align-items:flex-start;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:1rem"><style>.si-sticky-scroll{width:360px;height:500px;overflow-y:auto;position:relative;border-radius:.75rem;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent}.si-sticky-scroll::-webkit-scrollbar{width:4px}.si-sticky-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}.si-sticky-spacer{height:200px}.si-sticky-card{position:sticky;width:320px;margin:0 auto;height:180px;border-radius:.75rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;border:1px solid rgba(255,255,255,.06);box-shadow:0 8px 32px rgba(0,0,0,.4)}.si-sticky-card:nth-child(1){top:20px;background:linear-gradient(135deg,#1e1b4b,#312e81)}.si-sticky-card:nth-child(2){top:40px;background:linear-gradient(135deg,#1a2e05,#365314)}.si-sticky-card:nth-child(3){top:60px;background:linear-gradient(135deg,#451a03,#78350f)}.si-sticky-card span:first-child{color:#ededed;font-size:.95rem;font-weight:600}.si-sticky-card span:last-child{color:rgba(237,237,237,.45);font-size:.75rem}.si-sticky-hint{text-align:center;color:rgba(237,237,237,.25);font-size:.7rem;padding:.75rem}</style><div class="si-sticky-scroll"><div class="si-sticky-hint">Scroll down &darr;</div><div class="si-sticky-card"><span>Design</span><span>Pixel-perfect interfaces</span></div><div class="si-sticky-spacer"></div><div class="si-sticky-card"><span>Develop</span><span>Production-grade code</span></div><div class="si-sticky-spacer"></div><div class="si-sticky-card"><span>Deploy</span><span>Ship to the world</span></div><div class="si-sticky-spacer"></div></div></div>' },
    },
  },
  {
    id: 'anim-ken-burns-ambient',
    label: 'Ken Burns Ambient (Aman)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'ken-burns', 'zoom', 'ambient', 'aman', 'luxury', 'image', 'slow', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Ken Burns',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<div style="width:100%;min-height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-kb-wrap{width:340px;height:200px;border-radius:.75rem;overflow:hidden;position:relative}.si-kb-img{width:100%;height:100%;background:linear-gradient(160deg,#0c0a09,#1c1917 30%,#292524 60%,#44403c);animation:siKenBurns 15s ease-in-out infinite alternate;transform-origin:center}.si-kb-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.6),transparent 50%);pointer-events:none}.si-kb-text{position:absolute;bottom:1.25rem;left:1.5rem;color:#ededed;font-size:.85rem;font-weight:500;letter-spacing:.05em;opacity:.7}@keyframes siKenBurns{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.05) translate(-1%,-1%)}}</style><div class="si-kb-wrap"><div class="si-kb-img"></div><div class="si-kb-overlay"></div><span class="si-kb-text">AMBIENT LUXURY</span></div></div>' },
    },
  },
  {
    id: 'anim-light-beam',
    label: 'Light Beam Sweep (Stripe)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'light', 'beam', 'sweep', 'stripe', 'ambient', 'dark', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Light Beam',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="width:100%;min-height:200px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-beam-card{position:relative;width:340px;height:160px;border-radius:.75rem;background:#111;border:1px solid rgba(255,255,255,.04);overflow:hidden;display:flex;align-items:center;justify-content:center}.si-beam-card::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.03) 45%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.03) 55%,transparent 60%);animation:siBeamDrift 8s ease-in-out infinite;pointer-events:none}@keyframes siBeamDrift{0%{transform:translateX(-30%) rotate(-15deg)}50%{transform:translateX(30%) rotate(-15deg)}100%{transform:translateX(-30%) rotate(-15deg)}}.si-beam-txt{color:#ededed;font-size:.9rem;font-weight:500;z-index:1;opacity:.6}</style><div class="si-beam-card"><span class="si-beam-txt">Subtle light beam</span></div></div>' },
    },
  },
  {
    id: 'anim-text-swap-hover',
    label: 'Text Swap Hover (Cuberto)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'text', 'swap', 'hover', 'cuberto', 'navigation', 'link', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Text Swap',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: { html: '<div style="width:100%;min-height:160px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem;gap:2.5rem"><style>.si-swap-link{position:relative;overflow:hidden;height:1.5em;display:inline-flex;flex-direction:column;cursor:pointer;text-decoration:none}.si-swap-link span{display:block;font-size:1.1rem;font-weight:500;letter-spacing:-.01em;transition:transform .4s cubic-bezier(.77,0,.175,1)}.si-swap-link span:first-child{color:#ededed}.si-swap-link span:last-child{color:#818cf8;position:absolute;top:100%}.si-swap-link:hover span{transform:translateY(-100%)}</style><a class="si-swap-link" href="#!"><span>Work</span><span>Work</span></a><a class="si-swap-link" href="#!"><span>About</span><span>About</span></a><a class="si-swap-link" href="#!"><span>Contact</span><span>Contact</span></a></div>' },
    },
  },
  {
    id: 'anim-list-hover-expand',
    label: 'List Hover Expand (Linear)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'list', 'hover', 'expand', 'linear', 'accordion', 'content', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'List Expand',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: { html: '<div style="width:100%;min-height:280px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem"><style>.si-xlist{width:360px;display:flex;flex-direction:column}.si-xlist-item{border-top:1px solid rgba(255,255,255,.06);padding:1rem 0;cursor:pointer}.si-xlist-item:last-child{border-bottom:1px solid rgba(255,255,255,.06)}.si-xlist-head{display:flex;align-items:center;gap:.75rem;transition:transform .35s cubic-bezier(.25,.46,.45,.94)}.si-xlist-num{color:rgba(237,237,237,.2);font-size:.75rem;font-weight:600;font-variant-numeric:tabular-nums;min-width:1.5rem}.si-xlist-title{color:#ededed;font-size:.95rem;font-weight:500}.si-xlist-desc{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.25,.46,.45,.94),opacity .35s;opacity:0;padding-left:2.25rem;color:rgba(237,237,237,.4);font-size:.8rem;line-height:1.6}.si-xlist-item:hover .si-xlist-head{transform:translateX(2rem)}.si-xlist-item:hover .si-xlist-desc{max-height:80px;opacity:1}</style><div class="si-xlist"><div class="si-xlist-item"><div class="si-xlist-head"><span class="si-xlist-num">01</span><span class="si-xlist-title">Strategy</span></div><div class="si-xlist-desc">Define goals, audience, and brand positioning for maximum impact.</div></div><div class="si-xlist-item"><div class="si-xlist-head"><span class="si-xlist-num">02</span><span class="si-xlist-title">Design</span></div><div class="si-xlist-desc">Craft pixel-perfect interfaces with premium attention to detail.</div></div><div class="si-xlist-item"><div class="si-xlist-head"><span class="si-xlist-num">03</span><span class="si-xlist-title">Development</span></div><div class="si-xlist-desc">Build with modern tech stack, optimized for performance.</div></div></div></div>' },
    },
  },
  {
    id: 'anim-glossy-cursor-reflection',
    label: 'Glossy Cursor Reflection (Apple)',
    category: 'animations', subcategory: 'site-inspired',
    tags: ['animation', 'hover', '3d', 'tilt', 'glossy', 'reflection', 'apple', 'mouse-tracking', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glossy Tilt',
      defaultStyle: { width: '100%', minHeight: '260px' },
      defaultContent: { html: '<div style="width:100%;min-height:260px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:.75rem;padding:2rem;perspective:900px"><style>.si-glossy-card{position:relative;width:300px;height:200px;border-radius:.875rem;background:linear-gradient(145deg,#18181b,#1f1f23);border:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;cursor:pointer;transform-style:preserve-3d;transition:transform .15s ease-out;overflow:hidden;--gx:50%;--gy:50%}.si-glossy-card::after{content:"";position:absolute;inset:0;background:radial-gradient(280px circle at var(--gx) var(--gy),rgba(255,255,255,.15),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none;border-radius:.875rem}.si-glossy-card:hover::after{opacity:1}.si-glossy-title{color:#ededed;font-size:1rem;font-weight:600;z-index:1}.si-glossy-sub{color:rgba(237,237,237,.4);font-size:.8rem;z-index:1}</style><div class="si-glossy-card" id="siGlossyCard"><span class="si-glossy-title">3D Glossy Card</span><span class="si-glossy-sub">Tilt + light reflection</span></div><script>(function(){var c=document.getElementById("siGlossyCard");if(!c)return;c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5;var y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateY("+x*15+"deg) rotateX("+(-y*15)+"deg)";c.style.setProperty("--gx",(e.clientX-r.left)+"px");c.style.setProperty("--gy",(e.clientY-r.top)+"px")});c.addEventListener("mouseleave",function(){c.style.transform="rotateY(0) rotateX(0)"})})()</script></div>' },
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
  ...MARQUEES,
  ...COUNTERS,
  ...SPECIAL,
  ...INTERACTIVE,
  ...TRANSITIONS,
  ...SCROLL_ADVANCED,
  ...IMAGE_ADVANCED,
  ...COMPOSITES,
  ...SLIDERS,
  ...UI_PATTERNS,
  ...BUTTON_HOVERS,
  ...BACKGROUNDS,
  ...LINK_EFFECTS,
  ...KEYFRAME_EFFECTS,
  ...CURSOR_EFFECTS,
  ...TEXT_PREMIUM,
  ...SCROLL_PREMIUM,
  ...HOVER_PREMIUM,
  ...SECTION_TRANSITIONS,
  ...BACKGROUNDS_PREMIUM,
  ...SITE_INSPIRED,
]
