const ENG = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
            'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\/','Delete',
            'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 'Enter',
            'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '?', 'Up', ' Shift',
            'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Down', 'Right', 'EN'];
const RU = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace', 
            'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\/','Del',
            'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`, 'Enter',
            'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', 'Up', ' Shift',
            'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Down', 'Right', 'RU']  

let shiftStatus = 0;
let capsStatus = 0;
let upperStatus = 0;
let arr = ENG;
let area = document.createElement('textarea');
area.id = 'area';
document.body.append(area);


let wrap = document.createElement('div');
wrap.id = 'wrapper';
document.body.append(wrap);

document.addEventListener('load', lang(arr))

function lang (arr) {
    arr.map(function(el, i) {
        
        let div = document.createElement('div');
        wrap.append(div);
        div.innerHTML = el;
        if (i == 13 || i == 41) {
            div.className = 'backspace';
        }
        else if (i == 14 || i == 28 || i == 55 || i == 60 || i == 56 || i == 57 || i == 59 || i == 64) {
            div.className = 'tab';
        }
        else if ( i == 29 ) {
            div.className = 'caps';
        }
        else if (i == 42 || i == 54) {
            div.className = 'shift';
        }
        else if ( i == 58) {
            div.className = 'space';
        }
        else if ( i == 53 || i == 61 || i == 62 || i == 63 ) {
            div.className = 'arrow' 
        }
        else
        div.className = 'key';
    })
}

 document.addEventListener('keydown', function (event) {
    
    if (event.shiftKey && event.altKey) {
        wrap.querySelectorAll('div').forEach(el => el.remove())
        lang(RU);
        
    }
    
 })


 document.addEventListener('keydown', function () {
    ENG.forEach( function (el, index) {
        
        if (el.toUpperCase() == event.key.toUpperCase()) {
            if (event.key == 'CapsLock' ){
                capsStatus++
                upperStatus++
                (capsStatus % 2 != 0) ? wrap.querySelectorAll('div')[index].style.background = 'red': wrap.querySelectorAll('div')[index].style.background = '';
                
            }
            else if (event.key == 'Shift' && el == 'Shift'){
                shiftStatus++
                upperStatus++
                wrap.querySelectorAll('div')[index].style.background = 'red';
                wrap.querySelectorAll('div')[index + 12].style.background = 'red';                    
                /* else if (shiftStatus % 2 == 0)  { 
                wrap.querySelectorAll('div')[index].style.background = '';
                wrap.querySelectorAll('div')[index + 12].style.background = ''
                } */
                
            }
            else {         
            wrap.querySelectorAll('div')[index].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[index].style.background = '';
            }, 300)}}
        else if (event.key.toUpperCase() == 'CONTROL') {
            wrap.querySelectorAll('div')[55].style.background = 'red';
            wrap.querySelectorAll('div')[60].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[55].style.background = '';
                wrap.querySelectorAll('div')[60].style.background = '';
            }, 300)}
        else if (event.key.toUpperCase() == ' ') {
            wrap.querySelectorAll('div')[58].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[58].style.background = '';
            }, 300)}
        else if (event.key.toUpperCase() == 'ARROWUP') {
            wrap.querySelectorAll('div')[53].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[53].style.background = '';
            }, 300)
        }
        else if (event.key.toUpperCase() == 'ARROWLEFT') {
            wrap.querySelectorAll('div')[61].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[61].style.background = '';
            }, 300)
        }
        else if (event.key.toUpperCase() == 'ARROWDOWN') {
            wrap.querySelectorAll('div')[62].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[62].style.background = '';
            }, 300)
        }
        else if (event.key.toUpperCase() == 'ARROWRIGHT') {
            wrap.querySelectorAll('div')[63].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[63].style.background = '';
            }, 300)
        }
            
        
        
    })
    
 })

 document.addEventListener('keyup', function (event) {
     console.log(event.key)
     if (event.key == 'Shift') {
        wrap.querySelectorAll('div')[42].style.background = '';
        wrap.querySelectorAll('div')[54].style.background = '';
     }
 })

 document.getElementById('wrapper').addEventListener('click', function (event) {
    if (event.target.id != 'wrapper') {  
        if (event.target.classList.contains('shift')) {
            upperStatus++
            shiftStatus++
            console.log(shiftStatus);
            (shiftStatus % 2 != 0) ? (wrap.querySelectorAll('div')[42].style.background = 'red',
            wrap.querySelectorAll('div')[54].style.background = 'red') : (wrap.querySelectorAll('div')[42].style.background = '',
            wrap.querySelectorAll('div')[54].style.background = '');
        }
        else if (event.target.classList.contains('caps')) {
            upperStatus++
            capsStatus++
            
            (capsStatus % 2 != 0) ? event.target.style.background = 'red' : event.target.style.background = '';
        }

        else {    event.target.style.background = 'red';
            if (event.target.classList.contains('key') && upperStatus % 2 == 0) {
                document.getElementById('area').value += event.target.innerHTML.toLowerCase();
            }
            if (event.target.classList.contains('key') && upperStatus % 2 != 0) {
                document.getElementById('area').value += event.target.innerHTML;
            }
            
            setTimeout(function () {
                event.target.style.background = '';
            }, 300)}
    }
     
 })

/*  wrap.querySelectorAll('div')[0].style.background = 'red'; */