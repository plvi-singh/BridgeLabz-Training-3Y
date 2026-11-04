// Q4: Custom Form Builder (Forms + Classes)
// Link this file to q4_custom_form_builder.html.

class FormBuilder {
    constructor(fields, containerId) {
        this.fields = fields;
        this.container = document.getElementById(containerId);
    }

    createForm() {
        const form = document.createElement("form");
        form.id = "generatedForm";

        this.fields.forEach((field, index) => {
            const wrapper = document.createElement("div");
            wrapper.style.marginBottom = "12px";

            const label = document.createElement("label");
            label.textContent = field.label;
            label.htmlFor = `field${index}`;

            const input = document.createElement("input");
            input.type = field.type;
            input.id = `field${index}`;
            input.name = field.name || `field${index}`;
            input.required = field.required !== false;

            wrapper.append(label, document.createElement("br"), input);
            form.appendChild(wrapper);
        });

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.textContent = "Submit";
        form.appendChild(submit);

        form.addEventListener("submit", event => {
            event.preventDefault();
            const data = this.getFormData();
            document.getElementById("formResult").textContent = JSON.stringify(data, null, 2);
            console.log(data);
        });

        this.container.innerHTML = "";
        this.container.appendChild(form);
    }

    getFormData() {
        const data = {};
        this.fields.forEach((field, index) => {
            const input = document.getElementById(`field${index}`);
            data[input.name] = input.value;
        });
        return data;
    }
}

const fields = [
    { type: "text", label: "Username", name: "username" },
    { type: "email", label: "Email", name: "email" },
    { type: "password", label: "Password", name: "password" }
];

const builder = new FormBuilder(fields, "formContainer");
builder.createForm();
