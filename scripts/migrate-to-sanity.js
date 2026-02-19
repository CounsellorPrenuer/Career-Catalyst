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

const pricingData = {
    '8-9 STUDENTS': {
        standard: {
            planName: 'Discover',
            price: '₹5,500',
            paymentButtonId: 'pl_RwDuOx96VYrsyN',
            features: [
                { text: 'Psychometric assessment to measure your interests', included: true },
                { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Invites to live webinars by industry experts', included: true },
                { text: 'Customized reports after each session with education pathways', included: false },
                { text: 'Guidance on studying abroad', included: false },
                { text: 'CV building during internship/graduation', included: false },
            ],
        },
        premium: {
            planName: 'Discover plus+',
            price: '₹15,000',
            paymentButtonId: 'pl_RwDq8XpK76OhB3',
            isPremium: true,
            features: [
                { text: 'Psychometric assessments to measure your interests, personality and abilities', included: true },
                { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Invites to live webinars by industry experts', included: true },
                { text: 'Customized reports after each session with education pathways', included: true },
                { text: 'Guidance on studying abroad', included: true },
                { text: 'CV building during internship/graduation', included: true },
            ],
        },
    },
    '10-12 STUDENTS': {
        standard: {
            planName: 'Achieve Online',
            price: '₹5,999',
            paymentButtonId: 'pl_RwDxvLPQP7j4rG',
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '1 career counselling session', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Pre-recorded webinars by industry experts', included: true },
                { text: 'Customized reports after each session with education pathways', included: false },
                { text: 'Guidance on studying abroad', included: false },
                { text: 'CV reviews during internship/graduation', included: false },
            ],
        },
        premium: {
            planName: 'Achieve Plus+',
            price: '₹10,599',
            paymentButtonId: 'pl_RwDzfVkQYEdAIf',
            isPremium: true,
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '4 career counselling sessions', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Attend live webinars by industry experts', included: true },
                { text: 'Customized reports after each session with education pathways', included: true },
                { text: 'Guidance on studying abroad', included: true },
                { text: 'CV reviews during internship/graduation', included: true },
            ],
        },
    },
    'COLLEGE GRADUATES': {
        standard: {
            planName: 'Ascend Online',
            price: '₹6,499',
            paymentButtonId: 'pl_RwE1evNHrHWJDW',
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '1 career counselling session', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Pre-recorded webinars by industry experts', included: true },
                { text: 'Customized reports after each session with information on certificate/online courses', included: false },
                { text: 'Guidance on studying abroad', included: false },
                { text: 'CV reviews for job application', included: false },
            ],
        },
        premium: {
            planName: 'Ascend Plus+',
            price: '₹10,599',
            paymentButtonId: 'pl_RwE3WEILWB9WeJ',
            isPremium: true,
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '3 career counselling sessions', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Attend live webinars by industry experts', included: true },
                { text: 'Customized reports after each session with information on certificate/online courses', included: true },
                { text: 'Guidance on studying abroad', included: true },
                { text: 'CV reviews for job application', included: true },
            ],
        },
    },
    'WORKING PROFESSIONALS': {
        standard: {
            planName: 'Ascend Online',
            price: '₹6,499',
            paymentButtonId: 'pl_RwE1evNHrHWJDW',
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '1 career counselling session', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Pre-recorded webinars by industry experts', included: true },
                { text: 'Customized reports after each session with information on certificate/online courses', included: false },
                { text: 'Guidance on studying abroad', included: false },
                { text: 'CV reviews for job application', included: false },
            ],
        },
        premium: {
            planName: 'Ascend Plus+',
            price: '₹10,599',
            paymentButtonId: 'pl_RwE3WEILWB9WeJ',
            isPremium: true,
            features: [
                { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
                { text: '2 career counselling sessions', included: true },
                { text: 'Lifetime access to Knowledge Gateway', included: true },
                { text: 'Attend live webinars by industry experts', included: true },
                { text: 'Customized reports after each session with information on certificate/online courses', included: true },
                { text: 'Guidance on studying abroad', included: true },
                { text: 'CV reviews for job application', included: true },
            ],
        },
    },
};

const blogPosts = [
    {
        title: '5 Signs It\'s Time for a Career Change',
        excerpt:
            'Feeling stuck in your current role? Discover the key indicators that it might be time to explore new opportunities and reignite your professional passion.',
        date: '2025-01-15',
        category: 'Career Tips',
    },
    {
        title: 'Building High-Performance Teams in SMEs',
        excerpt:
            'Learn the strategic HR practices that transform average teams into exceptional performers, driving business growth and employee satisfaction.',
        date: '2025-01-10',
        category: 'HR Strategy',
    },
    {
        title: 'The Power of Values Alignment in Your Career',
        excerpt:
            'Discover how aligning your work with your core values can lead to unprecedented fulfillment, productivity, and long-term career success.',
        date: '2025-01-05',
        category: 'Personal Growth',
    },
];

async function migrate() {
    console.log('Starting migration...');

    // Migrate Pricing
    for (const [category, plans] of Object.entries(pricingData)) {
        // Standard
        await client.create({
            _type: 'pricing',
            planName: plans.standard.planName,
            category: category,
            price: plans.standard.price,
            isPremium: false,
            paymentButtonId: plans.standard.paymentButtonId,
            features: plans.standard.features
        }).then(res => console.log(`Created Standard plan for ${category}`));

        // Premium
        await client.create({
            _type: 'pricing',
            planName: plans.premium.planName,
            category: category,
            price: plans.premium.price,
            isPremium: true,
            paymentButtonId: plans.premium.paymentButtonId,
            features: plans.premium.features
        }).then(res => console.log(`Created Premium plan for ${category}`));
    }

    // Migrate Blog Posts
    for (const post of blogPosts) {
        await client.create({
            _type: 'blog',
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            category: post.category,
            content: [] // Empty content for now as it wasn't in the mock
        }).then(res => console.log(`Created Blog Post: ${post.title}`));
    }

    console.log('Migration complete!');
}

migrate().catch(console.error);
