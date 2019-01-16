import { Node, vDOM } from "./vDOM/V";
class E {

    vD: vDOM;
    constructor(){
        this.vD = new vDOM();        
        // this.vD.vDOM_Tree = [];        
    }

    JSXrender(tag: any, attrs: any, ...children: any) { 
        children = [].concat.apply([],children);
        if(typeof tag === 'function') {
            let t = new tag(attrs)
            let r = t.render();            
            tag = t.constructor.name;            
            children.push(r);
        }
        tag = document.createElement(tag);                
        let ref = {tag:tag,attrs:attrs,children:children};
        this.vD.addNode(ref);
        return {tag:tag,attrs:attrs,children:children}
    }
    // break this out to the vDOM class so that it can have a method that handles the setting of the root node.
    // buildVDOM(root: Node) {
    //     if(root.componentReference.children) {
    //         root.componentReference.children.forEach( child => {
    //             let cN = new Node(child);
    //             this.buildVDOM(cN);
    //             root.addChildNode(cN);
    //             this.vD.nodeArray.push(cN);
    //             // console.log(child);
    //         })
    //     } 
    //     return root;
    // }
    // TODO: Split out functions for rendering custom components
    // ~TODO~: Handling Attributes 

    JSXLog(tag, attrs, ...children) {
        // console.log(tag);
        children.forEach(child => {
            console.log("|-",child,typeof child);
        })
    }


    // VDOM

    BuildVDOM() {

    }

    AddNode() {
        
    }
}
export default new E;