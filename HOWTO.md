# Задание второго выпуска React Challenge
Во втором выпуске [React Challenge](https://github.com/rtivital/react-challenge-colorizr) вам предлагается построить приложение для работы с цветом. Демо готового приложения можно посмотреть [здесь](http://rtivital.github.io/react-challenge-colorizr/).

## Стартовый шаблон
Для участия в челендже вы можете воспользоваться готовым стартовым [шаблоном](https://github.com/rtivital/react-challenge-colorizr) или использовать свой. Стартовый шаблон предусматривает всё, что может вам понадобиться в ходе выполнения задания: полностью настроено компилирование JavaScript и Sass кода, hot reload, а также генерация данных, которые понадобятся приложению. Инструкции по использованию стартового шаблона вы найдёте в [Readme](./README.md) файле данного репозитория.

## Зависимости
Предполагается, что при работе над проектом вы будете использовать [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux) и [React Router](https://github.com/reactjs/react-router), поэтому в качестве зависимостей у проекта установлены следующие библиотеки:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [React Router](https://github.com/reactjs/react-router)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router-redux](https://github.com/reactjs/react-router-redux)
* [Immutable.js](https://github.com/facebook/immutable-js/)

## Приложение
Приложение Colorizr разделено на четыре части. Все части связаны между единым набором данных. Для каждой части приложения выделяется отдельный адрес с помощью React Router.

### Навигация
Для реализации навигации используется React Router. Всего в навигации есть четыре ссылки, каждая из которых соответствует отдельной части приложения: Create, Explore, Presets и Export. Ссылка текущей страницы выделяется.

![Navigation](img/navigation.png)

### Create
Первая часть приложения работает с введённым пользователем цветом. Ввод цвета осуществляется с помощью колорпикера. В своём решении я использовал [готовый компонент](https://github.com/zippyui/react-color-picker) для его реализации.

![Color Picker](img/color-picker.png)

Введённый пользователем цвет отражается в виде фона всей страницы Create. Обратите внимание на то, что заголовок меняет свой цвет в зависимости от яркости введённого цвета.

Предполагается, что при использовании приложения можно выбрать от одного до десяти разных цветов.

![Selected Colors](img/selected.png)
