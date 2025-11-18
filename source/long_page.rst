Тест длинной страницы (Скролл)
==============================

Это страница с большим количеством контента. Она нужна для проверки поведения шапки (должна уезжать вверх) и футера (должен быть в самом низу страницы).

Раздел 1: Введение
------------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

.. note::
   Это тестовое примечание Sphinx. Проверяем, не ломаются ли стандартные стили темы ReadTheDocs.

Раздел 2: Пример кода
---------------------

Проверим отображение блоков кода:

.. code-block:: python

    def hello_world():
        print("Hello, Red Database!")
        
    class TestHeader:
        def __init__(self):
            self.header = "Visible"
            self.footer = "Bottom"

Раздел 3: Много текста
----------------------

(Повторяем текст, чтобы растянуть страницу)

1. Первое правило документации.
2. Второе правило документации.
3. Третье правило документации.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Раздел 4: Таблицы
-----------------

.. list-table:: Тестовая таблица
   :widths: 25 25 50
   :header-rows: 1

   * - Параметр
     - Тип
     - Описание
   * - Header
     - HTML
     - Шапка сайта RDB
   * - Footer
     - HTML
     - Подвал сайта RDB
   * - Sidebar
     - Sphinx
     - Боковое меню

Раздел 5: Заключение
--------------------

Здесь заканчивается длинная страница. Сразу под этим текстом должен начинаться темный футер. Между текстом и футером не должно быть огромных дыр, но и наложения быть не должно.