import { 
  FlowerItem, 
  BouquetItem, 
  BuyItem, 
  MessageItem, 
  ComplimentItem, 
  SurpriseItem, 
  MainCategoryHer 
} from '../types';

// ======================================================================
// 10 MAIN CATEGORIES FOR HER
// ======================================================================

export const HER_MAIN_CATEGORIES: MainCategoryHer[] = [
  {
    id: 'to-do',
    title: 'TO DO FOR HER',
    emoji: '💐',
    tagline: 'Little things you can do that make her feel loved.',
    description: 'Effortless actions, unhurried evenings, and gentle rituals crafted just for her.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '🌷 Flowers',
      '🍳 Make something for her',
      '🍽️ Take her somewhere',
      '🎬 Plan a movie night',
      '🌙 Late-night ideas',
      '☀️ Morning ideas',
      '🧸 Comfort her',
      '💆 Help her relax',
      '🎨 Make something together',
      '📖 Write something for her',
      '🫶 Random acts of kindness'
    ],
    accentColor: 'rose'
  },
  {
    id: 'to-buy',
    title: 'TO BUY FOR HER',
    emoji: '🎁',
    tagline: 'Because sometimes you see something and immediately think of her.',
    description: 'Curated, aesthetic and meaningful tokens she will keep on her vanity or carry everywhere.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '🌷 Flowers',
      '🌸 Perfume',
      '💍 Jewellery',
      '👜 Bags',
      '📖 Books',
      '🎀 Cute little things',
      '🧸 Plushies',
      '💄 Beauty',
      '👗 Fashion',
      '☕ Cozy things',
      '🎧 Tech/gadgets',
      '🍫 Snacks & treats',
      '💌 Personalized gifts',
      '💸 Under ₹500',
      '💸 Under ₹1000',
      '💸 Under ₹2000'
    ],
    accentColor: 'amber'
  },
  {
    id: 'to-tell',
    title: 'TO TELL HER',
    emoji: '💌',
    tagline: 'Things you\'ve been meaning to say.',
    description: 'Paced, poetic, and vulnerable words for waking up, falling asleep, or quiet afternoons.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '☀️ Good Morning',
      '🌙 Good Night',
      '💌 I Love You',
      '🫶 I Miss You',
      '🤍 I\'m Proud of You',
      '🌷 Thank You',
      '🥹 I Appreciate You',
      '✨ Random Sweet Message',
      '💭 I Was Thinking About You',
      '📝 Long Message',
      '💌 Love Letter'
    ],
    accentColor: 'pink'
  },
  {
    id: 'to-compliment',
    title: 'TO COMPLIMENT HER',
    emoji: '🌹',
    tagline: 'Tell her what you notice.',
    description: 'Specific, intimate observations about her laugh, her quirks, her mind, and her heart.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '✨ Her Smile',
      '👀 Her Eyes',
      '💇 Her Hair',
      '🌸 Her Style',
      '🫶 Her Personality',
      '🧠 Her Mind',
      '❤️ Her Heart',
      '🌷 Her Energy',
      '🎀 Her Little Habits',
      '🔥 Her Confidence',
      '🤍 The Way She Makes You Feel'
    ],
    accentColor: 'red'
  },
  {
    id: 'to-surprise',
    title: 'TO SURPRISE HER',
    emoji: '✨',
    tagline: 'Make an ordinary day feel a little less ordinary.',
    description: 'Quiet departures from routine that remind her she is constantly adored.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '💌 Leave a note',
      '🍫 Send her favorite snack',
      '🎵 Make a playlist',
      '💐 Send flowers unexpectedly',
      '🌅 Plan a tiny date',
      '🎙️ Send a voice note',
      '🍳 Make her favorite food',
      '✉️ Give her a handwritten letter',
      '🎞️ Recreate a memory',
      '🎁 Give her a tiny gift'
    ],
    accentColor: 'purple'
  },
  {
    id: 'to-make-smile',
    title: 'TO MAKE HER SMILE',
    emoji: '🫶',
    tagline: 'For no reason other than you wanted to.',
    description: 'Cheeky banter, adorable distractions, warm hugs, and silly reminders that make her eyes crinkle.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '😂 Funny messages',
      '🥰 Cute messages',
      '🎮 Games',
      '🎵 Songs',
      '🐻 Cute distractions',
      '💌 Random compliments',
      '🎲 Random challenge',
      '📸 Send a funny photo',
      '🫶 Virtual hug',
      '💭 Random question'
    ],
    accentColor: 'orange'
  },
  {
    id: 'to-make-memory',
    title: 'TO MAKE A MEMORY',
    emoji: '📸',
    tagline: 'Something you\'ll both remember later.',
    description: 'Tangible archives of your journey—timelines, photo scrapbooks, secret places, and favorite moments.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '📸 Photo memories',
      '📖 Scrapbook',
      '🗓️ Timeline',
      '💌 Our Story',
      '🎵 Playlist',
      '🎨 Memory cards',
      '🌍 Places we\'ve been',
      '📝 Things we want to do',
      '⭐ Favorite moments'
    ],
    accentColor: 'emerald'
  },
  {
    id: 'to-make-day',
    title: 'TO MAKE HER DAY',
    emoji: '🌙',
    tagline: 'Little gestures for the mornings, evenings and everything between.',
    description: 'Thoughtful lifelines for when she is stressed, studying late, or simply needs a calm refuge.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '☀️ Good morning',
      '🌙 Good night',
      '😔 She\'s having a bad day',
      '😩 She\'s stressed',
      '🥹 She\'s emotional',
      '🎉 She\'s celebrating',
      '📚 She\'s studying',
      '💼 She\'s working',
      '🫂 She needs comfort',
      '❤️ You simply miss her'
    ],
    accentColor: 'indigo'
  },
  {
    id: 'little-things',
    title: 'LITTLE THINGS FOR HER',
    emoji: '🎀',
    tagline: 'The tiny gestures that somehow mean the most.',
    description: 'Holding her coat, remembering how she takes her tea, playing with her hair, and noticing the subtleties.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '☕ Morning rituals',
      '🧸 Comfort habits',
      '🎧 Shared music',
      '🧥 Gentle acts',
      '🤍 Quiet observations',
      '🌙 Evening check-ins'
    ],
    accentColor: 'rose'
  },
  {
    id: 'just-because',
    title: 'JUST BECAUSE',
    emoji: '🤍',
    tagline: 'No birthday. No anniversary. No reason. Just her.',
    description: 'The purest form of affection is the one that exists without a date on the calendar.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85',
    subcategories: [
      '💌 Unprompted note',
      '🧁 Spontaneous treat',
      '📷 Random photo of her',
      '🎶 A song for no reason',
      '🫂 Five-second longer hug',
      '✨ Just checking in'
    ],
    accentColor: 'stone'
  }
];

