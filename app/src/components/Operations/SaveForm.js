import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const validate = (values, props) => {
    const errors = {};

    if (!values.label) {
        errors.label = 'Give it a name';
    }

    const found = props.items.filter(e => e.id === values.label).pop();
    if (found) {
        errors.label = 'You already saved "' + values.label + '"';
    }

    return errors;
};

const renderField = ({ input, meta: { touched, error } }) => (
    <div className="form-group">
        <div className={'input-group' + ((touched && error) ? ' has-error' : '')}>
            <input type="text"
                   autoComplete="off"
                   className="form-control"
                   placeholder="Save New Synth"
                {...input}/>
            <div className="input-group-addon">
                <button type="submit">
                    <i className="ion-ios-download"/>
                </button>
            </div>
        </div>
        <div className="form-error">
            {
                touched &&
                error &&
                <div className="text-danger form-error-field">
                    {error} <i className="ion-alert"/>
                </div>
            }
        </div>
    </div>
);

class SaveForm extends Component {
    render () {
        const {
            handleSubmit,
            submitAction
        } = this.props;

        return (
            <form className="save-new-form" onSubmit={handleSubmit(submitAction)} noValidate>
                <Field
                    name="label"
                    component={renderField}
                />
            </form>
        );
    }
}

export default reduxForm({
    form: 'saveSynth',
    validate
})(SaveForm);
