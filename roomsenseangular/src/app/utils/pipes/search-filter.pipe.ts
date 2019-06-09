import { PipeTransform, Pipe } from '@angular/core';

@Pipe ({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform{

  transform(fullData: any[], searchBarInput: string): any [] {
    if (!fullData || !searchBarInput) {
      return fullData;
    }

    return fullData.filter(dataEntry =>
      dataEntry.room.toLowerCase().indexOf(searchBarInput.toLowerCase()) !== -1);

  }
}

// 1. Liste die gefiltert werden soll
// 2. Input