// ======================================================================
// 20+ FLOWERS DATA FOR HER (with dynamic emotional sentences)
// ======================================================================

export const HER_FLOWERS: FlowerItem[] = [
  {
    id: 'daisy',
    name: 'Daisy',
    emoji: '🌼',
    image: '/flowers/daisy.jpg',
    shortDesc: 'Pure simplicity, cheerful warmth, and uncluttered innocence.',
    emotionalSentences: [
      '“Such a calm and well-polished girl.”',
      '“For the girl who feels like a quiet Sunday morning.”',
      '“She has a soft kind of beautiful that never has to shout.”',
      '“Calm, effortless and impossible not to love.”',
      '“For her soft-girl era, when peace is her greatest luxury.”',
      '“A little flower for someone who makes everything feel peaceful.”'
    ],
    whySheMightLikeThis: 'Daisies feel unpretentious and sincere. They remind her that beauty doesn\'t have to be loud or complicated.',
    vibe: 'Soft Sunday, quiet laughter, clean linen',
    occasion: 'Just because, cheerful morning surprise, gentle thinking of you'
  },
  {
    id: 'pink-tulip',
    name: 'Pink Tulip',
    emoji: '🌷',
    image: '/flowers/pink_tulip.jpg',
    shortDesc: 'Understated affection, grace, and fresh new beginnings.',
    emotionalSentences: [
      '“For the girl who makes ordinary days feel pretty.”',
      '“Soft, blush-toned affection that blooms quietly.”',
      '“She has that rare elegance that doesn\'t try too hard.”',
      '“Like the first warm breeze after months of cold.”',
      '“To remind her that she is the sweetest part of my week.”'
    ],
    whySheMightLikeThis: 'Pink tulips are sweet, modern, and feminine without the high-pressure weight of red roses. Perfect for tender love.',
    vibe: 'Parisian flower cart, blush cheeks, tender care',
    occasion: 'Spring days, spontaneous coffee date, subtle admiration'
  },
  {
    id: 'white-rose',
    name: 'White Rose',
    emoji: '🌹',
    image: '/flowers/white_rose.jpg',
    shortDesc: 'Timeless serenity, deep loyalty, and understated majesty.',
    emotionalSentences: [
      '“For something timeless, quiet and beautiful — just like her.”',
      '“A quiet certainty in a loud world.”',
      '“She carries herself with a grace that never fades.”',
      '“The kind of love that doesn\'t waver when the room goes quiet.”',
      '“Clean, sacred, and infinitely precious.”'
    ],
    whySheMightLikeThis: 'White roses embody devotion and reverence. They signal that you view your bond as something truly enduring.',
    vibe: 'Silk ribbons, handwritten vows, midnight candlelight',
    occasion: 'Anniversary, sincere apologies, profound appreciation'
  },
  {
    id: 'red-rose',
    name: 'Red Rose',
    emoji: '🌹',
    image: '/flowers/classic_rose.jpg',
    shortDesc: 'Uncompromising passion, classic romance, and wholehearted adoration.',
    emotionalSentences: [
      '“For the girl who owns my entire heart, without competition.”',
      '“Classic, intoxicating, and completely hers.”',
      '“Because some feelings are too fierce for pastel shades.”',
      '“A love letter wrapped in velvet petals.”',
      '“She is my only constant muse.”'
    ],
    whySheMightLikeThis: 'The definitive universal symbol of unwavering passion. It leaves zero doubt about how deeply she is desired.',
    vibe: 'Romantic candlelit dinners, velvet, poetry in the rain',
    occasion: 'Valentine’s Day, romantic anniversaries, dramatic declarations'
  },
  {
    id: 'pink-rose',
    name: 'Pink Rose',
    emoji: '🌹',
    image: '/flowers/pink_rose.jpg',
    shortDesc: 'Gratitude, poetic sweetness, and blossoming gentleness.',
    emotionalSentences: [
      '“For the sweetest soul in any room she enters.”',
      '“Every petal carries a thank you I haven’t said out loud.”',
      '“She makes kindness look like the easiest thing in the world.”',
      '“Delicate, luminous, and endlessly captivating.”',
      '“To match the softness in her eyes when she laughs.”'
    ],
    whySheMightLikeThis: 'Pink roses feel appreciative, warm, and romantic. They praise her grace and gentle temperament.',
    vibe: 'Ballet flats, warm tea, cozy afternoon confessions',
    occasion: 'Gratitude, celebrating her achievements, playful flirting'
  },
  {
    id: 'yellow-rose',
    name: 'Yellow Rose',
    emoji: '🌹',
    image: '/flowers/yellow_rose.jpg',
    shortDesc: 'Radiant friendship, shared laughter, and golden warmth.',
    emotionalSentences: [
      '“For the person who makes me laugh until my stomach hurts.”',
      '“A little pocket of sunshine on an ordinary day.”',
      '“Because my favorite part of love is our friendship.”',
      '“Pure joy in botanical form.”',
      '“To remind her that she is my favorite person to talk to.”'
    ],
    whySheMightLikeThis: 'Celebrates the deep companionship and comfort of your connection. Vibrant and uplifting without heaviness.',
    vibe: 'Road trips, singing off-key, golden hour glow',
    occasion: 'Cheering her up, celebrating good news, friendship-first love'
  },
  {
    id: 'white-tulip',
    name: 'White Tulip',
    emoji: '🌷',
    image: '/flowers/white_tulip.jpg',
    shortDesc: 'Peace, new beginnings, forgiveness, and serene clarity.',
    emotionalSentences: [
      '“For the girl whose presence is an exhale.”',
      '“A fresh start wrapped in crisp green and pure white.”',
      '“Peaceful, unhurried, and genuinely calming.”',
      '“Like morning light on white sheets.”',
      '“Because loving her brings clarity to everything else.”'
    ],
    whySheMightLikeThis: 'Minimalist, architectural, and calming. Perfect for girls who adore Scandinavian design and uncluttered serenity.',
    vibe: 'Minimalist chic, matcha lattes, clean desk aesthetics',
    occasion: 'Stress relief, soothing reassurance, modern romantic surprise'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    emoji: '🌻',
    image: '/flowers/sunflower.jpg',
    shortDesc: 'Loyalty, unabashed joy, and radiant adoration.',
    emotionalSentences: [
      '“For the girl who somehow brings sunshine with her wherever she walks.”',
      '“Golden, loyal, and unapologetically bright.”',
      '“She turns my whole world toward the light.”',
      '“Impossible to look at without a smile forming.”',
      '“My favorite ray of light on the cloudiest afternoons.”'
    ],
    whySheMightLikeThis: 'Sunflowers always look toward the sun, just as you look toward her. They convey unshakable loyalty and warmth.',
    vibe: 'Sun-drenched picnics, summer drives, radiant laughter',
    occasion: 'When she feels down, summer dates, spontaneous pick-me-up'
  },
  {
    id: 'baby-breath',
    name: 'Baby\'s Breath',
    emoji: '🤍',
    image: '/flowers/baby_breath.jpg',
    shortDesc: 'Everlasting love, tiny constellations, and delicate sincerity.',
    emotionalSentences: [
      '“For something tiny, delicate and unexpectedly meaningful.”',
      '“Like a cloud of little whispered promises.”',
      '“She finds magic in the details everyone else rushes past.”',
      '“Soft, ethereal, and endlessly poetic.”',
      '“A constellation of quiet thoughts about her.”'
    ],
    whySheMightLikeThis: 'A cloud of miniature blossoms that dries gracefully and lasts for months. Understated and aesthetic.',
    vibe: 'Fairy lights, dried flower bookmarks, whispers',
    occasion: 'Accompaniment to a handwritten letter, bedroom nightstand decor'
  },
  {
    id: 'peony',
    name: 'Peony',
    emoji: '🌸',
    image: '/flowers/peony.jpg',
    shortDesc: 'Lush romance, prosperous love, and poetic luxury.',
    emotionalSentences: [
      '“Because she deserves something as rich and lovely as her heart.”',
      '“A hundred ruffled petals of pure admiration.”',
      '“She has that dreamy, vintage romance about her.”',
      '“A rare luxury for the girl who makes my life feel abundant.”',
      '“Dramatic softness in the most captivating way.”'
    ],
    whySheMightLikeThis: 'The holy grail flower for aesthetic, romantic girls. Peonies feel lavish, fragrant, and deeply intentional.',
    vibe: 'High-end floral boutiques, silk robes, soft pink clouds',
    occasion: 'Special milestones, birthdays, proving you know her taste'
  },
  {
    id: 'hydrangea',
    name: 'Hydrangea',
    emoji: '💙',
    image: '/flowers/hydrangea.jpg',
    shortDesc: 'Heartfelt gratitude, abundance, and emotional understanding.',
    emotionalSentences: [
      '“For understanding me even when words fail.”',
      '“An ocean of gratitude gathered into a single bloom.”',
      '“She holds space for my heart with such tenderness.”',
      '“Abundant, soft, and quietly magnificent.”',
      '“Because every day with her feels fuller and kinder.”'
    ],
    whySheMightLikeThis: 'Voluminous cloud-like clusters in gentle blues, purples, and pastels. Represents understanding and profound gratitude.',
    vibe: 'Coastal rain, oversized knit sweaters, deep talks',
    occasion: 'Thank you gestures, after working through a disagreement, cozy evenings'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    emoji: '💜',
    image: '/flowers/lavender.jpg',
    shortDesc: 'Tranquility, devotion, calm dreams, and emotional protection.',
    emotionalSentences: [
      '“For the girl whose voice is my favorite lullaby.”',
      '“A scent that carries stillness and sweet dreams.”',
      '“Her presence is the remedy to my busiest days.”',
      '“Gentle, herbal, and deeply soothing.”',
      '“To bring calm to her pillow and peace to her heart.”'
    ],
    whySheMightLikeThis: 'Scented, relaxing, and everlasting. Perfect for girls who experience stress and value holistic, calming rituals.',
    vibe: 'Provence hills, herbal teas, nighttime journals',
    occasion: 'Exam or work stress, bedtime care package, cozy season'
  },
  {
    id: 'lily',
    name: 'Stargazer Lily',
    emoji: '🌺',
    image: '/flowers/lily.jpg',
    shortDesc: 'Ambition, captivating fragrance, and divine devotion.',
    emotionalSentences: [
      '“She walks with a presence that demands the room to breathe.”',
      '“Bold, fragrant, and impossible to forget.”',
      '“To match her fierce intelligence and captivating charm.”',
      '“A blossom that fills the entire home with sweetness.”',
      '“Because ordinary will never describe her.”'
    ],
    whySheMightLikeThis: 'Remarkably fragrant and sculptural. Shows that you see her as magnetic, inspiring, and uniquely impressive.',
    vibe: 'Evening galas, rich perfumes, starlit balconies',
    occasion: 'Big promotions, celebrations, sophisticated dates'
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    emoji: '🌸',
    image: '/flowers/cherry_blossom.jpg',
    shortDesc: 'Fleeting beauty, precious moments, and poetic renewal.',
    emotionalSentences: [
      '“A reminder to hold every second with her gently.”',
      '“Soft pink skies and the sweetness of now.”',
      '“She turns ordinary seconds into memories I want to keep forever.”',
      '“Ephemeral grace that captures your breath.”',
      '“For the girl who is poetry in motion.”'
    ],
    whySheMightLikeThis: 'Soft and whimsical, evoking springtime in Kyoto. Ideal for someone with an artistic, romantic, or daydreaming soul.',
    vibe: 'Japanese watercolors, spring breezes, tender memories',
    occasion: 'Spring milestones, creative inspiration, gentle romance'
  },
  {
    id: 'carnation',
    name: 'Blush Carnation',
    emoji: '🌸',
    image: '/flowers/carnation.jpg',
    shortDesc: 'Fascinating affection, pure devotion, and enduring resilience.',
    emotionalSentences: [
      '“Ruffled sweetness that outlasts every expectation.”',
      '“She is resilient, gentle, and utterly devoted.”',
      '“A quiet charm that stays fresh day after day.”',
      '“To remind her that my fondness for her only deepens.”',
      '“Unpretentious perfection.”'
    ],
    whySheMightLikeThis: 'Long-lasting and beautifully ruffled, pink carnations symbolize enduring motherly or tender romantic affection.',
    vibe: 'Vintage postcards, lace handkerchiefs, daily faithfulness',
    occasion: 'Everyday love notes, long-distance care packages, sweet encouragement'
  },
  {
    id: 'orchid',
    name: 'White Orchid',
    emoji: '🤍',
    image: '/flowers/orchid.jpg',
    shortDesc: 'Refinement, exotic grace, and lasting elegance.',
    emotionalSentences: [
      '“For the most refined and elegant person I know.”',
      '“She doesn\'t follow trends; she creates an atmosphere.”',
      '“Sculptural perfection that blooms for months.”',
      '“To honor the depth and sophistication in her spirit.”',
      '“A living masterpiece for her space.”'
    ],
    whySheMightLikeThis: 'An orchid is a living plant that can bloom for months, symbolizing a relationship that is carefully nurtured and prized.',
    vibe: 'Architectural minimalism, luxury skincare, quiet confidence',
    occasion: 'New home, professional milestone, lasting declaration'
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    emoji: '🤍',
    image: '/flowers/jasmine.jpg',
    shortDesc: 'Sweet nocturnal fragrance, delicate modesty, and sacred warmth.',
    emotionalSentences: [
      '“Her warmth lingers in the room long after she steps away.”',
      '“Tiny white stars that scent the midnight air.”',
      '“Modest in appearance, intoxicating in presence.”',
      '“For the girl whose touch feels like coming home.”',
      '“A gentle fragrance of pure tenderness.”'
    ],
    whySheMightLikeThis: 'Intensely fragrant and deeply comforting. Often braided into hair or kept on window sills for sweet sleep.',
    vibe: 'Warm monsoon breezes, braided hair, nostalgic memories',
    occasion: 'Traditional occasions, quiet nights in, sentimental surprise'
  },
  {
    id: 'daffodil',
    name: 'Daffodil',
    emoji: '🌼',
    image: '/flowers/daffodil.jpg',
    shortDesc: 'Rebirth, optimism, cheerful devotion, and bright hope.',
    emotionalSentences: [
      '“Because tomorrow will be so much brighter than today.”',
      '“A yellow trumpet celebrating her resilience.”',
      '“She found a way to bloom even through the frost.”',
      '“Bright, stubborn joy that refuses to be discouraged.”',
      '“To remind her how proud I am of her spirit.”'
    ],
    whySheMightLikeThis: 'Daffodils announce the end of winter. Giving them tells her that better days are arriving and you are right beside her.',
    vibe: 'Spring gardens, crisp morning air, triumphant smiles',
    occasion: 'Encouragement after setbacks, new jobs, health recovery'
  },
  {
    id: 'classic-rose',
    name: 'Rose',
    emoji: '🌹',
    image: '/flowers/classic_rose.jpg',
    shortDesc: 'The timeless botanical emblem of passion, devotion, and poetry.',
    emotionalSentences: [
      '“The classic signature of someone whose heart has been captured completely.”',
      '“Centuries of poets could not invent a sweeter tribute to her grace.”',
      '“Because some feelings demand the original, unadorned symbol of love.”',
      '“Soft velvet petals that match the tenderness in her voice.”',
      '“A classic for the girl who deserves nothing less than timeless love.”'
    ],
    whySheMightLikeThis: 'A single classic rose or simple dozen cuts through the noise of modernity and declares unmistakable, enduring romance.',
    vibe: 'Old Hollywood romance, candlelit dinners, timeless handwritten notes',
    occasion: 'Anniversaries, grand romantic gestures, heartfelt apologies'
  },
  {
    id: 'classic-tulip',
    name: 'Tulip',
    emoji: '🌷',
    image: '/flowers/classic_tulip.jpg',
    shortDesc: 'Perfect, unpretentious elegance and cheerful devotion.',
    emotionalSentences: [
      '“Graceful stems that continue growing toward the light, just like her.”',
      '“For the girl whose elegance is completely effortless and quiet.”',
      '“A soft, gentle bloom that brightens the simplest room without shouting.”',
      '“She brings spring into my winter world.”',
      '“A little bunch wrapped in brown butcher paper, just because.”'
    ],
    whySheMightLikeThis: 'Tulips are adored for their clean, modern silhouette and charming personality—they even bend toward each other in water.',
    vibe: 'Dutch floral markets, clean aesthetic bedrooms, morning sunlight',
    occasion: 'Spontaneous weekday surprises, cheering her up, spring birthdays'
  }
];

