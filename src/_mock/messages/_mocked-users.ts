import {User, UserContact} from '../../interfaces/user.ts';
import {PaidServices} from '../../interfaces/providers.ts';

const mockUserContact = (id: number, username: string): UserContact => ({
  id: Math.random(),
  user_id: id,
  email: `${username}@email.com`,
  phone: `123456789`,
  country: 'USA',
  state: 'California',
  city: 'Los Angeles',
  street: '123 Main St',
  zip_code: '90001',
});

const mockPaidServices = (userId: number): PaidServices[] => [
  {
    id: Math.random(),
    user_id: userId,
    amount: 100,
    provider_id: 1,
  },
];

export const _mockedUsers: User[] = [
  {
    id: 1,
    username: 'user1',
    user_login_id: 1,
    allow_random_messages: true,
    created_at: new Date('2023-10-01T12:00:00Z'),
    user_contact: mockUserContact(1, 'user1'),
    paid_services: mockPaidServices(1),
  },
  {
    id: 2,
    username: 'user2',
    user_login_id: 2,
    allow_random_messages: false,
    created_at: new Date('2023-10-02T12:00:00Z'),
    user_contact: mockUserContact(2, 'user2'),
    paid_services: mockPaidServices(2),
  },
  {
    id: 3,
    username: 'user3',
    user_login_id: 3,
    allow_random_messages: true,
    created_at: new Date('2023-10-03T12:00:00Z'),
    user_contact: mockUserContact(3, 'user3'),
    paid_services: mockPaidServices(3),
  },
];
