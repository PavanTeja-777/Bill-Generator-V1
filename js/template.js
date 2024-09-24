const urlParams = new URLSearchParams(window.location.search);
const bill_no = urlParams.get('billNo');

let item = JSON.parse(localStorage.getItem(parseInt(bill_no)-100))

const table = document.querySelector('table')
let index = 1
let total_amt = 0
let total_cig = 0

let _name = item[1]
let date_time = item[2]
let amt = item[3]
let paid = item[4]

const insertNewRow = (itemName, qty) => {
    const row = table.insertRow(index)

    const c1 = row.insertCell()
    c1.textContent = index
    
    const c2 = row.insertCell()
    c2.textContent = itemName
    
    const c3 = row.insertCell()
    c3.textContent = prices[itemName]
    
    const c4 = row.insertCell()
    c4.textContent = qty
    
    const c5 = row.insertCell()
    c5.textContent = qty*prices[itemName]

    total_amt += qty*prices[itemName]
    total_cig += qty

    index += 1
}

for (let i = 5; i < item.length; i++) {
    const element = item[i];
    insertNewRow(element[0], element[1])
}

if(total_amt < amt){
    
    const table = document.querySelector('table')
    const row = table.insertRow(index)

    const extra_cell = row.insertCell()
    extra_cell.textContent = 'Extras'
    
    document.querySelectorAll('tr')[index].querySelectorAll('td')[0].colSpan = 4

    const extra_val = row.insertCell()
    extra_val.textContent = amt - total_amt
}


document.querySelector('#name').innerText = _name
document.querySelector('#date').innerText = date_time
document.querySelector('#totalAmt').innerText = amt
document.querySelector('#totalCigg').innerText = total_cig
document.querySelector('#paid').innerText = paid
document.querySelector('#bal').innerText = amt - paid

const _print = () => {
    print()
}