// ======================================================================
// BOUQUETS FOR HER
// ======================================================================

export const HER_BOUQUETS: BouquetItem[] = [
  {
    id: 'the-soft-one',
    name: 'THE SOFT ONE',
    flowerIcons: ['🌷', '🌼', '🤍'],
    image: '/flowers/bouquet_soft_one.jpg',
    emotionalDesc: '“For the girl whose presence feels like peace.”',
    vibe: 'Unrushed Sunday morning, acoustic guitars, clean white sheets',
    occasion: 'Just because, gentle reassurance, quiet date nights',
    combination: 'Pink Tulips + Daisies + Baby’s Breath'
  },
  {
    id: 'the-lover-girl',
    name: 'THE LOVER GIRL',
    flowerIcons: ['🌹', '🌷', '🌸'],
    image: '/flowers/bouquet_lover_girl.jpg',
    emotionalDesc: '“A little dramatic. A little romantic. Completely her.”',
    vibe: 'Heart eyes, handwritten letters in fountain pen, blush pink lipstick',
    occasion: 'Anniversary, spontaneous romantic gestures, Valentine’s Day',
    combination: 'Deep Red Roses + Blush Peonies + Sweet Tulips'
  },
  {
    id: 'the-sunshine',
    name: 'THE SUNSHINE',
    flowerIcons: ['🌻', '🌼', '🤍'],
    image: '/flowers/bouquet_sunshine.jpg',
    emotionalDesc: '“For someone who makes difficult days feel lighter.”',
    vibe: 'Warm car rides, laughing out loud, golden hour glow',
    occasion: 'When she’s stressed, exam completion, cheer-up surprise',
    combination: 'Mini Sunflowers + Chamomile Daisies + Sprigs of Gypsophila'
  },
  {
    id: 'the-pretty-one',
    name: 'THE PRETTY ONE',
    flowerIcons: ['🌸', '🌷', '🌹'],
    image: '/flowers/bouquet_pretty_one.jpg',
    emotionalDesc: '“Because she deserves something as pretty as she is.”',
    vibe: 'Luxury French bakery, silk dresses, vanity tables',
    occasion: 'Her birthday, dressing up together, unforgettable dates',
    combination: 'Blush Ranunculus + Pink Garden Roses + Cherry Sprigs'
  },
  {
    id: 'the-sunday-morning',
    name: 'THE SUNDAY MORNING',
    flowerIcons: ['🤍', '🌿', '🌼'],
    image: '/flowers/bouquet_sunday_morning.jpg',
    emotionalDesc: '“For the one who makes ordinary moments feel like poetry.”',
    vibe: 'Pancake breakfasts, gentle kisses on the forehead, coffee mugs',
    occasion: 'Weekend surprise, breakfast in bed, quiet gratitude',
    combination: 'White Hydrangea + Eucalyptus + Chamomile Buds'
  },
  {
    id: 'the-french-garden',
    name: 'THE FRENCH GARDEN',
    flowerIcons: ['🌸', '🌿', '💐'],
    image: '/flowers/bouquet_french_garden.jpg',
    emotionalDesc: '“A wild, fragrant bundle gathered as if on a secret walk.”',
    vibe: 'Vintage baskets, Parisian flea markets, watercolor notebooks',
    occasion: 'Special dates, creative milestones, thinking of her',
    combination: 'French Lavender + Peonies + Wild Carnations'
  },
  {
    id: 'the-golden-hour',
    name: 'THE GOLDEN HOUR',
    flowerIcons: ['💛', '🌻', '🌾'],
    image: '/flowers/bouquet_golden_hour.jpg',
    emotionalDesc: '“Warm, amber devotion that feels like the last sunbeams of summer.”',
    vibe: 'Amber skies, warm breezes, honey tea, gentle shared glances',
    occasion: 'Golden anniversaries, milestones, sunny weekend dates',
    combination: 'Yellow Roses + Sunflowers + Dried Honey Stems'
  },
  {
    id: 'the-vintage-romance',
    name: 'THE VINTAGE ROMANCE',
    flowerIcons: ['🤍', '💜', '🌿'],
    image: '/flowers/bouquet_vintage_romance.jpg',
    emotionalDesc: '“For the girl whose soul belongs in a quiet 19th-century library.”',
    vibe: 'Fountain pens, wax seals, lavender pillows, classical records',
    occasion: 'Deep sentimental love letters, long distance, anniversaries',
    combination: 'White Garden Roses + English Lavender + Baby\'s Breath'
  }
];

