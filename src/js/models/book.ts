import Cart from "./cart";

class Book {

  id: string;
  authors: string;
  title: string;
  description: string;
  imgSrc: string;
  rating: number | undefined;
  ratingsCount: number | undefined;
  saleability: boolean;
  price?: number;
  currency?: string;
  isInCart: boolean = false;
  cart: Cart;

  constructor(
    id: string,
    title: string,
    saleability: string,
    imgSrc: string,
    description: string | undefined,
    authors: Array<string> | undefined,
    rating: number | undefined,
    ratingsCount: number | undefined,
    cart: Cart,
    price: number | undefined,
    currency: string | undefined
  ) {
    this.id = id;
    if (authors) {
      this.authors = authors.join(", ");
    } else {
      this.authors = "";
    }

    this.title = title;
    this.description = description ? description : "";
    this.imgSrc = imgSrc;
    this.saleability = saleability === "FOR_SALE" ? true : false;
    if (saleability && price && currency) {
      this.price = price;
      this.currency = currency;
    }
    this.rating = rating;
    this.ratingsCount = ratingsCount;
    this.cart = cart;
    this.isInCart = cart.isInCart(this.id);
  }

  public render(): HTMLElement {
  
    const bookElement: HTMLElement = document.createElement("div");
    bookElement.innerHTML = `
    <div class="book">
            <div class="book__poster">
              <img
                src="${this.imgSrc}"
                alt="${this.title}"
                width="212"
                height="auto"
              />
            </div>
            <div class="book__details">
              <div class="book__author">${this.authors}</div>
              <div class="book__title">${this.title}</div>
              <div class="book__rating">
                <div class="book__rating__stars" style="--rating: ${
                  this.rating ? this.rating : 0
                }"></div>
                <div class="book__rating__reviews">${
                  this.ratingsCount ? this.ratingsCount : 0
                } review</div>
              </div>
              <div class="book__description">
              ${this.description.substring(0, 100)}${
      this.description.length > 100 ? "..." : ""
    }
              </div>
              <div class="book__price">${
                this.saleability
                  ? [this.price, this.currency].join(" ")
                  : "NOT FOR SALE"
              }</div>
              <button class="btn ${
                this.isInCart ? "btn__secondary" : "btn__primary"
              }" id="book__${this.id}" ${this.saleability ? "" : "disabled"}>${
      this.isInCart ? "In the cart" : "Buy now"
    }</button>
            </div>
          </div>
    `;
    const addToCartBtn: HTMLButtonElement = <HTMLButtonElement>(
      bookElement.querySelector(`#book__${this.id}`)
    );

    this.addToCartClick(addToCartBtn);

    return bookElement;
  }

  private addToCartClick(btnElement: HTMLButtonElement): void {
    
    btnElement?.addEventListener("click", () => {
      const rerenderBtn: HTMLButtonElement = <HTMLButtonElement>(
        document.getElementById(`book__${this.id}`)
      );
      if (this.isInCart) {
        this.removeFromCart();
        rerenderBtn.classList.replace("btn__secondary", "btn__primary");
        rerenderBtn.innerText = "Buy now";
      } else {
        this.addToCart();
        rerenderBtn.classList.replace("btn__primary", "btn__secondary");
        rerenderBtn.innerText = "In the cart";
      }
    });
  }

  private addToCart(): void {
    if (!this.cart.isInCart(this.id)) {
      this.cart.add(this.id);
    }
    this.isInCart = true;
  }

  private removeFromCart(): void {
    this.cart.remove(this.id);
    this.isInCart = false;
  }
}

type BookType = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: Array<string>;
    description?: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    averageRating?: number;
    ratingsCount?: number;
  };
  saleInfo: {
    saleability: string;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
};

export { Book, BookType };
