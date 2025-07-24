# 🤖 AI 뉴스 브리핑

AI가 요약해주는 최신 뉴스 브리핑 서비스입니다. 사용자가 관심 있는 주제를 입력하면 관련 뉴스를 가져와서 선택적으로 AI 요약을 제공합니다.

## 🚀 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4o-mini)
- **News API**: NewsAPI (선택사항)

## ✨ 주요 기능

- 📰 주제별 뉴스 검색
- 🤖 선택적 AI 요약 (버튼 클릭 시에만)
- 📱 반응형 디자인
- 📋 세로 목록 레이아웃 (한 줄에 하나씩)
- 🔄 NewsAPI 연동 (샘플 데이터 대체 가능)
- ⚡ 에러 처리 및 로딩 상태 관리

## 🛠️ 설치 방법

1. 프로젝트 클론 및 의존성 설치:
```bash
npm install
```

2. 환경변수 설정:
```bash
cp .env.example .env.local
```

3. `.env.local` 파일에 API 키 설정:
```
OPENAI_API_KEY=your_openai_api_key_here
NEWS_API_KEY=your_news_api_key_here  # 선택사항
```

4. 개발 서버 실행:
```bash
npm run dev
```

## 🔑 API 키 발급 방법

### OpenAI API 키 (필수)
1. [OpenAI 플랫폼](https://platform.openai.com/)에 가입
2. API Keys 섹션에서 새 API 키 생성
3. 생성된 키를 `.env.local`의 `OPENAI_API_KEY`에 설정

### NewsAPI 키 (선택사항)
1. [NewsAPI](https://newsapi.org/)에 가입
2. 무료 플랜으로 API 키 발급
3. 생성된 키를 `.env.local`의 `NEWS_API_KEY`에 설정
4. NewsAPI 키가 없으면 자동으로 샘플 데이터를 사용합니다

## 📖 사용 방법

1. 웹사이트에 접속하면 검색 폼이 나타납니다
2. 관심 있는 주제를 입력하거나 인기 주제 버튼을 클릭합니다
3. 뉴스 목록이 표시되면 원하는 뉴스의 "🤖 AI 요약하기" 버튼을 클릭합니다
4. AI가 생성한 요약을 확인할 수 있습니다

## 📁 프로젝트 구조

```
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   └── route.ts          # 뉴스 검색 API
│   │   └── summarize/
│   │       └── route.ts          # AI 요약 API
│   ├── components/
│   │   ├── LoadingSpinner.tsx    # 로딩 스피너
│   │   ├── NewsCard.tsx          # 뉴스 카드 컴포넌트
│   │   └── SearchForm.tsx        # 검색 폼 컴포넌트
│   ├── types/
│   │   └── news.ts               # 뉴스 타입 정의
│   ├── globals.css               # 글로벌 스타일
│   ├── layout.tsx                # 레이아웃 컴포넌트
│   └── page.tsx                  # 메인 페이지
├── .env.example                  # 환경변수 예시
├── next.config.js                # Next.js 설정
├── package.json                  # 프로젝트 의존성
├── tailwind.config.js            # Tailwind CSS 설정
└── README.md                     # 프로젝트 문서
```

## 🎨 커스텀 스타일

프로젝트는 Tailwind CSS를 사용하며, 다음과 같은 커스텀 컴포넌트 클래스를 제공합니다:

- `.news-card`: 뉴스 카드 스타일
- `.search-input`: 검색 입력창 스타일  
- `.btn-primary`: 기본 버튼 스타일
- `.line-clamp-2`, `.line-clamp-3`: 텍스트 줄 제한

## 🚨 주의사항

- OpenAI API 키는 필수입니다
- NewsAPI 키가 없으면 샘플 데이터를 사용합니다
- API 사용량에 따라 요금이 발생할 수 있습니다
- 개발 환경에서만 테스트하고 프로덕션 배포 시 보안을 고려하세요

## 📄 라이선스

MIT License