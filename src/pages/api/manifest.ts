import { redis } from '@/util/redis';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let cachedManifest = await redis.get('manifest');

    if (cachedManifest) {
      return res.status(200).json(JSON.parse(cachedManifest));
    }

    const response = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest/');
    const data = await response.json();

    await redis.set('manifest', JSON.stringify(data.Response));

    res.status(200).json(data.Response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch the manifest' });
  }
}
