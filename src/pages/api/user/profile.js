const mongoose = require('mongoose');
const User = require('../../../../models/User'); // ปรับเส้นทางให้ถูกต้องตามโครงสร้างโปรเจคของคุณ

mongoose.connect('mongodb+srv://pisanliwrungsub28:P3QjCr1U3b10rQ9v@cluster0.mro2c.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};