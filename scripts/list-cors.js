const projectId = 'ua6tzmti';
const token = 'skwQtI2XnBp6bCNzummYqjpz4swVtpPKecetbi7K3aEryTW4DIB98QQrYnqe5NePhdZBMQ1O8tPMjiziuN1hyfURFug8y0GStjkXO3tdJNp1Q9sKtg0BWBDJ6S5Uck94m8IMIHkVnDaq8myt7fnQFrVZNkI02Cjrm5kksKRScqZaVR75UAaI';

async function listCors() {
    const url = `https://api.sanity.io/v1/projects/${projectId}/cors`;
    try {
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
            console.log('✅ Current CORS Origins:', data.map(o => o.origin));
        } else {
            console.log('❌ Error:', data.message || res.statusText);
        }
    } catch (err) {
        console.error('❌ Fetch Error:', err.message);
    }
}

listCors();
