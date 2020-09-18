import * as React from 'react'
import {Button, StyleSheet} from 'react-native'

import { Text, View } from '../components/Themed'

interface Product {
  name: string
  delay: number
}

type QueueItemState = 'queued' | 'in progress' | 'ready'

interface QueueItem {
  id: number
  product: Product
  state: QueueItemState
  next?: QueueItem
}

type Queue = QueueItem[]

const CoffeeProducts: Product[] = [
  { name: 'Cafe Au Lait', delay: 4 * 1000 },
  { name: 'Cappuccino', delay: 10 * 1000 },
  { name: 'Expresso', delay: 15 * 1000 },
]

const promiseTimeout = (delay) => new Promise((resolve) =>
  setTimeout(resolve, delay)
)

let id = 1

const mutableQueue: Queue = []

export default function TabOneScreen() {
  const [queue, setQueue] = React.useState<Queue>([])
  const queueRef = React.useRef<Queue>(queue)
  queueRef.current = queue

  const makeCoffee = async (queueItem: QueueItem) => {
    let next: QueueItem | undefined = queueItem
    while (next) {
      next.state = 'in progress'
      setQueue([...mutableQueue])
      await promiseTimeout(next.product.delay)
      next.state = 'ready'
      setQueue([...mutableQueue])
      next = next.next
    }
  }

  const makeOrder = async (product: Product) => {
    const item: QueueItem = {
      id: id++,
      product,
      state: 'queued',
    }

    const last = mutableQueue[mutableQueue.length - 1]
    if (last)
      last.next = item

    mutableQueue.push(item)
    setQueue([...mutableQueue])

    if (!last || last.state === 'ready')
      makeCoffee(item)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>The Coffee Shop</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>The Menu</Text>
      <View>
        {CoffeeProducts.map(product =>
          <View style={styles.menuItem}>
            <Button onPress={() => makeOrder(product)} title={product.name} />
          </View>
        )}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text style={styles.title}>Queue</Text>

        {
          queue.map(({id, product, state}) =>
            <Text key={id} style={styles.queueItem}>{product.name} is {state}</Text>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  menuItem: {
    marginBottom: 20,
  },
  queueItem: {
    marginBottom: 20,
  }
});
