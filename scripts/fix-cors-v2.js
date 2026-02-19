const projectId = 'ua6tzmti';
const token = 'skwQtI2XnBp6bCNzummYqjpz4swVtpPKecetbi7K3aEryTW4DIB98QQrYnqe5NePhdZBMQ1O8tPMjiziuN1hyfURFug8y0GStjkXO3tdJNp1Q9sKtg0BWBDJ6S5Uck94m8IMIHkVnDaq8myt7fnQFrVZNkI02Cjrm5kksKRScqZaVR75UAaI';

const origins = [
    'http://localhost:5173',
    'https://counsellorprenuer.github.io',
    'http://counsellorprenuer.github.io',
    'https://www.careerplans.pro',
    'https://careerplans.pro'
];

async function run() {
    console.log('🔍 Checking Project ID:', projectId);

    // Try to list current CORS origins (requires admin token)
    try {
        const listRes = await fetch(`https://api.sanity.io/v1/projects/${projectId}/cors`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (listRes.ok) {
            const current = await listRes.json();
            console.log('✅ Current CORS Origins:', current.map(c => c.origin));
        } else {
            console.log('⚠️ Could not list CORS origins (Token might not be Admin). Status:', listRes.status);
        }
    } catch (e) {
        console.log('❌ Error listing CORS:', e.message);
    }

    // Attempt to add anyway
    for (const origin of origins) {
        try {
            const res = await fetch(`https://api.sanity.io/v1/projects/${projectId}/cors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ origin, allowCredentials: true })
            });
            if (res.ok) {
                console.log(`✅ Success: ${origin}`);
            } else {
                const body = await res.json();
                console.log(`ℹ️ Info: ${origin} -> ${body.message || res.statusText}`);
            }
        } catch (e) {
            console.log(`❌ Error adding ${origin}: ${e.message}`);
        }
    }
}

run();
