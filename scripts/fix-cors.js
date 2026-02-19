const projectId = 'ua6tzmti';
const token = 'skwQtI2XnBp6bCNzummYqjpz4swVtpPKecetbi7K3aEryTW4DIB98QQrYnqe5NePhdZBMQ1O8tPMjiziuN1hyfURFug8y0GStjkXO3tdJNp1Q9sKtg0BWBDJ6S5Uck94m8IMIHkVnDaq8myt7fnQFrVZNkI02Cjrm5kksKRScqZaVR75UAaI';

const origins = [
    'http://localhost:5173',
    'https://counsellorprenuer.github.io',
];

async function addCorsOrigins() {
    console.log('🌐 Adding CORS origins to Sanity...\n');

    for (const origin of origins) {
        try {
            const response = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    origin,
                    allowCredentials: true
                })
            });

            if (response.ok) {
                console.log(`✅ Added/Verified origin: ${origin}`);
            } else {
                const error = await response.json();
                console.log(`❌ Failed to add ${origin}:`, error.message || response.statusText);
            }
        } catch (err) {
            console.error(`❌ Error adding ${origin}:`, err.message);
        }
    }
    console.log('\n✨ DONE! CORS origins have been updated.');
}

addCorsOrigins();
