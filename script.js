const ENG = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
            'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\/','Delete',
            'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', `'`, 'Enter',
            'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '?', 'Up', ' Shift',
            'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Down', 'Right', 'EN'];
const RU = ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
            'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\/','Del',
            'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', `Э`, 'Enter',
            'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', 'Up', ' Shift',
            'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Down', 'Right', 'RU']
const shiftActive = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']
const shiftActiveRu = [ 'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+']  

let shiftStatus = false;
let capsStatus = false;
let upperStatus = false;
let langStatus = false;
let arr;
let area = document.createElement('textarea');
area.id = 'area';
document.body.append(area);


let wrap = document.createElement('div');
wrap.id = 'wrapper';
document.body.append(wrap);
wrap.setAttribute( 'onselect','return false');
wrap.setAttribute( 'onmousedown','return false');
let info = document.createElement('div');
info.id = 'info';
info.innerHTML = 'Сделано под Windows, смена раскладки Alt+Shift. <br> Если отсутствует подсветка, при нажатии на клавиатуру, нажмите на клавишу EN'
document.body.append(info);


if (localStorage.getItem('language') == null) {
    arr = ENG
}
else if (localStorage.getItem('language') == 'ENG') {
    arr = ENG ;
}
else {
    arr = RU
}


document.addEventListener('load', lang(arr))
// Отрисовка клавы
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
        else {
        div.className = 'key';
        }        
    })
}
function alternative (arr) {
    for ( let i = 0; i < 13; i++) {
        wrap.querySelectorAll('div')[i].innerHTML = arr[i];
    } 
}
// Перерисовка при смене языка
 document.addEventListener('keydown', function (event) {  
    if (event.shiftKey && event.altKey && langStatus == false) {
        wrap.querySelectorAll('div').forEach(el => el.remove())
        if (arr === ENG) {
            arr = RU;
            localStorage.setItem('language', 'RU')
        }
        else {
            arr = ENG;
            localStorage.setItem('language', 'ENG')
        }
        lang(arr); 
        shiftStatus = false;
        upperStatus = false;
        capsStatus = false;
        langStatus = true;       
    }    
 });

// Нажатие на клавиатуру
 document.addEventListener('keydown', function (event) {
     area.focus()
     arr.forEach( function (el, index) {        
        if (el.toUpperCase() == event.key.toUpperCase() ) {
            if (event.key == 'CapsLock' ){
                if ( capsStatus === false) {
                    capsStatus = true;
                    upperStatus = true;
                    wrap.querySelectorAll('div')[index].style.background = 'red';
                }
                else {
                    capsStatus = false;
                    upperStatus = false;
                    wrap.querySelectorAll('div')[index].style.background = '';
                }               
            }
            else if (event.key == 'Shift'){
                if (shiftStatus == false){
                    shiftStatus = true;
                    if (arr == RU){
                        alternative(shiftActiveRu);
                    }
                    else {
                        alternative(shiftActive);
                    } 
                    
            }
            wrap.querySelectorAll('div')[index].style.background = 'red';
            wrap.querySelectorAll('div')[index + 12].style.background = 'red';
                                                
            }
            else if (event.key === 'Alt') {
                wrap.querySelectorAll('div')[index].style.background = 'red';
                
            }
            else {         
            wrap.querySelectorAll('div')[index].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[index].style.background = '';
            }, 300)}
        }
        else if (event.key.toUpperCase() == 'CONTROL') {
            wrap.querySelectorAll('div')[55].style.background = 'red';
            wrap.querySelectorAll('div')[60].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[55].style.background = '';
                wrap.querySelectorAll('div')[60].style.background = '';
            }, 300)
        }
        else if (event.key.toUpperCase() == ' ') {
            wrap.querySelectorAll('div')[58].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[58].style.background = '';
            }, 300)
        }
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
    shiftActive.forEach( function(el, index){
        if (event.key == el) {
            wrap.querySelectorAll('div')[index].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[index].style.background = '';
            }, 300)
        }
    })
    shiftActiveRu.forEach( function(el, index){
        if (event.key == el) {
            wrap.querySelectorAll('div')[index].style.background = 'red';
            setTimeout(function () {
                wrap.querySelectorAll('div')[index].style.background = '';
            }, 300)
        }
    })
    
 })

 document.addEventListener('keyup', function (event) {
    if (event.key == 'Shift') {
        shiftStatus = false
        wrap.querySelectorAll('div')[42].style.background = '';
        wrap.querySelectorAll('div')[54].style.background = '';
        alternative(arr);
        langStatus = false;
        
     }
    if (event.key === 'Alt') {
        wrap.querySelectorAll('div')[57].style.background = '';
        wrap.querySelectorAll('div')[59].style.background = '';
        langStatus = false;
    }
     
 })
 
// Реакция на клики
 document.getElementById('wrapper').addEventListener('click', function (event) {
    area.focus()
    if (event.target.id != 'wrapper') {  
        if (event.target.classList.contains('shift')) {
            if (shiftStatus === true) {
                if (upperStatus == true) {
                    upperStatus = false;
                }
                else {
                    upperStatus = true;
                }
                shiftStatus = false;
                
                wrap.querySelectorAll('div')[42].style.background = '';
                wrap.querySelectorAll('div')[54].style.background = '';
                alternative(arr);
            }
            else {                 
                if (upperStatus == true) {
                    upperStatus = false;
                }
                else {
                    upperStatus = true;
                }
                if (arr == RU){
                    alternative(shiftActiveRu);
                }
                else {
                    alternative(shiftActive);
                }
                shiftStatus = true;
                wrap.querySelectorAll('div')[42].style.background = 'red';
                wrap.querySelectorAll('div')[54].style.background = 'red';   
            }
        }
        else if (event.target.classList.contains('caps')) {
            if (capsStatus === true) {
                if (upperStatus == true) {
                    upperStatus = false;
                }
                else {
                    upperStatus = true;
                }
                capsStatus = false;
                event.target.style.background = '';
            }
            else {
                if (upperStatus == true) {
                    upperStatus = false;
                }
                else {
                    upperStatus = true;
                }
                capsStatus = true;
                event.target.style.background = 'red';
            } 
        }

        else {    event.target.style.background = 'red';
            if (event.target.classList.contains('key') && upperStatus == 0) {
                document.getElementById('area').value += event.target.innerHTML.toLowerCase();
            }
            if (event.target.classList.contains('key') && upperStatus != 0) {
                document.getElementById('area').value += event.target.innerHTML;
            }
            if (event.target.innerHTML ==='Tab') {
                document.getElementById('area').value += '  ';
            }
            if (event.target.innerHTML ==='Delete') {
                document.getElementById('area').value = '';
            }
            if (event.target.innerHTML ==='Backspace') {
                document.getElementById('area').value = document.getElementById('area').value.slice(0, -1) ;
            }
            if (event.target.innerHTML ==='Enter') {
                document.getElementById('area').value += '\n';
            }
            if (event.target.innerHTML ==='Space') {
                document.getElementById('area').value += ' ';
            }
            if (event.target.innerHTML ==='EN' || event.target.innerHTML ==='RU' ) {
                wrap.querySelectorAll('div').forEach(el => el.remove())
                if (arr === ENG) {
                    arr = RU;
                }
                else {
                    arr = ENG;
                }
                lang(arr);
                shiftStatus = false;
                upperStatus = false;
                capsStatus = false;   
            }
            
            setTimeout(function () {
                event.target.style.background = '';
            }, 300)}
    }
     
 })

/*  wrap.querySelectorAll('div')[0].style.background = 'red'; */