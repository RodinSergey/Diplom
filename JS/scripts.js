$(function(){
/*
1. В черхней черной полосе в шапке на любой странице проекта (ориентируемся на index) есть блок с текстом "Ваш город: Москва". Прикрепляем к нему обработчик кликов.
2. Обработчик поднимает попап (или вызывает confirm) с вопросом "Ваш город - Москва?".
3. Варианты ответа - true, false. В попапе их присылают обработчики на кнопках попапа, сам попап при этом закрывается. В конфирме их возвращает конфирм.
4. При ответе false в блоке пишем "Ваш город: Немосква".
5. При ответе true ничего больше не делаем.
*/
    /*
    // берем элемент с нужным id поиском по документу, навешиваем на него слушатель события "клик"
    document.getElementById('yourcity').addEventListener('click', function(){
        // делаем видимым блок - держатель попапа (при помощи класса active, свойства для которого у нас уже заранее прописаны). при этом мы получаем готовый скринер, уже обрабатывающий клик мимо попапа.
        document.querySelector('.popup-desk').classList.add('active');
        // кладем в держатель попапа наш попап. при этом используем заранее прописанные стили.
        document.querySelector('.popup-desk').innerHTML = '<div class="popup gorod"><p>Ваш город - Москва?</p><button type="button">ДА</button><button type="button">НЕТ</button></div>';
        // выбираем кнопки (в виде массива) и вешаем на них обработчик событий
        document.querySelectorAll('.gorod button').forEach(item => item.addEventListener('click', clickGorod));
        // выносим функцию-обработчик в отдельную функцию, чтобы было удобнее ее навешивать и код лучше читался
        function clickGorod(event) {
            if (event.target.innerHTML == 'НЕТ') {
                document.getElementById('yourcity').innerHTML = '<p>Ваш город: Немосква</p>';
            } else {
                document.getElementById('yourcity').innerHTML = '<p>Ваш город: Москва</p>';
            }
            document.querySelector('.popup-desk').dispatchEvent(new Event("click"));
        }
    });
    */
    $('#yourcity').click(function(){
        $('.popup-desk').addClass('active').html('<div class="popup gorod"><p>Ваш город - Москва?</p><button class="yes" type="button">ДА</button><button class="no"  type="button">НЕТ</button></div>');
        $('.gorod button').click(function(){
            // if $('.gorod button').index(this) == 1
            // if $(this).html() == 'НЕТ'
            if ($(this).hasClass('no')) {
                $('#yourcity').html('<p>Ваш город: Немосква</p>');
            } else {
                $('#yourcity').html('<p>Ваш город: Москва</p>');
            }
            $('.popup-desk').click();
        })
    });
    
    
    /*
    document.getElementById('yourcity').addEventListener('click', function(){
        (confirm('Ваш город - Москва?')) ? (document.getElementById('yourcity').innerHTML = '<p>Ваш город: Москва</p>') : (document.getElementById('yourcity').innerHTML = '<p>Ваш город: Немосква</p>');
    });
    */
   
    
    
    
    $('.submenu_mover').click(function(){
        if ($(this).parent().hasClass('open')) {
            $('.catmenu_item.open').removeClass('open').find('.submenu').animate({
                height: 0
            }, 1000);
        } else {
            $('.catmenu_item.open').removeClass('open').find('.submenu').animate({
                height: 0
            }, 1000);
            $(this).parent().addClass('open').find('.submenu').animate({
                height: ($(this).parent().find('.submenu a').length * $('.submenu a').height())
            }, 1000);
        }
    });
    
    $('.login').click(function(){
        $('.popup-desk').addClass('active');
        $('.popup-desk').html('<div class="popup log"></div>');
        $('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
    });
    
    $('.popup-desk').click(function(e){
        if (e.target == this) {
            $(this).removeClass('active');
            $('.popup-desk').empty();
        }
    });
    
    $(document).on('click', '.register', function(e){
        e.preventDefault();
        if ($('.popup').hasClass('log')) {
            $('.popup').html('<p class="popup-header">Личный кабинет закрыт на ремонт.<br>Регистрации не будет до 1 января.</p><a href="https://yandex.ru/" class="register">Войти</a>');
            $('.popup').removeClass('log');
        } else {
            $('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
            $('.popup').addClass('log');
        }
    });
    
    $(document).on('click', '.order .del > div', function(){
        tovarDelete(this);
    });
    
    $(document).on('input', '.order .num > input', function(){
        tovarChange(this);
    });
    
    if ($('#date').length) {
        $('#date').click(function(){
            if ($('#date').val()) {
                selected_day = makeSelectedDate($('#date').val());
                makePopup(selected_day.getFullYear(),selected_day.getMonth());
            } else {
                makePopup(TODAY.getFullYear(),TODAY.getMonth());
            }
        });
    
        $('#date').mask('00-00-0000');
    }
    
    
    $('#orderdata').on('submit', function(e){// отправка формы
        e.preventDefault();
        orderAction();
    })
    
    if ($('.product').length) {
        $('.main-image').on('click', 'img', seebigimage);
        $('.small-image').on('click', 'img', changeimage);
    }
    
    if ($('.small-image > img').length) {
        $('.small-image > img').each(function(){
            $(this).css({
                'margin-top': (160 - $(this).height()) / 2,
                'margin-left': (160 - $(this).width()) / 2
            })
        });
    }
});
// слайдер
$(function(){
    sliderRun(); // запускаем нашу программу, когда готов DOM
});
function sliderRun() {
    const w = $('.slide').width(); // ширина слайда - самая важная константа, ее везде используем
    const t = 1000; // время в миллисекундах, вынесено в константу для удобства. для таймаута я взял удвоенный интервал.
    let current = 0; // указатели на текущий слайд и его соседей слева и справа
    let left = -1; // -1 соответствует length-1, то есть последнему слайду из набора
    let right = 1;
    let flag1 = false; // три флага блокировки, так как у нас три независимых асинхронных процесса, исхода которых необходимо ждать
    let flag2 = false;
    let flag3 = false;
    $('.slide').eq(current).css('left', 0);
    $('.slide').eq(left).css('left', -w); // располагаем левый и правый слайды по бокам от основного. поскольку overflow: hidden - их не видно. используем одно и то же свойство left для всех слайдов.
    $('.slide').eq(right).css('left', w);
    function moveLeft() {
        if (flag1 || flag2 || flag3) return; // проверяем флаги, если хоть один не убран, отказываемся действовать. это не позволит одновременно выполняться вызовам от постоянной прокрутки и кнопок или от двух кнопок сразу.
        flag1 = true; // поднимаем все флаги, чтобы не допустить нового вызова, пока не отработал текущий
        flag2 = true;
        flag3 = true;
        left = current; // текущий слайд становится левым и уезжает налево
        $('.slide').eq(left).animate({left: -w}, t, function(){
            flag1 = false; // когда анимация отработала, один флаг убирается
        });
        current = right; // правый становится текущим и выезжает справа
        $('.slide').eq(current).animate({left: 0}, t, function(){
            flag2 = false; // когда анимация отработала, еще один флаг убирается
        });
        right++; // переводим правый указатель еще правее
        if (right > $('.slide').length - 2) {
            right -= $('.slide').length; // если значение указателя больше индекса предпоследнего слайда, уменьшаем на его количество слайдов: последний слайд получается по индексу -1.
        }
        $('.slide').eq(right).css('left', w); // устанавливаем правый слайд в готовности справа. поскольку он не должен быть виден - без анимации.
        flag3 = false; // убираем третий флаг
    }
    function moveRight() { // все аналогично предыдущей функции, только в обратную сторону
        if (flag1 || flag2 || flag3) return;
        flag1 = true;
        flag2 = true;
        flag3 = true;
        right = current;
        $('.slide').eq(right).animate({left: w}, t, function(){
            flag1 = false;
        });
        current = left;
        $('.slide').eq(current).animate({left: 0}, t, function(){
            flag2 = false;
        });
        left--;
        if (left < -1) {
            left += $('.slide').length;
        }
        $('.slide').eq(left).css('left', -w);
        flag3 = false;
    }
    setTimeout(everScroll, t * 2); // назначаем вызов вспомогательной функции с задержкой
    function everScroll() {
        moveLeft(); // вспомогательная функция вызывает прокрутку влево
        setTimeout(everScroll, t * 2); // и назначает новый вызов себя с задержкой. это не рекурсия, так как функция сразу и заканчивает работу, а не ждет результатов вызова.
    }
    $('.left').click(moveLeft); // на кнопки навещиваем вызов прокрутки влево и вправо соответственно
    $('.right').click(moveRight);
}