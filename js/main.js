// Array of Arabic female names
const arabicNames = [
    "نور الهدى", "فاطمة الزهراء", "مريم العذراء", "زينب الحسن", "عائشة محمد",
    "سارة أحمد", "لينا عبدالله", "رنا العلي", "هدى النور", "أمل الصباح",
    "جمانة خالد", "ريما الجاسم", "ياسمين فؤاد", "نادية عمر", "سلمى يوسف",
    "ليلى إبراهيم", "حنان عبدالعزيز", "رغد صالح", "شهد عبد الرحمن", "نورا علي",
    "أروى جمال", "سندس طارق", "رانيا حسن", "سارة محمود", "أسماء سمير",
    "فرح عبد الله", "دينا محمد", "عبير أحمد", "نجلاء فهد", "بشرى ناصر"
];

// Array of cities
const cities = [
    "الرياض", "جدة", "دبي", "القاهرة", "عمان", "بيروت", "الدوحة", "مسقط", "المنامة", "الكويت",
    "نيويورك", "لوس أنجلوس", "شيكاغو", "هيوستن", "ميامي", "لندن", "بار��س", "برلين", "روما", "مدريد",
    "أمستردام", "ستوكهولم", "فيينا", "زيورخ", "بروكسل"
];

// Function to generate random number between min and max
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate random bio
function generateBio() {
    const age = randomNumber(20, 35);
    const city = cities[randomNumber(0, cities.length - 1)];
    
    const bioTemplates = [
        `سيدة عربية محترمة تبلغ من العمر ${age} عاماً، مقيمة في ${city}. متعلمة وذات أخلاق عالية، أبحث عن شريك حياة متدين وملتزم لتكوين أسرة سعيدة على سنة الله ورسوله. أؤمن بأهمية الحياة الزوجية المبنية على التفاهم والاحترام المتبادل.`,
        
        `أطمح إلى بناء حياة زوجية مستقرة مع شخص يشاركني قيمي ومبادئي. أهتم بالثقافة والتطور الذاتي، وأسعى دائماً لتحسين نفسي. أبحث عن زوج صالح يقدر معنى الحياة الزوجية ويسعى لإسعاد شريكة حياته.`
    ];
    
    return bioTemplates.join('\n\n');
}

// Function to generate attractive view count
function generateAttractiveViewCount() {
    // Generate more appealing view counts
    const baseViews = [
        250000,  // 250K
        450000,  // 450K
        750000,  // 750K
        1100000, // 1.1M
        1350000, // 1.35M
        1600000  // 1.6M
    ];

    // Randomly select from predefined attractive view counts
    const viewCount = baseViews[Math.floor(Math.random() * baseViews.length)];

    // Format view count attractively
    if (viewCount >= 1000000) {
        return `${(viewCount / 1000000).toFixed(1)}M`;
    } else if (viewCount >= 1000) {
        return `${(viewCount / 1000).toFixed(0)}K`;
    }
    
    return viewCount.toLocaleString();
}

// Function to create profile card
function createProfileCard(index) {
    const name = arabicNames[randomNumber(0, arabicNames.length - 1)];
    const views = generateAttractiveViewCount();
    
    return `
        <div class="col-md-3 col-sm-6">
            <div class="profile-card">
                <a href="profile.html?id=${index}" target="_blank">
                    <div class="profile-image">
                        <img src="pictures/image1 (${index + 1}).webp" alt="${name}">
                        <div class="views-count">
                            <i class="fas fa-eye"></i> ${views}
                        </div>
                    </div>
                    <div class="profile-info">
                        <div class="profile-name" style="font-weight: bold; color: #28a745; font-size: 1.1rem;">${name}</div>
                    </div>
                </a>
            </div>
        </div>
    `;
}

