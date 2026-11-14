import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Elder } from '../models/Elder.js';
import { Caregiver } from '../models/Caregiver.js';
import { HealthMetric } from '../models/HealthMetric.js';
import { Medication } from '../models/Medication.js';
import { SosAlert } from '../models/SosAlert.js';
import { Visit } from '../models/Visit.js';
import { Appointment } from '../models/Appointment.js';
import { Subscription } from '../models/Subscription.js';
import { AssistanceRequest } from '../models/AssistanceRequest.js';
import { Notification } from '../models/Notification.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'apnasahara_super_secret_jwt_key_2026';

// ---------------- AUTH ----------------
router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Demo fallback auto-creation
      const hash = await bcrypt.hash(password || 'password123', 10);
      user = await User.create({
        name: email.split('@')[0].toUpperCase(),
        email: email.toLowerCase(),
        passwordHash: hash,
        role: email.includes('parent') ? 'elder' : email.includes('caregiver') ? 'caregiver' : email.includes('admin') ? 'admin' : 'family',
        phone: '+91 98765 43210'
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar_url: user.avatarUrl
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;
    let existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password || 'password123', 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash: hash,
      role: role || 'family',
      phone: phone || ''
    });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- ELDERS ----------------
router.get('/elders', async (req: Request, res: Response) => {
  try {
    const elders = await Elder.find().sort({ createdAt: -1 });
    res.json(elders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/elders', async (req: Request, res: Response) => {
  try {
    const elder = await Elder.create(req.body);
    res.status(201).json(elder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CAREGIVERS ----------------
router.get('/caregivers', async (req: Request, res: Response) => {
  try {
    const list = await Caregiver.find();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/caregivers/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Caregiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- HEALTH METRICS ----------------
router.get('/health-metrics', async (req: Request, res: Response) => {
  try {
    const { elderId } = req.query;
    const filter = elderId ? { elderId: String(elderId) } : {};
    const metrics = await HealthMetric.find(filter).sort({ recordedAt: -1 }).limit(50);
    res.json(metrics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/health-metrics', async (req: Request, res: Response) => {
  try {
    const created = await HealthMetric.create(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- MEDICATIONS ----------------
router.get('/medications', async (req: Request, res: Response) => {
  try {
    const { elderId } = req.query;
    const filter = elderId ? { elderId: String(elderId) } : {};
    const meds = await Medication.find(filter);
    res.json(meds);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/medications/:id/toggle', async (req: Request, res: Response) => {
  try {
    const { isTakenToday } = req.body;
    const med = await Medication.findById(req.params.id);
    if (!med) return res.status(404).json({ error: 'Medication not found' });
    med.isTakenToday = isTakenToday;
    if (isTakenToday && med.pillsRemaining > 0) {
      med.pillsRemaining -= 1;
    }
    await med.save();
    res.json(med);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- SOS ALERTS ----------------
router.get('/sos-alerts', async (req: Request, res: Response) => {
  try {
    const alerts = await SosAlert.find().sort({ triggeredAt: -1 });
    res.json(alerts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sos-alerts', async (req: Request, res: Response) => {
  try {
    const created = await SosAlert.create(req.body);
    // Realtime notification broadcast
    const io = req.app.get('io');
    if (io) {
      io.emit('sos_triggered', created);
    }
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/sos-alerts/:id', async (req: Request, res: Response) => {
  try {
    const updated = await SosAlert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const io = req.app.get('io');
    if (io) {
      io.emit('sos_updated', updated);
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- VISITS ----------------
router.get('/visits', async (req: Request, res: Response) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/visits/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- APPOINTMENTS & SUBSCRIPTIONS ----------------
router.get('/appointments', async (req: Request, res: Response) => {
  try {
    const apts = await Appointment.find().sort({ appointmentDate: 1 });
    res.json(apts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/subscriptions', async (req: Request, res: Response) => {
  try {
    const subs = await Subscription.find();
    res.json(subs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/notifications', async (req: Request, res: Response) => {
  try {
    const notifs = await Notification.find().sort({ createdAt: -1 }).limit(30);
    res.json(notifs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
