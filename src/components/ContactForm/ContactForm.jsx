import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts, selectLoading, selectError } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
name: Yup.string().min(3).max(50).required(),
number: Yup.string().min(3).max(50).required(),
});

const ContactForm = () => {
const dispatch = useDispatch();
const contacts = useSelector(selectContacts);
const loading = useSelector(selectLoading);
const error = useSelector(selectError);

const handleSubmit = (values, actions) => {
    const normalizedName = values.name.toLowerCase();
    const isDuplicate = contacts.some(
    contact => contact.name.toLowerCase() === normalizedName
    );
    if (isDuplicate) {
    alert(`${values.name} is already in contacts.`);
    return;
    }
    dispatch(addContact(values));
    actions.resetForm();
};

return (
    <div>
    <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
    >
        <Form className={styles.form}>
        <label className={styles.label}>
            Name
            <Field className={styles.input} name="name" />
            <ErrorMessage className={styles.error} name="name" component="div" />
        </label>
        <label className={styles.label}>
            Number
            <Field className={styles.input} name="number" />
            <ErrorMessage className={styles.error} name="number" component="div" />
        </label>
        <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Adding...' : 'Add Contact'}
        </button>
        </Form>
    </Formik>
    {error && <p className={styles.error}>Error: {error}</p>}
    </div>
);
};

export default ContactForm;