// Profile data generation
const educationLevels = ["بكالوريوس", "ماجستير", "دكتوراه", "دبلوم", "ثانوية عامة"];
const occupations = ["معلمة", "طبيبة", "مهندسة", "محاسبة", "سيدة أعمال", "موظفة حكومية"];
const nationalities = ["سعودية", "إماراتية", "كويتية", "مصرية", "أردنية", "لبنانية"];
const maritalStatuses = ["عزباء", "مطلقة", "أرملة"];
const religiousLevels = ["ملتزمة", "ملتزمة جداً", "معتدلة"];
const prayerLevels = ["ملتزمة بالصلوات", "أصلي معظم الأوقات", "أحاول الالتزام"];
const hijabTypes = ["منتقبة", "محجبة", "محجبة حجاب شرعي"];

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to generate random item from array
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate partner preferences
function generatePartnerPreferences() {
    return `أبحث عن زوج صالح يتراوح عمره بين 30-45 عاماً، متدين وملتزم بالصلاة، حاصل على مؤهل جامعي، ويقدر الحياة الزوجية. يفضل أن يكون مستقراً مادياً ولديه سكن مستقل. أهم الصفات التي أبحث عنها هي: الأخلاق الحسنة، الالتزام الديني، احترام المرأة وتقدير مسؤوليات الحياة الزوجية.`;
}

// Function to load profile data
function loadProfileData() {
    const profileId = getUrlParameter('id');
    const age = Math.floor(Math.random() * (40 - 20) + 20);
    
    // Set profile image
    document.getElementById('profileImage').src = `pictures/image1 (${parseInt(profileId) + 1}).webp`;
    
    // Set basic information
    document.getElementById('profileName').textContent = randomFromArray([
        "نور الهدى", "فاطمة الزهراء", "مريم العذراء", "زينب الحسن", "عائشة محمد",
        "سارة أحمد", "لينا عبدالله", "رنا العلي", "هدى النور", "أمل الصباح"
    ]);
    document.getElementById('age').textContent = age;
    document.getElementById('maritalStatus').textContent = randomFromArray(maritalStatuses);
    document.getElementById('city').textContent = randomFromArray([
        "الرياض", "جدة", "مكة", "المدينة", "الدمام", "أبوظبي", "دبي", "الكويت", "القاهرة"
    ]);
    document.getElementById('education').textContent = randomFromArray(educationLevels);
    document.getElementById('occupation').textContent = randomFromArray(occupations);
    document.getElementById('nationality').textContent = randomFromArray(nationalities);
    
    // Set religious information
    document.getElementById('religiousCommitment').textContent = randomFromArray(religiousLevels);
    document.getElementById('prayer').textContent = randomFromArray(prayerLevels);
    document.getElementById('hijab').textContent = randomFromArray(hijabTypes);
    document.getElementById('beard').textContent = "غير متاح";
    
    // Set bio
    const bio = `سيدة عربية محترمة تبلغ من العمر ${age} عاماً، ${randomFromArray(nationalities)} الجنسية. حاصلة على ${randomFromArray(educationLevels)} وأعمل في مجال ${randomFromArray(occupations)}. أبحث عن شريك حياة متدين وملتزم لتكوين أسرة سعيدة على سنة الله ورسوله.

أؤمن بأهمية الحياة الزوجية المبنية على التفاهم والاحترام المتبادل. أهتم بالثقافة والتطور الذاتي، وأسعى دائماً لتحسين نفسي. ${randomFromArray(religiousLevels)} في التزامي الديني و${randomFromArray(prayerLevels)}.`;
    
    document.getElementById('bio').textContent = bio;
    
    // Set partner preferences
    document.getElementById('partnerPreferences').textContent = generatePartnerPreferences();
}

// Function to generate random thumbnail profiles
function generateThumbnailProfiles() {
    const thumbnailContainer = document.getElementById('seeAlsoContainer');
    const currentProfileId = parseInt(getUrlParameter('id') || 0);

    // Names for random profiles
    const names = [
        "نور الهدى", "فاطمة الزهراء", "مريم العذراء", "زينب الحسن", "عائشة محمد",
        "سارة أحمد", "لينا عبدالله", "رنا العلي", "هدى النور", "أمل الصباح",
        "ريما محمد", "سلمى عبدالله", "دانة الشرقية", "لمياء أحمد", "نادية علي"
    ];

    // Generate 10 unique random thumbnails
    const usedIds = new Set([currentProfileId]);
    for (let i = 0; i < 10; i++) {
        let randomId;
        do {
            randomId = Math.floor(Math.random() * 20);
        } while (usedIds.has(randomId));
        usedIds.add(randomId);

        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'col-6 col-md-2 mb-3 text-center';
        thumbnailDiv.innerHTML = `
            <a href="profile.html?id=${randomId}" class="text-decoration-none">
                <div class="thumbnail-profile">
                    <img src="pictures/image1 (${randomId + 1}).webp" 
                         alt="${names[Math.floor(Math.random() * names.length)]}" 
                         class="img-fluid rounded-circle mb-2" 
                         style="width: 120px; height: 120px; object-fit: cover;">
                    <p class="text-dark fw-bold">${names[Math.floor(Math.random() * names.length)]}</p>
                </div>
            </a>
        `;
        thumbnailContainer.appendChild(thumbnailDiv);
    }
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    generateThumbnailProfiles();
});
