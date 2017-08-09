(function() {
  var selectorButtons = 'button._qv64e._t78yp._4tgw8._njrw0';
  var selectorUlWrapper = 'div._gs38e';

  function sleep(ms) {
    ms += new Date().getTime();
    console.info('Уснул на ' + ms + 'ms');
    while (new Date() < ms){};
    console.info('Проснулся');
  }

  while ($$(selectorButtons).length > 0) {
    var $buttons = $$(selectorButtons);
    console.info('Выбрал кнопки', $buttons);

    $buttons.forEach(($e, index) => {
      window.$buttons = $buttons;
      
      console.info(
        'Кликнул по кнопке',
        index,
        $e.dispatchEvent(
          new MouseEvent('click', {bubbles: true, cancelable: true})
        )
      );
      
      sleep(1000);
    });

    console.info(
      'Проскролил список',
      selectorUlWrapper.scrollTop = selectorUlWrapper.scrollTop + 10000
    );
  }
})();
