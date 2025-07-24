import { NextRequest, NextResponse } from 'next/server';
import { NewsItem } from '../../types/news';

// 샘플 뉴스 데이터 생성 함수
function generateSampleNews(topic: string): NewsItem[] {
  const sources = ['연합뉴스', '조선일보', 'KBS', 'MBC', 'SBS', '한겨레', '중앙일보', '동아일보'];
  const sampleNews: NewsItem[] = [];

  const newsTemplates = {
    '인공지능': [
      { title: `${topic} 기술의 새로운 돌파구, 국내 기업들의 혁신적 접근`, desc: '국내 주요 기업들이 인공지능 기술 개발에 대규모 투자를 발표하며, 글로벌 경쟁력 확보에 나서고 있습니다. 특히 자연어 처리와 컴퓨터 비전 분야에서 괄목할 만한 성과를 보이고 있어 주목받고 있습니다.' },
      { title: `${topic} 윤리 가이드라인 발표, 정부의 새로운 정책 방향`, desc: '정부가 인공지능 기술의 윤리적 사용을 위한 종합 가이드라인을 발표했습니다. 개인정보 보호와 알고리즘 투명성을 핵심으로 하는 이번 정책은 AI 산업 발전의 새로운 이정표가 될 것으로 예상됩니다.' },
      { title: `${topic} 의료 분야 적용 확대, 진단 정확도 크게 향상`, desc: '국내 의료진들이 AI 기술을 활용한 진단 시스템을 도입하면서 진단 정확도가 크게 향상되고 있습니다. 특히 영상 진단 분야에서 기존 대비 30% 이상의 정확도 개선 효과를 보이고 있어 의료계의 관심이 집중되고 있습니다.' }
    ],
    '암호화폐': [
      { title: `${topic} 시장 동향 분석, 새로운 투자 트렌드 부상`, desc: '최근 암호화폐 시장에서 새로운 투자 패턴이 나타나고 있습니다. 기관 투자자들의 참여가 늘어나면서 시장 안정성이 높아지고 있으며, 규제 환경 개선도 긍정적인 영향을 미치고 있습니다.' },
      { title: `${topic} 규제 프레임워크 개선, 투자자 보호 강화`, desc: '금융당국이 암호화폐 관련 규제 프레임워크를 대폭 개선한다고 발표했습니다. 투자자 보호를 강화하면서도 혁신적인 기술 발전을 저해하지 않는 균형잡힌 접근을 추구하고 있습니다.' }
    ],
    '기후변화': [
      { title: `${topic} 대응 정책 발표, 탄소중립 목표 달성 방안`, desc: '정부가 2050 탄소중립 목표 달성을 위한 구체적인 로드맵을 발표했습니다. 재생에너지 확대와 산업구조 전환을 통해 온실가스 배출량을 단계적으로 줄여나갈 계획입니다.' },
      { title: `${topic} 영향으로 인한 농업 변화, 새로운 적응 전략`, desc: '기후변화로 인한 농업 환경 변화에 대응하기 위해 농업계가 새로운 적응 전략을 모색하고 있습니다. 스마트팜 기술과 기후 적응형 작물 개발이 핵심 해결책으로 주목받고 있습니다.' }
    ]
  };

  const defaultTemplate = [
    { title: `${topic} 관련 최신 동향 분석`, desc: `${topic} 분야의 최신 동향과 전망에 대한 전문가들의 심층 분석입니다. 국내외 주요 이슈들을 종합적으로 검토하여 향후 발전 방향을 제시합니다.` },
    { title: `${topic} 산업의 새로운 변화`, desc: `${topic} 산업에서 일어나고 있는 혁신적인 변화들을 살펴봅니다. 기술 발전과 시장 변화가 가져올 새로운 기회와 도전에 대해 분석합니다.` }
  ];

  const templates = newsTemplates[topic as keyof typeof newsTemplates] || defaultTemplate;

  for (let i = 0; i < Math.min(5, templates.length); i++) {
    const template = templates[i] || templates[0];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const publishedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();

    sampleNews.push({
      id: `news-${Date.now()}-${i}`,
      title: template.title,
      description: template.desc,
      content: template.desc + ' 자세한 내용은 원문을 참조하시기 바랍니다.',
      source: randomSource,
      publishedAt,
      url: `https://example.com/news/${i}`,
      summary: null
    });
  }

  return sampleNews;
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: '검색 주제를 입력해주세요.' },
        { status: 400 }
      );
    }

    // NewsAPI 사용 (환경변수가 있는 경우)
    if (process.env.NEWS_API_KEY) {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=ko&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          const articles: NewsItem[] = data.articles.slice(0, 8).map((article: any, index: number) => ({
            id: `news-${Date.now()}-${index}`,
            title: article.title,
            description: article.description || article.content?.substring(0, 200) + '...',
            content: article.content,
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url,
            summary: null
          }));

          return NextResponse.json({ articles });
        }
      } catch (error) {
        console.error('NewsAPI 오류:', error);
      }
    }

    // 샘플 데이터 사용 (NewsAPI가 없거나 실패한 경우)
    const sampleArticles = generateSampleNews(topic);
    
    return NextResponse.json({ 
      articles: sampleArticles.slice(0, 8)
    });

  } catch (error) {
    console.error('뉴스 API 오류:', error);
    return NextResponse.json(
      { error: '뉴스를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}