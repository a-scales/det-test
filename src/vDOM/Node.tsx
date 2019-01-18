import {v4} from "uuid";
import {MD5} from "crypto-js";
import ComponentBase from "../Components";

// TODO: Define truths for component and hashing methodology
// TODO: Integrate with automerge or immutable to lock this down with versioning
class vDOM_Node {
    uuid: string;
    hash: string;
    comparatorHash: string;
    internalID: string;
    id: string;
    classes: Array<string>;
    parent: vDOM_Node;
    childNodes: Array<vDOM_Node>;    
    componentReference: any; //TODO: Create Component Type
    componentOf: ComponentBase;
    
    constructor(componentReference) {
        this.uuid = v4();        
        this.componentReference = componentReference;
        this.childNodes = [];
        this.classes = [];
        this.id = "";

        this.hash = MD5(JSON.stringify([this.uuid,this.componentReference])).toString()
        this.comparatorHash = MD5(JSON.stringify([this.classes, this.id, this.childNodes, this.componentReference])).toString()
        this.internalID = this.hash.substr(0,10);
    }
    

    /**
     * @returns {string} ID of the DOM object
     */
    getID(): string { return this.id; }
    /**
     * @returns {Array<string>} Classes of the DOM object
     */
    getClasses(): Array<string> { return this.classes; }
    /**
     * @returns {vDOM_Node} The parent of this vDOM node
     */
    getParent(): vDOM_Node { return this.parent; }
    /**
     * @returns {Array<vDOM_Node>} The children of this vDOM node
     */
    getChildNodes(): Array<vDOM_Node> { return this.childNodes; }

    /**
     * Sets the vDOM node ID
     * @param   {string} id The new id to use
     */
    setID(id: string): void { this.id = id; }
    /**
     * Sets all classes
     * @param   {Array<string>} classes The new classes to overwrite the existing
     */
    setClasses(classes: Array<string>): void { this.classes = classes; }
    /**
     * Sets the parent
     * @param   {vDOM_Node} node The new node to overwrite the parent
     */
    setParent(node: vDOM_Node): void { this.parent = node; }
    /**
     * Sets all children
     * @param   {Array<vDOM_Node>} nodes The new children to overwrite the existing
     */
    setChildNodes(nodes: Array<vDOM_Node>): void { this.childNodes = nodes; }

    /**
     * Add a class
     * @param c Class to add
     */
    addClass(c: string): void { this.classes.push(c); }    
    /**
     * Add a child node
     * @param c Child node to add
     */    
    addChildNode(c: vDOM_Node): void { this.childNodes.push(c); }


    public removeChild() {} //this should remove a child, and return a deep copy of the new array
    public removeAllChildren() {} //this should remove all and return a new array
    public removeParent() {} // this should remove the parent and null the reference
    public removeID() {} // this should remove the id and set null
    public removeClass() {} //this should remove a class and return a deep copy of the new array
    public removeAllClasses() {} //this should remove all and return a new empty array

    public afterBuild() {}
    public render(){} // should render out the component
    public afterRender() {}
    public forceUpdate(){} // should create a deep copy, and re-establish the node in the tree
    
    public equals(){} // comparetor, both UUID or hash. Should this be hashed value with uuid or should there be more?
    
    private hashNode() {

    }
    
}

export default vDOM_Node