import "../styles/index.css";

// Импортируем необходимые модули
import { NewsCard } from '../blocks/news-card/NewsCard';
import { AnyContentHolder } from "./modules/AnyContentHolder";

// Создаём контейнер для карточек с новостями.
// В качестве аргументов указываем ему на узел контейнера и на тип дочерних элементов (ссылка на конструктор новостной карточки)
const newsHolder = new AnyContentHolder(document.querySelector('.results__cards-container'), (...rest) => new NewsCard (...rest));

newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);