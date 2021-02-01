import { Observable, interval, from, of, fromEvent } from 'rxjs'


async function main() {

  // of recebe qualquer coisa e cria um observable daquela coisa
  const numberObs: Observable<number> = of(2);
  const stringObs: Observable<string> = of('hello');
  const arrObservable: Observable<Date[]> = of([new Date, new Date])
  const voidObs: Observable<void> = of()

  // não da para converter promise em observable com o operador of
  const wtfPromiseInsideObs: Observable<Promise<number>> = of(Promise.resolve(4))

  // neste caso podemos usar o from que converte todo iterable ou thenable em um Observable
  // https://rxjs-dev.firebaseapp.com/api/index/function/from
  const promiseAsObservable: Observable<number> = from(Promise.resolve(4))

  const numberObs2: Observable<number> = from([1, 2, 3])


  const intervalObs: Observable<number> = interval(500)


  // converterndo eventos em observables
  const buttonElement = document.getElementById('some-button') as HTMLButtonElement
  const formEventObservable = fromEvent(buttonElement, 'click')


}

main()