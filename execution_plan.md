# PensionQuest — Execution Plan

> Derived from `PensionQuest_Build_Guide.md` | PFRDA Hackathon 2026 | 8-Week PoC

---

## Phase 0 — Environment & Tooling Setup (Week 1, Days 1–2)

> **Goal**: Every team member can run the full stack locally.

### All Team Members
- [ ] Install prerequisites: Python 3.11+, Node.js 20+, PostgreSQL 15, Redis 7.2, Docker 24+, Expo CLI 6+
- [ ] Clone the monorepo and verify access
- [ ] Copy `.env.example` → `.env` for backend and frontend-mobile; fill in secrets
- [ ] Run `docker-compose up -d` from `infra/` — verify Postgres and Redis containers are healthy
- [ ] Create Firebase project; download `firebase-service-account.json` into `backend/`
- [ ] Obtain API keys: OpenAI or Gemini, Google Translate

### Verification
```bash
docker ps                           # 3 containers: db, redis, nginx
psql -U pensionquest -d pensionquest_db -c "SELECT 1;"
redis-cli ping                      # → PONG
python --version                    # >= 3.11
node --version                      # >= 20
```

---

## Phase 1 — Architecture & Scaffolding (Week 1, Days 3–7)

> **Goal**: Skeleton projects running, DB schema locked, API contract published.

### Backend (Aryan)
- [ ] Scaffold FastAPI project under `backend/app/`
  - `main.py`, `config.py`, `database.py`, `redis_client.py`
- [ ] Create SQLAlchemy models: `User`, `Quest`, `QuestProgress`, `Badge`, `UserBadge`, `Contribution`, `Streak`
- [ ] Initialize Alembic; generate + apply `initial_schema` migration
- [ ] Verify all tables exist: `psql -d pensionquest_db -c "\dt"`
- [ ] Create `requirements.txt` with pinned versions
- [ ] Add `/health` endpoint; confirm at `http://localhost:8000/health`

### Frontend Mobile (Pranjali)
- [ ] Bootstrap Expo project: `npx create-expo-app frontend-mobile --template blank-typescript`
- [ ] Install navigation, state mgmt, i18n, animation, chart dependencies
- [ ] Set up React Navigation (Stack + Bottom Tabs)
- [ ] Configure i18n with `en.json` and `hi.json`
- [ ] Create skeleton screens: Onboarding, Dashboard, Quest, Simulator, AICoach, Leaderboard, Profile

### Frontend Web (Pranjali / Vedika)
- [ ] Initialize React.js web app under `frontend-web/`
- [ ] Mirror essential pages: landing, dashboard, simulator

### Design & Content (Vedika)
- [ ] Finalize Figma design system (colors, typography, component library)
- [ ] Complete Figma mockups for all 6 core screens
- [ ] Write OpenAPI spec (`docs/api-spec.yaml`)
- [ ] Document DB schema in `docs/database-schema.dbml`

### Deliverables Checklist
- [ ] `uvicorn app.main:app --reload` → serves `/health`
- [ ] `npx expo start` → blank app boots on phone/emulator
- [ ] Figma link shared with team
- [ ] OpenAPI spec draft committed

---

## Phase 2 — Authentication & Core Backend (Week 2)

### Backend — Auth & User (Aryan)
- [ ] Implement `routers/auth.py`: `/api/auth/register`, `/api/auth/login`
- [ ] Implement `utils/auth.py`: JWT creation + `get_current_user` dependency
- [ ] Implement `routers/users.py`: `/api/user/profile`, `/api/user/update`
- [ ] Implement `schemas/user.py`: Pydantic models for request/response
- [ ] Implement `config.py` with `pydantic-settings` for env vars
- [ ] Wire up Firebase Admin SDK for token verification
- [ ] Connect Redis client (`redis_client.py`)
- [ ] Set up leaderboard sorted-set structure in Redis

### Frontend — Auth Screens (Pranjali)
- [ ] Design system components: buttons, cards, headers, inputs
- [ ] Build Onboarding flow (age, income, NPS enrollment, retirement age, language)
- [ ] Build Login / Register screens with Firebase Auth
- [ ] Store JWT in `expo-secure-store`
- [ ] Create `services/api.ts` with Axios instance + auth interceptor
- [ ] Create Zustand user store (`store/userStore.ts`)

### Content (Vedika)
- [ ] Finalize 10 NPS quest questions in English + Hindi
- [ ] Design 5 avatar visual states (illustrations or Lottie concepts)
- [ ] Design 15 badge icons

### Verification
```bash
# Backend auth test
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firebase_token":"...","name":"Test","age":25}'
# Expect: 201 with user object + JWT
```

---

## Phase 3 — Daily Quest Module (Week 3)

### Backend (Aryan)
- [ ] Implement `routers/quests.py`:
  - `GET /api/quests/daily` — returns next unfinished quest by difficulty
  - `POST /api/quests/submit` — validates answer, awards XP, checks badges, updates streak
