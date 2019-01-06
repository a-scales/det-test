

interface IComponentBase {
    Props;
    // onInit();
    render();
    // onKill();
}

class ComponentBase implements IComponentBase{
    Props: object;
    constructor(props) {
        this.Props = props;
    }
    render() {
        return;
    }
}

export default ComponentBase