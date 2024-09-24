const resetData = () => {
    let smtg = document.querySelectorAll('.item')

    smtg.forEach(element => {
        element.querySelector('.count').innerText = 0
        element.querySelector('.item-total').innerText = 0
        element.querySelector('.minus').setAttribute('disabled', true)
        element.classList.remove('highlight')
    })

    total = 0
    totalItems = 0
    updateTotal()
}

const showNotification = () => {

    // Show the notification
    const notification = document.getElementById('notification');
    notification.classList.add('show');

    // Hide it after 5 seconds
    setTimeout(function() {
        notification.classList.remove('show');
    }, 5000); // 5000ms = 5 seconds

}

const saveFunction = () => {
    let items = []
    let index = parseInt(localStorage.getItem(0)) + 1
    let smtg = document.querySelectorAll('.item')
    let name = document.querySelector('#name').value
    let bill_no = 100 + index

    const d = new Date()
    let date_time= (`${d.getDate()}/${d.getMonth()+1}/${`${d.getFullYear()}`.slice(2)} ${d.getHours()}:${d.getMinutes()}`)

    items.push(bill_no)
    items.push(name)
    items.push(date_time)
    items.push(parseInt(document.querySelector('.total').innerText))
    items.push(parseInt(document.querySelector('.paid').innerText))
    
    smtg.forEach((ele)=>{
        let no_of_item = parseInt(ele.querySelector('.count').innerText)
        let item_name = ele.querySelector('.item-name').innerText

        if (no_of_item == 0){
            // Do nothing
        }
        else{
            items.push([item_name, parseInt(no_of_item)])
        }

        ele.querySelector('.count').innerText = 0
    })

    localStorage.setItem(index, JSON.stringify(items))
    localStorage.setItem(0, index)

    showNotification()

    setTimeout(() => {
        window.location.reload()
    }, 6000);

}

let index = 1
const showFunction = () => {
    if (index > 1) {
        for(let i = 1; i<index; i++){
            let table = document.querySelector(".bill-table");
            table.deleteRow(1);
        }
        index = 1
    }

    
    const insertNewRow = (itemName, qty) => {
        const table = document.querySelector('.bill-table')
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

        index += 1
    }

    const table = document.querySelector('.bill-table')

    let data = document.querySelectorAll('.item')
    let amt = parseInt(document.querySelector('.total').innerText)


    data.forEach(element =>{
        let no_of_item = parseInt(element.querySelector('.count').innerText)
        let item_name = element.querySelector('.item-name').innerText

        if (no_of_item == 0){
            // Do nothing
        }
        else{
            insertNewRow(item_name, parseInt(no_of_item))
        }
    })

    if(document.querySelector('.total-extra').innerText != '0'){
    
        const table = document.querySelector('table')
        const row = table.insertRow(index)
    
        const extra_cell = row.insertCell()
        extra_cell.textContent = 'Extras'
        
        document.querySelectorAll('tr')[index].querySelectorAll('td')[0].colSpan = 4
    
        const extra_val = row.insertCell()
        extra_val.textContent = document.querySelector('.total-extra').innerText
        index += 1
    }

    document.querySelector('#totalAmt').innerText = document.querySelector('.total').innerText
    document.querySelector('#totalCigg').innerText = document.querySelector('.total-items').innerText
    document.querySelector('#paid1').innerText = document.querySelector('.paid').innerText
    document.querySelector('#due').innerText = document.querySelector('.due').innerText

    if(document.querySelector('#due').innerText == '0'){
        document.querySelector('#due').classList.add('green')
        document.querySelector('#due').classList.remove('red')
    }
    if(document.querySelector('#due').innerText != '0'){
        document.querySelector('#due').classList.add('red')
        document.querySelector('#due').classList.remove('green')
    }
}

const resetFunction = () => {
    window.location.reload()
}

const clear = () => {
    localStorage.clear()
    localStorage.setItem(0,0)
}

const _print = () => {
    print()
}