- [ ] Implement `services/xp_service.py`: XP awarding + level calculation
- [ ] Implement `services/badge_service.py`: badge trigger engine (`quest_count`, `streak_days`, `contribution_total`)
- [ ] Implement `services/streak_service.py`: streak continuation / reset logic
- [ ] Create `scripts/seed_quests.py` — seed 10 quests
- [ ] Create `scripts/seed_badges.py` — seed 15 badges

### Frontend (Pranjali)
- [ ] `QuestCard` component: 4-option MCQ with selection highlight
- [ ] Answer reveal animation (correct = green confetti, wrong = subtle shake)
- [ ] XP earned celebration animation
- [ ] `BadgeModal` component: badge unlock popup
- [ ] Streak counter display on Dashboard
- [ ] `XPBar` component: level progress bar with title

### Verification
```bash
# Seed data
python scripts/seed_quests.py
python scripts/seed_badges.py

# API test: fetch daily quest
curl -H "Authorization: Bearer <JWT>" http://localhost:8000/api/quests/daily

# API test: submit answer
curl -X POST http://localhost:8000/api/quests/submit \
  -H "Authorization: Bearer <JWT>" \
  -d '{"quest_id":"<id>","answer":"c"}'
# Expect: is_correct, xp_earned, streak, new_badges
```

---

## Phase 4 — Retirement Avatar (Week 4)

### Frontend (Pranjali)
- [ ] `RetirementAvatar` component with Lottie animations for 5 states
- [ ] Pulse animation on `critical` state
- [ ] Integrate avatar into Dashboard (above XP bar)
- [ ] Avatar updates in real-time when contribution changes

### Backend (Aryan)
- [ ] Implement `services/avatar_service.py`:
  - `calculate_avatar_state()` — maps contribution % to state
  - `get_recommended_contribution()` — 10% of avg income
- [ ] Add avatar state update to contribution logging endpoint

### Design (Vedika)
- [ ] Create 5 Lottie animation files (`.json`): thriving, stable, struggling, critical, zero
- [ ] Document avatar state logic for team reference
- [ ] Conduct user testing with 3 external users; collect feedback

### Verification
- Manually change contribution amount via API; confirm avatar state transitions correctly
- Visual verification on device/emulator for all 5 avatar states

---

## Phase 5 — AI Pension Coach (Week 5)

### Backend (Shivam)
- [ ] Implement `ml/pension_coach_prompts.py`: system prompts (EN + HI) + 5 scenario templates
- [ ] Implement `routers/ai_coach.py`: `POST /api/ai/coach/chat`
- [ ] Integrate OpenAI (GPT-4o-mini) or Gemini API via `services/ai_service.py`
- [ ] Conversation history management (last 10 messages)
- [ ] AI interaction logging to DB
- [ ] Hindi language responses validated
- [ ] Create `ml/nps_knowledge_base.json` — NPS rules, FAQs, fund details

### Frontend (Pranjali)
- [ ] Chat UI: message bubbles (user vs AI), auto-scroll, keyboard handling
- [ ] Typing indicator animation while waiting for AI response
- [ ] Disclaimer text shown below every AI response
- [ ] AI Coach screen integrated into bottom nav

### Verification
```bash
# Test English
curl -X POST http://localhost:8000/api/ai/coach/chat \
  -H "Authorization: Bearer <JWT>" \
  -d '{"message":"How much tax can I save with NPS?"}'
# Expect: reply + disclaimer

# Test Hindi (ensure user has language=hi)
# Expect: Hindi response
```

---

## Phase 6 — Retirement Simulator (Week 6)

### Backend (Aryan)
- [ ] Implement `utils/nps_calculator.py`: `calculate_nps_corpus()` function
  - Inputs: age, retirement age, monthly contribution, return %, risk profile, annual income
  - Outputs: projected corpus, monthly pension, tax saved, cost of delay (1/3/5 yr)
- [ ] Implement `routers/simulator.py`: `POST /api/simulator/calculate`
- [ ] Add scenario comparison: 3 side-by-side projections

### Frontend (Pranjali)
- [ ] Slider components for contribution (₹200 – ₹50,000), retirement age (55–70), return rate
- [ ] Real-time chart updates using Victory Native / react-native-chart-kit
- [ ] Results card: corpus, pension, tax saved, cost of delay warning
- [ ] "Start NPS Now" CTA button
- [ ] Avatar reacts to simulator changes (live state update)

### Verification
```bash
# Unit test
pytest tests/test_quests.py::test_nps_corpus_calculation -v
# 25yr, retire at 60, ₹1000/mo, 10% return → ~₹38.4L corpus

# API test
curl -X POST http://localhost:8000/api/simulator/calculate \
  -d '{"current_age":25,"retirement_age":60,"monthly_contribution":1000,"annual_return_pct":10}'
```

---

## Phase 7 — Gamification, Leaderboard & Multilingual (Week 7)

