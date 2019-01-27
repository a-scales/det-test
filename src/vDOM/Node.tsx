import {v4} from "uuid";
import {MD5} from "crypto-js";
import ComponentBase from "../Components";

interface ComponentReference {
    tag: any;
    attrs: object;
    children: Array<any>;
}

interface IVDOM_Node {
    uuid: string;
    hash: string;
    comparatorHash: string;
    internalID: string;
    id: string;
    classes: Array<string>;
    parent: vDOM_Node;
    childNodes: Array<vDOM_Node>;
    componentReference: any;
    componentOf: ComponentBase;
    elementHash: string;

    afterBuild();
    render();
    afterRender();
    forceUpdate();
    equals(n: vDOM_Node): boolean;
}
// TODO: Define truths for component and hashing methodology
// TODO: Integrate with automerge or immutable to lock this down with versioning
class vDOM_Node implements IVDOM_Node {
    public uuid: string;
    public hash: string;
    protected _comparatorHash: string; get comparatorHash(): string { return this._comparatorHash; } 
    protected _internalID: string; get internalID(): string { return this._internalID; }
    public id: string;
    public classes: Array<string>;
    public parent: vDOM_Node;
    public childNodes: Array<vDOM_Node>;    
    public componentReference: any; //~TODO~: Create Component Type
    public componentOf: ComponentBase;
    protected _elementHash: string; get elementHash(): string { return this._elementHash; } set elementHash(h: string) { this._elementHash = h; }
    
    constructor(componentReference) {
        this.uuid = v4();        
        this.componentReference = componentReference;
        this.childNodes = [];
        this.classes = [];
        this.id = "";
        this.hash = MD5(JSON.stringify([this.uuid,this.componentReference])).toString()
        this._comparatorHash = MD5(JSON.stringify([this.classes, this.id, this.childNodes, this.componentReference])).toString()
        this._internalID = this.hash.substr(0,10);

        this.generateClasses();
    }
    //~TODO: Make all of the fields private~
    //TODO: Format classes
    //TODO: Flesh out hooks
    //TODO: Add service generation for data
    //TODO: create data format interface
    //TODO: Create a component reference interface
    //TODO: Create an .equals() method

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
    
    getComponentRef(): object { return this.componentReference; }
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
    /**
     * Returns the rendered component
     * TODO: Make this be the true way to render components, i.e. not interfacing directly with the IComponentBase
     */
    public render(){
        if(this.componentOf) {
            return this.componentOf.render();            
        } else {
            return this.componentReference.tag;
        }
        this.afterRender();
    }
    /**
     * Runs after the render;
     * TODO: Move to interface
     */
    public afterRender() {}
    /**
     * 
     */
    public forceUpdate(): any{
        var cloneO = new (this.constructor()) as any;
        for( var attr in this) {
            if( typeof this[attr] === "object") {
                cloneO[attr] = this.forceUpdate();
            } else {
                cloneO[attr] = this[attr];
            }            
        }
        return cloneO; // TODO: Replace this in the vDOM
    } // should create a deep copy, and re-establish the node in the tree
    
    public equals(n: vDOM_Node): boolean { return this._comparatorHash == n.comparatorHash; } // comparetor, both UUID or hash. Should this be hashed value with uuid or should there be more?
    
    private hashNode() {
        // figure out truth for hashing methods
    }
    

    generateClasses() {
        // console.log(this.componentReference)
        if(this.componentReference.attrs && this.componentReference.attrs["class"]) {
            this.classes = this.componentReference.attrs["class"].split(" ");
        }
    }
}

export default vDOM_Node