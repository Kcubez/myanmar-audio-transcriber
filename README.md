# Myanmar Audio Transcriber / မြန်မာ အသံဖိုင် စာသားပြောင်းစက်

A Next.js web application that transcribes Myanmar (Burmese) audio files to Myanmar text using Google's Gemini AI API.

မြန်မာအသံဖိုင်များကို မြန်မာစာသို့ ပြောင်းလဲပေးသော Next.js ဝဘ်အက်ပ်လီကေးရှင်း (Google Gemini AI API အသုံးပြုထားသည်)

## Features / လုပ်ဆောင်ချက်များ

- 🎵 **Audio Upload**: Support for multiple audio formats (MP3, WAV, M4A, OGG)
- 🔤 **Myanmar Transcription**: Converts Myanmar speech to Myanmar text
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 📋 **Copy & Download**: Easy copy to clipboard and download transcription
- 🎨 **Myanmar Font Support**: Proper Myanmar font rendering
- ⚡ **Fast Processing**: Powered by Google Gemini AI

## Prerequisites / လိုအပ်ချက်များ

- Node.js 18+ 
- npm or yarn
- Google Gemini API Key

## Installation / ထည့်သွင်းခြင်း

1. **Clone the repository / ပရောဂျက်ကို ကူးယူပါ**
   ```bash
   git clone <repository-url>
   cd voice
   ```

2. **Install dependencies / လိုအပ်သော packages များကို ထည့်သွင်းပါ**
   ```bash
   npm install
   ```

3. **Set up environment variables / Environment variables များကို သတ်မှတ်ပါ**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

## Getting Gemini API Key / Gemini API Key ရယူခြင်း

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key and paste it in your `.env.local` file

## Usage / အသုံးပြုပုံ

1. **Start the development server / Development server ကို စတင်ပါ**
   ```bash
   npm run dev
   ```

2. **Open your browser / ဘရောက်ဇာကို ဖွင့်ပါ**
   
   Navigate to `http://localhost:3000`

3. **Upload and transcribe / Upload လုပ်ပြီး transcribe လုပ်ပါ**
   - Click "ဖိုင်ရွေးချယ်ပါ" to select an audio file
   - Click "စာသားပြောင်းပါ" to start transcription
   - Copy or download the result

## Supported Audio Formats / ပံ့ပိုးပေးသော အသံဖိုင်များ

- MP3
- WAV
- M4A
- OGG
- FLAC
- WEBM

## Project Structure / ပရောဂျက် ဖွဲ့စည်းပုံ

```
voice/
├── app/
│   ├── api/
│   │   └── transcribe/
│   │       └── route.ts          # API endpoint for transcription
│   ├── globals.css               # Global styles with Myanmar fonts
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page component
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Technologies Used / အသုံးပြုထားသော နည်းပညာများ

- **Next.js 15**: React framework with stable App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Google Gemini AI**: AI model for audio transcription
- **Lucide React**: Beautiful icons
- **Padauk Font**: Myanmar Unicode font

## API Endpoints / API Endpoints များ

### POST `/api/transcribe`

Transcribes audio file to Myanmar text.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'audio' field containing the audio file

**Response:**
```json
{
  "success": true,
  "transcription": "မြန်မာစာသား..."
}
```

## Troubleshooting / ပြဿနာ ဖြေရှင်းခြင်း

### Common Issues / အဖြစ်များသော ပြဿနာများ

1. **API Key Error**
   - Make sure your Gemini API key is correctly set in `.env.local`
   - Verify the API key is valid and has proper permissions

2. **Audio Upload Issues**
   - Check if the audio file format is supported
   - Ensure the file size is reasonable (< 10MB recommended)

3. **Transcription Quality**
   - Use clear, high-quality audio recordings
   - Minimize background noise
   - Speak clearly in Myanmar language

## Development / Development လုပ်ခြင်း

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Contributing / ပံ့ပိုးကူညီခြင်း

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License / လိုင်စင်

This project is open source and available under the MIT License.

## Support / အကူအညီ

If you encounter any issues or have questions, please:
- Check the troubleshooting section above
- Create an issue in the repository
- Contact the development team

---

**Note**: This application requires a stable internet connection to communicate with the Gemini AI API for transcription services.

**မှတ်ချက်**: ဤအက်ပ်သည် Gemini AI API နှင့် ဆက်သွယ်ရန်အတွက် တည်ငြိမ်သော အင်တာနက်ချိတ်ဆက်မှု လိုအပ်ပါသည်။
