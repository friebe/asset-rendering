/******************************************************
 * Basic plugin with example code (IIFE function)
 ******************************************************/

(function () {

    //constructor function
    var TagsInput = function (opts) {
        // Create Global References
        this.arr = [];
        this.input = document.createElement('input');
        this.wrapper = document.createElement('div');
        //watch out! the function Object assign is not support by IE
        this.options = Object.assign(TagsInput.defaults , opts);
        this.orignal_input = document.getElementById(opts.selector);

        // initialize essential parts of UI
        buildUI(this);
        addEvents(this);
    };

    //public function to interact with from outside the Immediately invoked function (IIFE)
    TagsInput.prototype.addTag = function(string) {
        this.arr.push(string);
        var tagInput = this;


        var tag = document.createElement('span');
        tag.className = this.options.tagClass;
        tag.innerText = string;

        this.wrapper.insertBefore(tag , this.input);
        this.orignal_input.value = this.arr.join(',');

        return this;
    };

    TagsInput.prototype.addData = function(array){
        var plugin = this;

        array.forEach(function(string){
            plugin.addTag(string);
        })
        return this;
    }


    //private functions
    function buildUI(tags){
        tags.wrapper.append(tags.input);
        tags.wrapper.classList.add(tags.options.wrapperClass);
        tags.orignal_input.setAttribute('hidden' , 'true');
        tags.orignal_input.parentNode.insertBefore(tags.wrapper , tags.orignal_input);
    }


    function addEvents(tags){
        tags.wrapper.addEventListener('click' ,function(){
            tags.input.focus();
        });
        tags.input.addEventListener('keydown' , function(e){
            var str = tags.input.value.trim();
            if( !!(~[9 , 13 , 188].indexOf( e.keyCode ))  )
            {
                tags.input.value = "";
                if(str != "")
                    tags.addTag(str);
            }
        });
    }

    // Attach our defaults for plugin to the plugin itself
    TagsInput.defaults = {
        selector : '',
        max : null,
        duplicate: false,
        wrapperClass : 'tags-input-wrapper',
        tagClass : 'tag'
    };

    //initialization - make accessible globally in window elem
    window.TagsInput = TagsInput;

})();

var tagInput1 = new TagsInput({
    selector: 'tag-input1',
    duplicate : false,
    max : 10
});

tagInput1.addData(['PHP' , 'JavaScript' , 'CSS']);
tagInput1.addTag('tagname');

/*
Documentation how to use the "tag add" plugin
1. You have an DOM Element like an input with an id or class:
> <input type="text" id="tag-input1">

2. In your JS main code add the plugin initialization:
> var tagInput1 = new TagsInput({
            selector: 'tag-input1',
            duplicate : false,
            max : 10
   });

If you already have some data to pre fill the plugin use the public function
> tagInput1.addData(['PHPtag' , 'JavaScripttag' , 'CSStag']);
> tagInput1.addTag('tagname')


*/