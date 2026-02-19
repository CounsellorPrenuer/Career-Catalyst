import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'ua6tzmti',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: 'skwQtI2XnBp6bCNzummYqjpz4swVtpPKecetbi7K3aEryTW4DIB98QQrYnqe5NePhdZBMQ1O8tPMjiziuN1hyfURFug8y0GStjkXO3tdJNp1Q9sKtg0BWBDJ6S5Uck94m8IMIHkVnDaq8myt7fnQFrVZNkI02Cjrm5kksKRScqZaVR75UAaI',
});

// ── Standard Packages ──
const standardPackages = [
    {
        _id: 'pkg-1',
        _type: 'pricing',
        planId: 'pkg-1',
        planName: 'Discover',
        category: '8-9 Students',
        price: '₹5,500',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '1 career counselling session', included: true },
            { _key: 'f3', text: 'Lifetime Knowledge Gateway access', included: true },
            { _key: 'f4', text: 'Live webinar invites', included: true },
        ],
    },
    {
        _id: 'pkg-2',
        _type: 'pricing',
        planId: 'pkg-2',
        planName: 'Discover Plus+',
        category: '8-9 Students',
        price: '₹15,000',
        features: [
            { _key: 'f1', text: 'Psychometric assessments', included: true },
            { _key: 'f2', text: '8 career counselling sessions (1/year)', included: true },
            { _key: 'f3', text: 'Custom reports & study abroad guidance', included: true },
            { _key: 'f4', text: 'CV building', included: true },
        ],
    },
    {
        _id: 'pkg-3',
        _type: 'pricing',
        planId: 'pkg-3',
        planName: 'Achieve Online',
        category: '10-12 Students',
        price: '₹5,999',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '1 career counselling session', included: true },
            { _key: 'f3', text: 'Lifetime Knowledge Gateway access', included: true },
            { _key: 'f4', text: 'Pre-recorded webinars', included: true },
        ],
    },
    {
        _id: 'pkg-4',
        _type: 'pricing',
        planId: 'pkg-4',
        planName: 'Achieve Plus+',
        category: '10-12 Students',
        price: '₹10,599',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '4 career counselling sessions', included: true },
            { _key: 'f3', text: 'Custom reports & study abroad guidance', included: true },
            { _key: 'f4', text: 'CV reviews', included: true },
        ],
    },
    {
        _id: 'pkg-5',
        _type: 'pricing',
        planId: 'pkg-5',
        planName: 'Ascend Online',
        category: 'Graduates',
        price: '₹6,499',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '1 career counselling session', included: true },
            { _key: 'f3', text: 'Lifetime Knowledge Gateway access', included: true },
            { _key: 'f4', text: 'Pre-recorded webinars', included: true },
        ],
    },
    {
        _id: 'pkg-6',
        _type: 'pricing',
        planId: 'pkg-6',
        planName: 'Ascend Plus+',
        category: 'Graduates',
        price: '₹10,599',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '3 career counselling sessions', included: true },
            { _key: 'f3', text: 'Certificate/online course info', included: true },
            { _key: 'f4', text: 'CV reviews for jobs', included: true },
        ],
    },
    {
        _id: 'mp-3',
        _type: 'pricing',
        planId: 'mp-3',
        planName: 'Ascend Online',
        category: 'Working Professionals',
        price: '₹6,499',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '1 career counselling session', included: true },
            { _key: 'f3', text: 'Lifetime Knowledge Gateway access', included: true },
            { _key: 'f4', text: 'Pre-recorded webinars', included: true },
        ],
    },
    {
        _id: 'mp-2',
        _type: 'pricing',
        planId: 'mp-2',
        planName: 'Ascend Plus+',
        category: 'Working Professionals',
        price: '₹10,599',
        features: [
            { _key: 'f1', text: 'Psychometric assessment', included: true },
            { _key: 'f2', text: '3 career counselling sessions', included: true },
            { _key: 'f3', text: 'Certificate/online course info', included: true },
            { _key: 'f4', text: 'CV reviews for jobs', included: true },
        ],
    },
];

// ── Custom Plans ──
const customPlans = [
    {
        _id: 'career-report',
        _type: 'customPlan',
        planId: 'career-report',
        title: 'Career Report',
        price: '₹1,500',
        description: 'Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.',
    },
    {
        _id: 'career-report-counselling',
        _type: 'customPlan',
        planId: 'career-report-counselling',
        title: 'Career Report + Career Counselling',
        price: '₹3,000',
        description: 'Connect with India\'s top career coaches to analyse your psychometric report and shortlist the top three career paths you\'re most likely to enjoy and excel at.',
    },
    {
        _id: 'knowledge-gateway',
        _type: 'customPlan',
        planId: 'knowledge-gateway',
        title: 'Knowledge Gateway + Career Helpline Access',
        price: '₹100',
        description: 'Unlock holistic information on your career paths and get direct access to Mentoria\'s experts, who will resolve your career-related queries through our dedicated Career Helpline.',
    },
    {
        _id: 'one-to-one-session',
        _type: 'customPlan',
        planId: 'one-to-one-session',
        title: 'One-to-One Session with a Career Expert',
        price: '₹3,500',
        description: 'Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.',
    },
    {
        _id: 'college-admission-planning',
        _type: 'customPlan',
        planId: 'college-admission-planning',
        title: 'College Admission Planning',
        price: '₹3,000',
        description: 'Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.',
    },
    {
        _id: 'exam-stress-management',
        _type: 'customPlan',
        planId: 'exam-stress-management',
        title: 'Exam Stress Management',
        price: '₹1,000',
        description: 'Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India\'s top educators.',
    },
    {
        _id: 'cap-100',
        _type: 'customPlan',
        planId: 'cap-100',
        title: 'College Admissions Planner - 100 (CAP-100)',
        price: '₹199',
        description: '₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter.',
    },
];

