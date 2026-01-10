class Node<T> {
  value: T;
  next: Node<T> | null = null;
  
  constructor(v: T, i: Node<T> | null) {
    this.value = v;
    this.next = i;
  }
};

class LinkedList<T> {
  private head: Node<T> | null = null; 
  private tail: Node<T> | null = null;
  size = 0;

  insert(value: T): void {
    if (!this.head) {
      this.head = new Node(value, null);
      this.size++ 
      return;
    };
    
    let current: Node<T> | null = this.head;
    let previous: Node<T> | null = null;
    
    while (current) {
      previous = current;
      current = current.next
    }
    
    if (previous) {
      previous.next = new Node(value, null);
      this.size++;
    }
    
    return;
  }
  
  insertAt(position: number, value: any): boolean {
    if (!this.head) {
      this.insert(value);
      return true
    };
    
    if (position < 0 || position >= this.size) {
      return false;
    }
    
    let current: Node<T> | null = this.head;
    let previous: Node<T> | null = null;
    let index = 0;
    
    while (current && index < position) {
      previous = current;
      current = current.next;

      index++;
    };
    
    if (previous) {
      let newNode = new Node(value, current);
      previous.next = newNode;

      this.size++;
    };
    
    return true 
  }
  
  isEmpty(): boolean {
    return this.size === 0;
  }

  get(position: number): any | boolean {
    if (this.isEmpty()) {
      return false;
    };
    
    if (position < 0 || position >= this.size) {
      return false;
    }
    
    let current: Node<T> | null = this.head;
    let index = 0;
   
    while (current && index < position) {
      current = current.next;
      index++
    }
    
    if (!current) {
      return false;
    }
    
    return current.value;
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
list.insert("c");
list.insert("c");
list.insert("z");

console.dir(list.get(-1), { depth: null });