// ======================================================================
// TO BUY FOR HER ITEMS (Editorial / Thoughtful discovery)
// ======================================================================

export const HER_BUY_ITEMS: BuyItem[] = [
  {
    id: 'buy-1',
    title: 'Warm Vanilla & Amber Hair Mist',
    subcategory: '🌸 Perfume',
    priceCategory: 'under_1000',
    priceDisplay: '₹750',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'It scents her hair with a delicate warmth that lingers softly whenever she hugs you.',
    thoughtfulTip: 'Spritz the inside of the gift bag before handing it to her.',
    tags: ['Perfume', 'Cozy', 'Under ₹1000']
  },
  {
    id: 'buy-2',
    title: 'Dainty Dotted Gold Chain with Her Initial',
    subcategory: '💍 Jewellery',
    priceCategory: 'under_1000',
    priceDisplay: '₹890',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Minimalist and hypoallergenic, so she can wear it everyday without having to take it off.',
    thoughtfulTip: 'Clasp it around her neck gently from behind as a sweet surprise.',
    tags: ['Jewellery', 'Personalized', 'Under ₹1000']
  },
  {
    id: 'buy-3',
    title: 'The Linen Bookmark & Literary Classic She Loves',
    subcategory: '📖 Books',
    priceCategory: 'under_500',
    priceDisplay: '₹420',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Shows you actually listen when she talks about her favorite authors and daydreaming worlds.',
    thoughtfulTip: 'Tuck a tiny handwritten note inside page 42.',
    tags: ['Books', 'Under ₹500', 'Thoughtful']
  },
  {
    id: 'buy-4',
    title: 'Silk Ribbon Scrunchie & Clip Set',
    subcategory: '🎀 Cute little things',
    priceCategory: 'under_500',
    priceDisplay: '₹299',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Prevents hair creasing and looks effortlessly cute on her wrist when not in use.',
    thoughtfulTip: 'Pick the exact shade that matches her favorite tote bag or jacket.',
    tags: ['Cute little things', 'Under ₹500', 'Everyday']
  },
  {
    id: 'buy-5',
    title: 'Weighted Plushie Heated Lavender Bear',
    subcategory: '🧸 Plushies',
    priceCategory: 'under_1000',
    priceDisplay: '₹899',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Can be microwaved for gentle warmth when she has cramps or feels tired after a long day.',
    thoughtfulTip: 'Warm it up before giving it to her on a movie night.',
    tags: ['Plushies', 'Cozy things', 'Under ₹1000']
  },
  {
    id: 'buy-6',
    title: 'Glaze Peptide Lip Balm & Rose Tint',
    subcategory: '💄 Beauty',
    priceCategory: 'under_500',
    priceDisplay: '₹480',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'The glossy hydration every girl keeps in her purse at all times.',
    thoughtfulTip: 'Notice the shade she wears on dates and get the nourishing companion.',
    tags: ['Beauty', 'Under ₹500']
  },
  {
    id: 'buy-7',
    title: 'Oversized Waffle Throw Blanket in Oat',
    subcategory: '☕ Cozy things',
    priceCategory: 'under_2000',
    priceDisplay: '₹1,450',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Soft enough to cocoon in while reading or binge-watching shows with you.',
    thoughtfulTip: 'Pair with two mugs of hot cocoa.',
    tags: ['Cozy things', 'Under ₹2000']
  },
  {
    id: 'buy-8',
    title: 'Artisan Hazelnut & Sea Salt Dark Chocolate Bar',
    subcategory: '🍫 Snacks & treats',
    priceCategory: 'under_500',
    priceDisplay: '₹280',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Rich, melt-in-the-mouth cocoa she can savor piece by piece during study sessions.',
    thoughtfulTip: 'Slip it secretly into her bag with a tiny heart sticky note.',
    tags: ['Snacks & treats', 'Under ₹500']
  },
  {
    id: 'buy-9',
    title: 'Retro Film Camera Disposable 36-Exposures',
    subcategory: '🎧 Tech/gadgets',
    priceCategory: 'under_2000',
    priceDisplay: '₹1,250',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Turns your day trips into aesthetic film snapshots you have to wait to develop together.',
    thoughtfulTip: 'Take the first candid photo of her smiling right after unwrapping it.',
    tags: ['Tech/gadgets', 'To make a memory', 'Under ₹2000']
  },
  {
    id: 'buy-10',
    title: 'Pastel Canvas Tote with Inner Zipper Pocket',
    subcategory: '👜 Bags',
    priceCategory: 'under_1000',
    priceDisplay: '₹650',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
    whySheLikesIt: 'Durable, chic, and large enough for her notebook, kindle, water bottle, and little essentials.',
    thoughtfulTip: 'Put her favorite candy in the inner pocket before giving it to her.',
    tags: ['Bags', 'Fashion', 'Under ₹1000']
  }
];

