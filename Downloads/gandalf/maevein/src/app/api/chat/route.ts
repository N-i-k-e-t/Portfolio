import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        const { messages, systemPrompt, levelId, moduleId } = await request.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                {
                    content: `🔑 **API Key Required**\n\nTo chat with The Alchemist, please add your OpenAI API key:\n\n1. Create a file called \`.env.local\` in the project root\n2. Add: \`OPENAI_API_KEY=your-key-here\`\n3. Restart the dev server\n\n*For now, here's a simulated response for Level ${levelId}.*`,
                },
                { status: 200 }
            );
        }

        // Build messages array with system prompt
        const apiMessages = [
            {
                role: 'system' as const,
                content: systemPrompt,
            },
            ...messages.map((msg: { role: string; content: string }) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const content = completion.choices[0]?.message?.content || 'The Alchemist is deep in thought...';

        return NextResponse.json({ content });
    } catch (error: unknown) {
        console.error('Chat API Error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // Check for API key issues
        if (errorMessage.includes('API key') || errorMessage.includes('auth')) {
            return NextResponse.json(
                {
                    content: '🔑 **Invalid API Key.** Please check your OpenAI API key in `.env.local` and restart the dev server.',
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                content: '⚠️ The Alchemist is temporarily unavailable. Please try again in a moment.',
            },
            { status: 200 }
        );
    }
}