// Function to generate pagination
function generatePagination(currentPage, totalPages) {
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">السابق</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">التالي</a>
        </li>
    `;
    
    return paginationHtml;
}

// Function to load profiles for current page
function loadProfiles(page) {
    const profilesPerPage = 40;
    const startIndex = (page - 1) * profilesPerPage;
    const profilesGrid = document.getElementById('profilesGrid');
    let profilesHtml = '';
    
    for (let i = 0; i < profilesPerPage; i++) {
        profilesHtml += createProfileCard(startIndex + i);
    }
    
    profilesGrid.innerHTML = profilesHtml;
}

// Profile Loading and SEO
document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1]);
    }

    // Load profile data
    async function loadProfileData() {
        const profileId = getUrlParameter('id');
        
        try {
            const response = await fetch('js/profiles.json');
            const data = await response.json();
            
            const profile = data.profiles.find(p => p.id.toString() === profileId);
            
            if (profile) {
                // Update page title and meta tags
                document.getElementById('profileTitle').textContent = `${profile.name} | زواج و تعارف`;
                document.getElementById('profileDescription').setAttribute('content', `ملف شخصي لـ ${profile.name} من ${profile.city}`);
                document.getElementById('ogTitle').setAttribute('content', profile.name);
                document.getElementById('ogDescription').setAttribute('content', `${profile.occupation} - ${profile.age} سنة`);

                // Update profile details in the page
                document.getElementById('profileName').textContent = profile.name;
                document.getElementById('profileAge').textContent = profile.age;
                document.getElementById('profileCity').textContent = profile.city;
                document.getElementById('profileOccupation').textContent = profile.occupation;
                document.getElementById('profileEducation').textContent = profile.education;
                document.getElementById('profileMaritalStatus').textContent = profile.maritalStatus;

                // Update page URL with SEO-friendly slug
                history.replaceState(null, '', `profile.html?id=${profileId}&name=${profile.seoTitle}`);

                // Load similar profiles
                loadSimilarProfiles(profile);
            } else {
                // Redirect to 404 page if profile not found
                window.location.href = '404.html';
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            window.location.href = '404.html';
        }
    }

    // Only run on profile page
    if (document.getElementById('profileName')) {
        loadProfileData();
    }

    // Check if we're on the index page
    if (document.getElementById('profilesGrid')) {
        const currentPage = 1;
        const totalPages = 25; // Adjust based on total number of profiles
        const paginationElement = document.getElementById('pagination');
        
        // Load initial profiles
        loadProfiles(currentPage);
        
        // Generate pagination
        paginationElement.innerHTML = generatePagination(currentPage, totalPages);
        
        // Add pagination click handlers specifically for index page
        paginationElement.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Index Page Pagination clicked', e.target);
            
            if (e.target.classList.contains('page-link')) {
                const page = parseInt(e.target.dataset.page);
                console.log('Index Page selected:', page);
                
                if (page && page >= 1 && page <= totalPages) {
                    console.log('Loading profiles for index page:', page);
                    loadProfiles(page);
                    paginationElement.innerHTML = generatePagination(page, totalPages);
                    
                    // Scroll to the top of the profiles grid
                    document.getElementById('profilesGrid').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

// Function to load similar profiles
function loadSimilarProfiles(currentProfile) {
    console.log('Current Profile:', currentProfile);

    fetch('js/profiles.json')
        .then(response => response.json())
        .then(data => {
            // Filter out the current profile
            const otherProfiles = data.profiles.filter(profile => 
                profile.id !== currentProfile.id
            );

            // Shuffle and take first 4 random profiles
            const randomProfiles = otherProfiles
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);

            const similarProfilesContainer = document.getElementById('similarProfilesContainer');
            
            if (similarProfilesContainer) {
                if (randomProfiles.length === 0) {
                    similarProfilesContainer.innerHTML = '<div class="col-12 text-center">لا توجد ملفات</div>';
                } else {
                    similarProfilesContainer.innerHTML = randomProfiles.map(profile => `
                        <div class="col-md-3 mb-4">
                            <div class="card">
                                <img src="images/profile${profile.id}.jpg" class="card-img-top" alt="${profile.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${profile.name}</h5>
                                    <p class="card-text">${profile.age} سنة • ${profile.city}</p>
                                    <a href="profile.html?id=${profile.id}" class="btn btn-primary">عرض الملف</a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            } else {
                console.error('Similar Profiles Container Not Found');
            }
        })
        .catch(error => {
            console.error('Error loading similar profiles:', error);
        });
}

