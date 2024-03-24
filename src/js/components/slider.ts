type sliderItem = {
  id: number;
  src: string;
};

class Slider {
  public items: Array<sliderItem>;
  public currentItem: sliderItem;
  public element: HTMLImageElement;
  public controls: HTMLElement;
  private intervalId;

  constructor(
    items: Array<sliderItem>,
    element: HTMLImageElement,
    controls: HTMLElement
  ) {
    this.items = items;
    this.currentItem = this.items[0];
    this.element = element;
    this.controls = controls;
    this.initControls();
    this.setImage();
    this.intervalId = setInterval(() => {
      this.switchItem();
    }, 5000);
  }

  getNextItem(nextId?: number): sliderItem {
    // Получение следующей картинки
    if (!nextId) {
      nextId = this.currentItem.id + 1;
    }

    const nextItem: sliderItem | undefined = this.items.find(
      (item) => item.id === nextId
    );
    if (!nextItem) {
      return this.items[0];
    }
    return nextItem;
  }

  initControls() {
    // Создание кнопок переключения слайда
    for (let item of this.items) {
      const control: HTMLAnchorElement = document.createElement("a");
      control.classList.add("slider__control");
      control.id = `slide-${item.id}`;
      control.addEventListener('click', () => {
        this.switchItem(item.id);
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
          this.switchItem();
        }, 5000);
      })
      this.controls.appendChild(control);
    }
    this.controls.firstElementChild?.classList.add("slider__control__active");
  }

  switchItem(nextId?: number): void {
    // Переключение слайда
    const nextItem: sliderItem = this.getNextItem(nextId);
    const currentControl: HTMLAnchorElement = <HTMLAnchorElement>(
      document.getElementById(`slide-${this.currentItem.id}`)
    );
    currentControl.classList.remove("slider__control__active");
    this.currentItem = nextItem;
    const nextControl: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById(
      `slide-${this.currentItem.id}`
    );
    nextControl.classList.add("slider__control__active");
    this.setImage();
  }

  setImage(): void {
    // Обновление изображения
    this.element.src = this.currentItem.src;

    this.element.style.animation = "none";
    this.element.offsetHeight;
    this.element.style.animation = "fade-in 2s";
  }
}

const sliderImg: HTMLImageElement = <HTMLImageElement>(
  document.getElementById("sliderImg")
);

const sliderItems: Array<sliderItem> = [
  { id: 1, src: "../../static/img/slider/1.svg" },
  { id: 2, src: "../../static/img/slider/2.svg" },
  { id: 3, src: "../../static/img/slider/3.svg" },
];

const sliderControls: HTMLElement = <HTMLElement>(
  document.getElementById("sliderControls")
);
const slider = new Slider(sliderItems, sliderImg, sliderControls);
