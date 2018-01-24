import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
// export class TruncatePipe {
//   transform(value: string, args: string[]) : string {
//     let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
//     let trail = args.length > 1 ? args[1] : '...';
//
//     return value.length > limit ? value.substring(0, limit) + trail : value;
//   }
// }
export class TruncatePipe implements PipeTransform {
  
  // transform(value: string, ...args) {
  //   let maxLength:number = 20;
  //   if(value.length>maxLength){
  //     if (args.length && args[0] <= maxLength){
  //       value = value.slice(0, args[0]);
  //     } else{
  //       value = value.slice(0, maxLength);
  //     }
  //     value = value + '...';
  //   }
  //   return value;
  // }
  transform(value: string, limit: number = 40, trail: String = '…'): string {
    if (!value) { value = ''; }
    if (limit < 0) {
      limit *= -1;
      return value.length > limit ? trail + value.substring(value.length - limit, value.length) : value;
    } else {
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }
}
