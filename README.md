# instagram-script-unfollow-everyone

Скрипт отписывает по одному человеку каждые 45 секунд. Если сделать «быстрее», Истаграм будет блокировать отписки. Чтобы понять, что блокировка сработала, прочтите [про «кнопку врунишку»](#Кнопка-врунишка-ошибка-403).


## Инструкция

Чтобы отписаться от всех в Инстаграме:
1. Откройте свою страничку в Инстаграме (http://instagram.com/sotnikov.link)
2. Откройте Console из инструментов разработчика (нажмите `F12` или `Cmd`+`Shift`+`I`)
3. Скопируйте [скрипт](#Скрипт)
4. Вставьте скопированный скрипт в открытую Console и нажмите Enter
    - Если в процессе выполнения скрипта регулярно выпададют [ошибки 403](#Кнопка-врунишка-ошибка-403), обновите страницу в браузере, затем через 15–30 минут повторите действия со второго пункта
    - Ожидайте уведомление в Console, о завершении работы скрипта: `Скрипт завершил работу: нет кнопоки для отписки`
5. Обновите страничку и посмотрите количество подписчиков


## Скрипт

```javascript
Element.prototype.parents = function(selector) {
  var elements = [];
  var elem = this;
  var ishaveselector = selector !== undefined;
 
  while ((elem = elem.parentElement) !== null) {
    if (elem.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }
 
    if (!ishaveselector || elem.matches(selector)) {
      elements.push(elem);
    }
  }
 
  return elements;
};


console.info('Открыли список подписок');
document.querySelector('a[href*="following"]').dispatchEvent(
  new MouseEvent('click', {bubbles: true, cancelable: true})
);


setTimeout(function() {
  var timeout = 45; // seconds

  console.warn(
    'Скрипт начал работу: первая и последующие отписки будут через '
    + timeout + ' секунд'
  );

  function clickToButtonUnsubscribe(selectorButtons, $ulWrapper, iteration) {
    iteration = typeof(iteration) === 'number' ? iteration : 1;

    var $button = document.querySelector(selectorButtons);

    if ($button) {
      setTimeout(function() {
        $button.dispatchEvent(
          new MouseEvent('click', {bubbles: true, cancelable: true})
        );

        var tmpScrollTop = $ulWrapper.scrollTop;
        $ulWrapper.scrollTop = $ulWrapper.scrollTop + $ulWrapper.scrollHeight;
        setTimeout(function() { $ulWrapper.scrollTop = tmpScrollTop; }, 100);

        console.info(
          'Кликнул по кнопке №' + iteration + ' и проскролил список',
          {
            datetime: new Date(),
            $button,
            $ulWrapper
          }
        );
        
        clickToButtonUnsubscribe(selectorButtons, $ulWrapper, iteration + 1);
      }, timeout * 1000);
    } else {
      console.warn('Скрипт завершил работу: нет кнопоки для отписки');
    }
  }

  clickToButtonUnsubscribe(
    'button._qv64e._t78yp._4tgw8._njrw0', // selector of buttons for unsubscribe
    document.querySelector('div._gs38e') // selector for wrapper of ul-tag
  );
}, 2000);
```


## Кнопка врунишка — ошибка 403

Обратите внимание, что если кнопка реагирует — будто вы отписались, возможно это не так. Если при отписке в логах вы видете 403 ошибку, значит Инстаграм не одобрил отписку.

![image](https://user-images.githubusercontent.com/10273334/29251465-dc23d2fc-805d-11e7-9ae3-8ba12077c0fa.png)
