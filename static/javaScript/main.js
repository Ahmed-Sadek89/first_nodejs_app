console.log('hello, world');
const radioBtns = document.querySelectorAll('input[type="radio"]');
let alldata = [];
const checkboxItems = document.querySelectorAll('input[type="checkbox"]')
const updateBtn = document.querySelector('.update');
const deleteBtn = document.querySelector('.delete');

radioBtns.forEach(radio => {
    radio.addEventListener('click', (e) => {
        console.log(e.target.value === 'true' ? true : false);
    })
})

checkboxItems.forEach(checkBox => {
    checkBox.addEventListener('click', (e) => {
        if(e.target.checked === true){
            alldata.push(e.target.value)
        }else{
            alldata.pop(e.target.value)
        }
        console.log(alldata);

    })
})

updateBtn.addEventListener('click' ,() => {
    e.preventDefault()
    console.log('update')
})

deleteBtn.addEventListener('click' ,() => {
    console.log('delete')
})