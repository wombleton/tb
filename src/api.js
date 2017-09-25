import _ from 'lodash'
import faker from 'faker'

const customers = [
  {
    id: 'd7ffb55e-2ba0-4d5b-acba-2a5999f573a5',
    name: 'Handcrafted Plastic Pizza',
    slice: 1,
  },
  {
    id: '9fd87e4b-e246-40cd-9736-4e7cde1a7ad1',
    name: 'Rustic Cotton Ball',
    slice: 2,
  },
  {
    id: '74864fa9-454a-44df-a49a-0025f8555004',
    name: 'Handcrafted Cotton Hat',
    slice: 3,
  },
  {
    id: '329c7f3b-0a43-483f-be5b-246ad96f7de6',
    name: 'Fantastic Steel Keyboard',
    slice: 4,
  },
  {
    id: 'a6878a89-c415-410e-804f-38d55c3d85bb',
    name: 'Practical Granite Salad',
    slice: 5,
  },
  {
    id: 'ab717c02-ac9d-4d1c-b70c-ef1be30eea6a',
    name: 'Small Fresh Tuna',
    slice: 6,
  },
  {
    id: '9138b596-e587-456e-9d83-9761da3e8c97',
    name: 'Small Plastic Bacon',
    slice: 7,
  },
  {
    id: '4cb219fb-c494-4d8b-a9ad-2bc1cbcc4c09',
    name: 'Sleek Granite Chair',
    slice: 8,
  },
  {
    id: '3e056f35-ea56-4443-808e-1dcce629f4cc',
    name: 'Tasty Soft Ball',
    slice: 9,
  },
  {
    id: 'acd8f46e-5642-4bc4-a3be-df1ab38edf6b',
    name: 'Incredible Wooden Car',
    slice: 10,
  },
]

const flags = [
  {
    key: 'rosella_info',
    description: 'Cross-group heuristic definition',
    rolling: false,
    slice: 0,
    on: ['acd8f46e-5642-4bc4-a3be-df1ab38edf6b'],
    off: ['3e056f35-ea56-4443-808e-1dcce629f4cc'],
  },
  {
    key: 'kiel_biz',
    description: 'Multi-tiered well-modulated local area network',
    rolling: false,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'anne_biz',
    description: 'Team-oriented bifurcated process improvement',
    rolling: false,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'jeanette_name',
    description: 'Pre-emptive 24/7 service-desk',
    rolling: false,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'luisa_info',
    description: 'Adaptive real-time installation',
    rolling: false,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'noah_biz',
    description: 'Advanced systemic implementation',
    rolling: false,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'giles_name',
    description: 'Centralized demand-driven emulation',
    rolling: true,
    slice: 5,
    on: [],
    off: [],
  },
  {
    key: 'prudence_name',
    description: 'Phased multi-state matrices',
    rolling: true,
    slice: 0,
    on: [],
    off: [],
  },
  {
    key: 'davonte_net',
    description: 'Cloned composite infrastructure',
    rolling: false,
    slice: 10,
    on: [],
    off: [],
  },
  {
    key: 'bernadette_net',
    description: 'Cross-platform grid-enabled secured line',
    rolling: false,
    slice: 10,
    on: [],
    off: ['9fd87e4b-e246-40cd-9736-4e7cde1a7ad1'],
  },
]

async function getCustomer(id) {
  const customer = customers.find(function(customer) {
    return customer.id === id
  })

  if (customer) {
    const flagList = await getFlags()
    const flags = flagList.map(flag => {
      const { key, off, on, slice } = flag
      let enabled
      let forced = false

      if (~off.indexOf(customer.id)) {
        enabled = false
        forced = true
      } else if (~on.indexOf(customer.id)) {
        enabled = true
        forced = true
      } else {
        enabled = slice <= customer.slice
      }
      return { enabled, forced, key, slice }
    })

    return _.extend({}, customer, { flags })
  }

  return customer
}

async function getCustomers() {
  customers.sort(function(a, b) {
    return a.name > b.name
  })

  return customers
}

async function getFlags() {
  flags.sort(function(a, b) {
    return a.key > b.key
  })
  return flags
}

async function getFlag(key) {
  const flag = flags.find(function(flag) {
    return flag.key === key
  })

  if (flag) {
    const off = await Promise.all(
      (flag.off || []).map(async id => {
        const customer = await getCustomer(id)

        return customer
      })
    )
    const on = await Promise.all(
      (flag.on || []).map(async id => {
        const customer = await getCustomer(id)

        return customer
      })
    )

    const log = []
    for (let i = 0; i < _.random(Math.max(3, flag.slice)); i++) {
      log.push({
        ts: faker.date.past(),
        text: faker.lorem.sentence(),
      })
    }
    log.sort((a, b) => {
      return b.ts - a.ts
    })

    return _.extend({}, flag, { on, off, log })
  }

  return flag
}

async function turnOff(key) {
  const flag = await getFlag(key)
  flag.rolling = false
  flag.slice = 0
  return flag
}

async function turnOn(key) {
  const flag = await getFlag(key)
  flag.rolling = false
  flag.slice = 10
  return flag
}

async function roll(key) {
  const flag = await getFlag(key)
  flag.rolling = true
  return flag
}

async function stop(key) {
  const flag = await getFlag(key)
  flag.rolling = false
  return flag
}

async function reset(customerId, key) {
  const flag = _.find(flags, { key })
  flag.off = _.remove(flag.off, customerId)
  flag.on = _.remove(flag.on, customerId)

  return await getCustomer(customerId)
}

async function setOffForCustomer(customerId, key) {
  const flag = _.find(flags, { key })
  flag.off.push(customerId)
  flag.on = _.remove(flag.on, customerId)

  return await getCustomer(customerId)
}

async function setOnForCustomer(customerId, key) {
  const flag = _.find(flags, { key })
  flag.on.push(customerId)
  flag.off = _.remove(flag.off, customerId)

  return await getCustomer(customerId)
}

async function setSlice(flagKey, slice) {
  const flag = _.find(flags, {
    key: flagKey,
  })
  flag.slice = slice

  return await getFlag(flagKey)
}

async function setCustomerSlice(id, slice) {
  const customer = customers.find(function(customer) {
    return customer.id === id
  })
  customer.slice = slice
  return await getCustomer(id)
}

export {
  getCustomer,
  getCustomers,
  getFlag,
  getFlags,
  reset,
  roll,
  setCustomerSlice,
  setOnForCustomer,
  setOffForCustomer,
  setSlice,
  stop,
  turnOff,
  turnOn,
}
