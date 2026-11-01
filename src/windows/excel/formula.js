// A small spreadsheet formula evaluator: + - * / ^, parentheses, cell references,
// ranges, and SUM / AVERAGE / COUNT / MAX / MIN.

export class FormulaError extends Error {
  constructor(code) {
    super(code)
    this.code = code
  }
}

const TOKEN = /\s*(\d+\.?\d*|\.\d+|[A-Za-z]+\d+|[A-Za-z]+|[()+\-*/^,:])/y

function tokenize(source) {
  const tokens = []
  TOKEN.lastIndex = 0
  while (TOKEN.lastIndex < source.length) {
    const start = TOKEN.lastIndex
    const match = TOKEN.exec(source)
    if (!match) {
      if (source.slice(start).trim() === '') break
      throw new FormulaError('#NAME?')
    }
    tokens.push(match[1])
  }
  return tokens
}

export function columnName(index) {
  let name = ''
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name
  }
  return name
}

function parseAddress(address) {
  const [, letters, digits] = address.match(/^([A-Z]+)(\d+)$/)
  const column = [...letters].reduce((total, c) => total * 26 + c.charCodeAt(0) - 64, 0) - 1
  return { column, row: Number(digits) - 1 }
}

const FUNCTIONS = {
  SUM: values => values.reduce((a, b) => a + b, 0),
  AVERAGE: values => {
    if (values.length === 0) throw new FormulaError('#DIV/0!')
    return values.reduce((a, b) => a + b, 0) / values.length
  },
  COUNT: values => values.length,
  MAX: values => (values.length ? Math.max(...values) : 0),
  MIN: values => (values.length ? Math.min(...values) : 0),
}

// sheet: { rows, columns, get(address) } where get returns a number, string, or ''.
export function evaluate(source, sheet) {
  const tokens = tokenize(source)
  let position = 0
  const peek = () => tokens[position]
  const next = () => tokens[position++]

  function read(address) {
    const { row, column } = parseAddress(address)
    if (row < 0 || row >= sheet.rows || column >= sheet.columns) throw new FormulaError('#REF!')
    const value = sheet.get(address)
    if (typeof value === 'string' && value.startsWith('#')) throw new FormulaError(value)
    return value
  }

  function readRange(from, to) {
    const a = parseAddress(from)
    const b = parseAddress(to)
    read(from)
    read(to)
    const values = []
    for (let row = Math.min(a.row, b.row); row <= Math.max(a.row, b.row); row++) {
      for (let column = Math.min(a.column, b.column); column <= Math.max(a.column, b.column); column++) {
        values.push(read(`${columnName(column)}${row + 1}`))
      }
    }
    return values
  }

  function toNumber(value) {
    if (value === '') return 0
    if (typeof value === 'number') return value
    throw new FormulaError('#VALUE!')
  }

  function expression() {
    let value = term()
    while (peek() === '+' || peek() === '-') {
      value = next() === '+' ? value + term() : value - term()
    }
    return value
  }

  function term() {
    let value = power()
    while (peek() === '*' || peek() === '/') {
      if (next() === '*') {
        value *= power()
      } else {
        const divisor = power()
        if (divisor === 0) throw new FormulaError('#DIV/0!')
        value /= divisor
      }
    }
    return value
  }

  function power() {
    const base = unary()
    if (peek() !== '^') return base
    next()
    return base ** power()
  }

  function unary() {
    if (peek() === '-') {
      next()
      return -unary()
    }
    if (peek() === '+') {
      next()
      return unary()
    }
    return primary()
  }

  function functionCall(name) {
    const fn = FUNCTIONS[name]
    if (!fn) throw new FormulaError('#NAME?')
    next() // the opening parenthesis
    const values = []
    if (peek() !== ')') {
      do {
        const token = peek()
        if (/^[A-Za-z]+\d+$/.test(token ?? '')) {
          next()
          const address = token.toUpperCase()
          if (peek() === ':') {
            next()
            const end = next()
            if (!/^[A-Za-z]+\d+$/.test(end ?? '')) throw new FormulaError('#NAME?')
            values.push(...readRange(address, end.toUpperCase()).filter(v => typeof v === 'number'))
            continue
          }
          const value = read(address)
          if (typeof value === 'number') values.push(value)
          continue
        }
        values.push(expression())
      } while (peek() === ',' && next())
    }
    if (next() !== ')') throw new FormulaError('#NAME?')
    return fn(values)
  }

  function primary() {
    const token = next()
    if (token === undefined) throw new FormulaError('#NAME?')
    if (token === '(') {
      const value = expression()
      if (next() !== ')') throw new FormulaError('#NAME?')
      return value
    }
    if (/^[\d.]/.test(token)) return Number(token)
    if (/^[A-Za-z]+\d+$/.test(token) && peek() !== '(') return toNumber(read(token.toUpperCase()))
    if (/^[A-Za-z]+\d*$/.test(token) && peek() === '(') return functionCall(token.toUpperCase())
    throw new FormulaError('#NAME?')
  }

  const result = expression()
  if (position !== tokens.length) throw new FormulaError('#NAME?')
  return Number.isFinite(result) ? Number(result.toFixed(10)) : '#NUM!'
}
