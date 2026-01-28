-- 🏛️ SEED FILE: public_roasts
-- VERSION: 1.0 (The Savage Launch)
-- TARGET TABLE: public_roasts

CREATE TABLE IF NOT EXISTS public_roasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'lie', 'poison', 'drift'
  input_keywords TEXT[] NOT NULL, -- e.g. ['tired', 'exhausted', 'sleep']
  roast_text TEXT NOT NULL, -- The Savage Output
  hit_count INT DEFAULT 0, -- Track popularity
  is_verified BOOLEAN DEFAULT FALSE, -- TRUE for our seeds, FALSE for auto-generated
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast keyword searching
CREATE INDEX IF NOT EXISTS idx_roast_keywords ON public_roasts USING GIN (input_keywords);

INSERT INTO public_roasts (category, input_keywords, roast_text, is_verified) VALUES

-- ---------------------------------------------------------
-- ZONE A: THE LIE (Excuses)
-- ---------------------------------------------------------

(
  'lie',
  '{tired,exhausted,sleepy,fatigue,drained}',
  'Tired is a ghost. It isn''t real. You are bored because you have no mission. The enemy is training while you negotiate with your pillow. You are prioritizing comfort over your own life. Wake the f*ck up. Tired is just your brain trying to save calories for a famine that isn''t coming.',
  true
),
(
  'lie',
  '{time,busy,schedule,work,job}',
  'You have the exact same 24 hours as the Titans who built the world. You don''t lack time; you lack priority. You are ''busy'' being average. Stop letting the world steal your time and start stealing the morning. 0500 belongs to the Sovereign. Everything else is noise.',
  true
),
(
  'lie',
  '{kids,children,family,parent,mom,dad}',
  'Do not use your children as a human shield for your laziness. They are watching you. Do you want them to see a parent who makes excuses, or a parent who commands their reality? Being ''present'' doesn''t mean being soft. Get up before they wake up. Set the standard.',
  true
),
(
  'lie',
  '{hurt,pain,sore,injured,ache,back,knee}',
  'Pain is information. It tells you that you are alive. If you treat every ache like a stop sign, you will park your life in the driveway of mediocrity. Duct tape it. Ice it. Move around it. But do not stop. Adapt or decay.',
  true
),
(
  'lie',
  '{tomorrow,monday,later,next week}',
  'Monday is a graveyard for potential. You are bargaining with your own weakness. If you cannot start at 11:58 PM on a Tuesday, you will never start. You are building a habit of hesitation. Entropy does not wait for the calendar. Break the loop. Start now.',
  true
),
(
  'lie',
  '{depressed,sad,mental,unhappy,mood}',
  'You are sad because you are failing your own potential. Action is the antidote to despair. You are waiting to ''feel better'' before you work, but the work is the only thing that will make you feel better. Sweat is the cure. Go get it.',
  true
),
(
  'lie',
  '{confused,know how,start,begin}',
  'Ignorance is a choice in the age of information. You have the sum of human knowledge in your pocket and you use it to look at memes. Figure it out. Confusion is just fear wearing a mask. Stop stalling and start moving.',
  true
),

-- ---------------------------------------------------------
-- ZONE B: THE POISON (Vices)
-- ---------------------------------------------------------

(
  'poison',
  '{game,gaming,video,console,ps5,xbox,pc}',
  'You are grinding for XP in a fake world while your real life character is Level 1. You are trading your legacy for pixels. You feel accomplished because the game gave you a badge, but outside that screen, you haven''t built sh*t. The real game has no respawns.',
  true
),
(
  'poison',
  '{scroll,social,tiktok,insta,facebook,media}',
  'You are donating your soul to an algorithm. Every swipe is a vote for mediocrity. You are consuming other men''s lives instead of architecting your own. You are a spectator in the arena. Turn it off. Face the void.',
  true
),
(
  'poison',
  '{porn,fap,adult}',
  'You are sitting in the dark watching other men live. It is the ultimate act of submission. You are frying your dopamine receptors and wondering why you have no drive. Reclaim your manhood. Stop being a cuck to your own screen.',
  true
),
(
  'poison',
  '{weed,smoke,high,stone,pot}',
  'You are sedating your potential. You claim it ''relaxes you,'' but really it just makes you okay with being boring. Clear the fog. The world needs you sharp, not stoned. Stop hiding in the smoke.',
  true
),
(
  'poison',
  '{drink,alcohol,beer,wine,party,bar}',
  'You are borrowing happiness from tomorrow with high interest. You are literally drinking poison to escape the reality you built. If you hate your life enough to numb it, change the life. Don''t drown it.',
  true
),
(
  'poison',
  '{sugar,junk,food,candy,eat,diet}',
  'You feed your body like a toddler and expect it to perform like a machine. You are a slave to your taste buds. Discipline starts at the mouth. If you can''t say no to a cookie, you can''t say no to anything.',
  true
),
(
  'poison',
  '{shop,buy,spending,amazon,money}',
  'You are trying to buy an identity because you haven''t built one. New gear won''t fix a weak mindset. You are filling the hole in your soul with packages. Stop consuming. Start creating.',
  true
),

-- ---------------------------------------------------------
-- ZONE C: THE DRIFT (Schedule)
-- ---------------------------------------------------------

(
  'drift',
  '{snooze,alarm,bed,sleep}',
  'The first decision you made today was a lie. You broke a contract with yourself before your feet hit the floor. You started the day with a defeat. If you can''t beat a plastic clock, how do you expect to beat the world?',
  true
),
(
  'drift',
  '{phone,bed,morning,wake}',
  'You wake up and immediately surrender your mind to the world. You are starting the day on defense, reacting to everyone else''s noise. The morning belongs to the Sovereign. Stop giving it away for free.',
  true
),
(
  'drift',
  '{late,night,tv,netflix,watch}',
  'You are stealing energy from tomorrow to numb yourself today. You are afraid to go to sleep because you haven''t done anything worthy of rest. Go to bed. The mission starts at 0600.',
  true
),
(
  'drift',
  '{wait,procrastinate,later}',
  'You are waiting for the ''perfect time.'' It doesn''t exist. Chaos is the standard. You are sitting on the sidelines waiting for a clear path while the savages are hacking through the jungle. Move.',
  true
),
(
  'drift',
  '{skip,meal,eat,forgot}',
  'You aren''t fasting; you are disorganized. An empty tank cannot run a high-performance engine. You are sabotaging your own biology because you can''t plan five minutes ahead. Amateur hour is over.',
  true
),
(
  'drift',
  '{messy,clean,room,house}',
  'Your environment is a reflection of your mind. You live in chaos because you think in chaos. Clean your damn room. You cannot order the world if you cannot order your own perimeter.',
  true
);
