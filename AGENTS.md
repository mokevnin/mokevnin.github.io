# Agent instructions

## Git

- Не переключай ветки в основной рабочей копии (`/Users/kirillmokevnin/projects/mokevnin.github.io`): никаких `git switch`, `git checkout <branch>`, `git checkout -b` и прочих команд, меняющих текущую ветку. Там могут быть незакоммиченные изменения и работа других агентов.
- Для работы в другой ветке создавай отдельный worktree: `git worktree add ../mokevnin.github.io-<branch> <branch>` (или `-b <branch>` для новой) и работай в нём.

## Проверки

- Инструменты ставятся через mise (`mise.toml`): `mise install`, затем `mise run setup`.
- `mise run check` запускает все проверки, тот же набор, что в CI. Изменение готово, только когда он проходит.
- Правила линтеров не отключаются, чтобы протащить изменение. Исключение узкое (один путь или один URL, одно правило), с причиной в комментарии, и его согласует человек.
- `Gemfile` закрепляет `github-pages` на версии с <https://pages.github.com/versions.json>, потому что сайт собирает GitHub Pages. Обновляй его только вслед за этой страницей.
