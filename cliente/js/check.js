export class Check {
    constructor(parent,client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
    }

    changeValue(name, value) {
        const data = this.states.find((item) => item.name == name);
        // utilizando dataset se va a modificar el valor del atributo data-name
        if(data) {
            data.state = value;
            const check = this.parent.querySelector(`[data-name="${name}"]`);
            const span = check.querySelector('span');
            span.textContent = value ? 'ON' : 'OFF';
            // se envía el cambio al servidor
            this.client.send({ 
                name: name, 
                state: value
            });
        }
    }

    addCheck(name) {
        this.states.push({
            name : name,
            state : false
        })
        const check = document.createElement("label");
        check.classList.add("form-switch");
        check.dataset.name = name;  // atributo data-name
        this.parent.appendChild(check);
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        check.appendChild(input);
        check.appendChild(document.createElement("i"));
        const span = document.createElement('span');
        const text = document.createTextNode('OFF');
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event)=> {
            this.changeValue(name, event.target.checked);
        })
    }
}