// Function to load see also profiles
function loadSeeAlsoProfiles(currentProfile, specificProfileIds = []) {
    console.log('Loading See Also Profiles - Current Profile:', currentProfile);
    console.log('Specific Profile IDs:', specificProfileIds);

    // Validate current profile
    if (!currentProfile || !currentProfile.id) {
        console.error('Invalid profile for See Also');
        return;
    }

    // Get See Also container
    const seeAlsoContainer = document.getElementById('seeAlsoContainer');
    if (!seeAlsoContainer) {
        console.error('See Also Container Not Found');
        return;
    }

    // Fetch profiles
    fetch('js/profiles.json')
        .then(response => response.json())
        .then(data => {
            // If specific profile IDs are provided, use those
            let profilesToShow = [];
            if (specificProfileIds.length > 0) {
                profilesToShow = specificProfileIds
                    .map(id => data.profiles.find(p => p.id === id))
                    .filter(profile => profile && profile.id !== currentProfile.id)
                    .slice(0, 4);
            } 
            
            // If not enough specific profiles, fill with random ones
            if (profilesToShow.length < 4) {
                const otherProfiles = data.profiles.filter(profile => 
                    profile.id !== currentProfile.id && 
                    !specificProfileIds.includes(profile.id)
                );
                
                const randomProfiles = otherProfiles
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4 - profilesToShow.length);
                
                profilesToShow = [...profilesToShow, ...randomProfiles];
            }

            console.log('See Also Profiles:', profilesToShow);

            // Generate HTML for profiles
            if (profilesToShow.length === 0) {
                seeAlsoContainer.innerHTML = '<div class="col-12 text-center">لا توجد ملفات مشابهة</div>';
            } else {
                seeAlsoContainer.innerHTML = profilesToShow.map(profile => `
                    <div class="col-3 mb-3 text-center">
                        <a href="profile.html?id=${profile.id}" class="d-block">
                            <img src="images/profile${profile.id}.jpg" class="img-thumbnail rounded-circle" style="width: 100px; height: 100px; object-fit: cover;" alt="${profile.name}">
                            <small class="d-block mt-2 text-muted">${profile.name}</small>
                        </a>
                    </div>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error loading See Also profiles:', error);
            seeAlsoContainer.innerHTML = '<div class="col-12 text-center">حدث خطأ في تحميل الملفات</div>';
        });
}

// Ensure see also profiles are loaded
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    
    if (profileId) {
        fetch('js/profiles.json')
            .then(response => response.json())
            .then(data => {
                const profile = data.profiles.find(p => p.id.toString() === profileId);
                
                if (profile) {
                    // Example: Specify exact profile IDs you want to show
                    // Replace these with the specific profile IDs you want
                    const specificProfileIds = [12, 13, 14, 15];
                    
                    loadSeeAlsoProfiles(profile, specificProfileIds);
                } else {
                    console.error('No profile found with ID:', profileId);
                }
            })
            .catch(error => {
                console.error('Error fetching profiles:', error);
            });
    } else {
        console.error('No profile ID in URL');
    }
});

// Function to load suggested profiles
function loadSuggestedProfiles(currentProfile) {
    console.log('Current Profile for Suggestions:', currentProfile);

    fetch('js/profiles.json')
        .then(response => response.json())
        .then(data => {
            // Ensure data and profiles exist
            if (!data || !data.profiles) {
                console.error('No profiles found for suggestions');
                return;
            }

            // Suggested profiles logic: different city, different occupation, age range
            const suggestedProfiles = data.profiles
                .filter(profile => {
                    const isSuggested = 
                        profile.id !== currentProfile.id && 
                        profile.city !== currentProfile.city && 
                        profile.occupation !== currentProfile.occupation &&
                        Math.abs(profile.age - currentProfile.age) <= 5;
                    
                    console.log(`Checking suggested profile ${profile.id}:`, isSuggested);
                    return isSuggested;
                })
                .slice(0, 4);  // Get first 4 suggested profiles

            console.log('Suggested Profiles:', suggestedProfiles);

            const suggestedProfilesContainer = document.getElementById('suggestedProfilesContainer');
            console.log('Suggested Profiles Container:', suggestedProfilesContainer);
            
            if (suggestedProfilesContainer) {
                if (suggestedProfiles.length === 0) {
                    suggestedProfilesContainer.innerHTML = '<div class="col-12 text-center">لا توجد ملفات مقترحة</div>';
                } else {
                    suggestedProfilesContainer.innerHTML = suggestedProfiles.map(profile => `
                        <div class="col-md-3 mb-4">
                            <div class="card">
                                <img src="images/profile${profile.id}.jpg" class="card-img-top" alt="${profile.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${profile.name}</h5>
                                    <p class="card-text">${profile.age} سنة • ${profile.city}</p>
                                    <a href="profile.html?id=${profile.id}" class="btn btn-primary">عرض الملف</a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            } else {
                console.error('Suggested Profiles Container Not Found');
            }
        })
        .catch(error => {
            console.error('Error loading suggested profiles:', error);
        });
}

