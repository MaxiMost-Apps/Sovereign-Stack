import {
  Sun, ThermometerSnowflake, Activity, Flame, Moon, PhoneOff, // CHANGED THIS
  Glasses, Wind, BedDouble, BarChart3, Dumbbell,  Briefcase,
  Orbit, ScanFace, Tent, Footprints, Zap, Brain,
  Utensils, Droplets, Ban, Fish, Apple, Clock,
  BookOpen, Mic, PenTool, Radio, Timer, Mail,
  Ghost, UserCheck, FileText, Anchor, Eye, HeartHandshake,
  Trash2, ShoppingCart, ListChecks, CalendarRange
} from 'lucide-react';

import { MASTER_LIBRARY } from '../../../../maximost-api/src/data/library';

export const ICON_MAP: any = {
  Sun, ThermometerSnowflake, Activity, Flame, Moon,
  SmartphoneOff: PhoneOff, // MAPPED HERE
  Glasses, Wind, BedDouble, BarChart3,
  Dumbbell, Briefcase, Orbit, ScanFace, Tent, Footprints, Zap, Brain,
  Utensils, Droplets, Ban, Fish, Apple, Clock,
  BookOpen, Mic, PenTool, Radio, Timer, Mail,
  Ghost, UserCheck, FileText, Anchor, Eye, HeartHandshake,
  Trash2, ShoppingCart, ListChecks, CalendarRange
};

export const PROTOCOL_STACKS = [
  { id: 'stack_morning', title: 'Morning Protocol', description: 'Win the morning, win the day.', habit_ids: ['BIO_01', 'BIO_03', 'PHYS_09', 'STOIC_07'] },
  { id: 'stack_deep_work', title: 'Deep Work Block', description: 'High-output cognitive sprint.', habit_ids: ['COG_01', 'COG_03', 'COG_09', 'LOG_01'] },
  { id: 'stack_evening', title: 'Power Down', description: 'System reset for recovery.', habit_ids: ['BIO_06', 'BIO_07', 'BIO_05', 'STOIC_03'] }
];

export const SOVEREIGN_LIBRARY = MASTER_LIBRARY;
