import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Configure for Vercel deployment
export const maxDuration = 60; // 60 seconds timeout
export const runtime = 'nodejs';

// Vercel has a 4.5MB body size limit on Hobby/Pro plans
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB to be safe

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key is not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Check file size limit for Vercel
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB for Vercel deployment.`,
          errorMm: 'ဖိုင်သည် အရွယ်အစားကြီးလွန်းပါသည်။ အများဆုံး ၄MB အထိသာ လက်ခံပါသည်။',
        },
        { status: 413 }
      );
    }

    // Convert file to base64
    const bytes = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(bytes).toString('base64');

    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create the prompt for Myanmar transcription
    const prompt = `Please transcribe this audio file to Myanmar (Burmese) text. The audio is in Myanmar language. Please provide only the transcribed text without any additional commentary or explanation. If you cannot transcribe the audio, please respond in Myanmar explaining that you cannot process the audio.`;

    // Prepare the audio data
    const audioPart = {
      inlineData: {
        data: base64Audio,
        mimeType: audioFile.type,
      },
    };

    // Generate content
    const result = await model.generateContent([prompt, audioPart]);
    const response = await result.response;
    const transcription = response.text();

    return NextResponse.json({
      transcription,
      success: true,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      {
        error: 'Failed to transcribe audio',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
