// Автовоспроизведение видео
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-placeholder video');
    const playIcon = document.querySelector('.video-placeholder i');
    
    if (video) {
        // Устанавливаем атрибуты для автовоспроизведения
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        
        // Попытка запустить видео программно
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Автовоспроизведение не удалось:', error);
                if (playIcon) {
                    playIcon.style.display = 'flex';
                }
            });
        }
        
        // Обработчик клика по иконке
        if (playIcon) {
            playIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (video.paused) {
                    video.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                } else {
                    video.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            });
        }
        
        // Обработчик клика по видео
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                if (playIcon) {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                }
            } else {
                video.pause();
                if (playIcon) {
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            }
        });
        
        // Следим за состоянием видео
        video.addEventListener('play', function() {
            if (playIcon) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                playIcon.style.display = 'flex';
            }
        });
        
        video.addEventListener('pause', function() {
            if (playIcon) {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                playIcon.style.display = 'flex';
            }
        });
        
        // Скрываем иконку когда видео играет
        video.addEventListener('playing', function() {
            if (playIcon) {
                playIcon.style.display = 'none';
            }
        });
        
        // Показываем иконку при наведении
        const videoContainer = document.querySelector('.video-placeholder');
        if (videoContainer) {
            videoContainer.addEventListener('mouseenter', function() {
                if (!video.paused) {
                    if (playIcon) {
                        playIcon.style.display = 'flex';
                    }
                }
            });
            
            videoContainer.addEventListener('mouseleave', function() {
                if (!video.paused) {
                    if (playIcon) {
                        playIcon.style.display = 'none';
                    }
                }
            });
        }
    }
    
    // Установка текущего года в футере
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === undefined && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});