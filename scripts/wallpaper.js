document.addEventListener('DOMContentLoaded', () => {
    // Dynamically generate wallpaper paths by scanning all .jpg files in the wallpapers directory
    const wallpapers = Array.from({length: 1128}, (_, i) => `wallpapers/${i}.jpg`);
    const galleryContainer = document.getElementById('wallpaper-gallery');
    const paginationContainer = document.getElementById('pagination');
    const itemsPerPage = 40;
    let currentPage = 1;

    // Debug logging
    console.log('Total wallpapers:', wallpapers.length);
    console.log('First wallpaper path:', wallpapers[0]);

    function generateThumbnails(page) {
        if (!galleryContainer) {
            console.error('Gallery container not found!');
            return;
        }

        galleryContainer.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageWallpapers = wallpapers.slice(startIndex, endIndex);

        console.log(`Generating thumbnails for page ${page}:`, 
            `Start index: ${startIndex}, End index: ${endIndex}`);

        pageWallpapers.forEach((wallpaper, index) => {
            const wallpaperItem = document.createElement('div');
            wallpaperItem.classList.add('wallpaper-item');
            
            const img = document.createElement('img');
            img.src = wallpaper;
            const actualIndex = startIndex + index + 1;
            img.alt = `Wallpaper ${actualIndex}`;
            
            // Add error handling for image loading
            img.onerror = () => {
                console.error(`Failed to load image: ${wallpaper}`);
                wallpaperItem.style.display = 'none'; // Hide failed images
            };

            img.addEventListener('click', () => {
                // Log the exact details being passed
                console.log(`Clicked wallpaper details:`, {
                    startIndex,
                    index,
                    actualIndex,
                    wallpaper
                });

                // Open in new tab with full details
                window.open(`wallpaper-detail.html?id=${actualIndex}&src=${encodeURIComponent(wallpaper)}`, '_blank');
            });

            // Add view count for ALL thumbnails with realistic random generation
            const viewCount = Math.floor(Math.random() * (999 - 140) + 140) * 1000; // Between 140K and 999K
            const viewCountElement = document.createElement('div');
            viewCountElement.classList.add('wallpaper-view-count');
            viewCountElement.innerHTML = `<i class="fas fa-eye me-1"></i>${(viewCount / 1000).toFixed(1)}K`;
            wallpaperItem.appendChild(viewCountElement);

            wallpaperItem.appendChild(img);
            galleryContainer.appendChild(wallpaperItem);
        });
    }

    function updatePagination() {
        if (!paginationContainer) {
            console.error('Pagination container not found!');
            return;
        }

        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(wallpapers.length / itemsPerPage);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'السابق'; 
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                generateThumbnails(currentPage);
                updatePagination();
            }
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'التالي'; 
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                generateThumbnails(currentPage);
                updatePagination();
            }
        });

        const pageInfo = document.createElement('span');
        pageInfo.textContent = `الصفحة ${currentPage} من ${totalPages}`; 

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageInfo);
        paginationContainer.appendChild(nextButton);
    }

    // Initial generation
    generateThumbnails(currentPage);
    updatePagination();
});

// Wallpaper Detail Page Script
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const wallpaperId = urlParams.get('id');
    const wallpaperSrc = urlParams.get('src');
    
    if (wallpaperId) {
        const wallpaperImg = document.getElementById('wallpaper-detail-img');
        const wallpaperSeoContent = document.getElementById('wallpaper-seo-content');
        
        if (wallpaperImg) {
            wallpaperImg.src = wallpaperSrc;
            wallpaperImg.alt = `Wallpaper ${wallpaperId}`;
        }

        if (wallpaperSeoContent) {
            wallpaperSeoContent.innerHTML = `
                <h1>High-Quality Wallpaper #${wallpaperId}</h1>
                <p>Discover an exceptional wallpaper that transforms your digital experience. This meticulously curated image offers a perfect blend of aesthetics and visual appeal. 
                Whether you're looking to personalize your desktop, mobile device, or create a stunning background, this wallpaper delivers exceptional quality and style.</p>
                <h2>Key Features</h2>
                <ul>
                    <li>High-resolution image</li>
                    <li>Perfectly sized for multiple devices</li>
                    <li>Unique and captivating design</li>
                    <li>Part of our extensive wallpaper collection</li>
                </ul>
                <p>Download and enjoy this stunning wallpaper today!</p>
            `;
        }
    }
});
