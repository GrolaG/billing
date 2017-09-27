import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {init} from './billing-cycle.actions';

import LabelAndInput from '../common/form/label-and-input';
import CreditList from './creditList';

class BillingCycleForm extends Component {
    render() {
        const {handleSubmit, readOnly, submitClass, submitLabel, credits} = this.props;

        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" component={LabelAndInput} label="Nome" cols="12 4"
                           placeholder="Informe o nome" readOnly={readOnly}/>
                    <Field name="month" component={LabelAndInput} label="Mês" type="number" cols="12 4"
                           placeholder="Informe o mês" readOnly={readOnly}/>
                    <Field name="year" component={LabelAndInput} label="Ano" type="number" cols="12 4"
                           placeholder="Informe o ano" readOnly={readOnly}/>
                    <CreditList list={credits} cols='12 6' readOnly={readOnly}/>
                </div>
                <div className="box-footer">
                    <div className="col-md-2">
                        <button className={`form-control  btn btn-${submitClass}`}>{submitLabel}</button>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className='form-control btn btn-default' onClick={this.props.init}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm);

const selector = formValueSelector('billingCycleForm');
const mapStateToProps = state => ({credits: selector(state, 'credits')});
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);