// ── Blog Posts ──
const blogPosts = [
    {
        _id: 'blog-1',
        _type: 'blog',
        title: 'How to Choose the Right Career Path After 12th',
        slug: { _type: 'slug', current: 'choose-career-after-12th' },
        excerpt: 'Confused about what to do after 12th? Here is a comprehensive guide to help you make the right career decision based on your interests and strengths.',
        date: '2025-12-15',
        category: 'Career Guidance',
    },
    {
        _id: 'blog-2',
        _type: 'blog',
        title: 'Why Psychometric Tests Matter for Career Planning',
        slug: { _type: 'slug', current: 'psychometric-tests-career-planning' },
        excerpt: 'Psychometric assessments provide scientific insights into your personality, interests, and aptitude. Learn how they can shape your career decisions.',
        date: '2025-11-28',
        category: 'Assessment',
    },
    {
        _id: 'blog-3',
        _type: 'blog',
        title: '5 Study Abroad Myths Debunked',
        slug: { _type: 'slug', current: 'study-abroad-myths-debunked' },
        excerpt: 'Thinking of studying abroad but held back by misconceptions? We bust the top 5 myths about international education.',
        date: '2025-11-10',
        category: 'Study Abroad',
    },
    {
        _id: 'blog-4',
        _type: 'blog',
        title: 'Top 10 In-Demand Careers in 2026',
        slug: { _type: 'slug', current: 'top-careers-2026' },
        excerpt: 'The job market is evolving rapidly. Discover the top 10 careers that will be in high demand in 2026 and how you can prepare for them.',
        date: '2026-01-05',
        category: 'Career Trends',
    },
    {
        _id: 'blog-5',
        _type: 'blog',
        title: 'How to Build an Impressive CV as a Fresh Graduate',
        slug: { _type: 'slug', current: 'build-impressive-cv-graduate' },
        excerpt: 'Your CV is your first impression. Learn proven tips to create a standout resume even with limited work experience.',
        date: '2026-01-20',
        category: 'Career Tips',
    },
    {
        _id: 'blog-6',
        _type: 'blog',
        title: 'Managing Exam Stress: A Complete Guide',
        slug: { _type: 'slug', current: 'managing-exam-stress-guide' },
        excerpt: 'Exam stress can impact your performance. Here are scientifically-backed strategies to stay calm, focused, and perform your best.',
        date: '2026-02-01',
        category: 'Wellness',
    },
];

// ── Sample Coupon ──
const coupons = [
    {
        _id: 'coupon-welcome10',
        _type: 'coupon',
        code: 'WELCOME10',
        discountType: 'percentage',
        value: 10,
        isActive: true,
    },
];

async function populate() {
    console.log('🚀 Starting Sanity data population...\n');

    // Delete existing documents first
    console.log('🗑️  Clearing existing data...');
    const existingPricing = await client.fetch(`*[_type == "pricing"]._id`);
    const existingCustom = await client.fetch(`*[_type == "customPlan"]._id`);
    const existingBlogs = await client.fetch(`*[_type == "blog"]._id`);
    const existingCoupons = await client.fetch(`*[_type == "coupon"]._id`);

    let tx = client.transaction();
    [...existingPricing, ...existingCustom, ...existingBlogs, ...existingCoupons].forEach(id => tx.delete(id));
    await tx.commit();
    console.log('   ✅ Cleared old data\n');

    // Create Standard Packages
    console.log('📦 Creating Standard Packages...');
    tx = client.transaction();
    for (const pkg of standardPackages) {
        tx.createOrReplace(pkg);
        console.log(`   ✅ ${pkg.planName} (${pkg.category}) - ${pkg.price}`);
    }
    await tx.commit();

    // Create Custom Plans
    console.log('\n🎨 Creating Custom Plans...');
    tx = client.transaction();
    for (const plan of customPlans) {
        tx.createOrReplace(plan);
        console.log(`   ✅ ${plan.title} - ${plan.price}`);
    }
    await tx.commit();

    // Create Blog Posts
    console.log('\n📝 Creating Blog Posts...');
    tx = client.transaction();
    for (const post of blogPosts) {
        tx.createOrReplace(post);
        console.log(`   ✅ ${post.title}`);
    }
    await tx.commit();

    // Create Coupons
    console.log('\n🎟️  Creating Coupons...');
    tx = client.transaction();
    for (const coupon of coupons) {
        tx.createOrReplace(coupon);
        console.log(`   ✅ ${coupon.code} (${coupon.discountType}: ${coupon.value})`);
    }
    await tx.commit();

    console.log('\n🎉 All data populated successfully!');
    console.log(`   📦 ${standardPackages.length} Standard Packages`);
    console.log(`   🎨 ${customPlans.length} Custom Plans`);
    console.log(`   📝 ${blogPosts.length} Blog Posts`);
    console.log(`   🎟️  ${coupons.length} Coupons`);
}

populate().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
