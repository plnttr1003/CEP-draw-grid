# CEP-draw-draw

#### Расширение для проекирования залов в Adobe Illustrator на базе Adobe CEP

## Стек
- Adobe CEP  - [Документация](https://github.com/Adobe-CEP)

#### Полезные ссылки
- ILLUSTRATOR SCRIPTING - [Документация](https://www.adobe.com/devnet/illustrator/scripting.html)
- Illustrator Scripting Guide - [Документация](https://illustrator-scripting-guide.readthedocs.io/)
- CEP 5 Super mega guide: Extending Adobe apps with HTML5+Node.js - [Документация](https://aphall.com/2014/08/cep-mega-guide-en/)


### Структура папок
````
.
├── css // стили расширения
│   └── ...
├── CSXS
│   └── manifest.xml // манифест расширния
├── js // скрипты приложения
│   ├── CSInterface.js библиотека для общения с иллюстратором
│   └──...
├── jsx // скрипты для иллюстратора. Поддерживается только ES3/4
│   └── ...
├── node_modules
├── .debug // натсройки jest
└── index.html // стартовый файл
````
### Запуск в DebugMode

В терминале
````
defaults write com.adobe.CSXS.8 PlayerDebugMode 1

defaults write com.adobe.CSXS.9 PlayerDebugMode 1
````