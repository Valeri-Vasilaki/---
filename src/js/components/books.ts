import BookLoader from "../api/api";
import { bookListRender, getCategory } from "../utils";
import Cart from "../models/cart";
import Sidebar from "./sidebar";

// Книги в корзине
const bookIds: Array<string> = JSON.parse(
  window.localStorage.getItem("cart") ?? "[]"
);

// Корзина
const cart = new Cart(bookIds);

// DIV с книгами
const bookList: HTMLElement = <HTMLElement>document.getElementById("bookList");

// Боковая панель
const sidebar: HTMLElement = <HTMLElement>document.getElementById("sidebar");

// Категория по умолчанию
const initialCategory = getCategory(sidebar);

// Загрузчик книг
const loader = new BookLoader(initialCategory, 0, 6);

// Кнопка load more
const loadMoreBtn: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("loadMoreBtn")
);

loadMoreBtn.addEventListener("click", () => {
  const startIndex: number = parseInt(
    loadMoreBtn.dataset.startIndex ? loadMoreBtn.dataset.startIndex : "0"
  );

  loader.setParams(getCategory(sidebar), startIndex, 6);
  loader.getBooks().then((data) => {
    bookListRender(data, bookList, cart);
    loadMoreBtn.dataset.startIndex = (startIndex + 6).toString();
  });
});

loader.getBooks().then((data) => {
  bookListRender(data, bookList, cart);
  loadMoreBtn.dataset.startIndex = "6";
});

// Класс обработчик действий с сайдбаром
const sidebarMenu = new Sidebar(loader, bookList, cart);
sidebarMenu.render();
