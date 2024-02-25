import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Matrix, initMatrixIntRandom, addIntMatrixes, multiplyIntMatrixes, Highlight } from './matrix';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// Correction avec des génériques, pour les étufiant, l'utilisation de number est suffisante...
export class AppComponent<L1 extends number, H1 extends number, L2 extends number, H2 extends number> {
  // à compléter
  
  readonly _sigL1 = signal<number>(2) ;

  readonly _sigH1 = signal<number>(2) ;

  readonly _sigL2 = signal<number>(2) ;

  readonly _sigH2 = signal<number>(2) ;
  
  readonly _sigM1 = computed(() => initMatrixIntRandom(this._sigL1(), this._sigH1())) ;
  readonly _sigM2 = computed(() => initMatrixIntRandom(this._sigL2(), this._sigH2())) ;

  readonly sigM1PlusM2 = computed <Matrix<number,number,number> | undefined>(
    () => {
      if(this._sigL1() !== this._sigL2() || this._sigH1() !== this._sigH2()){
        return undefined ;
      }
      else{
        return addIntMatrixes(this._sigM1(), this._sigM2()) ;
      }
    }
  ) ;

  readonly sigM1xM2 = computed <Matrix<number,number,number> | undefined>(
    () => {
      if(this._sigL1() !== this._sigH2() || this._sigH1() !== this._sigL2()){
        return undefined ;
      }
      else{
        return multiplyIntMatrixes(this._sigM1(), this._sigM2()) ;
      }
    }
  ) ;

  readonly sigHhilightInM1 = signal<Highlight>(undefined) ;
  readonly sigHhilightInM2 = signal<Highlight>(undefined) ;
  readonly sigHhilightInM1plusM2 = signal<Highlight>(undefined) ;
  readonly sigHhilightInM1xM2 = signal<Highlight>(undefined) ;

  overM1plusM2( c?: [line: number, column: number] ): void {
    if(c !== undefined){
      this.sigHhilightInM1plusM2.set({'line':c[0], 'column':c[1]}) ;
      this.sigHhilightInM1.set({'line':c[0], 'column':c[1]}) ;
      this.sigHhilightInM2.set({'line':c[0], 'column':c[1]}) ;
    }
  }

  overM1xM2( c?: [line: number, column: number] ): void {
    if(c !== undefined){
      this.sigHhilightInM1xM2.set({'line':c[0], 'column':c[1]}) ;
      this.sigHhilightInM1.set({'line':c[0]}) ;
      this.sigHhilightInM2.set({'column':c[1]}) ;
    }
  }


}
