import {Component, ViewEncapsulation} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Drag&Drop connected sorting group'
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  inProgress = [
    'Learn Angular',
    'Make portfolio website',
    'Cook dinner'
  ]

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  AddItem(event) {    
    const minLength = 0;
    const maxLength = 40;
    if (event.keyCode === 13) {
      if (event.target.value.length > minLength &&
          event.target.value.length <= maxLength) {
        this.todo.push(event.target.value);
        event.target.value = "";
      } else {
        alert("Description must be between " + minLength + " and " + maxLength + " characters.");
      }
    }
  }

  FindItemInList(list: string[], item: string) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === item) {
        return i;
      }      
    }
    return -1;
  }

  DeleteItemFromList(index: number, list: string[]) {
    list.splice(index, 1);
    document.getElementById("add-item-text").focus();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}