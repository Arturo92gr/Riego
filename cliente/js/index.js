import { Check } from './check.js';

const Cliente = {
    send: (data)=>{
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .catch(error => console.error('Error:', error));
    }
}

// se inicializan los grupos
async function initializeGroups() {
  try {
      const response = await fetch('http://localhost:3000/api/config');
      const config = await response.json();
      
      config.groups.forEach(group => {
          const groupDiv = document.createElement('div');
          groupDiv.id = group.id;
          document.body.appendChild(groupDiv);
          
          const checkGroup = new Check(groupDiv, Cliente);
          group.checkboxes.forEach(checkboxName => {
              checkGroup.addCheck(checkboxName);
          });
      });
  } catch (error) {
      console.error('Error initializing groups:', error);
  }
}

// se inicializan los grupos al cargar la página
document.addEventListener('DOMContentLoaded', initializeGroups);