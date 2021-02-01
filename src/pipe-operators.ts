import { interval, concat, from, merge, of, from, forkJoin, Subject } from 'rxjs'

import { catchError, debounce, debounceTime, map, switchMap, take, tap, takeUntil } from 'rxjs/operators'


// https://rxjs-dev.firebaseapp.com/operator-decision-tree

async function main() {

  const takeSubscriptions = new Subject<void>();

  // https://rxjs-dev.firebaseapp.com/api/operators/debounceTime
  // interval cria um observable que emite um contador que incrementa a cada determinado intervalo de tempo
  // debounceTime da uma espécie de delay e cancela valores que são emitidos dentro deste delay,
  // só emite um valor caso o tempo do delay passar sem nenhuma nova emissão da fonte
  interval(500)
    .pipe(
      takeUntil(takeSubscriptions),
      take(5),
      debounceTime(1000))
    .subscribe(value => {
      console.log(value)
    })

  takeSubscriptions.next()
  takeSubscriptions.complete()

  // concat emite valores de um observable até ele completar, apos isso troca para um segundo e emite seus valores
  // pode receber n observables
  concat(
    interval(500).pipe(take(2)),
    interval(500).pipe(take(2))
  ).subscribe(value => {
    console.log(value)
  })
  // 1 2 1 2

  // merge uma versão paralela do concat, "junta" os observables emite os valores vindos de qualquer um deles
  merge(
    interval(500).pipe(take(2)),
    interval(500).pipe(take(2)),
    debounceTime(500)
  ).subscribe(value => {
    console.log(value)
  })
  // 1 2


  forkJoin([
    of(1),
    of(2)
  ]).subscribe(values => {
    values[0]
    values[1]
  })


  // tap gera um efeito colateral sem alterar a emissão da fonte
  of(1, 2, 3)
    .pipe(tap(value => console.log(value)))
    .subscribe(value => {
      console.log(value)
    });

  // map análogo ao map do Array, permite transformar um valor emitido
  of(1, 2, 3)
    .pipe(map(value => value ** 2))
    .subscribe(value => {
      console.log(value)
    });
  // 1 4 9

  // https://rxjs-dev.firebaseapp.com/api/operators/switchMap
  // switchMap parecido com o map mas o resultado da transformação precisa ser um observable
  // em resumo esse operador nos permite trocar de um observable para outro
  of(1, 2, 3)
    .pipe(
      switchMap(value => of(value ** 2))
    ).subscribe(value => {
      console.log(value)
    });

  // .toPromise() não é exatamente um operador mas pode ser útil em alguns casos
  // quando o observable completa  a promise é resolvida com o último valor emitido
  of(1).toPromise()

  // catchError útil parar trartar errors dentro da pipeline, deve retornar um observable como fallback
  of(1, 2, 3, 4, 5).pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => of('I', 'II', 'III', 'IV', 'V')),
  )
    .subscribe(x => console.log(x));
  // 1, 2, 3, I, II, III, IV, V



}

main()