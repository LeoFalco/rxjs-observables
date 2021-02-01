import { Observable } from 'rxjs'

/*
  1. como criar observables modo raiz
  2. uma das principais diferenças entre observables e promises
  3. exemplo de observable assíncrono
*/

async function main() {

  const observable = new Observable(observer => {
    try {
      observer.next('hello world')
      observer.complete()
      observer.next('1')
    } catch (e) {
      observer.error(e)
    }
  })

  observable.subscribe(
    value => {
      console.log('next ->', value)
    },
    error => {
      console.log('error ->', error)
    },
    () => {
      console.log('completed')
    }
  )

  const subscription = observable.subscribe(
    value => {
      console.log('next 2 ->', value)
    },
    error => {
      console.log('error 2 ->', error)
    },
    () => {
      console.log('completed 2')
    }
  )

  subscription.unsubscribe()



  // const promise = new Promise((resolve, reject) => {
  //   try {
  //     resolve('hello world')
  //     resolve('hello world 1')
  //   } catch (e) {
  //     reject(e)
  //   }
  // })

  // promise.then(value => {
  //   console.log('promise ->', value)
  // })
}

main()