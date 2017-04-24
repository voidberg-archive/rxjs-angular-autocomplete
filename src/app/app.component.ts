import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { URLSearchParams, Jsonp } from '@angular/http';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items:Array<string>;
  term$ = new Subject<string>();
  cache:Object = {};

  private search(term:string) {
    if (this.cache[term]) {
      return Observable.of(this.cache[term]);
    }

    let search = new URLSearchParams();
    
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');

    return this.jsonp.get('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
      .map(response => {
        this.cache[term] = response.json()[1];
        return this.cache[term];
      });
  }

  constructor(private jsonp: Jsonp) {
    this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .filter(term => term && term.length > 3)
      .switchMap(term => this.search(term))
      .subscribe(results => this.items = results);
  }
}
