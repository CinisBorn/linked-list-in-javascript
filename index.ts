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
  
  isEmpty(): boolean {
    if (!this.start && !this.end) {
      return true;
    } else {
      return false;
    }
  }

  get(position: number): Item | boolean | null {
    if (this.isEmpty()) {
      console.warn("The List is empty");
      return false;
    };
    
    if (position > this.size) {
      return this.end; 
    }
    
    let current = this.start;
    let idx = 0;
    
    while (current != null) {
      if (idx !== position) {
        current = current.next;
        idx++;
      } else {
        break;
      }
    }
    
    if (!current) {
      return false;
    } 
    
    return current;
  }
};

let t = new LinkedList();

t.insert("a");
t.insert("b");
t.insert("c");
t.insert("d");

console.dir(t, { depth: null });
console.dir(t.get(1), { depth: null });
