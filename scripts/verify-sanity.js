import { createClient } from '@sanity/client';
const c = createClient({
    projectId: 'ua6tzmti',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
});

const [pricing, custom, blogs, coupons] = await Promise.all([
    c.fetch('*[_type == "pricing"]{planName, category, price}'),
    c.fetch('*[_type == "customPlan"]{title, price}'),
    c.fetch('*[_type == "blog"]{title, category}'),
    c.fetch('*[_type == "coupon"]{code, discountType, value, isActive}'),
]);

console.log('\n=== SANITY DATA VERIFICATION ===\n');
console.log(`📦 Standard Packages (${pricing.length}):`);
pricing.forEach(p => console.log(`   • ${p.planName} | ${p.category} | ${p.price}`));
console.log(`\n🎨 Custom Plans (${custom.length}):`);
custom.forEach(p => console.log(`   • ${p.title} | ${p.price}`));
console.log(`\n📝 Blog Posts (${blogs.length}):`);
blogs.forEach(p => console.log(`   • ${p.title} | ${p.category}`));
console.log(`\n🎟️  Coupons (${coupons.length}):`);
coupons.forEach(p => console.log(`   • ${p.code} | ${p.discountType}:${p.value} | active:${p.isActive}`));
console.log('\n✅ Verification complete!');
