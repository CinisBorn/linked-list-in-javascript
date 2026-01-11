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
    if (position < 0 || position > this.size) {
      return false;
    }
    
    if (!this.head) {
      this.insert(value);
      return true
    };
    
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
    } else {
      this.head = new Node(value, current);
    }
    
    this.size++;
    
    return true 
  }
  
  isEmpty(): boolean {
    return this.size === 0;
  }

  get(position: number): T | null {
    if (this.isEmpty()) {
      return null;
    };
    
    if (position < 0 || position >= this.size) {
      return null;
    }
    
    let current: Node<T> | null = this.head;
    let index = 0;
   
    while (current && index < position) {
      current = current.next;
      index++
    }
    
    if (!current) {
      return null;
    }
    
    return current.value;
  }
  
  remove(value: any): T | null {
    if (!this.head) {
      return null;
    }

    let current: Node<T> | null = this.head;
    let previous: Node<T> | null = null;
    
    while (current) {
      if (current.value === value) {
        break;
      };
      
      previous = current;
      current = current.next;
    }
    
    if (!current) {
      return null;
    }
    
    if (!previous) {
      this.head = current.next;
      this.size--;
      
      return current.value;
    }
    
    previous.next = current.next;
    this.size--;
    
    return current.value;
  }
};

let list = new LinkedList();

console.dir(list, { depth: null });