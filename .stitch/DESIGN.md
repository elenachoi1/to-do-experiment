---
name: Momentum Todo
colors:
  background: '#ffffff'
  foreground: '#0a0a0a'
  surface: '#ffffff'
  surface-subtle: '#fafafa'
  primary: '#2253cf'
  on-primary: '#fafafa'
  accent: '#e9f0fe'
  on-accent: '#172f65'
  muted: '#f5f5f5'
  muted-foreground: '#737373'
  border: '#e5e5e5'
  focus-ring: '#4475e7'
  destructive: '#e7000b'
  priority-high-bg: '#fef2f2'
  priority-high-text: '#b91c1c'
  priority-medium-bg: '#fffbeb'
  priority-medium-text: '#b45309'
  priority-low-bg: '#f0f9ff'
  priority-low-text: '#0369a1'
typography:
  display:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  heading:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.025em
  body:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: '0'
rounded:
  sm: 0.375rem
  DEFAULT: 0.625rem
  lg: 0.75rem
  xl: 0.875rem
  2xl: 1rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 20px
  xl: 32px
  desktop-gutter: 32px
---

# Design System: Momentum Todo

**Project ID:** 10093180404268797687

## 1. Visual Theme & Atmosphere

Momentum is a calm, focused productivity workspace with the visual restraint of a polished desktop utility. Bright white working surfaces sit inside a barely tinted neutral canvas, while thin borders and a very soft shadow define structure without making the interface feel card-heavy. The overall atmosphere is precise, dependable, and quietly encouraging.

The interface is intentionally information-dense but not cramped. A persistent navigation rail establishes place, the main task list owns most of the visual area, and indigo-blue accents direct attention to primary actions, active navigation, dates, and progress. Color is functional: most of the product remains neutral, with compact red, amber, and sky treatments reserved for task priority.

## 2. Color Palette & Roles

### Primary Foundation

- **Paper White — `#ffffff`:** Application shell, task list, dialog, input, and card surfaces.
- **Soft Canvas — `#fafafa`:** Sidebar and the low-contrast page surround.
- **Quiet Gray — `#f5f5f5`:** Muted controls, empty-state icon surfaces, and subtle hover fills.
- **Hairline Gray — `#e5e5e5`:** Dividers, input outlines, task-row separators, and container boundaries.

### Accent & Interactive

- **Momentum Indigo — `#2253cf`:** Primary buttons, brand mark, date eyebrow, progress icon, and principal interactive emphasis.
- **Pale Indigo — `#e9f0fe`:** Active navigation and low-emphasis selected surfaces.
- **Deep Indigo Ink — `#172f65`:** Text and icons displayed on pale-indigo surfaces.
- **Focus Blue — `#4475e7`:** Accessible keyboard focus rings with visible offset.

### Typography & Text Hierarchy

- **Near Black — `#0a0a0a`:** Page headings, task titles, account name, and primary labels.
- **Neutral Ink — `#171717`:** Secondary control text on neutral fills.
- **Slate Gray — `#737373`:** Supporting descriptions, dates, counters, placeholders, and inactive navigation.

### Functional States

- **Critical Red — `#e7000b`:** Destructive actions and error emphasis.
- **High Priority:** pale red `#fef2f2` with dark red `#b91c1c` text.
- **Medium Priority:** pale amber `#fffbeb` with ochre `#b45309` text.
- **Low Priority:** pale sky `#f0f9ff` with blue `#0369a1` text.
- Completion is communicated by a checked control plus muted, struck-through text; never by color alone.

## 3. Typography Rules

### Hierarchy & Weights

Use **Geist Variable** throughout, falling back to Inter and system sans-serif. Its compact, modern forms support a productivity interface with excellent small-size legibility.

- View title: 30px/36px, semibold 600, tight tracking.
- Section and dialog titles: 18–20px, semibold 600, slightly tight tracking.
- Brand and compact headings: 16px/24px, semibold 600.
- Task titles and controls: 14px/20px, medium 500.
- Descriptions and helper text: 12px/16px or 14px/20px, regular 400, muted.
- Dates, counters, and metadata use tabular numerals where alignment matters.

### Spacing Principles

Headings use tight tracking to feel crisp; body text stays neutral and readable. A small 4px–8px gap separates a title from its supporting description. The date eyebrow is compact and medium weight, using primary blue to establish context without competing with the view title.

