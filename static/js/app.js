const form = document.getElementById('form');
const formElements = document.getElementById('form-elements');
const properties = document.getElementById('properties');
const formToolbar = document.getElementById('form-toolbar');

if (form && formElements && properties && formToolbar) {
  new Sortable(formElements, {
    group: 'shared',
    animation: 150,
  });
  function addToForm(type) {
    const text = `
        <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'TEXT')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">text</label>
          <input type="text" class="input-field" style="cursor: pointer" />
        </div>
    `;
    const number = ` <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'NUMBER')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">number</label>
          <input type="number" style="cursor: pointer" class="input-field"/>
        </div>`;
    const email = ` <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'EMAIL')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">email</label>
          <input type="email" class="input-field" style="cursor: pointer" />
        </div>`;
    const password = ` <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'PASSWORD')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">password</label>
          <input type="password" class="input-field" style="cursor: pointer" />
        </div>`;
    const image = ` <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'IMAGE')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">image</label>
          <input type="file" class="input-field" style="cursor: pointer" />
        </div>`;
    const textarea = ` <div draggable="true" class="form-control" style="cursor: pointer" onclick="editProperties(event,'TEXTAREA')">
          <label for="" style="cursor: pointer; margin-bottom: 6px">textarea</label>
          <textarea class="input-field" style="cursor: pointer" type="textarea"></textarea>
        </div>`;

    if (type === 'TEXT') {
      formElements.insertAdjacentHTML('beforeend', text);
    } else if (type === 'NUMBER') {
      formElements.insertAdjacentHTML('beforeend', number);
    } else if (type === 'EMAIL') {
      formElements.insertAdjacentHTML('beforeend', email);
    } else if (type === 'PASSWORD') {
      formElements.insertAdjacentHTML('beforeend', password);
    } else if (type === 'IMAGE') {
      formElements.insertAdjacentHTML('beforeend', image);
    } else if (type === 'TEXTAREA') {
      formElements.insertAdjacentHTML('beforeend', textarea);
    }
  }

  const propertiesPannel = properties.querySelector('#properties-pannel');

  function editTitle(event, val) {
    const title = document.getElementById('form-title-value').innerText;
    propertiesPannel.innerHTML = ` <form id="title">
      <div class="form-control">
        <label for="pr-form-title">Form title</label>
        <input type="text" value="${title}"  onkeyup="update(event,'TITLE')" />
      </div>
    </form>`;
  }
  function editButton(event, val) {
    const btnVal = event.target.innerText;
    propertiesPannel.innerHTML = ` <form id="submitval">
      <div class="form-control">
        <label for="pr-form-title">Value</label>
        <input type="text" val="${btnVal}" onkeyup="update(event,'SUBMITBTN')" />
      </div>
    </form>`;
  }
  let selectedElement;
  function editProperties(event, val) {
    selectedElement = event.target;
    const values = {
      label: selectedElement.querySelector('label').innerText,
      inputName: selectedElement.querySelector('.input-field').getAttribute('name'),
      placeholder: selectedElement.querySelector('.input-field').getAttribute('placeholder'),
      maxlength: selectedElement.querySelector('.input-field').getAttribute('maxlength'),
      minlength: selectedElement.querySelector('.input-field').getAttribute('minlength'),
      required: selectedElement.querySelector('.input-field').getAttribute('required'),
      row: selectedElement.querySelector('.input-field').getAttribute('rows'),
    };

    if (val === 'TEXT') {
      propertiesPannel.innerHTML = ` <form id="text">
      <div class="form-control">
        <label>Input name</label>
        <input type="text" value="${
          values.inputName ? values.inputName : ''
        }"   onkeyup="update(event,'NAME')" />
      </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text" value="${
          values.label ? values.label : ''
        }"   onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label>Placeholder</label>
        <input type="text" value="${
          values.placeholder ? values.placeholder : ''
        }"   onkeyup="update(event,'PLACEHOLDER')" />
      </div>
      <div class="form-control">
        <label>Max length</label>
        <input type="number" value="${
          values.maxlength ? values.maxlength : ''
        }"   onkeyup="update(event,'MAXLEN')" />
      </div>
      <div class="form-control">
        <label >Min length</label>
        <input type="number" value="${
          values.minlength ? values.minlength : ''
        }"   onkeyup="update(event,'MINLEN')" />
      </div>
      <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox" ${
          values.required && 'checked'
        }   onclick="update(event,'REQUIRED')" />
      </div>
      <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
    </form>`;
    } else if (val === 'EMAIL') {
      propertiesPannel.innerHTML = ` <form id="email">
    <div class="form-control">
    <label>Input name</label>
    <input type="text" value="${
      values.inputName ? values.inputName : ''
    }"    onkeyup="update(event,'NAME')" />
  </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text" value="${
          values.label ? values.label : ''
        }"   onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label>Placeholder</label>
        <input type="text" value="${
          values.placeholder ? values.placeholder : ''
        }"   onkeyup="update(event,'PLACEHOLDER')" />
      </div>
      <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox"  ${
          values.required && 'checked'
        }    onclick="update(event,'REQUIRED')" />
      </div>
      <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
    </form>`;
    } else if (val === 'NUMBER') {
      propertiesPannel.innerHTML = ` <form id="number">
    <div class="form-control">
    <label>Input name</label>
    <input type="text" value="${
      values.inputName ? values.inputName : ''
    }"   onkeyup="update(event,'NAME')" />
  </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text" value="${
          values.label ? values.label : ''
        }"    onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label>Placeholder</label>
        <input type="text" value="${
          values.placeholder ? values.placeholder : ''
        }"    onkeyup="update(event,'PLACEHOLDER')" />
      </div>
      <div class="form-control">
      <label>Max length</label>
      <input type="number"  value="${
        values.maxlength ? values.maxlength : ''
      }"   onkeyup="update(event,'MAXLEN')" />
    </div>
    <div class="form-control">
      <label >Min length</label>
      <input type="number"  value="${
        values.minlength ? values.minlength : ''
      }"   onkeyup="update(event,'MINLEN')" />
    </div>
    <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox"  ${
          values.required && 'checked'
        }    onclick="update(event,'REQUIRED')" />
      </div>
    <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
    </form>`;
    } else if (val === 'PASSWORD') {
      propertiesPannel.innerHTML = ` <form id="password">
    <div class="form-control">
    <label>Input name</label>
    <input type="text"  value="${
      values.inputName ? values.inputName : ''
    }"  onkeyup="update(event,'NAME')" />
  </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text" value="${
          values.label ? values.label : ''
        }"   onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label>Placeholder</label>
        <input type="text" value="${
          values.placeholder ? values.placeholder : ''
        }"   onkeyup="update(event,'PLACEHOLDER')" />
      </div>
      <div class="form-control">
      <label>Max length</label>
      <input type="number"  value="${
        values.maxlength ? values.maxlength : ''
      }"  onkeyup="update(event,'MAXLEN')" />
    </div>
    <div class="form-control">
      <label >Min length</label>
      <input type="number" value="${
        values.minlength ? values.minlength : ''
      }"   onkeyup="update(event,'MINLEN')" />
    </div>
    <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox"  ${
          values.required && 'checked'
        }    onclick="update(event,'REQUIRED')" />
      </div>
    <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
    </form>`;
    } else if (val === 'TEXTAREA') {
      propertiesPannel.innerHTML = ` <form id="textarea">
    <div class="form-control">
    <label>Input name</label>
    <input type="text" value="${
      values.inputName ? values.inputName : ''
    }"  onkeyup="update(event,'NAME')" />
  </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text" value="${
          values.label ? values.label : ''
        }"   onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label>Placeholder</label>
        <input type="text" value="${
          values.placeholder ? values.placeholder : ''
        }"    onkeyup="update(event,'PLACEHOLDER')" />
      </div>
      <div class="form-control">
      <label>Max length</label>
      <input type="number"  value="${
        values.maxlength ? values.maxlength : ''
      }"   onkeyup="update(event,'MAXLEN')" />
    </div>
    <div class="form-control">
      <label >Min length</label>
      <input type="number" value="${
        values.minlength ? values.minlength : ''
      }"   onkeyup="update(event,'MINLEN')" />
    </div>
    <div class="form-control">
      <label >Rows</label>
      <input type="number" value="${
        values.row ? values.row : ''
      }"    onkeyup="update(event,'ROW')" />
    </div>
    <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox"  ${
          values.required && 'checked'
        }    onclick="update(event,'REQUIRED')" />
      </div>
    <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
    </form>`;
    } else if (val === 'IMAGE') {
      propertiesPannel.innerHTML = ` <form id="textarea">
    <div class="form-control">
    <label>Input name</label>
    <input type="text" value="${
      values.inputName ? values.inputName : ''
    }"   onkeyup="update(event,'NAME')" />
  </div>
      <div class="form-control">
        <label>Label</label>
        <input type="text"  value="${
          values.label ? values.label : ''
        }"  onkeyup="update(event,'LABEL')" />
      </div>
      <div class="form-control">
        <label >Required</label>
        <input type="checkbox" classname="checkbox"  ${
          values.required && 'checked'
        }    onclick="update(event,'REQUIRED')" />
      </div>
      <button class="delete-element" type="button" onclick="deleteElem(event)">Delete Element</button>
      
    </form>`;
    }
  }
  function update(event, type) {
    if (type === 'TITLE') {
      document.getElementById('form-title-value').innerText = event.target.value;
    } else if (type === 'SUBMITBTN') {
      document.getElementById('form-submit').querySelector('button').innerText = event.target.value;
    } else if (type === 'LABEL') {
      selectedElement.querySelector('label').innerText = event.target.value;
    } else if (type === 'PLACEHOLDER') {
      selectedElement.querySelector('.input-field').placeholder = event.target.value;
    } else if (type === 'MAXLEN') {
      selectedElement.querySelector('.input-field').setAttribute('maxlength', event.target.value);
    } else if (type === 'NAME') {
      selectedElement.querySelector('.input-field').setAttribute('name', event.target.value);
    } else if (type === 'MINLEN') {
      selectedElement.querySelector('.input-field').setAttribute('minlength', event.target.value);
    } else if (type === 'ROW') {
      selectedElement.querySelector('.input-field').setAttribute('rows', event.target.value);
    } else if (type === 'REQUIRED') {
      if (event.target.checked) {
        selectedElement.querySelector('.input-field').setAttribute('required', 'true');
      } else {
        selectedElement.querySelector('.input-field').removeAttribute('required');
      }
    }
  }

  function deleteElem(event) {
    event.target.parentElement.style.display = 'none';
    selectedElement.remove();
    propertiesPannel.innerHTML = ` <span class="help-text">Select element to edit</span>`;
  }

  function handleSubmit() {
    const sections = { formData: [] };

    const elements = formElements.querySelectorAll('.form-control');
    const submitbtn = document.getElementById('form-submit').querySelector('button').innerText;
    const title = document.getElementById('form-title-value').innerText;
    sections['base'] = {
      title,
      submitbtn,
    };

    for (const [i, element] of elements.entries()) {
      const label = element.querySelector('label').innerText;
      const inputField = element.querySelector('.input-field');
      let req = inputField.getAttribute('required');
      let phold = inputField.getAttribute('placeholder');
      let rows = inputField.getAttribute('rows');
      sections.formData.push({
        name: inputField.getAttribute('name'),
        label: label,
        position: i,
        type: inputField.getAttribute('type'),
        placeholder: phold ? phold : '',
        maxLen: inputField.getAttribute('maxlength'),
        minLen: inputField.getAttribute('minlength'),
        required: req ? true : false,
        rows: rows ? rows : '',
      });
    }

    if (sections.formData.length === 0) {
      alert('add some element before save');
      return;
    }
    let submission = true;
    for (let i = 0; i < sections.formData.length; i++) {
      if (sections.formData[i].name === null) {
        submission = false;
        alert('input name missing please check.');

        return;
      }
    }

    let duplicate = true;
    let allNames = [];
    sections.formData.map((item) => allNames.push(item.name));
    const seen = new Set();
    for (const val of allNames) {
      if (seen.has(val)) {
        duplicate = true;
        alert('duplicate input name');
        return;
      } else {
        seen.add(val);
        duplicate = false;
      }
    }
    const id = document.getElementById('FORMID').value;

    console.log(sections);
    if (!duplicate) {
      $.ajax({
        url: `{% url 'create' ${id} %}`,
        type: 'POST',
        data: { data: JSON.stringify(sections), id: id },
        success: (data) => {
          window.location.href = 'http://127.0.0.1:8000/dashboard';
        },
      });
    }
  }
}
