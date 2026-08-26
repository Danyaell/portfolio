import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dml-not-found-page',
  imports: [RouterLink],
  host: {
    class: 'block w-full',
  },
  templateUrl: './not-found-page.html',
})
export class NotFoundPageComponent {}
