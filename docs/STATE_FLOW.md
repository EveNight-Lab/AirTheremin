# STATE_FLOW.md

AI가 상태·흐름·파일 작업 지도를 유지하는 문서.
작성 규칙은 [STATE_FLOW_SPEC.md](./specs/STATE_FLOW_SPEC.md)를 따른다.

---

## 0) 빠른 라우팅 맵 (항상 최상단 유지)

| 지시/키워드 | 1차 Read | 1차 Change | 2차 후보 |
| ----------- | -------- | ---------- | -------- |
|             |          |            |          |

---

## 1) 파일 인벤토리 (핵심)

| File | Owns state | Sets/updates | Reads/consumes | Hooks | Side effects | Related IDs |
| ---- | ---------- | ------------ | -------------- | ----- | ------------ | ----------- |
|      |            |              |                |       |              |             |

---

## 2) 상태·훅 흐름 블록 (필요 최소만)

### `<기능 또는 상태 묶음 ID>`

- **Source of truth**: `src/...`
- **Updated by**: `...`
- **Flows to**: `...`
- **Read-only consumers**: `...`
- **Side effects**: `...`
- **Read first**: `...`
- **Change first**: `...`

---

## 3) 작업 후 갱신 체크 (AI용)

- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