### Backend (Aryan)
- [ ] Implement `services/leaderboard_service.py`:
  - `update_user_xp()` → Redis ZADD
  - `get_leaderboard()` → national, city, friends
  - `get_user_rank()` → rank + percentile
  - `cache_user_profile()` → Redis HSET
- [ ] Implement `routers/gamification.py`: leaderboard endpoints
- [ ] Implement `routers/contributions.py`: log contributions + update avatar
- [ ] Set up streak cron job (daily midnight — reset broken streaks)
- [ ] Implement `services/notification_service.py`: FCM push notifications
  - Templates: daily quest, contribution nudge, badge unlocked, streak reminder

### AI & NLP (Shivam)
- [ ] Complete Hindi translations for all quest content (titles, descriptions, options, explanations)
- [ ] Implement `ml/multilingual_handler.py`: Google Translate with NPS glossary preservation
- [ ] Social share card generation (badge PNG for WhatsApp)
- [ ] Referral tracking endpoint
- [ ] Verify all 15 badge trigger conditions work end-to-end

### Verification
```bash
# Leaderboard test
curl http://localhost:8000/api/gamification/leaderboard?type=national
# Expect: ranked list with user names, levels, XP

# Redis check
redis-cli ZREVRANGE lb:national:xp 0 9 WITHSCORES
```

---

## Phase 8 — Integration Testing, Polish & Demo Prep (Week 8)

### All Team
- [ ] **End-to-end test: Riya's Journey** (English)
  - New user registration → onboarding → first quest → XP → badge → share
- [ ] **End-to-end test: Ramesh's Journey** (Hindi)
  - Same flow in Hindi mode; verify translations
- [ ] Performance benchmarks:
  - App load time < 3 seconds on 4G
  - API response times < 500ms
- [ ] Run `pytest tests/ -v --cov=app --cov-report=html` — target 80%+ coverage
- [ ] Run k6 load test (100 VUs, 30s)

### Bug Fixes & Polish
- [ ] Fix any remaining UI/animation glitches
- [ ] Verify all 6 PoC features work together seamlessly
- [ ] Ensure error handling and edge cases are covered

### Demo Preparation (Vedika + All)
- [ ] Deploy backend to cloud (AWS EC2 / GCP)
- [ ] Pre-load demo data (Riya's account at Day 3 with some progress)
- [ ] App running on physical Android device
- [ ] Record 3–5 minute demo video as backup
- [ ] Finalize pitch deck

### Final Demo Checklist
- [ ] Daily Quest flow: answer → XP → badge → share
- [ ] AI Coach: 3 live conversations (EN + HI)
- [ ] Simulator: slider → real-time corpus → avatar update
- [ ] Leaderboard: national + friend rankings
- [ ] Avatar: demonstrate 3 state transitions
- [ ] Multilingual: toggle English ↔ Hindi live

---

## Team Ownership Matrix

| Component | Shivam | Aryan | Pranjali | Vedika |
|---|:---:|:---:|:---:|:---:|
| Architecture & FastAPI | **Lead** | Support | | |
| Database & Migrations | | **Lead** | | Support |
| Gamification Engine | | **Lead** | | |
| Leaderboard (Redis) | | **Lead** | | |
| AI Pension Coach | **Lead** | | | |
| Multilingual NLP | **Lead** | | | |
| Push Notifications | Support | **Lead** | | |
| React Native Screens | | | **Lead** | |
| Quest & Avatar UI | | | **Lead** | |
| Simulator Charts | | Support | **Lead** | |
| AI Chat UI | | | **Lead** | |
| Figma & Design System | | | | **Lead** |
| Avatar/Badge Visuals | | | | **Lead** |
| Quest Content Writing | Support | | | **Lead** |
| Pitch Deck | Support | | | **Lead** |
| Cloud Deployment | Support | **Lead** | | |

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| AI response latency > 3s | Use GPT-4o-mini (faster); cache frequent questions |
| Firebase auth issues | Implement fallback email/password auth |
| Lottie animations too heavy | Compress to < 200KB each; fallback to static images |
| Hindi translations inaccurate | NPS glossary preservation in translate pipeline |
| Redis downtime | Graceful fallback to DB queries for leaderboard |
| Scope creep | Strict "Must Ship" vs "Phase 2" boundary — no Phase 2 features in PoC |

---

## Success Criteria (PoC Acceptance)

| # | Criterion | Target |
|---|---|---|
| 1 | Daily Quest Module | 10 quests, 3 difficulty levels, XP + badges working |
| 2 | AI Pension Coach | 5+ scenario responses, EN + HI |
| 3 | Retirement Simulator | Real-time corpus projection with animated charts |
| 4 | Retirement Avatar | 3+ state transitions visible |
| 5 | Leaderboard + Badges | National leaderboard + 5 badges unlockable |
| 6 | Multilingual | Hindi + English fully functional |
| 7 | Performance | App loads < 3s on 4G; API < 500ms |
| 8 | Demo | 10-minute live demo completed successfully |