// ======================================================================
// TO TELL HER (Heartfelt words, letters, and texts)
// ======================================================================

export const HER_TELL_ITEMS: MessageItem[] = [
  {
    id: 'tell-1',
    category: '☀️ Good Morning',
    title: 'The Calm Morning Text',
    message: 'Good morning my love. Just wanted you to wake up knowing that you are the sweetest thought in my head. Have a soft, kind day—I believe in everything you do.',
    vibe: 'Warm, reassuring, gentle',
    tag: 'Morning'
  },
  {
    id: 'tell-2',
    category: '🌙 Good Night',
    title: 'Peaceful Bedtime Note',
    message: 'Close your eyes and let your shoulders drop. You carried so much today with grace. Sleep softly knowing you are deeply loved and completely safe with me.',
    vibe: 'Soothing, protective, tender',
    tag: 'Night'
  },
  {
    id: 'tell-3',
    category: '💌 I Love You',
    title: 'The Unhurried Truth',
    message: 'I love you not just for who you are when everything is easy, but for your heart, your quiet resilience, and the gentle way you change every room you step into.',
    vibe: 'Deep, sincere, lasting',
    tag: 'Deep'
  },
  {
    id: 'tell-4',
    category: '🫶 I Miss You',
    title: 'Looking at the Same Sky',
    message: 'I walked past that corner today and immediately wished you were beside me holding my sleeve. Missing you is proof that my world is so much fuller because of you.',
    vibe: 'Yearning, affectionate, sweet',
    tag: 'Miss you'
  },
  {
    id: 'tell-5',
    category: '🤍 I\'m Proud of You',
    title: 'Honoring Her Effort',
    message: 'I see how hard you try, even on days where nobody else notices the effort it took just to show up. You are brilliant, capable, and so inspiring to me.',
    vibe: 'Empowering, validating, grounded',
    tag: 'Proud'
  },
  {
    id: 'tell-6',
    category: '✨ Random Sweet Message',
    title: 'Middle of the Day Dispatch',
    message: 'No reason for this text other than: I saw something today that reminded me of your laugh, and my whole mood instantly got ten times better.',
    vibe: 'Spontaneous, playful, light',
    tag: 'Spontaneous'
  },
  {
    id: 'tell-7',
    category: '💭 I Was Thinking About You',
    title: 'Quiet Realization',
    message: 'Just had a quiet moment between tasks and realized how effortlessly you’ve become my favorite thought. Thank you for simply existing.',
    vibe: 'Romantic, unforced, honest',
    tag: 'Thinking of you'
  },
  {
    id: 'tell-8',
    category: '🌷 Thank You',
    title: 'Appreciating Her Presence',
    message: 'Thank you for the way you listen to me, for your patience when I stumble over words, and for making me feel like the luckiest person in the world.',
    vibe: 'Grateful, emotional, heartfelt',
    tag: 'Gratitude'
  }
];

