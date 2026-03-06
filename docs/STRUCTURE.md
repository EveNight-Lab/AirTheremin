# STRUCTURE.md

This document defines **how project structure is described, maintained, and used**.
It is not a snapshot of the current file tree.

---

## Document Scope

This document describes the **logical and responsibility-based structure** of the project. It includes:

- **Page / screen structure** — which screens/areas exist, their hierarchy (e.g. 공용화면 → 헤드 박스 → …), and per-block **효과·해야 할 일** (and optionally 역할). No need to define "which component is responsible" here.
- **File / module contract** — which file or module owns which responsibility; exports and dependencies. Can be filled in gradually; you don’t have to know component boundaries upfront.

It does **not** define:

- state ownership
- data flow
- hook-level implementation details

Those concerns are defined separately in **STATE_FLOW.md**.

---

**Purpose:**

- **For humans:** Quick grasp of the whole; "what is this project divided into?", "why does this file exist?", "where are the responsibility boundaries?"
- **For AI:** Decide "which area?", "is it okay to touch this file?" — a **map** by domain / feature / responsibility.

All future projects based on this repository must:

- define their structure here before major implementation
- keep this document in sync when **responsibility or boundaries** change
- treat this document as the source of truth for **logical structure** (state/flow → STATE_FLOW.md)

---

## Structure Authoring Rules

- Structure is defined by **responsibility and role**, not by folder depth.
- Express as **root → children** (e.g. by page, feature, or domain). Intent and responsibility first; no need to match code order 1:1.
- UI layout and visual hierarchy are secondary and may change without structural updates.
- A file may be moved or renamed without changing its structural role.

---

## Page / Screen Structure (페이지·화면 구조도)

Describe the **logical layout of screens** as a hierarchy: shared areas first, then tab-specific or route-specific content. This is "what appears where" and "what each part does" — **not** which React component owns what (that is the File/Module section below).

**You do not need to define component responsibility or boundaries here.** Write only what you know: structure (what’s where), what happens when the user acts (효과), and rules/tasks that apply (해야 할 일). 역할/효과/해야 할 일 are all optional; add only what helps you or the AI.

**Format:** Indent by level. For each block (영역/박스/요소), you can add:

- **역할** — what this block is for (optional)
- **효과** — what happens when the user interacts (e.g. button → navigate, open panel)
- **해야 할 일** — tasks or rules this part must satisfy (e.g. "로그인 시에만 노출", "필터 변경 시 목록 갱신")

**Format example (fill in per project):**

```text
<공용 화면 또는 레이아웃>
- 상단 영역
  - 타이틀/로고 — 역할: …
  - 주요 액션 버튼 — 효과: … | 해야 할 일: …
- (필요 시) 필터/검색 영역
  - …
- 탭/뷰 전환 영역
  - …
~ 이하 화면·탭·라우트별로 프로젝트에 맞게 작성
```

Keep this section in sync when **screen layout or what a block does** changes. Per-element state and data flow → STATE_FLOW.md.

---

## File / Module Contract Template

Which **file or component** owns which responsibility — i.e. component boundaries — goes here. You don’t have to fill this in from day one; add or refine it as the project grows, or let the AI propose entries when you’re unsure. If you only maintain the Page/Screen structure above, that’s still valid.

Each significant file or module is described with the following:

**For state ownership, flow, and hooks for this module → see STATE_FLOW.md.**

### `FileName` or `ModuleName`

**Role**

- What responsibility this file owns (human-readable)
- Why it exists; responsibility boundary

**Exports**

- Components / functions exported from this file

**Dependencies**

- Depends on (imports from)
- Depended on by (known consumers)

---

## AI Usage Rules

When working on this project:

**Update only when needed.** No need to update this document on every code change — only when **responsibility or boundaries** actually change.

1. **Before implementing a new feature:**
   - Check **Page / Screen Structure** for which area/block the feature belongs to, and what **효과** / **해야 할 일** are defined.
   - Check whether the responsible file/module is defined in the File/Module section.
   - If not, propose an update to STRUCTURE.md before writing code.
   - For "where does this state live?" or "who is source of truth?" → use **STATE_FLOW.md**.

2. **When modifying behavior:**
   - If **responsibility or boundaries** actually change → update STRUCTURE.md.
   - If **state ownership, data flow, or hooks** change → update STATE_FLOW.md (see STATE_FLOW.md).
   - If both change → update both when relevant; ask when unclear.

3. **If instructions conflict with this document:**
   - Ask for clarification before proceeding.

4. **Do not infer structure from folder names alone.**
   - Use Role, Exports, and Dependencies as signals.

---

## Priority

For **logical structure and responsibility**:

**STRUCTURE.md > Implementation Guides > Source Code**

When STRUCTURE.md and code disagree on "who owns what", treat STRUCTURE.md as the contract.

For **state ownership and flow** → **STATE_FLOW.md** is the source of truth.
