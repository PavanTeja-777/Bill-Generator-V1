let sno = 0
const _insertRow = (bill_no, name, date_time, no_of_cigg, total_Amt, paid, due) => {
    sno += 1
    bg = (sno%2==0) ? "grey": ""

    return `            <tr class='${bg}'>
                <td>${sno}</td>
                <td>${name}</td>
                <td>${date_time}</td>
                <td>${no_of_cigg}</td>
                <td>${total_Amt}</td>
                <td>${paid}</td>
                <td>${due}</td>
                <td class="save-cell"><button onclick='redirectTo(${bill_no})'>Click</button></td>
                <td class="del-cell"><button onclick='_delete(${bill_no})'><img class='svg-del' src="../img/delete.svg"></button></td>
            </tr>`
}

const redirectTo = (no)=>{
    window.open(`template.html?billNo=${no}`)
}

const _delete = (no) => {
    localStorage.removeItem(no-100)
    update()
}

const readData = () => {
    let total_items =[]
    
    for (let i = 0; i <= localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        
        total_items.push([JSON.parse(key), JSON.parse(value)])
    }
    
    total_items.sort((a, b) => a[0] - b[0])
    let total_vales = []

    total_items.forEach(element => {
        total_vales.push(element[1])
    })

    return total_vales
}

const showData = (items) => {
    if (sno > 0) {
        for(let i = 0; i < sno; i++){
            let table = document.querySelector("table");
            table.deleteRow(1);
        }
        sno = 0
    }
    while(items.length - 2){
        let item = items.pop()
        let bill_no = item[0]
        let name = item[1]
        let date_time = item[2]
        let totalAmt = item[3]
        let paid = item[4]
        let due = totalAmt-paid
        let no_items = 0

        for (let i = 5; i < item.length; i++) {
            const element = item[i];
            no_items += element[1]
        }

        // console.log(`Bill no: ${bill_no}, Total amount: ${totalAmt}, Paid: ${paid}, Balance: ${totalAmt-paid}, Total no.of Cigg: ${no_items}`)
        document.querySelector('table').innerHTML += _insertRow(bill_no, name, date_time, no_items, totalAmt, paid, totalAmt-paid)
    }
}

const update = () => {
    let items = readData()
    showData(items)
}

update()

const _clear = () =>{
    localStorage.clear()
    localStorage.setItem(0,0)
    update()
}