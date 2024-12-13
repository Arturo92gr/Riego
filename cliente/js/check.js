export class Check {
    constructor(parent,client) {
        this.parent = parent;
        this.client = client;
        // se obtiene el id del elemento padre
        this.parentId = parent.id; 
        this.states = [];
        // se carga el estado inicial de los checkboxes
        this.loadInitialStates();
    }

    // se cargan los estados iniciales de los checkboxes
    loadInitialStates() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(states => {
                Object.entries(states).forEach(([fullName, state]) => {
                    // se obtiene el id del elemento padre y el nombre del checkbox
                    const [parentId, name] = fullName.split('_');
                    // si el id del elemento padre coincide con el id del elemento padre de la clase
                    if (parentId === this.parentId) {
                        const existingState = this.states.find(item => item.name === name);
                        if (existingState) {
                            existingState.state = state;
                            // se actualiza el estado del checkbox
                            const check = this.parent.querySelector(`[data-name="${name}"]`);
                            if (check) {
                                const input = check.querySelector('input');
                                const span = check.querySelector('span');
                                input.checked = state;
                                span.textContent = state ? 'ON' : 'OFF';
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading states:', error));
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
            const fullName = `${this.parentId}_${name}`;
            this.client.send({ 
                name: fullName, 
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