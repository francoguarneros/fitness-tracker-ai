import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

  const { workout, duration } = req.body;

  try {
        const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                  {
                              role: 'system',
                              content: 'You are a fitness expert. Give calorie estimates for workouts.',
                  },
                  {
                              role: 'user',
                              content: 'I did ' + workout + ' for ' + duration + ' minutes. How many calories did I burn?',
                  },
                        ],
                max_tokens: 150,
        });

      const calories = completion.choices[0].message.content;
        return res.status(200).json({ calories });
  } catch (error) {
        return res.status(500).json({ error: 'Failed to calculate calories' });
  }
}
