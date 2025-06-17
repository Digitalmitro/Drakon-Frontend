// blogData.js
export const blogPosts = [
    {
      id: 1,
      title: 'Choosing the Perfect Batting Gloves: 2024 Buyer\'s Guide',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80',
      excerpt: 'Learn how to select batting gloves that enhance your grip and comfort at the plate',
      content: `
  <h2 class="text-2xl font-bold mb-4">Batting Glove Care</h2>
  <p class="mb-4"><strong>DO:</strong> Use leather conditioner monthly to maintain softness and prevent cracking.<br>
  <strong>DON'T:</strong> Never machine wash. Always hand wash with mild soap and lukewarm water.<br>
  <strong>PRO TIP:</strong> Stuff gloves with newspaper or a glove shaper to keep their form during drying.</p>

  <h2 class="text-2xl font-bold mb-4 mt-6">Sunglass Preservation</h2>
  <ul class="list-disc pl-6 mb-4">
    <li class="mb-2">Use a microfiber cloth and lens spray for cleaning – never your shirt!</li>
    <li class="mb-2">Rinse salt and sweat off immediately after coastal or high-sweat games.</li>
    <li class="mb-2">Store in a hard-shell case to avoid scratches or pressure damage.</li>
    <li>Replace nose pads and temple grips annually for a snug fit.</li>
  </ul>

  <h2 class="text-2xl font-bold mb-4 mt-6">Apparel Lifespan Extenders</h2>
  <p class="mb-4"><strong>Washing:</strong> Cold water wash only, avoid fabric softeners, and hang dry to prevent shrinking.<br>
  <strong>Stains:</strong> Pretreat stubborn stains with a baking soda paste or mild detergent before wash.<br>
  <strong>Storage:</strong> Avoid leaving wet or dirty apparel in gym bags — always air out post-practice.</p>

  <h2 class="text-2xl font-bold mb-4 mt-6">Shoe & Cleat Maintenance</h2>
  <p class="mb-4">Clean cleats after every game — dirt and turf can wear down the studs quickly. Use an old toothbrush to get into small grooves. Let them dry naturally and store with cedar shoe trees to reduce odor and maintain shape.</p>

  <h2 class="text-2xl font-bold mb-4 mt-6">Helmet & Protective Gear Care</h2>
  <ul class="list-disc pl-6 mb-4">
    <li class="mb-2">Wipe down with anti-bacterial wipes after each session</li>
    <li class="mb-2">Inspect padding monthly and replace if loose or worn</li>
    <li>Air dry gear in sunlight occasionally to kill bacteria and reduce odors</li>
  </ul>

  <div class="bg-blue-50 p-4 rounded-lg mb-6">
    <h3 class="text-lg font-semibold mb-2">Seasonal Deep Clean Kit</h3>
    <p>Our <strong>DuraCare Maintenance Bundle</strong> includes specialized cleaners for leather, synthetics, and lenses. Use code <strong>BLOG20</strong> at checkout for 20% off this month!</p>
  </div>

  <h2 class="text-2xl font-bold mb-4 mt-6">Final Tip: Build a Routine</h2>
  <p class="mb-4">Maintenance is less about effort and more about habit. Build a post-game checklist and make gear care a 10-minute ritual. Clean gear performs better, lasts longer, and shows your commitment to the game.</p>
`,

      author: 'Coach Mike Johnson',
      tags: ['batting gloves', 'equipment', 'buying guide']
    },
    {
      id: 2,
      title: 'Sunglasses That Actually Improve Your Game',
      date: 'April 2, 2024',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      excerpt: 'How premium lenses can reduce glare and help track fly balls better',
      content: `
        <h2 class="text-2xl font-bold mb-4">Lens Technology</h2>
        <p class="mb-4">Polarized lenses reduce glare but can make it harder to see chalk lines. Our <strong>HD Contrast</strong> lenses enhance ball tracking without distorting field vision.</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-6">Frame Fit Essentials</h2>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2">Nose pads should prevent sliding during sweat</li>
          <li class="mb-2">Temple arms shouldn't interfere with hats</li>
          <li>Wide enough for peripheral vision</li>
        </ul>
        
        <h2 class="text-2xl font-bold mb-4 mt-6">Best for Position Players</h2>
        <p class="mb-4"><strong>Outfielders:</strong> Mirror-coated lenses reduce sun angles<br>
        <strong>Infielders:</strong> Amber lenses enhance turf contrast<br>
        <strong>Catchers:</strong> Photochromic lenses adapt to day/night games</p>
      `,
      author: 'Dr. Sarah Chen - Sports Optometrist',
      tags: ['sunglasses', 'performance', 'optics']
    },
    {
      id: 3,
      title: 'Baseball Apparel: Moisture-Wicking vs. Compression',
      date: 'May 10, 2024',
      image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      excerpt: 'Which fabric technology works best for your position and climate',
      content: `
        <h2 class="text-2xl font-bold mb-4">The Science of Sweat</h2>
        <p class="mb-4">Moisture-wicking fabrics pull sweat to the surface to evaporate. Compression gear increases blood flow but may trap heat in humid conditions.</p>
        
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">Moisture-Wicking Pros</h3>
            <ul class="list-disc pl-6">
              <li class="mb-2">Better for hot climates</li>
              <li class="mb-2">Lighter weight</li>
              <li>Faster drying</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Compression Pros</h3>
            <ul class="list-disc pl-6">
              <li class="mb-2">Muscle support</li>
              <li class="mb-2">Reduces vibration on impact</li>
              <li>Warmer in cool weather</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mb-4 mt-6">Our Top Picks</h2>
        <p class="mb-2"><strong>Hot Weather:</strong> CoolFlex Pro Jerseys</p>
        <p class="mb-2"><strong>Arm Support:</strong> CompressionBase Sleeves</p>
        <p><strong>Dual Purpose:</strong> Hybrid Performance Tee</p>
      `,
      author: 'Team Equipment Manager Dave Wilson',
      tags: ['apparel', 'fabric technology', 'uniforms']
    },
    {
      id: 4,
      title: 'Gear Maintenance: Make Your Equipment Last',
      date: 'June 5, 2024',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80',
      excerpt: 'Pro tips to clean and preserve your batting gloves, sunglasses, and uniforms',
      content: `
        <h2 class="text-2xl font-bold mb-4">Batting Glove Care</h2>
        <p class="mb-4"><strong>DO:</strong> Use leather conditioner monthly<br>
        <strong>DON'T:</strong> Machine wash (hand wash only)<br>
        <strong>PRO TIP:</strong> Stuff with newspaper to maintain shape when drying</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-6">Sunglass Preservation</h2>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2">Always use microfiber case</li>
          <li class="mb-2">Rinse salt/sweat after coastal games</li>
          <li>Replace nose pads annually</li>
        </ul>
        
        <h2 class="text-2xl font-bold mb-4 mt-6">Apparel Lifespan Extenders</h2>
        <p class="mb-4"><strong>Washing:</strong> Cold water only, hang dry<br>
        <strong>Stains:</strong> Pretreat with baking soda paste<br>
        <strong>Storage:</strong> Never leave damp gear in bags</p>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Seasonal Deep Clean Kit</h3>
          <p>Our <strong>DuraCare Maintenance Bundle</strong> includes specialized cleaners for all equipment types. Use code BLOG20 for discount.</p>
        </div>
      `,
      author: 'Gear Specialist Lisa Rodriguez',
      tags: ['maintenance', 'cleaning', 'equipment care']
    }
  ];