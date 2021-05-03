$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //  create dom element for newly created task
            console.log(data.item)
            createNewTask(data.item)
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });




  let createNewTask = data => {
    //  create dom element
    const keeper = document.querySelector('#taskKeeper');

    let template = document.querySelector('template');
    let clone = template.content.cloneNode(true);

    let thing = clone.querySelector('#string');
    thing.innerText = data;

    keeper.appendChild(clone);
}