import { Observable, interval, from, of, fromEvent, Subject } from 'rxjs'



async function main() {

  const subject = new Subject<string>();


  subject.subscribe(value => {
    console.log('value', value)
  })

  subject.next('Hello world')
}

main();