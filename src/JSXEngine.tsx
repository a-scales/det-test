import { Node, vDOM } from "./vDOM/V";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";
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
    // JSXrender2(tag:any,attrs:any, ...children:any) {    
    //     let r = Math.round(Math.random()*100);        
    //     let nodeCount = this.vD.vDOM_Tree.length;        
    //     var e: HTMLElement;
    //     if(typeof tag === 'string') {
    //         e = document.createElement(tag);
    //     }
    //     else {
    //         if( tag.name === 'e' || tag.name === 'n') {
    //             //TODO: Pass in inner text or other of templates
    //             // console.log(tag,attrs,children);
    //             let r = (new tag(attrs)).render();
    //             this.JSXProcessChildren(r,children).forEach(NChild => {
    //                 r.appendChild(NChild);
    //             }) 
    //             return r;
    //         }
    //         return tag();
    //     }
        
        
    //     var PChildren = this.JSXProcessChildren(e,children);
        
    //     // Break this out t functuon
    //     PChildren.forEach( c => {
    //         // console.log(c)
    //         try {
    //             e.appendChild(c);
    //         } catch(err) {
    //             console.log("Error inserting",c," : ",err);
    //         }
            
    //     })
    //     // children.forEach( child => {            
    //     //     let cNode: any;
    //     //     // console.log("|-",child,typeof child);
    //     //     if(typeof child === 'string') {
    //     //         cNode = document.createTextNode(child);
    //     //     } else if(cNode instanceof Array) {

    //     //     } else {
    //     //         cNode = child;
    //     //     }
    //     //     console.log("TYPEOF C", cNode instanceof Array)
    //     //     e.appendChild(cNode)
    //     // })
    //     if(attrs) {
    //         Object.keys(attrs).forEach(key => {
    //             e.setAttribute(key, attrs[key])
    //         })
    //     }
    //     // this.JSXLog(tag,attrs,...children)

    //     // TODO: Create a vDOM system for this ish.
    //     return(e);
    // }    
    // JSXProcessChildren(e: HTMLElement,children) {
    //     var processedChildren = []
    //     children.forEach( child => {            
    //         let cNode: any;            
    //         // console.log("|-",child,typeof child);
    //         if(typeof child === 'string') {
    //             cNode = document.createTextNode(child);
    //         } else if(child instanceof Array) {
    //             let processedArray = this.JSXProcessChildren(e,child);
    //             processedChildren=processedChildren.concat(processedArray);                
    //             return;
    //         } else {
    //             cNode = child;
    //         }
    //         // console.log("PROCESSED KIDS",processedChildren)
    //         // return(cNode)
    //         processedChildren.push(cNode)
    //         // return(e)
    //     })
    //     return processedChildren;
    // }
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