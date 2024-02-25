import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Highlight, Matrix } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatrixComponent {

  @Input({ required:true }) data !: Matrix<number, number, number> | undefined ;

  @Output() pointerOver = new EventEmitter<[line: number, column: number] | undefined>() ;

  // Ligne et colonne de la case à illuminer
  @Input() highlight : Highlight = undefined ;

  pointerenterEmit(line: number, column: number) : void {
    this.pointerOver.emit([line,column]) ;
  }

  pointerleaveEmit() : void {
    this.pointerOver.emit(undefined) ;
  }

  isHighlighted(line: number, column: number): boolean {
    if(this.highlight){
      if('line' in this.highlight && 'column' in this.highlight){
        return this.highlight.line === line && this.highlight.column === column ;
      }
      else if('line' in this.highlight){
        return this.highlight.line === line ;
      }
      else if('column' in this.highlight){
        return this.highlight.column === column ;
      }
      else{
        return false ;
      }
    }
    return false ;
  }
  
}
