import { sendPasswordResetEmail } from '../../../utils/email'; 

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // ตรวจสอบว่ามีผู้ใช้ที่มีอีเมลนี้อยู่ในระบบหรือไม่
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // ส่งอีเมลรีเซ็ตรหัสผ่าน
      await sendPasswordResetEmail(user);

      res.status(200).json({ msg: 'Password reset link has been sent to your email.' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};