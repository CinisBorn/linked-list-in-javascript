class Node<T> {
  value: T;
  next: Node<T> | null = null;
  
  constructor(v: T, i: Node<T> | null) {
    this.value = v;
  }
};

class LinkedList<T> {
  private head: Node<T> | null = null; 
  private tail: Node<T> | null = null;
  size = 0;

  insert(value: T) {
    if (this.isEmpty()) {
      let singleItem = new Node(value, null);
      
      this.head = singleItem;
      this.tail = singleItem;
      
      this.size += 1;
      
      return;
    };
    
    let newValue = new Node(value, null); 
    
    this.tail!.next = newValue;
    this.tail = newValue;
    this.size += 1;
  }
  
  insertAt(position: number, value: any) {
    if (this.isEmpty()) {
      this.insert(value);
      return;
    };
    
    if (position > this.size) {
      this.insert(value);
      
      return;
    }
    
    if (position <= 0) {
      let newItem = new Node(value, this.head);
      
      this.head = newItem;
      this.size += 1;
      
      return; 
    }
    
    let currentItem = this.get(position);
    let previousItem = this.get(position - 1);
    
    if (previousItem) {
      let newItem = new Node(value, currentItem);
      previousItem.next = newItem;
      
      if (!newItem.next) {
        this.tail = newItem;
      };
    } else {
      let newItem = new Node(value, currentItem);
      this.head = newItem;
      
      if (!newItem.next) {
        this.tail = newItem;
      };
    }
    
    this.size += 1;
  }
  
  isEmpty(): boolean {
    return this.size === 0;
  }

  get(position: number): Node<T> | null {
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
    
    let current = this.head;
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
  delete(position: number): Node<T> | null {
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
      this.tail = null;
      this.head = null;
      this.size = 0;
    }
    else if (!previousItem && nextItem) {
      this.head = nextItem
      
      if (this.size === 2) {
        this.tail = nextItem;
        this.size = 1; 
      };
    
      this.size -= 1;
    }
    else if (previousItem && !nextItem) {
      previousItem.next = null;
      this.tail = previousItem;
      
      if (this.size === 2) {
        this.head = previousItem;
        this.size = 1;
        
        return item;
      }
      
      this.size -= 1;
    }
    
    return item;
  }
};

let list = new LinkedList();

list.insert("a");
list.insert("b");

list.delete(1);

console.dir(list, { depth: null });