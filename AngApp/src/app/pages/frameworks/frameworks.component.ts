import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frameworks',
  templateUrl: './frameworks.component.html',
  standalone:true,
  imports: [CommonModule, FormsModule], // <- Needed for ngModel
})
export class FrameworksComponent {
  searchTerm = '';
  frameworks = [
    { name: 'React', year: 2013, description: 'UI library' },
    { name: 'Angular', year: 2010, description: 'Full-featured framework' },
    { name: 'Vue', year: 2014, description: 'Progressive framework' }
  ];

  filteredFrameworks() {
    return this.frameworks.filter(f =>
      f.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
