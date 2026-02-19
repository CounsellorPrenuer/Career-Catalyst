import { createClient } from '@sanity/client';

const token = 'sk7Mm1dZC5yYZOQ1jlrZYUhNpo7O3Yvld83nqhg97v21aTvjb6bTGR11hqXC3JxzJatZXYiODMOZJxGgMCZJiZguvQIeaaZ6FVWTqVeJbBXMThzxrXGVF1Y5qig5OQP2aVH0V1DfnV1MthVzEUbxFb3nORVK8TEVhWCBuMXzCeVxInrSjDAq';
const projectId = 'ua6tzmti';
const dataset = 'production';

if (!token) {
    console.error("Sanity token is missing.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2023-05-03',
});

const customPlans = [
    {
        planId: 'career-report',
        title: 'Career Report',
        price: '₹1,500',
        description: 'Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.'
    },
    {
        planId: 'career-report-counselling',
        title: 'Career Report + Career Counselling',
        price: '₹3,000',
        description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at."
    },
    {
        planId: 'knowledge-gateway',
        title: 'Knowledge Gateway + Career Helpline Access',
        price: '₹100',
        description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love."
    },
    {
        planId: 'one-to-one-session',
        title: 'One-to-One Session with a Career Expert',
        price: '₹3,500',
        description: 'Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.'
    },
    {
        planId: 'college-admission-planning',
        title: 'College Admission Planning',
        price: '₹3,000',
        description: 'Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.'
    },
    {
        planId: 'exam-stress-management',
        title: 'Exam Stress Management',
        price: '₹1,000',
        description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind."
    },
    {
        planId: 'cap-100',
        title: 'College Admissions Planner - 100 (CAP-100)',
        price: '₹199',
        description: '₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!'
    }
];

const standardPackages = [
    {
        planId: 'pkg-1',
        planName: 'Discover',
        category: '8-9 Students',
        price: '₹5,500',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '1 career counselling session', included: true },
            { text: 'Lifetime Knowledge Gateway access', included: true },
            { text: 'Live webinar invites', included: true }
        ]
    },
    {
        planId: 'pkg-2',
        planName: 'Discover Plus+',
        category: '8-9 Students',
        price: '₹15,000',
        features: [
            { text: 'Psychometric assessments', included: true },
            { text: '8 career counselling sessions (1/year)', included: true },
            { text: 'Custom reports & study abroad guidance', included: true },
            { text: 'CV building', included: true }
        ]
    },
    {
        planId: 'pkg-3',
        planName: 'Achieve Online',
        category: '10-12 Students',
        price: '₹5,999',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '1 career counselling session', included: true },
            { text: 'Lifetime Knowledge Gateway access', included: true },
            { text: 'Pre-recorded webinars', included: true }
        ]
    },
    {
        planId: 'pkg-4',
        planName: 'Achieve Plus+',
        category: '10-12 Students',
        price: '₹10,599',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '4 career counselling sessions', included: true },
            { text: 'Custom reports & study abroad guidance', included: true },
            { text: 'CV reviews', included: true }
        ]
    },
    {
        planId: 'pkg-5',
        planName: 'Ascend Online',
        category: 'Graduates',
        price: '₹6,499',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '1 career counselling session', included: true },
            { text: 'Lifetime Knowledge Gateway access', included: true },
            { text: 'Pre-recorded webinars', included: true }
        ]
    },
    {
        planId: 'pkg-6',
        planName: 'Ascend Plus+',
        category: 'Graduates',
        price: '₹10,599',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '3 career counselling sessions', included: true },
            { text: 'Certificate/online course info', included: true },
            { text: 'CV reviews for jobs', included: true }
        ]
    },
    {
        planId: 'mp-3',
        planName: 'Ascend Online',
        category: 'Working Professionals',
        price: '₹6,499',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '1 career counselling session', included: true },
            { text: 'Lifetime Knowledge Gateway access', included: true },
            { text: 'Pre-recorded webinars', included: true }
        ]
    },
    {
        planId: 'mp-2',
        planName: 'Ascend Plus+',
        category: 'Working Professionals',
        price: '₹10,599',
        features: [
            { text: 'Psychometric assessment', included: true },
            { text: '3 career counselling sessions', included: true },
            { text: 'Certificate/online course info', included: true },
            { text: 'CV reviews for jobs', included: true }
        ]
    }
];

async function updateData() {
    console.log('Starting data update...');

    // 1. Delete all existing pricing documents
    console.log('Deleting existing pricing documents...');
    await client.delete({ query: '*[_type == "pricing"]' });

    // 2. Delete all existing customPlan documents (if any)
    console.log('Deleting existing customPlan documents...');
    await client.delete({ query: '*[_type == "customPlan"]' });

    // 3. Create Custom Plans
    console.log('Creating Custom Plans...');
    for (const plan of customPlans) {
        await client.create({
            _type: 'customPlan',
            ...plan
        });
        console.log(`Created custom plan: ${plan.title}`);
    }

    // 4. Create Standard Packages
    console.log('Creating Standard Packages...');
    for (const plan of standardPackages) {
        await client.create({
            _type: 'pricing',
            ...plan
        });
        console.log(`Created standard plan: ${plan.planName} (${plan.category})`);
    }

    console.log('Data update complete!');
}

updateData().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});
