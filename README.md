# instagram-script-unfollow-everyone

Скрипт отпысывает по одному человеку каждые 45 секунд. Если сделать «быстрее», Истаграм будет блокировать отписки. Чтобы понять, когда сработала блокировка, читайте ниже [про «кнопку врунишку»](#Кнопка-врунишка).

Чтобы отписаться от всех в Инстаграме:
1. Откройте свою страничку в Инстаграме (http://instagram.com/sotnikov.link)
2. Откройте Console из инструментов разработчика (нажмите F12 или Cmd+Shift+I)
3. Скопируйте [скрипт](#Скрипт)
4. Вставьте скопированный скрипт в открытую Console и нажмите Enter
5. Ожидайте результат в Console `Скрипт завершил работу: нет кнопоки для отписки`


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

        var needScroll = iteration > 2;

        if (needScroll) {
          $ulWrapper.scrollTop = (
            $ulWrapper.scrollTop + $button.parents('li')[0].offsetHeight
          );
        }

        console.info(
          'Кликнул по кнопке №' + iteration + (
            needScroll ? ' и проскролил список' : ''
          ),
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


## Кнопка врунишка
Обратите внимание, что если кнопка реагирует — будто вы отписались, возможно это не так. Если при отписке в логах вы видете 403 ошибку, значит Инстаграм не одобрил отписку.

![image](https://user-images.githubusercontent.com/10273334/29161245-2ef7050a-7dbe-11e7-9f54-3da774175d3f.png)
