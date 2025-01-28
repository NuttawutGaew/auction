// import { getToken } from 'next-auth/jwt';

// export default async (req, res) => {
//   if (req.method === 'POST' || req.method === 'GET') {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     if (token) {
//       // Perform sign out logic here
//       // เช่น ลบ cookie หรือข้อมูล session
//       res.status(200).json({ message: 'Signed out successfully' });
//     } else {
//       res.status(401).json({ message: 'Not authenticated' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };