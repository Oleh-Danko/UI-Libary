import './lib/lib';
import $ from './lib/lib';



const a = $('.active').on('click', function() {
    $(this).setAttr("data-url", "disabled");
});

console.log(a.getAttribute("data-url"));

// $('.active').on('click', function() {
//     console.log($(this).getAttr("data-url"));
// });

// $('.active').on('click', function() {
//     $(this).setAttr("data-url");
// });


// $('button').on('click', function() {
//     $('.active').toggleAtr("data-url");
// });