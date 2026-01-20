import { ProfileData } from '../interfaces/profile';

export const PROFILE_DATA: ProfileData = {
    id: 'user_12345',
    firstName: 'André',
    lastName: 'Oliveira',
    email: 'andre.oliveira@gmail.com',
    phone: '+244940891243',
    birthday: '1990-01-01',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    stats: {
        sent: 105,
        scheduled: 20,
        received: 35,
        saved: 10,
    },
    addressDetails: {
        country: 'BR',
        state: 'MG',
        city: 'pouso-alegre',
        street: 'Rua Heitor Carline',
        number: '24',
        complement: '',
        zipCode: '00000-000',
    },
};