// Function to load Read Also articles
function loadReadAlsoArticles(currentProfile) {
    console.log('Current Profile for Read Also:', currentProfile);

    // Predefined articles about marriage, relationships, and Islamic guidance
    const readAlsoArticles = [
        {
            id: 1,
            title: "النصائح الإسلامية للزواج الناجح",
            excerpt: "تعرف على أهم النصائح الإسلامية التي تساعد على بناء زواج سعيد ومستقر",
            image: "images/article1.jpg",
            url: "#"
        },
        {
            id: 2,
            title: "كيفية اختيار الشريك المناسب في الإسلام",
            excerpt: "دليلك الشامل لاختيار شريك الحياة وفق التعاليم الإسلامية",
            image: "images/article2.jpg",
            url: "#"
        },
        {
            id: 3,
            title: "أهمية التوافق في العلاقات الزوجية",
            excerpt: "نصائح عملية لتحقيق التوافق والانسجام بين الزوجين",
            image: "images/article3.jpg",
            url: "#"
        },
        {
            id: 4,
            title: "حقوق الزوجين في الإسلام",
            excerpt: "تعرف على الحقوق المتبادلة بين الزوجين في الشريعة الإسلامية",
            image: "images/article4.jpg",
            url: "#"
        }
    ];

    const readAlsoContainer = document.getElementById('readAlsoContainer');
    console.log('Read Also Container:', readAlsoContainer);
    
    if (readAlsoContainer) {
        readAlsoContainer.innerHTML = readAlsoArticles.map(article => `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.excerpt}</p>
                        <a href="${article.url}" class="btn btn-outline-primary">اقرأ المزيد</a>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        console.error('Read Also Container Not Found');
    }
}

// Function to load random profiles
function loadRandomProfiles(currentProfile) {
    console.log('Current Profile for Random Profiles:', currentProfile);

    fetch('js/profiles.json')
        .then(response => response.json())
        .then(data => {
            // Filter out the current profile
            const otherProfiles = data.profiles.filter(profile => 
                profile.id !== currentProfile.id
            );

            // Shuffle the profiles randomly
            const shuffledProfiles = otherProfiles.sort(() => 0.5 - Math.random());
            
            // Take first 4 profiles
            const randomProfiles = shuffledProfiles.slice(0, 4);

            const randomProfilesContainer = document.getElementById('randomProfilesContainer');
            
            if (randomProfilesContainer) {
                if (randomProfiles.length === 0) {
                    randomProfilesContainer.innerHTML = '<div class="col-12 text-center">لا توجد ملفات عشوائية</div>';
                } else {
                    randomProfilesContainer.innerHTML = randomProfiles.map(profile => `
                        <div class="col-md-3 mb-4">
                            <div class="card">
                                <img src="images/profile${profile.id}.jpg" class="card-img-top" alt="${profile.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${profile.name}</h5>
                                    <p class="card-text">${profile.age} سنة • ${profile.city}</p>
                                    <a href="profile.html?id=${profile.id}" class="btn btn-primary">عرض الملف</a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            } else {
                console.error('Random Profiles Container Not Found');
            }
        })
        .catch(error => {
            console.error('Error loading random profiles:', error);
        });
}