// ======================================================================
// TO COMPLIMENT HER (Specific, observational, non-generic)
// ======================================================================

export const HER_COMPLIMENT_ITEMS: ComplimentItem[] = [
  {
    id: 'comp-1',
    category: '✨ Her Smile',
    compliment: 'You have that rare, crinkly-eyed smile that happens when you are completely caught off guard. It makes everyone around you feel like the sun just came out.',
    subtleDetail: 'Notice it when she laughs at a joke before she can filter herself.'
  },
  {
    id: 'comp-2',
    category: '👀 Her Eyes',
    compliment: 'Your eyes have this unmistakable depth when you are listening to someone you care about. It makes people feel genuinely understood.',
    subtleDetail: 'Look directly into her eyes while she recounts a story.'
  },
  {
    id: 'comp-3',
    category: '💇 Her Hair',
    compliment: 'I love how your hair falls when you tuck it behind your ear without thinking. It is effortlessly beautiful and completely yours.',
    subtleDetail: 'Gently tuck a strand away while telling her this softly.'
  },
  {
    id: 'comp-4',
    category: '🌸 Her Style',
    compliment: 'You don’t just wear clothes; you build an aesthetic. Everything you pick looks intentional, soft, and so uniquely tailored to your vibe.',
    subtleDetail: 'Compliment a specific detail—her earrings, her shoes, or her jacket shade.'
  },
  {
    id: 'comp-5',
    category: '🧠 Her Mind',
    compliment: 'The way your brain connects ideas and sees perspective in situations is something I respect deeply. Talking to you is always my favorite part of the day.',
    subtleDetail: 'Say this after an unhurried, late-night conversation.'
  },
  {
    id: 'comp-6',
    category: '❤️ Her Heart',
    compliment: 'You give so much kindness without keeping score. The world is often sharp, but you manage to remain gentle, and that is real courage.',
    subtleDetail: 'Remind her of this when she feels drained from helping others.'
  },
  {
    id: 'comp-7',
    category: '🌷 Her Energy',
    compliment: 'Being around you feels like sitting in the sun on a cold morning. You don’t have to do anything performative; just your presence calms my whole nervous system.',
    subtleDetail: 'Say this while resting your head near hers.'
  },
  {
    id: 'comp-8',
    category: '🎀 Her Little Habits',
    compliment: 'I love the little humming sound you make when you are focused, and the way you hold your warm tea mug with both hands like a treasure.',
    subtleDetail: 'Proof that you are paying attention to the tiny details.'
  },
  {
    id: 'comp-9',
    category: '🤍 The Way She Makes You Feel',
    compliment: 'You make loving someone feel safe, easy, and endlessly exciting all at the exact same time.',
    subtleDetail: 'Hold her hand and squeeze it twice.'
  }
];

