import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(fullData: any[], searchBarInput: string): any[] {

    if (!fullData || !searchBarInput) {
      return fullData;
    }
    console.log('Full Data in Pipe: ' + JSON.stringify(fullData));
    return fullData.filter(dataEntry =>
      dataEntry.room !== null && dataEntry.room !== undefined && dataEntry.room.toLowerCase().indexOf(searchBarInput.toLowerCase()) !== -1);
  }
}

// 1. Liste die gefiltert werden soll
// 2. Input