## 4. Component Stylings

### Buttons

Primary buttons use Momentum Indigo with white text, a 10px default radius, medium-weight 14px labels, and compact Lucide icons. Secondary buttons are white with hairline borders; ghost buttons are transparent until hover. Standard controls are approximately 36px high. Preserve clear focus rings and use restrained 150–200ms color transitions.

### Cards & Task Containers

The outer application shell uses a 16px radius, one-pixel border, clipped overflow, and a minimal ambient shadow. The task list is a single bordered 12px-radius container rather than a stack of floating cards. Rows are separated by hairlines, use 20px horizontal and 16px vertical padding, and receive only a faint neutral hover fill.

### Navigation

Desktop navigation is a fixed 256px left rail on Soft Canvas. The active item uses Pale Indigo with Deep Indigo Ink, while inactive items use muted gray and gain a light hover surface. Navigation rows are 40px high with 8px corners, 16px Lucide icons, and right-aligned counts. The brand mark is a 36px indigo rounded square paired with the Momentum name and a quiet workspace label.

### Inputs & Forms

Inputs are white with a one-pixel neutral border, 10px corners, 36px minimum height, and a visible blue focus ring. Search places a 16px icon inside the leading edge. Forms use persistent 14px medium labels and 8px label-to-control gaps. Dialog actions align right, with Cancel visually secondary to Save/Add.

### Task Rows, Badges, and Empty States

Each task row follows a stable horizontal rhythm: checkbox, flexible title/description block, optional priority badge, fixed-width due date, then overflow actions. Priority badges are compact pills with pale semantic backgrounds and dark semantic text. Empty states center a muted circular icon, concise heading, helpful sentence, and outlined Add Task action with generous vertical breathing room.

## 5. Layout Principles

### Grid & Structure

The desktop baseline targets 1280px and uses a centered application shell capped at 1440px. The page surround is 20px, the sidebar is 256px, and main content uses 32px horizontal gutters. A 76px top header contains search and account controls. The list content remains fluid while task metadata columns stay predictable.

### Whitespace Strategy

Use a 4px base unit, with recurring 8px, 12px, 16px, 20px, 24px, and 32px intervals. Major content areas use 32px padding; task rows use 16px vertical spacing. Generous negative space belongs around the view heading and empty states, while navigation and task data remain compact.

### Alignment & Visual Balance

Keep primary content left aligned. The task title block absorbs remaining row width, while badges, due dates, and overflow actions align consistently on the right. Search fills available header space but stops at a comfortable reading width. The Add Task action appears both in navigation and beside list filters to keep creation immediately reachable.

### Responsive Behavior & Touch

The current imported screen is intentionally desktop-first. Responsive redesigns should preserve the task list as the dominant surface rather than shrinking the desktop shell. At tablet size, reduce persistent secondary UI and allow navigation/details to use overlays. At mobile size, replace the fixed sidebar with a Sheet-style drawer, maintain at least 44px touch targets, keep Add Task visible, compact search/filter controls, stack or hide secondary task metadata intelligently, and prevent horizontal overflow.

## 6. Design System Notes for Stitch Generation

### Language to Use

Describe the product as calm, precise, desktop-productivity focused, bright, restrained, neutral, lightly bordered, and indigo-accented. Favor clear hierarchy and functional density over decorative illustration or strong gradients.

### Color References

Use Momentum Indigo only for primary actions, active context, and focus. Keep primary surfaces white, secondary surfaces near-white, borders neutral, and supporting copy gray. Reserve red, amber, and sky exclusively for semantic priority/status cues.

### Component Prompts

- “Create a focused task row with a checkbox, medium-weight title, muted one-line description, compact semantic priority pill, due date with a 14px calendar icon, and a ghost overflow action.”
- “Create a quiet productivity sidebar with a compact indigo brand mark, pale-indigo active navigation, right-aligned counts, a full-width Add Task button, and a small bordered progress card pinned to the bottom.”
- “Create a mobile task-list header that preserves search and Add Task, moves navigation into a Sheet drawer, and consolidates secondary filters into a compact overflow control.”

### Incremental Iteration

When generating responsive variants, preserve type hierarchy, color roles, task data, and control semantics. Change information architecture one breakpoint at a time. Do not introduce a new visual theme, oversized marketing typography, glassmorphism, gradients, or decorative imagery.
