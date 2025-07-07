// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import these

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], //  Add modules here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  searchTerm = '';

  tools = [
    { name: 'Angular', release: 2010, description: 'A popular framework...' },
    { name: 'Ember', release: 2011, description: 'Opinionated framework...' },
    { name: 'Grunt', release: 2012, description: 'One of the first...' },
    { name: 'Gulp', release: 2016, description: 'Popular task runner...' },
    { name: 'Jasmine', release: 2017, description: 'Behavior-driven test...' },
    { name: 'jQuery', release: 2006, description: 'DOM library...' },
    { name: 'Knockout', release: 2010, description: 'Small and lightweight...' },
    { name: 'Node', release: 2017, description: 'Run-time environment...' },
    { name: 'NPM', release: 2010, description: 'The Node package manager...' },
    { name: 'React', release: 2013, description: 'Focuses on building UI...' },
    { name: 'Underscore', release: 2015, description: 'JS utility functions...' },
    { name: 'Webpack', release: 2017, description: 'Module bundler...' },
    { name: 'Vue', release: 2020, description: 'Progressive framework...' },
  ];

  get filteredTools() {
    const term = this.searchTerm.toUpperCase();
    return this.tools.filter(tool =>
      `${tool.name} ${tool.release} ${tool.description}`.toUpperCase().includes(term)
    );
  }
}
