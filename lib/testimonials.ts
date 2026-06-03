export interface Testimonial {
  quote: string;
  name: string;
  city?: string;
  stars: number;
}

export const stripTestimonials: Testimonial[] = [
  {
    quote: "You aren't speaking to someone in another country when you call! All local hardworking people improving our WV communities!",
    name: 'TL',
    city: 'South Charleston',
    stars: 5,
  },
  {
    quote: "Substantially cheaper than my previous internet provider. It's cheaper, faster, just all around better.",
    name: 'Jared',
    stars: 5,
  },
  {
    quote: 'Best internet experience I ever had. Love the local support team!',
    name: 'Vincent',
    stars: 5,
  },
  {
    quote: 'I have had SecureNet for the last couple years in South Charleston and have had zero problems.',
    name: 'Kaitlin',
    city: 'South Charleston',
    stars: 5,
  },
  {
    quote: 'Locally owned customer service with the phenomenal speeds and reliability of a fiber giant.',
    name: 'Mark',
    stars: 5,
  },
  {
    quote: 'Hands down the best internet in my area. Friendly staff, and for my budget they could not be beat.',
    name: 'Christopher',
    stars: 5,
  },
];

export interface ReviewSection {
  id: string;
  title: string;
  description: string;
  reviews: Testimonial[];
}

export const reviewSections: ReviewSection[] = [
  {
    id: 'speed',
    title: 'Faster Than the Big Guys',
    description: 'Speed, reliability, and fiber quality.',
    reviews: [
      { quote: 'Love the internet, running 2G! Patti is the best.', name: 'Loura', stars: 5 },
      { quote: 'LOVE THE SUPER FAST FIBER!', name: 'Deborah', stars: 5 },
      { quote: "Absolutely the best internet service I've ever had! SecureNet Fiber is lightning-fast, super reliable, and perfect for streaming, gaming, and working from home.", name: 'Ashley', stars: 5 },
      { quote: '10/10 recommend, my service is faster than ever!', name: 'Dezmone', stars: 5 },
      { quote: 'The internet is very fast and reliable!', name: 'Christina', stars: 5 },
      { quote: "SecureNet is the best most reliable internet in the valley! If there's ever a problem or concern the staff is always there to help.", name: 'Robin', stars: 5 },
      { quote: "The technician was here within 20 minutes of my phone call, he was friendly, professional, and fast to fix my problem. SecureNet is terrific and we'll be customers for as long as they'll have us!", name: 'Belle', stars: 5 },
    ],
  },
  {
    id: 'support',
    title: 'Real People, Real Support',
    description: 'A local team that actually picks up the phone.',
    reviews: [
      { quote: "You aren't speaking to someone in another country when you call! All local hardworking people improving our WV communities!", name: 'TL', city: 'South Charleston', stars: 5 },
      { quote: 'Best internet experience I ever had. Love the local support team!', name: 'Vincent', stars: 5 },
      { quote: 'Holly came to my house and explained the different service choices in detail. She is very knowledgeable and patient with new subscribers like me.', name: 'Mary', stars: 5 },
      { quote: "Will Charles was the most helpful and patient service person we've had!", name: 'Kelly', stars: 5 },
      { quote: 'Patti and John were the most professional and helpful people I have ever dealt with in this industry.', name: 'Marilyn', stars: 5 },
      { quote: 'Holly is the best because she will come back and help us baby boomers get connected.', name: 'Vicky', stars: 5 },
      { quote: 'Mark O was incredibly helpful in resolving my issue. Even after I went through extensive troubleshooting on my end, he patiently worked with me and got me back online.', name: 'Daniel', stars: 5 },
      { quote: 'Derrick from customer service was extremely helpful and provided amazing customer service!', name: 'Nancy', stars: 5 },
      { quote: 'Patti is great. She has explained things to where I even understand!!', name: 'Cindy', stars: 5 },
    ],
  },
  {
    id: 'switch',
    title: 'Made the Switch',
    description: 'Customers who left the big providers and never looked back.',
    reviews: [
      { quote: 'The internet is so much better than Optimum! Holly saved me a lot of money and gave me a way better experience with fiber!', name: 'John', stars: 5 },
      { quote: 'Switched over from Suddenlink/Optimum when you started in South Charleston. Great move!', name: 'Kim', stars: 5 },
      { quote: 'We recently switched from Optimum to SecureNet fiber. Great experience! People went out of their way to help us.', name: 'Lynn', stars: 5 },
      { quote: "Finally ditched Optimum and couldn't be happier!", name: 'Harrison', stars: 5 },
      { quote: "Had issues with Optimum and was without wifi for a month and was expected to pay for the month I didn't use. Took a risk on SecureNet... great decision.", name: 'Star', stars: 5 },
      { quote: 'I previously had Frontier fiber and after my first year my bill doubled. SecureNet gave me a 5 year price lock and I have never been more satisfied with customer service anywhere.', name: 'Ciara', stars: 5 },
      { quote: 'A really good alternative to dealing with Optimum and head and shoulders above Frontier!', name: 'JKC', stars: 5 },
      { quote: 'We had another provider and were disappointed. SecureNet has been great service!', name: 'Kenny', stars: 5 },
      { quote: "I can already tell a huge difference in my wifi speed. You've got a customer for life here.", name: 'Sherry', stars: 5 },
    ],
  },
  {
    id: 'value',
    title: 'Worth Every Penny',
    description: 'Price, value, and savings vs. the old provider.',
    reviews: [
      { quote: "Substantially cheaper than my previous internet provider. It's cheaper, faster, just all around better.", name: 'Jared', stars: 5 },
      { quote: 'Our internet is so much faster and less expensive than what we had been paying with our previous ISP.', name: 'Lanette', stars: 5 },
      { quote: 'Hands down the best internet in my area. Friendly staff, and for my budget they could not be beat.', name: 'Christopher', stars: 5 },
      { quote: "Locally owned customer service with the phenomenal speeds and reliability of a fiber giant. You won't find a better company!", name: 'Mark', stars: 5 },
      { quote: 'Affordable, professional, responsive, and thorough with exceptional customer service.', name: 'Michelle', stars: 5 },
    ],
  },
];
