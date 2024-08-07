import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { description } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Ensure this key is correct

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: `Suggest a category for this task: ${description}`,
                max_tokens: 10,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        const category = response.data.choices[0].text.trim();
        res.status(200).json({ category });
    } catch (error) {
        // @ts-ignore
        console.error('Error fetching AI suggestion:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch AI suggestion' });
    }
};

export default handler;

