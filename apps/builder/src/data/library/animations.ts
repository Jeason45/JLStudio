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
]
