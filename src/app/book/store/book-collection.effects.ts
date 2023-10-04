import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from "rxjs/operators";
import { loadBooksComplete, loadBooksStart } from "./book-collection.actions";
import { BookApiService } from "../book-api.service";

@Injectable()
export class BookCollectionEffects {
  load = createEffect(() =>
      this.actions$.pipe(
          ofType(loadBooksStart),
          exhaustMap(() => this.bookApi.getAll()),
          map(books => loadBooksComplete({ books }))
      )
  );

  constructor(private actions$: Actions, private bookApi: BookApiService) {}
}