// Ensure this runs on profile page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded, checking for profile');

    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    
    console.log('Profile ID from URL:', profileId);

    if (profileId) {
        fetch('js/profiles.json')
            .then(response => response.json())
            .then(data => {
                const profile = data.profiles.find(p => p.id.toString() === profileId);
                
                console.log('Found Profile:', profile);

                if (profile) {
                    loadSimilarProfiles(profile);
                    loadSeeAlsoProfiles(profile);
                    loadSuggestedProfiles(profile);
                    loadReadAlsoArticles(profile);
                    loadRandomProfiles(profile);
                } else {
                    console.error('No profile found with ID:', profileId);
                }
            })
            .catch(error => {
                console.error('Error fetching profiles:', error);
            });
    } else {
        console.error('No profile ID in URL');
    }
});

// Unified Profile Loading Function
function initializeProfilePage() {
    console.log('Initializing Profile Page');
    
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    
    console.log('Profile ID from URL:', profileId);
    
    if (!profileId) {
        console.error('No profile ID in URL');
        return;
    }

    fetch('js/profiles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            return response.json();
        })
        .then(data => {
            const profile = data.profiles.find(p => p.id.toString() === profileId);
            
            if (!profile) {
                console.error('No profile found with ID:', profileId);
                return;
            }

            console.log('Found Profile:', profile);

            // Ensure containers exist before loading
            const containers = [
                { id: 'similarProfilesContainer', loader: loadSimilarProfiles },
                { id: 'seeAlsoContainer', loader: loadSeeAlsoProfiles },
                // Add other containers as needed
            ];

            containers.forEach(container => {
                const element = document.getElementById(container.id);
                if (element) {
                    container.loader(profile);
                } else {
                    console.warn(`Container ${container.id} not found`);
                }
            });
        })
        .catch(error => {
            console.error('Profile Initialization Error:', error);
        });
}

// Ensure this runs only once
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (document.getElementById('profileName') || document.getElementById('seeAlsoContainer')) {
        initializeProfilePage();
    }
});

// Specific function for loading index page profiles
function loadIndexProfiles(page) {
    console.log('Loading index profiles for page:', page);
    const profilesPerPage = 40;
    const startIndex = (page - 1) * profilesPerPage;
    
    // Use querySelector to ensure we find the element
    const profilesGrid = document.querySelector('#profilesGrid');
    
    if (!profilesGrid) {
        console.error('Profiles grid not found on index page');
        return;
    }
    
    let profilesHtml = '';
    
    for (let i = 0; i < profilesPerPage; i++) {
        profilesHtml += createProfileCard(startIndex + i);
    }
    
    profilesGrid.innerHTML = profilesHtml;
}

// Specific pagination generation for index page
function generateIndexPagination(currentPage, totalPages) {
    console.log('Generating index pagination:', currentPage, totalPages);
    let paginationHtml = '';
    
    // Previous button with custom styling
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link pagination-btn pagination-prev" href="#" data-page="${currentPage - 1}">
                <i class="fas fa-chevron-right"></i> السابق
            </a>
        </li>
    `;
    
    // Page numbers with more dynamic styling
    // Show first page, last page, and pages around current page
    const range = 2; // Number of pages to show on each side of current page
    
    // First page
    if (currentPage > range + 1) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link pagination-btn" href="#" data-page="1">1</a>
            </li>
            ${currentPage > range + 2 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
        `;
    }
    
    // Pages around current page
    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        paginationHtml += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link pagination-btn" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    // Last page
    if (currentPage < totalPages - range) {
        paginationHtml += `
            ${currentPage < totalPages - range - 1 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
            <li class="page-item">
                <a class="page-link pagination-btn" href="#" data-page="${totalPages}">${totalPages}</a>
            </li>
        `;
    }
    
    // Next button with custom styling
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link pagination-btn pagination-next" href="#" data-page="${currentPage + 1}">
                التالي <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    return paginationHtml;
}

