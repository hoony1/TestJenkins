import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, description, content } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: '제목과 설명이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const newsText = `제목: ${title}\n\n내용: ${description}${content ? `\n\n상세내용: ${content}` : ''}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 뉴스 요약 전문가입니다. 주어진 뉴스 기사를 2-3문장으로 간결하고 명확하게 요약해주세요. 핵심 내용과 중요한 정보만을 포함하여 독자가 빠르게 이해할 수 있도록 작성해주세요.'
        },
        {
          role: 'user',
          content: `다음 뉴스를 요약해주세요:\n\n${newsText}`
        }
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: '요약을 생성할 수 없습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });

  } catch (error: any) {
    console.error('OpenAI API 오류:', error);

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'API 사용량 할당량을 초과했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'AI 요약 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}