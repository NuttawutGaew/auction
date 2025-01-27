import { getToken } from 'next-auth/jwt';

export default async (req, res) => {
  if (req.method === 'POST') {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      // Perform sign out logic here
      // You can clear cookies or perform other sign out actions here
      res.status(200).json({ message: 'Signed out successfully' });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};