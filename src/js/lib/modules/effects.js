import $ from '../core'; 

$.prototype.animateOverTime = function(duration, callback, finaly) {
    let timeStart;

    function _animateOverTime(time) {
        if(!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart;
        let complection = Math.min(timeElapsed / duration, 1);  //результат работы анимации до  1

        callback(complection);

        if (timeElapsed < duration) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof finaly === 'function') {
                finaly();
            }
        }
    }

    return _animateOverTime;
};

$.prototype.fadeIn = function(duration, display, finaly) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block';

        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };

        const ani = this.animateOverTime(duration, _fadeIn, finaly);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeOut = function(duration,  finaly) {
    for (let i = 0; i < this.length; i++) { 
        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;

            if (complection === 1) {
                this[i].style.display = 'none';
            }
        };

        const ani = this.animateOverTime(duration, _fadeOut, finaly);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeToggle = function(duration, display, finaly) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            $(this[i]).fadeIn(duration, display, finaly);
        } else {
            $(this[i]).fadeOut(duration,  finaly);
        }

    }

    return this;
};