import { PipeTransform, Pipe } from '@angular/core';

@Pipe ({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform{

  transform(data: any[], searchBarInput: string): any [] {
    if (!data || !searchBarInput) {
      return data;
    }

    return data.filter(dataEntry =>
      dataEntry.id.toLowerCase().indexOf(searchBarInput.toLowerCase()) !== -1);

  }
}

// 1. Liste die gefiltert werden soll
// 2. Input
