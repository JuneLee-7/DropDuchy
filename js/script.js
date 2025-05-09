document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Video Player Toggle
    const playTrailerButton = document.getElementById('play-trailer-button');
    const videoPoster = document.getElementById('video-poster');
    const videoContainer = document.getElementById('video-container');
    const iframe = videoContainer ? videoContainer.querySelector('iframe') : null;
    let videoPlayedOnce = false; // Flag to ensure src is modified only once

    if (playTrailerButton && videoPoster && videoContainer && iframe) {
        playTrailerButton.addEventListener('click', () => {
            videoPoster.classList.add('hidden');
            videoContainer.classList.remove('hidden');

            // Hide the play button's parent container as well
            if (playTrailerButton.parentElement) {
                playTrailerButton.parentElement.classList.add('hidden');
            }

            if (!videoPlayedOnce) {
                let currentSrc = iframe.src;
                let paramsToAdd = [];

                if (currentSrc.includes('youtube.com') || currentSrc.includes('youtu.be')) {
                    const url = new URL(currentSrc);
                    if (url.searchParams.get('autoplay') !== '1') {
                        paramsToAdd.push('autoplay=1');
                    }
                    if (url.searchParams.get('mute') !== '1') {
                        paramsToAdd.push('mute=1'); // Autoplay is more likely to work when muted
                    }

                    if (paramsToAdd.length > 0) {
                        iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + paramsToAdd.join('&');
                    }
                } else if (iframe.tagName === 'VIDEO') { 
                    iframe.play().catch(error => console.log("Autoplay prevented: ", error));
                }
                videoPlayedOnce = true;
            }
        });
    }

    // Game Gallery Logic
    const mainImage = document.getElementById('gallery-main-image');
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');

    // Placeholder image paths - replace with your actual image paths for Drop Duchy
    const galleryImages = [
        'images/gallery/Drop_Duchy_1.png',
        'images/gallery/Drop_Duchy_2.png',
        'images/gallery/Drop_Duchy_3.png',
        'images/gallery/Drop_Duchy_4.png',
        'images/gallery/Drop_Duchy_5.png',
        'images/gallery/Drop_Duchy_6.png',
        'images/gallery/Drop_Duchy_7.png',
        'images/gallery/Drop_Duchy_8.png',
        'images/gallery/Drop_Duchy_9.png',
        'images/gallery/Drop_Duchy_10.png',
        // If you have more images (e.g., up to 19 like the original site),
        // add them here following the pattern 'images/gallery/Drop_Duchy_X.png'
    ];
    let currentImageIndex = 0;

    function updateMainImage(index) {
        if (mainImage && galleryImages[index]) {
            mainImage.src = galleryImages[index];
            mainImage.alt = `Drop Duchy gallery image ${index + 1}`;
            currentImageIndex = index;
            // Update active thumbnail state by setting className directly
            const allThumbnails = thumbnailsContainer.querySelectorAll('button');
            const baseClasses = 'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition-all hover:scale-105';
            
            allThumbnails.forEach((thumb, idx) => {
                if (idx === index) {
                    // Set className for the active thumbnail
                    thumb.className = `${baseClasses} border-primary ring-2 ring-primary`;
                } else {
                    // Set className for inactive thumbnails
                    thumb.className = `${baseClasses} border-gray-200 dark:border-gray-800`;
                }
            });
        }
    }

    if (mainImage && thumbnailsContainer && galleryImages.length > 0) {
        const baseClasses = 'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition-all hover:scale-105';
        galleryImages.forEach((src, index) => {
            const thumbButton = document.createElement('button');
            // Set className directly here, combining base and initial active/inactive classes
            if (index === 0) {
                thumbButton.className = `${baseClasses} border-primary ring-2 ring-primary`;
            } else {
                thumbButton.className = `${baseClasses} border-gray-200 dark:border-gray-800`;
            }
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Drop Duchy thumbnail ${index + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.className = 'object-cover w-full h-full';

            thumbButton.appendChild(img);
            thumbButton.addEventListener('click', () => updateMainImage(index));
            thumbnailsContainer.appendChild(thumbButton);
        });

        updateMainImage(0); // Initialize with the first image
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) {
                newIndex = galleryImages.length - 1;
            }
            updateMainImage(newIndex);
            thumbnailsContainer.children[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let newIndex = currentImageIndex + 1;
            if (newIndex >= galleryImages.length) {
                newIndex = 0;
            }
            updateMainImage(newIndex);
            thumbnailsContainer.children[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    }

    // Smooth scroll for anchor links (e.g., for "Build Your Empire" button if it targets a section)
    // const buildEmpireButton = document.querySelector('button.bg-primary'); // More specific selector needed
    // if (buildEmpireButton && buildEmpireButton.textContent.includes('Build Your Empire')) {
    //     buildEmpireButton.addEventListener('click', (e) => {
    //         // Assuming it links to #gameplay-section or similar, 
    //         // if it's a direct link <a href="#gameplay-section"><button>...</button></a>, this is not needed
    //         // If it's a button that should scroll, prevent default if it's not already an anchor link
    //         // e.preventDefault(); 
    //         const targetSection = document.getElementById('gameplay-section');
    //         if (targetSection) {
    //             targetSection.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     });
    // }

}); 