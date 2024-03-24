export default class Cart {
  bookIds: Array<string> = [];
  itemsElement: HTMLElement;

  constructor(bookIds: Array<string>) {
    this.bookIds = bookIds;
    this.itemsElement = <HTMLElement>document.getElementById("basketItems");
    this.updateStorage();
  }

  public isInCart(bookId: string): boolean {
   
    return this.bookIds.includes(bookId);
  }

  public add(bookId: string): void {
    
    this.bookIds.push(bookId);
    this.updateStorage();
  }

  public remove(bookId: string): void {
    
    const index: number = this.bookIds.indexOf(bookId);
    if (index > -1) {
      this.bookIds.splice(index, 1);
      this.updateStorage();
    }
  }
  private updateStorage(): void {
    
    window.localStorage.setItem("cart", JSON.stringify(this.bookIds));
    const itemsCount: number = this.bookIds.length;
    if (itemsCount) {
      this.itemsElement.setAttribute("style", `display: flex;`);
      this.itemsElement.innerText = itemsCount.toString();
    } else {
      this.itemsElement.setAttribute("style", `display: none;`);
      this.itemsElement.innerText = "";
    }
  }
}
