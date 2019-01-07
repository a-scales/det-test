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
        // this.vD.vDOM_Tree.push({tag:tag,attrs:attrs,children:children});
        
        // console.log("cc",cc);
        let ref = {tag:tag,attrs:attrs,children:children};
        console.log(ref);
        // let newNode = new Node(ref);
        this.vD.addNode(ref);
        return {tag:tag,attrs:attrs,children:children}
    }
    
    buildVDOM(root: Node) {
        if(root.componentReference.children) {
            root.componentReference.children.forEach( child => {
                let cN = new Node(child);
                this.buildVDOM(cN);
                root.addChildNode(cN);
                console.log(child);
            })
        } 
        return root;
    }
    // TODO: Split out functions for rendering custom components
    // ~TODO~: Handling Attributes 

    JSXLog(tag, attrs, ...children) {
        console.log(tag);
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