import Node from "./Node";
import ComponentBase from "../Components";
import {MD5} from "crypto-js";
interface INodeHash {
    [hash: string]: Node;
}
interface IElementHash {
    [elementHash: string]: Node;
}

class VDOM {
    vDOM_Tree: Array<any> = [];
    nodeArray: Array<Node> = [];
    root: any;
    rootNode: Node;
    levels: number;    
    nodeHash: INodeHash = {};
    constructor() {
        
    }
    // TODO: Searching by hashmap- i.e. hashing Node, and then using a hashmap to resolve the position within the tree    
    /**
     * Creates the base for the elements
     * @param RootComponent Root FW Component
     * @param RootDiv Root <div> element to bind to
     */
    create(RootComponent: ComponentBase, RootDiv: HTMLElement) {
        let RootNode = new Node(RootComponent);
        let vDOM = this.buildVDOM(RootNode);        
        this.renderVDOM(RootDiv, RootNode);
        return vDOM;
    }
    /**
     * renders a given node by adding it to the DOM
     * @param RootDiv Current root to append elements to
     * @param RootNode Current node for which children will be iterated on
     */
    renderVDOM(RootDiv: HTMLElement, RootNode: Node) {
        // console.log(Node);
        RootNode.childNodes.forEach(child => {     
            console.log(child);                               
            if( typeof child.componentReference === "string") {
                RootDiv.innerHTML = child.componentReference;
            } else {                
                var r;
                if(typeof child.componentReference.tag === "function") {
                    let t = new child.componentReference.tag(child.componentReference.attrs);
                    r = t.render();
                    child.componentOf = t; 
                    child.elementHash = MD5(JSON.stringify([r,child.internalID])).toString();
                    // Now there is a componentOf implementation which will allow us to add a reference to the vDOM in the object to work with after the mounting of the component                    
                    
                    let e : HTMLElement = r.tag;                    
                    e.setAttribute("det-id",child.internalID);
                    if( child.classes && child.classes.length > 0) {child.classes.forEach( c => e.classList.add(c) );}
                    RootDiv.appendChild(e); 
                } else {
                    let ee : HTMLElement = child.componentReference.tag;
                    ee.setAttribute("det-id",child.internalID);
                    if( child.classes && child.classes.length > 0) {child.classes.forEach( c => ee.classList.add(c) );}
                    RootDiv.appendChild(ee);  
                    child.elementHash = MD5(child.componentReference.tag).toString();
                }                
                if(r) {
                    this.renderVDOM(r.tag, child);
                } else {
                    this.renderVDOM(child.componentReference.tag, child)
                }
            }                  
        })        
    }

    /**
     * Adds an element to the vDOM tree
     * @param n Node to add to the tree
     */
    addNode(n): void {
        this.vDOM_Tree.push(n);
        this.root = this.vDOM_Tree[this.vDOM_Tree.length - 1];
    }

    /**
     * Builds the vDOM tree off a root node. 
     * @param root Root node to build the tree from
     * @returns {Node} Root node of the tree
     */
    buildVDOM(root: Node): Node {
        if(root.componentReference.children) {
            root.componentReference.children.forEach( child => {
                let cN = new Node(child);
                // set parents here
                cN.setParent(root);                
                this.buildVDOM(cN);
                root.addChildNode(cN);
                this.nodeArray.push(cN);                
            })
        }
        this.rootNode = root;
        this.nodeHash[root.comparatorHash] = root;  
        return root;
    }

    /**
     * Search for an node in the vDOM by element
     * @param element element to search for in the vDom
     */
    searchByElement(element: string): Node {
        return new Node({});
    }
    
    /**
     * Search for a node in the vDOM by IID 
     * @param iid Internal ID of the DOM element to search for in the vDOM
     */
    searchByIID(iid: string) {
        return new Node({});
    }


    // need to implement modification methods here too. 
    // need to pass reference to this object as paramerter to all Nodes too.
    // should be a vDOM field on the Node object, to access it as it exits.
}

export default VDOM;