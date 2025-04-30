import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts, selectLoading, selectError } from '../../redux/contactsSlice';
import styles from './ContactList.module.css';

const ContactList = () => {
const visibleContacts = useSelector(selectFilteredContacts);
const loading = useSelector(selectLoading);
const error = useSelector(selectError);

return (
    <div>
    {loading && <p className={styles.info}>Loading contacts...</p>}
    {error && <p className={styles.error}>Error: {error}</p>}
    <ul className={styles.list}>
        {visibleContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
        ))}
    </ul>
    </div>
);
};

export default ContactList;