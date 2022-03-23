var element = document.getElementById('secondaParola');

element.style.color = 'red';

element.addEventListener('click',
    function() {
        if (element.style.color == 'red') {
            element.style.color = 'blue';
        } else {
            element.style.color = 'red';
        }
    }
)