import { Component } from "react";
import AppForm from "../app.form";
import AppFormItem from "../app.form.item";

class FormBuilder extends Component {

    buildValidationsRules = (field) => {
        const { validations } = field;
        let _rules = []
        for (let item of validations) {
            const _keys = Object.keys(item);
        }
    }
    render() {
        const { name, meta: { fields = [], onSubmit, onValueChange, onCancel, alignment, initialObj } } = this.props;
        return <AppForm name={name} initialValues={initialObj}>
            {fields.map((field, indx) => <AppFormItem key={indx} rules={this.buildValidationsRules(field)}
                name={field?.name}
                placeholder={field?.placeholder || field?.title}
                label={field?.label}
            ></AppFormItem>)}

        </AppForm>
    }
}

export default FormBuilder;