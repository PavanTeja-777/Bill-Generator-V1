const genItem = (item_name, price)=>{
    return `            <section>
                <div class="item">
                    <span class="item-name">
                        ${item_name}
                    </span>
                    <div class="details">
                        <div>
                            <span class="price-text">Price: ₹</span>
                            <span class ="price">${price}</span>
                        </div>
                        <div class="count-div">
                            <div class="minus-div">
                                <button class="minus"><img class='minus-svg' src='img/minus.svg' width=12 height=12></button>
                            </div>
                            <div class="value-div">
                                <span class="count">
                                    0
                                </span>
                            </div>
                            <div class="plus-div">
                                <button class=" plus"><img src='img/plus.svg' width=12 height=12></button>
                            </div>
                        </div>
                    </div>
                    <div class="item-total-div">
                        <span>
                            Cost:
                        </span>
                        <span class="item-total">
                            0
                        </span>
                    </div>
                </div>
            </section>`
}

const insertItem = (itemName, price)=>{
    document.querySelector('.main').innerHTML += genItem(itemName, price)
}

for (let key in prices) {
    insertItem(key, prices[key])
}
const updateTotal = () =>{
    let total = 0
    let totalItems = 0
    let itemTotals = document.querySelectorAll('.item-total')
    let totalItemsList = document.querySelectorAll('.count')

    for (let i = 0; i < itemTotals.length; i++){
        total += parseInt(itemTotals[i].innerText)
    }

    for (let i = 0; i < totalItemsList.length; i++) {
        totalItems += parseInt(totalItemsList[i].innerText) 
    }

    let extra = parseInt(document.querySelector('.total-extra').innerText)
    total += extra

    let paid = parseInt(document.querySelector('.total-paid').innerText)
    let due = total-paid

    if (isNaN(due)){
        due = 0
    }

    document.querySelector('.total').innerText = total
    document.querySelector('.totalItems').innerText = totalItems
    document.querySelector('.paid').innerText = paid
    document.querySelector('.due').innerText = due
}

document.querySelector('.extra-items').addEventListener('input',()=>{
    const expression = document.querySelector('.extra-items').value

    value = eval(expression)
    if(value == undefined){
        value = 0
    }
    document.querySelector('.total-extra').innerText = value
    updateTotal()
})

document.querySelector('.paid-inp').addEventListener('input', ()=>{
    const expression = document.querySelector('.paid-inp').value

    value = eval(expression)
    if(value == undefined){
        value = 0
    }
    document.querySelector('.total-paid').innerText = value
    updateTotal()
})

let plusButtons = document.querySelectorAll('.plus')
plusButtons.forEach(element => {
    element.addEventListener('click',()=>{
        let parent = element.parentNode.parentNode.parentNode.parentNode
        let itemTotal = parent.querySelector('.item-total')
        let total =  parseInt(itemTotal.innerText) + parseInt(parent.querySelector('.price').innerText)
        let count =  parseInt(parent.querySelector('.count').innerText) + 1
        
        // console.log(parent.querySelector('.minus'))
        parent.querySelector('.minus').removeAttribute('disabled')
        parent.classList.add('highlight')

        itemTotal.innerText = total
        parent.querySelector('.count').innerText = count
        updateTotal()
    })
});


let minusButtons = document.querySelectorAll('.minus')
minusButtons.forEach(element => {
    // making all buttons disable at start 
    element.setAttribute('disabled', true)

    // adding function click to change count value
    element.addEventListener('click',()=>{
        // finding parent node of the button clicked
        let parent = element.parentNode.parentNode.parentNode.parentNode
        let itemTotal = parent.querySelector('.item-total')

        // decrementing item total by item price
        let total =  parseInt(itemTotal.innerText) - parseInt(parent.querySelector('.price').innerText)

        // decrementing count by 1
        let count =  parseInt(parent.querySelector('.count').innerText) - 1

        // Chaning the vales
        itemTotal.innerText = total
        parent.querySelector('.count').innerText = count

        // Makes - buttons disable if it reaches 0
        if (parseInt(parent.querySelector('.count').innerText) == 0 || count == 0) {
            element.setAttribute('disabled', true)
            parent.classList.remove('highlight')
        }

        // updating total
        updateTotal()
    })
});