// ======================================================================
// TO SURPRISE HER (Creative & Actionable Ideas)
// ======================================================================

export const HER_SURPRISE_ITEMS: SurpriseItem[] = [
  {
    id: 'surp-1',
    title: 'The Hidden Glove-Compartment Letter',
    effort: 'Thoughtful',
    estimatedCost: '₹0',
    timeRequired: '10 mins',
    cuteExplanation: 'Fold a handwritten love note inside her car visor or glove box so she discovers it unexpectedly on her commute.',
    category: 'Surprise',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=85',
    actionRoute: 'love_letter'
  },
  {
    id: 'surp-2',
    title: 'The Unprompted Snack Delivery',
    effort: 'Easy',
    estimatedCost: '₹150–₹300',
    timeRequired: '5 mins',
    cuteExplanation: 'Order her favorite pastry, boba, or fries to her office or doorstep around 4 PM with a note: "Refueling my favorite girl."',
    category: 'Surprise',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'surp-3',
    title: 'The "Songs That Sound Like You" Mixtape',
    effort: 'Creative',
    estimatedCost: '₹0',
    timeRequired: '20 mins',
    cuteExplanation: 'Curate 10 mellow, acoustic and dreamy tracks that match her aesthetic. Send her the link with no explanation other than a heart.',
    category: 'Surprise',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    actionRoute: 'date_plan'
  },
  {
    id: 'surp-4',
    title: 'A Single Stem Waiting on Her Pillow',
    effort: 'Easy',
    estimatedCost: '₹50–₹100',
    timeRequired: '5 mins',
    cuteExplanation: 'Place a single pink tulip or daisy right where she lays her head before bedtime, with a tiny tag reading: "For sweet dreams."',
    category: 'Surprise',
    image: '/flowers/pink_tulip.jpg'
  },
  {
    id: 'surp-5',
    title: 'The Spontaneous Sunset Drive & Dessert',
    effort: 'Thoughtful',
    estimatedCost: '₹300–₹500',
    timeRequired: '1.5 hours',
    cuteExplanation: 'Pick her up without telling her where you are going. Drive to a quiet elevated viewpoint and share an ice cream cone while watching the twilight.',
    category: 'Surprise',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    actionRoute: 'date_plan'
  },
  {
    id: 'surp-6',
    title: 'Digital "Open When" Capsule',
    effort: 'Creative',
    estimatedCost: '₹0',
    timeRequired: '15 mins',
    cuteExplanation: 'Build her a sealed set of digital letters for when she is sad, missing you, stressed, or needs a smile.',
    category: 'Surprise',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=85',
    actionRoute: 'open_when'
  }
];

