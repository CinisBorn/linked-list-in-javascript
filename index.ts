class Item {
  value: any;
  next: Item | null;
  
  constructor(v: any, i: Item | null) {
    this.value = v;
    this.next = i;
  }
};

class LinkedList {
  start: Item | null; 
  end: Item | null;
  size = 0;

  constructor() {
    this.start = null;
    this.end = null;
  }
  
  insert(value: any) {
    if (this.isEmpty()) {
      let singleItem = new Item(value, null);
      
      this.start = singleItem;
      this.end = singleItem;
      
      this.size += 1;
      
      return;
    };
    
    let newValue = new Item(value, null); 
    
    this.end!.next = newValue;
    this.end = newValue;
    this.size += 1;
  }
  
  insertAt(position: number, value: any) {
    if (this.isEmpty()) {
      this.insert(value);
      return;
    };
    
    let currentItem = this.get(position);
    let previousItem = this.get(position - 1);
    
    if (previousItem) {
      let newItem = new Item(value, currentItem);
      previousItem.next = newItem;
      
      if (!newItem.next) {
        this.end = newItem;
      }
    }
    
    this.size += 1;
  }
  
  isEmpty(): boolean {
    if (!this.start && !this.end) {
      return true;
    } else {
      return false;
    }
  }

  get(position: number): Item | null {
    if (this.isEmpty()) {
      return null;
    };
    
    /*
    * Instead to return null when the position is out of interval, the 
    * method return the first or last time. It prevents common bugs
    */
    
    if (position > this.size) {
      return null; 
    }
    
    if (position < 0) {
      return null;
    }
    
    let current = this.start;
    let idx = 0;
    
    while (current !== null) {
      if (idx !== position) {
        current = current.next;
        idx++;
      } else {
        break;
      }
    }
    
    return current;
  }
  
  // Null is returned when the operation fail in common scenarios
  delete(position: number): Item | null {
    if (this.isEmpty()) {
      return null;
    }
    
    let item = this.get(position);
    
    if (!item) {
      return null;
    }
    
    let nextItem = item.next;
    let previousItem = this.get(position - 1);
    
    if (previousItem && nextItem) {
      previousItem.next = nextItem;
      this.size -= 1;
    }
    else if (!nextItem && !previousItem) {
      this.end = null;
      this.start = null;
      this.size = 0;
    }
    else if (!previousItem && nextItem) {
      this.start = nextItem
      
      if (this.size === 2) {
        this.end = nextItem;
        this.size = 1; 
      };
    
      this.size -= 1;
    }
    else if (previousItem && !nextItem) {
      previousItem.next = null;
      this.end = previousItem;
      
      if (this.size === 2) {
        this.start = previousItem;
        this.size = 1;
      }
      
      this.size -= 1;
    }
    
    return item;
  }
};

let list = new LinkedList();

list.insert("a");
list.insert("b");
list.insert("c");
list.insert("d");

list.delete(3);

console.dir(list, { depth: null });