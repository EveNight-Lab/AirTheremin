# DESIGN.md

This document defines the **UI / UX design contract** for projects based on this repository.
It is not a screenshot archive.

---

## Document Scope

This document covers:

- UI concept / tone
- design tokens (color, typography, spacing)
- component styling rules (variants, states)
- interaction / motion guidelines (at a high level)

It does **not** cover:

- logical structure and responsibility (→ STRUCTURE.md)
- state ownership and flow (→ STATE_FLOW.md)

---

## UI Concept

- **Keywords**:
- **Target vibe**:
- **What we avoid**:

---

## Color Palette

Define tokens and when to use them. Keep tokens stable; change usage rules before changing tokens.

- **Brand / Primary**:
- **Neutral**:
- **Semantic**:
  - success:
  - warning:
  - error:
- **Background / Surface**:

---

## Typography

Keep aligned with the project’s rem rules.

- **Font families**:
- **Base size**:
- **Scale**:
- **Line height**:

---

## Spacing & Layout

- **Spacing scale**:
- **Radius scale**:
- **Shadow / elevation**:
- **Grid / breakpoints**:

---

## Component Styling Rules

### Buttons

- Variants:
- Sizes:
- States (hover/active/disabled/loading):

### Inputs

- Variants:
- Validation states:

### Cards / Surfaces

- Surface rules:
- Border / shadow:

---

## Interaction & Motion (Optional)

- Transitions:
- Loading patterns:
- Empty states:
- Error states:

---

## AI Usage Rules

1. Before making UI/UX changes, check whether relevant rules/tokens are defined here.
2. If UI decisions are ambiguous, propose updates to DESIGN.md before implementing.
3. When UI tokens or component styling rules change, update DESIGN.md in the same task.
4. Update only when needed — not on every UI code change.
