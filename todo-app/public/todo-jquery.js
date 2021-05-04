// $(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //  create dom element for newly created task
            console.log(data)
            createNewTask(data)
          }
        });
  
        return false;
  
    });
  
    $('span').on('click', function(){
        var item_id = $(this).attr('id');
        console.log(item_id, "deleted");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item_id,
          success: function(data){
            //  delete that task from UI
            deleteTask(item_id);
          }
        });
    });
  
  // });




  //  create dom element
  let createNewTask = data => {
    const keeper = document.querySelector('#taskKeeper');

    let template = document.querySelector('template');
    let clone = template.content.cloneNode(true);

    let thing = clone.querySelector('#string');
    thing.innerText = data.item;

    let span = clone.querySelector('span');
    span.id = data._id;

    keeper.appendChild(clone);
    
    // span.addEventListener('click', deleteTask(data._id));

    // span.onclick = deleteTask(data._id);
}

//  delete dom element
let deleteTask = id => {
  document.getElementById(id).parentElement.remove();
}