class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    // add book details to the table in UI

    addBookList(book){

        // get the tbody
        const list = document.querySelector('#list');
        // create tr element
        const row = document.createElement('tr');
        // Insert columns from the input values
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;
        // append tr as child to tbody
        list.appendChild(row);
    }

    // showAlert function

    showAlert(message, className){
        // Create div in which the message will be shown
        const div = document.createElement('div');
        // Add class
        div.className = `alert ${className}`;
        // Add message that was given as input
        div.appendChild(document.createTextNode(message));
        // Get parent or assign div a parent
        const completeUI = document.querySelector('.CompleteUI');
        // Get form
        const form = document.querySelector('.form');
        // Insert the alert div
        completeUI.insertBefore(div, form);

        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }

    // clearing the fields function

    clearFields(){
        document.querySelector('#bookname').value ='';
        document.querySelector('#authorname').value='';
        document.querySelector('#isbn').value='';
    }

    // show a confirm alert 

    showConfirmAlert(message, target){

        //instantiate ui
        const ui = new UI();

        // select the UI to reduce its opacity upon getting the alert
        const completeUI = document.querySelector(".CompleteUI");
        // reduce the opacity
        completeUI.style.opacity = 0.70;
        // variable to select body
        const body = document.querySelector('body');       
        // create a div for the message alert
        const divC = document.createElement('div');
        // add class 
        divC.className = "ConfirmMsg";
        // add inner html
        divC.innerHTML = `<h4>${message}</h4><button id="yes" class="btn btn-light">Yes</button><button id="cancel" class="btn btn-dark">Cancel</button>`;
        // append divc as child to body
        body.appendChild(divC);

        // add event listener to the button click on alert

        document.querySelector('.ConfirmMsg').addEventListener('click', function(e){

            if(message==='Are you sure deleting the selected list?' && e.target.id === 'yes'){

                if(target.className === 'delete'){
                    target.parentElement.parentElement.remove();
                }

                ui.showAlert('Removed the selected list','success');

            }else if(message === 'Are you sure clearing the table ?' && e.target.id === 'yes'){

                if(target.id === 'danger'){

                    // select the tbody

                    const list = document.querySelector('#list');

                    // remove the children of tbody

                    while(list.firstChild){
                        list.removeChild(list.firstChild);
                    }
                }

                ui.showAlert('Cleared the table','success');
            }

            divC.remove();
            completeUI.style.opacity=1;
        })

    }

}

//Event Listener for button to add book

document.querySelector('.btn-success').addEventListener('click', function(e){

// Defining Variables

const title = document.querySelector('#bookname').value,
author = document.querySelector('#authorname').value,
isbn = document.querySelector('#isbn').value;

//Instantiating classes with objects

const book = new Book(title, author, isbn);

const ui = new UI();

// Validating inputs

if(title === ''|| author === ''|| isbn === ''){

    // fail Alert
    
    ui.showAlert('Enter Valid Values in the fields', 'fail');

}else{

    // add details to the table

    ui.addBookList(book);

    // success alert

    ui.showAlert('Book details added','success');

}

// clear fields

ui.clearFields();

e.preventDefault();
})

//Event Listener for link to delete a list

document.querySelector('#list').addEventListener('click', function(e){

    // instantiate ui

    const ui = new UI();

    // show alert

    ui.showConfirmAlert('Are you sure deleting the selected list?', e.target);

    e.preventDefault();
});

//Event Listener for button to delete all book list

document.querySelector('#danger').addEventListener('click', function(e){

    // instantiate ui

    const ui = new UI();

    // select the tbody

    const list = document.querySelector('#list');

    // check if there are children

    if(!list.firstChild){
        
        ui.showAlert('The table is already cleared','fail');

        ui.clearFields();

    }else{

        // getting an alert message to clear all list

        ui.showConfirmAlert('Are you sure clearing the table ?', e.target);

    }
    e.preventDefault();

})