// ======================================================================
// GLOBAL SURPRISE ME COLLECTION (Fast interactive inspirations)
// ======================================================================

export const SURPRISE_ME_COLLECTION = [
  {
    phrase: 'Today, tell her one thing you genuinely admire about her mind.',
    subtext: 'Not her clothes or hair—tell her about a decision she made or how she thinks.',
    category: '🌹 To Compliment Her',
    icon: '🧠'
  },
  {
    phrase: 'Send her a photo of something that reminded you of her right now.',
    subtext: 'A flower, a cup of coffee, a song lyric, or a funny sign on the street.',
    category: '🤍 Just Because',
    icon: '📸'
  },
  {
    phrase: 'Order her favorite snack to her door without asking if she wants it.',
    subtext: 'Food tastes twice as good when it arrives as a gentle surprise.',
    category: '✨ To Surprise Her',
    icon: '🥐'
  },
  {
    phrase: 'Tuck a tiny folded sticky note inside her handbag or book.',
    subtext: 'Write: "I hope you are smiling right now. You are my favorite."',
    category: '💌 To Tell Her',
    icon: '💌'
  },
  {
    phrase: 'Give her a five-second longer hug when you say goodbye today.',
    subtext: 'Rest your chin gently, take a deep breath together, and don\'t rush away.',
    category: '🎀 Little Things For Her',
    icon: '🫂'
  },
  {
    phrase: 'Send her a song without any caption except "Thought of you."',
    subtext: 'Pick an acoustic melody that feels like a quiet evening with her.',
    category: '🫶 To Make Her Smile',
    icon: '🎵'
  },
  {
    phrase: 'Ask her: "What is one thing that has been occupying your mind lately?"',
    subtext: 'Then just listen. Do not offer solutions unless she explicitly asks.',
    category: '🌙 To Make Her Day',
    icon: '☕'
  },
  {
    phrase: 'Buy her three stems of Baby\'s Breath or Daisies for no reason.',
    subtext: 'No occasion. No apology. Just because she makes ordinary days pretty.',
    category: '💐 To Do For Her',
    icon: '🌷'
  }
];
