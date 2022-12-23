import $ from '../core';

$.prototype.carousel = function(autoplay = false) {
    for (let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width;
        const slides = this[i].querySelectorAll('.carousel-item');
        const slidesField = this[i].querySelector('.carousel-slides');
        const dots = this[i].querySelectorAll('.carousel-indicators li');

        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = width;
        }); 

        let offset = 0;
        let slideIndex = 0;

        $('[data-slide="next"]').click((e) => {
            e.preventDefault();
            if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if (slideIndex == slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        $('[data-slide="prev"]').click((e) => {
            e.preventDefault();
            if (offset == 0) {
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if (slideIndex == 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex--;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        const sliderId = this[i].getAttribute('id');
        $(`#${sliderId} .carousel-indicators li`).click(e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * slideIndex;

            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        }); 

        if (autoplay) {
            setInterval(() => {
                $('[data-slide="next"]').click();
            }, 5000);
        }
    }
};

$.prototype.createCarusel = function({triggers, carouselItems} = {}) {
    for (let i = 0; i < this.length; i++) {
        const wrapper = document.querySelector('.carousel-wrapper');
        let carousel = document.createElement('div');
        carousel.classList.add('carousel');
        carousel.setAttribute('id', 'example');


        // carouselIndicators = { 
        //     count: num,
        //     settings: [[text, classNames=[], close, callback]]
        // }
        const indicators = [];
        for (let j = 0; j < carouselItems.count; j++) {
            let li = document.createElement('li');
            li.setAttribute('data-slide-to', j);

            indicators.push(li);
        }

        const slides = [];
        for (let k = 0; k < carouselItems.count; k++) {
            let carouselSlides = document.createElement('div');
            carouselSlides.classList.add('carousel-item');
            carouselSlides.innerHTML = `
                <img src=${carouselItems.url[k]} alt="photo">
            `;
            
            slides.push(carouselSlides);
        }


        carousel.innerHTML = `
            <ol class="carousel-indicators">

            </ol>
            <div class="carousel-inner">
                <div class="carousel-slides">

                </div>
            </div>
            <a href="#" class="carousel-prev" data-slide="prev">
                <span class="carousel-prev-item">${triggers.prev}</span>
            </a>
            <a href="#" class="carousel-next" data-slide="next">
                <span class="carousel-next-item">${triggers.next}</span>
            </a>
        `;

        carousel.querySelector(".carousel-indicators").append(...indicators);
        carousel.querySelector(".carousel-slides").append(...slides);
        wrapper.appendChild(carousel);
        $(this[i]).carousel(true);
    }
};

// $('.carousel').carousel(true);
// $('.carousel-wrapper').createCarusel({
//     triggers: {
//         next: '&gt;',
//         prev: '&lt;'
//     },
//     carouselItems: {
//         count: 3,
//         url: [
//             [
//                 "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
//             ],
//             [
//                 "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
//             ],
//             [
//                 "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
//             ]
//         ]
//     }
// });