// Dedicated index page pagination initialization
function initializeIndexPagination() {
    console.log('Initializing index page pagination');
    
    // Ensure we're on the index page
    if (!window.location.pathname.includes('index.html')) {
        console.log('Not on index page, skipping index pagination');
        return;
    }
    
    // Use querySelector to ensure we find the elements
    const profilesGrid = document.querySelector('#profilesGrid');
    const paginationElement = document.querySelector('#pagination');
    
    if (!profilesGrid || !paginationElement) {
        console.error('Required elements not found on index page', {
            profilesGrid: !!profilesGrid, 
            paginationElement: !!paginationElement
        });
        return;
    }
    
    const currentPage = 1;
    const totalPages = 25; // Adjust based on total number of profiles
    
    // Load initial profiles
    loadIndexProfiles(currentPage);
    
    // Generate initial pagination
    paginationElement.innerHTML = generateIndexPagination(currentPage, totalPages);
    
    // Clear any existing pagination event listeners
    const oldPaginationElement = paginationElement.cloneNode(true);
    paginationElement.parentNode.replaceChild(oldPaginationElement, paginationElement);
    
    // Add pagination click event listener
    oldPaginationElement.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Index page pagination clicked', e.target);
        
        const pageLink = e.target.closest('.page-link');
        if (pageLink) {
            const page = parseInt(pageLink.dataset.page);
            console.log('Selected page:', page);
            
            if (page && page >= 1 && page <= totalPages) {
                console.log('Loading profiles for page:', page);
                loadIndexProfiles(page);
                oldPaginationElement.innerHTML = generateIndexPagination(page, totalPages);
                
                // Scroll to top of profiles grid
                profilesGrid.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for index page');
    
    // Ensure we're on the index page
    if (window.location.pathname.includes('index.html')) {
        console.log('Index page detected, initializing pagination');
        initializeIndexPagination();
    } else {
        console.log('Not on index page');
    }
});

// Sample profiles data (replace with your actual data source)
const allProfiles = [
    {
        id: 1,
        name: "سارة",
        age: 28,
        location: "الرياض",
        image: "images/profile1.jpg"
    },
    {
        id: 2,
        name: "أحمد",
        age: 32,
        location: "جدة",
        image: "images/profile2.jpg"
    },
    {
        id: 3,
        name: "فاطمة",
        age: 26,
        location: "دبي",
        image: "images/profile3.jpg"
    },
    {
        id: 4,
        name: "محمد",
        age: 30,
        location: "القاهرة",
        image: "images/profile4.jpg"
    },
    {
        id: 5,
        name: "نور",
        age: 27,
        location: "عمان",
        image: "images/profile5.jpg"
    },
    // Add more profiles as needed
];

// Function to get random profiles
function getRandomProfiles(count) {
    const shuffled = [...allProfiles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to render similar profiles
function renderSimilarProfiles() {
    const similarProfilesGrid = document.getElementById('similarProfilesGrid');
    const randomProfiles = getRandomProfiles(4);

    similarProfilesGrid.innerHTML = randomProfiles.map(profile => `
        <div class="col-md-3 col-sm-6 mb-4">
            <div class="card h-100">
                <img src="${profile.image}" class="card-img-top" alt="${profile.name}" 
                     onerror="this.src='images/default-profile.jpg'">
                <div class="card-body text-center">
                    <h5 class="card-title">${profile.name}</h5>
                    <p class="card-text">${profile.age} سنة</p>
                    <p class="card-text"><small class="text-muted">${profile.location}</small></p>
                    <a href="profile.html?id=${profile.id}" class="btn btn-primary">عرض الملف</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderSimilarProfiles();
});

// Share Profile Function
function shareProfile(platform) {
    const profileId = new URLSearchParams(window.location.search).get('id');
    const profileUrl = `${window.location.origin}/profile.html?id=${profileId}`;
    const shareText = 'Check out this profile on زواج و تعارف';

    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(profileUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`
    };

    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank');
    } else {
        console.error('Unsupported sharing platform');
    }
}

// Add event listeners for share buttons
document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            shareProfile(platform);
        });
    });
});
