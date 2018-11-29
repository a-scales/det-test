class E {

    // TODO: Split out functions for rendering custom components
    // ~TODO~: Handling Attributes 
    JSXrender(tag:any,attrs:any, ...children:any) {    
        

        var e: HTMLElement;
        if(typeof tag === 'string') {
            e = document.createElement(tag);
        }
        else {
            if( tag.name === 'e') {
                //TODO: Pass in inner text or other of templates
                console.log(tag,attrs,children);
                let r = (new tag(attrs)).render();
                this.JSXProcessChildren(r,children).forEach(NChild => {
                    r.appendChild(NChild);
                }) 
                return r;
            }
            return tag();
        }
        

        var PChildren = this.JSXProcessChildren(e,children);
        
        // Break this out t functuon
        PChildren.forEach( c => {
            // console.log(c)
            try {
                e.appendChild(c);
            } catch(err) {
                console.log("Error inserting",c," : ",err);
            }
            
        })
        // children.forEach( child => {            
        //     let cNode: any;
        //     // console.log("|-",child,typeof child);
        //     if(typeof child === 'string') {
        //         cNode = document.createTextNode(child);
        //     } else if(cNode instanceof Array) {

        //     } else {
        //         cNode = child;
        //     }
        //     console.log("TYPEOF C", cNode instanceof Array)
        //     e.appendChild(cNode)
        // })
        if(attrs) {
            Object.keys(attrs).forEach(key => {
                e.setAttribute(key, attrs[key])
            })
        }
        this.JSXLog(tag,attrs,...children)

        // TODO: Create a vDOM system for this ish.
        return(e);
    }    
    JSXProcessChildren(e: HTMLElement,children) {
        var processedChildren = []
        children.forEach( child => {            
            let cNode: any;            
            // console.log("|-",child,typeof child);
            if(typeof child === 'string') {
                cNode = document.createTextNode(child);
            } else if(child instanceof Array) {
                let processedArray = this.JSXProcessChildren(e,child);
                processedChildren=processedChildren.concat(processedArray);                
                return;
            } else {
                cNode = child;
            }
            // console.log("PROCESSED KIDS",processedChildren)
            // return(cNode)
            processedChildren.push(cNode)
            // return(e)
        })
        return processedChildren;
    }
    JSXLog(tag, attrs, ...children) {
        console.log(tag);
        children.forEach(child => {
            console.log("|-",child,typeof child);
        })
    }

}
export default new E;