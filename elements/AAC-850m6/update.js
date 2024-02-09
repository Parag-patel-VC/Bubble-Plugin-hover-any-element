function(instance, properties, context) {    
i=i+1;
    console.log(i);
    
    $( document ).ready(function() {
        $('[id='+properties.ElementID+']').each(function (element) {
            $(this).addClass('__hover__');
            if(!$(this).hasClass('__hover_events_added__')) {
            	addHoverEvents($(this));
            }
            $(this).attr('data-tmp', Math.random().toString());
            checkNodeAndChildren($(this));
        });
        
        
          // Function to add mouseover and mouseout events
    function addHoverEvents(element) {
        if(!element.hasClass('__hover_events_added__')) {
        	element.addClass('__hover_events_added__');
        }
        element.on('mouseover', function () {
            if(currentElement!=element){
                instance.publishState(element);
            	instance.triggerEvent('show');
                currentElement=element;
                console.log(element.attr("data-tmp"));
            }
        });
        element.on('mouseout', function () {
            instance.triggerEvent('hide');
        });
    }

    // Function to check a node and its children for the specified id
    function checkNodeAndChildren(node) {
        if (node.attr('id') === properties.ElementID) {            
            node.attr('data-tmp', Math.random().toString());
            if(!node.hasClass('__hover_events_added__')) {
                node.addClass('__hover__');
            	addHoverEvents(node);
            }
        }
        node.find('[id='+properties.ElementID+']').each(function () {            
            $(this).attr('data-tmp', Math.random().toString());
            if(!$(this).hasClass('__hover_events_added__')) {
                $(this).addClass('__hover__');
            	addHoverEvents($(this));
            }
            checkNodeAndChildren($(this));
        });
    }
    

        // Create a MutationObserver instance
       var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                $(mutation.addedNodes).each(function () {
                    checkNodeAndChildren($(this));
                });
            }
        });
    });

        // Configuration of the observer
        var config = {
            attributes: true,
            childList: true,
            subtree: true
        };

        // Pass in the target node and observer options
        observer.observe(document.body, config);
        });
    
  
   
}
