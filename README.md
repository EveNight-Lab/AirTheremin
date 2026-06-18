# AcousticSynth V2 (Air Theremin)

> **A high-fidelity 2.5D Hybrid Virtual Instrument utilizing computer-vision hand tracking and Web Audio DSP.**  
> **웹캠 손동작 추적 및 Web Audio 신호 처리를 적용한 웹 기반 비접촉 가상 악기(에어 테레민)입니다.**

---

## 핵심 특징 (Key Highlights)

AcousticSynth V2는 고전 테레민(Theremin)에서 영감을 얻어 제작된 가상 악기입니다. **MediaPipe Hands**의 손동작 추적 기술과 **웹 오디오 API(Web Audio API)**를 결합하여, 추가 하드웨어 없이 일반 웹캠만을 사용하여 웹 브라우저 상에서 연주할 수 있습니다.

---

## 음향 엔진 구성 (Professional DSP Architecture)

디지털 클리핑 및 신호 손실을 방지하고 안정적인 출력을 확보할 수 있도록 음향 코어를 설계했습니다.

- **Dual-Oscillator Voice Blending**: 순수 기본 주파수를 위한 사인파(Sine wave) 80%와 배음 효과를 위한 삼각파(Triangle wave) 20%를 혼합하여 음색을 구성합니다.
- **Portamento Glide (Hz-level interpolation)**: 주파수의 급격한 도약을 방지하기 위해 헤르츠(Hz) 단위의 선형 보간을 적용하여 부드러운 포르타멘토 활강 효과를 구현했습니다.
- **Unity-Gain Convolver Reverb**: 수학적으로 등화된 임펄스 응답(Impulse Response) 컨볼버를 사용합니다. Reverb On/Off 시 일정한 출력 음량 유지를 위해 `0.018` 스케일링 인자를 적용했습니다.
- **Smooth Feedback Delay**: Reverb 노드와 병렬로 연결되어 자연스럽게 감쇄하는 피드백 에코 효과를 처리합니다.
- **Master Brickwall Limiter**: 최종 출력 단계에 리미터(`Threshold: -3.5dB`, `Ratio: 20:1`, `Attack: 2ms`, `headroom: -1.5dB`)를 적용하여 과부하로 인한 주파수 왜곡 및 스피커 손상을 예방합니다.

---

## 조작 안내 (Interactive Controls)

- **오른손 (Melody Pitch & Volume)**:
  - **X축 (가로)**: 멜로디 음고(Pitch)를 조절합니다. 화면 상의 건반 그리드 위치와 연동됩니다.
  - **손 크기 (Fingers Openness)**: 음량을 조절합니다. 손을 쥐면 음소거되며, 손을 펼치면 볼륨이 점진적으로 증가합니다.
- **왼손 (DSP Effectors & Filter)**:
  - **Y축 (Fingers Spread)**: 로우패스 필터(Lowpass Filter)의 컷오프 주파수(최대 2000Hz)를 제어합니다.
  - **Z축 (카메라와의 거리)**: Reverb와 Delay 수준을 조절합니다. 카메라에 손을 가까이 대면 이펙터 비율이 0%에 수렴하며, 멀어질수록 공간감 효과가 증가합니다.

---

## 사용자 인터페이스 (User Interface)

- **디자인 테마**: 마호가니 및 황동 질감을 시각화한 대시보드 테마를 채택했습니다.
- **수직 스케일 그리드**: 대화형 연주의 시각적 보조를 위해 옥타브 표시가 제외된 텍스트 음표 레이블을 화면 중앙에 배치했습니다.
- **2.5D 홀로그래픽 핸드 시각화**: 손의 중심점 좌표를 기반으로 관절 모델 및 물리 입자 궤적을 렌더링합니다.
- **웹 오디오 오실로스코프**: Web Audio API의 실시간 버퍼 데이터를 분석하여 반응형 파형을 출력합니다.

---

## 시작하기 (Getting Started)

### 요구 사항

- Node.js (v20 이상 권장)
- 웹캠 장치

### 설치 및 구동

1.  **저장소 클론**:

    ```bash
    git clone https://github.com/your-username/acousticsynth-v2.git
    cd acousticsynth-v2
    ```

2.  **의존성 설치**:

    ```bash
    npm install
    ```

3.  **로컬 개발 서버 실행**:

    ```bash
    npm run dev -- --host
    ```

    _웹캠 카메라 권한 획득을 위해 로컬 환경(localhost) 또는 HTTPS 환경에서 실행해야 합니다._

4.  **프로덕션 빌드 및 로컬 CI 검증**:
    ```bash
    npm run ci:local
    ```

---

## 디렉토리 구조 요약 (Repository Structure)

- `src/components/features/theremin/` — 핵심 악기 뷰 컴포넌트 (`MelodyCore.tsx`, `EffectorConsole.tsx`, `HeaderControlPanel.tsx`).
- `src/hooks/useThereminAudio.ts` — Web Audio API 노드 연결, 병렬 라우팅 및 리미터 처리 훅.
- `src/hooks/useThereminHandposeParser.ts` — 손동작 좌표 정규화 및 펼침 분석 훅.
- `src/hooks/useThereminCanvas.ts` — 홀로그램 모델 및 파형 오실로스코프 더블 캔버스 렌더링 훅.
- `src/hooks/useHandpose.ts` — MediaPipe 스크립트 비동기 로딩 및 카메라 제어 훅.
- `docs/` — 아키텍처 및 성능 최적화 관련 설계 문서.

---

## 라이선스 (License)

본 프로젝트는 **MIT License**를 따릅니다. 상세 정보는 [LICENSE](LICENSE) 파일을 참조하십시오.
