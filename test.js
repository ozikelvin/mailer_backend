const moment = require('moment')

const time = (moment().add(3, 'days') - moment())
const d = moment(time).format('dddd')
const c = Date.now(d)
console.log()

